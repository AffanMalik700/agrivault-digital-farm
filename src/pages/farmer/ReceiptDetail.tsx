import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, MapPin, Calendar, Package, TrendingUp, Building } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const ReceiptDetail = () => {
  const { id } = useParams();

  // Mock data
  const receipt = {
    id: id || "WR-2024-001",
    crop: "Wheat",
    grade: "Grade A",
    quantity: 50,
    warehouse: "Shakti WDRA Warehouse #12",
    warehouseAddress: "Sector 12, Industrial Area, Sonipat, Haryana",
    storageDate: "15 Jan 2024",
    validity: "15 Jul 2024",
    status: "Available",
    value: 105000,
    loanEligibility: 73500,
    moisture: "12%",
    quality: "Superior",
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/farmer/receipts">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Receipt Details</h1>
              <p className="text-sm text-muted-foreground">{receipt.id}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4">
        {/* Status Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold">{receipt.crop}</h2>
                <p className="text-muted-foreground">{receipt.grade}</p>
              </div>
              <Badge className="bg-success text-success-foreground">{receipt.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Quantity</span>
                <p className="text-xl font-semibold">{receipt.quantity} Quintals</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Est. Value</span>
                <p className="text-xl font-semibold text-success">₹{receipt.value.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commodity Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5 text-primary" />
              Commodity Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Commodity</span>
              <span className="font-semibold">{receipt.crop}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Grade</span>
              <span className="font-semibold">{receipt.grade}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Moisture Content</span>
              <span className="font-semibold">{receipt.moisture}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quality</span>
              <span className="font-semibold">{receipt.quality}</span>
            </div>
          </CardContent>
        </Card>

        {/* Warehouse Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building className="h-5 w-5 text-primary" />
              Warehouse Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-muted-foreground">Warehouse</span>
              <p className="font-semibold">{receipt.warehouse}</p>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
              <span className="text-sm">{receipt.warehouseAddress}</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <MapPin className="h-4 w-4 mr-2" />
              View on Map
            </Button>
          </CardContent>
        </Card>

        {/* Storage Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-primary" />
              Storage Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Storage Date</span>
              <span className="font-semibold">{receipt.storageDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Valid Until</span>
              <span className="font-semibold">{receipt.validity}</span>
            </div>
          </CardContent>
        </Card>

        {/* Loan Eligibility */}
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-accent" />
              Loan Eligibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent mb-2">
              ₹{receipt.loanEligibility.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              70% of estimated market value
            </p>
            <Button className="w-full" asChild>
              <Link to={`/farmer/loan/${receipt.id}`}>Apply for Loan</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="secondary" className="w-full" asChild>
            <Link to={`/farmer/sell/${receipt.id}`}>Sell / Transfer</Link>
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ReceiptDetail;
