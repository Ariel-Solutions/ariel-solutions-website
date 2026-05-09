export default function PrivacyPolicyPage() {
  const privacyPolicy = `
1. Introduction
This website is operated by Ariel Solutions ("we", "us", "our"). We are committed to protecting your privacy and handling your personal information in accordance with applicable data protection principles.

2. What Information We Collect
We may collect personal information when you submit a contact form, including:
- Name
- Email address
- Message content
- Any additional information you voluntarily provide

We also automatically collect limited technical data such as:
- IP address
- Browser type
- Device information
- Website usage data (pages visited, time spent)

3. How We Use Your Information
We use collected information to:
- Respond to enquiries submitted through our contact form
- Communicate with potential clients or customers
- Improve website performance and user experience
- Maintain security and prevent misuse

4. Email Processing
When you submit a contact form, your information is sent directly to our email system for processing and response.

5. Data Storage
We may temporarily store contact form submissions for business and communication purposes. Data is retained only for as long as necessary and is periodically reviewed for deletion.

6. Third-Party Services
We may use third-party services for:
- Email delivery and hosting
- Website analytics

These providers may process limited technical data required for their services.

7. Analytics and Cookies
This website may use analytics tools to understand user behaviour.

This may include:
- IP address (anonymised where possible)
- Device and browser information
- Pages visited

You can disable cookies through your browser settings.

8. Disclosure of Information
We do not sell or rent your personal information.

We may disclose information:
- To service providers who assist in operating the website
- Where required by law

9. Data Security
We take reasonable technical and organisational measures to protect your information.

However, no method of internet transmission is 100% secure.

10. Your Rights
You may request access to or deletion of your personal data by contacting us.

11. Contact
If you have any questions about this Privacy Policy, contact us:

Ariel Solutions  
arielsolutions2026@gmail.com
+855969030402

12. Updates
We may update this Privacy Policy from time to time. Changes will be posted on this page.

Last updated: 3rd May 2026
`;

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h1 className="display-6 fw-bold mb-4">
                Privacy Policy
              </h1>

              <div
                style={{ whiteSpace: "pre-line" }}
                className="text-secondary lh-lg"
              >
                {privacyPolicy}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}