'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { motion } from 'motion/react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <main className="px-6 md:px-12 py-12 space-y-24 bg-base-100 text-base-content">
      {/* Hero */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6 }}>
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Eventum</h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-xl mx-auto">
            Plan, manage, and share your events with clarity and control.
          </p>
          <button className="btn btn-primary hover:scale-105 transition-transform">
            Get Started
          </button>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Fast Setup', desc: 'Create events in seconds with intuitive forms.' },
            { title: 'Secure Access', desc: 'Your data is protected with robust auth.' },
            { title: 'Modular Design', desc: 'Customize your dashboard with ease.' },
          ].map((feature, i) => (
            <div key={i} className="card bg-base-200 shadow-md hover:scale-[1.02] transition-transform">
              <div className="card-body">
                <h3 className="card-title text-primary">{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.4 }}>
        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-bold text-primary">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Sign Up', 'Create Events', 'Manage & Share'].map((step, i) => (
              <div key={i} className="card bg-base-200 shadow-md hover:scale-[1.02] transition-transform">
                <div className="card-body">
                  <h4 className="card-title">{step}</h4>
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.6 }}>
        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-bold text-primary">What Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { quote: 'Eventum simplified our entire workflow.', name: '— Alex, Organizer' },
              { quote: 'Beautiful UI and seamless experience.', name: '— Maya, Designer' },
            ].map((t, i) => (
              <div key={i} className="card bg-base-200 shadow-md hover:scale-[1.02] transition-transform">
                <div className="card-body">
                  <p className="italic">“{t.quote}”</p>
                  <p className="text-sm text-base-content/70">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.8 }}>
        <div className="space-y-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-primary text-center">FAQs</h2>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">Is Eventum free to use?</div>
            <div className="collapse-content">Yes, core features are free with optional upgrades.</div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">Do I need technical skills?</div>
            <div className="collapse-content">Not at all. Eventum is built for simplicity.</div>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 1 }}>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary">Ready to take control of your events?</h2>
          <button className="btn btn-secondary hover:scale-105 transition-transform">
            Create Your First Event
          </button>
        </div>
      </motion.section>
    </main>
  );
}
