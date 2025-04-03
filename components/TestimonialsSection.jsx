import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa'; // Star icon for ratings
import Image from 'next/image'; // Import Image

// Sample testimonial data - Replace with real testimonials and logos
const testimonials = [
  {
    quote: "Devasoft delivered an exceptional website that exceeded our expectations. Highly recommended!",
    name: "Priya Sharma",
    title: "CEO, Fashion Hub India",
    rating: 5,
    logoUrl: "/images/client-logo-placeholder-1.png", // Add logos to public/images
  },
  {
    quote: "Their team is professional, responsive, and technically brilliant. Our mobile app is a huge success.",
    name: "Amit Singh",
    title: "CTO, FinTech Solutions",
    rating: 5,
    logoUrl: "/images/client-logo-placeholder-2.png",
  },
  {
    quote: "The AI chatbot they built streamlined our customer support significantly. Great ROI!",
    name: "Sunita Patel",
    title: "Operations Head, E-Store Inc.",
    rating: 4,
    logoUrl: "/images/client-logo-placeholder-3.png",
  },
   {
    quote: "Working with Devasoft felt like a true partnership. They understood our vision perfectly.",
    name: "Rajesh Kumar",
    title: "Founder, TravelStartup",
    rating: 5,
    logoUrl: "/images/client-logo-placeholder-4.png",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePaginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      // Next
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      // Prev
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    // Use light primary background
    <section id="testimonials" className="py-16 sm:py-24 bg-primary-bg overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          {/* Use light theme text colors */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-heading mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-text-body max-w-3xl mx-auto">
            We pride ourselves on building strong relationships and delivering results.
          </p>
        </motion.div>

        <div className="relative h-96 sm:h-80 flex items-center justify-center">
          {/* Previous Button - update styling */}
          <button 
            onClick={() => handlePaginate(-1)} 
             // Use light theme bg/text/border/hover colors
            className="absolute left-0 z-20 p-2 bg-white rounded-full shadow-md text-text-muted hover:text-accent-primary hover:shadow-lg transition duration-200 -translate-x-4 sm:-translate-x-10 border border-accent-secondary"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          {/* Testimonial Card Container */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: {duration: 0.2}
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000) handlePaginate(1);
                else if (swipe > 10000) handlePaginate(-1);
              }}
              className="absolute w-full max-w-2xl cursor-grab active:cursor-grabbing"
            >
              {/* Uses global .card-base */}
              <div className="card-base p-8 text-center mx-auto">
                 <div className="flex justify-center mb-4">
                     {[...Array(5)].map((_, i) => (
                         // Update star colors
                         <FaStar key={i} className={`w-5 h-5 ${i < currentTestimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                     ))}
                 </div>
                  {/* Use light theme text colors */}
                 <p className="text-lg sm:text-xl text-text-body italic mb-6">
                     "{currentTestimonial.quote}"
                 </p>
                 <div className="flex items-center justify-center gap-4">
                      {/* Update logo placeholder bg/border */}
                     <div className="w-12 h-12 bg-secondary-bg rounded-full flex items-center justify-center text-xs text-text-muted border border-accent-secondary overflow-hidden">
                         <Image
                           // Update placeholder colors
                           src={`https://placehold.co/80x80/f8f9fa/6c757d.png?text=Logo&font=inter`}
                           alt={`${currentTestimonial.name} Logo Placeholder`}
                           width={48}
                           height={48}
                           className="object-cover"
                         />
                     </div>
                     <div>
                          {/* Use light theme text colors */}
                          <p className="font-semibold text-text-heading">{currentTestimonial.name}</p>
                          <p className="text-sm text-text-muted">{currentTestimonial.title}</p>
                     </div>
                 </div>
             </div>
           </motion.div>
          </AnimatePresence>

          {/* Next Button - update styling */}
          <button 
            onClick={() => handlePaginate(1)} 
             // Use light theme bg/text/border/hover colors
            className="absolute right-0 z-20 p-2 bg-white rounded-full shadow-md text-text-muted hover:text-accent-primary hover:shadow-lg transition duration-200 translate-x-4 sm:translate-x-10 border border-accent-secondary"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 