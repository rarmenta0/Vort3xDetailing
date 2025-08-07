// @ts-nocheck


import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onInteraction: (x: number, y: number) => void;
}

export const HeroSection = ({ onInteraction }: HeroSectionProps) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    onInteraction(x, y);
  };

  return (
    <section 
      className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-6 text-center z-10 relative">
        <div className="animate-fade-in-up">
          <img 
            src="/lovable-uploads/9eab8ca9-9d5d-42fc-b419-7543830c2e07.png"
            alt="Vortex Detailing Logo"
            className="mx-auto mb-8 w-80 h-80 object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Premium Car Detailing
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Experience the ultimate in automotive care with our professional detailing services. 
            We bring your vehicle back to showroom condition.
          </p>
        </div>

        <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              onInteraction(rect.left / window.innerWidth, rect.top / window.innerHeight);
            }}
          >
            Book Now
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              onInteraction(rect.left / window.innerWidth, rect.top / window.innerHeight);
            }}
          >
            Our Services
          </Button>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-bubble-light rounded-full animate-bubble-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-bubble-medium rounded-full animate-bubble-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-bubble-dark rounded-full animate-bubble-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-40 w-16 h-16 bg-bubble-light rounded-full animate-bubble-float" style={{ animationDelay: '6s' }}></div>
      </div>
    </section>
  );
};