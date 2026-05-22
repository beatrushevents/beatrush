'use client';

import React, { useEffect, useRef, useState } from 'react';

const GOLD = '#D4AF37';
const TEAL = '#67E8F9';
const FATSOMA_URL = 'https://www.fatsoma.com/p/beatrush-events';
const INSTAGRAM_URL = 'https://www.instagram.com/beatrush_events?igsh=aXR1YXEwYjl1YzRn&utm_source=qr';
const TIKTOK_URL = 'https://www.tiktok.com/@beatrush_events?_r=1&_t=ZN-96YU7NZtHte';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61587153658510';
const X_URL = 'https://x.com/beatrushevents?s=21';

const Bolt = ({ className = '', glow = false }) => (
  <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" style={glow ? { filter: 'drop-shadow(0 0 36px rgba(212, 175, 55, 0.55)) drop-shadow(0 0 12px rgba(212, 175, 55, 0.45))' } : {}}>
    <path d="M 62 4 L 14 102 L 46 102 L 26 196 L 90 84 L 58 84 L 78 4 Z" fill={GOLD} />
  </svg>
);

function useInView(threshold = 0.2, once = true) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.unobserve(el);
      } else if (!once) setInView(false);
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);
  return [ref, inView];
}

function useParallax() {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      setOffset((clamped - 0.5) * 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return [ref, offset];
}

const pastEvents = [
  {
    title: 'Thara Local',
    year: '2025',
    tag: 'Launch night',
    image: 'thara-local.jpeg',
    highlight: 'The launch night that started the BeatRush movement.  Local brought Tamil, Malayalam and Telugu energy into one room at Colours Hoxton with DJ Roxzstar, sponsor support and a crowd that made our first event feel like a proper statement.',
    photos: ['/thara-local.jpeg', '/IMG_3806.PNG', '/IMG_3768.PNG', '/IMG_3803.PNG', '/IMG_3807.PNG', '/IMG_3813.PNG', '/IMG_3800.PNG', '/IMG_3812.PNG', '/IMG_3791.PNG', '/IMG_3785.PNG', '/IMG_3782.jpeg', '/IMG_3809.PNG', '/IMG_3810.PNG', '/IMG_3801.PNG', '/IMG_3814.PNG', '/IMG_3811.PNG', '/IMG_3783.PNG'],
  },
  {
    title: 'Jolly O Gymkhana',
    year: '2025',
    tag: 'Neon party',
    image: '/jolly-o-gymkhana.jpeg',
    highlight: 'Our ultimate neon night at The Cause London. Jolly O Gymkhana took the BeatRush crowd into a UV, glow and high energy club experience with DJ Roxzstar and DJ Julia delivering a full Tamil and Malayalam night.',
    photos: ['/jolly-o-gymkhana.jpeg', '/File 1.JPEG', '/File 38.JPEG', '/b1.jpeg', '/File 35.JPEG', '/File 5.jpeg', '/File 6.JPEG', '/File 10.JPEG', '/File 11.JPEG', '/File 12.JPEG', '/File 13.JPEG', '/File 38.JPEG', '/File 14.JPEG', '/File 15.JPEG', '/File 16.JPEG', '/File 17.JPEG', '/File 18.JPEG', '/File 8.JPEG', '/File 19.JPEG', '/File 20.JPEG', '/File 21.JPEG', '/File 7.JPEG', '/File 2.JPEG', '/File 22.JPEG', '/File 23.JPEG', '/File 24.JPEG', '/File 25.JPEG', '/File 3.JPEG', '/File 26.JPEG', '/File 9.JPEG', '/File 27.JPEG', '/File 28.JPEG', '/File 29.JPEG', '/File 30.JPEG', '/File 37.JPEG', '/File 31.JPEG', '/File 32.JPEG', '/File 33.JPEG', '/File 34.JPEG', '/File 36.JPEG',],
  },
  {
    title: 'Holiday Hangover',
    year: '2025',
    tag: 'Boxing Day special',
    image: '/holiday-hangover.jpeg',
    highlight: 'Our Boxing Day Christmas crossover at Brixton Jamm. Holiday Hangover brought festive chaos, Tamil and Malayalam club energy, sponsor visibility and one of our strongest end of year crowds.',
    photos: ['/holiday-hangover.jpeg', '/File 52.jpeg', '/File 41.JPEG', '/File 63.JPEG', '/File 47.JPEG', '/File 58.jpeg', '/File 44.JPEG', '/File 66.JPEG', '/File 50.jpeg', '/File 61.JPEG', '/File 43.JPEG', '/File 67.JPEG', '/File 55.jpeg', '/File 46.JPEG', '/File 64.JPEG', '/File 49.JPEG', '/File 57.jpeg', '/File 42.JPEG', '/File 65.JPEG', '/File 53.jpeg', '/File 62.JPEG', '/File 48.JPEG', '/File 56.jpeg', '/File 45.JPEG', '/File 60.jpeg', '/File 51.jpeg', '/File 54.jpeg', '/File 59.jpeg'],
  },
  {
    title: 'Love You Two',
    year: '2026',
    tag: 'Valentine special',
    image: '/love-you-two.jpeg',
    highlight: 'Our Valentine special at Egg London. Love You Two was not just a couples night, it featured the first ever live surprise moment inside a DJ club event in London, creating a proper emotional BeatRush memory.',
    photos: ['/love-you-two.jpeg','/File 84.jpg', '/File 71.jpg', '/File 93.jpg', '/File 76.jpg', '/File 88.jpg', '/File 74.jpg', '/File 95.jpeg', '/File 80.jpg', '/File 70.jpg', '/File 91.jpg', '/File 73.jpg', '/File 96.jpeg', '/File 85.jpg', '/File 77.jpg', '/File 89.jpg', '/File 75.jpg', '/File 92.jpg', '/File 81.jpg', '/File 78.jpg', '/File 90.jpg', '/File 79.jpg', '/File 87.jpg', '/File 82.jpg', '/File 86.jpg', '/File 83.jpg'],
  },
  {
    title: 'Thames Kacheri',
    year: '2026',
    tag: 'Neon boat party',
    image: '/thames-kacheri.jpeg',
    highlight: 'London’s first South Indian neon boat party. The first boat sold out, demand pushed us to add a second boat, and BeatRush became the first London promoter to host two boats for the same South Indian event with 600+ people across the Thames.',
    photos: ['/thames-kacheri.jpeg', '/File 104.JPEG', '/File 117.JPEG', '/File 101.JPEG', '/File 129.JPEG', '/File 110.JPEG', '/File 123.JPEG', '/File 106.JPEG', '/File 132.JPEG', '/File 115.JPEG', '/File 100.JPEG', '/File 126.JPEG', '/File 108.JPEG', '/File 120.JPEG', '/File 103.JPEG', '/File 131.JPEG', '/File 112.JPEG', '/File 124.JPEG', '/File 107.JPEG', '/File 119.JPEG', '/File 102.JPEG', '/File 128.JPEG', '/File 111.JPEG', '/File 121.JPEG', '/File 105.JPEG', '/File 130.JPEG', '/File 114.JPEG', '/File 125.JPEG', '/File 109.JPEG', '/File 122.JPEG', '/File 116.JPEG', '/File 127.JPEG', '/File 113.JPEG', '/File 118.JPEG'],
  },
];

const PhotoPlaceholder = ({ label = 'Upload Photo' }) => (
  <div className="relative min-h-[170px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.12) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
    <div className="relative text-center">
      <div className="mx-auto mb-3 h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-white/50">＋</div>
      <p className="text-[10px] tracking-[0.35em] uppercase text-white/40">{label}</p>
    </div>
  </div>
);

export default function BeatRushSite() {
  const [introRef, introInView] = useInView(0.25);
  const [cineSectionRef, cineOffset] = useParallax();
  const [cineRevealRef, cineInView] = useInView(0.3);
  const [eventsRef, eventsInView] = useInView(0.15);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const videoRef = useRef(null);

  const setCineRefs = (el) => {
    cineSectionRef.current = el;
    cineRevealRef.current = el;
  };

  useEffect(() => {
    if (videoRef.current && cineInView) videoRef.current.play().catch(() => {});
  }, [cineInView]);

  return (
    <div className="min-h-screen bg-black text-white antialiased overflow-x-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Caveat:wght@500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: .55; transform: scale(.86); } }
        @keyframes thunderHit { 0%, 68%, 100% { opacity: .18; transform: translateY(-22px) scale(.96) rotate(7deg); filter: drop-shadow(0 0 10px rgba(212,175,55,.25)); } 70% { opacity: 1; transform: translateY(0) scale(1.08) rotate(7deg); filter: drop-shadow(0 0 70px rgba(212,175,55,1)) drop-shadow(0 0 24px rgba(255,255,255,.85)); } 73% { opacity: .45; transform: translateY(4px) scale(1) rotate(7deg); } 76% { opacity: 1; transform: translateY(0) scale(1.04) rotate(7deg); filter: drop-shadow(0 0 60px rgba(212,175,55,.9)); } }
        @keyframes flashSky { 0%, 69%, 100% { opacity: 0; } 70%, 76% { opacity: .42; } 72% { opacity: .1; } }
        .fade-up { animation: fadeUp 1s cubic-bezier(.16,1,.3,1) forwards; opacity: 0; }
        .fade-in { animation: fadeIn 1.4s ease-out forwards; opacity: 0; }
        .delay-1 { animation-delay: .12s; } .delay-2 { animation-delay: .3s; } .delay-3 { animation-delay: .48s; } .delay-4 { animation-delay: .66s; }
        .live-dot { animation: pulse 1.6s ease-in-out infinite; }
        .reveal { opacity: 0; transform: translateY(26px); transition: opacity 1s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1); }
        .reveal.in { opacity: 1; transform: translateY(0); }
        .event-card:hover .event-photo { transform: scale(1.06); }
        .event-photo { transition: transform .9s cubic-bezier(.16,1,.3,1); }
        .thunder-hit { animation: thunderHit 4.2s ease-in-out infinite; transform-origin: center; }
        .sky-flash { animation: flashSky 4.2s ease-in-out infinite; }
        .brand-logo { mix-blend-mode: screen; filter: contrast(1.1) brightness(1.08); }
      `}</style>

      <section id="home" className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 fade-in">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(ellipse 70% 45% at 50% 22%, rgba(212,175,55,.18) 0%, transparent 62%), radial-gradient(ellipse 60% 40% at 28% 65%, rgba(103,232,249,.10) 0%, transparent 58%), linear-gradient(180deg, #080808 0%, #050505 52%, #000 100%)` }} />
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,.62)_72%,#000_100%)]" />
        </div>

        <nav className="relative z-30 flex items-center justify-between px-5 md:px-10 lg:px-14 py-5 fade-up delay-1">
          <a href="#home" className="flex items-center gap-3">
            <img loading="lazy" src="/beatrush-logo.jpeg" alt="BeatRush Events" className="brand-logo h-10 md:h-12 w-auto object-contain" />
          </a>
          <div className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04]  px-2 py-1.5">
            {['Home', 'About Us', 'Upcoming Events', 'Past Events', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="px-4 py-2 text-[13px] rounded-full text-white/65 hover:text-white hover:bg-white/[0.06] transition-all">{item}</a>
            ))}
          </div>
          <a href={FATSOMA_URL} target="_blank" rel="noreferrer" className="rounded-full bg-white text-black px-5 md:px-6 py-2.5 text-[12px] tracking-[0.12em] uppercase font-semibold hover:bg-white/90 transition-all">Book Now</a>
        </nav>

        <div className="absolute inset-0 z-10 sky-flash bg-white pointer-events-none" />
        <Bolt glow className="thunder-hit absolute z-10 right-[8%] top-[18%] h-[52vh] max-h-[620px] min-h-[320px] w-auto opacity-80 pointer-events-none" />

        <div className="relative z-20 flex min-h-[calc(100vh-88px)] flex-col items-start justify-center px-6 md:px-14 lg:px-24 text-left pb-32">
          <p className="fade-up delay-2 text-[11px] md:text-[12px] tracking-[0.55em] uppercase text-white/55 mb-6">Tamil × Malayalam nightlife in London</p>
          <h1 className="fade-up delay-3 text-white leading-[.9] tracking-[-.03em]" style={{ fontFamily: "'Anton', sans-serif", fontStyle: 'italic', fontSize: 'clamp(4rem, 11vw, 10rem)' }}>
            WE DO IT <br /><span style={{ color: GOLD }}>DIFFERENT</span>
          </h1>
          <p className="fade-up delay-4 mt-7 max-w-xl text-white/72 text-[15px] md:text-[18px] leading-[1.8]">
            South Indian club nights, cinematic production, viral crowd energy and events that feel like home, but louder.
          </p>
          <div className="fade-up delay-4 mt-9 flex flex-col sm:flex-row items-start justify-center gap-4">
            <a href={FATSOMA_URL} target="_blank" rel="noreferrer" className="rounded-full bg-white text-black px-8 py-3 text-[12px] tracking-[0.18em] uppercase font-semibold hover:scale-[1.03] transition-all">Book Now</a>
            <a href="#past-events" className="rounded-full border border-white/15 px-8 py-3 text-[12px] tracking-[0.18em] uppercase text-white/75 hover:text-white hover:border-white/40 transition-all">Past Events</a>
          </div>
        </div>

        <div className="absolute bottom-[-2vw] left-1/2 z-10 w-[96vw] -translate-x-1/2 pointer-events-none opacity-[0.12]">
          <div className="flex items-end justify-center gap-[1vw] leading-[0.78]">
            <h2 className="text-white whitespace-nowrap" style={{ fontFamily: "'Anton', sans-serif", fontStyle: 'italic', fontSize: 'clamp(5rem, 18vw, 17rem)', letterSpacing: '-0.03em' }}>BEAT</h2>
            <Bolt glow className="h-[clamp(8rem,25vw,24rem)] w-auto mb-[-2%]" />
            <h2 className="text-white whitespace-nowrap" style={{ fontFamily: "'Anton', sans-serif", fontStyle: 'italic', fontSize: 'clamp(5rem, 18vw, 17rem)', letterSpacing: '-0.03em' }}>RUSH</h2>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black to-transparent z-20" />
      </section>

      <section id="about-us" ref={introRef} className="relative bg-black py-28 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto border border-white/10 rounded-[2rem] px-6 py-14 md:p-16 bg-white/[0.025]">
          <p className={`reveal ${introInView ? 'in' : ''} text-[11px] tracking-[0.5em] uppercase mb-6`} style={{ color: GOLD }}>BeatRush Events</p>
          <h2 className={`reveal ${introInView ? 'in' : ''} text-white mb-8`} style={{ fontFamily: "'Anton', sans-serif", fontStyle: 'italic', fontSize: 'clamp(2.7rem, 6vw, 5rem)', lineHeight: .95 }}>WE DO IT DIFFERENT</h2>
          <p className={`reveal ${introInView ? 'in' : ''} text-white/78 text-[15px] md:text-[16px] leading-[1.9] max-w-2xl`} style={{ transitionDelay: '.15s' }}>
            We bring Tamil and Malayalam nightlife to the heart of the UK. From neon club nights to boat parties and cultural club experiences, BeatRush is built for people who want more than just another night out.
          </p>
        </div>
      </section>

      <section ref={setCineRefs} className="relative w-full overflow-hidden bg-black" style={{ height: '100vh', minHeight: '640px' }}>
        <div className="absolute inset-0" style={{ transform: `translateY(${cineOffset}px)`, transition: 'transform .1s linear' }}>
          <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster="/cinematic-still.jpg" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 35%' }}>
            <source src="/cinematic.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-8 md:top-12 left-6 md:left-12 z-20 flex items-center gap-2.5"><span className="live-dot w-2 h-2 rounded-full" style={{ backgroundColor: GOLD }} /><span className="text-white/80 text-[11px] tracking-[0.3em] uppercase">BeatRush · Live</span></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <p className={`reveal ${cineInView ? 'in' : ''} text-white/60 text-[11px] md:text-[12px] tracking-[0.5em] uppercase mb-7`}>A BeatRush Night</p>
          <h2 className={`reveal ${cineInView ? 'in' : ''} text-white leading-[.95] tracking-[-.02em]`} style={{ fontFamily: "'Anton', sans-serif", fontStyle: 'italic', fontSize: 'clamp(4rem, 13vw, 12rem)' }}>THIS IS<br /><span style={{ color: GOLD }}>THE RUSH</span></h2>
        </div>
      </section>

      <section id="past-events" ref={eventsRef} className="relative bg-black py-24 md:py-32 lg:py-40 px-6 md:px-10 lg:px-14">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14 md:mb-20 text-center">
            <p className={`reveal ${eventsInView ? 'in' : ''} text-[11px] tracking-[0.5em] uppercase text-white/45 mb-5`}>Our journey so far</p>
            <h2 className={`reveal ${eventsInView ? 'in' : ''} text-white`} style={{ fontFamily: "'Anton', sans-serif", fontStyle: 'italic', fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: .95 }}>PAST EVENTS</h2>
            <p className={`reveal ${eventsInView ? 'in' : ''} mt-6 text-white/55 text-[14px] max-w-xl mx-auto leading-relaxed`}>Click any event showpiece to open its album area. You can replace the placeholder images later with multiple pictures from that event.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 md:gap-5">
            {pastEvents.map((event, index) => (
              <button key={event.title} onClick={() => setSelectedEvent(event)} className={`event-card reveal ${eventsInView ? 'in' : ''} group text-left relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] min-h-[390px] hover:border-white/30 transition-all`} style={{ transitionDelay: `${index * .08}s` }}>
                {event.image ? <img loading="lazy" src={event.image} alt={event.title} className="event-photo absolute inset-0 h-full w-full object-cover opacity-70" /> : <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 90% 70% at 50% 20%, rgba(212,175,55,.22), transparent 58%), linear-gradient(180deg,#111,#030303)` }} />}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
                <div className="absolute top-5 left-5 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] tracking-[0.25em] uppercase text-white/65">{event.year}</div>
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: GOLD }}>{event.tag}</p>
                  <h3 className="text-white leading-[.95]" style={{ fontFamily: "'Anton', sans-serif", fontStyle: 'italic', fontSize: 'clamp(2.1rem, 3vw, 3.2rem)' }}>{event.title}</h3>
                  <p className="mt-4 text-white/55 text-[12px] leading-relaxed">Open album →</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="upcoming-events" className="relative bg-black py-24 md:py-32 lg:py-40 px-6 md:px-10 lg:px-14 border-t border-white/10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[11px] tracking-[0.5em] uppercase mb-5" style={{ color: GOLD }}>Next drop</p>
            <h2 className="text-white leading-[.95] mb-6" style={{ fontFamily: "'Anton', sans-serif", fontStyle: 'italic', fontSize: 'clamp(3rem, 7vw, 6rem)' }}>UPCOMING<br />EVENTS</h2>
            <h3 className="text-white text-4xl md:text-5xl mb-3" style={{ fontFamily: "'Anton', sans-serif", fontStyle: 'italic' }}>Thala <span style={{ color: GOLD }}>×</span> Thalapathy</h3>
            <p className="text-white/65 leading-relaxed max-w-xl">A celebration of two legends, built for Tamil and Mallu crowd energy. One night of Thala hits, Thalapathy hits, mass anthems and pure nostalgia at Brixton Jamm.</p>
            <div className="mt-7 grid gap-3 text-white/75 text-[14px]">
              <p><span style={{ color: GOLD }}>Date:</span> June 20, 2026</p>
              <p><span style={{ color: GOLD }}>Time:</span> 11PM onwards</p>
              <p><span style={{ color: GOLD }}>Venue:</span> Brixton Jamm, 261 Brixton Road, London SW9 6LH</p>
            </div>
            <a href={FATSOMA_URL} target="_blank" rel="noreferrer" className="inline-block mt-8 rounded-full bg-white text-black px-8 py-3 text-[12px] tracking-[0.18em] uppercase font-semibold">Book Your Tickets</a>
          </div>
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.03]">
            <img loading="lazy" src="/thalaxthalap.jpeg" alt="Thala x Thalapathy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section id="contact" className="relative bg-black px-6 md:px-10 lg:px-14 py-20 border-t border-white/10 text-center">
        <img loading="lazy" src="/beatrush-logo.jpeg" alt="BeatRush Events" className="brand-logo mx-auto h-16 w-auto object-contain mb-6" />
        <p className="text-[11px] tracking-[0.5em] uppercase mb-3" style={{ color: GOLD }}>Contact BeatRush</p>
        <h2 className="text-white mb-10" style={{ fontFamily: "'Anton', sans-serif", fontStyle: 'italic', fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>LET’S CREATE HISTORY</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/30 transition-all">
            <p className="text-[11px] tracking-[0.32em] uppercase mb-3" style={{ color: GOLD }}>Instagram</p>
            <p className="text-white text-lg">@beatrush_events</p>
          </a>
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/30 transition-all">
            <p className="text-[11px] tracking-[0.32em] uppercase mb-3" style={{ color: GOLD }}>TikTok</p>
            <p className="text-white text-lg">@beatrush_events</p>
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/30 transition-all">
            <p className="text-[11px] tracking-[0.32em] uppercase mb-3" style={{ color: GOLD }}>Facebook</p>
            <p className="text-white text-lg">BeatRush Events</p>
          </a>
          <a href={X_URL} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/30 transition-all">
            <p className="text-[11px] tracking-[0.32em] uppercase mb-3" style={{ color: GOLD }}>X</p>
            <p className="text-white text-lg">@beatrushevents</p>
          </a>
          <a href={FATSOMA_URL} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/30 transition-all">
            <p className="text-[11px] tracking-[0.32em] uppercase mb-3" style={{ color: GOLD }}>Fatsoma</p>
            <p className="text-white text-lg">Book tickets</p>
          </a>
          <a href="https://wa.me/447442114834" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/30 transition-all">
            <p className="text-[11px] tracking-[0.32em] uppercase mb-3" style={{ color: GOLD }}>WhatsApp</p>
            <p className="text-white text-lg">+44 7442 114834</p>
            <p className="text-white text-lg">+44 7949 350287</p>
          </a>
          <a href="mailto:beatrushevents@gmail.com" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/30 transition-all lg:col-span-2">
            <p className="text-[11px] tracking-[0.32em] uppercase mb-3" style={{ color: GOLD }}>Email</p>
            <p className="text-white text-lg break-all">beatrushevents@gmail.com</p>
          </a>
        </div>
      </section>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/85  overflow-y-auto px-4 py-8 md:p-10">
          <div className="max-w-6xl mx-auto rounded-[2rem] border border-white/10 bg-[#050505] overflow-hidden">
            <div className="relative min-h-[280px] md:min-h-[380px] p-6 md:p-10 flex items-end">
              {selectedEvent.image ? <img loading="lazy" src={selectedEvent.image} alt={selectedEvent.title} className="absolute inset-0 h-full w-full object-cover opacity-45" /> : <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 65% at 50% 20%, rgba(212,175,55,.25), transparent 60%), #050505` }} />}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-black/20" />
              <button onClick={() => setSelectedEvent(null)} className="absolute right-5 top-5 h-11 w-11 rounded-full bg-white text-black text-xl">×</button>
              <div className="relative z-10">
                <p className="text-[11px] tracking-[0.45em] uppercase mb-4" style={{ color: GOLD }}>{selectedEvent.tag} · {selectedEvent.year}</p>
                <h2 className="text-white leading-[.9]" style={{ fontFamily: "'Anton', sans-serif", fontStyle: 'italic', fontSize: 'clamp(3rem, 9vw, 8rem)' }}>{selectedEvent.title}</h2>
              </div>
            </div>
            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <h3 className="text-white text-2xl mb-4" style={{ fontFamily: "'Anton', sans-serif", fontStyle: 'italic' }}>EVENT HIGHLIGHTS</h3>
                <p className="text-white/65 text-[14px] leading-[1.8]">{selectedEvent.highlight}</p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedEvent.photos.map((photo, i) => photo ? (
                  <button key={i} onClick={() => setSelectedPhoto({ src: photo, alt: `${selectedEvent.title} ${i + 1}`, index: i, photos: selectedEvent.photos.filter(Boolean), eventTitle: selectedEvent.title })} className="group relative overflow-hidden rounded-2xl border border-white/10 text-left">
                    <img loading="lazy" src={photo} alt={`${selectedEvent.title} ${i + 1}`} className="h-[210px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all" />
                    <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">View full</div>
                  </button>
                ) : <PhotoPlaceholder key={i} label={`Photo ${i + 1}`} />)}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPhoto && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8" onClick={() => setSelectedPhoto(null)}>
          <button onClick={() => setSelectedPhoto(null)} className="absolute right-5 top-5 z-20 h-11 w-11 rounded-full bg-white text-black text-xl">×</button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const photos = selectedPhoto.photos || [];
              const nextIndex = (selectedPhoto.index - 1 + photos.length) % photos.length;
              setSelectedPhoto({ ...selectedPhoto, index: nextIndex, src: photos[nextIndex], alt: `${selectedPhoto.eventTitle} ${nextIndex + 1}` });
            }}
            className="absolute left-4 md:left-8 z-20 h-12 w-12 md:h-14 md:w-14 rounded-full border border-white/15 bg-white/10 text-white text-3xl backdrop-blur hover:bg-white/20 transition-all"
            aria-label="Previous photo"
          >‹</button>
          <img loading="lazy" src={selectedPhoto.src} alt={selectedPhoto.alt} onClick={(e) => e.stopPropagation()} className="max-h-[92vh] max-w-[96vw] object-contain rounded-2xl border border-white/10 shadow-2xl" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              const photos = selectedPhoto.photos || [];
              const nextIndex = (selectedPhoto.index + 1) % photos.length;
              setSelectedPhoto({ ...selectedPhoto, index: nextIndex, src: photos[nextIndex], alt: `${selectedPhoto.eventTitle} ${nextIndex + 1}` });
            }}
            className="absolute right-4 md:right-8 z-20 h-12 w-12 md:h-14 md:w-14 rounded-full border border-white/15 bg-white/10 text-white text-3xl backdrop-blur hover:bg-white/20 transition-all"
            aria-label="Next photo"
          >›</button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-white/75 text-xs tracking-[0.16em] uppercase">
            {selectedPhoto.index + 1} / {selectedPhoto.photos?.length || 1}
          </div>
        </div>
      )}
    </div>
  );
}
