import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import {
  BookOpen,
  Users,
  Star,
  GraduationCap,
  Library,
  BookText,
  ArrowRight,
  Search,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import { useState } from "react";

const stats = [
  { count: "50K+", label: "BOOKS", icon: BookOpen },
  { count: "10K+", label: "READERS", icon: Users },
  { count: "1000+", label: "DAILY BORROWS", icon: Star },
];

const categories = [
  {
    title: "ACADEMIC",
    description: "Textbooks & Research Papers",
    icon: GraduationCap,
  },
  {
    title: "FICTION",
    description: "Novels & Short Stories",
    icon: BookText,
  },
  {
    title: "NON-FICTION",
    description: "Biographies & Self-Help",
    icon: Library,
  },
];

const features = [
  {
    icon: BookOpen,
    title: "24/7 ACCESS",
    description: "Read anytime, anywhere. Our digital library never closes.",
  },
  {
    icon: Users,
    title: "COMMUNITY",
    description: "Join reading groups and discuss your favorite books.",
  },
  {
    icon: Star,
    title: "CURATED CONTENT",
    description: "Handpicked selections to match your interests.",
  },
];

const featuredBooks = [
  { title: "1984", author: "George Orwell", image: "/placeholder.svg" },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    image: "/placeholder.svg",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    image: "/placeholder.svg",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "/placeholder.svg",
  },
];

const reviews = [
  {
    name: "SARAH J.",
    text: "This library revolutionized my reading habits. Incredible selection!",
    avatar: "https://avatar.vercel.sh/sarah",
    role: "AVID READER",
  },
  {
    name: "MICHAEL C.",
    text: "The user experience is unmatched. Smooth, intuitive, and feature-rich.",
    avatar: "https://avatar.vercel.sh/michael",
    role: "TECH ENTHUSIAST",
  },
  {
    name: "EMMA D.",
    text: "I'm impressed by the diversity of content. There's something for everyone.",
    avatar: "https://avatar.vercel.sh/emma",
    role: "BOOK BLOGGER",
  },
];

