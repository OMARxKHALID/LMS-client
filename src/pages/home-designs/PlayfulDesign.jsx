import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  BookOpen,
  Users,
  Star,
  Search,
  Sparkles,
  Phone,
  Download,
  BookMarked,
  GraduationCap,
  Library,
  BookText,
  Heart,
  Clock,
  ArrowRight,
  Gift,
  Coffee,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const stats = [
  { count: "50K+", label: "Magic Books", icon: BookOpen },
  { count: "10K+", label: "Happy Readers", icon: Users },
  { count: "1000+", label: "Daily Adventures", icon: Star },
];

const categories = [
  {
    title: "Magical Academic",
    description: "Enchanted textbooks & research scrolls",
    icon: GraduationCap,
    color: "from-pink-400 to-purple-400",
  },
  {
    title: "Fantastic Fiction",
    description: "Tales that transport you to new worlds",
    icon: BookText,
    color: "from-purple-400 to-indigo-400",
  },
  {
    title: "Wonderful Non-Fiction",
    description: "Real-world wonders & discoveries",
    icon: Library,
    color: "from-indigo-400 to-blue-400",
  },
];

const features = [
  {
    icon: Clock,
    title: "24/7 Reading Magic",
    description: "Your books follow you everywhere!",
    color: "from-pink-300 to-purple-300",
  },
  {
    icon: Sparkles,
    title: "Enchanted Experience",
    description: "Watch your books come alive!",
    color: "from-purple-300 to-indigo-300",
  },
  {
    icon: Heart,
    title: "Personalized Joy",
    description: "Books that match your magic!",
    color: "from-indigo-300 to-blue-300",
  },
];

const featuredBooks = [
  {
    title: "The Magic of Reading",
    author: "Luna Sparkle",
    rating: 4.9,
    image: "/placeholder.svg",
    color: "from-pink-200 to-purple-200",
  },
  {
    title: "Adventure Awaits",
    author: "Star Bright",
    rating: 4.8,
    image: "/placeholder.svg",
    color: "from-purple-200 to-indigo-200",
  },
  {
    title: "Wonderful Tales",
    author: "Rainbow Joy",
    rating: 4.7,
    image: "/placeholder.svg",
    color: "from-indigo-200 to-blue-200",
  },
];

const reviews = [
  {
    name: "Sarah Stardust",
    text: "This library is pure magic! ✨ I've never had so much fun reading!",
    avatar: "https://avatar.vercel.sh/sarah",
    role: "Adventurous Reader",
  },
  {
    name: "Mike Rainbow",
    text: "The interactive features make learning a joyful experience! 🌈",
    avatar: "https://avatar.vercel.sh/mike",
    role: "Book Explorer",
  },
  {
    name: "Luna Bright",
    text: "Every book is a new adventure waiting to happen! 🚀",
    avatar: "https://avatar.vercel.sh/luna",
    role: "Story Seeker",
  },
];

