import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]">
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/50 to-background"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 px-4 py-32 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About Codebook Hub
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your gateway to a world of knowledge and discovery. We're dedicated
            to making books accessible to everyone while building a community of
            lifelong learners.
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "Excellence",
                  description:
                    "Committed to providing the highest quality educational resources.",
                  icon: "🌟",
                },
                {
                  title: "Accessibility",
                  description:
                    "Making knowledge available to everyone, everywhere.",
                  icon: "🌍",
                },
                {
                  title: "Innovation",
                  description:
                    "Constantly evolving to meet modern learning needs.",
                  icon: "💡",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-6 rounded-lg bg-card hover:shadow-lg transition-all"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-12">Our Team</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  name: "John Doe",
                  role: "Founder & CEO",
                  image: "/team1.jpg",
                },
                {
                  name: "Jane Smith",
                  role: "Head Librarian",
                  image: "/team2.jpg",
                },
                {
                  name: "Mike Johnson",
                  role: "Tech Lead",
                  image: "/team3.jpg",
                },
                {
                  name: "Sarah Wilson",
                  role: "Community Manager",
                  image: "/team4.jpg",
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <div className="aspect-square bg-muted"></div>
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-muted-foreground">
              Have questions? We're here to help!
            </p>
            <div className="space-y-4 pt-4">
              <p className="text-gray-500">Email: contact@codebookhub.com</p>
              <p className="text-gray-500">Phone: (123) 456-7890</p>
              <p className="text-gray-500">
                Address: 123 Library Street, Book City, BC 12345
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
