"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const slides = [
  {
    src: "/banner1.jpg",
    title: "Plan Events That Inspire",
    subtitle:
      "From birthdays to business summits — make every moment unforgettable.",
  },
  {
    src: "/banner2.jpg",
    title: "Your Event, Your Way",
    subtitle:
      "Customize schedules, manage guests, and stay in control — all in one place.",
  },
  {
    src: "/banner3.jpg",
    title: "Stress-Free Management",
    subtitle:
      "Track RSVPs, update details, and keep everything running smoothly.",
  },
];

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const { src, title, subtitle } = slides[index];

  return (
    <div className="relative h-[60vh] w-full overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence>
        <motion.div
          key={index}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fade}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image src={src} alt={title} fill className="object-cover" priority />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
          {/* Text */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-lg md:text-xl max-w-2xl">{subtitle}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
