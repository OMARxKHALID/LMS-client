import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { cn } from "@/utils/utils";
import { Marquee } from "@/components/ui/marquee";
import {
  BookOpen,
  BookText,
  Library,
  GraduationCap,
  ArrowRight,
  Star,
  Users,
  BookCopy,
  ArrowUpRight,
  Clock,
  Check,
} from "lucide-react";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]">
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/50 to-background"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 px-4 py-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
              <div className="space-y-4 max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Your Digital Library
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Experience
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground">
                  Access thousands of books, research papers, and educational
                  resources at your fingertips.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                  asChild
                >
                  <Link to="/books">
                    Explore Library <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                {!user && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 backdrop-blur-sm bg-background/50"
                    asChild
                  >
                    <Link to="/register">Get Started</Link>
                  </Button>
                )}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block relative"
            >
              <div className="relative w-full aspect-square overflow-auto">
                <img
                  src="/book.webp"
                  alt="Digital Library Illustration"
                  className="object-contain w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/20 to-transparent rounded-3xl"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-muted/30 backdrop-blur-md">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                count: "50K+",
                label: "Books Available",
                icon: BookCopy,
                color: "bg-gradient-to-br from-blue-500/10 to-purple-500/10",
              },
              {
                count: "10K+",
                label: "Active Readers",
                icon: Users,
                color: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
              },
              {
                count: "1000+",
                label: "Daily Borrows",
                icon: BookOpen,
                color: "bg-gradient-to-br from-pink-500/10 to-orange-500/10",
              },
              {
                count: "99%",
                label: "Satisfaction Rate",
                icon: Star,
                color: "bg-gradient-to-br from-orange-500/10 to-yellow-500/10",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col items-center justify-center p-6 rounded-xl backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${stat.color}`}
              >
                <stat.icon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {stat.count}
                </h3>
                <p className="text-muted-foreground text-center">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
          >
            Browse by Category
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Academic",
                description: "Textbooks & Research Papers",
                color: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10",
                icon: GraduationCap,
              },
              {
                title: "Fiction",
                description: "Novels & Short Stories",
                color: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
                icon: BookText,
              },
              {
                title: "Non-Fiction",
                description: "Biographies & Self-Help",
                color: "bg-gradient-to-br from-emerald-500/10 to-teal-500/10",
                icon: Library,
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to="/books"
                  className={`group p-8 rounded-2xl transition-all backdrop-blur-sm border border-border/50 hover:border-primary/50 flex flex-col h-full ${category.color}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <category.icon className="h-8 w-8 text-foreground" />
                    <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "24/7 Access",
                description:
                  "Access your books anytime, anywhere with our digital library.",
                color: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
              },
              {
                icon: Check,
                title: "Quality Content",
                description:
                  "Carefully curated collection of high-quality educational materials.",
                color: "bg-gradient-to-br from-violet-500/10 to-purple-500/10",
              },
              {
                icon: Star,
                title: "Regular Updates",
                description:
                  "New books and resources added to our collection regularly.",
                color: "bg-gradient-to-br from-amber-500/10 to-orange-500/10",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col items-center text-center p-6 rounded-xl backdrop-blur-sm border hover:border-primary/50 transition-all duration-300 ${feature.color}`}
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
          >
            What Our Users Say
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background ">
              <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
