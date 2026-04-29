import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';
import { DUMMY_TRACKS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  return (
    <div className="w-full max-w-md bg-black/60 rounded-none border-2 border-[#00ffff]/20 p-6 flex flex-col gap-6 shadow-[0_0_40px_rgba(0,255,255,0.05)] relative overflow-hidden group">
      {/* Visualizer Effect Background */}
      <div className="absolute inset-x-0 bottom-0 h-32 flex items-end justify-around gap-1 px-4 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: isPlaying ? [5, 60, 10, 80, 5] : 2 }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.03 }}
            className="w-1 bg-[#ff00ff]"
          />
        ))}
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="flex gap-4 items-center relative z-10">
        <div className="relative">
            <motion.div
              key={currentTrack.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-20 h-20 rounded-none overflow-hidden border border-[#ff00ff]/40 shadow-[0_0_15px_rgba(255,0,255,0.3)] flex-shrink-0 grayscale contrast-150"
            >
              {currentTrack.albumArt ? (
                <img src={currentTrack.albumArt} alt={currentTrack.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full bg-[#0a000a] flex items-center justify-center">
                  <Music className="w-8 h-8 text-[#ff00ff]" />
                </div>
              )}
            </motion.div>
            <div className="absolute inset-0 bg-[#00ffff]/20 mix-blend-overlay animate-pulse pointer-events-none" />
        </div>

        <div className="flex flex-col overflow-hidden">
          <h3 className="text-[#00ffff] font-black text-lg truncate glitch tracking-tighter uppercase italic">
            <span>{currentTrack.title}</span>
            {currentTrack.title}
            <span>{currentTrack.title}</span>
          </h3>
          <p className="text-[#ff00ff] text-[10px] font-mono tracking-widest uppercase truncate">[SRC: {currentTrack.artist}]</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-1">
                <span className="w-1 h-3 bg-[#00ffff] animate-bounce" />
                <span className="w-1 h-5 bg-[#ff00ff] animate-bounce delay-75" />
                <span className="w-1 h-2 bg-[#00ffff] animate-bounce delay-150" />
            </div>
            <span className="text-[9px] text-[#ff00ff]/40 font-mono italic">BIT_RATE_LOCKED_256</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-[#ff00ff]/10 rounded-none overflow-hidden w-full z-10 border border-[#ff00ff]/20">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#00ffff] shadow-[0_0_10px_#00ffff]"
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button
            id="prev-track"
            onClick={prevTrack}
            className="p-2 text-[#ff00ff]/60 hover:text-[#00ffff] hover:scale-110 transition-all rounded-none hover:bg-[#00ffff]/10"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          <button
            id="play-pause"
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center bg-[#00ffff] text-black rounded-none hover:bg-white hover:scale-110 active:scale-95 transition-all shadow-lg shadow-[#00ffff]/40"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
          <button
            id="next-track"
            onClick={nextTrack}
            className="p-2 text-[#ff00ff]/60 hover:text-[#00ffff] hover:scale-110 transition-all rounded-none hover:bg-[#00ffff]/10"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-[#ff00ff]/40 hover:text-[#00ffff] transition-colors cursor-pointer group/vol">
          <Volume2 className="w-4 h-4" />
          <div className="w-12 h-1 bg-[#ff00ff]/20 rounded-none relative">
            <div className="w-3/4 h-full bg-[#ff00ff] rounded-none group-hover/vol:bg-[#00ffff]" />
          </div>
        </div>
      </div>

      {/* Track List Hint */}
      <div className="mt-4 pt-4 border-t border-[#ff00ff]/10">
        <div className="flex justify-between items-center text-[10px] font-mono text-[#ff00ff]/30 uppercase tracking-widest">
            <span>INDEX_PTR</span>
            <span>0x{currentTrackIndex.toString(16).toUpperCase()} / 0x{DUMMY_TRACKS.length.toString(16).toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
