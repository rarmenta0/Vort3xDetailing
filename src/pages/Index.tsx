import { useState, useCallback } from 'react';
import { BubbleScene } from '@/components/BubbleScene';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ContactSection } from '@/components/ContactSection';

const Index = () => {
  const [bubbleTrigger, setBubbleTrigger] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const handleInteraction = useCallback((x: number, y: number) => {
    setMousePosition({ x, y });
    setBubbleTrigger(prev => prev + 1);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Bubble Scene */}
      <BubbleScene triggerBurst={bubbleTrigger} mousePosition={mousePosition} />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection onInteraction={handleInteraction} />
        <ServicesSection onServiceHover={handleInteraction} />
        <ContactSection onInteraction={handleInteraction} />
      </main>
    </div>
  );
};

export default Index;
