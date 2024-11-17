export default function HelpCenter() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Help Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-red-600 hover:text-red-700">
                Creating an Account
              </a>
            </li>
            <li>
              <a href="#" className="text-red-600 hover:text-red-700">
                Setting Up Your Profile
              </a>
            </li>
            <li>
              <a href="#" className="text-red-600 hover:text-red-700">
                Personalizing Your Feed
              </a>
            </li>
            <li>
              <a href="#" className="text-red-600 hover:text-red-700">
                Language Settings
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Using the App</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-red-600 hover:text-red-700">
                Reading Articles
              </a>
            </li>
            <li>
              <a href="#" className="text-red-600 hover:text-red-700">
                Sharing Content
              </a>
            </li>
            <li>
              <a href="#" className="text-red-600 hover:text-red-700">
                Bookmarking Stories
              </a>
            </li>
            <li>
              <a href="#" className="text-red-600 hover:text-red-700">
                Following Topics
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-xl font-semibold mb-4">Popular Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Account & Profile</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600">
                  Change Password
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600">
                  Update Email
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600">
                  Privacy Settings
                </a>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Content & Features</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600">
                  News Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600">
                  Video Content
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600">
                  Digital Magazine
                </a>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Technical Support</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600">
                  App Issues
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600">
                  Login Problems
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600">
                  Error Messages
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Can't find what you're looking for?</h2>
        <p className="text-gray-600 mb-4">
          Our support team is here to help. Contact us through any of these channels:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="mailto:support@glocalnews.com"
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <span className="mr-2">📧</span>
            Email Support
          </a>
          <a
            href="#"
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <span className="mr-2">💬</span>
            Live Chat
          </a>
          <a
            href="tel:+911234567890"
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <span className="mr-2">📞</span>
            Phone Support
          </a>
        </div>
      </div>
    </div>
  );
}