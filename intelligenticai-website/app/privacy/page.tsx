export default function PrivacyPage() {
  return (
    <main className="container max-w-4xl py-12">
      <div className="bg-gradient-to-br from-green-500 via-blue-900 to-green-500 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-white">Intelligentic AI Marketplace Privacy Policy</h1>
        
        <section className="space-y-8">
          {[
            {
              title: "1. Introduction",
              content: "Welcome to Intelligentic AI's Privacy Policy. This document explains how we collect, use, and protect your personal information when you use our AI marketplace platform."
            },
            {
              title: "2. Information We Collect",
              content: (
                <>
                  We may collect the following types of information:
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
                    <li>Personal identification information (name, email, phone number)</li>
                    <li>Business information (company name, industry, size)</li>
                    <li>Usage data and analytics</li>
                    <li>Payment and transaction information</li>
                  </ul>
                </>
              )
            },
            {
              title: "3. How We Use Your Information",
              content: (
                <>
                  Your information is used to:
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
                    <li>Provide and improve our marketplace services</li>
                    <li>Process transactions and manage accounts</li>
                    <li>Communicate with users about their accounts</li>
                    <li>Enhance security and prevent fraud</li>
                  </ul>
                </>
              )
            },
            {
              title: "4. Data Sharing & Disclosure",
              content: "We do not sell your personal information. We may share data with trusted third parties only when necessary for service provision, legal compliance, or business operations."
            },
            {
              title: "5. Data Security",
              content: "We implement robust security measures to protect your data, including encryption, access controls, and regular security audits."
            },
            {
              title: "6. Your Rights",
              content: (
                <>
                  You have the right to:
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your data</li>
                    <li>Object to or restrict certain data processing</li>
                    <li>Withdraw consent where applicable</li>
                  </ul>
                </>
              )
            },
            {
              title: "7. Cookies & Tracking",
              content: "We use cookies and similar technologies to enhance user experience and analyze platform usage. You can manage your cookie preferences through your browser settings."
            },
            {
              title: "8. International Data Transfers",
              content: "Your data may be transferred to and processed in countries outside your own, but we ensure adequate protection through standard contractual clauses and other safeguards."
            },
            {
              title: "9. Policy Updates",
              content: "We may update this policy to reflect changes in our practices. Significant changes will be communicated through our platform."
            },
            {
              title: "10. Contact Us",
              content: (
                <>
                  For privacy-related inquiries, please contact us at:
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
                    <li>Email: contact@intelligentic.ai</li>
                    <li>Phone: +1 (555) 123-4567</li>
                    <li>Address: Rent a desk ,serenity sqaure ,Raheja Mindspace,Hitech city,Hyderabad</li>
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
