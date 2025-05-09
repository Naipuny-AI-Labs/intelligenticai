export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <section className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-white">Cookie Policy</h1>
          
          <div className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
            <h2 className="text-xl font-semibold mb-3 text-white">What are Cookies?</h2>
            <p className="text-[#d1d1d1] leading-relaxed">
              Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, which can make it easier to visit the site again and make the site more useful to you.
            </p>
          </div>

          <div className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
            <h2 className="text-xl font-semibold mb-3 text-white">How We Use Cookies</h2>
            <p className="text-[#d1d1d1] leading-relaxed">
              We use cookies to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-[#d1d1d1]">
              <li>Remember your preferences and settings</li>
              <li>Analyze site traffic and usage patterns</li>
              <li>Improve our services and user experience</li>
              <li>Provide personalized content and recommendations</li>
            </ul>
          </div>

          <div className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
            <h2 className="text-xl font-semibold mb-3 text-white">Managing Cookies</h2>
            <p className="text-[#d1d1d1] leading-relaxed">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
            </p>
          </div>

          <div className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
            <h2 className="text-xl font-semibold mb-3 text-white">Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-[#d1d1d1]">
              <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Targeting Cookies:</strong> Used to deliver relevant content and ads</li>
            </ul>
          </div>

          <div className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
            <h2 className="text-xl font-semibold mb-3 text-white">Third-Party Cookies</h2>
            <p className="text-[#d1d1d1] leading-relaxed">
              We may also use various third-party cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on.
            </p>
          </div>

          <div className="bg-[#1a1a1a] backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#2a2a2a]">
            <h2 className="text-xl font-semibold mb-3 text-white">Contact Us</h2>
            <p className="text-[#d1d1d1] leading-relaxed">
              If you have any questions about our use of cookies, please contact us at contact@intelligentic.ai
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
