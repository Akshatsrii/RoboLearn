import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h1 className="text-8xl font-bold text-cyan-600">
        404
      </h1>

      <h2 className="text-3xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-slate-600 mt-3">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-8 bg-cyan-600 text-white px-6 py-3 rounded-xl"
      >
        Go Home
      </Link>
    </div>
  );
}