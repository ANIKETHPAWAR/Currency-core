
import About from "../../components/Home/About/About";
import Courses from "../../components/Home/Courses/Courses";
import Hero from "../../components/Home/Hero/Hero";
import MarketOverview from "../../components/Home/MarketOverview/MarketOverview";
import Testimonials from "../../components/Home/Testimonials/Testimonials";


const Home = () => {
  return (
    <div>
      <Hero />
      <Courses />
      <MarketOverview />
      <About />
      <Testimonials />

    </div>
  );
};

export default Home;
