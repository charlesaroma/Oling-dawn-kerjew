import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'bg-gold-500 text-ink-900 hover:bg-gold-400',
  secondary: 'bg-forest-800 text-surface hover:bg-forest-900',
  outline: 'border border-forest-800/25 text-forest-800 hover:border-forest-800 hover:bg-forest-800 hover:text-surface',
  ghost: 'border border-surface/25 text-surface hover:border-surface/60 hover:bg-surface/10',
  dark: 'bg-ink-900 text-gold-400 hover:bg-ink-800',
};

export default function Button({ to, href, variant = 'primary', className = '', children, disabled, ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50 ${
    disabled ? '' : 'hover:-translate-y-0.5 active:translate-y-0'
  } ${VARIANTS[variant]} ${className}`;

  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>;
  if (href) return <a href={href} className={classes} {...props}>{children}</a>;
  return <button type="button" className={classes} disabled={disabled} {...props}>{children}</button>;
}
