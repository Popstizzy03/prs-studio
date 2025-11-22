import { writable } from 'svelte/store';

export interface Track {
  src: string;
  title: string;
  cover?: string;
}

export const currentTrack = writable<Track | null>(null);
export const isPlaying = writable(false);
export const isMuted = writable(false);
export const currentTime = writable(0);
export const duration = writable(0);
export const showMiniPlayer = writable(false);