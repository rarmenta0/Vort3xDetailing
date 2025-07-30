import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BubbleProps {
  position: [number, number, number];
  delay: number;
  scale: number;
  onComplete?: () => void;
}

const Bubble = ({ position, delay, scale, onComplete }: BubbleProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhongMaterial>(null);
  const [startTime] = useState(() => Date.now() + delay * 1000);
  const [isVisible, setIsVisible] = useState(false);

  // Create stable geometry and material
  const geometry = useMemo(() => new THREE.SphereGeometry(scale, 16, 16), [scale]);
  const material = useMemo(() => new THREE.MeshPhongMaterial({
    color: 0x4da6ff,
    transparent: true,
    opacity: 0,
    shininess: 100,
    specular: 0x4444aa
  }), []);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;

    const elapsed = (Date.now() - startTime) / 1000;
    
    if (elapsed > 0 && !isVisible) {
      setIsVisible(true);
    }

    if (elapsed > 0) {
      // Floating animation
      const progress = (elapsed % 8) / 8;
      const yPos = position[1] + Math.sin(progress * Math.PI * 2) * 0.5;
      const wobble = Math.sin(elapsed * 2) * 0.1;
      
      meshRef.current.position.set(
        position[0] + wobble,
        yPos + progress * 15 - 7.5,
        position[2]
      );

      // Scale animation
      const currentScale = Math.min(1, elapsed * 2) * (0.8 + Math.sin(elapsed * 3) * 0.2);
      meshRef.current.scale.setScalar(currentScale);

      // Opacity animation
      if (progress > 0.9) {
        materialRef.current.opacity = Math.max(0, (1 - progress) * 10);
      } else {
        materialRef.current.opacity = Math.min(0.8, 0.3 + Math.sin(elapsed * 2) * 0.3);
      }

      // Reset when complete
      if (progress > 0.99 && onComplete) {
        onComplete();
      }
    }
  });

  if (!isVisible) return null;

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhongMaterial 
        ref={materialRef} 
        color={0x4da6ff}
        transparent={true}
        opacity={0}
        shininess={100}
        specular={0x4444aa}
      />
    </mesh>
  );
};

interface BubbleSceneProps {
  triggerBurst: number;
  mousePosition: { x: number; y: number };
}

export const BubbleScene = ({ triggerBurst, mousePosition }: BubbleSceneProps) => {
  const [bubbles, setBubbles] = useState<Array<{ 
    id: number; 
    position: [number, number, number]; 
    delay: number;
    scale: number;
  }>>([]);
  const bubbleIdRef = useRef(0);

  useEffect(() => {
    // Initial bubbles on load - limit the number to prevent WebGL issues
    const initialBubbles = Array.from({ length: 10 }, (_, i) => ({
      id: bubbleIdRef.current++,
      position: [
        (Math.random() - 0.5) * 15,
        Math.random() * 8 - 4,
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      delay: i * 0.3,
      scale: 0.1 + Math.random() * 0.15
    }));
    setBubbles(initialBubbles);
  }, []);

  useEffect(() => {
    if (triggerBurst > 0) {
      // Add fewer bubbles to prevent overload
      const newBubbles = Array.from({ length: 5 }, (_, i) => ({
        id: bubbleIdRef.current++,
        position: [
          (mousePosition.x - 0.5) * 8 + (Math.random() - 0.5) * 2,
          (mousePosition.y - 0.5) * -8 + (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 4
        ] as [number, number, number],
        delay: i * 0.1,
        scale: 0.08 + Math.random() * 0.12
      }));
      
      setBubbles(prev => [...prev, ...newBubbles]);
    }
  }, [triggerBurst, mousePosition]);

  const handleBubbleComplete = (id: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    
    // Only add new bubble if we don't have too many
    setBubbles(prev => {
      if (prev.length < 15) {
        const newBubble = {
          id: bubbleIdRef.current++,
          position: [
            (Math.random() - 0.5) * 15,
            -6,
            (Math.random() - 0.5) * 8
          ] as [number, number, number],
          delay: Math.random() * 1,
          scale: 0.1 + Math.random() * 0.15
        };
        return [...prev, newBubble];
      }
      return prev;
    });
  };

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
      gl={{ antialias: false, alpha: true }}
      dpr={Math.min(window.devicePixelRatio, 2)}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#4da6ff" />
      
      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.id}
          position={bubble.position}
          delay={bubble.delay}
          scale={bubble.scale}
          onComplete={() => handleBubbleComplete(bubble.id)}
        />
      ))}
    </Canvas>
  );
};
