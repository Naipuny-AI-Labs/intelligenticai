export default function DocumentationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <section className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-white">Documentation</h1>

          <div className="space-y-6">
            <div className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
              <h2 className="text-xl font-semibold mb-3 text-white">Getting Started</h2>
              <p className="text-[#d1d1d1] leading-relaxed">
                Learn how to set up and integrate our AI solutions into your business. Our step-by-step guides will help you get up and running quickly.
              </p>
            </div>

            <div className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
              <h2 className="text-xl font-semibold mb-3 text-white">API Reference</h2>
              <p className="text-[#d1d1d1] leading-relaxed">
                Comprehensive documentation for our RESTful API, including endpoints, parameters, and example responses.
              </p>
            </div>

            <div className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
              <h2 className="text-xl font-semibold mb-3 text-white">SDKs & Libraries</h2>
              <p className="text-[#d1d1d1] leading-relaxed">
                Official SDKs and libraries for popular programming languages to help you integrate our services more easily.
              </p>
            </div>

            <div className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
              <h2 className="text-xl font-semibold mb-3 text-white">Tutorials</h2>
              <p className="text-[#d1d1d1] leading-relaxed">
                Practical guides and walkthroughs to help you implement specific features and use cases.
              </p>
            </div>

            <div className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
              <h2 className="text-xl font-semibold mb-3 text-white">Best Practices</h2>
              <p className="text-[#d1d1d1] leading-relaxed">
                Learn how to get the most out of our platform with expert tips and recommended implementation strategies.
              </p>
            </div>

            <div className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
              <h2 className="text-xl font-semibold mb-3 text-white">Troubleshooting</h2>
              <p className="text-[#d1d1d1] leading-relaxed">
                Solutions to common issues and errors, along with debugging tips and support resources.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
