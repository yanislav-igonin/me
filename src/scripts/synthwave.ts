/**
 * Fullscreen retrowave background rendered with raw WebGL.
 *
 * Everything the old CSS animation did now happens in a single fragment
 * shader over one fullscreen triangle — one draw call, zero DOM animation,
 * zero layout work per frame:
 *   - sky gradient (light / dark)
 *   - hard-edged glow band at the horizon
 *   - perspective grid plane scrolling like the retired CSS `moveUp`
 *   - sun disc made of 35 lines flickering like the retired `rotateLine`
 *
 * The geometry constants below are ported 1:1 from the CSS version. The
 * whole scene is shifted down by the in-flow header height (the static
 * position the old fixed background block happened to get), which is
 * measured at runtime.
 */

const HEADER_OFFSET = 66;

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;

uniform vec2 u_res;    // canvas size, device px
uniform float u_dpr;   // device px per css px
uniform float u_time;  // seconds
uniform float u_dark;  // 0 = light, 1 = dark
uniform float u_off;   // header offset, css px

const vec3 SKY_LIGHT_TOP = vec3(0.9922, 0.6431, 0.6863); // rose-300   #fda4af
const vec3 SKY_LIGHT_BOT = vec3(0.9961, 0.8431, 0.6667); // orange-200 #fed7aa
const vec3 SKY_DARK_TOP  = vec3(0.3451, 0.1098, 0.5294); // purple-900 #581c87
const vec3 SKY_DARK_BOT  = vec3(0.1608, 0.1451, 0.1412); // stone-800  #292524
const vec3 BAND_LIGHT    = vec3(1.0000, 0.5647, 0.3412); // #ff9057, alpha 0.98
const vec3 BAND_DARK     = vec3(1.0000, 0.0078, 0.7373); // #ff02bc, alpha 0.71
const vec3 GRID_LIGHT    = vec3(0.8000, 0.3451, 0.3451); // #cc5858
const vec3 GRID_DARK     = vec3(0.8118, 0.2000, 0.8510); // #CF33D9
const vec3 SUN_LIGHT     = vec3(1.0000, 1.0000, 1.0000); // white lines
// original design intent: the sun lines are orange-500 in dark mode
const vec3 SUN_DARK      = vec3(0.9765, 0.4510, 0.0863); // orange-500 #f97316

// perspective + plane, ported from the old CSS
const float PERSP = 360.0;   // perspective: 360px
const float TILT = 85.0;     // rotateX(85deg)
const float PLANE_LEFT = -2.1; // landscape left: -80% of the 200%-wide wrapper
const float PLANE_WIDTH = 5.0; // landscape width: 250% of the 200%-wide wrapper
const float PLANE_TOP = 0.2;   // landscape top: +0.2H (height 120%, bottom -40%)
const float PLANE_HEIGHT = 1.2;
const float PLANE_CY = 0.8;    // rotation axis: landscape center, y

// grid: horizontal lines every 50px, vertical every 80px, 2px thick
const float GRID_H_STEP = 50.0;
const float GRID_V_STEP = 80.0;
const float GRID_HALF_W = 1.0;
// background-position -1px -> -50px per second: lines travel 49px/s
const float GRID_SPEED = 49.0;

// sun: 50vh box centered at (50%, 50%) with translate(-50%, -49%)
const float SUN_R = 0.25;      // radius = 0.25 * viewport height
const float SUN_CY = 0.505;    // box top 0.255H + 0.25H
const float SUN_LINES_TOP = 0.255; // box top

// sun lines: 35 lines, 1.4% tall + 0.6% gap => 2% period, opacity 0.9
const float LINE_PERIOD = 0.02;
const float LINE_HALF = 0.007;
const float LINE_OPACITY = 0.9;
const float FLICKER_PERIOD = 4.0;
const float FLICKER_DELAY = 0.2;

float coverage(float dist, float halfW, float aa) {
  return smoothstep(halfW + aa, max(halfW - aa, 0.0), dist);
}

// distance to the nearest point of a [0, size] interval on a circle of the given period
float ringDist(float m, float size, float period) {
  return min(mod(m, period), mod(size - m, period));
}

// replicates the rotateLine keyframes: rotateX 0->60deg over the first 60%
// of the cycle, 60->90deg over the next 30%, 90->0deg over the last 10%;
// delay is 0.2s per line; scaleY of the line = cos(angle)
float flickerScaleY(float lineIdx, float t) {
  float phase = fract((t - FLICKER_DELAY * lineIdx) / FLICKER_PERIOD);
  float deg;
  if (phase < 0.6) {
    deg = phase / 0.6 * 60.0;
  } else if (phase < 0.9) {
    deg = 60.0 + (phase - 0.6) / 0.3 * 30.0;
  } else {
    deg = 90.0 * (1.0 - (phase - 0.9) / 0.1);
  }
  return cos(radians(deg));
}

