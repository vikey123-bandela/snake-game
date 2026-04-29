/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Github, Twitter, Layers } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a000a] text-[#ff00ff] flex flex-col font-sans selection:bg-[#00ffff]/30 selection:text-[#00ffff]">
      <div className="scanline" />
      <div className="noise" />

      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00ffff]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#ff00ff]/5 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 px-8 py-6 flex justify-between items-center border-b border-[#ff00ff]/20 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00ffff] to-[#ff00ff] rounded-none flex items-center justify-center rotate-3 shadow-[0_0_15px_rgba(255,0,255,0.4)]">
            <Layers className="text-black w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tighter uppercase leading-none glitch">
              <span>UNIFIED_ARCADE</span>
              UNIFIED_ARCADE
              <span>UNIFIED_ARCADE</span>
            </h1>
            <span className="text-[10px] text-[#00ffff] font-mono tracking-widest uppercase opacity-70">CORE_LINK // v4.0.glitch</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
          <a href="#" className="text-[#00ffff] hover:text-white transition-all hover:skew-x-12">SYSTEM_01</a>
          <a href="#" className="text-[#ff00ff]/60 hover:text-white transition-all hover:-skew-x-12">AUDIO_02</a>
          <a href="#" className="text-[#ff00ff]/60 hover:text-white transition-all hover:line-through">NETWORK_03</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-[#ff00ff]/60 hover:text-[#00ffff] transition-colors">
            <Twitter className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#ff00ff]/60 hover:text-[#00ffff] transition-colors">
            <Github className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 md:p-12 gap-12 max-w-7xl mx-auto w-full">
        
        {/* Intro Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 max-w-2xl"
        >
          <div className="inline-block px-3 py-1 rounded-none border border-[#00ffff]/30 bg-[#00ffff]/10 text-[#00ffff] text-[10px] font-mono tracking-[0.3em] uppercase mb-4 animate-pulse">
            MALFUNCTION_DETECTED // AUTO_SYNC_INITIALIZED
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic glitch">
            <span>CONSUME_DAT_STREAM</span>
            CONSUME_DAT_STREAM
            <span>CONSUME_DAT_STREAM</span>
          </h2>
          <p className="text-[#ff00ff]/60 font-mono text-sm uppercase tracking-tight">
             INITIATING_NEURAL_SNAKE_PROTOCOL. EXECUTE_COMMAND_BEATS.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar - Player Stats / Info */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
            <div className="p-6 bg-black/40 rounded-none border border-[#ff00ff]/20 space-y-4">
                <h4 className="text-[#00ffff] text-[10px] font-mono uppercase tracking-[0.2em]">ENTITY_ID</h4>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#00ffff]/10 rounded-none border border-[#00ffff]/20 flex items-center justify-center font-mono text-xs overflow-hidden">
                        ERR_404
                    </div>
                    <div>
                        <p className="font-bold text-sm tracking-widest uppercase">NODE_GUEST</p>
                        <p className="text-[10px] text-[#00ffff] font-mono">STATUS: UNRATED</p>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-black/40 rounded-none border border-[#ff00ff]/20 space-y-4">
                <h4 className="text-[#00ffff] text-[10px] font-mono uppercase tracking-[0.2em]">SIGNAL_LOGS</h4>
                <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-[#ff00ff]/10 last:border-0">
                            <span className="text-[10px] text-[#ff00ff]/40 font-mono">PKT_0x{i}F9</span>
                            <span className="text-[10px] text-[#00ffff] animate-pulse">RECV_OK</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Center - Snake Game */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <SnakeGame />
            </motion.div>
          </div>

          {/* Right Sidebar - Music Player */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start gap-8">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full"
            >
              <h4 className="text-[#00ffff] text-[10px] font-mono uppercase tracking-[0.2em] mb-4 text-center lg:text-left">AUDIO_BUFFER</h4>
              <MusicPlayer />
            </motion.div>

            <div className="w-full p-6 bg-[#00ffff]/5 rounded-none border border-[#00ffff]/20 backdrop-blur-sm shadow-[inset_0_0_10px_rgba(0,255,255,0.1)]">
                <p className="text-[10px] text-[#00ffff]/70 font-mono leading-relaxed">
                    [SYSTEM_NOTICE]: AUDIO_VISUAL_SYNC_ESTABLISHED. 
                    NEURAL_PATH_OPEN. 
                    IGNORE_THE_VOICES.
                </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 p-8 border-t border-[#ff00ff]/10 bg-black/60 text-center">
        <p className="text-[10px] text-[#ff00ff]/30 font-mono uppercase tracking-[0.4em]">
          EXECUTION_HOST: [AI_STUDIO_NODE_372] // (C) 2026 // END_OF_LINE.
        </p>
      </footer>
    </div>
  );
}

