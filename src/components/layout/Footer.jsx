import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Subscribed successfully",
        description: "Thank you for subscribing to our newsletter!",
      });
      setEmail("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full border-t bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/50 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter text-primary">
              Stay Updated
            </h2>
            <p className="max-w-[600px] text-muted-foreground">
              Subscribe to our newsletter for new arrivals and exclusive offers
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                className="max-w-lg flex-1"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </div>
          <div className="flex space-x-4">
            <Link
              className="text-gray-500 hover:text-gray-900"
              href="/privacy-policy"
            >
              <Facebook className="h-6 w-6" />
            </Link>
            <Link className="text-gray-500 hover:text-gray-900" href="#">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link className="text-gray-500 hover:text-gray-900" href="#">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link className="text-gray-500 hover:text-gray-900" href="#">
              <Mail className="h-6 w-6" />
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-center">
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="#"
            >
              Terms & Conditions
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="#"
            >
              Cookie Policy
            </Link>
          </div>
          <p className="text-xs text-gray-500">
            © 2024 Library System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
