import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Upload, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const NewIntake = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [farmerFound, setFarmerFound] = useState(false);
  const [commodity, setCommodity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [grade, setGrade] = useState("");
  const [moisture, setMoisture] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [receiptId, setReceiptId] = useState("");

  const handleSearchFarmer = () => {
    if (mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    setFarmerFound(true);
    toast.success("Farmer found: Ramesh Kumar");
  };

  const handleGenerateReceipt = () => {
    if (!commodity || !quantity || !grade || !moisture) {
      toast.error("Please fill all required fields");
      return;
    }
    const id = `WR-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;
    setReceiptId(id);
    setSubmitted(true);
    toast.success("Digital receipt generated successfully!");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-20 w-20 text-success" />
            </div>
            <h2 className="text-2xl font-bold">Receipt Generated!</h2>
            <p className="text-muted-foreground">
              Digital warehouse receipt has been created and sent to the farmer's account.
            </p>
            <div className="bg-secondary/50 p-6 rounded-lg space-y-3">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Receipt ID</p>
                <p className="text-2xl font-bold text-primary">{receiptId}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Commodity</p>
                  <p className="font-semibold">{commodity}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Grade</p>
                  <p className="font-semibold">{grade}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Quantity</p>
                  <p className="font-semibold">{quantity} Q</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Moisture</p>
                  <p className="font-semibold">{moisture}%</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Button className="w-full" onClick={() => navigate("/warehouse/dashboard")}>
                Back to Dashboard
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setFarmerFound(false);
                  setMobile("");
                  setCommodity("");
                  setQuantity("");
                  setGrade("");
                  setMoisture("");
                }}
              >
                Create Another Receipt
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/warehouse/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">New Intake</h1>
              <p className="text-sm text-muted-foreground">Generate Digital Receipt</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4 max-w-2xl">
        {/* Farmer Search */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Search Farmer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobile">Farmer Mobile Number</Label>
              <div className="flex gap-2">
                <Input
                  id="mobile"
                  type="tel"
                  maxLength={10}
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={farmerFound}
                />
                {!farmerFound && (
                  <Button onClick={handleSearchFarmer}>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                )}
              </div>
            </div>

            {farmerFound && (
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-success mb-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-semibold">Farmer Found</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Name:</strong> Ramesh Kumar
                  </p>
                  <p>
                    <strong>Village:</strong> Kharkhoda
                  </p>
                  <p>
                    <strong>District:</strong> Sonipat
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {farmerFound && (
          <>
            {/* Commodity Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Commodity Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="commodity">Commodity</Label>
                  <Select value={commodity} onValueChange={setCommodity}>
                    <SelectTrigger id="commodity">
                      <SelectValue placeholder="Select commodity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wheat">Wheat</SelectItem>
                      <SelectItem value="Rice">Rice</SelectItem>
                      <SelectItem value="Maize">Maize</SelectItem>
                      <SelectItem value="Soybean">Soybean</SelectItem>
                      <SelectItem value="Pulses">Pulses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (Quintals)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Select value={grade} onValueChange={setGrade}>
                      <SelectTrigger id="grade">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Grade A">Grade A</SelectItem>
                        <SelectItem value="Grade B">Grade B</SelectItem>
                        <SelectItem value="Grade C">Grade C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="moisture">Moisture Content (%)</Label>
                  <Input
                    id="moisture"
                    type="number"
                    placeholder="Enter moisture percentage"
                    value={moisture}
                    onChange={(e) => setMoisture(e.target.value)}
                    step="0.1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Upload Photos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                </div>
              </CardContent>
            </Card>

            {/* Generate Receipt Button */}
            <Button className="w-full h-12 text-lg" onClick={handleGenerateReceipt}>
              Generate Digital Receipt
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default NewIntake;
