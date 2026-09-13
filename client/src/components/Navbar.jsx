import { Link } from "react-router-dom";
import {
  Headphones,
  Plus,
  LayoutDashboard
} from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Headphones size={21} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              SupportCRM
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Customer Support
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">

          <Link
            to="/"
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 sm:flex"
          >
            <LayoutDashboard size={17} />
            Dashboard
          </Link>

          <Link
            to="/tickets/new"
            className="text-white flex items-center gap-1 rounded-lg bg-slate-800  px-3 py-2 text-sm font-medium  transition hover:bg-slate-800"
          >
            <Plus className="text-white" size={17} />
            <span className="text-white">New Ticket</span>
          </Link>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;