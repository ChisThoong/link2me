// lib/socials.ts
import {
    SiFacebook,
    SiYoutube,
    SiTiktok,
    SiInstagram,
    SiTelegram,
    SiLinkedin,
    SiDiscord,
    SiGithub,
    SiZalo,
  } from 'react-icons/si';
  import React from 'react';
 
  export const SOCIAL_OPTIONS = [
    { label: 'Facebook', value: 'facebook' },
    { label: 'Youtube', value: 'youtube' },
    { label: 'TikTok', value: 'tiktok' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'Telegram', value: 'telegram' },
    { label: 'LinkedIn', value: 'linkedin' },
    { label: 'Discord', value: 'discord' },
    { label: 'GitHub', value: 'github' },
    { label: 'Zalo', value: 'zalo' },
  ] as const;
  
  export type SocialType = (typeof SOCIAL_OPTIONS)[number]['value'];
  
  export const SOCIAL_ICONS: Record<SocialType, any> = {
    facebook: SiFacebook,
    youtube: SiYoutube,
    tiktok: SiTiktok,
    instagram: SiInstagram,
    telegram: SiTelegram,
    linkedin: SiLinkedin,
    discord: SiDiscord,
    github: SiGithub,
    zalo: SiZalo,
  };
  export const ICON_MAP: Record<string, React.ReactNode> = {
    facebook: React.createElement(SiFacebook, { className: 'w-6 h-6' }),
    youtube: React.createElement(SiYoutube, { className: 'w-6 h-6' }),
    tiktok: React.createElement(SiTiktok, { className: 'w-6 h-6' }),
    instagram: React.createElement(SiInstagram, { className: 'w-6 h-6' }),
    telegram: React.createElement(SiTelegram, { className: 'w-6 h-6' }),
    linkedin: React.createElement(SiLinkedin, { className: 'w-6 h-6' }),
    discord: React.createElement(SiDiscord, { className: 'w-6 h-6' }),
    github: React.createElement(SiGithub, { className: 'w-6 h-6' }),
    zalo: React.createElement(SiZalo, { className: 'w-6 h-6' }),
  };
  