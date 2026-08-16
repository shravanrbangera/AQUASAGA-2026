export const OCEAN_ZONES = [
  { name: 'SURFACE', minDepth: 0, maxDepth: 120, waterColor: '#005b82', ambientLight: 3.0 },
  { name: 'SHALLOW_REEF', minDepth: 120, maxDepth: 280, waterColor: '#004a6e', ambientLight: 2.2 },
  { name: 'TWILIGHT', minDepth: 280, maxDepth: 480, waterColor: '#022b42', ambientLight: 1.5 },
  { name: 'MIDNIGHT', minDepth: 480, maxDepth: 680, waterColor: '#021624', ambientLight: 0.8 },
  { name: 'ABYSS', minDepth: 680, maxDepth: 880, waterColor: '#010c14', ambientLight: 0.4 },
  { name: 'HADAL', minDepth: 880, maxDepth: 1000, waterColor: '#01060a', ambientLight: 0.15 }
];

export function getOceanZone(depth) {
  if (depth < 120) return 'SURFACE';
  if (depth < 280) return 'SHALLOW_REEF';
  if (depth < 480) return 'TWILIGHT';
  if (depth < 680) return 'MIDNIGHT';
  if (depth < 880) return 'ABYSS';
  return 'HADAL';
}
