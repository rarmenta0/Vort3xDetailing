import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Sparkles, Shield, Car } from "lucide-react";

const services = [
  {
    icon: <Droplets className="w-8 h-8 text-primary" />,
    title: "Premium Wash",
    description: "Complete exterior and interior cleaning with premium products",
    features: ["Hand wash", "Interior vacuum", "Tire shine", "Glass cleaning"]
  },
  {
    icon: <Sparkles className="w-8 h-8 text-accent" />,
    title: "Paint Correction",
    description: "Professional paint correction to restore your vehicle's finish",
    features: ["Swirl removal", "Scratch repair", "Paint polishing", "Clear coat restoration"]
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Ceramic Coating",
    description: "Long-lasting protection with our premium ceramic coating",
    features: ["Paint protection", "Hydrophobic coating", "UV protection", "Easy maintenance"]
  },
  {
    icon: <Car className="w-8 h-8 text-accent" />,
    title: "Full Detail",
    description: "Complete transformation package for the ultimate clean",
    features: ["Everything included", "Engine bay cleaning", "Leather conditioning", "Paint protection"]
  }
];

interface ServicesSectionProps {
  onServiceHover: (x: number, y: number) => void;
}

export const ServicesSection = ({ onServiceHover }: ServicesSectionProps) => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional car detailing services designed to keep your vehicle looking its absolute best
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (rect.left + rect.width / 2) / window.innerWidth;
                const y = (rect.top + rect.height / 2) / window.innerHeight;
                onServiceHover(x, y);
              }}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-foreground">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};