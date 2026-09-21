export const brawlerGameplay = (id = 'volt') => `/assets/characters/${id}/gameplay.svg`;
export const brawlerPortrait = (id = 'volt') => `/assets/characters/${id}/portrait.svg`;
export const brawlerAvatar = (id = 'volt') => `/assets/characters/${id}/avatar.svg`;

export function botKeyFromName(name = '') {
  const value = name.toLowerCase();
  if (value.includes('nova')) return 'bot-nova';
  if (value.includes('hex')) return 'bot-hex';
  return 'bot-pulse';
}

export const botGameplay = (name = '') => `/assets/characters/${botKeyFromName(name)}/gameplay.svg`;
export const botAvatar = (name = '') => `/assets/characters/${botKeyFromName(name)}/avatar.svg`;

export function brawlerIdFromName(name = '') {
  const value = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (value === 'nyx') return 'nyx';
  if (value === 'tankx') return 'tankx';
  return 'volt';
}
