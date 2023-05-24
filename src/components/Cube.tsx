// Box.tsx
import { FC, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';

interface BoxProps {
  position: [number, number, number];
}

export const Box: FC<BoxProps> = ({ position }) => {
  const boxRef = useRef<Mesh>(null);
  const edgesRef = useRef<LineSegments>(null);

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.01;
      boxRef.current.rotation.y += .01;
      boxRef.current.rotation.z += .01;
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.x += 0.01;
      edgesRef.current.rotation.y += .01;
      edgesRef.current.rotation.z += .01;
    }
  });

  // rerender the component when the position changes
  useEffect(() => {
    console.log('rerendering');
    boxRef.current?.position.set(...position);
    edgesRef.current?.position.set(...position);
  }, [position]);

  return (
    <>
      <mesh ref={boxRef} position={position}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[boxRef.current?.geometry]} />
        <lineBasicMaterial color={'black'} />
      </lineSegments>
    </>
  );
};

