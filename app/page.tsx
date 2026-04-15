'use client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { fetchCoursesStart } from '@/features/courses/coursesSlice';
import { RootState } from '@/store/rootReducer';

const slides = [
  { tag: 'Most Popular', title: 'Full Stack Web\nDevelopment',      subtitle: 'Build production-grade apps with React, Node.js & MongoDB', icon: '💻' },
  { tag: 'High Demand',  title: 'Data Science &\nMachine Learning', subtitle: 'Master Python, ML algorithms and real-world AI projects',    icon: '📊' },
  { tag: 'Get Certified',title: 'Cloud Computing\nwith AWS',        subtitle: 'Prepare for AWS certifications and launch your cloud career', icon: '☁️' },
];

const stats = [
  { num: '2000+', label: 'Students Trained', icon: '🎓' },
  { num: '95%',   label: 'Placement Rate',   icon: '💼' },
  { num: '15+',   label: 'Expert Trainers',  icon: '👨🏫' },
  { num: '20+',   label: 'Courses Offered',  icon: '📚' },
];

const features = [
  { icon: '🎯', title: 'Industry-Aligned Curriculum', desc: 'Courses designed with top companies to ensure you learn exactly what employers need.' },
  { icon: '🛠️', title: 'Hands-On Projects',           desc: 'Build a real portfolio with live projects, hackathons, and capstone assignments.' },
  { icon: '💼', title: '100% Placement Support',       desc: 'Dedicated placement cell with 200+ hiring partners across India.' },
  { icon: '🧑💻', title: 'Expert Mentors',             desc: 'Learn from professionals with 10+ years of industry experience.' },
  { icon: '📅', title: 'Flexible Batches',             desc: 'Morning, evening, and weekend batches to fit your schedule.' },
  { icon: '🏆', title: 'Certification',                desc: 'Receive industry-recognized certificates upon course completion.' },
];

const testimonials = [
  { name: 'Ankit Gupta',  course: 'Full Stack Dev', review: 'Excellent teaching methodology. Got placed within 2 months of completing the course!', stars: 5, company: 'TCS' },
  { name: 'Sneha Mishra', course: 'Data Science',   review: 'The hands-on projects made all the difference. Highly recommend EduPro!',              stars: 5, company: 'Infosys' },
  { name: 'Rohit Singh',  course: 'AWS Cloud',      review: 'Cleared my AWS certification on the first attempt. Great trainers!',                   stars: 4, company: 'Wipro' },
  { name: 'Pooja Yadav',  course: 'UI/UX Design',   review: 'Creative curriculum and supportive mentors. Best decision of my career.',               stars: 5, company: 'Accenture' },
];

const categoryBadge: Record<string, string> = {
  'Web Development': 'bg-amber-100 text-amber-800',
  'Data Science':    'bg-violet-100 text-violet-800',
  'Cloud':           'bg-sky-100 text-sky-700',
  'Design':          'bg-pink-100 text-pink-700',
  'Mobile':          'bg-orange-100 text-orange-700',
};

