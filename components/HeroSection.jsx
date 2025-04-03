import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react'; // Import useRef for tracking scroll
import Image from 'next/image'; // Ensure Image is imported

// Optional: Add a subtle background pattern component or SVG
const BackgroundGrid = () => (
  <svg 
    className="absolute inset-0 w-full h-full opacity-5 mix-blend-soft-light"
    xmlns="http://www.w3.org/2000/svg" 
    width="100%" height="100%"
  >
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#a0a0a0" strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

const BackgroundElements = () => (
  <>
     <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0.1, y: 0}}
        transition={{ duration: 1.5, delay: 0.5, ease: "circOut"}}
        className="absolute top-10 left-10 w-0 h-0 border-l-[80px] border-l-transparent border-t-[120px] border-t-accent-primary/10 border-r-[80px] border-r-transparent opacity-10 filter blur-md"
       />
        <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.05, x: 0}}
        transition={{ duration: 1.5, delay: 0.7, ease: "circOut"}}
        className="absolute bottom-20 right-20 w-40 h-40 border-4 border-accent-primary/10 rounded-full opacity-5 filter blur-sm"
       />
  </>
);

const HeroSection = ({ onOpenConsultation }) => {
  console.log("HeroSection received onOpenConsultation:", typeof onOpenConsultation, onOpenConsultation); // Add console log
  const targetRef = useRef(null);
  // useScroll hook to track scroll progress relative to the target section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"], // Track from when section starts entering viewport to when it starts leaving
  });

  // Create parallax effects using scrollYProgress
  // Move text content up faster than scroll
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]); 
  // Fade out text content as it scrolls up
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  // Move illustration up slower than scroll (creating depth)
  const illustrationY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]); 
  const illustrationOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]); 
  // Move background shapes at different speeds
  const shape1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const shape2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);


  return (
    <section
      id="home"
      ref={targetRef} // Attach ref for scroll tracking
      className="relative flex items-center min-h-screen py-24 px-4 sm:px-8 lg:px-16 bg-primary-bg text-text-body overflow-hidden"
    >
      <BackgroundElements />

      {/* Grid for split layout */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full max-w-7xl mx-auto">
        
        {/* Left Column: Text Content */}
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
           className="text-center md:text-left" // Align text left on medium screens
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "circOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 tracking-tight leading-tight text-text-heading"
          >
            Building Scalable & Future-Ready Software
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
            className="text-lg sm:text-xl text-text-body mb-10"
          >
            High-performance websites, mobile apps, and AI-powered enterprise solutions tailored for the Indian market.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "circOut" }}
            // Adjust button alignment for different screen sizes
            className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-5"
          >
            <button
              onClick={onOpenConsultation}
              className="btn-primary px-8 py-3 text-lg w-full sm:w-auto" // Full width on small screens
            >
              Get a Free Consultation
            </button>
            <Link href="#portfolio" legacyBehavior>
              <a className="btn-secondary px-8 py-3 text-lg w-full sm:w-auto"> {/* Full width on small screens */}
                View Our Portfolio
              </a>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column: Illustration Placeholder - Replace div with Image */}
        <motion.div
           style={{ y: illustrationY, opacity: illustrationOpacity }}
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.4, ease: "circOut" }}
           className="flex justify-center items-center md:justify-end mt-12 md:mt-0"
        >
          {/* Replace placeholder div with Next/Image */}
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto aspect-[4/3] bg-secondary-bg/80 backdrop-blur-md rounded-xl shadow-card-shadow border border-accent-secondary overflow-hidden"> {/* Keep container for styling */} 
            <Image 
                // Use placehold.co - customize size, colors, text
                src="https://placehold.co/800x600/f8f9fa/6c757d?text=Devasoft+UI+Mockup&font=inter" 
                alt="Devasoft UI Mockup Placeholder"
                width={800} // Match src width
                height={600} // Match src height
                layout="responsive" // Make image responsive within container
                objectFit="cover" 
                priority // Load hero image sooner
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection; 