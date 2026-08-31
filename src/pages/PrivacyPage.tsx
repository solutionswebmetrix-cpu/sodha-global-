import LegalPage from './LegalPage';

const SECTIONS = [
  {
    heading: '1. Introduction',
    body: [
      'Sodha Global ("we", "our", "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store and protect your information when you visit our website or purchase our products.',
      'By using our website, you agree to the practices described in this policy.',
    ],
  },
  {
    heading: '2. Information We Collect',
    body: [
      'We collect information you provide directly to us, such as your name, email address, phone number and shipping address when you place an order, submit a contact enquiry or subscribe to our newsletter.',
      'We also automatically collect certain technical data, including your IP address, browser type and usage patterns, to improve our website and services.',
    ],
  },
  {
    heading: '3. How We Use Your Information',
    body: [
      'We use your personal information to process and fulfil your orders, respond to your enquiries, send you order confirmations and updates, and provide you with a better shopping experience.',
      'With your consent, we may also use your email to send you marketing communications, product updates and newsletters. You can opt out at any time.',
    ],
  },
  {
    heading: '4. Data Storage and Security',
    body: [
      'Your data is stored securely using trusted infrastructure and access controls. We do not store payment card details on our servers — payment processing is handled by trusted third-party payment gateways.',
      'We implement appropriate technical and organisational measures to protect your personal data from unauthorised access, alteration or disclosure.',
    ],
  },
  {
    heading: '5. Sharing Your Information',
    body: [
      'We do not sell, trade or rent your personal information to third parties. We may share limited data with trusted service providers (such as shipping carriers and payment processors) solely for the purpose of fulfilling your orders.',
    ],
  },
  {
    heading: '6. Your Rights',
    body: [
      'You have the right to access, correct or delete your personal data. You may also request that we stop processing your data. To exercise these rights, please contact us at sodhaglobal@gmail.com.',
    ],
  },
  {
    heading: '7. Cookies',
    body: [
      'Our website uses cookies and local storage to maintain your shopping cart and improve your browsing experience. You can control cookies through your browser settings.',
    ],
  },
  {
    heading: '8. Contact Us',
    body: [
      'If you have any questions about this Privacy Policy, please contact us at sodhaglobal@gmail.com or call +91 89181 44967.',
    ],
  },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" breadcrumb="Privacy Policy" sections={SECTIONS} />;
}
