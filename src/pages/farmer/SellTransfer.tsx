import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

const SellTransfer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [askingPrice, setAskingPrice] = useState("");
  const [transferMobile, setTransferMobile] = useState("");
  const [listed, setListed] = useState(false);

  const receipt = {
    id: id || "WR-2024-001",
    crop: "Wheat",
    grade: "Grade A",
    quantity: 50,
    marketPrice: 2100,
    value: 105000,
  };

  const handleListForSale = () => {
    if (!askingPrice || parseFloat(askingPrice) <= 0) {
      toast.error("Please enter a valid asking price");
      return;
    }
    setListed(true);
    toast.success("Receipt listed for sale successfully!");
  };

  const handleTransfer = () => {
    if (transferMobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    toast.success("Transfer request sent successfully!");
    navigate("/farmer/receipts");
  };

  if (listed) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-20 w-20 text-success" />
            </div>
            <h2 className="text-2xl font-bold">Listed for Sale!</h2>
            <p className="text-muted-foreground">
              Your receipt has been listed on the marketplace. Traders can now view and make
              offers on your produce.
            </p>
            <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Commodity</span>
                <span className="font-semibold">
                  {receipt.crop} - {receipt.grade}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Quantity</span>
                <span className="font-semibold">{receipt.quantity} Quintals</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Asking Price</span>
                <span className="font-semibold text-primary">₹{parseFloat(askingPrice).toLocaleString()}/Quintal</span>
              </div>
            </div>
            <div className="space-y-2">
              <Button className="w-full" onClick={() => navigate("/trader/marketplace")}>
                View on Marketplace
              </Button>
              <Button className="w-full" variant="outline" onClick={() => navigate("/farmer/receipts")}>
                Back to Receipts
              </Button>
            </div>
          </CardContent>
        </Card>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to={`/farmer/receipts/${id}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Sell / Transfer</h1>
              <p className="text-sm text-muted-foreground">Receipt {receipt.id}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4">
        {/* Receipt Summary */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Commodity</span>
              <span className="font-semibold">
                {receipt.crop} - {receipt.grade}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-semibold">{receipt.quantity} Quintals</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Market Price</span>
              <span className="font-semibold text-success">₹{receipt.marketPrice}/Quintal</span>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="sell" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sell">Sell to Trader</TabsTrigger>
            <TabsTrigger value="transfer">Transfer</TabsTrigger>
          </TabsList>

          <TabsContent value="sell" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  List for Sale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Market Price</span>
                    <span className="font-semibold">₹{receipt.marketPrice}/Quintal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Value (Market)</span>
                    <span className="font-semibold text-success">₹{receipt.value.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asking-price">Your Asking Price (per Quintal)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      ₹
                    </span>
                    <Input
                      id="asking-price"
                      type="number"
                      placeholder={receipt.marketPrice.toString()}
                      value={askingPrice}
                      onChange={(e) => setAskingPrice(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Set your price per quintal. Traders can view and make offers.
                  </p>
                </div>

                {askingPrice && (
                  <div className="bg-primary/10 p-4 rounded-lg space-y-1">
                    <p className="text-sm text-muted-foreground">Total Expected Value</p>
                    <p className="text-2xl font-bold text-primary">
                      ₹{(parseFloat(askingPrice) * receipt.quantity).toLocaleString()}
                    </p>
                  </div>
                )}

                <Button className="w-full h-12" onClick={handleListForSale}>
                  List for Sale on Marketplace
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Once listed, your receipt will be visible to all verified
                  traders. You can accept offers or negotiate prices. The receipt status will
                  change to "Listed" until sold.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfer" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transfer to Another Farmer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transfer-mobile">Recipient Mobile Number</Label>
                  <Input
                    id="transfer-mobile"
                    type="tel"
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number"
                    value={transferMobile}
                    onChange={(e) => setTransferMobile(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    The recipient must be a registered farmer on AgriVault
                  </p>
                </div>

                <Button className="w-full h-12" onClick={handleTransfer}>
                  Send Transfer Request
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> The transfer will require acceptance from the recipient
                  farmer. Once accepted, the receipt ownership will be transferred completely.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default SellTransfer;
