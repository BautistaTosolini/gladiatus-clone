interface ExpeditionInfo {
  name: string;
  id: string;
  description: string;
}

interface Expeditions {
  grimwood: ExpeditionInfo,
  bandit: ExpeditionInfo,
  crypt: ExpeditionInfo,
  [key: string]: ExpeditionInfo;
}

export const expeditions: Expeditions = {
  grimwood: {
    name: 'Grimwood',
    id: 'grimwood',
    description: 'Grimwood is a place where magic and nature coexist in perfect harmony, though it also conceals dark secrets and mythical creatures lurking in the shadows of the dense forest. The atmosphere of the area is imbued with a melancholic and mysterious ambiance that beckons exploration and the discovery of the mysteries lying beneath its lush vegetation.'
  },
  bandit: {
    name: 'Bandit Camp',
    id: 'bandit',
    description: 'The Bandit Camp stands as a defiant outpost amidst the untamed wilderness, a lawless sanctuary hidden away from the watchful gaze of authority. This forsaken enclave serves as a refuge for a motley crew of outlaws, renegades, and those who have chosen to live beyond the confines of Balenos laws.',
  },
  crypt: {
    name: 'Ancient Crypt',
    id: 'crypt',
    description: `The Ancient Crypt of Grim Shadows is a foreboding and treacherous place, where death's presence is palpable, and the restless spirits of the deceased linger on as malevolent draugrs. Deep beneath the earth's surface, this crypt holds a grim and chilling history.`
  },
}