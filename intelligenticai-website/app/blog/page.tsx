export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <section className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            INTELLIGENTIC AI Blog
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
              <h2 className="text-xl font-semibold mb-3 text-white">The Future of AI in Business</h2>
              <p className="text-[#d1d1d1] mb-4">
                Discover how AI is transforming industries and what it means for your business. From automation to predictive analytics, the future is here.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-500">Read More →</span>
                <span className="text-sm text-[#d1d1d1]">5 min read</span>
              </div>
            </article>

            <article className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
              <h2 className="text-xl font-semibold mb-3 text-white">AI Ethics: What You Need to Know</h2>
              <p className="text-[#d1d1d1] mb-4">
                As AI becomes more prevalent, ethical considerations are crucial. Learn about the key principles of responsible AI development and deployment.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-500">Read More →</span>
                <span className="text-sm text-[#d1d1d1]">7 min read</span>
              </div>
            </article>

            <article className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
              <h2 className="text-xl font-semibold mb-3 text-white">Building Smarter Chatbots</h2>
              <p className="text-[#d1d1d1] mb-4">
                Explore the latest techniques in natural language processing and how they're revolutionizing customer service through intelligent chatbots.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-500">Read More →</span>
                <span className="text-sm text-[#d1d1d1]">6 min read</span>
              </div>
            </article>

            <article className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
              <h2 className="text-xl font-semibold mb-3 text-white">AI in Healthcare: A New Era</h2>
              <p className="text-[#d1d1d1] mb-4">
                Discover how AI is transforming healthcare, from diagnosis to treatment planning, and what it means for patients and providers alike.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-500">Read More →</span>
                <span className="text-sm text-[#d1d1d1]">8 min read</span>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}
