import Navigation from "@/components/landing-page/Navigation";
import Hero from "@/components/landing-page/Hero";
import AboutSection from "@/components/landing-page/AboutSection";
import TrendingCourses from "@/components/landing-page/TrendingCourses";
import StudyAnywhere from "@/components/landing-page/StudyAnywhere";
import UpcomingEvents from "@/components/landing-page/UpcomingEvents";
import Newsletter from "@/components/landing-page/Newsletter";
import Footer from "@/components/landing-page/Footer";
import Chatbot from "@/components/landing-page/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <AboutSection />
      <TrendingCourses />
      <StudyAnywhere />
      <UpcomingEvents />
      <Newsletter />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
