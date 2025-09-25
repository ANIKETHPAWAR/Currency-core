import dharmeshWithCarImg from '../../assets/car.jpg'
import moneyImg from "../../assets/money.jpg"
import callingImg from "../../assets/calling.jpg"
import tradingOnPhoneImg from "../../assets/trading-on-phone.jpg"
import dharmeshReading from "../../assets/reading.jpg"
import cryptoChart from "../../assets/crypto-chart.jpg"
const CourseHero = () => {
      return (
            <section className="pt-32 pb-16 bg-black text-white">
                  <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                              <h1 className="text-4xl md:text-5xl font-bold">Forex With Dharmesh</h1>
                              <p className="mt-4 max-w-3xl mx-auto text-gray-300">
                                    One of the best content creators in the forex industry for swing and intraday traders. We will make the complex forex trading process easy with our high-quality trading courses.
                              </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl object-cover mx-auto">
                              <img src={dharmeshWithCarImg} alt="Dharmesh with car" className="rounded-lg shadow-lg aspect-video object-cover" />
                              <img src={moneyImg} alt="Currency" className="rounded-lg shadow-lg aspect-video object-cover" />
                              <img src={callingImg} alt="Dharmesh calling" className="rounded-lg shadow-lg aspect-video object-cover" />
                              <img src={tradingOnPhoneImg} alt="Trading on phone" className="rounded-lg shadow-lg aspect-video object-cover" />
                              <img src={dharmeshReading} alt="Dharmesh" className="rounded-lg shadow-lg aspect-video object-cover" />
                              <img src={cryptoChart} alt="Crypto chart" className="rounded-lg shadow-lg aspect-video object-cover" />
                        </div>
                  </div>
            </section>
      );
};
export default CourseHero;