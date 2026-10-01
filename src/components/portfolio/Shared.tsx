import { useEffect, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/content/profile';
import { assetUrl } from '@/lib/urls';
export function ExternalLink({ href, children, className = '' }: {href: string; children: ReactNode; className?: string}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`external-link ${className}`}>{children}<ArrowUpRight size={16} aria-hidden="true"/><span className="sr-only"> (opens in a new tab)</span></a>;
}
export function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title === profile.name ? `${profile.name} — ${profile.headline}` : `${title} — ${profile.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title,description]);
  return null;
}
export function ResumeLink({ className = '' }: {className?: string}) {
  return profile.resume ? <a className={className} href={assetUrl(profile.resume)} download>Download résumé</a> : <a className={className} href={`mailto:${profile.email}?subject=Current%20r%C3%A9sum%C3%A9%20request`}>Request résumé <ArrowUpRight size={16} aria-hidden="true"/></a>;
}