export default function PlayfulDesign() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <main className="relative overflow-hidden">
        {/* Floating Elements Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AnimatePresence>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                }}
                animate={{
                  y: [
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight,
                  ],
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <BookOpen className="text-white/20 w-8 h-8" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-40 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h1 className="text-7xl font-bold">
                  <motion.span
                    className="inline-block text-white"
                    animate={{ rotate: [-5, 0, -5] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    Discover
                  </motion.span>{" "}
                  <motion.span
                    className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    Magic
                  </motion.span>{" "}
                  <br />
                  <motion.span
                    className="inline-block text-indigo-700"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    in Books!
                  </motion.span>
                </h1>
                <p className="text-2xl text-indigo-900">
                  Embark on a magical journey through our enchanted library!
                  Where every page turns into an adventure. ✨
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 text-lg group"
                    asChild
                  >
                    <Link to="/books">
                      Start Your Adventure
                      <motion.span
                        className="inline-block ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <Sparkles className="h-5 w-5" />
                      </motion.span>
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm hover:bg-white text-lg"
                    asChild
                  >
                    <Link to="/register">Join the Magic</Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative aspect-square rounded-full overflow-hidden bg-gradient-to-r from-purple-400 to-pink-400 p-1">
                  <img
                    // src={`${process.env.NEXT_PUBLIC_BLOB_URL}/Cxm7o.jpeg`}
                    alt="Magical Books Preview"
                    className="rounded-full object-cover w-full h-full"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </div>
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-8 -right-8 bg-white rounded-full p-4 shadow-lg"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <BookMarked className="h-8 w-8 text-purple-500" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-8 -left-8 bg-white rounded-full p-4 shadow-lg"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Star className="h-8 w-8 text-yellow-500" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for magical books..."
                  className="w-full h-16 pl-6 pr-12 text-lg rounded-full bg-white/90 backdrop-blur-sm border-2 border-purple-300 focus:border-purple-500 transition-colors"
                />
                <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-purple-500" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {["Fantasy", "Adventure", "Mystery", "Romance", "Science"].map(
                  (tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm text-sm font-medium text-purple-700 cursor-pointer hover:bg-white transition-colors"
                    >
                      {tag}
                    </motion.span>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center transform hover:scale-105 transition-transform"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <stat.icon className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                  </motion.div>
                  <h3 className="text-4xl font-bold text-indigo-700 mb-2">
                    {stat.count}
                  </h3>
                  <p className="text-purple-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-indigo-900">
              Featured Magical Books ✨
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredBooks.map((book, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${book.color} rounded-2xl transform -rotate-6 group-hover:rotate-0 transition-transform`}
                  />
                  <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl">
                    <img
                      src={book.image || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold text-indigo-900 mb-2">
                      {book.title}
                    </h3>
                    <p className="text-purple-600 mb-2">{book.author}</p>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-1" />
                      <span className="text-indigo-900">{book.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile App Section */}
        <section className="py-20 bg-gradient-to-r from-purple-400/50 to-pink-400/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-white">
                  Take the Magic With You! 📱
                </h2>
                <p className="text-xl text-indigo-900">
                  Download our magical app and read your favorite books
                  anywhere, anytime!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-white/90"
                    asChild
                  >
                    <Link to="#">
                      <Phone className="mr-2 h-5 w-5" />
                      iOS App
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-white/90"
                    asChild
                  >
                    <Link to="#">
                      <Download className="mr-2 h-5 w-5" />
                      Android App
                    </Link>
                  </Button>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  src="/placeholder.svg"
                  alt="Mobile App"
                  className="w-full max-w-md mx-auto"
                />
                {/* Floating Elements */}
                <motion.div
                  className="absolute top-0 right-0"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Star className="h-12 w-12 text-yellow-400" />
                </motion.div>
                <motion.div
                  className="absolute bottom-0 left-0"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <BookOpen className="h-12 w-12 text-purple-400" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-indigo-900">
              What Our Magical Readers Say ⭐
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl transform hover:scale-105 transition-transform"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      className="w-12 h-12 rounded-full border-2 border-purple-400"
                    />
                    <div className="ml-4">
                      <h3 className="font-bold text-indigo-900">
                        {review.name}
                      </h3>
                      <p className="text-sm text-purple-600">{review.role}</p>
                    </div>
                  </div>
                  <p className="text-indigo-800">{review.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-purple-400/50 to-pink-400/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-4 text-white">
                Join Our Magical Newsletter! ✉️
              </h2>
              <p className="text-xl mb-8 text-indigo-900">
                Get enchanted updates about new books and magical offers!
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow bg-white/90 backdrop-blur-sm border-2 border-purple-300 focus:border-purple-500"
                />
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Subscribe
                </Button>
              </div>
              <motion.div
                className="mt-8 flex justify-center gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {[Gift, Coffee, Star].map((Icon, index) => (
                  <motion.div
                    key={index}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{
                      duration: 2,
                      delay: index * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="bg-white/90 backdrop-blur-sm p-3 rounded-full"
                  >
                    <Icon className="h-6 w-6 text-purple-500" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
