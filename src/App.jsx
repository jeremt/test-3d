import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, Plane, RoundedBox } from '@react-three/drei'
import { Text3D, Center } from '@react-three/drei'

import './App.css'
function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Project = ({project, offset}) => {
  return <group position-z={1 + 1.2 * offset}>
    <Center position-y={1}>
    <Text3D castShadow receiveShadow scale={0.5} font="https://raw.githubusercontent.com/emreacar/google-fonts-as-json/master/json-files/Oswald_Bold.json">
      {project.name}
      <meshStandardMaterial  metalness={0.9} color="red" />
      </Text3D>
    </Center>
      <RoundedBox >
  <meshStandardMaterial color="blue" />
</RoundedBox>
    </group>
}

export default function App() {
  const myProjects = [{name: "Mon project"}, {name: "Mon autre project"}, {name: "Mon dernier project"}]
  return (
    <Canvas className='canvas' shadows>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Center><Text3D castShadow receiveShadow font="https://raw.githubusercontent.com/emreacar/google-fonts-as-json/master/json-files/Oswald_Bold.json">
      Hello world!
      <meshStandardMaterial color="green" />
      </Text3D></Center>
      {myProjects.map((project, i) => {
        return <Project key={project.name} project={project} offset={i} />
      })}
      <Plane args={[10, 10]} position-y={-1} rotation-x={-Math.PI / 2} />
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      <Environment preset='forest' />
    </Canvas>
  )
}
