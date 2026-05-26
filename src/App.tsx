/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sprout, 
  Droplet, 
  Sparkles, 
  Trash2, 
  Coins, 
  Sun, 
  Moon, 
  CloudRain, 
  Compass, 
  Volume2, 
  VolumeX, 
  HelpCircle,
  ShoppingBag,
  ListTodo,
  Smile,
  CheckCircle,
  Footprints,
  Play,
  Hammer
} from 'lucide-react';
import { sound } from './SoundSynth';
import { 
  CROP_TYPES, 
  DECORATION_TYPES, 
  Crop, 
  CropType, 
  PlayerInventory, 
  NPC, 
  Decoration, 
  GameTask, 
  GameState 
} from './types';

// SVGs and sprites for pixel-art assets
// Designed in scalable crisp pixel layouts
const SVG_SPRITES = {
  // MC Facing states
  player: {
    down: (isWalking: boolean) => (
      <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
        {/* Straw farmer hat */}
        <rect x="6" y="2" width="20" height="3" fill="#d97706" />
        <rect x="4" y="5" width="24" height="2" fill="#f59e0b" />
        {/* Hair */}
        <rect x="8" y="7" width="16" height="4" fill="#78350f" />
        {/* Skin face */}
        <rect x="8" y="9" width="16" height="7" fill="#fbcfe8" />
        {/* Eyes */}
        <rect x="10" y="11" width="2" height="2" fill="#1e293b" />
        <rect x="20" y="11" width="2" height="2" fill="#1e293b" />
        {/* Red cheeks */}
        <rect x="8" y="13" width="2" height="1" fill="#f43f5e" />
        <rect x="22" y="13" width="2" height="1" fill="#f43f5e" />
        {/* Red bandana */}
        <rect x="8" y="16" width="16" height="2" fill="#ef4444" />
        {/* Blue overalls */}
        <rect x="8" y="18" width="16" height="8" fill="#2563eb" />
        {/* T-shirt sleeves */}
        <rect x="6" y="18" width="2" height="4" fill="#ffffff" />
        <rect x="24" y="18" width="2" height="4" fill="#ffffff" />
        {/* Hands */}
        <rect x="6" y="22" width="2" height="2" fill="#fbcfe8" />
        <rect x="24" y="22" width="2" height="2" fill="#fbcfe8" />
        {/* Dynamic boots/legs */}
        <rect x="9" y="26" width="5" height="4" fill={isWalking ? "#1e293b" : "#475569"} style={{ transform: isWalking ? 'translateY(-1px)' : 'none' }} />
        <rect x="18" y="26" width="5" height="4" fill={isWalking ? "#475569" : "#1e293b"} style={{ transform: isWalking ? 'translateY(1px)' : 'none' }} />
      </svg>
    ),
    up: (isWalking: boolean) => (
      <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
        {/* Straw farmer hat */}
        <rect x="6" y="2" width="20" height="3" fill="#d97706" />
        <rect x="4" y="5" width="24" height="2" fill="#f59e0b" />
        {/* Hair */}
        <rect x="6" y="7" width="20" height="9" fill="#78350f" />
        {/* Red bandana back */}
        <rect x="8" y="16" width="16" height="2" fill="#ef4444" />
        {/* Blue overalls */}
        <rect x="8" y="18" width="16" height="8" fill="#2563eb" />
        <rect x="6" y="18" width="2" height="4" fill="#ffffff" />
        <rect x="24" y="18" width="2" height="4" fill="#ffffff" />
        {/* Dynamic boots */}
        <rect x="9" y="26" width="5" height="4" fill={isWalking ? "#1e293b" : "#475569"} />
        <rect x="18" y="26" width="5" height="4" fill={isWalking ? "#475569" : "#1e293b"} />
      </svg>
    ),
    left: (isWalking: boolean) => (
      <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
        {/* Straw farmer hat */}
        <rect x="8" y="2" width="16" height="3" fill="#d97706" />
        <rect x="6" y="5" width="20" height="2" fill="#f59e0b" />
        {/* Hair & Face */}
        <rect x="10" y="7" width="12" height="4" fill="#78350f" />
        <rect x="8" y="9" width="13" height="7" fill="#fbcfe8" />
        <rect x="8" y="7" width="2" height="4" fill="#78350f" />
        {/* One eye looking left */}
        <rect x="10" y="11" width="2" height="2" fill="#1e293b" />
        <rect x="8" y="13" width="1" height="1" fill="#f43f5e" />
        {/* Red bandana */}
        <rect x="9" y="16" width="14" height="2" fill="#ef4444" />
        {/* Blue overalls */}
        <rect x="10" y="18" width="12" height="8" fill="#2563eb" />
        {/* Sleeve & hand */}
        <rect x="14" y="18" width="4" height="5" fill="#ffffff" />
        <rect x="14" y="23" width="3" height="2" fill="#fbcfe8" />
        {/* Boots */}
        <rect x="10" y="26" width="5" height="4" fill={isWalking ? "#1e293b" : "#475569"} />
        <rect x="16" y="26" width="5" height="4" fill={isWalking ? "#475569" : "#1e293b"} />
      </svg>
    ),
    right: (isWalking: boolean) => (
      <svg viewBox="0 0 32 32" className="w-full h-full animate-pulse-subtle" style={{ imageRendering: 'pixelated' }}>
        {/* Straw farmer hat */}
        <rect x="8" y="2" width="16" height="3" fill="#d97706" />
        <rect x="6" y="5" width="20" height="2" fill="#f59e0b" />
        {/* Hair & Face */}
        <rect x="10" y="7" width="12" height="4" fill="#78350f" />
        <rect x="11" y="9" width="13" height="7" fill="#fbcfe8" />
        <rect x="22" y="7" width="2" height="4" fill="#78350f" />
        {/* One eye looking right */}
        <rect x="20" y="11" width="2" height="2" fill="#1e293b" />
        <rect x="23" y="13" width="1" height="1" fill="#f43f5e" />
        {/* Red bandana */}
        <rect x="9" y="16" width="14" height="2" fill="#ef4444" />
        {/* Blue overalls */}
        <rect x="10" y="18" width="12" height="8" fill="#2563eb" />
        {/* Sleeve & hand */}
        <rect x="14" y="18" width="4" height="5" fill="#ffffff" />
        <rect x="15" y="23" width="3" height="2" fill="#fbcfe8" />
        {/* Boots */}
        <rect x="11" y="26" width="5" height="4" fill={isWalking ? "#1e293b" : "#475569"} />
        <rect x="17" y="26" width="5" height="4" fill={isWalking ? "#475569" : "#1e293b"} />
      </svg>
    ),
  },

  // Pak Budi (Old Farmer NPC)
  budi: (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Old straw hat */}
      <rect x="6" y="1" width="20" height="3" fill="#b45309" />
      <rect x="3" y="4" width="26" height="2" fill="#d97706" />
      {/* Straw string */}
      <line x1="16" y1="6" x2="16" y2="9" stroke="#78350f" strokeWidth="1" />
      {/* White beard and face */}
      <rect x="8" y="8" width="16" height="4" fill="#fbcfe8" />
      <rect x="8" y="12" width="16" height="7" fill="#f1f5f9" /> {/* Thick beard */}
      <rect x="12" y="10" width="8" height="3" fill="#fbcfe8" /> {/* nose area */}
      <rect x="10" y="10" width="2" height="2" fill="#1e293b" />
      <rect x="20" y="10" width="2" height="2" fill="#1e293b" />
      {/* Green overalls */}
      <rect x="8" y="19" width="16" height="8" fill="#15803d" />
      <rect x="6" y="19" width="2" height="3" fill="#ca8a04" /> {/* yellow shirt under */}
      <rect x="24" y="19" width="2" height="3" fill="#ca8a04" />
      {/* Boots */}
      <rect x="9" y="27" width="5" height="3" fill="#451a03" />
      <rect x="18" y="27" width="5" height="3" fill="#451a03" />
    </svg>
  ),

  // Siti (Flower florist / local girl NPC)
  siti: (
    <svg viewBox="0 0 32 32" className="w-full h-full animate-bounce-slow" style={{ imageRendering: 'pixelated' }}>
      {/* Beautiful hair with hair buns */}
      <rect x="5" y="3" width="5" height="5" fill="#111827" rx="2" />
      <rect x="22" y="3" width="5" height="5" fill="#111827" rx="2" />
      {/* Hair ties */}
      <rect x="7" y="6" width="2" height="2" fill="#f59e0b" />
      <rect x="23" y="6" width="2" height="2" fill="#f59e0b" />
      {/* Head Hair */}
      <rect x="8" y="5" width="16" height="6" fill="#1e293b" />
      {/* Face */}
      <rect x="9" y="9" width="14" height="7" fill="#fed7aa" />
      <rect x="11" y="11" width="2" height="2" fill="#4f46e5" /> {/* Purple eyes */}
      <rect x="19" y="11" width="2" height="2" fill="#4f46e5" />
      <rect x="9" y="13" width="2" height="1" fill="#fda4af" /> {/* Blush */}
      <rect x="21" y="13" width="2" height="1" fill="#fda4af" />
      {/* Peach dress */}
      <rect x="8" y="16" width="16" height="11" fill="#ec4899" />
      <rect x="11" y="20" width="10" height="7" fill="#f472b6" /> {/* apron */}
      {/* Tiny hands carrying flowers */}
      <rect x="6" y="18" width="2" height="3" fill="#fed7aa" />
      <rect x="24" y="18" width="2" height="3" fill="#fed7aa" />
      {/* Flowers in hand */}
      <rect x="23" y="16" width="3" height="3" fill="#eab308" />
      <rect x="25" y="15" width="3" height="3" fill="#ef4444" />
      {/* Shoes */}
      <rect x="10" y="27" width="4" height="2" fill="#e2e8f0" />
      <rect x="18" y="27" width="4" height="2" fill="#e2e8f0" />
    </svg>
  ),

  // Cat Miko (Cute sleeping cat NPC)
  miko: (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Tail curled */}
      <rect x="24" y="19" width="3" height="7" fill="#ea580c" rx="1" />
      {/* Main sleeping body blob */}
      <rect x="8" y="18" width="17" height="9" fill="#f97316" rx="4" />
      {/* Cream belly details */}
      <rect x="10" y="22" width="13" height="4" fill="#ffedd5" rx="1" />
      {/* Cat head curled up */}
      <rect x="6" y="14" width="8" height="8" fill="#f97316" rx="2" />
      {/* Cat ears */}
      <polygon points="6,14 6,10 9,14" fill="#ea580c" />
      <polygon points="12,14 14,10 14,14" fill="#ea580c" />
      {/* Closed happy eyes (sleeping) */}
      <line x1="8" y1="17" x2="9" y2="18" stroke="#7c2d12" strokeWidth="1" />
      <line x1="11" y1="17" x2="12" y2="18" stroke="#7c2d12" strokeWidth="1" />
      {/* Pink nose */}
      <rect x="10" y="18" width="1" height="1" fill="#fda4af" />
    </svg>
  ),

  // Countryside farm cottage
  cottage: (
    <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-lg" style={{ imageRendering: 'pixelated' }}>
      {/* Ground shadows */}
      <ellipse cx="32" cy="54" rx="28" ry="6" fill="#14532d" opacity="0.3" />
      {/* Stone Chimney */}
      <rect x="46" y="8" width="8" height="20" fill="#64748b" />
      <rect x="44" y="6" width="12" height="4" fill="#475569" />
      {/* Smoke particles */}
      <circle cx="50" cy="2" r="2.5" fill="#e2e8f0" className="animate-pulse" opacity="0.5" />
      {/* Roof */}
      <polygon points="32,10 2,30 62,30" fill="#b91c1c" />
      <polygon points="32,12 5,30 59,30" fill="#dc2626" />
      {/* Roof tile lines patterns */}
      <line x1="16" y1="21" x2="16" y2="30" stroke="#7f1d1d" strokeWidth="2" opacity="0.5" />
      <line x1="32" y1="12" x2="32" y2="30" stroke="#7f1d1d" strokeWidth="2" opacity="0.5" />
      <line x1="48" y1="21" x2="48" y2="30" stroke="#7f1d1d" strokeWidth="2" opacity="0.5" />
      {/* Wood log walls */}
      <rect x="8" y="30" width="48" height="24" fill="#b45309" />
      {/* Wall horizontal plank stripes */}
      <rect x="8" y="34" width="48" height="2" fill="#78350f" />
      <rect x="8" y="39" width="48" height="2" fill="#78350f" />
      <rect x="8" y="44" width="48" height="2" fill="#78350f" />
      <rect x="8" y="49" width="48" height="2" fill="#78350f" />
      {/* Cozy glowing window */}
      <rect x="14" y="34" width="10" height="10" fill="#ca8a04" stroke="#78350f" strokeWidth="2" />
      <rect x="15" y="35" width="8" height="8" fill="#facc15" />
      {/* Window panes */}
      <line x1="19" y1="35" x2="19" y2="43" stroke="#78350f" />
      <line x1="15" y1="39" x2="23" y2="39" stroke="#78350f" />
      {/* Rustic door */}
      <rect x="34" y="36" width="12" height="18" fill="#78350f" stroke="#451a03" strokeWidth="2" />
      <circle cx="43" cy="45" r="1" fill="#facc15" /> {/* gold handle */}
      {/* Cozy little plants framing the door */}
      <rect x="6" y="49" width="4" height="5" fill="#065f46" />
      <rect x="54" y="49" width="4" height="5" fill="#065f46" />
    </svg>
  ),

  // Windmill
  windmill: (rotation: number) => (
    <svg viewBox="0 0 64 64" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Tower body */}
      <polygon points="24,54 28,15 36,15 40,54" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
      <polygon points="26,52 29,17 35,17 38,52" fill="#f1f5f9" />
      {/* Little roof cone */}
      <polygon points="26,16 32,8 38,16" fill="#1e3a8a" />
      {/* Window */}
      <rect x="30" y="24" width="4" height="6" fill="#475569" />
      {/* Spinning Blades */}
      <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '32px 15px', transition: 'transform 0.1s linear' }}>
        {/* Hub */}
        <circle cx="32" cy="15" r="3" fill="#1e293b" />
        {/* 4 large pixel blades */}
        {/* Top */}
        <rect x="31" y="-5" width="2" height="20" fill="#78350f" />
        <polygon points="32,-5 26,-2 32,13" fill="#ffffff" stroke="#94a3b8" />
        {/* Right */}
        <rect x="32" y="14" width="20" height="2" fill="#78350f" />
        <polygon points="52,15 49,9 34,15" fill="#ffffff" stroke="#94a3b8" />
        {/* Bottom */}
        <rect x="31" y="15" width="2" height="20" fill="#78350f" />
        <polygon points="32,35 38,32 32,17" fill="#ffffff" stroke="#94a3b8" />
        {/* Left */}
        <rect x="12" y="14" width="20" height="2" fill="#78350f" />
        <polygon points="12,15 15,21 30,15" fill="#ffffff" stroke="#94a3b8" />
      </g>
    </svg>
  ),

  // Crop illustration templates (stages 1 to 4)
  cropIcon: (typeId: string, stage: number) => {
    const crop = CROP_TYPES[typeId] || CROP_TYPES['tomat'];
    const pColor = crop.color;
    const sColor = crop.secondaryColor;

    return (
      <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
        {stage === 1 && (
          // Tiny Seed
          <g>
            <rect x="7" y="11" width="2" height="2" fill="#78350f" />
            <rect x="8" y="10" width="1" height="1" fill="#ca8a04" />
          </g>
        )}
        {stage === 2 && (
          // Small Sprout
          <g>
            <rect x="7" y="10" width="2" height="4" fill="#a16207" /> {/* Dirt base */}
            <rect x="8" y="8" width="1" height="3" fill={sColor} />
            <rect x="6" y="7" width="2" height="1" fill={sColor} />
            <rect x="9" y="8" width="2" height="1" fill={sColor} />
          </g>
        )}
        {stage === 3 && (
          // Medium Growing Plant
          <g>
            {/* Stem */}
            <rect x="7" y="6" width="2" height="8" fill={sColor} />
            {/* Leaves */}
            <rect x="5" y="8" width="2" height="2" fill={sColor} />
            <rect x="9" y="7" width="2" height="2" fill={sColor} />
            <rect x="4" y="5" width="2" height="2" fill="#15803d" />
            {/* Small immature buds */}
            <rect x="10" y="6" width="2" height="2" fill="#ca8a04" />
          </g>
        )}
        {stage === 4 && (
          // Fully Ripe Harvest Stage
          <g>
            {/* Leaves and branch structure */}
            <rect x="7" y="2" width="2" height="12" fill={sColor} />
            <rect x="4" y="6" width="8" height="2" fill={sColor} />
            <rect x="3" y="4" width="4" height="2" fill="#16a34a" />
            <rect x="9" y="4" width="4" height="2" fill="#16a34a" />

            {/* Fruits hanging based on type */}
            {typeId === 'tomat' && (
              <g>
                <circle cx="5" cy="9" r="3.5" fill={pColor} />
                <rect x="4" y="5" width="2" height="1" fill="#16a34a" />
                <circle cx="11" cy="11" r="3.5" fill={pColor} />
                <rect x="10" y="7" width="2" height="1" fill="#16a34a" />
              </g>
            )}
            {typeId === 'wortel' && (
              <g>
                {/* Carrot root sticking out of ground */}
                <polygon points="6,6 10,6 8,15" fill={pColor} />
                <rect x="7" y="3" width="2" height="3" fill={sColor} />
              </g>
            )}
            {typeId === 'semangka' && (
              <g>
                <ellipse cx="8" cy="10" rx="5" ry="4" fill="#047857" />
                {/* Stripes */}
                <rect x="5" y="7" width="1" height="6" fill="#064e3b" />
                <rect x="8" y="6" width="1" height="8" fill="#064e3b" />
                <rect x="11" y="7" width="1" height="6" fill="#064e3b" />
              </g>
            )}
            {typeId === 'terung' && (
              <g>
                <rect x="5" y="7" width="6" height="7" fill={pColor} rx="2" />
                <rect x="7" y="5" width="2" height="3" fill="#15803d" /> {/* green crown */}
              </g>
            )}
            {typeId === 'stroberi' && (
              <g>
                {/* 2 Strawberries */}
                <polygon points="3,8 7,8 5,13" fill={pColor} />
                <rect x="4" y="7" width="2" height="1" fill="#15803d" />
                {/* seeds detail */}
                <rect x="4" y="9" width="1" height="1" fill="#fef08a" />
                <rect x="5" y="11" width="1" height="1" fill="#fef08a" />

                <polygon points="9,10 13,10 11,15" fill={pColor} />
                <rect x="10" y="9" width="2" height="1" fill="#15803d" />
                <rect x="11" y="11" width="1" height="1" fill="#fef08a" />
              </g>
            )}
          </g>
        )}
      </svg>
    );
  },

  // Interactive Watering can SVG
  wateringCan: (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      <rect x="6" y="14" width="14" height="12" fill="#475569" rx="2" stroke="#1e293b" strokeWidth="1" />
      <rect x="8" y="16" width="10" height="8" fill="#64748b" />
      {/* Handle */}
      <rect x="2" y="12" width="5" height="10" fill="none" stroke="#475569" strokeWidth="2" rx="1" />
      {/* Spout */}
      <rect x="20" y="18" width="6" height="3" fill="#475569" />
      <rect x="26" y="15" width="2" height="7" fill="#94a3b8" />
    </svg>
  ),

  // Digging Hoe
  hoe: (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Wooden Shaft */}
      <line x1="6" y1="26" x2="22" y2="10" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
      {/* Iron hoe head joined */}
      <rect x="20" y="6" width="8" height="5" fill="#475569" rx="1" />
      <rect x="24" y="7" width="5" height="2" fill="#94a3b8" />
      {/* Bind strings */}
      <rect x="20" y="9" width="3" height="2" fill="#ca8a04" />
    </svg>
  ),

  // Spray for weeds/pests
  spray: (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      <rect x="11" y="14" width="10" height="13" fill="#0891b2" rx="2" />
      <rect x="13" y="16" width="6" height="9" fill="#22d3ee" />
      {/* Trigger nozzle */}
      <rect x="13" y="10" width="6" height="4" fill="#cbd5e1" />
      <rect x="11" y="7" width="4" height="3" fill="#475569" />
      <rect x="8" y="8" width="3" height="1" fill="#475569" />
    </svg>
  )
};

