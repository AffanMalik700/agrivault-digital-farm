import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout } from "lucide-react";
import { toast } from "sonner";
import iconFarmer from "@/assets/icon-farmer.png";
import iconWarehouse from "@/assets/icon-warehouse.png";
import iconBank from "@/assets/icon-bank.png";
import iconTrader from "@/assets/icon-trader.png";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleParam = searchParams.get("role");
  
  const [selectedRole, setSelectedRole] = useState<string | null>(roleParam);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  
  // Signup fields
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");

  const roles = [
    { id: "farmer", name: "Farmer", icon: iconFarmer },
    { id: "warehouse", name: "Warehouse Operator", icon: iconWarehouse },
    { id: "bank", name: "Bank", icon: iconBank },
    { id: "trader", name: "Trader", icon: iconTrader },
  ];

  const handleSendOtp = () => {
    if (mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    setShowOtp(true);
    toast.success("OTP sent to your mobile number");
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    
    toast.success("Login successful!");
    
    // Navigate based on role
    switch (selectedRole) {
      case "farmer":
        navigate("/farmer/dashboard");
        break;
      case "warehouse":
        navigate("/warehouse/dashboard");
        break;
      case "bank":
        navigate("/bank/dashboard");
        break;
      case "trader":
        navigate("/trader/marketplace");
        break;
      default:
        navigate("/");
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <Sprout className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">AgriVault</h1>
            <p className="text-muted-foreground">Select your role to continue</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((role) => (
              <Card
                key={role.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedRole(role.id)}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <img src={role.icon} alt={role.name} className="w-16 h-16 mx-auto" />
                  <h3 className="font-semibold">{role.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Sprout className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-center text-2xl">
            {authMode === "login" ? "Login" : "Create Account"}
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            {roles.find((r) => r.id === selectedRole)?.name}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {authMode === "signup" && !showOtp && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="village">Village</Label>
                <Input
                  id="village"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="Enter your village"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="Enter your district"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter 10-digit mobile number"
              disabled={showOtp}
            />
          </div>

          {showOtp && (
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
              />
            </div>
          )}

          {!showOtp ? (
            <Button className="w-full" onClick={handleSendOtp}>
              Send OTP
            </Button>
          ) : (
            <Button className="w-full" onClick={handleVerifyOtp}>
              Verify & Continue
            </Button>
          )}

          <div className="text-center">
            <button
              className="text-sm text-primary hover:underline"
              onClick={() => {
                setAuthMode(authMode === "login" ? "signup" : "login");
                setShowOtp(false);
                setOtp("");
              }}
            >
              {authMode === "login"
                ? "New user? Create account"
                : "Already have an account? Login"}
            </button>
          </div>

          <div className="text-center">
            <button
              className="text-sm text-muted-foreground hover:underline"
              onClick={() => setSelectedRole(null)}
            >
              Change role
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
