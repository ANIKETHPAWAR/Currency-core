import aboutImage from '../../../assets/about-image.jpeg';
import { Button } from '../../ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
      return (
            <section className="bg-black py-24 sm:py-32">
                  <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                              <div className="order-2 lg:order-1">
                                    <h2 className="text-base font-semibold leading-7 text-blue-400">About Us</h2>
                                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                          Your Gateway to Financial Mastery
                                    </p>
                                    <p className="mt-6 text-lg leading-8 text-gray-300">
                                          At CurrencyCore, we are dedicated to empowering individuals with the knowledge and skills needed to navigate the complexities of the forex market. Our mission is to provide accessible, high-quality education for traders of all levels.
                                    </p>
                                    <ul className="mt-8 space-y-4 text-gray-300">
                                          <li className="flex items-center gap-3">
                                                <Check className="h-6 w-6 text-blue-500 bg-blue-900/50 rounded-full p-1" />
                                                <span>Expert-led comprehensive courses.</span>
                                          </li>
                                          <li className="flex items-center gap-3">
                                                <Check className="h-6 w-6 text-blue-500 bg-blue-900/50 rounded-full p-1" />
                                                <span>Practical, hands-on learning approach.</span>
                                          </li>
                                          <li className="flex items-center gap-3">
                                                <Check className="h-6 w-6 text-blue-500 bg-blue-900/50 rounded-full p-1" />
                                                <span>Supportive community of traders.</span>
                                          </li>
                                    </ul>
                                    <div className="mt-10">
                                          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                                <Link to="/about-us">Learn More</Link>
                                          </Button>
                                    </div>
                              </div>
                              <div className="order-1 lg:order-2">
                                    <img
                                          src={aboutImage}
                                          alt="Trading setup"
                                          className="rounded-lg shadow-2xl w-full h-auto object-cover"
                                    />
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default About;