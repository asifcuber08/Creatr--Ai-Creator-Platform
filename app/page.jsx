"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  features,
  platformTabs,
  socialProofStats,
  testimonials,
} from "@/lib/data";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 animate-pulse" />

      <div
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: "all 0.3s ease-out",
        }}
        className="fixed w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none z-0"
      ></div>

      <section className="relative z-10 mt-48 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-7xl lg:text-8xl font-black leading-none tracking-tight">
                <span className="block font-black text-white">Create.</span>
                <span className="block font-light italic text-purple-300">
                  Publish.
                </span>
                <span className="block font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                  Grow.
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl md:max-w-none">
                The AI-powered that turns your ideas into
                <span className="text-purple-300 font-semibold">
                  {" "}
                  engaging content
                </span>{" "}
                and helps you build a thriving creator business.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
              <Link href="/dashboard">
                <Button
                  size="xl"
                  variant="primary"
                  className="rounded-full w-full sm:w-auto text-white"
                >
                  Start Creating for Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/feed">
                <Button
                  size="xl"
                  variant="outline"
                  className="rounded-full w-full sm:w-auto"
                >
                  Explore the feed
                </Button>
              </Link>
            </div>
          </div>

          <div className="">
            <Image
              src="/banner.png"
              alt="Platform Banner"
              width={500}
              height={700}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section
        id="features"
        className="relative mt-14 z-10 py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-r from-gray-900/50 to-purple-900/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              <span className="gradient-text-primary">Everything you need</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              From AI-powered writing assistance to advanced analytics,
              we&apos;ve built the complete toolkit for modern cretors.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group transition-all duration-300 hover:scale-105 card-glass"
              >
                <CardContent>
                  <div
                    className={`w-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl mb-3 sm:mb-4 text-white">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-400">
                    {feature.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              <span className="gradient-text-primary">How it works</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Three powerful modules working together to supercharge your
              content creation.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="space-y-4">
                {platformTabs.map((tab, index) => (
                  <Button
                    key={index}
                    variant={activeTab === index ? "outline" : "ghost"}
                    onClick={() => setActiveTab(index)}
                    className="w-full justify-start h-auto p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          activeTab === index
                            ? "bg-gradient-to-br from-purple-500 to-blue-500"
                            : "bg-muted"
                        }`}
                      >
                        <tab.icon className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-lg">{tab.title}</h3>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="lg:w-2/3">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>{platformTabs[activeTab].title}</CardTitle>
                  <CardDescription>
                    {platformTabs[activeTab].description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {platformTabs[activeTab].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-r from-gray-900/50 to-purple-900/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-12 sm:mb-16">
            <span className="gradient-text-primary">
              Loved by creators worldwide
            </span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
            {socialProofStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>

                <div className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2 gradient-text-accent">
                  {stat.metric}
                </div>
                <div className="text-gray-400 text-base sm:text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="relative z-10 py-16 sm:py-24 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
              <span className="gradient-text-primary">What creators say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:shadow-lg card-glass"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-6 leading-relaxed text-gray-300">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12">
                      <Image
                        src={`https://images.unsplash.com/photo-${testimonial.imageId}?w=100&h=100&fit=crop&crop=face`}
                        alt={testimonial.name}
                        fill
                        className="rounded-full border-2 border-gray-700 object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonial.role}
                      </div>
                      <Badge variant="secondary" className="mt-1">
                        {testimonial.company}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-r from-gray-900/50 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 sm:mb-8">
            <span className="gradient-text-primary">Ready to create?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Join thousands of creators who are already building their audiences
            and growing their businesses with our AI-powered platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/dashboard">
              <Button
                size="xl"
                variant="primary"
                className="rounded-full w-full text-white"
              >
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/feed">
              <Button
                size="xl"
                variant="outline"
                className="rounded-full w-full"
              >
                Explore the Feed
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section
      <footer className="relative z-10 bg-black/60 backdrop-blur-xl border-t border-gray-800 text-gray-400 py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              Creatr
            </h3>
            <p className="text-sm mt-1 text-gray-500">
              Built with ❤️ by{" "}
              <span className="text-purple-300 font-medium">Asif Shamim</span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm font-light">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Creatr. All rights reserved.
        </div>
      </footer> */}
    </div>
  );
}
