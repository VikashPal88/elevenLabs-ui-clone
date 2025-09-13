"use client";

import Editor from "@/components/Editor";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import React, { useState } from "react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Navbar />

      {/* Content */}
      <div className="mt-24">
        <HeroSection />
      </div>

      {/* Tab Content */}
      <Tabs />
      <Editor />
    </div>
  );
}
