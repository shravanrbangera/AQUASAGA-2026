export const FISH_SPECIES = {
  dolphin: {
    model: '/assets/dolphin_anim.glb',
    zone: ['SURFACE', 'SHALLOW_REEF'],
    size: 0.35,
    speed: 0.8,
    schoolSize: 3,
    isAvailable: true
  },
  clownfish: {
    model: '/models/fish/clownfish.glb',
    zone: ['SURFACE', 'SHALLOW_REEF'],
    size: 0.8,
    speed: 0.8,
    schoolSize: 20,
    isAvailable: false
  },
  tropicalFish: {
    model: '/models/fish/tropical-fish.glb',
    zone: ['SURFACE', 'SHALLOW_REEF'],
    size: 0.7,
    speed: 1.0,
    schoolSize: 30,
    isAvailable: false
  },
  butterflyfish: {
    model: '/models/fish/butterflyfish.glb',
    zone: ['SHALLOW_REEF'],
    size: 0.7,
    speed: 0.7,
    schoolSize: 15,
    isAvailable: false
  },
  turtle: {
    model: '/models/creatures/turtle.glb',
    zone: ['SURFACE', 'SHALLOW_REEF'],
    size: 3.0,
    speed: 0.25,
    schoolSize: 1,
    isAvailable: false
  },
  ray: {
    model: '/models/creatures/ray.glb',
    zone: ['SHALLOW_REEF', 'TWILIGHT'],
    size: 2.5,
    speed: 0.35,
    schoolSize: 2,
    isAvailable: false
  },
  shark: {
    model: '/models/creatures/shark.glb',
    zone: ['TWILIGHT', 'MIDNIGHT'],
    size: 5.0,
    speed: 0.4,
    schoolSize: 1,
    isAvailable: false
  },
  jellyfish: {
    model: '/models/creatures/jellyfish.glb',
    zone: ['TWILIGHT', 'MIDNIGHT', 'ABYSS'],
    size: 2.0,
    speed: 0.2,
    schoolSize: 5,
    isAvailable: false
  },
  squid: {
    model: '/models/creatures/squid.glb',
    zone: ['MIDNIGHT', 'ABYSS'],
    size: 4.0,
    speed: 0.2,
    schoolSize: 1,
    isAvailable: false
  },
  anglerfish: {
    model: '/models/deep-sea/anglerfish.glb',
    zone: ['MIDNIGHT', 'ABYSS', 'HADAL'],
    size: 1.5,
    speed: 0.15,
    schoolSize: 1,
    isAvailable: false
  },
  dragonfish: {
    model: '/models/deep-sea/dragonfish.glb',
    zone: ['ABYSS', 'HADAL'],
    size: 1.5,
    speed: 0.12,
    schoolSize: 2,
    isAvailable: false
  },
  giantSquid: {
    model: '/models/deep-sea/giant-squid.glb',
    zone: ['ABYSS', 'HADAL'],
    size: 8.0,
    speed: 0.08,
    schoolSize: 1,
    isAvailable: false
  }
};
