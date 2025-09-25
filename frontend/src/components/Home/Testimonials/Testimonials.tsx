const testimonials = [
      {
            body: 'CurrencyCore has completely transformed my trading journey. The platform is intuitive, secure, and the advanced tools have given me a real edge in the market.',
            author: {
                  name: 'Sarah L.',
                  handle: 'CryptoTraderJane',
                  imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
            },
      },
      {
            body: 'As a beginner, I was intimidated by crypto. The educational resources and user-friendly interface on CurrencyCore made it easy for me to get started and trade confidently.',
            author: {
                  name: 'Michael B.',
                  handle: 'NewToCrypto',
                  imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
            },
      },
      {
            body: 'The speed and reliability of this platform are unmatched. I can execute trades instantly without any worries about downtime, which is crucial in the volatile crypto market.',
            author: {
                  name: 'David Chen',
                  handle: 'TechSavvyTrader',
                  imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
            },
      },
];

const Testimonials = () => {
      return (
            <div className="bg-black py-24 sm:py-32">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-xl text-center">
                              <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-400">Testimonials</h2>
                              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Trusted by traders worldwide
                              </p>
                        </div>
                        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
                              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                    {testimonials.map((testimonial) => (
                                          <div key={testimonial.author.handle} className="rounded-2xl bg-gray-900/50 p-8 shadow-lg ring-1 ring-white/10">
                                                <figure>
                                                      <blockquote className="text-lg leading-8 text-gray-300">
                                                            <p>“{testimonial.body}”</p>
                                                      </blockquote>
                                                      <figcaption className="mt-8 flex items-center gap-x-4">
                                                            <img className="h-12 w-12 rounded-full" src={testimonial.author.imageUrl} alt="" />
                                                            <div>
                                                                  <div className="font-semibold text-white">{testimonial.author.name}</div>
                                                                  <div className="text-gray-400">{`@${testimonial.author.handle}`}</div>
                                                            </div>
                                                      </figcaption>
                                                </figure>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Testimonials;