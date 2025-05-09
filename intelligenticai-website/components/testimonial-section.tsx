export function TestimonialSection() {
  return (
    <section className="w-full py-10 sm:py-12 md:py-16 lg:py-24 bg-gray-50 dark:bg-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              What Our Users Say
            </h2>
            <p className="max-w-[900px] text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
              Hear from businesses and individuals who have transformed their workflows with our AI agents
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 sm:p-6 shadow-sm"
            >
              <div className="flex flex-col space-y-3 sm:space-y-4">
                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="rounded-full bg-gray-200 dark:bg-gray-800 h-8 w-8 sm:h-10 sm:w-10"></div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    quote:
      "The AI agents from Intelligentic have revolutionized our customer support operations. We've reduced response times by 75% while improving customer satisfaction.",
    name: "Sarah Johnson",
    title: "Customer Support Manager, TechCorp",
  },
  {
    quote:
      "As a content creator, the writing assistant agent has been a game-changer. It helps me overcome writer's block and generates creative ideas when I need them most.",
    name: "Michael Chen",
    title: "Content Creator",
  },
  {
    quote:
      "The data analysis agent helped us uncover insights we would have missed. It's like having a data scientist on call 24/7.",
    name: "Priya Patel",
    title: "Data Analyst, FinanceIQ",
  },
]
