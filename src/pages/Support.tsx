export default function Support() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Support Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Support</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <svg className="h-6 w-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>support@glocalnews.com</span>
            </div>
            <div className="flex items-center">
              <svg className="h-6 w-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 1234567890</span>
            </div>
            <div className="flex items-center">
              <svg className="h-6 w-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span>Live Chat (9 AM - 6 PM IST)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Common Issues</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-red-600 hover:text-red-700">
                Reset Password
              </a>
            </li>
            <li>
              <a href="#" className="text-red-600 hover:text-red-700">
                Account Verification
              </a>
            </li>
            <li>
              <a href="#" className="text-red-600 hover:text-red-700">
                Payment Issues
              </a>
            </li>
            <li>
              <a href="#" className="text-red-600 hover:text-red-700">
                App Installation Guide
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-xl font-semibold mb-4">Submit a Support Ticket</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Issue Type</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
              <option>Technical Issue</option>
              <option>Account Issue</option>
              <option>Payment Issue</option>
              <option>Content Issue</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Submit Ticket
          </button>
        </form>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Self-Help Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="#"
            className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-2">User Guide</h3>
            <p className="text-sm text-gray-600">
              Complete guide to using Glocal News
            </p>
          </a>
          <a
            href="#"
            className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-2">Video Tutorials</h3>
            <p className="text-sm text-gray-600">
              Step-by-step video guides
            </p>
          </a>
          <a
            href="#"
            className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-2">FAQs</h3>
            <p className="text-sm text-gray-600">
              Frequently asked questions
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}