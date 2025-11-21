import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Receipts = () => {
  const receipts = [
    {
      id: "WR-2024-001",
      crop: "Wheat",
      grade: "Grade A",
      quantity: 50,
      warehouse: "Shakti WDRA Warehouse #12",
      status: "Available",
      value: 105000,
    },
    {
      id: "WR-2024-002",
      crop: "Rice",
      grade: "Grade A",
      quantity: 75,
      warehouse: "Shakti WDRA Warehouse #12",
      status: "Pledged",
      value: 213750,
    },
    {
      id: "WR-2024-003",
      crop: "Maize",
      grade: "Grade B",
      quantity: 25,
      warehouse: "Green Fields Storage #8",
      status: "Available",
      value: 41250,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-success text-success-foreground";
      case "Pledged":
        return "bg-warning text-warning-foreground";
      case "Sold":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/farmer/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">My Receipts</h1>
              <p className="text-sm text-muted-foreground">{receipts.length} Active</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4">
        {receipts.map((receipt) => (
          <Card key={receipt.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {receipt.crop} - {receipt.grade}
                      </h3>
                      <p className="text-sm text-muted-foreground">{receipt.id}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(receipt.status)}>{receipt.status}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Quantity</span>
                    <p className="font-semibold">{receipt.quantity} Quintals</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Est. Value</span>
                    <p className="font-semibold text-success">₹{receipt.value.toLocaleString()}</p>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Warehouse: </span>
                  <span className="font-medium">{receipt.warehouse}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" variant="outline" size="sm" asChild>
                    <Link to={`/farmer/receipts/${receipt.id}`}>View Details</Link>
                  </Button>
                  {receipt.status === "Available" && (
                    <>
                      <Button className="flex-1" size="sm" asChild>
                        <Link to={`/farmer/loan/${receipt.id}`}>Apply Loan</Link>
                      </Button>
                      <Button className="flex-1" size="sm" variant="secondary" asChild>
                        <Link to={`/farmer/sell/${receipt.id}`}>Sell</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Receipts;
