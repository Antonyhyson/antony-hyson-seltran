import React, { useRef } from 'react';;
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SkillOrb {
  label: string;
  level: number;
  color: string;
  angle: number;
  radius: number;
}

const SKILL_ORBS: SkillOrb[] = [
  { label: 'Pen Testing', level: 90, color: '#0070f3', angle: 0, radius: 3.5 },
  { label: 'Vuln Assessment', level: 95, color: '#06ffa5', angle: 60, radius: 3.5 },
  { label: 'Python', level: 95, color: '#7c3aed', angle: 120, radius: 3.5 },
  { label: 'Network Sec', level: 90, color: '#0070f3', angle: 180, radius: 3.5 },
  { label: 'Forensics', level: 82, color: '#06ffa5', angle: 240, radius: 3.5 },
  { label: 'Malware Analysis', level: 80, color: '#7c3aed', angle: 300, radius: 3.5 },
];

const OrbitalSkills: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const orbRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.25;
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.07;
      coreRef.current.scale.setScalar(s);
    }
    orbRefs.current.forEach((orb, i) => {
      if (orb) {
        orb.rotation.y = -t * 0.5;
        orb.position.z = Math.sin(t * 0.8 + i) * 0.3;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          color="#0051cc"
          emissive="#0070f3"
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
          wireframe
        />
      </mesh>

      {/* Equatorial ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.04, 8, 64]} />
        <meshPhongMaterial color="#06ffa5" emissive="#06ffa5" emissiveIntensity={0.8} />
      </mesh>

      {/* Skill orbs on orbit */}
      {SKILL_ORBS.map((orb, i) => {
        const angleRad = (orb.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * orb.radius;
        const y = Math.sin(angleRad * 0.5) * 1.2;
        const z = Math.sin(angleRad) * orb.radius;
        const size = 0.15 + (orb.level / 100) * 0.35;

        return (
          <group key={i} position={[x, y, z]}>
            <mesh ref={(el) => { orbRefs.current[i] = el; }}>
              <sphereGeometry args={[size, 16, 16]} />
              <meshPhongMaterial
                color={orb.color}
                emissive={orb.color}
                emissiveIntensity={0.7}
                transparent
                opacity={0.9}
              />
            </mesh>
            {/* Connection line to center */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([0, 0, 0, -x, -y, -z]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color={orb.color} transparent opacity={0.25} />
            </line>
          </group>
        );
      })}

      {/* Outer orbit ring */}
      <mesh rotation={[0.3, 0, 0]}>
        <torusGeometry args={[3.5, 0.025, 8, 100]} />
        <meshPhongMaterial color="#0070f3" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-0.5, 0.5, 0]}>
        <torusGeometry args={[4.2, 0.02, 8, 100]} />
        <meshPhongMaterial color="#7c3aed" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

const Skills3DRadar: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 320 }}>
      <Canvas
        camera={{ position: [0, 3, 10], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#0070f3" />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#7c3aed" />
        <OrbitalSkills />
      </Canvas>
    </div>
  );
};

export default Skills3DRadar;
