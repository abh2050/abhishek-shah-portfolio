export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
export const sectionUrl = (section: string) => `/?section=${encodeURIComponent(section)}`;
export const legacySections: Record<string, string> = { home: 'home', about: 'delivery', experience: 'career', education: 'education', 'tech-stack': 'delivery', portfolio: 'work', publications: 'writing', podcasts: 'archive', contact: 'contact' };
