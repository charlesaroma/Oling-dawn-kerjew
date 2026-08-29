export default function Container({ children, className = '' }) {
  return <div className={`container-site px-6 ${className}`}>{children}</div>;
}
