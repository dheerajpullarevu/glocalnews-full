export default function FAQs() {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is Glocal News?",
          a: "Glocal News is a hyperlocal news platform that delivers news in multiple Indian languages. We connect local stories with global audiences while maintaining the authenticity and relevance of local reporting."
        },
        {
          q: "Which languages are supported?",
          a: "We currently support 8+ Indian languages including English, Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, and Bengali. We're continuously adding more languages."
        },
        {
          q: "Is the app free to use?",
          a: "Yes, the Glocal News app is free to download and use. We maintain our service through advertising revenue while keeping the news accessible to everyone."
        }
      ]
    },
    {
      category: "Content & Features",
      questions: [
        {
          q: "How do you ensure news accuracy?",
          a: "We have a rigorous fact-checking process. All news goes through multiple verification steps, and we have dedicated fact-checkers who verify information before publication."
        },
        {
          q: "Can I save articles for later?",
          a: "Yes, you can bookmark any article to read later. Your bookmarks sync across devices when you're signed in."
        },
        {
          q: "How often is content updated?",
          a: "Our content is updated 24/7. Breaking news is published immediately, and we have regular updates throughout the day."
        }
      ]
    },
    {
      category: "For Journalists",
      questions: [
        {
          q: "How can I become a journalist on Glocal News?",
          a: "You can apply through our 'Become a Journalist' section. After registration, complete KYC verification, and start publishing content through our mobile app."
        },
        {
          q: "How do journalists get paid?",
          a: "Journalists earn through a combination of views, engagement metrics, and quality scores. We offer bonuses for exclusive stories, breaking news, and viral content. Payments are processed monthly."
        },
        {
          q: "What kind of support do you provide to journalists?",
          a: "We provide training materials, editorial support, and access to professional tools. Our platform also offers analytics to help journalists understand their audience better."
        }
      ]
    },
    {
      category: "Advertising",
      questions: [
        {
          q: "How can I advertise on Glocal News?",
          a: "You can start advertising by visiting our 'Advertise with Us' section. We offer various formats including display ads, native content, and sponsored articles."
        },
        {
          q: "What targeting options are available?",
          a: "We offer targeting by location (state/district/mandal level), language, interests, and demographics. Our hyperlocal targeting ensures your ads reach the right audience."
        },
        {
          q: "What is the minimum advertising budget?",
          a: "Our starter packages begin at ₹10,000 per month. We also offer custom packages for larger campaigns and long-term partnerships."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "How do I report technical issues?",
          a: "You can report issues through our Help Center or contact support@glocalnews.com. Our technical team typically responds within 24 hours."
        },
        {
          q: "Is my data secure?",
          a: "Yes, we use industry-standard encryption and security measures to protect user data. We never share personal information without consent."
        },
        {
          q: "Can I use Glocal News offline?",
          a: "Yes, our app supports offline reading. You can download articles to read later when you don't have internet access."
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-8">
        {faqs.map((category) => (
          <div key={category.category}>
            <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
            <div className="space-y-4">
              {category.questions.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-4">
          Can't find the answer you're looking for? Please contact our support team.
        </p>
        <div className="flex space-x-4">
          <a
            href="mailto:support@glocalnews.com"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
          >
            Contact Support
          </a>
          <a
            href="/help-center"
            className="inline-flex items-center px-4 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
          >
            Visit Help Center
          </a>
        </div>
      </div>
    </div>
  );
}