import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";

const BankDashboard = () => {
  const loanRequests = [
    {
      id: "LR-001",
      farmer: "Ramesh Kumar",
      village: "Kharkhoda, Sonipat",
      receiptId: "WR-2024-001",
      amount: 50000,
      crop: "Wheat - Grade A",
      quantity: 50,
      status: "Pending",
    },
    {
      id: "LR-002",
      farmer: "Suresh Patel",
      village: "Rohtak, Haryana",
      receiptId: "WR-2024-002",
      amount: 150000,
      crop: "Rice - Grade A",
      quantity: 75,
      status: "Pending",
    },
    {
      id: "LR-003",
      farmer: "Vikas Singh",
      village: "Jhajjar, Haryana",
      receiptId: "WR-2024-003",
      amount: 28000,
      crop: "Maize - Grade B",
      quantity: 25,
      status: "Pending",
    },
  ];

  const handleApprove = (id: string) => {
    toast.success(`Loan ${id} approved successfully!`);
  };

  const handleReject = (id: string) => {
    toast.error(`Loan ${id} rejected`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">State Bank of India</h1>
              <p className="text-sm opacity-90">Agricultural Loans Department</p>
            </div>
            <Building2 className="h-12 w-12" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-warning" />
                Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">3</div>
              <p className="text-sm text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="h-5 w-5 text-success" />
                Approved Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">12</div>
              <p className="text-sm text-muted-foreground">Loans approved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                Total Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">₹18.5L</div>
              <p className="text-sm text-muted-foreground">Disbursed today</p>
            </CardContent>
          </Card>
        </div>

        {/* Loan Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Loan Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loanRequests.map((request) => (
              <Card key={request.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{request.farmer}</h3>
                        <p className="text-sm text-muted-foreground">{request.village}</p>
                      </div>
                      <Badge className="bg-warning text-warning-foreground">
                        {request.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Receipt ID</span>
                        <p className="font-semibold">{request.receiptId}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Loan Amount</span>
                        <p className="font-semibold text-primary">
                          ₹{request.amount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Commodity</span>
                        <p className="font-semibold">{request.crop}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Quantity</span>
                        <p className="font-semibold">{request.quantity} Quintals</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1"
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link to={`/farmer/receipts/${request.receiptId}`}>
                          View Receipt
                        </Link>
                      </Button>
                      <Button
                        className="flex-1 bg-success hover:bg-success/90"
                        size="sm"
                        onClick={() => handleApprove(request.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        className="flex-1"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleReject(request.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BankDashboard;
