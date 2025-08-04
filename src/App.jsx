import { useState, useCallback } from 'react';
import { BubbleScene } from './components/BubbleScene';
import VortexLogo from './assets/vortex-logo.JPG';
import BadgeLogo from './assets/vortex-logo.JPG';
import OwnersPhoto from './assets/owners.JPG';
import WashWaxImg from './assets/Work/Wash_Wax.JPG';

import { FaInstagram } from 'react-icons/fa';
import { Car, Sparkles, Vacuum, Palette, Lightbulb } from 'lucide-react';

export default function App() {
  const [bubbleTrigger, setBubbleTrigger] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const handleInteraction = useCallback((x, y) => {
    setMousePosition({ x, y });
    setBubbleTrigger(prev => prev + 1);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    handleInteraction(x, y);
  };

  const handleServiceHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    handleInteraction(x, y);
  };

  return (
    <div className="scroll-smooth relative overflow-hidden">
      {/* 3D Bubble Scene */}
      <BubbleScene triggerBurst={bubbleTrigger} mousePosition={mousePosition} />

      {/* ───────── Top Navbar ───────── */}
      <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-sm z-30">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          {/* logo + brand */}
          <a href="#home" className="flex items-center gap-3">
            <img
              src={BadgeLogo}
              alt="Vort3x logo"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
            />
            <span className="text-white text-lg font-semibold whitespace-nowrap">
              Vort3xDetailing
            </span>
          </a>

          {/* nav links */}
          <div className="hidden md:flex items-center gap-8 text-white text-sm">
            <a href="#about" className="hover:text-green-400">About</a>
            <a href="#services" className="hover:text-green-400">Services</a>
            <a href="#packages" className="hover:text-green-400">Packages</a>
            <a href="#contact" className="hover:text-green-400">Contact</a>
          </div>
        </div>
      </nav>

      {/* ───────── Hero ───────── */}
      <section
        id="home"
        className="min-h-screen bg-black flex flex-col items-center justify-center relative z-10"
        onMouseMove={handleMouseMove}
      >
        <img
          src={VortexLogo}
          alt="Vort3x Detailing logo"
          className="w-60 md:w-72 mb-12 drop-shadow-xl"
          draggable={false}
        />
      </section>

      {/* ───────── About Us ───────── */}
      <section
        id="about"
        className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-16 relative z-10"
      >
        <div className='w-2/3 h-[2px] bg-white mb-12' />
        <img
          src={OwnersPhoto}
          alt="Owners of Vort3x Detailing"
          className="w-52 h-52 rounded-full object-cover ring-4 ring-green-500 mb-8"
        />
        <h2 className="text-white text-4xl font-bold mb-6">About Us</h2>

        {/* ✨ replace with your own copy ✨ */}
        <p className="text-gray-200 max-w-3xl leading-relaxed text-center">
          We're Josue and Jose some Real mfs — founders of&nbsp;
          <strong>Vort3x Detailing</strong>, serving Athens and the surrounding
          area with premium paint correction, Interior cleanings, and interior
          restoration, hit us up FNs.
        </p>
      </section>

      {/* ───────── Services ───────── */}
      <section
        id="services"
        className="min-h-screen bg-black flex flex-col items-center pt-16 px-6 relative z-10"
      >
        <div className='w-2/3 h-[2px] bg-white mb-12' />
        <h2 className="text-white text-4xl font-bold text-center">
          Our Services
        </h2>

        {/* coloured divider */}
        <div className="w-24 h-1 bg-green-500 mt-4 mb-12" />

        {/* service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-6xl">

          {/* --- Exterior --- */}
          <div 
            className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300 cursor-pointer"
            onMouseEnter={handleServiceHover}
          >
            <div className="w-40 h-40 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg mb-4 shadow-lg flex items-center justify-center">
              <Car className="w-20 h-20 text-white" />
            </div>
            <h3 className="text-white text-2xl font-semibold mb-2">
              Exterior Wash &amp; Wax
            </h3>
            <p className="text-gray-300 max-w-sm">
              Foam bath, wheel deep‑clean, clay treatment &amp; premium wax.
            </p>
          </div>

          {/* --- Interior --- */}
          <div 
            className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300 cursor-pointer"
            onMouseEnter={handleServiceHover}
          >
            <div className="w-40 h-40 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg mb-4 shadow-lg flex items-center justify-center">
              <Sparkles className="w-20 h-20 text-white" />
            </div>
            <h3 className="text-white text-2xl font-semibold mb-2">
              Interior Detailing
            </h3>
            <p className="text-gray-300 max-w-sm">
              Steam‑clean, stain removal, leather conditioning &amp; odor neutralizer.
            </p>
          </div>

          {/* --- Carpet And Seat Extractions --- */}
          <div 
            className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300 cursor-pointer"
            onMouseEnter={handleServiceHover}
          >
            <div className="w-40 h-40 bg-gradient-to-br from-green-600 to-green-800 rounded-lg mb-4 shadow-lg flex items-center justify-center">
              <Vacuum className="w-20 h-20 text-white" />
            </div>
            <h3 className="text-white text-2xl font-semibold mb-2">
              Carpet And Seat Extractions
            </h3>
            <p className="text-gray-300 max-w-sm">
              Deep cleaning and extraction for carpets and upholstery.
            </p>
          </div>

          {/* --- Paint Correction --- */}
          <div 
            className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300 cursor-pointer"
            onMouseEnter={handleServiceHover}
          >
            <div className="w-40 h-40 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg mb-4 shadow-lg flex items-center justify-center">
              <Palette className="w-20 h-20 text-white" />
            </div>
            <h3 className="text-white text-2xl font-semibold mb-2">
              Paint Correction
            </h3>
            <p className="text-gray-300 max-w-sm">
              Multi‑stage polishing to remove scratches and swirls, restoring depth.
            </p>
          </div>

          {/* --- Headlight Restoration --- */}
          <div 
            className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300 cursor-pointer"
            onMouseEnter={handleServiceHover}
          >
            <div className="w-40 h-40 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-lg mb-4 shadow-lg flex items-center justify-center">
              <Lightbulb className="w-20 h-20 text-white" />
            </div>
            <h3 className="text-white text-2xl font-semibold mb-2">
              Headlight Restoration
            </h3>
            <p className="text-gray-300 max-w-sm">
              Restore clarity and brightness to your headlights with our specialized service.
            </p>
          </div>

        </div>
      </section>

      {/* ---------- Packages ---------- */}
      <section
        id="packages"
        className="min-h-screen bg-black flex flex-col items-center pt-16 px-6 relative z-10"
      >
        <div className='w-2/3 h-[2px] bg-white mb-12' />
        <h2 className="text-white text-4xl font-bold text-center">
          Our Packages
        </h2>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
          {/* --- Basic Package --- */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-white text-2xl font-semibold mb-2">
              Basic Package
            </h3>
            <p className="text-gray-300 mb-4">
              Exterior wash, interior vacuum, and window cleaning.
            </p>
            <span className="text-green-500 font-bold">$99</span>
          </div>

          {/* --- Standard Package --- */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-white text-2xl font-semibold mb-2">
              Standard Package
            </h3>
            <p className="text-gray-300 mb-4">
              Basic Package + interior shampoo and tire dressing.
            </p>
            <span className="text-green-500 font-bold">$149</span>
          </div>

          {/* --- Premium Package --- */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-white text-2xl font-semibold mb-2">
              Premium Package
            </h3>
            <p className="text-gray-300 mb-4">
              Standard Package + paint correction and ceramic coating.
            </p>
            <span className="text-green-500 font-bold">$299</span>
          </div>
        </div>
      </section>

      {/* ───────── Our Work ───────── */}
      <section
        id="our-work"
        className="min-h-screen bg-black flex flex-col items-center pt-16 px-6 relative z-10"
      >
        <div className='w-2/3 h-[2px] bg-white mb-12' />
        <h2 className="text-white text-4xl font-bold text-center">
          Our Work
        </h2>
        <p className="text-gray-300 mb-8 text-center">
          Check out some of our recent projects and transformations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Project Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-white text-2xl font-semibold mb-2">
              Project Title
            </h3>
            <p className="text-gray-300 mb-4">
              Brief description of the project and the services provided.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Contact ───────── */}
      <section
        id="contact"
        className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-16 relative z-10"
      >
        <div className="w-2/3 h-[2px] bg-white mb-12" />

        <h2 className="text-white text-4xl font-bold mb-6">Contact Us</h2>

        {/* phone link */}
        <a
          href="tel:+12563216885"
          className="text-green-400 text-xl font-semibold flex items-center gap-2 mb-6"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;
            handleInteraction(x, y);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011 .24l3 3a1 1 0 01.24 1A4.6 4.6 0 0119 21a16 16 0 01-15-15 4.6 4.6 0 012.17-3.65 1 1 0 011-.24l3 3a1 1 0 01.24 1z" />
          </svg>
          (256)&nbsp;321‑6885
        </a>

        {/* Instagram link */}
        <a
          href="https://www.instagram.com/vort3xdetailing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:opacity-80"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;
            handleInteraction(x, y);
          }}
        >
          <FaInstagram className="w-6 h-6 text-pink-600" />
          <span className="text-white">@vort3xdetailing</span>
        </a>
      </section>
    </div>
  );
}