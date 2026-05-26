import { Link } from 'react-router-dom';

interface BrandLogoProps {
  to?: string;
  compact?: boolean;
  dark?: boolean;
}

export function BrandLogo({ to = '/', compact = false, dark = false }: BrandLogoProps) {
  const content = (
    <div className="flex items-center gap-3">
      <span className="brand-mark">
        <img src="/brand/logo-cv-builder-pro.png" alt="CV Builder Pro" />
      </span>
      {!compact ? (
        <div>
          <p className={dark ? 'font-black text-white' : 'font-black text-slate-950'}>CV Builder Pro</p>
          <p className={dark ? 'text-xs font-bold uppercase tracking-[0.18em] text-cyan-200' : 'text-xs font-bold uppercase tracking-[0.18em] text-slate-500'}>
            Workspace
          </p>
        </div>
      ) : null}
    </div>
  );

  return to ? (
    <Link to={to} aria-label="CV Builder Pro">
      {content}
    </Link>
  ) : (
    content
  );
}
