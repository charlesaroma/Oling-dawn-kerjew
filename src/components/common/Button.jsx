import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'bg-gold-500 text-navy-900 hover:bg-gold-600',
  secondary: 'bg-forest-800 text-white hover:bg-forest-900',
  outline: 'border border-forest-800 text-forest-800 hover:bg-forest-800 hover:text-white',
  dark: 'bg-navy-900 text-gold-300 hover:bg-navy-800',
};

export default function Button({ to, href, variant = 'primary', className = '', children, ...props }) {
  const classes = `inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold tracking-wide transition-colors ${VARIANTS[variant]} ${className}`;

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
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
