// @ts-nocheck

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";

interface ContactSectionProps {
  onInteraction: (x: number, y: number) => void;
}

export const ContactSection = ({ onInteraction }: ContactSectionProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    onInteraction(x, y);
  };

  return (
    <section className="py-20 px-6 bg-gradient-hero">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to give your car the treatment it deserves? Contact us today to schedule your appointment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-muted-foreground">(256) 321-6885</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-accent" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">info@vortexdetailing.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Location</p>
                    <p className="text-muted-foreground">Athens, AL</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-accent" />
                  <div>
                    <p className="font-semibold text-foreground">Hours</p>
                    <p className="text-muted-foreground">Mon-Fri: 8AM-6PM<br />Sat: 9AM-4PM<br />Sun: Closed</p>
                  </div>
                </div>
                <a
                href="https://www.instagram.com/vort3xdetailing/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 hover:opacity-80"
              >
                <Instagram className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Instagram</p>
                  <p className="text-muted-foreground">Vort3xDetailing</p>
                </div>
              </a>

              </CardContent>
            </Card>
          </div>

          {/* Schedule service section*/}
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">Schedule Service</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    placeholder="First Name" 
                    className="bg-muted border-border text-foreground"
                  />
                  <Input 
                    placeholder="Last Name" 
                    className="bg-muted border-border text-foreground"
                  />
                </div>
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-muted border-border text-foreground"
                />
                <Input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="bg-muted border-border text-foreground"
                />
                <Input 
                  placeholder="Vehicle Year, Make, Model" 
                  className="bg-muted border-border text-foreground"
                />
                <Textarea 
                  placeholder="Tell us about the services you're interested in..." 
                  className="bg-muted border-border text-foreground min-h-[120px]"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};