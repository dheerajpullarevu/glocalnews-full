import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <svg
        className="h-10 w-10 text-red-600"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Globe Icon */}
        <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" />
        <path
          d="M32 2C32 2 48 16 48 32C48 48 32 62 32 62"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          d="M32 2C32 2 16 16 16 32C16 48 32 62 32 62"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          d="M2 32H62"
          stroke="currentColor"
          strokeWidth="4"
        />
        {/* News Icon */}
        <rect
          x="24"
          y="24"
          width="16"
          height="16"
          fill="currentColor"
          className="text-red-500"
        />
        <path
          d="M28 28H36M28 32H36M28 36H36"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
      <div className="ml-3">
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-500">
          Glocal
        </span>
        <span className="text-2xl font-bold text-gray-800">News</span>
      </div>
    </Link>
  );
}