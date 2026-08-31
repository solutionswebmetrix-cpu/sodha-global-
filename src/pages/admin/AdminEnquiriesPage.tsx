import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import {
  adminFetchEnquiries,
  adminUpdateEnquiryStatus,
  adminDeleteEnquiry,
  type ContactEnquiryRow,
} from '@/services/admin';
import { X, Mail, Phone, Trash2, MailOpen, Archive } from 'lucide-react';

const ENQUIRY_STATUSES = ['new', 'read', 'archived'];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<ContactEnquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiryRow | null>(null);

  const loadEnquiries = () => {
    setLoading(true);
    adminFetchEnquiries()
      .then(setEnquiries)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleView = (enquiry: ContactEnquiryRow) => {
    setSelectedEnquiry(enquiry);
    if (enquiry.status === 'new') {
      adminUpdateEnquiryStatus(enquiry.id, 'read').then(() => {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiry.id ? { ...e, status: 'read' } : e))
        );
      });
    }
  };

  const handleArchive = (id: string) => {
    adminUpdateEnquiryStatus(id, 'archived').then(() => {
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status: 'archived' } : e)));
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: 'archived' } : prev));
      }
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await adminDeleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      setSelectedEnquiry(null);
    } catch {
      // ignore
    }
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-saffron-100 text-saffron-700';
      case 'read': return 'bg-blue-100 text-blue-700';
      case 'archived': return 'bg-ivory-200 text-charcoal-500';
      default: return 'bg-ivory-100 text-charcoal-600';
    }
  };

  return (
    <AdminLayout active="/admin/enquiries">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-charcoal-900">Enquiries</h1>
        <p className="mt-1 text-sm text-charcoal-500">
          {enquiries.length} enquiry{enquiries.length !== 1 ? 's' : ''} total
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-20 rounded-2xl" />
          ))}
        </div>
      ) : enquiries.length === 0 ? (
        <div className="py-12 text-center text-charcoal-500">No enquiries yet.</div>
      ) : (
        <div className="space-y-3">
          {enquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory-100">
                <Mail className="h-5 w-5 text-copper-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-charcoal-900">{enquiry.name}</p>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-medium ${statusColor(enquiry.status)}`}>
                    {enquiry.status}
                  </span>
                </div>
                <p className="truncate text-xs text-charcoal-400">
                  {enquiry.subject || enquiry.message.slice(0, 60)}
                </p>
                <p className="mt-0.5 text-xs text-charcoal-300">{formatDate(enquiry.created_at)}</p>
              </div>
              <button
                onClick={() => handleView(enquiry)}
                className="rounded-lg border border-ivory-200 px-3 py-1.5 text-xs font-medium text-charcoal-700 transition-colors hover:border-copper-300 hover:text-copper-600"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Enquiry detail modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-[80] overflow-y-auto">
          <div
            className="fixed inset-0 bg-charcoal-950/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedEnquiry(null)}
          />
          <div className="relative mx-auto my-8 w-full max-w-lg rounded-2xl bg-ivory-50 p-6 shadow-2xl animate-scale-in sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-charcoal-900">
                  {selectedEnquiry.name}
                </h2>
                <p className="mt-1 text-xs text-charcoal-400">{formatDate(selectedEnquiry.created_at)}</p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-full p-2 text-charcoal-400 transition-colors hover:bg-ivory-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6 space-y-3">
              <a
                href={`mailto:${selectedEnquiry.email}`}
                className="flex items-center gap-2 text-sm text-charcoal-600 hover:text-copper-600"
              >
                <Mail className="h-4 w-4 text-charcoal-400" />
                {selectedEnquiry.email}
              </a>
              {selectedEnquiry.phone && (
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="flex items-center gap-2 text-sm text-charcoal-600 hover:text-copper-600"
                >
                  <Phone className="h-4 w-4 text-charcoal-400" />
                  {selectedEnquiry.phone}
                </a>
              )}
              {selectedEnquiry.subject && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal-400">Subject</p>
                  <p className="mt-0.5 text-sm text-charcoal-700">{selectedEnquiry.subject}</p>
                </div>
              )}
            </div>

            <div className="mb-6 rounded-2xl bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal-400 mb-2">Message</p>
              <p className="text-sm leading-relaxed text-charcoal-700">{selectedEnquiry.message}</p>
            </div>

            <div className="flex gap-3">
              {selectedEnquiry.status !== 'archived' && (
                <button
                  onClick={() => handleArchive(selectedEnquiry.id)}
                  className="btn-ghost flex-1"
                >
                  <Archive className="h-4 w-4" />
                  Archive
                </button>
              )}
              <button
                onClick={() => handleDelete(selectedEnquiry.id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-copper-600 px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-ivory-50 transition-colors hover:bg-copper-500"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
