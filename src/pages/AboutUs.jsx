import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Mail, Clock } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 lg:py-24 xl:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                About Codebook Hub
              </h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Your gateway to a world of knowledge and discovery. We&apos;re
                dedicated to making books accessible to everyone while building
                a community of lifelong learners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Our Values
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                What drives us to provide the best library experience.
              </p>
            </div>
          </div>
          <div className="mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 max-w-5xl py-12">
            {[
              {
                Icon: BookOpen,
                title: "Accessibility",
                description:
                  "Making knowledge accessible to everyone through our vast collection.",
              },
              {
                Icon: Users,
                title: "Community",
                description:
                  "Building a vibrant community of readers and learners.",
              },
              {
                Icon: Clock,
                title: "Efficiency",
                description: "Quick and easy access to your favorite books.",
              },
              {
                Icon: Mail,
                title: "Support",
                description: "Always here to help with your library needs.",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="transform transition-all duration-200 hover:scale-105"
              >
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <value.Icon className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-center text-gray-500">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Get in Touch
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions? We&apos;re here to help!
              </p>
              <div className="mx-auto max-w-sm space-y-4 pt-4">
                <p className="text-gray-500">Email: contact@codebookhub.com</p>
                <p className="text-gray-500">Phone: (123) 456-7890</p>
                <p className="text-gray-500">
                  Address: 123 Library Street, Book City, BC 12345
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
