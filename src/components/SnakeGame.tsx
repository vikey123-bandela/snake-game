import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Point, Direction } from '../types';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, GAME_SPEED } from '../constants';
import { motion } from 'motion/react';
import { Trophy, RefreshCw } from 'lucide-react';

export const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = currentSnake.some(
        (segment) => segment.x === newFood?.x && segment.y === newFood?.y
      );
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { ...head };

        switch (direction) {
          case 'UP': newHead.y -= 1; break;
          case 'DOWN': newHead.y += 1; break;
          case 'LEFT': newHead.x -= 1; break;
          case 'RIGHT': newHead.x += 1; break;
        }

        // Check Wall Collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check Self Collision
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check Food Collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) setHighScore(nextScore);
            return nextScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameLoop = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameLoop);
  }, [direction, food, gameOver, isPaused, highScore, generateFood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;

    // Clear Canvas
    ctx.fillStyle = '#050005';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid (Subtle glitchy grid)
    ctx.strokeStyle = '#220022';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
        if (Math.random() > 0.99) ctx.strokeStyle = '#ff00ff22';
        else ctx.strokeStyle = '#220022';
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw Food
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ff3c3c';
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(
        food.x * cellSize + 2,
        food.y * cellSize + 2,
        cellSize - 4,
        cellSize - 4
    );

    // Draw Snake
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      if (isHead) {
         ctx.fillStyle = '#ffffff';
         ctx.shadowBlur = 25;
         ctx.shadowColor = '#00ffff';
      } else {
         ctx.fillStyle = '#00ffff';
         ctx.shadowBlur = 10;
         ctx.shadowColor = '#00ffff';
      }
      
      ctx.fillRect(
        segment.x * cellSize + 1,
        segment.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2
      );
    });

  }, [snake, food]);

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-black/60 rounded-none border-2 border-[#ff00ff]/20 shadow-[0_0_30px_rgba(255,0,255,0.1)] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#00ffff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#ff00ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex justify-between w-full items-center mb-2">
        <div className="flex flex-col">
          <span className="text-[#ff00ff]/40 text-[10px] uppercase tracking-[0.2em] font-mono">DTA_SCOR</span>
          <span id="score-counter" className="text-3xl font-black font-mono text-[#00ffff] drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] italic">
            {score.toString().padStart(4, '0')}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[#ff00ff]/40 text-[10px] uppercase tracking-[0.2em] font-mono">HI_VAL_REC</span>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#ff00ff]" />
            <span className="text-xl font-black font-mono text-[#ff00ff] italic">
              {highScore.toString().padStart(4, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className="relative group p-1 bg-gradient-to-br from-[#ff00ff]/20 to-[#00ffff]/20">
        <canvas
          id="snake-canvas"
          ref={canvasRef}
          width={400}
          height={400}
          className="rounded-none border border-[#ff00ff]/30 bg-[#050005] shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300 max-w-full"
        />

        {gameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-10"
          >
            <h2 className="text-4xl font-black text-[#ff00ff] mb-2 uppercase tracking-tighter italic glitch">
                <span>SYS_FAILURE</span>
                SYS_FAILURE
                <span>SYS_FAILURE</span>
            </h2>
            <p className="text-[#00ffff] mb-6 font-mono text-xs mt-2">[DATA_CORRUPTION_DETECTED]</p>
            <button
              id="restart-button"
              onClick={resetGame}
              className="group relative flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-[#ff00ff] blur-md opacity-20 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-2 bg-[#ff00ff] text-black px-8 py-3 rounded-none font-black text-sm hover:scale-105 transition-all">
                <RefreshCw className="w-4 h-4" />
                RE_BOOT_SEQUENCE
              </div>
            </button>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="p-4 bg-black/40 rounded-none border border-[#ff00ff]/10">
            <span className="text-[10px] text-[#ff00ff]/40 uppercase tracking-widest block mb-1">KERN_STAT</span>
            <span className="text-xs text-[#00ffff] font-mono flex items-center gap-2 italic">
                <span className={`w-2 h-2 rounded-none ${gameOver ? 'bg-[#ff00ff] shadow-[0_0_10px_#ff00ff]' : 'bg-[#00ffff] animate-pulse shadow-[0_0_10px_#00ffff]'}`} />
                {gameOver ? 'MALFUNCTION' : 'STREAM_ACTIVE'}
            </span>
        </div>
        <div className="p-4 bg-black/40 rounded-none border border-[#ff00ff]/10">
            <span className="text-[10px] text-[#ff00ff]/40 uppercase tracking-widest block mb-1">MAN_IFACE</span>
            <div className="grid grid-cols-3 gap-1 w-24">
                <div />
                <button onClick={() => direction !== 'DOWN' && setDirection('UP')} className="p-1 bg-[#ff00ff]/20 text-[#ff00ff] border border-[#ff00ff]/30 hover:bg-[#ff00ff]/40 active:bg-[#00ffff] transition-all flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-[#00ffff]" />
                </button>
                <div />
                <button onClick={() => direction !== 'RIGHT' && setDirection('LEFT')} className="p-1 bg-[#ff00ff]/20 text-[#ff00ff] border border-[#ff00ff]/30 hover:bg-[#ff00ff]/40 active:bg-[#00ffff] flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-[#00ffff]" />
                </button>
                <button onClick={() => direction !== 'UP' && setDirection('DOWN')} className="p-1 bg-[#ff00ff]/20 text-[#ff00ff] border border-[#ff00ff]/30 hover:bg-[#ff00ff]/40 active:bg-[#00ffff] flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[#00ffff]" />
                </button>
                <button onClick={() => direction !== 'LEFT' && setDirection('RIGHT')} className="p-1 bg-[#ff00ff]/20 text-[#ff00ff] border border-[#ff00ff]/30 hover:bg-[#ff00ff]/40 active:bg-[#00ffff] flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#00ffff]" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
