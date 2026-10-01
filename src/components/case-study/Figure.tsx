import { useRef } from 'react';
import { Expand } from 'lucide-react';
import { getAsset } from '@/content/assets';
import { assetUrl } from '@/lib/urls';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
export function Figure({ id, priority = false }: {id: string; priority?: boolean}) {
  const asset = getAsset(id); const [small, full] = asset.outputs; const fullLink = useRef<HTMLAnchorElement>(null);
  return <figure className="evidence-figure">
    <Dialog><DialogTrigger asChild><button className="figure-button" aria-label={`Enlarge figure: ${asset.alt}`}>
      <img src={assetUrl(full.path)} srcSet={`${assetUrl(small.path)} ${small.width}w, ${assetUrl(full.path)} ${full.width}w`} sizes="(max-width: 768px) 94vw, 1100px" width={full.width} height={full.height} alt={asset.alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}/><span className="enlarge"><Expand size={15}/>Enlarge figure</span>
    </button></DialogTrigger>
    <DialogContent className="figure-dialog" onOpenAutoFocus={e => { e.preventDefault(); fullLink.current?.focus(); }}><DialogTitle>Evidence figure</DialogTitle><DialogDescription>{asset.caption}</DialogDescription><div className="figure-viewport"><img src={assetUrl(full.path)} width={full.width} height={full.height} alt={asset.alt}/></div><a ref={fullLink} className="text-link" href={assetUrl(full.path)} target="_blank" rel="noopener noreferrer">Open full-size image in a new tab</a></DialogContent></Dialog>
    <figcaption>{asset.caption}<span className="attribution">{asset.attribution}</span></figcaption>
  </figure>;
}
