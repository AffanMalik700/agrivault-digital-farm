import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Warehouse, Package, FileText, TrendingUp, Plus } from "lucide-react";

const WarehouseDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Shakti WDRA Warehouse</h1>
              <p className="text-sm opacity-90">#12 - Sonipat, Haryana</p>
            </div>
            <Warehouse className="h-12 w-12" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5 text-primary" />
                Today's Inward
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">12</div>
              <p className="text-sm text-muted-foreground">New intakes today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-success" />
                Total Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">2,450</div>
              <p className="text-sm text-muted-foreground">Quintals stored</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-accent" />
                Receipts Issued
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">8</div>
              <p className="text-sm text-muted-foreground">Receipts today</p>
            </CardContent>
          </Card>
        </div>

        {/* New Intake Button */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">New Intake</h3>
                <p className="text-muted-foreground">
                  Register new crop storage and generate digital receipt
                </p>
              </div>
              <Button size="lg" asChild>
                <Link to="/warehouse/intake">
                  <Plus className="h-5 w-5 mr-2" />
                  New Intake
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  farmer: "Ramesh Kumar",
                  crop: "Wheat - Grade A",
                  quantity: "50 Q",
                  time: "10 mins ago",
                },
                {
                  farmer: "Suresh Patel",
                  crop: "Rice - Grade A",
                  quantity: "75 Q",
                  time: "25 mins ago",
                },
                {
                  farmer: "Vikas Singh",
                  crop: "Maize - Grade B",
                  quantity: "25 Q",
                  time: "1 hour ago",
                },
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-semibold">{activity.farmer}</p>
                    <p className="text-sm text-muted-foreground">{activity.crop}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{activity.quantity}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Storage Capacity */}
        <Card>
          <CardHeader>
            <CardTitle>Storage Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Stock</span>
                <span className="font-semibold">2,450 Quintals</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Capacity</span>
                <span className="font-semibold">5,000 Quintals</span>
              </div>
              <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: "49%" }} />
              </div>
              <p className="text-xs text-muted-foreground">49% capacity utilized</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WarehouseDashboard;
