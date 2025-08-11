import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-base-200 text-base-content px-6 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">Eventum</h2>
            <p className="md:text-lg text-base-content/70">
              Plan, manage, and share your events with ease. Built for clarity
              and control.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Explore</h3>
            <ul className="space-y-2 text-lg">
              <li>
                <a href="/about" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Get in Touch</h3>
            <p className="text-lg">
              Email:{" "}
              <a href="mailto:nomanahnaf@gmail.com" className="underline">
                team@eventum.app
              </a>
            </p>
            <p className="text-lg">Location: Dhaka, Bangladesh</p>
            <div className="mt-4 flex gap-3 text-lg">
              <Link
                href="https://github.com/devabdullahalnoman"
                target="_blank"
                className="btn btn-outline rounded-xl"
              >
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/dev-abdullah-al-noman/"
                target="_blank"
                className="btn btn-outline rounded-xl"
              >
                Linkedin
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-base-content/60">
          &copy; {new Date().getFullYear()} Eventum. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
