"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="lg:order-0 grid-col-span-12 lg:grid-col-span-8 lg:grid-col-start-3 order-1 text-center w-full">
      {/* Heading */}
      <div className="flex items-center justify-center gap-4">
        <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">
          The most realistic voice AI platform
        </h1>
      </div>

      {/* Paragraph */}
      <div className="flex justify-center">
        <p className="mt-6 text-lg text-gray-900 leading-relaxed whitespace-pre-wrap max-w-4xl text-center">
          AI voice models and products powering millions of developers,
          creators, and enterprises. From low-latency conversational agents to
          the leading AI voice generator for voiceovers and audiobooks.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-16 flex flex-wrap justify-center gap-x-3 gap-y-3 lg:flex-row lg:items-center">
        {/* Sign Up Button */}
        <div
          className="anim-fade-translate-y-in"
          style={
            {
              animationDelay: "200ms",
              "--translate-y-from": "4px",
            } as React.CSSProperties
          }
        >
          <a
            href=""
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-black text-white font-medium px-6 py-2 text-base transition-colors duration-200 hover:bg-black/50"
          >
            Sign up
          </a>
        </div>

        {/* Contact Sales Button */}
        <div
          className="anim-fade-translate-y-in"
          style={
            {
              animationDelay: "500ms",
              "--translate-y-from": "4px",
            } as React.CSSProperties
          }
        >
          <a
            href=""
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#F2F2F2] text-black font-medium px-6 py-2 text-base hover:bg-gray-200 transition-colors duration-200"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
}