// NPCs Setup
const VILLAGE_NPCS: NPC[] = [
  {
    id: 'budi',
    name: 'Pak Budi',
    role: 'Peternak & Penjual Benih',
    color: '#15803d',
    avatarSvg: 'budi',
    defaultPosition: { x: 84, y: 35 }, // aligned to spacious right side
    dialogs: [
      "Halo nak, selamat datang di Kebun Harmoni! Udara segar perdesaan selalu membuat tulang tuaku terasa muda kembali.",
      "Butuh benih baru? Saya punya stok Tomat, Wortel, dan juga Stroberi Gunung yang manis sekali jika dirawat penuh kasih sayang.",
      "Kunci dari perkebunan yang makmur adalah penyiraman teratur. Tanah kering akan memperlambat pertumbuhan tanamanmu.",
      "Jika tanamanmu diserang serangga hijau nak, gunakan Semprotan Hama sesegera mungkin lho ya!",
      "Kadang aku rindu masa muda saat bisa memutari seluruh persawahan ini seharian penuh..."
    ]
  },
  {
    id: 'siti',
    name: 'Teh Siti',
    role: 'Gadis Desa & Penggemar Bunga',
    color: '#ec4899',
    avatarSvg: 'siti',
    defaultPosition: { x: 86, y: 78 }, // aligned near rich wildflower lawn
    dialogs: [
      "Wah, halo petualang kebun! Kebunmu terlihat mulai hijau dan asri ya, aku senang sekali melihatnya.",
      "Aku paling suka bunga Stroberi Gunung! Warnanya yang merah muda merona sungguh manis.",
      "Di sore hari saat sunset, suasana desa sangat romantis dan menenangkan ya? Semburat jingga benderang...",
      "Kalau kamu punya buah matang yang melimpah, aku bersedia membelinya untuk dijadikan selai buah manis!",
      "Dengar-dengar, membelai si kucing orange Miko bisa membawakan ketenangan ekstra lho, coba saja klik dia."
    ]
  }
];

