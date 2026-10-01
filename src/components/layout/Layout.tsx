import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigationType } from 'react-router-dom';
import { ArrowUpRight, Menu } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { profile } from '@/content/profile';
import { sectionUrl } from '@/lib/urls';

const nav = [['Selected work', 'work'], ['Career', 'career'], ['Writing', 'writing'], ['Contact', 'contact']];
export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map<string, number>());
  const firstRoute = useRef(true);
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener('change', closeOnDesktop);
    return () => media.removeEventListener('change', closeOnDesktop);
  }, []);
  useEffect(() => {
    const section = new URLSearchParams(location.search).get('section');
    const id = requestAnimationFrame(() => {
      if (section && location.pathname === '/') {
        const target = document.getElementById(section);
        target?.scrollIntoView({ block: 'start' });
        target?.focus({ preventScroll: true });
      } else if (navigationType === 'POP' && positions.current.has(location.key)) {
        window.scrollTo(0, positions.current.get(location.key) ?? 0);
      } else {
        window.scrollTo(0, 0);
        if (!firstRoute.current) document.getElementById('main')?.focus({ preventScroll: true });
      }
      firstRoute.current = false;
    });
    const remember = () => positions.current.set(location.key, window.scrollY);
    window.addEventListener('scroll', remember, { passive: true });
    return () => { cancelAnimationFrame(id); window.removeEventListener('scroll', remember); };
  }, [location, navigationType]);
  return <>
    <a className="skip-link" href="#main" onClick={e => { e.preventDefault(); document.getElementById('main')?.focus(); }}>Skip to content</a>
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" to="/" aria-label="as. Abhishek Shah home"><span className="monogram" aria-hidden="true">as<span>.</span></span><span>Abhishek Shah</span></Link>
        <nav aria-label="Main navigation" className="desktop-nav">{nav.map(([label, id]) => <Link key={id} to={sectionUrl(id)}>{label}</Link>)}</nav>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><button className="mobile-toggle" aria-controls="mobile-navigation" aria-expanded={open}><Menu size={21} /><span>Menu</span></button></DialogTrigger>
          <DialogContent id="mobile-navigation" className="mobile-menu"><DialogTitle>Explore the portfolio</DialogTitle><DialogDescription>Work, experience, and ways to connect.</DialogDescription>
            <nav aria-label="Mobile navigation">{nav.map(([label,id]) => <Link key={id} to={sectionUrl(id)} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={18} /></Link>)}</nav>
          </DialogContent>
        </Dialog>
      </div>
    </header>
    <main id="main" tabIndex={-1}>{children}</main>
    <footer className="site-footer"><div className="shell footer-inner"><Link className="brand" to="/">Abhishek Shah<span className="accent">.</span></Link><p>Built around evidence. Based in Beaverton, Oregon.</p><span>© {new Date().getFullYear()} {profile.name}</span></div></footer>
  </>;
}
