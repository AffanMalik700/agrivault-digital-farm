import { NavLink } from "@/components/NavLink";
import { Home, FileText, CreditCard, User } from "lucide-react";

const BottomNav = () => {
  const navItems = [
    { to: "/farmer/dashboard", icon: Home, label: "Home" },
    { to: "/farmer/receipts", icon: FileText, label: "Receipts" },
    { to: "/farmer/loans", icon: CreditCard, label: "Loans" },
    { to: "/farmer/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
