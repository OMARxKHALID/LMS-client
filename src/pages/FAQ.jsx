import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I borrow a book?",
      answer:
        "To borrow a book, first sign in to your account, browse our collection, and click on the book you'd like to borrow. Click the 'Borrow' button, select your return date, and confirm the borrowing.",
    },
    {
      question: "What is the maximum borrowing period?",
      answer:
        "The standard borrowing period is 14 days. However, you may be able to extend this period if no other member has reserved the book.",
    },
    {
      question: "How many books can I borrow at once?",
      answer:
        "Regular members can borrow up to 5 books at a time. Premium members can borrow up to 10 books simultaneously.",
    },
    {
      question: "What happens if I return a book late?",
      answer:
        "Late returns incur a fine based on the number of days overdue. The fine rate varies by book and is clearly shown on each book's details page.",
    },
    {
      question: "Can I purchase a book instead of borrowing?",
      answer:
        "Yes! Many of our books are available for purchase. Look for the 'Buy' button on the book's detail page.",
    },
    {
      question: "How do I access eBooks?",
      answer:
        "Once you've borrowed or purchased an eBook, you can access it through your account dashboard under 'My Books'. Click on 'View PDF' to read online.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]">
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/50 to-background"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 px-4 text-center"
        >
          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our library services
          </p>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 bg-muted/30 backdrop-blur-md"
      >
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:border-primary/50 transition-all"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
