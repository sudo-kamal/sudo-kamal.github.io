import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiX, FiExternalLink } from 'react-icons/fi';

const ProjectDetailModal = ({ isOpen, onClose, project }) => {
  // If no project data, don't render anything (or a loading state)
  if (!project) return null; 

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50" // Ensure it's above other content
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

          {/* Modal Content Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
            <Dialog.Panel 
              as={motion.div}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              // Wider modal for project details
              className="relative w-full max-w-3xl rounded-lg bg-primary-bg border border-accent-secondary shadow-xl flex flex-col overflow-hidden"
            >
              {/* Project Image (Top Section) */}
              <div className="relative w-full h-64 sm:h-80 bg-secondary-bg overflow-hidden">
                 <Image 
                    // Use placehold.co, dynamic text based on project title
                    src={`https://placehold.co/1000x600/f8f9fa/6c757d?text=${encodeURIComponent(project.title)}&font=inter`}
                    alt={`${project.title} Screenshot Placeholder`}
                    layout="fill" 
                    objectFit="cover"
                    priority // Prioritize loading image in modal 
                 /> 
              </div>

              {/* Project Details (Bottom Section) */}
              <div className="p-6 sm:p-8 flex-1">
                 <Dialog.Title 
                    as={motion.h2} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="text-2xl sm:text-3xl font-bold text-text-heading mb-3"
                 >
                    {project.title}
                 </Dialog.Title>

                 <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="text-text-body mb-6 leading-relaxed"
                  >
                    {project.longDescription}
                 </motion.p>

                 {/* Tech Stack */}
                 <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="flex items-center flex-wrap gap-x-4 gap-y-2 text-accent-primary mb-6 text-2xl"
                  >
                    <span className="text-sm font-medium mr-1 text-text-muted">Technologies Used:</span>
                    {project.techStack.map((Icon, i) => (
                      <span key={i} title={Icon.key?.toString()}> {/* Use key for potential tooltip later */} 
                         {Icon}
                      </span>
                    ))}
                 </motion.div>

                 {/* Optional: Link to Live Site/Case Study */}
                 {project.projectUrl && project.projectUrl !== '#' && (
                    <motion.div
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 0.4, duration: 0.3 }}
                    >
                       <Link href={project.projectUrl} legacyBehavior>
                          <a 
                             className="inline-flex items-center gap-2 text-sm text-accent-primary hover:underline transition-opacity duration-200"
                             target="_blank" 
                             rel="noopener noreferrer"
                          >
                             View Full Case Study <FiExternalLink />
                          </a>
                       </Link>
                    </motion.div>
                 )}
              </div>

              {/* Close Button */}
              <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-text-muted hover:text-text-heading transition duration-200 p-2 rounded-full hover:bg-secondary-bg"
                  aria-label="Close project details"
              >
                  <FiX className="w-5 h-5" />
              </button>

            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal; 