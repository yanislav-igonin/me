import { Header } from '../Header';
import Head from 'next/head';
import { Canvas } from '@react-three/fiber';
import { Metatags } from './Metatags';
import { Box } from '../Cube';

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

      <div className='absolute inset-0 -z-10'>
        <Canvas>
          <mesh>
            <ambientLight />
            <Box position={[0, 0, 0]} />
          </mesh>
        </Canvas>
      </div>

      {children}
    </main>
  </div>;
