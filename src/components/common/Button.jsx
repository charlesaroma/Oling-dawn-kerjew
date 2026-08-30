import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'bg-gold-500 text-navy-900 shadow-elevated hover:bg-gold-600 hover:shadow-elevated-lg',
  secondary: 'bg-forest-800 text-white shadow-elevated hover:bg-forest-900 hover:shadow-elevated-lg',
  outline: 'border border-forest-800 text-forest-800 hover:bg-forest-800 hover:text-white',
  dark: 'bg-navy-900 text-gold-300 shadow-elevated hover:bg-navy-800 hover:shadow-elevated-lg',
};

export default function Button({ to, href, variant = 'primary', className = '', children, disabled, ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
    disabled ? '' : 'hover:-translate-y-0.5 active:translate-y-0'
  } ${VARIANTS[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