const P  = { backgroundColor: 'var(--primary)' } as const;
const PF = { backgroundColor: 'var(--primary)', color: 'var(--primary-fg)' } as const;
const TC = { color: 'var(--primary)' } as const;

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function HomePage() {
  const dispatch = useDispatch();
  const { data: courses, loading } = useSelector((s: RootState) => s.courses);
  const [slide, setSlide] = useState(0);

  const statsSection        = useInView();
  const featuresSection     = useInView();
  const coursesSection      = useInView();
  const testimonialsSection = useInView();

  useEffect(() => {
    dispatch(fetchCoursesStart());
    const interval = setInterval(() => setSlide(s => (s + 1) % slides.length), 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const featured = courses.slice(0, 3);
  const current  = slides[slide];

  return (
    <div className="overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen sm:min-h-[92vh] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80&auto=format&fit=crop"
          alt="Students studying with laptops"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gray-950/72" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-semibold mb-6 animate-fade-in-up" style={TC}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={P} />
                Admissions Open — Batch Starting Soon
              </div>

              <div className="mb-2 animate-fade-in-up delay-100">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={PF}>
                  {current.tag}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 animate-fade-in-up delay-200" style={{ fontFamily: "'Sora', sans-serif", whiteSpace: 'pre-line' }}>
                <span className="text-white">{current.title.split('\n')[0]}</span>{' '}
                <span style={TC}>{current.title.split('\n')[1]}</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-200 mb-8 max-w-lg animate-fade-in-up delay-300">{current.subtitle}</p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up delay-400">
                <Link href="/courses" className="w-full sm:w-auto">
                  <button className="btn-primary w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm shadow-lg hover:scale-105 transition-transform">
                    Explore Courses →
                  </button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg">
                    Free Counselling
                  </button>
                </Link>
              </div>

              <div className="flex gap-2 mt-10 animate-fade-in-up delay-500">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    style={i === slide ? { ...P, width: '2rem', height: '0.375rem', borderRadius: '9999px' } : { backgroundColor: 'rgba(255,255,255,0.4)', width: '0.75rem', height: '0.375rem', borderRadius: '9999px' }}
                  />
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center animate-fade-in-right delay-300">
              <div className="relative">
                <div className="w-80 rounded-2xl glass p-8 text-center shadow-2xl animate-float">
                  <div className="text-6xl mb-4">{current.icon}</div>
                  <p className="text-white font-bold text-xl mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {current.title.replace('\n', ' ')}
                  </p>
                  <div className="flex justify-center gap-4 text-xs text-white/80 border-t border-white/20 pt-4">
                    <div className="text-center"><div className="font-bold text-lg" style={TC}>2000+</div><div>Students</div></div>
                    <div className="w-px bg-white/20" />
                    <div className="text-center"><div className="font-bold text-lg" style={TC}>95%</div><div>Placement</div></div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-2 text-white text-xs font-semibold animate-float delay-200">🏆 Top Rated</div>
                <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-2 text-white text-xs font-semibold animate-float delay-400">✅ 100% Placement</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-4 theme-bg" ref={statsSection.ref}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {stats.map(({ num, label, icon }, i) => (
            <div key={label} className={`text-center p-4 sm:p-6 rounded-2xl theme-card border shadow-sm card-hover ${statsSection.visible ? `animate-count-up delay-${i * 100 + 100}` : 'opacity-0'}`}>
              <div className="text-2xl sm:text-3xl mb-2">{icon}</div>
              <div className="text-2xl sm:text-3xl font-extrabold" style={{ ...TC, fontFamily: "'Sora', sans-serif" }}>{num}</div>
              <div className="text-xs sm:text-sm theme-fg-muted mt-1 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-12 sm:py-20 px-4 theme-bg-secondary" ref={featuresSection.ref}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-8 sm:mb-14 ${featuresSection.visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={TC}>Why EduPro?</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>
              <span className="split-title-plain">Everything You Need </span>
              <span className="split-title-accent">to Succeed</span>
            </h2>
            <div className="section-divider" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon, title, desc }, i) => (
              <div key={title} className={`theme-card rounded-2xl p-7 shadow-sm border card-hover group ${featuresSection.visible ? `animate-fade-in-up delay-${i * 100 + 100}` : 'opacity-0'}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary)' }}>
                  {icon}
                </div>
                <h3 className="font-bold theme-fg mb-2">{title}</h3>
                <p className="theme-fg-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-12 sm:py-20 px-4 theme-bg" ref={coursesSection.ref}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-8 sm:mb-14 ${coursesSection.visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={TC}>Our Programs</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>
              <span className="split-title-plain">Featured </span>
              <span className="split-title-accent">Courses</span>
            </h2>
            <div className="section-divider" />
            <p className="theme-fg-muted mt-4 max-w-xl mx-auto text-sm">Start your journey with our most popular, placement-focused programs</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-7">
            {loading
              ? Array(3).fill(0).map((_, i) => (
                  <div key={i} className="rounded-2xl border p-6 space-y-3 animate-pulse theme-card">
                    <div className="h-4 bg-gray-200 rounded w-1/3" /><div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-16 bg-gray-200 rounded" /><div className="h-10 bg-gray-200 rounded" />
                  </div>
                ))
              : featured.map((course, i) => (
                  <div key={course._id} className={`theme-card rounded-2xl border shadow-sm overflow-hidden card-hover flex flex-col ${coursesSection.visible ? `animate-fade-in-up delay-${i * 200 + 100}` : 'opacity-0'}`}>
                    <div className="h-1" style={P} />
                    <div className="p-6 flex flex-col flex-1">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${categoryBadge[course.category] || 'bg-gray-100 text-gray-600'}`}>{course.category}</span>
                      <h3 className="font-bold theme-fg text-lg mb-2">{course.title}</h3>
                      <p className="theme-fg-muted text-sm flex-1 mb-5 line-clamp-2">{course.description}</p>
                      <div className="flex justify-between items-center text-sm mb-5 pt-3 border-t theme-border">
                        <span className="theme-fg-muted">⏱ {course.duration}</span>
                        <span className="font-bold text-base" style={TC}>₹{course.fees.toLocaleString()}</span>
                      </div>
                      <Link href="/courses">
                        <button className="btn-primary w-full py-2.5 rounded-xl text-sm">View Details</button>
                      </Link>
                    </div>
                  </div>
                ))
            }
          </div>

          <div className={`text-center mt-10 ${coursesSection.visible ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
            <Link href="/courses">
              <button className="btn-outline-primary px-8 py-3.5 rounded-xl text-sm">View All Courses →</button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12 sm:py-20 px-4 bg-gray-950" ref={testimonialsSection.ref}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-8 sm:mb-14 ${testimonialsSection.visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <p className="font-semibold text-sm uppercase tracking-widest mb-2" style={TC}>Success Stories</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
              What Our <span style={TC}>Students Say</span>
            </h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {testimonials.map(({ name, course, review, stars, company }, i) => (
              <div key={name} className={`bg-gray-900 border border-gray-800 rounded-2xl p-6 card-hover ${testimonialsSection.visible ? `animate-fade-in-up delay-${i * 100 + 100}` : 'opacity-0'}`}>
                <div className="flex mb-3">
                  {Array(stars).fill(0).map((_, j) => <span key={j} className="text-sm" style={TC}>★</span>)}
                  {Array(5 - stars).fill(0).map((_, j) => <span key={j} className="text-gray-600 text-sm">★</span>)}
                </div>
                <p className="text-gray-300 text-sm italic mb-5 leading-relaxed">"{review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={PF}>{name.charAt(0)}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{name}</p>
                    <p className="text-xs" style={TC}>{course} · {company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 px-4 theme-bg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-2xl sm:rounded-3xl p-7 sm:p-12 shadow-xl" style={P}>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--primary-fg)' }}>
              Ready to Transform Your Career?
            </h2>
            <p className="mb-8 text-sm sm:text-base max-w-xl mx-auto" style={{ color: 'var(--primary-fg)', opacity: 0.85 }}>
              Join 2000+ students who have already launched their tech careers with EduPro Institute.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/courses">
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-colors shadow-lg">
                  Browse Courses
                </button>
              </Link>
              <Link href="/contact">
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl border-2 font-bold text-sm transition-colors" style={{ borderColor: 'var(--primary-fg)', color: 'var(--primary-fg)' }}>
                  Talk to Counsellor
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
