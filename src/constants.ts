import { Track } from './types';

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
export const INITIAL_DIRECTION = 'UP';
export const GAME_SPEED = 150;

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Drift',
    artist: 'CyberSynth AI',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Using standard public mp3s for demo
    albumArt: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'Digital Horizon',
    artist: 'Neural Beats',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    albumArt: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'Midnight Grid',
    artist: 'DataStream',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    albumArt: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop',
  },
];
