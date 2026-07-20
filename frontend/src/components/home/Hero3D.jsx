import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Stars, Float } from "@react-three/drei";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

// AI Core 3D Model Component
function AICore() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      // Mouse Parallax effect
      meshRef.current.position.x = (state.mouse.x * 2) * 0.5;
      meshRef.current.position.y = (state.mouse.y * 2) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.8}>
        <MeshDistortMaterial
          color="#22d3ee"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
          emissive="#0891b2"
          emissiveIntensity={1}
        />
      </Sphere>
      {/* Outer Wireframe Sphere for tech look */}
      <Sphere args={[1.2, 32, 32]} scale={1.9}>
        <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.15} />
      </Sphere>
    </Float>
  );
}

// Typing Effect Component
function TypewriterText({ text }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="text-cyan-400">
      {displayedText}
      <span className="animate-pulse">_</span>
    </span>
  );
}

export default function Hero3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section 
      className="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-[#020817] flex items-center"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Glow following mouse */}
      <div 
        className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none transition-transform duration-300 ease-out z-0"
        style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
      />
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <pointLight position={[-10, -10, -5]} color="#a855f7" intensity={2} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <AICore />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-medium text-slate-300">RoboLearn AI 2.0 is Live</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Next-Gen STEM <br />
            <TypewriterText text="Education Platform." />
          </h1>
          
          <p className="mt-6 text-lg text-slate-400 max-w-lg leading-relaxed">
            Experience the future of robotics and AI in your classroom. We provide end-to-end labs, curriculum, and interactive intelligent tutoring.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contact" className="group relative inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Schedule a Demo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/playground" className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold backdrop-blur-md transition-colors">
              Try Interactive Playground
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-cyan-400" /> CBSE-Aligned
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-cyan-400" /> AI-Powered
            </div>
          </div>
        </motion.div>

        {/* Right Content - Floating Glass Cards */}
        <div className="relative hidden lg:block h-[500px]">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-10 right-10 w-64 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl"
            style={{ transform: `translate(${-mousePos.x * 12}px, ${-mousePos.y * 12}px)` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-md">Live</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-3/4 bg-white/10 rounded-full" />
              <div className="h-2 w-1/2 bg-white/10 rounded-full" />
              <div className="h-2 w-full bg-white/10 rounded-full" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-20 left-10 w-56 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl"
            style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }}
          >
             <div className="flex items-center gap-3 mb-3">
               <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
               <span className="text-sm font-semibold text-white">System Status</span>
             </div>
             <div className="text-3xl font-bold text-white mb-1">99.9%</div>
             <div className="text-xs text-slate-400">Lab Uptime Guarantee</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
