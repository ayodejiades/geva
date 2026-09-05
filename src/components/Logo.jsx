import { Link } from 'react-router-dom';

function Logo({ className = "text-4xl", light = false }) {
  return (
    <Link to="/" className="inline-block select-none">
      <div className={`font-heading font-extrabold ${light ? 'text-white' : 'text-ink'} tracking-tight ${className}`}>
        ge<span className="text-rose">va</span>
      </div>
    </Link>
  );
}

export default Logo;
