import {
  ClipboardList,
  House,
  Settings2,
  ShoppingBag,
  PiggyBank,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/", icon: House },
  { label: "Orders", path: "/orders", icon: ShoppingBag },
  { label: "Expenses", path: "/expenses", icon: ClipboardList },
  { label: "Savings", path: "/savings", icon: PiggyBank },
  { label: "Settings", path: "/settings", icon: Settings2 },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-5">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur">
        <div className="grid grid-cols-5 gap-0">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "app-nav-link flex flex-col items-center justify-center gap-0 rounded-2xl px-2 py-1 text-center text-sm font-medium transition-colors",
                  isActive
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-700",
                ].join(" ")
              }
            >
              <item.icon className="nav-icon h-5 w-5" strokeWidth={2} />
              <span className="text-2xs">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
