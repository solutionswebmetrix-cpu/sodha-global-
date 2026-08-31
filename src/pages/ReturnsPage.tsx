import LegalPage from './LegalPage';

const SECTIONS = [
  {
    heading: '1. Return Eligibility',
    body: [
      'We accept returns for unopened and undamaged products within 7 days of delivery. To be eligible for a return, the product must be in its original packaging and in the same condition as received.',
      'Opened or used products are not eligible for return due to food safety and hygiene regulations.',
    ],
  },
  {
    heading: '2. How to Initiate a Return',
    body: [
      'To initiate a return, please contact us at sodhaglobal@gmail.com or call +91 89181 44967 within 7 days of receiving your order. Include your order ID and the reason for the return.',
      'Our team will guide you through the return process and provide return shipping instructions.',
    ],
  },
  {
    heading: '3. Refund Process',
    body: [
      'Once we receive and inspect the returned product, we will notify you of the approval or rejection of your refund. Approved refunds will be processed to the original payment method within 7-10 business days.',
    ],
  },
  {
    heading: '4. Damaged or Defective Products',
    body: [
      'If you receive a damaged or defective product, please contact us within 48 hours of delivery with photographic evidence. We will arrange a replacement or full refund at no additional cost to you.',
    ],
  },
  {
    heading: '5. Non-Returnable Items',
    body: [
      'The following items are not eligible for return:',
      'Products that have been opened or used.',
      'Products not in their original packaging.',
      'Products returned after the 7-day return window.',
    ],
  },
  {
    heading: '6. Shipping Costs',
    body: [
      'Return shipping costs for eligible returns (damaged or incorrect products) are borne by Sodha Global. For returns due to change of mind, the customer bears the return shipping cost.',
    ],
  },
  {
    heading: '7. Exchanges',
    body: [
      'We do not offer direct exchanges. If you wish to exchange a product, please return the original item for a refund and place a new order for the desired product.',
    ],
  },
  {
    heading: '8. Contact Us',
    body: [
      'For any questions about our return and refund policy, please contact us at sodhaglobal@gmail.com or call +91 89181 44967.',
    ],
  },
];

export default function ReturnsPage() {
  return <LegalPage title="Returns & Refunds" breadcrumb="Returns & Refunds" sections={SECTIONS} />;
}
