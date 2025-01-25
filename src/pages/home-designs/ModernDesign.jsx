import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  Search,
  BookOpen,
  Users,
  Star,
  GraduationCap,
  Library,
  BookText,
  Clock,
  Check,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const stats = [
  { count: "50K+", label: "Books Available", icon: BookOpen },
  { count: "10K+", label: "Active Readers", icon: Users },
  { count: "1000+", label: "Daily Borrows", icon: Star },
];

const categories = [
  {
    title: "Academic",
    description: "Textbooks & Research Papers",
    icon: GraduationCap,
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "Fiction",
    description: "Novels & Short Stories",
    icon: BookText,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Non-Fiction",
    description: "Biographies & Self-Help",
    icon: Library,
    color: "from-pink-500/20 to-orange-500/20",
  },
];

const features = [
  {
    icon: Clock,
    title: "24/7 Access",
    description:
      "Access your books anytime, anywhere with our digital library.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Check,
    title: "Quality Content",
    description:
      "Carefully curated collection of high-quality educational materials.",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Star,
    title: "Regular Updates",
    description: "New books and resources added to our collection regularly.",
    color: "from-amber-500/20 to-orange-500/20",
  },
];

const reviews = [
  {
    name: "Sarah Johnson",
    text: "The library has transformed how I study. Amazing collection!",
    avatar: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "Michael Chen",
    text: "Best digital library I've ever used. Very intuitive.",
    avatar: "https://avatar.vercel.sh/michael",
  },
  {
    name: "Emma Davis",
    text: "The variety of books available is impressive.",
    avatar: "https://avatar.vercel.sh/emma",
  },
];

export default function ModernDesign() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <main className="relative">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-grid-small-white/[0.2] [mask-image:radial-gradient(white,transparent_70%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h1 className="text-6xl font-bold leading-tight">
                  Your{" "}
                  <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Digital Library
                  </span>
                  <br />
                  Experience
                </h1>
                <p className="text-xl text-muted-foreground">
                  Access thousands of books, research papers, and educational
                  resources at your fingertips.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                    asChild
                  >
                    <Link to="/books">
                      Explore Library <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="backdrop-blur-sm bg-background/50"
                    asChild
                  >
                    <Link to="/register">Get Started</Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/book.webp"
                    alt="Book Preview"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-background/50 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background/60 backdrop-blur-sm p-8 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <stat.icon className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    {stat.count}
                  </h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${category.color} p-8 rounded-xl backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300`}
                >
                  <category.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background/50 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${feature.color} p-8 rounded-xl backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300`}
                >
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background/60 backdrop-blur-sm p-6 rounded-xl border border-border/50"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <h3 className="font-semibold">{review.name}</h3>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-background/50 backdrop-blur-md">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Stay Updated
              </h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to our newsletter for new arrivals and exclusive
                offers
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow bg-background/60 backdrop-blur-sm"
                />
                <Button className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
