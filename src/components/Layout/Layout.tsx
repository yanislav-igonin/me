import { Header } from '../Header';
import Head from 'next/head';
import { Canvas } from '@react-three/fiber';
import { Metatags } from './Metatags';

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) =>
  <div>
    <Head>
      <Metatags />
    </Head>

    <Header />

    <main className={'flex h-screen justify-center items-center'}>

      <div className='absolute inset-0'>
        <Canvas>
          <mesh>
            <boxGeometry rotateX={5} rotateZ={5} rotateY={200}/>
            <meshStandardMaterial />
          </mesh>
        </Canvas>
      </div>

      {children}
    </main>
  </div>;
