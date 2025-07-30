import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface BubbleProps {
  position: [number, number, number];
  delay: number;
  onComplete?: () => void;
}

const Bubble = ({ position, delay, onComplete }: BubbleProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const [startTime] = useState(() => Date.now() + delay * 1000);
  const [isVisible, setIsVisible] = useState(false);

  useFrame(() => {
    if (!ref.current) return;

    const elapsed = (Date.now() - startTime) / 1000;
    
    if (elapsed > 0 && !isVisible) {
      setIsVisible(true);
    }

    if (elapsed > 0) {
      // Floating animation
      const progress = (elapsed % 8) / 8;
      const yPos = position[1] + Math.sin(progress * Math.PI * 2) * 0.5;
      const wobble = Math.sin(elapsed * 2) * 0.1;
      
      ref.current.position.set(
        position[0] + wobble,
        yPos + progress * 15 - 7.5,
        position[2]
      );

      // Scale animation
      const scale = Math.min(1, elapsed * 2) * (0.3 + Math.sin(elapsed * 3) * 0.1);
      ref.current.scale.setScalar(scale);

      // Fade out at the end
      const material = ref.current.material as THREE.MeshPhongMaterial;
      if (progress > 0.9) {
        material.opacity = (1 - progress) * 10;
      } else {
        material.opacity = 0.6 + Math.sin(elapsed * 2) * 0.2;
      }

      // Reset when complete
      if (progress > 0.99 && onComplete) {
        onComplete();
      }
    }
  });

  return (
    <Sphere ref={ref} args={[0.1 + Math.random() * 0.2]} position={position} visible={isVisible}>
      <meshPhongMaterial
        color={new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.8, 0.7)}
        transparent
        opacity={0}
        shininess={100}
        specular={new THREE.Color(0x4444aa)}
      />
    </Sphere>
  );
};

interface BubbleSceneProps {
  triggerBurst: number;
  mousePosition: { x: number; y: number };
}

export const BubbleScene = ({ triggerBurst, mousePosition }: BubbleSceneProps) => {
  const [bubbles, setBubbles] = useState<Array<{ id: number; position: [number, number, number]; delay: number }>>([]);
  const bubbleIdRef = useRef(0);

  useEffect(() => {
    // Initial bubbles on load
    const initialBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: bubbleIdRef.current++,
      position: [
        (Math.random() - 0.5) * 20,
        Math.random() * 10 - 5,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      delay: i * 0.2
    }));
    setBubbles(initialBubbles);
  }, []);

  useEffect(() => {
    if (triggerBurst > 0) {
      // Add burst of bubbles near mouse position
      const newBubbles = Array.from({ length: 8 }, (_, i) => ({
        id: bubbleIdRef.current++,
        position: [
          (mousePosition.x - 0.5) * 10 + (Math.random() - 0.5) * 3,
          (mousePosition.y - 0.5) * -10 + (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 5
        ] as [number, number, number],
        delay: i * 0.1
      }));
      
      setBubbles(prev => [...prev, ...newBubbles]);
    }
  }, [triggerBurst, mousePosition]);

  const handleBubbleComplete = (id: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    
    // Add a new bubble to keep the scene active
    const newBubble = {
      id: bubbleIdRef.current++,
      position: [
        (Math.random() - 0.5) * 20,
        -8,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      delay: Math.random() * 2
    };
    setBubbles(prev => [...prev, newBubble]);
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
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#4da6ff" />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#80d4ff" />
      
      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.id}
          position={bubble.position}
          delay={bubble.delay}
          onComplete={() => handleBubbleComplete(bubble.id)}
        />
      ))}
    </Canvas>
  );
};
