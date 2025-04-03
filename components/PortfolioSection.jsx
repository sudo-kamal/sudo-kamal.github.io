import { useState } from 'react'; // Import useState
import { motion } from 'framer-motion'; // Removed AnimatePresence for now, will be in modal
import Image from 'next/image'; // Use Next.js Image for optimized images
import Link from 'next/link'; // For the "View Project" button
import { FaReact, FaNodeJs, FaAws } from 'react-icons/fa'; // Example tech stack icons
import { FiSmartphone, FiServer, FiCpu, FiArrowRight } from 'react-icons/fi'; // Add FiArrowRight
// Import the modal component (will create next)
import ProjectDetailModal from './ProjectDetailModal'; 

// Sample project data - Add more details for expanded view
const projects = [
  {
    id: 'ecommerce',
    title: 'E-commerce Platform',
    shortDescription: 'High-performance online store for an Indian fashion brand.',
    longDescription: 'Built using Next.js and Shopify integration, this platform handles high traffic volumes and provides a seamless shopping experience with advanced filtering and personalized recommendations.',
    imageUrl: '/images/portfolio-placeholder-1.png', // Placeholder image path (add image to public/images)
    techStack: [<FaReact key="react"/>, <FaNodeJs key="node"/>, <FaAws key="aws"/>],
    projectUrl: '#', // Still keep a link for a potential dedicated page
  },
  {
    id: 'banking-app',
    title: 'Mobile Banking App',
    shortDescription: 'Secure and user-friendly mobile app for a regional bank.',
    longDescription: 'Developed natively for iOS and Android, featuring biometric authentication, transaction history, fund transfers, and integrated customer support chat, ensuring top-level security and UX.',
    imageUrl: '/images/portfolio-placeholder-2.png', // Placeholder image path
    techStack: [<FaReact key="react_native"/>, <FiSmartphone key="swift"/>, <FiServer key="java"/>], // Example: React Native, Swift, Java
    projectUrl: '#',
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot for Support',
    shortDescription: 'Automated customer support using NLP and machine learning.',
    longDescription: 'This Python-based chatbot integrates with existing support systems, utilizing Natural Language Processing to understand queries and provide instant answers, significantly reducing response times.',
    imageUrl: '/images/portfolio-placeholder-3.png', // Placeholder image path
    techStack: [<FiCpu key="python"/>, <FaAws key="aws_lambda"/>], // Example: Python, AWS Lambda
    projectUrl: '#',
  },
];

const PortfolioSection = () => {
  // State for managing the modal
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
    // Delay clearing project slightly for exit animation
    setTimeout(() => setSelectedProject(null), 300); 
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Simpler item variants now
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-secondary-bg text-text-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-heading mb-4">
            Showcasing Our Work
          </h2>
          <p className="text-lg sm:text-xl text-text-body max-w-3xl mx-auto">
            Explore some of the solutions we've successfully delivered for our clients.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              className="card-base card-hover p-0 flex flex-col cursor-pointer"
              onClick={() => openModal(project)}
            >
              <div className="relative w-full h-48 bg-primary-bg border-b border-accent-secondary overflow-hidden">
                 <Image
                    src={`https://placehold.co/600x400/ffffff/6c757d?text=${encodeURIComponent(project.title)}&font=inter`}
                    alt={`${project.title} Screenshot Placeholder`}
                    width={600}
                    height={400}
                    layout="responsive"
                    objectFit="cover"
                 />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-text-heading mb-2">
                  {project.title}
                </h3>
                <p className="text-text-body mb-4 flex-grow text-sm">{project.shortDescription}</p>
                <div className="flex items-center gap-3 text-accent-primary mb-5 text-xl">
                  <span className="text-sm font-medium mr-1 text-text-muted">Tech:</span>
                  {project.techStack.map((Icon, i) => (
                    <span key={i}>{Icon}</span>
                  ))}
                </div>
                <div className="mt-auto inline-flex items-center gap-2 text-xs text-accent-primary self-start">
                    View Details <FiArrowRight />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={closeModal} 
        project={selectedProject} 
      />
    </section>
  );
};

export default PortfolioSection; 