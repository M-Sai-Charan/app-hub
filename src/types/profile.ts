// types/profile.ts

export type Theme = 'light' | 'dark' | 'system';
export type NotificationChannel = 'email' | 'sms' | 'push';
export type Locale = 'en' | 'fr' | 'hi' | 'ja' | 'de';

export interface NotificationPreferences {
  feedbackResponses: NotificationChannel[];
  mentions: NotificationChannel[];
  updates: NotificationChannel[];
  promotions: NotificationChannel[];
}

export interface Profile {
  fullName: string;
  displayName: string;
  username: string;
  email: string;
  phoneNumber?: string;
  avatarUrl: string;
  bio?: string;
  theme: Theme;
  notifications: NotificationPreferences;
  locale: Locale;
  landingPage: 'dashboard' | 'my-reports' | 'discover';
  badges: string[];
  achievements: number;
  connectedAccounts: string[]; // e.g., ['Google', 'GitHub']
  loginHistory: {
    device: string;
    location: string;
    timestamp: string;
  }[];
}
