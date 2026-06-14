import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ShieldGeometry: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const orbitsRef = useRef<THREE.Group>(null);

  // Create shield shape using a custom geometry
  const shieldShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Shield outline
    shape.moveTo(0, 4);
    shape.bezierCurveTo(2.5, 4, 4, 2.5, 4, 1);
    shape.bezierCurveTo(4, -1.5, 2, -3.5, 0, -5);
    shape.bezierCurveTo(-2, -3.5, -4, -1.5, -4, 1);
    shape.bezierCurveTo(-4, 2.5, -2.5, 4, 0, 4);
    return shape;
  }, []);

  const shieldGeom = useMemo(() => new THREE.ExtrudeGeometry(shieldShape, {
    depth: 0.5,
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.1,
    bevelSegments: 4,
  }), [shieldShape]);

  // Orbital dots
  const orbitalPositions = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * 5.5, Math.sin(angle) * 5.5, 0);
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.3;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.6;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.4;
    if (orbitsRef.current) orbitsRef.current.rotation.z = t * 0.3;
    if (innerRef.current) {
      const pulse = 1 + Math.sin(t * 2.5) * 0.05;
      innerRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Shield */}
      <mesh geometry={shieldGeom} position={[-2, 0.5, 0]}>
        <meshPhongMaterial
          color="#0070f3"
          emissive="#0051cc"
          emissiveIntensity={0.3}
          transparent
          opacity={0.85}
          shininess={80}
        />
      </mesh>

      {/* Shield wireframe overlay */}
      <mesh geometry={shieldGeom} position={[-2, 0.5, 0]}>
        <meshBasicMaterial color="#06ffa5" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Inner glowing core */}
      <mesh ref={innerRef} position={[0, 0, 0.5]}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshPhongMaterial
          color="#06ffa5"
          emissive="#06ffa5"
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.08, 8, 64]} />
        <meshPhongMaterial color="#0070f3" emissive="#0070f3" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[5.2, 0.06, 8, 64]} />
        <meshPhongMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.5} transparent opacity={0.4} />
      </mesh>

      {/* Orbital dots */}
      <group ref={orbitsRef}>
        {orbitalPositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshPhongMaterial
              color={i % 2 === 0 ? "#06ffa5" : "#0070f3"}
              emissive={i % 2 === 0 ? "#06ffa5" : "#0070f3"}
              emissiveIntensity={0.9}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const Hero3DShield: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 400 }}>
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#0070f3" />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#7c3aed" />
        <pointLight position={[0, 0, 8]} intensity={0.6} color="#06ffa5" />
        <ShieldGeometry />
      </Canvas>
    </div>
  );
};

export default Hero3DShield;
