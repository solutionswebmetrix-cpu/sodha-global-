import LegalPage from './LegalPage';

const SECTIONS = [
  {
    heading: '1. Introduction',
    body: [
      'These Terms and Conditions govern your use of the Sodha Global website and the purchase of products from our online store. By accessing our website or placing an order, you agree to be bound by these terms.',
    ],
  },
  {
    heading: '2. Products and Pricing',
    body: [
      'All products are subject to availability. We reserve the right to modify or discontinue any product without notice. Prices are listed in Indian Rupees (₹) and are subject to change. The price at the time of order placement is the price you will be charged.',
    ],
  },
  {
    heading: '3. Order Acceptance',
    body: [
      'Your order constitutes an offer to purchase. We reserve the right to accept or decline any order at our discretion. If we decline your order, any payment made will be refunded in full.',
      'Once your order is accepted, you will receive a confirmation email with your order details.',
    ],
  },
  {
    heading: '4. Shipping and Delivery',
    body: [
      'We strive to process and ship orders promptly. Estimated delivery times are provided at checkout but are not guaranteed. We are not liable for delays caused by shipping carriers or circumstances beyond our control.',
      'For full details, please refer to our Shipping Policy.',
    ],
  },
  {
    heading: '5. Returns and Refunds',
    body: [
      'We accept returns of unopened and undamaged products within 7 days of delivery. For full details on our return process, please refer to our Returns & Refunds Policy.',
    ],
  },
  {
    heading: '6. Intellectual Property',
    body: [
      'All content on this website, including text, images, logos and design, is the property of Sodha Global and may not be reproduced or used without our written permission.',
    ],
  },
  {
    heading: '7. Limitation of Liability',
    body: [
      'Sodha Global shall not be liable for any indirect, incidental or consequential damages arising from your use of our website or products. Our total liability shall not exceed the value of your order.',
    ],
  },
  {
    heading: '8. Governing Law',
    body: [
      'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.',
    ],
  },
  {
    heading: '9. Contact Us',
    body: [
      'For any questions regarding these Terms and Conditions, please contact us at sodhaglobal@gmail.com or call +91 89181 44967.',
    ],
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms & Conditions" breadcrumb="Terms & Conditions" sections={SECTIONS} />;
}
