"use client";

import { useState, useEffect } from "react";
import { ThankYouPage } from "@/components/(lp)/pagina-de-conversao/thank-you-page";
import { HeroContact } from "@/components/(lp)/pagina-de-conversao/hero-contact";
import { WhyRegisterSection } from "@/components/(lp)/pagina-de-conversao/why-register-section";
import Testimonials from "@/components/(lp)/pagina-de-conversao/testimonials";
import Hero from "@/components/(lp)/pagina-de-conversao/hero";
import PersonalizedTestimonials from "@/components/(lp)/pagina-de-conversao/personalized-testimonials";
import AboutUs from "@/components/(lp)/pagina-de-conversao/about-us";
import WhatsappTestimonials from "@/components/(lp)/pagina-de-conversao/whatsapp-testimonials";
import Tool from "@/components/(lp)/pagina-de-conversao/tool";
import Footer from "@/components/(lp)/ui/footer";
import { FloatingNotification } from "@/components/(lp)/ui/floating-notification";

export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotifications(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleFormSubmit = (formData: any) => {
    console.log(formData);
    setUserEmail(formData.email);
    setSubmitted(true);
  };

  if (submitted) {
    return <ThankYouPage email={userEmail} />;
  }

  const notificationMessages = [
    "João Matos acabou de solicitar uma análise gratuita.",
    "Carlos Ribeiro economizou R$ 3.500 evitando erros no registro com nossa análise gratuita.",
    "Fernanda de SP acabou de enviar os dados para análise.",
    "Rafael acaba de evitar um processo por uso indevido de marca."
  ];

  return (
    <div className="min-h-screen bg-white" data-no-header data-no-bot data-no-footer>
      <HeroContact />
      <WhyRegisterSection />
      <Testimonials />
      <Hero />
      {/* <PersonalizedContent /> */}
      <PersonalizedTestimonials />
      <AboutUs />
      <WhatsappTestimonials />
      <Tool />
      <Footer />
      <FloatingNotification messages={notificationMessages}  position={"bottom-center"}/>
    </div>
  );
}
