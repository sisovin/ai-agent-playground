export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

export enum Language {
  ENGLISH = 'en',
  SPANISH = 'es',
  FRENCH = 'fr',
  GERMAN = 'de',
  CHINESE = 'zh'
}

export interface UserSettings {
  userId: string;
  theme: Theme;
  language: Language;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  aiTemperature: number;
  aiMaxTokens: number;
  aiModel: string;
  autoSaveProgress: boolean;
  showCompletionBadges: boolean;
  privacyMode: boolean;
  updatedAt?: string;
}

export const defaultSettings: Omit<UserSettings, 'userId'> = {
  theme: Theme.SYSTEM,
  language: Language.ENGLISH,
  emailNotifications: true,
  pushNotifications: false,
  marketingEmails: false,
  aiTemperature: 0.7,
  aiMaxTokens: 2048,
  aiModel: 'llama2',
  autoSaveProgress: true,
  showCompletionBadges: true,
  privacyMode: false
};