void main() {
  vec2 p = vec2(gl_FragCoord.x / u_dpr, u_res.y / u_dpr - gl_FragCoord.y / u_dpr);
  float W = u_res.x / u_dpr;
  float H = u_res.y / u_dpr;
  float off = u_off;
  float aa = 1.0 / u_dpr; // one device px in css units

  // sky gradient over the whole viewport
  vec3 skyLight = mix(SKY_LIGHT_TOP, SKY_LIGHT_BOT, p.y / H);
  vec3 skyDark = mix(SKY_DARK_TOP, SKY_DARK_BOT, p.y / H);
  vec3 col = mix(skyLight, skyDark, u_dark);

  // glow band: hard on-edge at 60%, then linear fade out to 75% of the block
  // (the CSS gradient's 0% stop clamps to 60% and fades to transparent at 75%)
  float bandTop = off + 0.6 * H;
  float bandBot = off + 0.75 * H; // lower boundary of the gradient
  float fade = clamp((bandBot - p.y) / (0.15 * H), 0.0, 1.0);
  float bandA = step(bandTop, p.y) * fade;
  col = mix(col, mix(col, BAND_LIGHT, 0.98), bandA * (1.0 - u_dark));
  col = mix(col, mix(col, BAND_DARK, 0.71), bandA * u_dark);

  // ---- grid plane: rotateX(TILT) under perspective: 360px ----
  float sinT = sin(radians(TILT));
  float cosT = cos(radians(TILT));
  float poY = off + 0.5 * H;   // perspective origin y (wrapper center)
  float axisY = off + PLANE_CY * H; // rotation axis y (landscape center)
  float d = p.y - poY;
  float den = d * sinT + PERSP * cosT;

  // invert the projection for the plane param t (offset from the axis)
  float t = PERSP * (d - (axisY - poY)) / den;
  float proj = PERSP / (PERSP - t * sinT); // projection scale at this depth

  if (proj > 0.0 && abs(den) > 0.001) {
    float y3 = axisY + t * cosT;
    float x3 = 0.5 * W + (p.x - 0.5 * W) / proj;
    float u = x3 - PLANE_LEFT * W;  // element-space x, css px
    float v = t + 0.6 * H;          // element-space y, css px (top edge = 0)

    // one device px expressed in element-space units (analytic derivatives)
    float dtdd = PERSP * (den - (d - (axisY - poY)) * sinT) / (den * den);
    float aaV = abs(dtdd) * aa;
    float aaU = abs((PERSP - t * sinT) / PERSP) * aa;

    float inPlane = step(0.0, u) * step(u, PLANE_WIDTH * W)
      * step(0.0, v) * step(v, PLANE_HEIGHT * H);
    if (inPlane > 0.5) {
      // the ground starts exactly at the upper boundary of the gradient:
      // the plane's far edge projects above/below it depending on viewport
      // height (a CSS-geometry quirk), so clip it to the band edge
      float gridMask = smoothstep(bandTop - aa, bandTop + aa, p.y);
      // horizontal lines scroll toward the horizon at 49px/s
      float mh = mod(v + GRID_HALF_W + GRID_SPEED * fract(u_time), GRID_H_STEP);
      float covH = coverage(ringDist(mh, 2.0 * GRID_HALF_W, GRID_H_STEP),
        GRID_HALF_W, aaV);
      float mv = mod(u + GRID_HALF_W, GRID_V_STEP);
      float covV = coverage(ringDist(mv, 2.0 * GRID_HALF_W, GRID_V_STEP),
        GRID_HALF_W, aaU);
      float grid = max(covH, covV) * gridMask;
      col = mix(col, mix(GRID_LIGHT, GRID_DARK, u_dark), grid);
    }
  }

  // ---- sun disc with flickering lines ----
  vec2 sunC = vec2(0.5 * W, off + SUN_CY * H);
  float sunR = SUN_R * H;
  float r = length(p - sunC);
  float disc = coverage(r, sunR, aa);
  if (disc > 0.0) {
    float localY = (p.y - (off + SUN_LINES_TOP * H)) / (2.0 * sunR);
    if (localY >= 0.0 && localY < 35.0 * LINE_PERIOD) {
      float idx = floor(localY / LINE_PERIOD) + 1.0; // 1-based like :nth-child
      float lineTop = (idx - 1.0) * LINE_PERIOD;
      float centerY = lineTop + LINE_HALF;
      float scaleY = flickerScaleY(idx, u_time);
      float aaSun = aa / (2.0 * sunR);
      float line = coverage(abs(localY - centerY), LINE_HALF * scaleY, aaSun);
      vec3 sunCol = mix(SUN_LIGHT, SUN_DARK, u_dark);
      col = mix(col, sunCol, line * LINE_OPACITY * disc);
    }
  }

  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
	const shader = gl.createShader(type);
	if (!shader) {
		throw new Error("shader creation failed");
	}
	gl.shaderSource(shader, src);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		throw new Error(`shader compile failed: ${gl.getShaderInfoLog(shader)}`);
	}
	return shader;
}

