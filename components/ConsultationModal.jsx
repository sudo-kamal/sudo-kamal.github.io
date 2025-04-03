import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConsultationForm from './ConsultationForm';
import { FiX } from 'react-icons/fi';

const ConsultationModal = ({ isOpen, onClose }) => {

  const handleSuccess = (message) => {
    console.log("Form Success:", message);
    // Optional: Maybe keep the modal open for a few seconds to show success message,
    // then close automatically, or let the user close it.
    // setTimeout(onClose, 3000); 
  };

  const handleError = (message) => {
    console.error("Form Error:", message);
    // Keep the modal open so the user sees the error.
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static // Use static to control presence with AnimatePresence
          open={isOpen}
          onClose={onClose}
          className="relative z-50" // High z-index to appear on top
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* Modal Panel */}
            <Dialog.Panel 
              as={motion.div} // Use motion component for animations
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} // Expo-out easing
              className="relative w-full max-w-lg rounded-lg bg-primary-bg border border-accent-secondary shadow-xl p-6 sm:p-8"
            >
              <Dialog.Title 
                as={motion.h2} 
                initial={{ opacity: 0}} 
                animate={{ opacity: 1}} 
                transition={{ delay: 0.1}}
                className="text-2xl sm:text-3xl font-bold text-text-heading mb-2"
               >
                Request a Free Consultation
              </Dialog.Title>
              <Dialog.Description 
                 as={motion.p} 
                 initial={{ opacity: 0}} 
                 animate={{ opacity: 1}} 
                 transition={{ delay: 0.15}} 
                 className="text-text-body mb-6 text-sm sm:text-base"
               >
                Fill out the form below, and our team will get back to you shortly to discuss your project.
              </Dialog.Description>

               {/* Close Button */}
              <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-text-muted hover:text-text-heading transition duration-200 p-1 rounded-full hover:bg-secondary-bg"
                  aria-label="Close consultation form"
              >
                  <FiX className="w-6 h-6" />
              </button>

              {/* Render the form inside the modal */}
              <ConsultationForm onSuccess={handleSuccess} onError={handleError} />

            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ConsultationModal; 