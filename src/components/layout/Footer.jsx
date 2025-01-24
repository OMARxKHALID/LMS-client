import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="max-w-[600px] text-muted-foreground">
              Subscribe to our newsletter for new arrivals and exclusive offers
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                className="max-w-lg flex-1 bg-background/60 backdrop-blur-sm"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex space-x-4"
          >
            <Link
              className="text-muted-foreground hover:text-primary transition-colors"
              href="/privacy-policy"
            >
              <Facebook className="h-6 w-6" />
            </Link>
            <Link
              className="text-muted-foreground hover:text-primary transition-colors"
              href="#"
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              className="text-muted-foreground hover:text-primary transition-colors"
              href="#"
            >
              <Instagram className="h-6 w-6" />
            </Link>
            <Link
              className="text-muted-foreground hover:text-primary transition-colors"
              href="#"
            >
              <Mail className="h-6 w-6" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 text-center"
          >
            <Link
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              href="#"
            >
              Terms & Conditions
            </Link>
            <Link
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              href="#"
            >
              Cookie Policy
            </Link>
          </motion.div>
          <p className="text-xs text-muted-foreground">
            © 2024 Library System. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
