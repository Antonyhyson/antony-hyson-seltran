import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './Background3D.css'; // Ensure your CSS sets this to fullscreen and z-index -1

// Extend THREE for custom shader material
extend({ MountainShaderMaterial: THREE.ShaderMaterial });

// --- Mountain Component ---
interface MountainProps {
  color1: string;
  color2: string;
  snowColor: string;
}

const Mountain: React.FC<MountainProps> = ({ color1, color2, snowColor }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Define custom shader for the mountain (simplified for snow cap effect)
  // Vertex Shader: Passes position and normal to fragment shader
  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment Shader: Colors based on normal direction (for snow) and height
  const fragmentShader = `
    uniform vec3 u_color1;
    uniform vec3 u_color2;
    uniform vec3 u_snowColor;
    uniform float u_time;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      // Calculate height factor (for color blending)
      float heightFactor = (vPosition.y + 10.0) / 20.0; // Assuming mountain height from -10 to 10
      heightFactor = clamp(heightFactor, 0.0, 1.0);

      // Simple snow cap based on upward normal direction
      float snowAmount = smoothstep(0.7, 0.9, vNormal.y); // More snow on flatter tops
      snowAmount = mix(snowAmount, 1.0, heightFactor * heightFactor); // More snow at higher altitudes

      vec3 finalColor = mix(u_color1, u_color2, heightFactor); // Blend colors based on height
      finalColor = mix(finalColor, u_snowColor, snowAmount); // Blend with snow color

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  const uniforms = useMemo(() => ({
    u_color1: { value: new THREE.Color(color1) },
    u_color2: { value: new THREE.Color(color2) },
    u_snowColor: { value: new THREE.Color(snowColor) },
    u_time: { value: 0.0 }
  }), [color1, color2, snowColor]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -10, 0]} rotation={[0, Math.PI / 4, 0]}>
      {/* ConeGeometry for the mountain shape - adjust args for size and detail */}
      <coneGeometry args={[15, 20, 64]} /> {/* radius, height, radialSegments */}
      {/* Custom ShaderMaterial */}
      <shaderMaterial
        ref={materialRef}
        attach="material"
        args={[{
          uniforms: uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          transparent: false,
          depthWrite: true,
          side: THREE.DoubleSide, // Render both sides
        }]}
      />
    </mesh>
  );
};

// --- Snowfall Component ---
const Snowfall: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const { viewport, mouse } = useThree();

  const numSnowflakes = 10000;
  const range = 200; // Spread of snow across x, y, z

  const particles = useMemo(() => {
    const positions = new Float32Array(numSnowflakes * 3);
    for (let i = 0; i < numSnowflakes; i++) {
      positions[i * 3] = (Math.random() - 0.5) * range; // X
      positions[i * 3 + 1] = Math.random() * range; // Y (starts higher)
      positions[i * 3 + 2] = (Math.random() - 0.5) * range; // Z
    }
    return positions;
  }, [numSnowflakes, range]);

  useFrame((state) => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      const elapsedTime = state.clock.elapsedTime;

      // Mouse influence for wind effect
      const mouseX = (mouse.x * viewport.width) / 10;
      const mouseY = (mouse.y * viewport.height) / 10;

      for (let i = 0; i < numSnowflakes; i++) {
        const i3 = i * 3;
        // Move snow downwards
        positions[i3 + 1] -= 0.1 + Math.sin(elapsedTime * 0.5 + i) * 0.005; // Base speed + subtle wiggle

        // Add subtle horizontal drift based on time and mouse
        positions[i3] += Math.sin(elapsedTime * 0.2 + i3) * 0.005 + mouseX * 0.0001;
        positions[i3 + 2] += Math.cos(elapsedTime * 0.25 + i3) * 0.005 + mouseY * 0.0001;

        // Loop snow when it falls below the view or goes too far horizontally
        if (positions[i3 + 1] < -range / 2) {
          positions[i3 + 1] = range / 2; // Reset to top
        }
        if (positions[i3] > range / 2 || positions[i3] < -range / 2) {
          positions[i3] = (Math.random() - 0.5) * range; // Reset X
        }
        if (positions[i3 + 2] > range / 2 || positions[i3 + 2] < -range / 2) {
          positions[i3 + 2] = (Math.random() - 0.5) * range; // Reset Z
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true; // Tell Three.js to update
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={true}>
      <PointMaterial
        transparent
        color="#E0FFFF" // Snow white
        size={0.15} // Smaller snowflake size
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8} // Slightly transparent
        vertexColors={false}
      />
    </Points>
  );
};

// --- Main Background3D Component ---
const Background3D: React.FC = () => {
  return (
    <div className="background-3d">
      <Canvas
        camera={{ position: [0, 10, 40], fov: 75 }} // Adjusted camera position to view mountain
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // Transparent canvas background
        }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 20, 20]} intensity={0.8} />
        <directionalLight position={[-10, 30, 10]} intensity={0.6} color="#ffffff" />
        
        {/* OrbitControls for interactive camera */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minDistance={20} 
          maxDistance={80} 
          minPolarAngle={Math.PI / 4} // Prevent going below ground
          maxPolarAngle={Math.PI / 2 - 0.1} // Prevent going too far above
          dampingFactor={0.05} // Smooth camera movement
        />

        {/* The Mountain and Snowfall components */}
        <Mountain color1="#2a2a2a" color2="#4a4a4a" snowColor="#F0F8FF" /> {/* Dark rock, light rock, snow */}
        <Snowfall />
      </Canvas>
    </div>
  );
};

export default Background3D;