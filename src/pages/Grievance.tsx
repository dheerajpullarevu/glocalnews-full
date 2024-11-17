export default function Grievance() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Grievance Redressal</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Grievance Officer</h2>
          <p className="mb-4">
            In accordance with Information Technology Act 2000 and rules made there under, the contact
            details of the Grievance Officer are provided below:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold">Mr. Rajesh Kumar</p>
            <p>Grievance Officer - Glocal News</p>
            <p>Email: grievance@glocalnews.com</p>
            <p>Phone: +91-9876543210</p>
            <p>Address: 123 News Street, Tech Park, Hyderabad - 500081</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Grievance Redressal Process</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Submit your grievance through our grievance form or email</li>
            <li>Receive acknowledgment within 24 hours</li>
            <li>Investigation of the grievance by our team</li>
            <li>Resolution provided within 15 working days</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Types of Grievances</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Content-related complaints</li>
            <li>Technical issues</li>
            <li>Privacy concerns</li>
            <li>Payment-related issues</li>
            <li>Account-related problems</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Submit a Grievance</h2>
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
              <label className="block text-sm font-medium text-gray-700">Type of Grievance</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                <option>Content Related</option>
                <option>Technical Issue</option>
                <option>Privacy Concern</option>
                <option>Payment Issue</option>
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
              Submit Grievance
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}