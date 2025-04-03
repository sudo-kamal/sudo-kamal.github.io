import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const ConsultationForm = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', details: '' }); // Reset form
        if (onSuccess) onSuccess(result.message);
      } else {
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (error) {   
      setSubmitStatus('error');
      setErrorMessage(error.message);
       if (onError) onError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-md bg-primary-bg text-text-body placeholder-text-muted border border-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition duration-200 shadow-sm";
  const labelClasses = "block text-sm font-medium text-text-body mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-md text-center text-sm"
        >
          Success! Your request has been sent. We'll be in touch soon.
        </motion.div>
      )}
      {submitStatus === 'error' && (
         <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md text-center text-sm"
        >
          Error: {errorMessage || 'Could not send request.'}
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <label htmlFor="name" className={labelClasses}>
          Full Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputClasses}
          placeholder="e.g., Priya Sharma"
        />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <label htmlFor="email" className={labelClasses}>
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputClasses}
          placeholder="you@example.com"
        />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <label htmlFor="company" className={labelClasses}>
          Company Name (Optional)
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={inputClasses}
          placeholder="e.g., Fashion Hub India"
        />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <label htmlFor="details" className={labelClasses}>
          Tell us about your project <span className="text-red-600">*</span>
        </label>
        <textarea
          id="details"
          name="details"
          rows={5}
          value={formData.details}
          onChange={handleChange}
          required
          className={`${inputClasses} resize-none`}
          placeholder="Briefly describe your requirements, goals, or challenges..."
        ></textarea>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary py-3 text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <motion.span
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                 style={{ display: 'inline-block' }}
               >
                 <FiLoader className="w-5 h-5" />
              </motion.span>
              Sending...
            </>
          ) : (
            'Send Request'
          )}
        </button>
      </motion.div>
       <p className="text-xs text-text-muted text-center">We typically respond within 24 business hours.</p>
    </form>
  );
};

export default ConsultationForm; 