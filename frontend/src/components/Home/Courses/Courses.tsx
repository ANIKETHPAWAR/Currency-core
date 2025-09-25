import { Button } from '../../ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
      {
            title: 'Beginner\'s Guide to Crypto',
            description: 'Understand the basics of cryptocurrency, blockchain technology, and how to make your first trade.',
            level: 'Beginner',
            duration: '4 Hours',
      },
      {
            title: 'Advanced Technical Analysis',
            description: 'Master chart patterns, indicators, and advanced strategies to predict market movements.',
            level: 'Advanced',
            duration: '12 Hours',
      },
      {
            title: 'Risk Management in Trading',
            description: 'Learn how to protect your capital, manage risk, and trade sustainably for long-term success.',
            level: 'Intermediate',
            duration: '6 Hours',
      },
];

const Courses = () => {
      return (
            <div className="bg-gray-900 py-24 sm:py-32">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                              <h2 className="text-base font-semibold leading-7 text-blue-400">Learn to Trade</h2>
                              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Unlock Your Trading Potential
                              </p>
                              <p className="mt-6 text-lg leading-8 text-gray-300">
                                    Our expert-led courses provide you with the knowledge and skills to navigate the crypto market successfully.
                              </p>
                        </div>
                        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                              {courses.map((course) => (
                                    <div key={course.title} className="flex flex-col justify-between rounded-2xl bg-black p-8 ring-1 ring-white/10">
                                          <div>
                                                <h3 className="text-2xl font-bold leading-8 text-white">{course.title}</h3>
                                                <p className="mt-4 text-base leading-7 text-gray-400">{course.description}</p>
                                          </div>
                                          <div className="mt-6">
                                                <div className="flex items-center gap-x-4 text-xs">
                                                      <span className="inline-flex items-center rounded-md bg-gray-800 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-700/10">{course.level}</span>
                                                      <span className="text-gray-500">{course.duration}</span>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>
                        <div className="mt-16 text-center">
                              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Link to="/batches">
                                          View All Courses <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                              </Button>
                        </div>
                  </div>
            </div>
      );
};

export default Courses;