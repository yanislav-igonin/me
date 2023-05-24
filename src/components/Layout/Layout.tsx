import { Header } from '../Header';
import Head from 'next/head';
import { Canvas } from '@react-three/fiber';
import { Metatags } from './Metatags';
import { Cube } from '../Cube';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  // const [boxPosition, setBoxPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [boxesPosition, setBoxesPositions] = useState<[number, number, number][]>([
    // [0, 0, 0],
    [2, 0, 0],
    [-2, 0, 0],
    [0, 2, 0],
    [0, -2, 0],
    // [0, 0, 2],
    [0, 0, -2],
  ]);
  
  // change box position based on mouse position
  useEffect(() => {
    // const onMouseMove = (e: MouseEvent) => {
    //   const x = e.clientX / window.innerWidth;
    //   const y = e.clientY / window.innerHeight;
    //   setBoxPosition([x * 4 - 2, -(y * 4 - 2), 0]);
    // };

    // window.addEventListener('mousemove', onMouseMove);

    // return () => {
    //   window.removeEventListener('mousemove', onMouseMove);
    // };
  });

  return <div>
    <Head>
      <Metatags />
    </Head>

    <Header />

    <main className={'flex h-screen justify-center items-center'}>

      <div className='absolute inset-0 -z-10'>
        <Canvas>
          <ambientLight />
          {boxesPosition.map((position, index) => <Cube key={index} position={position} />)}
        </Canvas>
      </div>

      {children}
    </main>
  </div>;
};
