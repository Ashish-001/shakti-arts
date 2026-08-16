import { Link } from "react-router-dom";

export default function Logo({ className = "" }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-navy-700">
        <span className="h-3.5 w-3.5 rotate-45 bg-copper-400" />
      </span>
      <span className="font-display text-lg font-semibold tracking-wide text-navy-800">
        SHAKTI <span className="font-normal text-copper-500">ARTS</span>
      </span>
    </Link>
  );
}
