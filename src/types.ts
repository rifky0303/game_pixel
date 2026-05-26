/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TimeOfDay = 'fajar' | 'siang' | 'senja' | 'malam';

export interface Crop {
  id: string; // unique ID
  slotIndex: number; // 0 to 11 (grid positions)
  typeId: string; // e.g., 'tomat', 'wortel', 'semangka'
  growth: number; // 0 to 100
  stage: number; // 1: Benih (Seed), 2: Tunas (Sprout), 3: Daun (Growing), 4: Siap Panen (Mature)
  watered: boolean; // Needs daily watering
  pest: boolean; // Needs bug spraying or weeding
  plantedAtTimestamp: number;
}

export interface CropType {
  id: string;
  name: string;
  description: string;
  seedCost: number;
  sellPrice: number;
  growSpeed: number; // Increment per tick
  color: string;
  secondaryColor: string;
  isSpecial?: boolean;
}

export interface PlayerInventory {
  seeds: Record<string, number>; // typeId -> count
  harvested: Record<string, number>; // typeId -> count
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  color: string;
  avatarSvg: string;
  defaultPosition: { x: number; y: number };
  dialogs: string[];
}

export interface Decoration {
  id: string;
  typeId: string; // 'scarecrow' | 'lamp' | 'bench' | 'well'
  x: number;
  y: number;
}

export interface DecorationType {
  id: string;
  name: string;
  description: string;
  cost: number;
  color: string;
}

export interface GameState {
  coins: number;
  unlockedSeeds: string[];
  selectedTool: 'walk' | 'hoe' | 'water' | 'seed' | 'harvest' | 'pest';
  selectedSeedToPlant: string;
  crops: Record<number, Crop>; // slot index -> Crop details (12 slots)
  inventory: PlayerInventory;
  currentWeather: 'cerah' | 'hujan';
  timeProgress: number; // 0 to 2400 (corresponds to hours)
  activeNPCIndex: string | null;
  tasks: GameTask[];
  placedDecorations: Decoration[];
  harvestCountTotal: number;
  mcPosition: { x: number; y: number };
}

export interface GameTask {
  id: string;
  text: string;
  type: 'harvest' | 'water' | 'earn' | 'interact';
  progress: number;
  target: number;
  rewardCoins: number;
  completed: boolean;
}

export const CROP_TYPES: Record<string, CropType> = {
  tomat: {
    id: 'tomat',
    name: 'Tomat Merah',
    description: 'Tomat bundar yang manis dan berair kaya vitamin.',
    seedCost: 10,
    sellPrice: 25,
    growSpeed: 10,
    color: '#ef4444', // Red
    secondaryColor: '#22c55e', // Green stem
  },
  wortel: {
    id: 'wortel',
    name: 'Wortel Manis',
    description: 'Wortel berwarna oranye cerah yang renyah dan disukai kelinci.',
    seedCost: 15,
    sellPrice: 38,
    growSpeed: 7,
    color: '#f97316', // Orange
    secondaryColor: '#16a34a',
  },
  semangka: {
    id: 'semangka',
    name: 'Semangka Jumbo',
    description: 'Buah berair raksasa yang menyegarkan dahaga saat musim kemarau.',
    seedCost: 35,
    sellPrice: 95,
    growSpeed: 4,
    color: '#10b981', // Emerald green skin
    secondaryColor: '#f43f5e', // Pink red flesh
  },
  terung: {
    id: 'terung',
    name: 'Terung Ungu',
    description: 'Terung dengan warna ungu mistis mengkilap nan lezat untuk ditumis.',
    seedCost: 20,
    sellPrice: 50,
    growSpeed: 6,
    color: '#a855f7', // Purple
    secondaryColor: '#15803d',
  },
  stroberi: {
    id: 'stroberi',
    name: 'Stroberi Gunung',
    description: 'Buah storberi langka dari lereng gunung yang sangat manis alami.',
    seedCost: 45,
    sellPrice: 125,
    growSpeed: 5,
    color: '#ec4899', // Pinkish red
    secondaryColor: '#22c55e',
    isSpecial: true,
  },
};

export const DECORATION_TYPES: Record<string, DecorationType> = {
  well: {
    id: 'well',
    name: 'Sumur Kayu Kuno',
    description: 'Sumur di tengah perdesaan yang memberikan suplai air tak terbatas.',
    cost: 150,
    color: '#854d0e',
  },
  scarecrow: {
    id: 'scarecrow',
    name: 'Orang-orangan Sawah',
    description: 'Menjaga kebun dari hama dan burung gemuk nakal yang mengintai.',
    cost: 80,
    color: '#eab308',
  },
  lamp: {
    id: 'lamp',
    name: 'Lentera Taman Klasik',
    description: 'Memancarkan cahaya hangat nan meneduhkan jiwa di malam yang sunyi.',
    cost: 120,
    color: '#facc15',
  },
  bench: {
    id: 'bench',
    name: 'Kursi Taman Santai',
    description: 'Tempat duduk terbaik untuk menikmati angin sore perdesaan.',
    cost: 100,
    color: '#b45309',
  },
};
