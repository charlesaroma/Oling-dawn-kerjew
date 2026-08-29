import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'bg-accent-500 text-white hover:bg-accent-600',
  secondary: 'bg-primary-700 text-white hover:bg-primary-800',
  outline: 'border border-white text-white hover:bg-white hover:text-primary-800',
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
