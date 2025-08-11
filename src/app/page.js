"use client";

import { motion } from "motion/react";
import BannerCarousel from "@/components/Banner";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <main className="space-y-24 bg-base-100 text-base-content">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        <BannerCarousel></BannerCarousel>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
      >
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-center">Features</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Fast Setup",
                desc: "Create events in seconds with intuitive forms.",
              },
              {
                title: "Secure Access",
                desc: "Your data is protected with robust auth.",
              },
              {
                title: "Interactive Dashboard",
                desc: "Access your dashboard with ease.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="card bg-base-200 shadow-md hover:scale-[1.02] transition-transform"
              >
                <div className="card-body">
                  <h3 className="card-title text-base-content/60 text-2xl">
                    {feature.title}
                  </h3>
                  <p className="text-lg">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.4 }}
      >
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold text-base-content">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Sign Up", "Create Events", "Manage & Share"].map((step, i) => (
              <div
                key={i}
                className="card bg-base-200 shadow-md hover:scale-[1.02] transition-transform"
              >
                <div className="card-body">
                  <h4 className="card-title text-2xl text-base-content/60">
                    {step}
                  </h4>
                  <p className="text-lg text-left">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.6 }}
      >
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold text-base-content">
            What Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote: "Eventum simplified our entire workflow.",
                name: "— Alex, Organizer",
              },
              {
                quote: "Beautiful UI and seamless experience.",
                name: "— Maya, Designer",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="card bg-base-200 shadow-md hover:scale-[1.02] transition-transform"
              >
                <div className="card-body">
                  <p className="italic text-2xl text-base-content/80">
                    “{t.quote}”
                  </p>
                  <p className="text-sm text-base-content/60">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 1 }}
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-base-content">
            Ready to take control of your events?
          </h2>
          <Link href="/dashboard">
            <button className="btn btn-primary rounded-2xl text-xl hover:scale-105 transition-transform">
              Create Your First Event
            </button>
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
