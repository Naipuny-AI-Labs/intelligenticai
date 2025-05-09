export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <section className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-white">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
                <h2 className="text-xl font-semibold mb-4 text-white">Get in Touch</h2>
                <p className="text-[#d1d1d1] mb-4">
                  We'd love to hear from you! Whether you have a question about our services, need technical support, or want to discuss a potential partnership, our team is here to help.
                </p>
                <div className="space-y-3">
                  <p className="text-[#d1d1d1]">
                    <strong>Email:</strong> contact@intelligentic.ai
                  </p>
                  <p className="text-[#d1d1d1]">
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                  <p className="text-[#d1d1d1]">
                    <strong>Address:</strong> 123 AI Street, Tech City, CA 90210
                  </p>
                </div>
              </div>
            </div>

            <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg">
              <iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d-122.41941558468163!3d37.77492977975923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0x3c0d5c1b5b5b5b5b!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1623256789012!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
