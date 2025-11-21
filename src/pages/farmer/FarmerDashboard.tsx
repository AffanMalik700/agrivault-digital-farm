import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, FileText, IndianRupee, TrendingUp, MapPin } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const FarmerDashboard = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Hi, Ramesh 👋</h1>
            <div className="flex items-center gap-1 text-sm opacity-90">
              <MapPin className="h-4 w-4" />
              <span>Kharkhoda, Sonipat</span>
            </div>
          </div>
          <Sprout className="h-10 w-10" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Main Stats Cards */}
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Stored Produce
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-3xl font-bold text-primary">3</span>
                  <span className="text-sm text-muted-foreground">Active Receipts</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Quantity</span>
                  <span className="font-semibold">150 Quintals</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Value</span>
                  <span className="font-semibold text-success">₹4,50,000</span>
                </div>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link to="/farmer/receipts">View All Receipts</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <IndianRupee className="h-5 w-5 text-accent" />
                Loan Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent">₹3,15,000</div>
                <p className="text-sm text-muted-foreground">
                  Based on your stored produce value
                </p>
              </div>
              <Button className="w-full mt-4" variant="default" asChild>
                <Link to="/farmer/receipts">Apply for Loan</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                Market Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Wheat (Grade A)</span>
                  <div className="text-right">
                    <div className="font-semibold text-success">₹2,100/Quintal</div>
                    <div className="text-xs text-success">↑ 3.2%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Rice (Grade A)</span>
                  <div className="text-right">
                    <div className="font-semibold text-success">₹2,850/Quintal</div>
                    <div className="text-xs text-success">↑ 1.8%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Maize (Grade A)</span>
                  <div className="text-right">
                    <div className="font-semibold text-destructive">₹1,650/Quintal</div>
                    <div className="text-xs text-destructive">↓ 0.5%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-20" asChild>
            <Link to="/farmer/receipts">
              <div className="text-center">
                <FileText className="h-6 w-6 mx-auto mb-1" />
                <div className="text-sm">My Receipts</div>
              </div>
            </Link>
          </Button>
          <Button variant="outline" className="h-20" asChild>
            <Link to="/trader/marketplace">
              <div className="text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-1" />
                <div className="text-sm">Marketplace</div>
              </div>
            </Link>
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default FarmerDashboard;
