import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Truck, ShieldCheck, Star } from "lucide-react";

export default function LandingPage() {
  // ✅ REAL JEWELRY IMAGES (NO SNEAKERS, NO DUPLICATES)
  const images = [
    // Gold Ring
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmluZ3xlbnwwfHwwfHx8MA%3D%3D",
    // Luxury Necklace
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",

    // Diamond Bracelet
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJhY2VsZXR8ZW58MHx8MHx8fDA%3D",

    // Elegant Wristwatch
    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80",

    // Earrings
    "https://plus.unsplash.com/premium_photo-1681276169450-4504a2442173?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWFycmluZ3N8ZW58MHx8MHx8fDA%3D",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-slate-950 text-slate-100 overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-14 items-center">
          {/* ---------- TEXT ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Where <span className="text-indigo-400">Moments</span>
              <br />
              Become Timeless Stories
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-xl">
              Timestory is a modern lifestyle and jewelry experience where
              elegance meets meaning. Discover pieces crafted to last forever.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold hover:bg-indigo-700 transition">
                Start Shopping
              </button>

              <button className="rounded-xl border border-slate-600 px-7 py-3 hover:bg-slate-800 transition">
                Explore Collections
              </button>
            </div>
          </motion.div>

          {/* ---------- SLIDESHOW ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-2xl">
              <div className="rounded-3xl bg-slate-900 p-6 overflow-hidden">
                <div className="relative h-80 md:h-96 w-full">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={index}
                      src={images[index]}
                      alt="Luxury jewelry showcase"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 1 }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">Why Choose Timestory?</h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Designed for confidence, luxury, and peace of mind — every step of
            the way.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: ShoppingBag,
              title: "Premium Jewelry",
              desc: "Carefully curated pieces crafted with excellence.",
            },
            {
              icon: Truck,
              title: "Fast Delivery",
              desc: "Reliable and timely delivery nationwide.",
            },
            {
              icon: ShieldCheck,
              title: "Secure Payments",
              desc: "Paystack-powered checkout with full protection.",
            },
            {
              icon: Star,
              title: "Trusted Reviews",
              desc: "Loved and trusted by happy customers.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-slate-900 p-6 border border-slate-800 hover:border-indigo-500 transition"
            >
              <f.icon className="h-10 w-10 text-indigo-400" />
              <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-slate-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-30" />
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Ready to Create Your Story?
          </h2>
          <p className="mt-6 text-lg text-slate-200">
            Join thousands of customers shopping confidently on Timestory.
          </p>
          <button className="mt-10 rounded-2xl bg-white text-slate-900 px-8 py-4 font-bold hover:bg-slate-200 transition">
            Get Started Now
          </button>
        </div>
      </section>

    </div>
  );
}
