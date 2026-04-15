'use client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesStart } from '@/features/courses/coursesSlice';
import { addInquiryStart, resetSubmitted } from '@/features/inquiries/inquiriesSlice';
import { RootState } from '@/store/rootReducer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Toast } from '@/components/ui/toast';

const categoryColors: Record<string, { bg: string; text: string; accent: string }> = {
  'Web Development': { bg: 'bg-indigo-50', text: 'text-indigo-700', accent: 'from-indigo-500 to-purple-500' },
  'Data Science':    { bg: 'bg-purple-50', text: 'text-purple-700', accent: 'from-purple-500 to-pink-500' },
  'Cloud':           { bg: 'bg-cyan-50',   text: 'text-cyan-700',   accent: 'from-cyan-500 to-blue-500' },
  'Design':          { bg: 'bg-pink-50',   text: 'text-pink-700',   accent: 'from-pink-500 to-rose-500' },
  'Mobile':          { bg: 'bg-orange-50', text: 'text-orange-700', accent: 'from-orange-500 to-amber-500' },
};

const defaultColor = { bg: 'bg-gray-50', text: 'text-gray-700', accent: 'from-indigo-500 to-purple-500' };

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

export default function CoursesPage() {
  const dispatch = useDispatch();
  const { data: courses, loading, error } = useSelector((s: RootState) => s.courses);
  const { submitted } = useSelector((s: RootState) => s.inquiries);

  const [selectedCourse, setSelectedCourse] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [toast, setToast] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const hero = useInView();
  const grid = useInView();

  useEffect(() => { dispatch(fetchCoursesStart()); }, [dispatch]);

  useEffect(() => {
    if (submitted) {
      setDialogOpen(false);
      setToast(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      dispatch(resetSubmitted());
    }
  }, [submitted, dispatch]);

  const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];
  const filtered = activeCategory === 'All' ? courses : courses.filter(c => c.category === activeCategory);

  const openEnroll = (title: string) => { setSelectedCourse(title); setDialogOpen(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addInquiryStart({ ...form, courseOfInterest: selectedCourse }));
  };

  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative py-14 sm:py-24 px-4 overflow-hidden" ref={hero.ref}>
        <img
          src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1600&q=80&auto=format&fit=crop"
          alt="Students in classroom"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gray-950/75" />
        <div className={`max-w-3xl mx-auto text-center relative ${hero.visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="font-semibold text-sm uppercase tracking-widest mb-3 split-title-accent">Our Programs</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 sm:mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            Explore Our <span className="split-title-accent">Courses</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
            Industry-aligned programs designed to make you job-ready from day one
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 15C480 30 240 0 0 10L0 40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 sm:py-8 px-4 theme-bg sticky top-16 z-30 border-b theme-border shadow-sm">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat ? 'shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={activeCategory === cat ? { backgroundColor: 'var(--primary)', color: 'var(--primary-fg)' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-8 sm:py-14 px-4 theme-bg-secondary" ref={grid.ref}>
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="text-center py-10">
              <p className="text-red-500 bg-red-50 inline-block px-6 py-3 rounded-xl">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {loading
              ? Array(6).fill(0).map((_, i) => (
                  <div key={i} className="rounded-2xl bg-white border border-gray-100 p-6 space-y-3 animate-pulse">
                    <div className="h-1.5 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-1/3 mt-4" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-16 bg-gray-200 rounded" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                ))
              : filtered.map((course, i) => {
                  const color = categoryColors[course.category] || defaultColor;
                  return (
                    <div
                      key={course._id}
                      className={`theme-card rounded-2xl border shadow-sm overflow-hidden card-hover flex flex-col ${grid.visible ? `animate-fade-in-up delay-${(i % 6) * 100 + 100}` : 'opacity-0'}`}
                    >
                      <div className="h-1" style={{ backgroundColor: 'var(--primary)' }} />
                      <div className="p-6 flex flex-col flex-1">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${color.bg} ${color.text}`}>
                          {course.category}
                        </span>
                        <h2 className="font-bold theme-fg text-lg mb-2 leading-snug">{course.title}</h2>
                        <p className="theme-fg-muted text-sm flex-1 mb-5 leading-relaxed">{course.description}</p>

                        <div className="flex justify-between items-center text-sm mb-5 py-3 border-t theme-border">
                          <span className="theme-fg-muted flex items-center gap-1.5">
                            <span className="text-base">⏱</span> {course.duration}
                          </span>
                          <span className="font-extrabold text-lg" style={{ color: 'var(--primary)' }}>₹{course.fees.toLocaleString()}</span>
                        </div>

                        <button
                          onClick={() => openEnroll(course.title)}
                          className="btn-primary w-full py-3 rounded-xl text-sm"
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  );
                })
            }
          </div>

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-500">No courses found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Enrollment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] max-w-md mx-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Enroll in <span className="split-title-accent">{selectedCourse}</span>
            </DialogTitle>
            <p className="text-sm text-gray-500 mt-1">Fill in your details and we'll get back to you within 24 hours.</p>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3 mt-2">
            <Input placeholder="Your Full Name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="rounded-xl" />
            <Input placeholder="Email Address" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="rounded-xl" />
            <Input placeholder="Phone Number" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="rounded-xl" />
            <Textarea placeholder="Any questions or message? (optional)" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="rounded-xl" rows={3} />
            <DialogFooter className="gap-2 mt-2">
              <button type="button" onClick={() => setDialogOpen(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit" className="btn-primary px-6 py-2.5 rounded-xl text-sm">
                Submit Inquiry
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {toast && <Toast message="🎉 Inquiry submitted! We'll contact you soon." onClose={() => setToast(false)} />}
    </div>
  );
}
