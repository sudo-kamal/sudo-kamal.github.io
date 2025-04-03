import { motion } from 'framer-motion';
import {
  FiGlobe,
  FiSmartphone,
  FiServer,
  FiCloud,
  FiCpu,
  FiDatabase
} from 'react-icons/fi'; // Example icons for services
import Image from 'next/image'; // Import Image

const services = [
  {
    icon: FiGlobe,
    title: 'Custom Website Development',
    description: 'Bespoke, high-performance websites built with modern frameworks like React & Next.js, optimized for user experience and conversion.',
    visual: 'website-visual.png' // Placeholder filename for potential image
  },
  {
    icon: FiSmartphone,
    title: 'App Development (iOS & Android)',
    description: 'Native and cross-platform mobile applications designed for seamless performance and engaging user interaction across all devices.',
    visual: 'app-visual.png'
  },
  {
    icon: FiServer,
    title: 'Enterprise Software Solutions',
    description: 'Scalable and robust software tailored to complex business processes, enhancing efficiency and driving growth for large organizations.',
    visual: 'enterprise-visual.png'
  },
  {
    icon: FiCloud,
    title: 'Cloud & DevOps Engineering',
    description: 'End-to-end cloud solutions including migration, infrastructure management, CI/CD pipelines, and serverless architecture.',
    visual: 'cloud-visual.png'
  },
  {
    icon: FiCpu,
    title: 'AI & Machine Learning',
    description: 'Leverage artificial intelligence for intelligent automation, predictive analytics, chatbots, and data-driven strategic insights.',
    visual: 'ai-visual.png'
  },
  {
    icon: FiDatabase,
    title: 'Database Design & Management',
    description: 'Efficient database architecture, optimization, and administration ensuring data integrity, security, and performance.',
    visual: 'db-visual.png'
  }
];

const ServicesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-primary-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-heading mb-4">
            Our Expertise
          </h2>
          <p className="text-lg sm:text-xl text-text-body max-w-3xl mx-auto">
            From concept to deployment, we provide comprehensive software solutions designed to elevate your business.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group card-base p-6 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="relative z-10 transition-all duration-300 ease-in-out group-hover:-translate-y-2">
                  <service.icon className="w-12 h-12 text-accent-primary mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-text-heading mb-2">
                    {service.title}
                  </h3>
              </div>
              <motion.div 
                 className="absolute inset-x-0 bottom-0 z-0 px-6 pb-6 pt-16 bg-gradient-to-t from-white via-white to-transparent"
                 initial={{ y: "100%" }}
                 whileHover={{ y: 0 }}
                 transition={{ duration: 0.3, ease: 'easeInOut' }}
               >
                 <p className="text-text-body text-sm leading-relaxed">{service.description}</p>
               </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection; 