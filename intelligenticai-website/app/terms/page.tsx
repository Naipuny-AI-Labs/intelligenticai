export default function TermsPage() {
  return (
    <main className="container max-w-4xl py-12">
      <div className="bg-gradient-to-br from-green-500 via-blue-900 to-green-500 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-white">Intelligentic AI Marketplace Terms of Service</h1>
        
        <section className="space-y-8">
          {[
            {
              title: "1. Marketplace Overview",
              content: "Welcome to Intelligentic AI, the premier marketplace for AI agents. By accessing and using our platform, you agree to these Terms of Service. These terms govern your use of our marketplace, including browsing, purchasing, and deploying AI agents."
            },
            {
              title: "2. Marketplace Services",
              content: (
                <>
                  Intelligentic AI operates a digital marketplace offering:
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
                    <li>Access to pre-trained AI agents for various use cases</li>
                    <li>Custom AI agent development services</li>
                    <li>AI agent integration and deployment solutions</li>
                    <li>Marketplace for buying and selling AI agents</li>
                  </ul>
                </>
              )
            },
            {
              title: "3. User Responsibilities",
              content: (
                <>
                  As a marketplace user, you agree to:
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
                    <li>Provide accurate information for account creation</li>
                    <li>Maintain the security of your marketplace credentials</li>
                    <li>Use purchased AI agents in compliance with their licenses</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </>
              )
            },
            {
              title: "4. Intellectual Property",
              content: "The Intelligentic AI marketplace and its content are protected by intellectual property laws. AI agents available on the marketplace may have their own licensing terms. Users must respect the intellectual property rights of both Intelligentic AI and individual AI agent creators."
            },
            {
              title: "5. Data Privacy & Security",
              content: "We prioritize the protection of your data. Our Privacy Policy details how we handle marketplace transactions, user data, and AI agent interactions. All AI agents on our marketplace are required to comply with our data protection standards."
            },
            {
              title: "6. Transactions & Payments",
              content: "The marketplace facilitates transactions between users and AI agent providers. We are not responsible for the quality or performance of individual AI agents but provide dispute resolution services. All payments are processed securely through our platform."
            },
            {
              title: "7. Limitation of Liability",
              content: (
                <>
                  Intelligentic AI acts as a marketplace platform and shall not be liable for:
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
                    <li>Performance or outcomes of individual AI agents</li>
                    <li>Disputes between buyers and sellers</li>
                    <li>Indirect or consequential damages from marketplace use</li>
                  </ul>
                </>
              )
            },
            {
              title: "8. Modifications",
              content: "We may update these Terms to reflect changes in our marketplace operations. Significant changes will be communicated to users through the platform. Continued use of the marketplace after changes constitutes acceptance of the modified Terms."
            },
            {
              title: "9. Governing Law",
              content: "These Terms and all marketplace transactions are governed by the laws of the jurisdiction where Intelligentic AI is established, without regard to conflict of law principles."
            },
            {
              title: "10. Contact Information",
              content: (
                <>
                  For marketplace-related inquiries or concerns about these Terms, please contact us at:
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
                    <li>Email: marketplace@intelligentic.ai</li>
                    <li>Support: support@intelligentic.ai</li>
                    <li>Legal: legal@intelligentic.ai</li>
                  </ul>
                </>
              )
            }
          ].map((section, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-white/10">
              <h2 className="text-xl font-semibold mb-3 text-white">{section.title}</h2>
              <div className="text-gray-300 leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}
