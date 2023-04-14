// Box.tsx
import { FC, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface BoxProps {
  position: [number, number, number];
}

export const Box: FC<BoxProps> = ({ position }) => {
  const mesh = useRef<Mesh>(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += .01;
      mesh.current.rotation.z += .01;
    }
  });

  // rerender the component when the position changes
  useEffect(() => {
    console.log('rerendering');
    mesh.current?.position.set(...position);
  }, [position]);

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
};

