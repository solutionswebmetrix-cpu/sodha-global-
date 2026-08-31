import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { submitContactEnquiry } from '@/services/products';
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await submitContactEnquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        subject: form.subject.trim() || undefined,
        message: form.message.trim(),
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  return (
    <div className="pt-28">
      <div className="container-luxury">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
      </div>

      {/* Header */}
      <section className="bg-ivory-100 py-12">
        <div className="container-luxury">
          <p className="text-eyebrow mb-3">Get in Touch</p>
          <h1 className="text-display font-display font-semibold text-charcoal-900">
            Contact Us
          </h1>
          <p className="mt-3 max-w-xl text-lg text-charcoal-500">
            Have a question about our products or your order? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact info + Form */}
      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact info */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-charcoal-900">
                Sodha Global
              </h2>
              <p className="mt-3 text-charcoal-500">
                Reach out to us through any of the channels below — we typically respond
                within 24 hours.
              </p>

              <div className="mt-8 space-y-5">
                <a
                  href="mailto:sodhaglobal@gmail.com"
                  className="group flex items-center gap-4 rounded-2xl border border-ivory-200 bg-white p-5 transition-all hover:border-copper-300 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory-100 transition-colors group-hover:bg-copper-50">
                    <Mail className="h-6 w-6 text-copper-600" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-charcoal-400">Email</p>
                    <p className="font-medium text-charcoal-900">sodhaglobal@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+918918144967"
                  className="group flex items-center gap-4 rounded-2xl border border-ivory-200 bg-white p-5 transition-all hover:border-copper-300 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory-100 transition-colors group-hover:bg-copper-50">
                    <Phone className="h-6 w-6 text-copper-600" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-charcoal-400">Phone</p>
                    <p className="font-medium text-charcoal-900">+91 89181 44967</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-ivory-200 bg-white p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory-100">
                    <MapPin className="h-6 w-6 text-copper-600" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-charcoal-400">Location</p>
                    <p className="font-medium text-charcoal-900">India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl border border-ivory-200 bg-white p-6 sm:p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
                    <Check className="h-8 w-8 text-sage-600" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-charcoal-900">
                    Message Sent
                  </h3>
                  <p className="mt-2 text-sm text-charcoal-500">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-ghost mt-6"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                      Name <span className="text-copper-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className={`w-full rounded-xl border bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 ${
                        errors.name ? 'border-copper-500' : 'border-ivory-200'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1 text-xs text-copper-600">{errors.name}</p>}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                        Email <span className="text-copper-600">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className={`w-full rounded-xl border bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 ${
                          errors.email ? 'border-copper-500' : 'border-ivory-200'
                        }`}
                        placeholder="you@email.com"
                      />
                      {errors.email && <p className="mt-1 text-xs text-copper-600">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="w-full rounded-xl border border-ivory-200 bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500"
                        placeholder="+91 ..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => update('subject', e.target.value)}
                      className="w-full rounded-xl border border-ivory-200 bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                      Message <span className="text-copper-600">*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      rows={5}
                      className={`w-full resize-none rounded-xl border bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 ${
                        errors.message ? 'border-copper-500' : 'border-ivory-200'
                      }`}
                      placeholder="Tell us more..."
                    />
                    {errors.message && <p className="mt-1 text-xs text-copper-600">{errors.message}</p>}
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 rounded-xl bg-copper-50 px-4 py-3 text-sm text-copper-700">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full"
                  >
                    {status === 'loading' ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-ivory-50 border-t-transparent" />
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
