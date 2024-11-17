import { Link } from 'react-router-dom';

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
      
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to Glocal News. By accessing our website and mobile applications,
            you agree to these terms and conditions. Please read them carefully.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>"Platform" refers to Glocal News website and mobile applications</li>
            <li>"User" refers to any person accessing or using the Platform</li>
            <li>"Content" refers to articles, images, videos, and other materials</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="mb-4">
            When creating an account on our Platform, you must provide accurate
            and complete information. You are responsible for maintaining the
            confidentiality of your account credentials.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Content Guidelines</h2>
          <p className="mb-4">
            All content must comply with our content guidelines, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No hate speech or discriminatory content</li>
            <li>No false or misleading information</li>
            <li>No copyright infringement</li>
            <li>No spam or unauthorized advertising</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
          <p>
            All content published on the Platform is protected by copyright and
            other intellectual property laws. Users may not reproduce, distribute,
            or create derivative works without proper authorization.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Privacy</h2>
          <p>
            Our collection and use of personal information is governed by our{' '}
            <Link to="/privacy" className="text-red-600 hover:text-red-700">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
          <p>
            We reserve the right to terminate or suspend access to our Platform
            for violations of these terms or for any other reason at our discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p>
            We may modify these terms at any time. Continued use of the Platform
            after changes constitutes acceptance of the modified terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
          <p>
            For questions about these terms, please contact us at{' '}
            <a href="mailto:legal@glocalnews.com" className="text-red-600 hover:text-red-700">
              legal@glocalnews.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}