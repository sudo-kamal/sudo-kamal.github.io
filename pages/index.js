import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutUsSection from '../components/AboutUsSection';
import ServicesSection from '../components/ServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Head>
        <title>Devasoft - Scalable Software Solutions (India)</title>
        <meta name="description" content="Devasoft specializes in high-performance websites, mobile apps, and enterprise solutions for Indian clients." />
        <meta name="keywords" content="software consultancy, web development, mobile app development, AI solutions, enterprise software, India, Devasoft" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/devasoft-logo.png" type="image/png" />
        {/* Add other meta tags for SEO, Open Graph, Twitter Cards as needed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <Navbar onOpenConsultation={openModal} />
      <main>
        <HeroSection onOpenConsultation={openModal} />
        <AboutUsSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <CTASection onOpenConsultation={openModal} />
      </main>
      <Footer />
      <ConsultationModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
} 