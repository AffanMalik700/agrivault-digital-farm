import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Warehouse, Building2, Users } from "lucide-react";
import heroWarehouse from "@/assets/hero-warehouse.jpg";
import iconFarmer from "@/assets/icon-farmer.png";
import iconWarehouse from "@/assets/icon-warehouse.png";
import iconBank from "@/assets/icon-bank.png";
import iconTrader from "@/assets/icon-trader.png";

const Index = () => {
  const roles = [
    {
      title: "Farmer",
      icon: iconFarmer,
      description: "Store crops, get receipts, access loans",
      path: "/auth?role=farmer",
    },
    {
      title: "Warehouse Operator",
      icon: iconWarehouse,
      description: "Manage storage, issue digital receipts",
      path: "/auth?role=warehouse",
    },
    {
      title: "Bank",
      icon: iconBank,
      description: "Process loan applications, verify receipts",
      path: "/auth?role=bank",
    },
    {
      title: "Trader",
      icon: iconTrader,
      description: "Browse marketplace, purchase produce",
      path: "/auth?role=trader",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">AgriVault</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/auth">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/auth">Create Account</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Store crops safely. Get instant digital receipts.
              </h2>
              <p className="text-lg text-muted-foreground">
                AgriVault connects farmers, warehouses, banks, and traders in a secure digital platform. 
                Store your produce, access instant loans, and trade with confidence.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/auth">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroWarehouse}
                alt="Agricultural warehouse"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Choose Your Role</h3>
            <p className="text-muted-foreground text-lg">
              Select the role that best describes you
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => (
              <Link key={role.title} to={role.path}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="flex justify-center">
                      <img
                        src={role.icon}
                        alt={role.title}
                        className="w-20 h-20"
                      />
                    </div>
                    <h4 className="text-xl font-semibold">{role.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why AgriVault?</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 space-y-3">
                <Warehouse className="h-12 w-12 text-primary" />
                <h4 className="text-xl font-semibold">Secure Storage</h4>
                <p className="text-muted-foreground">
                  Store your crops in certified warehouses with instant digital receipts
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-3">
                <Building2 className="h-12 w-12 text-primary" />
                <h4 className="text-xl font-semibold">Easy Loans</h4>
                <p className="text-muted-foreground">
                  Get instant loan eligibility and apply directly with your receipts
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-3">
                <Users className="h-12 w-12 text-primary" />
                <h4 className="text-xl font-semibold">Trade Marketplace</h4>
                <p className="text-muted-foreground">
                  Connect with verified traders and sell your produce at best prices
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 AgriVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
