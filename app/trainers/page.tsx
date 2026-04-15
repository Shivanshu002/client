'use client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainersStart } from '@/features/trainers/trainersSlice';
import { RootState } from '@/store/rootReducer';

const expertiseColors: Record<string, string> = {
  'Full Stack':   'bg-indigo-100 text-indigo-700',
  'Data Science': 'bg-purple-100 text-purple-700',
  'Cloud':        'bg-cyan-100 text-cyan-700',
  'UI/UX':        'bg-pink-100 text-pink-700',
  'Mobile':       'bg-orange-100 text-orange-700',
  'DevOps':       'bg-green-100 text-green-700',
};

const avatarGradients = [
  'from-indigo-500 to-purple-500',
  'from-cyan-500 to-blue-500',
  'from-pink-500 to-rose-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-violet-500 to-purple-500',
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

export default function TrainersPage() {
  const dispatch = useDispatch();
  const { data: trainers, loading, error } = useSelector((s: RootState) => s.trainers);

  const hero = useInView();
  const grid = useInView();

  useEffect(() => { dispatch(fetchTrainersStart()); }, [dispatch]);

  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative py-14 sm:py-24 px-4 overflow-hidden" ref={hero.ref}>
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80&auto=format&fit=crop"
          alt="Trainer teaching students"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gray-950/75" />
        <div className={`max-w-3xl mx-auto text-center relative ${hero.visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="font-semibold text-sm uppercase tracking-widest mb-3 split-title-accent">Our Team</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 sm:mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            Meet Our <span className="split-title-accent">Expert Trainers</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
            Learn from industry professionals with real-world experience at top tech companies
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 15C480 30 240 0 0 10L0 40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-10 sm:py-16 px-4 theme-bg" ref={grid.ref}>
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="text-center py-10">
              <p className="text-red-500 bg-red-50 inline-block px-6 py-3 rounded-xl">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {loading
              ? Array(3).fill(0).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-gray-100 p-8 flex flex-col items-center space-y-4 animate-pulse bg-white">
                    <div className="w-24 h-24 rounded-full bg-gray-200" />
                    <div className="h-5 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))
              : trainers.map((trainer, i) => {
                  const gradient = avatarGradients[i % avatarGradients.length];
                  const expertiseClass = Object.entries(expertiseColors).find(([k]) =>
                    trainer.expertise?.toLowerCase().includes(k.toLowerCase())
                  )?.[1] || 'bg-gray-100 text-gray-700';

                  return (
                    <div
                      key={trainer._id}
                      className={`theme-card rounded-2xl border shadow-sm overflow-hidden card-hover text-center ${grid.visible ? `animate-fade-in-up delay-${(i % 6) * 100 + 100}` : 'opacity-0'}`}
                    >
                      {/* Top gradient bar */}
                      <div className="h-24 bg-gray-100 relative">
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                          {trainer.photoUrl ? (
                            <img
                              src={trainer.photoUrl}
                              alt={trainer.name}
                              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                            />
                          ) : (
                            <div className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center text-3xl font-extrabold shadow-lg" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-fg)' }}>
                              {trainer.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-14 pb-6 px-4 sm:px-6">
                        <h3 className="text-xl font-bold theme-fg mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>
                          {trainer.name}
                        </h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${expertiseClass}`}>
                          {trainer.expertise}
                        </span>
                        <div className="flex items-center justify-center gap-2 text-sm theme-fg-muted">
                          <span className="text-base">🏆</span>
                          <span>{trainer.experience} of Experience</span>
                        </div>

                        <div className="mt-4 pt-4 sm:mt-5 sm:pt-5 border-t theme-border flex justify-center gap-4 sm:gap-6 text-xs theme-fg-muted">
                          <div className="text-center">
                            <div className="font-bold theme-fg text-base">200+</div>
                            <div>Students</div>
                          </div>
                          <div className="w-px bg-gray-200" />
                          <div className="text-center">
                            <div className="font-bold theme-fg text-base">4.9</div>
                            <div>Rating</div>
                          </div>
                          <div className="w-px bg-gray-200" />
                          <div className="text-center">
                            <div className="font-bold theme-fg text-base">10+</div>
                            <div>Courses</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            }
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-16 px-4 theme-bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            <span className="split-title-plain">Want to</span>{' '}
            <span className="split-title-accent">Join Our Team?</span>
          </h2>
          <p className="text-gray-500 mb-7">We're always looking for passionate educators and industry experts.</p>
          <a
            href="mailto:careers@edupro.in"
            className="inline-block px-8 py-3.5 rounded-xl btn-primary text-sm shadow-lg"
          >
            Apply as Trainer →
          </a>
        </div>
      </section>
    </div>
  );
}
