import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiMessageSquare } from 'react-icons/fi'; // Icon for chat

const CTASection = ({ onOpenConsultation }) => {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-secondary-bg text-text-body">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-text-heading">
            Ready to Build Your Dream Project?
          </h2>
          <p className="text-lg sm:text-xl text-text-body mb-10 max-w-2xl mx-auto">
            Let's discuss how Devasoft can help you achieve your business goals with cutting-edge software solutions.
          </p>
          <button 
            onClick={onOpenConsultation}
            className="btn-primary py-3 px-10 text-lg"
          >
            Get a Free Consultation
          </button>

          {/* Optional: Live Chat Integration Placeholder */}
          {/* 
          <div className="mt-12">
            <button className="flex items-center justify-center gap-2 mx-auto text-text-muted hover:text-accent-primary transition duration-200">
              <FiMessageSquare className="w-5 h-5" />
              <span>Chat with us live</span>
            </button>
          </div> 
          */}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection; 