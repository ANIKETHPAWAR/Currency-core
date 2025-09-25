import offlineClass from "../../assets/offline-class.jpg"
import onlineClass from "../../assets/onlineclass.jpg"

const CourseList = () => {
      return (
            <section className="py-20 bg-[#ADD8E6]/20">
                  <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold text-white">Forex Trading Courses</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-gray-300">
                              One of the best content creators in the forex industry for swing and intraday traders. We will make the complex forex trading process easy with our high-quality trading courses.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
                              <div className="bg-black/50 p-8 rounded-lg text-left">
                                    <img src={offlineClass} alt="Offline course" className="rounded-lg mb-4" />
                                    <h3 className="text-2xl font-bold text-white">Offline Live On One To One</h3>
                                    <p className="text-gray-400 mt-2">The best course to learn personally on a one-to-one basis.</p>
                              </div>
                              <div className="bg-black/50 p-8 rounded-lg text-left">
                                    <img src={onlineClass} alt="Online course" className="rounded-lg mb-4" />
                                    <h3 className="text-2xl font-bold text-white">Lifetime Learning Sessions</h3>
                                    <p className="text-gray-400 mt-2">A perfect course for beginners to learn trading and become a pro trader.</p>
                              </div>
                        </div>
                  </div>
            </section>
      )
}

export default CourseList