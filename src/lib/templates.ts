export interface ProfileTemplate {
    name: string;
    avatarUrl: string;
    bio: string;
    bgColor: string;
    links: {
      type: string;
      url: string;
      active: boolean;
    }[];
  }
  
  export const PROFILE_TEMPLATES: ProfileTemplate[] = [
    {
      name: 'Minimal',
      avatarUrl: '/images/avatar-minimal.jpg',
      bio: 'Minimalist creator.',
      bgColor: 'linear-gradient(to right, #1a2980, #26d0ce)',
      links: [
        { type: 'facebook', url: 'https://facebook.com/minimal', active: true },
        { type: 'instagram', url: 'https://instagram.com/minimal', active: true },
      ],
    },
    {
      name: 'Business',
      avatarUrl: '/images/avatar-business.jpg',
      bio: 'CEO | Speaker | Investor',
      bgColor: 'linear-gradient(to right, #000000, #434343)',
      links: [
        { type: 'twitter', url: 'https://twitter.com/business', active: true },
        { type: 'linkedin', url: 'https://linkedin.com/in/business', active: true },
      ],
    },
    {
      name: 'Content Creator',
      avatarUrl: '/images/avatar-creator.jpg',
      bio: '🎬 Let’s create something epic.',
      bgColor: 'linear-gradient(to right, #ff9966, #ff5e62)',
      links: [
        { type: 'youtube', url: 'https://youtube.com/@creator', active: true },
        { type: 'tiktok', url: 'https://tiktok.com/@creator', active: true },
      ],
    },
  ];
  