import { Button } from "../ui/button";

const ContactSection = () => {
      return (
            <section className="py-20 bg-black text-white">
                  <div className="container mx-auto px-4 max-w-4xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                              <div>
                                    <h2 className="text-3xl font-bold">Contact Us for Courses</h2>
                                    <p className="mt-4 text-gray-400">
                                          Social media is the best way to connect with us. You can ask your doubts and queries on our social media, and we will solve them.
                                    </p>
                                    <p className="mt-4 text-gray-400">
                                          Email: <a href="mailto:forexwithdharmesh@gmail.com" className="text-blue-400">forexwithdharmesh@gmail.com</a>
                                    </p>
                              </div>
                              <form className="space-y-4">
                                    <div>
                                          <input type="text" placeholder="Enter your name" className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                          <input type="email" placeholder="Enter your email address" className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                          <textarea placeholder="Enter your message here" rows={4} className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                                    </div>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Submit Your Enquiry Now</Button>
                              </form>
                        </div>
                  </div>
            </section>
      )
}
export default ContactSection;