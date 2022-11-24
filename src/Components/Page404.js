import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  useGLTF, Environment, Lightformer, Float, BakeShadows, ContactShadows,
} from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import logo from '../assets/metallic.gltf';

function CameraController() {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 30;
      controls.maxDistance = 200;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl],
  );
  return null;
}
function Model() {
  const { scene } = useGLTF(logo);
  return <primitive object={scene} />;
}

export function ShowLogo() {
  return (
    <div style={{ height: '50vh', width: '100vw' }}>
      <Canvas
        camera={{ fov: 75, position: [0, 50, 0] }}
      >

        <Suspense fallback={null}>
          <Model scale={1.6} position={[-0.5, -0.18, 0]} rotation={[0, Math.PI / 5, 0]} />
          <Environment frames={Infinity} resolution={256}>
            {/* Accent (red) */}
            <Float speed={5} floatIntensity={2} rotationIntensity={2}>
              <Lightformer form="rect" intensity={4} scale={50} position={[0, 60, 0]} target={[0, 0, 0]} />
              <Lightformer form="ring" intensity={3} scale={10} position={[-10, -60, 0]} target={[0, 0, 0]} />

            </Float>
          </Environment>
          <CameraController />
        </Suspense>

      </Canvas>
    </div>
  );
}

export default function Page404() {
  const navigate = useNavigate();
  const [threeD, setThreeD] = useState(false);

  function show3d(e) {
    e.preventDefault();
    threeD === true ? setThreeD(false) : setThreeD(true);
  }

  return (
    <div className="h-full flex m-0 py-5 w-screen gap-36  bg-ceca-color-login-background flex-col items-center ">

    {threeD ? <ShowLogo onClick={show3d} /> : (
      <div onClick={show3d} className="w-full flex justify-center max-w-2xl">
        <img src={require('../assets/IMG_0067.PNG')} className="aspect-auto w-full" />
      </div>
    )}
    <div className="w-full h-max flex justify-center items-start">
      <div>
      <p className='"bg-ceca-color-button-color rounded-full text-xl text-ceca-color-button-color  font-semibold'>404, Page not found. How unfortunate.</p>
<div className="w-full flex justify-center">
{' '}

<button className="bg-ceca-color-button-color rounded-full w-4/5 h-10 text-ceca-color-login-background font-semibold mt-4" onClick={() => navigate('/login')}>Go back</button>
{' '}
</div>
      </div>

    </div>

  </div>

  );
}
