import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';

// <div className="absolute top-28 right-0 left-0 z-10 flex items-center justify-center">
//   PopUp
// </div>

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotetion = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale: [0.9, 0.9, 0.9];
    } else {
      screenScale: [1, 1, 1];
    }

    return [screenScale, screenPosition, rotetion];
  };

  const adjustPlaneForScreenSize = () => {
    let planeScale, planePosition;

    if (window.innerWidth < 768) {
      planeScale: [1.5, 1.5, 1.5];
      planePosition = [0, -1.5, -0];
    } else {
      planeScale: [3, 3, 3];
      planePosition = [0, -4, -4];
    }

    return [planeScale, planePosition];
  };

  const [islandScale, islandPosition, islandRotetion] =
    adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className=" w-full h-screen relative">
      <Canvas
        className={`w-full h-screen ${
          isRotating ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />

          <Bird />
          <Sky />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotetion={islandRotetion}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
          <Plane
            isRotating={isRotating}
            planeScale={planeScale}
            planePosition={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
