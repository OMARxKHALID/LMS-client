import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight } from 'lucide-react';

export default function MinimalistDesign() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <header className="py-6 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-semibold">CH</Link>
            <div className="space-x-6">
              <Link to="/books" className="hover:underline">Books</Link>
              <Link to="/about" className="hover:underline">About</Link>
              <Link to="/contact" className="hover:underline">Contact</Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Simplify your reading experience</h1>
            <p className="text-xl mb-8">Access a curated collection of books designed to expand your knowledge and imagination.</p>
            <Button asChild className="bg-gray-900 text-white hover:bg-gray-800">
              <Link to="/books">
                Explore Library <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Codebook Hub</p>
        </div>
      </footer>
    </div>
  );
}
