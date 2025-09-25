import { Button } from "../ui/button";
import mentorImg from "../../assets/mentor.jpg"
import tradingChart from "../../assets/trading-mentor.jpeg"
const MentorSection = () => {
      return (
            <section className="py-20 bg-[#0A1D37] text-white">
                  <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                              <h2 className="text-4xl font-bold">Know Your Mentor</h2>
                              <p className="text-gray-400 mt-2">Dharmesh</p>
                              <Button className="mt-4 rounded-full bg-blue-600 hover:bg-blue-700">Know Me</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
                              <img src={tradingChart} alt="Trading Summary" className="rounded-lg" />
                              <img src={mentorImg} alt="Dharmesh" className="rounded-lg mx-auto" />
                        </div>
                  </div>
            </section>
      );
}

export default MentorSection;