'use client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesStart } from '@/features/courses/coursesSlice';
import { addInquiryStart, resetSubmitted } from '@/features/inquiries/inquiriesSlice';
import { RootState } from '@/store/rootReducer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Toast } from '@/components/ui/toast';

const contactInfo = [
  { icon: '📍', label: 'Visit Us',       value: '123 Civil Lines, Kanpur, Uttar Pradesh 208001', color: 'bg-amber-50 text-amber-700' },
  { icon: '📞', label: 'Call Us',         value: '+91 98765 xxxxx',                               color: 'bg-amber-50 text-amber-700' },
  { icon: '✉️', label: 'Email Us',        value: 'info@edupro.in',                                color: 'bg-amber-50 text-amber-700' },
  { icon: '🕐', label: 'Working Hours',   value: 'Mon–Sat: 9:00 AM – 7:00 PM',                   color: 'bg-amber-50 text-amber-700' },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function ContactPage() {
  const dispatch = useDispatch();
  const { data: courses, loading: coursesLoading } = useSelector((s: RootState) => s.courses);
  const { loading, submitted } = useSelector((s: RootState) => s.inquiries);
  const [form, setForm] = useState({ name: '', email: '', phone: '', courseOfInterest: '', message: '' });
  const [toast, setToast] = useState(false);

  const hero = useInView();
  const content = useInView();

  useEffect(() => { dispatch(fetchCoursesStart()); }, [dispatch]);

  useEffect(() => {
    if (submitted) {
      setToast(true);
      setForm({ name: '', email: '', phone: '', courseOfInterest: '', message: '' });
      dispatch(resetSubmitted());
    }
  }, [submitted, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addInquiryStart(form));
  };

  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative py-14 sm:py-24 px-4 overflow-hidden" ref={hero.ref}>
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80&auto=format&fit=crop"
          alt="Student working on laptop"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gray-950/75" />
        <div className={`max-w-3xl mx-auto text-center relative ${hero.visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="font-semibold text-sm uppercase tracking-widest mb-3 split-title-accent">Get In Touch</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 sm:mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            We'd Love to <span className="split-title-accent">Hear From You</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
            Have questions about our courses? Our counsellors are ready to help you choose the right path.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 15C480 30 240 0 0 10L0 40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4 theme-bg">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {contactInfo.map(({ icon, label, value, color }, i) => (
            <div
              key={label}
              className={`theme-card rounded-2xl p-5 border shadow-sm card-hover animate-fade-in-up delay-${i * 100 + 100}`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
                {icon}
              </div>
              <p className="text-xs font-semibold theme-fg-muted uppercase tracking-wide mb-1">{label}</p>
              <p className="text-sm font-medium theme-fg leading-snug">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-8 sm:py-10 px-4 pb-16 sm:pb-20 theme-bg-secondary" ref={content.ref}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">

          {/* Form */}
          <div className={`${content.visible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="theme-card rounded-2xl shadow-sm border p-5 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>
                  <span className="split-title-plain">Send an</span>{' '}
                  <span className="split-title-accent">Inquiry</span>
                </h2>
                <p className="theme-fg-muted text-sm mt-1">We'll get back to you within 24 hours.</p>
                <div className="w-12 h-1 rounded mt-3" style={{ backgroundColor: 'var(--primary)' }} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold theme-fg-muted uppercase tracking-wide mb-1.5 block">Full Name</label>
                    <Input
                      placeholder="John Doe"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="rounded-xl border-gray-200 focus:border-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold theme-fg-muted uppercase tracking-wide mb-1.5 block">Phone</label>
                    <Input
                      placeholder="Your phone number"
                      required
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="rounded-xl border-gray-200 focus:border-indigo-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold theme-fg-muted uppercase tracking-wide mb-1.5 block">Email Address</label>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="rounded-xl border-gray-200 focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold theme-fg-muted uppercase tracking-wide mb-1.5 block">Course of Interest</label>
                  <Select
                    required
                    value={form.courseOfInterest}
                    onChange={e => setForm(f => ({ ...f, courseOfInterest: e.target.value }))}
                    className="rounded-xl border-gray-200 focus:border-indigo-400 w-full"
                    disabled={coursesLoading}
                  >
                    <option value="">
                      {coursesLoading ? 'Loading courses...' : courses.length === 0 ? 'No courses available' : 'Select a course...'}
                    </option>
                    {courses.map(c => (
                      <option key={c._id} value={c.title}>{c.title}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-semibold theme-fg-muted uppercase tracking-wide mb-1.5 block">Message</label>
                  <Textarea
                    placeholder="Tell us about your goals or any questions..."
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="rounded-xl border-gray-200 focus:border-indigo-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl btn-primary text-sm shadow-lg disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : 'Submit Inquiry →'}
                </button>
              </form>
            </div>
          </div>

          {/* Map + Extra Info */}
          <div className={`space-y-6 ${content.visible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="theme-card rounded-2xl shadow-sm border overflow-hidden">
              <iframe
                title="EduPro Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57502.25!2d80.3319!3d26.4499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c4770b127c46f%3A0x1778302a9fbe7b41!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick stats */}
            <div className="rounded-2xl p-7" style={{ backgroundColor: 'var(--primary)' }}>
              <h3 className="font-bold text-lg mb-5" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--primary-fg)' }}>Why Students Choose Us</h3>
              <div className="space-y-3">
                {[
                  ['✅', 'Free career counselling session'],
                  ['✅', 'Flexible EMI options available'],
                  ['✅', 'Demo class before enrollment'],
                  ['✅', 'Dedicated placement support'],
                  ['✅', 'Industry-recognized certificates'],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-3 text-sm" style={{ color: 'var(--primary-fg)', opacity: 0.9 }}>
                    <span>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {toast && <Toast message="🎉 Inquiry submitted! We'll contact you soon." onClose={() => setToast(false)} />}
    </div>
  );
}
