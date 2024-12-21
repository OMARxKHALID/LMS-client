import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Search, ArrowRight, Headphones, Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-20 lg:py-24 xl:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover, Rent, and Borrow Your Favorite Books Effortlessly!
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Streamline your book rental experience with our easy-to-use
                  platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link to="/books">
                  <Button
                    className="inline-flex items-center justify-center"
                    size="lg"
                  >
                    Explore Library
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                {!user ? (
                  <Link to="/register">
                    <Button variant="outline" size="lg">
                      Sign Up
                    </Button>
                  </Link>
                ) : null}
              </div>
            </div>
            <img
              alt="Library"
              className="mx-auto aspect-[4/3] rounded-xl object-contain object-center w-full lg:aspect-square"
              height="550"
              src="/book2.webp"
              width="550"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Features
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to manage your library experience
                efficiently
              </p>
            </div>
          </div>
          <div className="mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-5xl py-12">
            <Card className="transform transition-all duration-200 hover:scale-105">
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <Search className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Search & Reserve Books</h3>
                <p className="text-center text-gray-500">
                  Easily search through thousands of books and reserve your
                  favorites.
                </p>
              </CardContent>
            </Card>
            <Card className="transform transition-all duration-200 hover:scale-105">
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <Calendar className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Track Borrowed Books</h3>
                <p className="text-center text-gray-500">
                  Keep track of your borrowed books and due dates.
                </p>
              </CardContent>
            </Card>
            <Card className="transform transition-all duration-200 hover:scale-105">
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <Headphones className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Digital Library</h3>
                <p className="text-center text-gray-500">
                  Access a growing collection of e-books and audiobooks.
                </p>
              </CardContent>
            </Card>
            <Card className="transform transition-all duration-200 hover:scale-105">
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <Clock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Flexible Rentals</h3>
                <p className="text-center text-gray-500">
                  Rent books for days, weeks, or months at your convenience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                How It Works
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Three simple steps to start your reading journey
              </p>
            </div>
          </div>
          <div className="mx-auto grid gap-6 max-w-5xl py-12 sm:grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                1
              </div>
              <h3 className="text-xl font-bold">Search</h3>
              <p className="text-gray-500">
                Browse or search for the books you want.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                2
              </div>
              <h3 className="text-xl font-bold">Reserve or Rent</h3>
              <p className="text-gray-500">
                Select your preferred option and duration.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                3
              </div>
              <h3 className="text-xl font-bold">Enjoy</h3>
              <p className="text-gray-500">
                Pick up in-store or enjoy digital access instantly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