export function initRenderer(canvas: HTMLCanvasElement): () => void {
	const gl = canvas.getContext("webgl", {
		alpha: false,
		antialias: false,
		depth: false,
		stencil: false,
		powerPreference: "low-power",
		preserveDrawingBuffer: false,
	}) as WebGLRenderingContext | null;
	if (!gl) return () => {}; // no WebGL: page gradient fallback via CSS below

	let program: WebGLProgram;
	let uniforms: Record<string, WebGLUniformLocation | null>;
	let buffer: WebGLBuffer;
	let raf = 0;
	// the old fixed background block sat at its static position inside <main>,
	// i.e. offset by the in-flow header height (differs on mobile, where the
	// header wraps to two rows)
	const parent = canvas.closest("main");
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	let headerOffset = HEADER_OFFSET;
	const measureOffset = () => {
		headerOffset = parent ? parent.getBoundingClientRect().top : HEADER_OFFSET;
	};

	const start = () => {
		const createdProgram = gl.createProgram();
		if (!createdProgram) {
			throw new Error("program creation failed");
		}
		program = createdProgram;
		gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
		gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			throw new Error(`program link failed: ${gl.getProgramInfoLog(program)}`);
		}
		gl.useProgram(program);

		const createdBuffer = gl.createBuffer();
		if (!createdBuffer) {
			throw new Error("buffer creation failed");
		}
		buffer = createdBuffer;
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 3, -1, -1, 3]),
			gl.STATIC_DRAW,
		);
		const loc = gl.getAttribLocation(program, "a_pos");
		gl.enableVertexAttribArray(loc);
		gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

		uniforms = {
			res: gl.getUniformLocation(program, "u_res"),
			dpr: gl.getUniformLocation(program, "u_dpr"),
			time: gl.getUniformLocation(program, "u_time"),
			dark: gl.getUniformLocation(program, "u_dark"),
			off: gl.getUniformLocation(program, "u_off"),
		};
	};

	const draw = (timeSec: number) => {
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const w = Math.round(canvas.clientWidth * dpr);
		const h = Math.round(canvas.clientHeight * dpr);
		if (canvas.width !== w || canvas.height !== h) {
			canvas.width = w;
			canvas.height = h;
		}
		gl.viewport(0, 0, w, h);
		gl.uniform2f(uniforms.res, w, h);
		gl.uniform1f(uniforms.dpr, dpr);
		gl.uniform1f(uniforms.time, timeSec);
		gl.uniform1f(
			uniforms.dark,
			window.document.documentElement.classList.contains("dark") ? 1 : 0,
		);
		gl.uniform1f(uniforms.off, headerOffset);
		gl.drawArrays(gl.TRIANGLES, 0, 3);
	};

	const loop = () => {
		draw(performance.now() / 1000);
		raf = requestAnimationFrame(loop);
	};

	const startLoop = () => {
		cancelAnimationFrame(raf);
		if (reducedMotion.matches) {
			draw(0); // static frame; redrawn on resize/theme change
		} else {
			loop();
		}
	};

	const onResize = () => {
		measureOffset();
		startLoop();
	};
	const onThemeChange = () => {
		if (reducedMotion.matches) draw(0);
	};

	const observer = new MutationObserver(onThemeChange);
	observer.observe(window.document.documentElement, {
		attributes: true,
		attributeFilter: ["class"],
	});
	// the header height depends on the retro webfont, which loads after mount
	const header = parent?.previousElementSibling ?? null;
	const headerObserver =
		header && "ResizeObserver" in window ? new ResizeObserver(onResize) : null;
	if (headerObserver && header) headerObserver.observe(header);
	document.fonts?.ready.then(() => {
		measureOffset();
		if (reducedMotion.matches) draw(0);
	});
	reducedMotion.addEventListener?.("change", onResize);
	window.addEventListener("resize", onResize);

	const onContextLost = (e: Event) => {
		e.preventDefault();
		cancelAnimationFrame(raf);
	};
	const onContextRestored = () => {
		start();
		startLoop();
	};
	canvas.addEventListener("webglcontextlost", onContextLost);
	canvas.addEventListener("webglcontextrestored", onContextRestored);

	start();
	measureOffset();
	startLoop();

	return () => {
		cancelAnimationFrame(raf);
		observer.disconnect();
		headerObserver?.disconnect();
		reducedMotion.removeEventListener?.("change", onResize);
		window.removeEventListener("resize", onResize);
		canvas.removeEventListener("webglcontextlost", onContextLost);
		canvas.removeEventListener("webglcontextrestored", onContextRestored);
		gl.getExtension("WEBGL_lose_context")?.loseContext();
	};
}
