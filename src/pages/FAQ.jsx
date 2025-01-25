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
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background/80 to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 px-6 text-center"
        >
          <HelpCircle className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-6 text-primary" />
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about our library services
          </p>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 md:py-24 lg:py-32 bg-muted/30 backdrop-blur-md"
      >
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl lg:max-w-6xl mx-auto backdrop-blur-sm border border-border/50 rounded-xl p-6 md:p-12 hover:border-primary/50 transition-all"
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
                    <AccordionTrigger className="hover:text-primary transition-colors text-base md:text-lg lg:text-xl font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed mt-2">
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
