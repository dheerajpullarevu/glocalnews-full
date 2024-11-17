export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit our website.
            They help us provide you with a better experience by remembering your preferences
            and understanding how you use our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Essential Cookies</h3>
              <p>Required for basic functionality and security of the website.</p>
            </div>
            <div>
              <h3 className="font-semibold">Preference Cookies</h3>
              <p>Remember your language and region preferences.</p>
            </div>
            <div>
              <h3 className="font-semibold">Analytics Cookies</h3>
              <p>Help us understand how visitors interact with our platform.</p>
            </div>
            <div>
              <h3 className="font-semibold">Advertising Cookies</h3>
              <p>Used to deliver relevant advertisements and track ad performance.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies
            that are already on your device and you can set most browsers to prevent them
            from being placed.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have questions about our cookie policy, please contact us at{' '}
            <a href="mailto:privacy@glocalnews.com" className="text-red-600 hover:text-red-700">
              privacy@glocalnews.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}