// Rich aesthetic pixel-art static sprites for "pixelnya banyakin" high detail enhancement
const SAKURA_TREE_SPRITE = (
  <svg viewBox="0 0 64 64" className="w-full h-full filter drop-shadow-md">
    {/* Trunk & Bark shading */}
    <path d="M 28,64 L 32,48 Q 33,36 30,30 Q 28,24 24,20" stroke="#451a03" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    <path d="M 32,48 Q 36,34 44,22" stroke="#271201" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M 30,30 Q 34,22 40,16" stroke="#451a03" strokeWidth="2.5" fill="none" />
    <path d="M 28,24 Q 22,14 14,14" stroke="#271201" strokeWidth="2" fill="none" />
    
    {/* Rich detailed multi-toned pink/cherry sakura leaves blocks */}
    {/* Deep/Back shadow block */}
    <circle cx="20" cy="16" r="11" fill="#be185d" opacity="0.8" />
    <circle cx="44" cy="15" r="10" fill="#be185d" opacity="0.8" />
    <circle cx="32" cy="18" r="13" fill="#9d174d" opacity="0.85" />
    
    {/* Mid tone warm pink blocks */}
    <circle cx="24" cy="14" r="9" fill="#db2777" />
    <circle cx="38" cy="14" r="10" fill="#db2777" />
    <circle cx="32" cy="11" r="12" fill="#ec4899" />
    
    {/* Front light pastel pink & white blossom highlights */}
    <circle cx="16" cy="16" r="7.5" fill="#f472b6" />
    <circle cx="46" cy="17" r="8" fill="#f472b6" />
    <circle cx="28" cy="8" r="7.5" fill="#fbcfe8" />
    <circle cx="36" cy="9" r="8" fill="#fbcfe8" />
    <circle cx="31" cy="6" r="5" fill="#fff1f2" />
    
    {/* Scattered pixel details for texture on foliage */}
    <rect x="22" y="11" width="1.5" height="1.5" fill="#fff1f2" />
    <rect x="36" y="13" width="1.5" height="1.5" fill="#fff1f2" />
    <rect x="18" y="15" width="2" height="1" fill="#be185d" />
    <rect x="42" y="12" width="2" height="1" fill="#be185d" />
  </svg>
);

const WELL_SPRITE = (
  <svg viewBox="0 0 32 32" className="w-full h-full filter drop-shadow-md">
    {/* Stone wall foundation */}
    <rect x="4" y="20" width="24" height="11" fill="#475569" rx="1.5" />
    <rect x="2" y="22" width="28" height="2.5" fill="#334155" />
    {/* Brick separation textures */}
    <rect x="6" y="25" width="4" height="2" fill="#1e293b" opacity="0.4" />
    <rect x="16" y="27" width="5" height="2" fill="#1e293b" opacity="0.4" />
    <rect x="22" y="24" width="3" height="2" fill="#1e293b" opacity="0.4" />
    <rect x="12" y="29" width="4" height="1.5" fill="#1e293b" opacity="0.4" />
    
    {/* Well opening deep blue water reflection */}
    <ellipse cx="16" cy="20" rx="11" ry="2.5" fill="#024e75" />
    <ellipse cx="15" cy="20.5" rx="8" ry="1.5" fill="#0077b6" />
    
    {/* Oak wood struts and roof framing */}
    <rect x="6" y="8" width="2.5" height="13.5" fill="#b45309" />
    <rect x="23.5" y="8" width="2.5" height="13.5" fill="#b45309" />
    
    {/* Windlass crank, axel & rope */}
    <line x1="8" y1="11" x2="24" y2="11" stroke="#451a03" strokeWidth="2.5" />
    <line x1="24" y1="11" x2="27" y2="14" stroke="#78350f" strokeWidth="1.5" />
    <rect x="27" y="13" width="2" height="3" fill="#78350f" />
    <line x1="16" y1="11" x2="16" y2="17" stroke="#fbbf24" strokeWidth="1.2" />
    {/* Tiny hanging oak bucket */}
    <rect x="14" y="16" width="4" height="4.5" fill="#78350f" rx="0.5" />
    <rect x="13.5" y="15.5" width="5" height="1" fill="#451a03" />
    
    {/* Cozy tiled well roof */}
    <polygon points="16,1 1,8.5 31,8.5" fill="#b91c1c" />
    <polygon points="16,3 3,8.5 29,8.5" fill="#dc2626" />
    {/* Wooden crossbeam helper */}
    <rect x="5" y="7" width="22" height="1.5" fill="#451a03" />
  </svg>
);

const BENCH_SPRITE = (
  <svg viewBox="0 0 32 32" className="w-full h-full">
    {/* Soft floor shadow */}
    <ellipse cx="16" cy="26" rx="13" ry="2.5" fill="#0a1204" opacity="0.25" />
    {/* Solid iron frame support bars (wrought iron look) */}
    <rect x="5" y="14" width="2" height="12" fill="#1e293b" rx="0.5" />
    <rect x="25" y="14" width="2" height="12" fill="#1e293b" rx="0.5" />
    <rect x="4" y="20.5" width="24" height="1.5" fill="#0f172a" />
    
    {/* Smooth golden pine support planks backrest */}
    <rect x="7" y="13.5" width="18" height="3" fill="#b45309" rx="0.5" />
    <rect x="7" y="17.2" width="18" height="2.5" fill="#78350f" rx="0.5" />
    {/* Plump wood seat board */}
    <rect x="4.5" y="20.5" width="23" height="2.5" fill="#d97706" rx="0.5" />
    
    {/* Swirling armrests ornament */}
    <circle cx="5.5" cy="14" r="1.5" fill="none" stroke="#0f172a" strokeWidth="1" />
    <circle cx="26.5" cy="14" r="1.5" fill="none" stroke="#0f172a" strokeWidth="1" />
  </svg>
);

const SCARECROW_SPRITE = (
  <svg viewBox="0 0 32 32" className="w-full h-full filter drop-shadow-sm">
    {/* Support wooden poles intersection */}
    <line x1="16" y1="5" x2="16" y2="30" stroke="#451a03" strokeWidth="2.5" />
    <line x1="5" y1="13" x2="27" y2="13" stroke="#451a03" strokeWidth="1.8" />
    
    {/* Tatty patched flannel green farmer shirt */}
    <rect x="8" y="10" width="16" height="10" fill="#047857" rx="0.5" />
    <rect x="11" y="12" width="10" height="7" fill="#065f46" />
    
    {/* Little patch detail */}
    <rect x="18" y="15" width="3" height="3" fill="#ca8a04" />
    <line x1="18" y1="15" x2="21" y2="18" stroke="#78350f" strokeWidth="0.5" />
    
    {/* Straw fingers sticking out of sleeve ends */}
    <line x1="8" y1="13.5" x2="4" y2="13.5" stroke="#facc15" strokeWidth="1.2" />
    <line x1="24" y1="13.5" x2="28" y2="13.5" stroke="#facc15" strokeWidth="1.2" />
    <line x1="8" y1="14.5" x2="5" y2="15.2" stroke="#eab308" strokeWidth="0.8" />
    <line x1="24" y1="14.5" x2="27" y2="15.2" stroke="#eab308" strokeWidth="0.8" />
    
    {/* Jack-o-Lantern pumpkin skull */}
    <circle cx="16" cy="7" r="5" fill="#ea580c" />
    {/* Stem */}
    <rect x="15" y="1" width="2" height="2" fill="#15803d" />
    {/* Eyes and mouth details */}
    <polygon points="13,6 14.5,5 14,7" fill="#2d0a01" />
    <polygon points="19,6 17.5,5 18,7" fill="#2d0a01" />
    <path d="M 13,8 C 14.5,9.5 17.5,9.5 19,8 Z" fill="#2d0a01" />
    
    {/* Crooked tattered brown farmer cone hat */}
    <polygon points="6,3.5 26,3.5 16,0" fill="#78350f" />
    <rect x="5" y="3.2" width="22" height="1.2" fill="#451a03" />
  </svg>
);

// Constant list of grass clusters coordinates for random scattering
const GRASS_TUFTS = [
  { x: 5, y: 38 }, { x: 19, y: 44 }, { x: 3, y: 55 }, { x: 14, y: 72 },
  { x: 26, y: 32 }, { x: 28, y: 82 }, { x: 42, y: 16 }, { x: 48, y: 92 },
  { x: 58, y: 15 }, { x: 60, y: 88 }, { x: 74, y: 16 }, { x: 73, y: 85 },
  { x: 88, y: 22 }, { x: 92, y: 52 }, { x: 78, y: 18 }, { x: 94, y: 90 },
  { x: 12, y: 85 }, { x: 8, y: 24 }, { x: 82, y: 12 }, { x: 4, y: 90 }
];

