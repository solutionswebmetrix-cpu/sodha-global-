import LegalPage from './LegalPage';

const SECTIONS = [
  {
    heading: '1. Shipping Areas',
    body: [
      'Sodha Global currently ships across India. We are working to expand our shipping capabilities to international destinations and will update this policy accordingly.',
    ],
  },
  {
    heading: '2. Processing Time',
    body: [
      'Orders are typically processed within 1-2 business days of placement. Processing includes order verification, quality check and packaging.',
      'Orders placed on weekends or public holidays will be processed on the next business day.',
    ],
  },
  {
    heading: '3. Delivery Time',
    body: [
      'Estimated delivery times vary by location:',
      'Metro cities: 3-5 business days.',
      'Other cities: 5-7 business days.',
      'Remote areas: 7-10 business days.',
      'These are estimated timeframes and may vary due to carrier schedules or unforeseen circumstances.',
    ],
  },
  {
    heading: '4. Shipping Charges',
    body: [
      'Shipping charges are calculated based on your location and order weight. Orders above ₹500 qualify for free shipping within India.',
      'Exact shipping costs are displayed at checkout before you confirm your order.',
    ],
  },
  {
    heading: '5. Order Tracking',
    body: [
      'Once your order is dispatched, you will receive an email with tracking information. You can use this to monitor your delivery status in real time.',
    ],
  },
  {
    heading: '6. Delivery Issues',
    body: [
      'If your order arrives damaged or you do not receive it within the estimated timeframe, please contact us at sodhaglobal@gmail.com or call +91 89181 44967. We will work with the carrier to resolve the issue promptly.',
    ],
  },
  {
    heading: '7. Incorrect Address',
    body: [
      'Please ensure your shipping address is complete and accurate. We are not responsible for orders delivered to incorrect addresses provided by the customer. Additional charges may apply for re-shipment.',
    ],
  },
];

export default function ShippingPage() {
  return <LegalPage title="Shipping Policy" breadcrumb="Shipping Policy" sections={SECTIONS} />;
}