export default function BoldDesign() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-black">
              CODEBOOK HUB
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                href="/books"
                className="hover:text-yellow-400 transition-colors uppercase font-bold"
              >
                Books
              </Link>
              <Link
                href="/categories"
                className="hover:text-yellow-400 transition-colors uppercase font-bold"
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="hover:text-yellow-400 transition-colors uppercase font-bold"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-yellow-400 transition-colors uppercase font-bold"
              >
                Contact
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                LOG IN
              </Button>
              <Button
                size="sm"
                className="bg-yellow-400 text-black hover:bg-yellow-300"
              >
                SIGN UP
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-yellow-400"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </nav>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-black p-4">
            <Link
              href="/books"
              className="block py-2 text-yellow-400 hover:text-white transition-colors uppercase font-bold"
            >
              Books
            </Link>
            <Link
              href="/categories"
              className="block py-2 text-yellow-400 hover:text-white transition-colors uppercase font-bold"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="block py-2 text-yellow-400 hover:text-white transition-colors uppercase font-bold"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-yellow-400 hover:text-white transition-colors uppercase font-bold"
            >
              Contact
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              LOG IN
            </Button>
          </div>
        )}
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-32 border-b border-yellow-400/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h1 className="text-6xl md:text-7xl font-black uppercase leading-none tracking-tight">
                  Your
                  <br />
                  <span className="text-yellow-400">Digital</span>
                  <br />
                  Library
                </h1>
                <p className="text-xl md:text-2xl text-gray-400">
                  Access thousands of books, research papers, and educational
                  resources at your fingertips.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-yellow-400 text-black hover:bg-yellow-300 text-lg"
                    asChild
                  >
                    <Link href="/books">
                      EXPLORE LIBRARY <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black text-lg"
                    asChild
                  >
                    <Link href="/register">GET STARTED</Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <img
                  src="/book.webp"
                  alt="Book Preview"
                  className="w-full rounded-lg border-4 border-yellow-400"
                />
                <div className="absolute -bottom-8 -right-8 bg-yellow-400 text-black p-4 rounded-full font-bold text-xl">
                  50K+ BOOKS
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-20 bg-yellow-400 text-black">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-black mb-8 text-center uppercase">
                Find Your Next Read
              </h2>
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Search for books, authors, or topics"
                  className="flex-grow rounded-r-none border-2 border-black text-lg py-6"
                />
                <Button className="rounded-l-none bg-black text-yellow-400 hover:bg-gray-800 text-lg py-6 px-8">
                  <Search className="h-6 w-6 mr-2" />
                  SEARCH
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-32 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <stat.icon className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
                  <h3 className="text-5xl font-black mb-2 text-yellow-400">
                    {stat.count}
                  </h3>
                  <p className="text-xl uppercase font-bold">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-32 bg-yellow-400 text-black">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-black uppercase mb-16 text-center">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="border-4 border-black p-8 hover:bg-black hover:text-yellow-400 transition-colors"
                >
                  <category.icon className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold uppercase mb-2">
                    {category.title}
                  </h3>
                  <p className="text-lg mb-4">{category.description}</p>
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-yellow-400"
                  >
                    EXPLORE <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section className="py-32 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-black uppercase mb-16 text-center">
              Featured Books
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredBooks.map((book, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900 rounded-lg overflow-hidden"
                >
                  <img
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-yellow-400">
                      {book.title}
                    </h3>
                    <p className="text-gray-400">{book.author}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-16">
              <Button
                size="lg"
                className="bg-yellow-400 text-black hover:bg-yellow-300 text-lg"
              >
                VIEW ALL BOOKS
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-yellow-400 text-black">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-black uppercase mb-16 text-center">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <feature.icon className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold uppercase mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-lg">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-32 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-black uppercase mb-16 text-center">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="border border-yellow-400 p-8"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-yellow-400"
                    />
                    <div>
                      <h3 className="font-bold text-xl text-yellow-400">
                        {review.name}
                      </h3>
                      <p className="text-gray-400">{review.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg">"{review.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-yellow-400 text-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-black uppercase mb-8">
              Ready to Start Reading?
            </h2>
            <p className="text-2xl mb-12 max-w-2xl mx-auto">
              Join our community of book lovers and gain access to thousands of
              titles. Start your reading journey today!
            </p>
            <Button
              size="lg"
              className="bg-black text-yellow-400 hover:bg-gray-800 text-xl py-6 px-12"
            >
              CREATE YOUR ACCOUNT
            </Button>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-32 bg-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-black uppercase mb-8">Stay Updated</h2>
            <p className="text-2xl mb-12 max-w-2xl mx-auto text-gray-300">
              Subscribe to our newsletter for new arrivals, reading
              recommendations, and exclusive offers.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow bg-gray-800 border-yellow-400 text-white placeholder-gray-500 text-lg py-6"
              />
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300 text-lg py-6 px-8">
                <Mail className="mr-2 h-6 w-6" />
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-yellow-400 text-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-black uppercase mb-4">About Us</h3>
              <p className="text-lg">
                Codebook Hub is your go-to digital library for all your reading
                needs.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/books" className="text-lg hover:underline">
                    Books
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-lg hover:underline">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-lg hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-lg hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail className="h-6 w-6 mr-2" />
                  <span className="text-lg">info@codebookhub.com</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-6 w-6 mr-2" />
                  <span className="text-lg">(123) 456-7890</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  <span className="text-lg">123 Book St, Reading City</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-black hover:text-gray-800 transition-colors"
                >
                  <svg
                    className="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-black hover:text-gray-800 transition-colors"
                >
                  <svg
                    className="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-black hover:text-gray-800 transition-colors"
                >
                  <svg
                    className="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-black pt-8 text-center">
            <p className="text-lg">
              &copy; 2024 Codebook Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
