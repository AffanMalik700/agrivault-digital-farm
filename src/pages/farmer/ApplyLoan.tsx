import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, IndianRupee, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

const ApplyLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState([50000]);
  const [selectedBank, setSelectedBank] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const receipt = {
    id: id || "WR-2024-001",
    crop: "Wheat",
    grade: "Grade A",
    quantity: 50,
    value: 105000,
    maxLoan: 73500,
  };

  const banks = [
    { id: "sbi", name: "State Bank of India", rate: "7.5%" },
    { id: "hdfc", name: "HDFC Bank", rate: "8.0%" },
    { id: "icici", name: "ICICI Bank", rate: "8.2%" },
    { id: "pnb", name: "Punjab National Bank", rate: "7.8%" },
  ];

  const handleSubmit = () => {
    if (!selectedBank) {
      toast.error("Please select a bank");
      return;
    }
    setSubmitted(true);
    toast.success("Loan application submitted successfully!");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-20 w-20 text-success" />
            </div>
            <h2 className="text-2xl font-bold">Application Submitted!</h2>
            <p className="text-muted-foreground">
              Your loan application has been submitted successfully. The bank will review and
              respond within 24-48 hours.
            </p>
            <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Loan Amount</span>
                <span className="font-semibold">₹{loanAmount[0].toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bank</span>
                <span className="font-semibold">
                  {banks.find((b) => b.id === selectedBank)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Receipt ID</span>
                <span className="font-semibold">{receipt.id}</span>
              </div>
            </div>
            <Button className="w-full" onClick={() => navigate("/farmer/dashboard")}>
              Back to Dashboard
            </Button>
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
              <h1 className="text-xl font-bold">Apply for Loan</h1>
              <p className="text-sm text-muted-foreground">Against receipt {receipt.id}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4">
        {/* Receipt Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Receipt Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
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
              <span className="text-muted-foreground">Estimated Value</span>
              <span className="font-semibold text-success">₹{receipt.value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Max Loan Amount</span>
              <span className="font-semibold text-primary">₹{receipt.maxLoan.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Loan Amount Slider */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <IndianRupee className="h-5 w-5 text-primary" />
              Loan Amount
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label>Select Amount</Label>
                <span className="text-2xl font-bold text-primary">
                  ₹{loanAmount[0].toLocaleString()}
                </span>
              </div>
              <Slider
                value={loanAmount}
                onValueChange={setLoanAmount}
                max={receipt.maxLoan}
                min={10000}
                step={5000}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹10,000</span>
                <span>₹{receipt.maxLoan.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Bank</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Choose Bank</Label>
              <Select value={selectedBank} onValueChange={setSelectedBank}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank.id} value={bank.id}>
                      <div className="flex justify-between w-full">
                        <span>{bank.name}</span>
                        <span className="text-muted-foreground ml-4">@ {bank.rate}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedBank && (
              <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Interest Rate</span>
                  <span className="font-semibold">
                    {banks.find((b) => b.id === selectedBank)?.rate} per annum
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated EMI (12 months)</span>
                  <span className="font-semibold">
                    ₹{Math.round((loanAmount[0] * 1.075) / 12).toLocaleString()}/month
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> The loan will be processed within 24-48 hours. Your receipt
              will be marked as "Pledged" once approved. Interest rates are subject to bank
              policies and may vary.
            </p>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button className="w-full h-12 text-lg" onClick={handleSubmit}>
          Submit Loan Application
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default ApplyLoan;
