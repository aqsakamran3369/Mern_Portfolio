import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Intro from './Intro';
import About from './About';
import Experiences from './Experiences';
import Projects from './Projects';
import Courses from './Courses';
import Contact from './Contact';
import Footer from './Footer';
import LeftSider from './LeftSider';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import AOS styles

function Home() {
  const { portfolioData } = useSelector((state) => state.root);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Set animation duration to 1 second
      once: true,     // Ensure animations happen only once per scroll
    });
  }, []);

  return (
    <div className="bg-primary">

      <Header />
      {portfolioData && (
        <div className="bg-primary px-40 sm:px-5">
          <div >

          </div>
          <div data-aos="fade-up" >
            <Intro />
          </div>
          <div data-aos="fade-up" >
            <About />
          </div>
          <div data-aos="fade-up" >
            <Experiences />
          </div>
          <div data-aos="fade-up" >
            <Projects />
          </div>
          <div data-aos="fade-up" >
            <Courses data-aos="fade-up" />
          </div>
          <div data-aos="fade-up" >
            <Contact />
          </div>
          <div data-aos="fade-up" >
            <Footer />
          </div>







          <LeftSider data-aos="fade-up" />

        </div>
      )}
    </div>
  );
}

export default Home;