export default function App() {
  // Game States
  const [coins, setCoins] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<'kebun' | 'shop' | 'tasks' | 'help'>('kebun');
  const [crops, setCrops] = useState<Record<number, Crop>>({});
  const [selectedTool, setSelectedTool] = useState<GameState['selectedTool']>('walk');
  const [selectedSeed, setSelectedSeed] = useState<string>('tomat');
  const [inventory, setInventory] = useState<PlayerInventory>({
    seeds: { tomat: 5, wortel: 3, semangka: 1, terung: 2, stroberi: 0 },
    harvested: { tomat: 0, wortel: 0, semangka: 0, terung: 0, stroberi: 0 }
  });
  
  // Scenery & Atmosphere states
  const [weather, setWeather] = useState<'cerah' | 'hujan'>('cerah');
  const [timeOfDay, setTimeOfDay] = useState<'fajar' | 'siang' | 'senja' | 'malam'>('siang');
  const [timeTicks, setTimeTicks] = useState<number>(600); // 0 to 2400 mins (10:00 AM)
  const [isAutoCycle, setIsAutoCycle] = useState<boolean>(true); // user toggles automatic cycle
  const [bgmVolume, setBgmVolume] = useState<number>(0.2);
  const [isMuted, setIsMuted] = useState<boolean>(true); // start muted so browser policies don't block
  
  // Dialogue state
  const [activeNPC, setActiveNPC] = useState<NPC | null>(null);
  const [currentDialogIndex, setCurrentDialogIndex] = useState<number>(0);
  const [typingText, setTypingText] = useState<string>('');
  const [showCatPettingHearts, setShowCatPettingHearts] = useState<boolean>(false);

  // Player Character states
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isWalking, setIsWalking] = useState<boolean>(false);
  const [playerDir, setPlayerDir] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Windmill spin continuous factor
  const [windmillAngle, setWindmillAngle] = useState<number>(0);

  // Stats
  const [totalHarvestedCount, setTotalHarvestedCount] = useState<number>(0);
  const [playerLevel, setPlayerLevel] = useState<number>(1);
  const [playerXp, setPlayerXp] = useState<number>(0);

  // Notification state
  const [notification, setNotification] = useState<string | null>("Selamat datang di Kebun Harmoni! Ayo mulailah menanam.");

  // Daily Tasks List
  const [tasks, setTasks] = useState<GameTask[]>([
    { id: '1', text: 'Siram 3 tanaman yang kering', type: 'water', progress: 0, target: 3, rewardCoins: 30, completed: false },
    { id: '2', text: 'Panen hasil bumi pertamamu', type: 'harvest', progress: 0, target: 1, rewardCoins: 20, completed: false },
    { id: '3', text: 'Bicara dengan petani Pak Budi', type: 'interact', progress: 0, target: 1, rewardCoins: 15, completed: false },
    { id: '4', text: 'Kumpulkan total 150 koin emas', type: 'earn', progress: 0, target: 150, rewardCoins: 40, completed: false },
  ]);

  // Handle auto notifications fading away
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Show a banner notification helper
  const triggerNotification = (msg: string) => {
    setNotification(msg);
  };

  // Sound Controller listener
  useEffect(() => {
    if (!isMuted) {
      sound.setVolume(bgmVolume);
      sound.startRelaxingBGM();
    } else {
      sound.stopBGM();
    }
    return () => {
      sound.stopBGM();
    };
  }, [isMuted, bgmVolume]);

  // Main game ticks: Crop growth simulation, Time movement, Windmill spinning
  useEffect(() => {
    const gameTimer = setInterval(() => {
      // 1. Advance Day/Night Cycle (1 minute in-game every real-world 1.5 seconds) if auto cycle is active
      if (isAutoCycle) {
        setTimeTicks((prev) => {
          const nextTime = (prev + 12) % 2400; // Increment
          
          // Map ticks to friendly Day phases (extended sunset slightly for cozier atmosphere)
          if (nextTime >= 500 && nextTime < 800) {
            if (timeOfDay !== 'fajar') setTimeOfDay('fajar');
          } else if (nextTime >= 800 && nextTime < 1550) {
            if (timeOfDay !== 'siang') setTimeOfDay('siang');
          } else if (nextTime >= 1550 && nextTime < 1920) {
            if (timeOfDay !== 'senja') setTimeOfDay('senja');
          } else {
            if (timeOfDay !== 'malam') setTimeOfDay('malam');
          }
          return nextTime;
        });
      }

      // 2. Continuous windmill blade spin
      setWindmillAngle(prev => (prev + 3) % 360);

      // 3. Crop growth simulation
      setCrops((prevCrops) => {
        const newCrops = { ...prevCrops };
        let modified = false;

        Object.keys(newCrops).forEach((slotKey) => {
          const sIndex = Number(slotKey);
          const crop = newCrops[sIndex];

          if (crop && crop.stage < 4) {
            modified = true;
            // Crop type traits
            const typeInfo = CROP_TYPES[crop.typeId];
            if (!typeInfo) return;

            // Grow speed factors: weather, watering state, pest status
            let growMultiplier = typeInfo.growSpeed * 0.4;
            if (crop.watered) {
              growMultiplier *= 1.5; // grows faster if wet
            } else {
              growMultiplier *= 0.3; // barely grows if bone dry
            }

            if (crop.pest) {
              growMultiplier *= 0.2; // pests eat crop nutrition
            }

            // High rainfall boost for watered state
            if (weather === 'hujan') {
              crop.watered = true; 
            }

            const newGrowth = Math.min(100, crop.growth + growMultiplier);
            const newStage = Math.floor(newGrowth / 25) + 1;

            newCrops[sIndex] = {
              ...crop,
              growth: newGrowth,
              stage: Math.min(4, newStage),
              // Random weeding/pest appearance if watered but untreated (1.5% chance per tick)
              pest: crop.pest || (Math.random() < 0.015 && crop.stage >= 2),
            };

            // Water dry-out rule: random change each tick unless raining
            if (weather !== 'hujan' && Math.random() < 0.06 && crop.watered) {
              newCrops[sIndex].watered = false;
            }
          }
        });

        return modified ? newCrops : prevCrops;
      },);

    }, 1500);

    return () => clearInterval(gameTimer);
  }, [weather, timeOfDay, isAutoCycle]);

  // Weather changer (Random transition between clear and cozy light rain shower every 2 minutes)
  useEffect(() => {
    const weatherTimer = setInterval(() => {
      const isRainy = Math.random() < 0.25; // 25% rain outcome
      const nextWeather = isRainy ? 'hujan' : 'cerah';
      if (nextWeather !== weather) {
        setWeather(nextWeather);
        if (nextWeather === 'hujan') {
          triggerNotification("Rintik hujan meneduhkan mulai membasahi perdesaan...");
        } else {
          triggerNotification("Langit kembali cerah benderang. Burung-burung berkicau.");
        }
      }
    }, 120000);

    return () => clearInterval(weatherTimer);
  }, [weather]);

  // Handle Keyboard walking movements inside the farm playground area
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block keyboard inputs if user is currently typcasting dialog
      if (activeNPC) return;

      const step = 2.5; // percentage step size
      let dx = 0;
      let dy = 0;
      let targetDir: 'up' | 'down' | 'left' | 'right' = playerDir;

      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          dy = -step;
          targetDir = 'up';
          break;
        case 's':
        case 'arrowdown':
          dy = step;
          targetDir = 'down';
          break;
        case 'a':
        case 'arrowleft':
          dx = -step;
          targetDir = 'left';
          break;
        case 'd':
        case 'arrowright':
          dx = step;
          targetDir = 'right';
          break;
        default:
          return; // Ignore other inputs
      }

      setPlayerDir(targetDir);
      setIsWalking(true);

      setPlayerPos((prev) => {
        // Enforce boundary collision with expanded farm field limits
        const nextX = Math.max(4, Math.min(96, prev.x + dx));
        const nextY = Math.max(16, Math.min(92, prev.y + dy));
        return { x: nextX, y: nextY };
      });

      // Clear walking animations after key releases
      const releaseTimer = setTimeout(() => setIsWalking(false), 200);
      return () => clearTimeout(releaseTimer);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerDir, activeNPC]);

  // Click destination walk handler (Clicking terrain makes character travel)
  const handleTerrainClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeNPC) return; // ignore during dialog

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Enforce limits
    const targetX = Math.max(4, Math.min(96, clickX));
    const targetY = Math.max(16, Math.min(92, clickY));

    // Calculate facing orientation based on major displacement vector
    const dx = targetX - playerPos.x;
    const dy = targetY - playerPos.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      setPlayerDir(dx > 0 ? 'right' : 'left');
    } else {
      setPlayerDir(dy > 0 ? 'down' : 'up');
    }

    // Smooth movement with walking animation frames
    setIsWalking(true);
    setPlayerPos({ x: targetX, y: targetY });

    // Sound footstep
    if (!isMuted) {
      sound.playTextBeep();
    }

    const timer = setTimeout(() => {
      setIsWalking(false);
    }, 400);

    return () => clearTimeout(timer);
  };

  // Dialogue effect text typist
  useEffect(() => {
    if (!activeNPC) return;
    setTypingText('');
    let charIndex = 0;
    const currentDialog = activeNPC.dialogs[currentDialogIndex];
    
    const typer = setInterval(() => {
      if (charIndex < currentDialog.length) {
        setTypingText(prev => prev + currentDialog.charAt(charIndex));
        charIndex++;
        if (!isMuted && charIndex % 3 === 0) {
          sound.playTextBeep();
        }
      } else {
        clearInterval(typer);
      }
    }, 25);

    return () => clearInterval(typer);
  }, [activeNPC, currentDialogIndex, isMuted]);

  // Level Up logic handler
  const grantXP = (amount: number) => {
    setPlayerXp((prevXp) => {
      const needed = playerLevel * 100;
      const nextXp = prevXp + amount;
      if (nextXp >= needed) {
        setPlayerLevel(prev => prev + 1);
        if (!isMuted) sound.playLevelUp();
        triggerNotification(`Hore! Level pertanianmu bertambah ke Level ${playerLevel + 1}!`);
        return nextXp - needed;
      }
      return nextXp;
    });
  };

  // Task checking and updating function
  const incrementTaskProgress = (type: GameTask['type'], amountValue: number) => {
    setTasks((prevTasks) => 
      prevTasks.map((t) => {
        if (t.type === type && !t.completed) {
          const nextProgress = t.progress + amountValue;
          const isNowComplete = nextProgress >= t.target;
          if (isNowComplete) {
            setCoins(c => c + t.rewardCoins);
            if (!isMuted) sound.playCoin();
            triggerNotification(`Tugas Selesai! "+${t.rewardCoins} koin" dari: ${t.text}`);
          }
          return {
            ...t,
            progress: Math.min(t.target, nextProgress),
            completed: isNowComplete
          };
        }
        return t;
      })
    );
  };

  // Quick helper to check earn tasks
  useEffect(() => {
    incrementTaskProgress('earn', coins);
  }, [coins]);

  // Action: Tilling / Digging soil
  const handleSlotAction = (slotIdx: number) => {
    // Walk to the slot's general location (aligned to spacious coordinates)
    const col = slotIdx % 4; // 0, 1, 2, 3
    const row = Math.floor(slotIdx / 4); // 0, 1, 2, 3
    const targetX = 36 + col * 10.5;
    const targetY = 28 + row * 17;
    
    // Animate move to garden plot
    setPlayerPos({ x: targetX, y: targetY });
    setPlayerDir(targetY > playerPos.y ? 'down' : 'up');

    const curCrop = crops[slotIdx];

    if (selectedTool === 'hoe') {
      if (curCrop) {
        triggerNotification("Tanah ini sudah dicangkul.");
        return;
      }
      if (!isMuted) sound.playHoe();
      // Till soil slot
      setCrops(prev => ({
        ...prev,
        [slotIdx]: {
          id: `${Date.now()}-${slotIdx}`,
          slotIndex: slotIdx,
          typeId: '', // Empty ready to be seeded
          growth: 0,
          stage: 0,
          watered: false,
          pest: false,
          plantedAtTimestamp: Date.now()
        }
      }));
      grantXP(5);
      triggerNotification("Tanah gembur siap ditanami benih!");
    } 
    
    else if (selectedTool === 'seed') {
      if (!curCrop) {
        triggerNotification("Cangkul tanah ini terlebih dahulu sebelum menanam.");
        return;
      }
      if (curCrop.typeId !== '') {
        triggerNotification("Tanah ini sudah ditumbuhi tanaman.");
        return;
      }

      // Check seed count
      const seedCount = inventory.seeds[selectedSeed] || 0;
      if (seedCount <= 0) {
        triggerNotification(`Kamu kehabisan Benih ${CROP_TYPES[selectedSeed]?.name}! Beli di kedai Pak Budi.`);
        return;
      }

      // Plant seed
      if (!isMuted) sound.playSeed();
      
      // Update inventory
      setInventory(prev => ({
        ...prev,
        seeds: {
          ...prev.seeds,
          [selectedSeed]: seedCount - 1
        }
      }));

      setCrops(prev => ({
        ...prev,
        [slotIdx]: {
          ...curCrop,
          typeId: selectedSeed,
          stage: 1, // Seed state
          growth: 1
        }
      }));
      triggerNotification(`Menanam benih ${CROP_TYPES[selectedSeed]?.name}.`);
    } 
    
    else if (selectedTool === 'water') {
      if (!curCrop || curCrop.typeId === '') {
        triggerNotification("Tidak ada tanaman untuk disiram.");
        return;
      }
      if (curCrop.watered) {
        triggerNotification("Tanaman ini sudah cukup basah.");
        return;
      }

      if (!isMuted) sound.playWater();
      setCrops(prev => ({
        ...prev,
        [slotIdx]: {
          ...curCrop,
          watered: true
        }
      }));
      incrementTaskProgress('water', 1);
      grantXP(3);
    } 
    
    else if (selectedTool === 'pest') {
      if (!curCrop || curCrop.typeId === '') {
        triggerNotification("Cabut rumput liar atau bersihkan tanaman.");
        return;
      }
      if (!curCrop.pest) {
        triggerNotification("Tanaman bersih dari serangan serangga liar.");
        return;
      }

      if (!isMuted) sound.playWater(); // soft brush noise
      setCrops(prev => ({
        ...prev,
        [slotIdx]: {
          ...curCrop,
          pest: false
        }
      }));
      triggerNotification("Menghilangkan hama tumbuhan.");
      grantXP(8);
    } 
    
    else if (selectedTool === 'harvest' || selectedTool === 'walk') {
      if (!curCrop || curCrop.typeId === '') return;
      
      if (curCrop.stage < 4) {
        triggerNotification("Tanaman belum matang sepenuhnya, bersabarlah.");
        return;
      }

      // Ripe harvest!
      if (!isMuted) sound.playHarvest();
      const info = CROP_TYPES[curCrop.typeId];
      
      // Add harvested crop bag
      setInventory(prev => ({
        ...prev,
        harvested: {
          ...prev.harvested,
          [curCrop.typeId]: (prev.harvested[curCrop.typeId] || 0) + 1
        }
      }));

      // Clear slot or keep tilled soil
      setCrops(prev => {
        const next = { ...prev };
        delete next[slotIdx];
        return next;
      });

      setTotalHarvestedCount(prev => prev + 1);
      incrementTaskProgress('harvest', 1);
      grantXP(25);
      triggerNotification(`Sukses panen ${info.name}! Dapat disimpan atau dijual kepada warga.`);
    }
  };

  // Seed Shop transaction functions
  const buySeed = (typeId: string) => {
    const info = CROP_TYPES[typeId];
    if (!info) return;

    if (coins < info.seedCost) {
      triggerNotification("Koin emas yang kamu miliki tidak mencukupi.");
      return;
    }

    setCoins(prev => prev - info.seedCost);
    setInventory(prev => ({
      ...prev,
      seeds: {
        ...prev.seeds,
        [typeId]: (prev.seeds[typeId] || 0) + 1
      }
    }));
    if (!isMuted) sound.playCoin();
    triggerNotification(`Membeli 1x benih ${info.name}.`);
  };

  // Selling farm products
  const sellHarvest = (typeId: string) => {
    const info = CROP_TYPES[typeId];
    const owned = inventory.harvested[typeId] || 0;
    if (owned <= 0) {
      triggerNotification(`Kamu tidak memiliki stok ${info.name} untuk dijual.`);
      return;
    }

    setInventory(prev => ({
      ...prev,
      harvested: {
        ...prev.harvested,
        [typeId]: owned - 1
      }
    }));
    
    setCoins(prev => prev + info.sellPrice);
    if (!isMuted) sound.playCoin();
    triggerNotification(`Berhasil menjual ${info.name} seharga +${info.sellPrice} koin emas!`);
  };

  // NPC dialogue initiator
  const talkToNPC = (npc: NPC) => {
    // Move character near the NPC
    setPlayerPos({
      x: npc.defaultPosition.x - 7,
      y: npc.defaultPosition.y + 4
    });
    setPlayerDir('right');

    setActiveNPC(npc);
    setCurrentDialogIndex(0);
    incrementTaskProgress('interact', 1);
  };

  const nextDialog = () => {
    if (!activeNPC) return;
    if (currentDialogIndex < activeNPC.dialogs.length - 1) {
      setCurrentDialogIndex(prev => prev + 1);
    } else {
      // End dialogue session
      setActiveNPC(null);
    }
  };

  // Interactive petting cat Miko
  const petTheCat = () => {
    // Move closer to sleeping cat location by the cabin
    setPlayerPos({ x: 19, y: 35 });
    setPlayerDir('left');

    setShowCatPettingHearts(true);
    if (!isMuted) sound.playHarvest(); // cheerful bell note chime
    triggerNotification("Miko mendengkur lembut... Meow~");
    grantXP(2);

    setTimeout(() => {
      setShowCatPettingHearts(false);
    }, 2500);
  };

  // Atmosphere background styles (highly detailed pixel-blend overlays)
  const getAtmosphereClassName = () => {
    switch(timeOfDay) {
      case 'fajar':
        return 'from-amber-300/40 via-orange-200/25 to-indigo-900/35';
      case 'siang':
        return 'from-sky-200/20 via-sky-50/5 to-transparent';
      case 'senja':
        return 'from-amber-500/60 via-orange-600/45 to-purple-950/50'; // Deep sunset golden glow
      case 'malam':
        return 'from-slate-950/80 via-[#0b1329]/90 to-black/95';
    }
  };

  // Format digital clock representation
  const formatTime = () => {
    const hours = Math.floor(timeTicks / 100);
    const minutes = Math.floor(((timeTicks % 100) / 100) * 60);
    const displayHours = hours.toString().padStart(2, '0');
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes}`;
  };

  return (
    <div id="game-container" className="min-h-screen bg-[#0f172a] text-[#f8fafc] font-mono flex flex-col justify-between overflow-x-hidden antialiased">
      
      {/* HEADER HUD BAR */}
      <header id="game-hud" className="bg-[#1e293b] border-b-4 border-[#334155] p-3 px-4 flex flex-wrap justify-between items-center gap-3 z-20 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-600 border-2 border-yellow-400 rounded-lg flex items-center justify-center animate-shine">
            <Sprout className="text-yellow-200 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wide uppercase text-yellow-300">Kebun Pixel Harmoni</h1>
            <p className="text-xs text-slate-400">Pedesaan Santai &middot; Petualangan Tani</p>
          </div>
        </div>

        {/* TIME CYCLE INDICATOR */}
        <div className="flex items-center gap-3 bg-[#0f172a] border-2 border-slate-700 px-3 py-1.5 rounded-lg">
          <div className="text-amber-400">
            {timeOfDay === 'siang' && <Sun className="w-5 h-5 animate-spin-slow" />}
            {timeOfDay === 'fajar' && <Sun className="w-5 h-5 text-orange-300" />}
            {timeOfDay === 'senja' && <Sun className="w-5 h-5 text-rose-400" />}
            {timeOfDay === 'malam' && <Moon className="w-5 h-5 text-indigo-300 animate-pulse" />}
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold capitalize text-slate-200">
              {timeOfDay === 'fajar' && 'Fajar Pagi'}
              {timeOfDay === 'siang' && 'Siang Terang'}
              {timeOfDay === 'senja' && 'Sore Senja'}
              {timeOfDay === 'malam' && 'Malam Syahdu'}
            </p>
            <p className="text-[10px] text-slate-400">Jam {formatTime()}</p>
          </div>
          <div className="border-l border-slate-700 pl-3">
            {weather === 'hujan' ? (
              <span className="flex items-center gap-1 text-sky-400 text-xs">
                <CloudRain className="w-4 h-4 animate-bounce" /> Hujan
              </span>
            ) : (
              <span className="text-amber-200 text-xs">☀ Cerah</span>
            )}
          </div>
        </div>

        {/* COIN AND LEVEL STATS */}
        <div className="flex items-center gap-4">
          <div className="bg-[#1e293b] border-2 border-yellow-500/50 bg-yellow-950/20 px-3 py-1 rounded-md flex items-center gap-2">
            <Coins className="text-yellow-400 w-5 h-5" />
            <span className="text-yellow-300 font-bold text-sm tracking-widest">{coins} <span className="text-[10px] text-yellow-500">Koin</span></span>
          </div>

          <div className="text-xs flex flex-col gap-0.5">
            <div className="flex justify-between font-semibold text-emerald-400">
              <span>LV. {playerLevel}</span>
              <span className="text-slate-400 text-[10px]">{playerXp} / {playerLevel * 100} XP</span>
            </div>
            <div className="w-24 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${(playerXp / (playerLevel * 100)) * 100}%` }}
              />
            </div>
          </div>

          {/* BACKGROUND SOUND CONTROLS */}
          <div className="flex items-center gap-1.5 border-l border-slate-700 pl-3">
            <button 
              id="btn-volume-toggle"
              onClick={() => setIsMuted(!isMuted)} 
              className={`p-1.5 rounded-md border-2 transition-all ${isMuted ? 'border-red-800 bg-red-950/30 text-red-400' : 'border-emerald-800 bg-emerald-950/30 text-emerald-400'}`}
              title={isMuted ? "Hidupkan Musik" : "Matikan Musik"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            {!isMuted && (
              <input 
                id="volume-adjuster"
                type="range" 
                min="0.05" 
                max="0.6" 
                step="0.05"
                value={bgmVolume}
                onChange={(e) => setBgmVolume(parseFloat(e.target.value))}
                className="w-12 h-1 accent-emerald-500 cursor-pointer hidden sm:block"
                title="Sesuaikan Volume"
              />
            )}
          </div>
        </div>
      </header>

      {/* NOTIFICATION OVERLAY BAR */}
      {notification && (
        <div id="game-notify" className="relative z-30 bg-emerald-500 border-b-2 border-emerald-600 text-[#075e54] text-xs font-bold py-2 text-center select-none shadow-md animate-slide-down">
          ✨ {notification}
        </div>
      )}

      {/* MAIN GAME VIEWPORT */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
        
        {/* PARADISE PLAYGROUND VIEW & MAP (LEFT 3 COLS) */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          
          {/* MAP CANVAS */}
          <div 
            id="village-playground"
            ref={containerRef}
            onClick={handleTerrainClick}
            className="w-full aspect-[16/9] min-h-[300px] bg-[#315c1a] relative rounded-2xl border-4 border-[#1b3c0a] overflow-hidden select-none cursor-pointer shadow-inner"
            style={{ 
              imageRendering: 'pixelated',
              borderColor: '#112207'
            }}
          >
            {/* ATMOSPHERE FILTER OVERLAY */}
            <div id="atmosphere-filter" className={`absolute inset-0 bg-gradient-to-t ${getAtmosphereClassName()} transition-colors duration-[3000ms] pointer-events-none z-10`} />

            {/* FLOATING ATMOSPHERE CONTROLLERS PRESET PANEL */}
            <div className="absolute right-3 top-3 z-30 flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md p-1.5 px-2.5 rounded-xl border-2 border-slate-700/60 shadow-lg" onClick={(e) => e.stopPropagation()}>
              <span className="text-[9px] text-amber-300 font-bold uppercase mr-1 select-none flex items-center gap-1">🔆 Suasana:</span>
              
              <button 
                title="Waktu Fajar Pagi"
                onClick={() => {
                  setTimeOfDay('fajar');
                  setTimeTicks(600);
                  setIsAutoCycle(false);
                  triggerNotification("Suasana berganti ke Fajar Pagi berembun.");
                }} 
                className={`p-1 px-1.5 rounded-md text-[10px] font-bold transition-all ${timeOfDay === 'fajar' && !isAutoCycle ? 'bg-amber-500 text-slate-950 shadow-md scale-105' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                🌅 Fajar
              </button>

              <button 
                title="Waktu Siang Terang"
                onClick={() => {
                  setTimeOfDay('siang');
                  setTimeTicks(1200);
                  setIsAutoCycle(false);
                  triggerNotification("Suasana berganti ke Siang Hari yang hangat benderang.");
                }} 
                className={`p-1 px-1.5 rounded-md text-[10px] font-bold transition-all ${timeOfDay === 'siang' && !isAutoCycle ? 'bg-sky-500 text-slate-950 shadow-md scale-105' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                ☀️ Siang
              </button>

              <button 
                title="Waktu Sunset Sore - SENJA"
                onClick={() => {
                  setTimeOfDay('senja');
                  setTimeTicks(1750);
                  setIsAutoCycle(false);
                  triggerNotification("Sunset terkunci! Nikmati pemandangan sore perdesaan yang damai.");
                }} 
                className={`p-1 px-1.5 rounded-md text-[10px] font-extrabold transition-all ${timeOfDay === 'senja' && !isAutoCycle ? 'bg-orange-500 text-slate-950 shadow-md scale-110 ring-2 ring-orange-300' : 'bg-slate-800 text-orange-400 hover:bg-slate-700'}`}
              >
                🌇 SUNSET
              </button>

              <button 
                title="Waktu Malam Indah"
                onClick={() => {
                  setTimeOfDay('malam');
                  setTimeTicks(2100);
                  setIsAutoCycle(false);
                  triggerNotification("Suasana berganti ke Malam Syahdu bertabur bintang.");
                }} 
                className={`p-1 px-1.5 rounded-md text-[10px] font-bold transition-all ${timeOfDay === 'malam' && !isAutoCycle ? 'bg-indigo-600 text-white shadow-md scale-105' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                🌌 Malam
              </button>

              <div className="w-[1px] h-4 bg-slate-700 mx-1" />

              <button 
                title={isAutoCycle ? "Bekukan Waktu" : "Jalankan Waktu Otomatis"}
                onClick={() => {
                  setIsAutoCycle(!isAutoCycle);
                  triggerNotification(isAutoCycle ? "Siklus dihentikan. Waktu terkunci." : "Siklus diaktifkan kembali secara berkala.");
                }} 
                className={`p-1 px-1.5 rounded-md text-[10px] font-bold transition-all ${isAutoCycle ? 'bg-emerald-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-400'}`}
              >
                {isAutoCycle ? '🔄 Siklus' : '⏸️ Bekukan'}
              </button>

              <button 
                title={weather === 'hujan' ? "Hentikan Rintik Hujan" : "Panggil Hujan Syahdu"}
                onClick={() => {
                  setWeather(weather === 'hujan' ? 'cerah' : 'hujan');
                  triggerNotification(weather === 'hujan' ? "Mendung bersih kembali benderang" : "Awan mendung menyiram ladangmu basah.");
                }} 
                className={`p-1 px-1.5 rounded-md text-[10px] font-bold transition-all ${weather === 'hujan' ? 'bg-sky-400 text-slate-900 border border-sky-300' : 'bg-slate-800 text-slate-400'}`}
              >
                ☔ Hujan
              </button>
            </div>

            {/* LIGHT RAIN EFFECT OVERLAY */}
            {weather === 'hujan' && (
              <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-45">
                <div className="absolute top-0 left-0 w-full h-[300%] bg-repeat animate-rain bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2264%22><line x1=%228%22 y1=%225%22 x2=%228%22 y2=%2225%22 stroke=%22%237dd3fc%22 stroke-width=%221%22/></svg>')]"></div>
              </div>
            )}

            {/* TWINKLING STARS IN THE NIGHT */}
            {timeOfDay === 'malam' && (
              <div className="absolute inset-0 pointer-events-none opacity-85 z-0">
                <div className="absolute top-4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
                <div className="absolute top-8 left-1/2 w-1.5 h-1.5 bg-yellow-100 rounded-full animate-pulse" />
                <div className="absolute top-6 left-3/4 w-1 h-1 bg-white rounded-full animate-pulse" />
                <div className="absolute top-12 left-10 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-ping" />
                <div className="absolute top-16 left-[85%] w-1 h-1 bg-white rounded-full animate-pulse" />
                <div className="absolute top-5 left-[60%] w-1 h-1 bg-indigo-200 rounded-full animate-pulse" />
              </div>
            )}

            {/* SCENERY BACKGROUND ASSETS */}
            {/* Distant Hills Ranges */}
            <div className="absolute top-0 inset-x-0 h-1/5 bg-[#122b07] clip-path-hills opacity-75 z-0" />
            <div className="absolute top-3 inset-x-0 h-1/5 bg-[#1a3b0a] clip-path-hills opacity-90 z-0" />

            {/* COBBLESTONE GARDEN PATHWAYS FOR RETRO SCENIC VIBES */}
            <div className="absolute left-[33%] top-[20%] w-[1.5%] h-[72%] bg-yellow-800/20 border-l border-r border-[#451a03]/35 opacity-40 z-0" />
            <div className="absolute left-[73%] top-[20%] w-[1.5%] h-[72%] bg-yellow-800/20 border-l border-r border-[#451a03]/35 opacity-40 z-0" />
            <div className="absolute left-[33%] top-[50%] w-[42%] h-[2.5%] bg-yellow-800/20 border-t border-b border-[#451a03]/35 opacity-40 z-0" />

            {/* SHINY GREEN GRASS TUFTS FOR HIGH TEXTURE DETAIL */}
            {GRASS_TUFTS.map((g, idx) => (
              <div 
                key={`grass-${idx}`}
                className="absolute pointer-events-none opacity-35 z-0"
                style={{ left: `${g.x}%`, top: `${g.y}%` }}
              >
                <svg width="12" height="8" viewBox="0 0 12 8">
                  <path d="M 2,8 L 3,3 M 6,8 L 6,1 M 10,8 L 9,4" stroke="#4a7c2c" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            ))}

            {/* Cabin / Cozy Farmhouse (rendered on left) */}
            <div className="absolute left-[11%] top-[12%] w-[15%] aspect-square z-1">
              {SVG_SPRITES.cottage}
            </div>

            {/* Spinning wind mill right behind cabin */}
            <div className="absolute left-[3%] top-[4%] w-[10%] aspect-square z-0">
              {SVG_SPRITES.windmill(windmillAngle)}
            </div>

            {/* GORGEOUS SAKURA BLOSSOM TREE (Left of plots adding magnificent pink flavor) */}
            <div className="absolute left-[18%] top-[34%] w-[14%] aspect-square z-10 pointer-events-none">
              {SAKURA_TREE_SPRITE}
            </div>

            {/* WOODEN BENCH (Clicking seat lets mc sit here!) */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setPlayerPos({ x: 26, y: 55 });
                setPlayerDir('down');
                triggerNotification("Duduk bersantai menghirup udara sore yang sejuk.");
              }}
              className="absolute left-[22%] top-[51%] w-[8%] h-[8%] z-5 cursor-pointer hover:scale-105 transition-transform" 
              title="Klik untuk duduk bersantai"
            >
              {BENCH_SPRITE}
            </div>

            {/* ANCIENT STONE WATER WELL (Interactive well to refill / fetch water) */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setPlayerPos({ x: 26, y: 84 });
                setPlayerDir('up');
                if (!isMuted) sound.playWater();
                triggerNotification("Mendapatkan kesegaran murni dari mata air sumur perdesaan!");
              }}
              className="absolute left-[22%] bottom-[12%] w-[8%] aspect-square z-5 cursor-pointer hover:scale-105 transition-transform group"
              title="Klik sumur kuno pelestarian"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-[8px] font-bold py-0.5 px-1.5 rounded whitespace-nowrap border border-slate-700 hidden group-hover:block text-sky-300">
                Sumur Air Segar (Ambil Air)
              </div>
              {WELL_SPRITE}
            </div>

            {/* Traditional Scarecrow Guarding the Fields */}
            <div className="absolute left-[30%] top-[12%] w-[6%] aspect-square z-5 pointer-events-none">
              {SCARECROW_SPRITE}
            </div>

            {/* SUNSET LANTERN POST 1 (Reflecting cozy orange halo glow near cabin) */}
            <div className="absolute left-[29%] top-[30%] w-[3%] h-[12%] z-5 pointer-events-none flex flex-col items-center">
              {/* Wooden pole */}
              <div className="w-1 flex-1 bg-amber-950 border-r border-[#271201]" />
              {/* Lantern head */}
              <div className="w-3 h-3 bg-amber-800 rounded-sm flex items-center justify-center border border-amber-950 relative">
                {(timeOfDay === 'senja' || timeOfDay === 'malam') && (
                  <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-60 filter blur-[1px]" />
                )}
                <div className={`w-1.5 h-1.5 rounded-full ${ (timeOfDay === 'senja' || timeOfDay === 'malam') ? 'bg-yellow-300 shadow-lg' : 'bg-slate-500'}`} />
              </div>
            </div>

            {/* SUNSET LANTERN POST 2 (Reflecting cozy orange halo glow near right side) */}
            <div className="absolute right-[28%] top-[30%] w-[3%] h-[12%] z-5 pointer-events-none flex flex-col items-center">
              {/* Wooden pole */}
              <div className="w-1 flex-1 bg-amber-950 border-r border-[#271201]" />
              {/* Lantern head */}
              <div className="w-3 h-3 bg-amber-800 rounded-sm flex items-center justify-center border border-amber-950 relative">
                {(timeOfDay === 'senja' || timeOfDay === 'malam') && (
                  <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-60 filter blur-[1px]" />
                )}
                <div className={`w-1.5 h-1.5 rounded-full ${ (timeOfDay === 'senja' || timeOfDay === 'malam') ? 'bg-yellow-300 shadow-lg' : 'bg-slate-500'}`} />
              </div>
            </div>

            {/* Tranquil Lake / Pond (rendered on bottom-left) */}
            <div className="absolute left-[4%] bottom-[4%] w-[21%] h-[18%] bg-sky-700 rounded-full border-4 border-[#1b3c0a] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-1 bg-sky-600 rounded-full opacity-90 animate-pulse" />
              {/* Water lily plants circles decoration */}
              <circle cx="20" cy="15" r="3" fill="#15803d" className="absolute left-6 top-4" />
              <circle cx="23" cy="14" r="1.5" fill="#ec4899" className="absolute left-8 top-3" />
              
              <circle cx="40" cy="22" r="2.5" fill="#15803d" className="absolute right-10 bottom-4" />

              {/* Swimming golden fish shadows within pond */}
              <div className="absolute left-4 top-2 w-3 h-1.5 bg-yellow-400 rounded-full opacity-60 animate-bounce" />
              <div className="absolute right-6 bottom-3 w-4 h-2 bg-orange-400 rounded-full opacity-60 animate-pulse" />
              <div className="absolute left-1/2 top-1/2 w-2 h-1 bg-red-400 rounded-full opacity-80 animate-ping" style={{ transform: 'translate(-50%, -50%)' }} />
              
              {/* Tiny Wooden Pier Bridge pointing into the silent lake */}
              <div className="absolute right-0 top-[35%] w-8 h-4 bg-amber-800 rounded-l border border-amber-950 flex flex-col justify-between p-[2px]">
                <div className="w-full h-[1px] bg-amber-950" />
                <div className="w-full h-[1px] bg-amber-950" />
              </div>
            </div>

            {/* WILD FLOWERS MEADOW where Siti stands (bottom-right flower patch) */}
            <div className="absolute right-[4%] bottom-[4%] w-[25%] h-[15%] bg-[#2e5218] rounded-xl border border-[#1b3c0a] flex flex-wrap gap-2 p-2 items-center justify-center">
              {/* Colorful flowers */}
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
              <div className="w-2 h-2 bg-indigo-400 rounded-full" />
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 bg-pink-300 rounded-full" />
              <div className="w-2 h-2 bg-amber-400 rounded-full" />
              <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse" />
            </div>

            {/* EXPANDED 16 SOIL PLOT GRID - 4x4 Layout (Aligned center of playground) */}
            <div 
              id="farm-plots-grid"
              className="absolute left-[32%] top-[20%] w-[42%] h-[72%] grid grid-cols-4 grid-rows-4 gap-1.5 p-1.5 bg-[#2d5018]/50 border-2 border-[#1e3410] rounded-xl z-2 hover:border-emerald-400 transition-colors"
              onClick={(e) => e.stopPropagation() /* prevent moving player on grid click */}
            >
              {[...Array(16)].map((_, i) => {
                const crop = crops[i];
                return (
                  <button
                    key={i}
                    id={`farm-slot-${i}`}
                    onClick={() => handleSlotAction(i)}
                    className={`relative aspect-square rounded-md border flex flex-col items-center justify-center transition-all ${
                      crop 
                        ? crop.watered 
                          ? 'bg-[#401804] border-[#6b250f]' // watered dark dirt
                          : 'bg-[#6d2f0d] border-[#401804]' // dry light dirt
                        : 'bg-[#548033] border-[#39631d] hover:bg-[#39631d]/60 hover:border-yellow-400' // fertile moss grass
                    }`}
                  >
                    {!crop && (
                      <span className="text-[8px] text-emerald-200 opacity-0 hover:opacity-100 flex items-center justify-center pointer-events-none font-bold">
                        ⛏️ Gali
                      </span>
                    )}

                    {crop && crop.typeId === '' && (
                      <div className="text-[7px] text-yellow-300 font-extrabold text-center pointer-events-none select-none">
                        SIAP<br />TANAM
                      </div>
                    )}

                    {crop && crop.typeId !== '' && (
                      <div className="w-full h-full p-0.5 flex flex-col justify-between items-center relative">
                        {/* Crop Sprite illustrations */}
                        <div className="w-10/12 h-10/12 flex items-center justify-center relative">
                          {SVG_SPRITES.cropIcon(crop.typeId, crop.stage)}
                          
                          {/* Pest Indicator green bugs */}
                          {crop.pest && (
                            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-black animate-bounce flex items-center justify-center">
                              <span className="text-[6px] text-black">🐛</span>
                            </div>
                          )}
                        </div>

                        {/* Growing Progress bar mini */}
                        {crop.stage < 4 && (
                          <div className="w-10/12 h-1 bg-slate-900 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400" 
                              style={{ width: `${crop.growth}%` }}
                            />
                          </div>
                        )}

                        {/* Ripe badge for user */}
                        {crop.stage === 4 && (
                          <span className="absolute -bottom-1 bg-yellow-400 text-black text-[6.5px] font-bold px-1 rounded transform scale-90 animate-bounce">
                            PANEN
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* NPC CHARACTERS RENDERED ON WEALTHY SIDE MAP */}
            {/* 1. Pak Budi (Seed merchant near upper right) */}
            <div 
              id="npc-budi"
              onClick={(e) => {
                e.stopPropagation();
                talkToNPC(VILLAGE_NPCS[0]);
              }}
              className="absolute right-[8%] top-[25%] w-[8%] aspect-square z-12 cursor-pointer group"
            >
              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-slate-900/95 text-[8px] font-bold py-0.5 px-2 rounded whitespace-nowrap border border-slate-700 hidden group-hover:block text-yellow-300">
                Pak Budi &middot; Dagang Seed
              </div>
              {SVG_SPRITES.budi}
              {/* Seed shop stall stand visual details */}
              <div className="absolute -left-2 border-t border-yellow-800 w-10 bottom-0 bg-[#78350f] h-1" />
            </div>

            {/* 2. Teh Siti (Florist village girl near bottom right flower field) */}
            <div 
              id="npc-siti"
              onClick={(e) => {
                e.stopPropagation();
                talkToNPC(VILLAGE_NPCS[1]);
              }}
              className="absolute right-[8%] bottom-[12%] w-[8%] aspect-square z-12 cursor-pointer group"
            >
              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-slate-900/95 text-[8px] font-bold py-0.5 px-2 rounded whitespace-nowrap border border-slate-700 hidden group-hover:block text-rose-300">
                Teh Siti &middot; Obrolan & Quest
              </div>
              {SVG_SPRITES.siti}
            </div>

            {/* 3. Orange Cat Miko (sleeping on wooden log fence on left side near cabin) */}
            <div 
              id="npc-miko-cat"
              onClick={(e) => {
                e.stopPropagation();
                petTheCat();
              }}
              className="absolute left-[20%] top-[25%] w-[6%] aspect-square z-10 cursor-pointer group"
            >
              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-slate-900/95 text-[8px] font-bold py-0.5 px-2 rounded whitespace-nowrap border border-slate-700 hidden group-hover:block text-orange-300">
                Belai Kucing Miko🐾 (Klik)
              </div>
              
              {/* Flying petting hearts effect */}
              {showCatPettingHearts && (
                <div className="absolute -top-5 left-2 flex gap-1 pointer-events-none z-20 animate-ping">
                  <Smile className="w-4 h-4 text-pink-500 fill-pink-500" />
                </div>
              )}
              {SVG_SPRITES.miko}
            </div>

            {/* PLAYER MAIN CHARACTER SPRITE (FLUID TRANSITIONS ON COORDS) */}
            <div 
              id="main-character-sprite"
              className="absolute w-[8%] aspect-square z-20 transition-all duration-[400ms] pointer-events-none"
              style={{ 
                left: `${playerPos.x - 4}%`, 
                top: `${playerPos.y - 4}%`,
              }}
            >
              {playerDir === 'down' && SVG_SPRITES.player.down(isWalking)}
              {playerDir === 'up' && SVG_SPRITES.player.up(isWalking)}
              {playerDir === 'left' && SVG_SPRITES.player.left(isWalking)}
              {playerDir === 'right' && SVG_SPRITES.player.right(isWalking)}
              
              {/* Tiny pointer shadow feet */}
              <div className="absolute -bottom-1 inset-x-0 mx-auto w-3.5 h-1 bg-black/40 rounded-full blur-[0.5px]" />
            </div>

            {/* CLOUD FLYING COZY ANIMATIONS */}
            <div className="absolute top-[8%] left-[70%] w-12 h-6 bg-white/10 rounded-full filter blur-sm pointer-events-none animate-pulse" />
            <div className="absolute top-[18%] left-[10%] w-16 h-8 bg-white/10 rounded-full filter blur-sm pointer-events-none animate-pulse" />

          </div>

          {/* PLAY CONTROLLER TIPS */}
          <div className="bg-[#1e293b] border-2 border-[#334155] p-2.5 px-4 rounded-xl flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <span className="bg-[#0f172a] p-1 px-1.5 rounded-md font-bold text-yellow-500 border border-slate-700">W, A, S, D</span>
              <span>atau</span>
              <span className="bg-[#0f172a] p-1 px-1.5 rounded-md font-bold text-yellow-500 border border-slate-700">Klik Peta</span>
              <span>untuk menggerakkan MC berkendara keliling desa.</span>
            </div>
            
            <div className="flex gap-2 text-xs">
              <span className="text-slate-400">Total Tanaman Dipanen:</span>
              <span className="font-bold text-yellow-400">{totalHarvestedCount} Buah</span>
            </div>
          </div>

          {/* COOPERATIVE TOOL KIT SHELF */}
          <div className="bg-[#1e293b] border-4 border-[#334155] p-3 rounded-2xl flex flex-col gap-2.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-400" /> Peralatan & Tindakan Kebun
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              
              {/* Tool 1: Walk SELECT */}
              <button
                id="tool-walk"
                onClick={() => {
                  setSelectedTool('walk');
                  triggerNotification("Gunakan mode jalan-jalan santai.");
                }}
                className={`p-2 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                  selectedTool === 'walk' 
                    ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300' 
                    : 'border-slate-700 bg-[#0f172a] hover:border-slate-500 text-slate-300'
                }`}
              >
                <div className="w-7 h-7 flex items-center justify-center">
                  <Footprints className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold">Jalan Santai</span>
              </button>

              {/* Tool 2: HOE / Cangkul */}
              <button
                id="tool-hoe"
                onClick={() => {
                  setSelectedTool('hoe');
                  triggerNotification("Pilih Cangkul untuk menggemburkan tanah rumput hijau.");
                }}
                className={`p-2 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                  selectedTool === 'hoe' 
                    ? 'border-yellow-400 bg-yellow-950/40 text-yellow-300' 
                    : 'border-slate-700 bg-[#0f172a] hover:border-slate-500 text-slate-300'
                }`}
              >
                <div className="w-7 h-7 flex items-center justify-center">
                  {SVG_SPRITES.hoe}
                </div>
                <span className="text-[10px] font-bold">Cangkul Tanah</span>
              </button>

              {/* Tool 3: SEEDING / Tanam Bunga */}
              <div className="flex flex-col gap-0.5">
                <button
                  id="tool-seed"
                  onClick={() => {
                    setSelectedTool('seed');
                    triggerNotification(`Pilih Tanam Benih: ${CROP_TYPES[selectedSeed]?.name}`);
                  }}
                  className={`p-2 rounded-t-xl border-2 border-b-0 flex flex-col items-center gap-1.5 transition-all ${
                    selectedTool === 'seed' 
                      ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300' 
                      : 'border-slate-700 bg-[#0f172a] hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <div className="w-7 h-7 flex items-center justify-center text-cyan-400">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold">Tanam Benih</span>
                </button>
                {/* Seed selector micro */}
                <select 
                  id="seed-type-dropdown"
                  value={selectedSeed} 
                  onChange={(e) => {
                    setSelectedSeed(e.target.value);
                    setSelectedTool('seed');
                  }}
                  className="bg-[#0f172a] border-2 border-[#334155] rounded-b-xl text-[9px] py-1 text-center font-bold text-slate-200 outline-none cursor-pointer hover:border-cyan-400"
                >
                  {Object.values(CROP_TYPES).map((crop) => (
                    <option key={crop.id} value={crop.id} className="bg-[#1e293b]">
                      {crop.name} ({inventory.seeds[crop.id] || 0}x)
                    </option>
                  ))}
                </select>
              </div>

              {/* Tool 4: Water Can */}
              <button
                id="tool-water"
                onClick={() => {
                  setSelectedTool('water');
                  triggerNotification("Gunakan penyiram pada tanaman.");
                }}
                className={`p-2 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                  selectedTool === 'water' 
                    ? 'border-blue-400 bg-blue-950/40 text-blue-300' 
                    : 'border-slate-700 bg-[#0f172a] hover:border-slate-500 text-slate-300'
                }`}
              >
                <div className="w-7 h-7 flex items-center justify-center">
                  {SVG_SPRITES.wateringCan}
                </div>
                <span className="text-[10px] font-bold">Siram Air</span>
              </button>

              {/* Tool 5: Pest spray */}
              <button
                id="tool-pest"
                onClick={() => {
                  setSelectedTool('pest');
                  triggerNotification("Basmi ulat atau gemburkan gulma tanaman.");
                }}
                className={`p-2 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                  selectedTool === 'pest' 
                    ? 'border-pink-400 bg-pink-950/40 text-pink-300' 
                    : 'border-slate-700 bg-[#0f172a] hover:border-slate-500 text-slate-300'
                }`}
              >
                <div className="w-7 h-7 flex items-center justify-center">
                  {SVG_SPRITES.spray}
                </div>
                <span className="text-[10px] font-bold">Semprot Hama</span>
              </button>

              {/* Tool 6: Quick Panen */}
              <button
                id="tool-harvest"
                onClick={() => {
                  setSelectedTool('harvest');
                  triggerNotification("Klik tanaman matang berlabel PANEN.");
                }}
                className={`p-2 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                  selectedTool === 'harvest' 
                    ? 'border-yellow-400 bg-amber-950/40 text-yellow-300' 
                    : 'border-slate-700 bg-[#0f172a] hover:border-slate-500 text-slate-300'
                }`}
              >
                <div className="w-7 h-7 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-[10px] font-bold">Ambil Panen</span>
              </button>

            </div>
          </div>

        </div>

        {/* SIDEBAR MANAGER PANELS (RIGHT 1 COL) */}
        <div className="flex flex-col gap-4">
          
          {/* TABS SELECTOR */}
          <div className="flex bg-[#1e293b] p-1.5 rounded-xl border-2 border-[#334155] gap-1 shrink-0">
            <button
              id="tab-kebun"
              onClick={() => setActiveTab('kebun')}
              className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${activeTab === 'kebun' ? 'bg-[#0f172a] text-yellow-300 border border-slate-700' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Tas & Kebun
            </button>
            <button
              id="tab-shop"
              onClick={() => setActiveTab('shop')}
              className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${activeTab === 'shop' ? 'bg-[#0f172a] text-yellow-300 border border-slate-700' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Kedai Desa
            </button>
            <button
              id="tab-tasks"
              onClick={() => setActiveTab('tasks')}
              className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${activeTab === 'tasks' ? 'bg-[#0f172a] text-yellow-300 border border-slate-700' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Tugas
            </button>
          </div>

          {/* TAB CONTENT: BAG INVENTORY */}
          {activeTab === 'kebun' && (
            <div id="panel-inventory" className="bg-[#1e293b] border-4 border-[#334155] p-3 rounded-2xl flex-1 flex flex-col gap-3">
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-300 tracking-wider">🎒 Kantong Petualang Tani</h3>
                <p className="text-[10px] text-slate-400">Hasil panen dan persediaan benih.</p>
              </div>

              {/* Seed stockpile */}
              <div className="flex-1 flex flex-col gap-2">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">&middot; Stok Benih yang Dimiliki:</span>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(inventory.seeds).map((id) => {
                    const val = inventory.seeds[id] || 0;
                    const info = CROP_TYPES[id];
                    if (!info) return null;
                    return (
                      <div key={id} className="bg-[#0f172a] border border-slate-700 p-1 px-2.5 rounded-lg flex items-center justify-between text-xs">
                        <span className="text-slate-200 font-medium">{info.name.split(' ')[0]}</span>
                        <span className="bg-cyan-950 text-cyan-400 font-bold px-1.5 rounded text-[10px]">{val}x</span>
                      </div>
                    );
                  })}
                </div>

                {/* Crop harvested storage */}
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mt-3">&middot; Hasil Panen di Gudang Tas:</span>
                <div className="flex-1 overflow-y-auto max-h-[160px] flex flex-col gap-1.5 pr-1">
                  {Object.keys(inventory.harvested).map((id) => {
                    const val = inventory.harvested[id] || 0;
                    const info = CROP_TYPES[id];
                    if (!info) return null;
                    return (
                      <div key={id} className="bg-[#0f172a] border border-slate-700 p-2 rounded-lg flex items-center justify-between gap-2.5 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5">
                            {SVG_SPRITES.cropIcon(id, 4)}
                          </div>
                          <div>
                            <p className="text-slate-200 font-bold text-[11px]">{info.name}</p>
                            <p className="text-[9px] text-slate-400">Harga Jual: {info.sellPrice} Koin</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="bg-orange-950 text-orange-400 font-bold px-1.5 py-0.5 rounded text-[10px]">{val}x</span>
                          {val > 0 && (
                            <button 
                              id={`sell-crop-btn-${id}`}
                              onClick={() => sellHarvest(id)}
                              className="text-[10px] font-bold bg-yellow-500 hover:bg-yellow-400 text-slate-900 border border-yellow-600 px-1.5 py-0.5 rounded transition-colors"
                            >
                              Jual
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: SEED MERCHANT AND MARKETPLACE */}
          {activeTab === 'shop' && (
            <div id="panel-shop" className="bg-[#1e293b] border-4 border-[#334155] p-3 rounded-2xl flex-1 flex flex-col gap-3">
              <div>
                <h3 className="text-xs font-bold uppercase text-yellow-300 tracking-wider flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-yellow-400" /> Kedai Benih Pak Budi
                </h3>
                <p className="text-[10px] text-slate-400">Investasikan koin emasmu pada benih super.</p>
              </div>

              <div className="flex-1 overflow-y-auto max-h-[300px] flex flex-col gap-2 pr-1">
                {Object.values(CROP_TYPES).map((crop) => (
                  <div key={crop.id} className="bg-[#0f172a] border border-slate-700 p-2.5 rounded-xl flex flex-col gap-1.5">
                    <div className="flex justify-between items-start gap-1">
                      <div>
                        <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1">
                          <span className="w-4 h-4 inline-block">{SVG_SPRITES.cropIcon(crop.id, 4)}</span>
                          {crop.name}
                        </h4>
                        <p className="text-[9px] text-slate-400 mt-1">{crop.description}</p>
                      </div>
                      <span className="text-yellow-400 font-bold text-xs bg-yellow-950/40 border border-yellow-800/50 px-1.5 py-0.5 rounded select-none">
                        {crop.seedCost} Koin
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-1">
                      <div className="text-[9px] text-slate-400 flex gap-2">
                        <span>Panen: <b className="text-slate-200">+{crop.sellPrice} Koin</b></span>
                        <span>Mundur: <b className="text-slate-200">{10 - crop.growSpeed} hari</b></span>
                      </div>
                      <button
                        id={`buy-crop-btn-${crop.id}`}
                        onClick={() => buySeed(crop.id)}
                        className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 border-2 border-yellow-600 px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest transition-colors flex items-center gap-1"
                      >
                        Beli Benih
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: TASKS */}
          {activeTab === 'tasks' && (
            <div id="panel-tasks" className="bg-[#1e293b] border-4 border-[#334155] p-3 rounded-2xl flex-1 flex flex-col gap-3">
              <div>
                <h3 className="text-xs font-bold uppercase text-indigo-300 tracking-wider flex items-center gap-1.5">
                  <ListTodo className="w-4 h-4" /> Tugas Harian Perdesaan
                </h3>
                <p className="text-[10px] text-slate-400">Raihlah koin tamabahan untuk merawat kebunmu.</p>
              </div>

              <div className="flex-1 overflow-y-auto max-h-[300px] flex flex-col gap-2">
                {tasks.map((task) => (
                  <div key={task.id} className={`p-2.5 rounded-lg border flex flex-col gap-1.5 transition-colors ${task.completed ? 'bg-[#0f172a]/40 border-slate-800 text-slate-500' : 'bg-[#0f172a] border-slate-700'}`}>
                    <div className="flex justify-between items-start gap-1">
                      <p className={`text-xs font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>{task.text}</p>
                      {task.completed && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
                    </div>

                    <div className="flex justify-between items-center text-[10px] mt-1">
                      <span className="text-slate-400 font-semibold">Tingkat: {task.progress} / {task.target}</span>
                      <span className={`px-1.5 py-0.5 rounded font-bold ${task.completed ? 'bg-slate-800 text-slate-600' : 'bg-yellow-950/40 text-yellow-400 border border-yellow-900'}`}>
                        +{task.rewardCoins} Koin
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QUICK INSTRUCTIONS */}
          <div className="bg-[#1e293b] border-2 border-[#334155] p-3 rounded-xl">
            <h4 className="text-xs font-bold text-slate-200 mb-1 flex items-center gap-1">
              <HelpCircle className="w-4 h-4 text-orange-400" /> Panduan Pintar Kebun
            </h4>
            <ul className="text-[10px] text-slate-400 space-y-1 list-disc pl-3">
              <li>Cangkul rumput hijau untuk membuka tanah.</li>
              <li>Pilih benih di dropdown dan tanam di atas tanah gembur.</li>
              <li>Siram dengan air setiap kali tanaman mengering agar cepat mekar.</li>
              <li>Bicarakan dengan warga (Pak Budi / Siti) untuk bertransaksi atau quest.</li>
            </ul>
          </div>

        </div>

      </main>

      {/* FOOTER RETRO DIALOGUE DRAWER OVERLAY */}
      {activeNPC && (
        <div id="village-dialogue-window" className="fixed bottom-4 inset-x-4 max-w-4xl mx-auto z-40 bg-[#1e293b] border-4 border-[#3ea3fb] rounded-2xl shadow-2xl p-4 flex gap-4 animate-slide-up">
          
          {/* NPC AVATAR */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-900 border-4 border-slate-700 rounded-xl flex items-center justify-center p-1 shrink-0 select-none">
            {activeNPC.avatarSvg === 'budi' && SVG_SPRITES.budi}
            {activeNPC.avatarSvg === 'siti' && SVG_SPRITES.siti}
          </div>

          {/* DIALOG CONTENTS */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-yellow-400 font-bold text-sm sm:text-base tracking-wider">{activeNPC.name}</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 p-0.5 px-2 rounded-md font-semibold">{activeNPC.role}</span>
              </div>
              <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed min-h-[40px]">
                {typingText}
              </p>
            </div>

            {/* ACTION DIRECTIVES */}
            <div className="flex justify-between items-center mt-3 border-t border-slate-700/60 pt-3">
              <span className="text-[9px] text-[#4ea8ff] font-bold animate-pulse">KLIK LEWATKAN UNTUK LANJUT &raquo;</span>
              <div className="flex gap-2">
                {activeNPC.id === 'budi' && (
                  <button 
                    id="dialogue-shop-shortcut"
                    onClick={() => {
                      setActiveTab('shop');
                      setActiveNPC(null);
                      triggerNotification("Membuka kedai benih Pak Budi!");
                    }}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-2.5 py-1 rounded transition-colors"
                  >
                    Buka Kedai Benih
                  </button>
                )}
                {activeNPC.id === 'siti' && (
                  <button 
                    id="dialogue-quest-shortcut"
                    onClick={() => {
                      setActiveTab('tasks');
                      setActiveNPC(null);
                      triggerNotification("Membuka daftar tugas untuk Siti!");
                    }}
                    className="bg-pink-500 hover:bg-pink-400 text-[#0f172a] font-bold text-xs px-2.5 py-1 rounded transition-colors"
                  >
                    Tengok Tugas Desa
                  </button>
                )}
                <button
                  id="dialogue-next"
                  onClick={nextDialog}
                  className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs px-3 py-1 rounded border-b-2 border-yellow-600 transition-colors"
                >
                  {currentDialogIndex < activeNPC.dialogs.length - 1 ? "Lanjut" : "Tutup"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* BOTTOM LEGAL NOTE / META */}
      <footer id="developer-credits" className="bg-[#111827] border-t border-slate-800 p-3 text-center text-[10px] text-slate-500 flex flex-wrap justify-between items-center gap-2 px-8 z-10">
        <div>
          <span>&copy; 2026 Kebun Pixel Harmoni &middot; Musik Retro disintesis langsung.</span>
        </div>
        <div>
          <span>Semua Asset Pixel SVG Digambar Dinamis &middot; Dibuat dengan Kasih Sayang</span>
        </div>
      </footer>

    </div>
  );
}
