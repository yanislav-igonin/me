import Head from "next/head";
import { Header } from "../Header";
import { Metatags } from "./Metatags";
import { SynthwaveBackground } from "./SynthwaveBackground";

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => (
	// The shell is exactly one viewport tall and never scrolls itself:
	// the header stays pinned, and <main> is the only scroll container
	// (no-op on static pages, scrolls on content-heavy pages like /projects).
	<div className="flex h-dvh flex-col overflow-hidden">
		<Head>
			<Metatags />
		</Head>

		<Header />

		<main className="relative flex flex-1 min-h-0 flex-col overflow-y-auto">
			<SynthwaveBackground />

			{children}
		</main>
	</div>
);
