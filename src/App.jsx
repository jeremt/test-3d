import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './App.css'

function App() {
  return (
      <Canvas className='canvas'>
      <ambientLight intensity={0.3} />
      <directionalLight position={[1, 0, 1]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
    </Canvas>
  )
}

export default App
