import { motion } from 'framer-motion';
import { FiZap, FiSmartphone, FiCpu } from 'react-icons/fi';

const features = [
  {
    icon: <FiZap className="w-8 h-8 text-accent-primary flex-shrink-0" />,
    title: 'Scalable Web Apps',
    description: 'Optimized for high traffic, performance, and security.',
  },
  {
    icon: <FiSmartphone className="w-8 h-8 text-accent-primary flex-shrink-0" />,
    title: 'Mobile Apps',
    description: 'Native & cross-platform solutions for iOS and Android.',
  },
  {
    icon: <FiCpu className="w-8 h-8 text-accent-primary flex-shrink-0" />,
    title: 'AI-Powered Solutions',
    description: 'Leveraging AI for smart automation, chatbots, and insights.',
  },
];

const AboutUsSection = () => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-20 sm:py-28 bg-secondary-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-heading mb-6 leading-tight">
              Why Partner with Devasoft?
            </h2>
            <p className="text-lg sm:text-xl text-text-body mb-8 leading-relaxed">
              We deliver high-quality, AI-powered, and scalable digital solutions tailored for businesses in India and beyond. Our focus is on robust architecture, seamless user experiences, and measurable results.
            </p>
             <p className="text-lg text-text-body leading-relaxed">
              Choose innovation. Choose reliability. Choose Devasoft.
            </p>
          </motion.div>

          <motion.div
             variants={listVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.2 }}
             className="space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-5 p-4 rounded-lg hover:bg-white transition-colors duration-200"
                variants={itemVariants}
              >
                {feature.icon}
                <div>
                  <h3 className="text-xl font-semibold text-text-heading mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-normal">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection; 