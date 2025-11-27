// import { useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Sprout } from "lucide-react";
// import { toast } from "sonner";
// import iconFarmer from "@/assets/icon-farmer.png";
// import iconWarehouse from "@/assets/icon-warehouse.png";
// import iconBank from "@/assets/icon-bank.png";
// import iconTrader from "@/assets/icon-trader.png";

// const Auth = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const roleParam = searchParams.get("role");
  
//   const [selectedRole, setSelectedRole] = useState<string | null>(roleParam);
//   const [authMode, setAuthMode] = useState<"login" | "signup">("login");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [showOtp, setShowOtp] = useState(false);
  
//   // Signup fields
//   const [name, setName] = useState("");
//   const [village, setVillage] = useState("");
//   const [district, setDistrict] = useState("");

//   const roles = [
//     { id: "farmer", name: "Farmer", icon: iconFarmer },
//     { id: "warehouse", name: "Warehouse Operator", icon: iconWarehouse },
//     { id: "bank", name: "Bank", icon: iconBank },
//     { id: "trader", name: "Trader", icon: iconTrader },
//   ];

//   const handleSendOtp = () => {
//     if (mobile.length !== 10) {
//       toast.error("Please enter a valid 10-digit mobile number");
//       return;
//     }
//     setShowOtp(true);
//     toast.success("OTP sent to your mobile number");
//   };

//   const handleVerifyOtp = () => {
//     if (otp.length !== 6) {
//       toast.error("Please enter a valid 6-digit OTP");
//       return;
//     }
    
//     toast.success("Login successful!");
    
//     // Navigate based on role
//     switch (selectedRole) {
//       case "farmer":
//         navigate("/farmer/dashboard");
//         break;
//       case "warehouse":
//         navigate("/warehouse/dashboard");
//         break;
//       case "bank":
//         navigate("/bank/dashboard");
//         break;
//       case "trader":
//         navigate("/trader/marketplace");
//         break;
//       default:
//         navigate("/");
//     }
//   };

//   if (!selectedRole) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center p-4">
//         <div className="w-full max-w-4xl space-y-8">
//           <div className="text-center space-y-2">
//             <div className="flex justify-center mb-4">
//               <Sprout className="h-12 w-12 text-primary" />
//             </div>
//             <h1 className="text-3xl font-bold">AgriVault</h1>
//             <p className="text-muted-foreground">Select your role to continue</p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {roles.map((role) => (
//               <Card
//                 key={role.id}
//                 className="cursor-pointer hover:shadow-lg transition-shadow"
//                 onClick={() => setSelectedRole(role.id)}
//               >
//                 <CardContent className="p-6 text-center space-y-4">
//                   <img src={role.icon} alt={role.name} className="w-16 h-16 mx-auto" />
//                   <h3 className="font-semibold">{role.name}</h3>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <div className="flex justify-center mb-4">
//             <Sprout className="h-10 w-10 text-primary" />
//           </div>
//           <CardTitle className="text-center text-2xl">
//             {authMode === "login" ? "Login" : "Create Account"}
//           </CardTitle>
//           <p className="text-center text-sm text-muted-foreground">
//             {roles.find((r) => r.id === selectedRole)?.name}
//           </p>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {authMode === "signup" && !showOtp && (
//             <>
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter your name"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="village">Village</Label>
//                 <Input
//                   id="village"
//                   value={village}
//                   onChange={(e) => setVillage(e.target.value)}
//                   placeholder="Enter your village"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="district">District</Label>
//                 <Input
//                   id="district"
//                   value={district}
//                   onChange={(e) => setDistrict(e.target.value)}
//                   placeholder="Enter your district"
//                 />
//               </div>
//             </>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="mobile">Mobile Number</Label>
//             <Input
//               id="mobile"
//               type="tel"
//               maxLength={10}
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               placeholder="Enter 10-digit mobile number"
//               disabled={showOtp}
//             />
//           </div>

//           {showOtp && (
//             <div className="space-y-2">
//               <Label htmlFor="otp">Enter OTP</Label>
//               <Input
//                 id="otp"
//                 type="text"
//                 maxLength={6}
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 placeholder="Enter 6-digit OTP"
//               />
//             </div>
//           )}

//           {!showOtp ? (
//             <Button className="w-full" onClick={handleSendOtp}>
//               Send OTP
//             </Button>
//           ) : (
//             <Button className="w-full" onClick={handleVerifyOtp}>
//               Verify & Continue
//             </Button>
//           )}

//           <div className="text-center">
//             <button
//               className="text-sm text-primary hover:underline"
//               onClick={() => {
//                 setAuthMode(authMode === "login" ? "signup" : "login");
//                 setShowOtp(false);
//                 setOtp("");
//               }}
//             >
//               {authMode === "login"
//                 ? "New user? Create account"
//                 : "Already have an account? Login"}
//             </button>
//           </div>

//           <div className="text-center">
//             <button
//               className="text-sm text-muted-foreground hover:underline"
//               onClick={() => setSelectedRole(null)}
//             >
//               Change role
//             </button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Auth;

// import { FormEvent, useState } from "react";
// import { useNavigate } from "react-router-dom";

// type Mode = "login" | "register";

// const API_URL = "http://localhost:4000/api/auth";

// interface AuthResponse {
//   message: string;
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     role: "farmer" | "warehouse" | "bank" | "trader" | "admin";
//   };
//   token: string;
// }

// const Auth = () => {
//   const [mode, setMode] = useState<Mode>("login");
//   const [name, setName] = useState("");
//   const [role, setRole] = useState<"farmer" | "warehouse" | "bank" | "trader">(
//     "farmer"
//   );
//   const [email, setEmail] = useState("farmer@example.com");
//   const [password, setPassword] = useState("password123");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [info, setInfo] = useState<string | null>(null);

//   const navigate = useNavigate();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setInfo(null);

//     try {
//       const url =
//         mode === "login" ? `${API_URL}/login` : `${API_URL}/register`;

//       const body =
//         mode === "login"
//           ? { email, password }
//           : { name, email, password, role };

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       const data = (await res.json()) as Partial<AuthResponse> & {
//         error?: string;
//       };

//       if (!res.ok) {
//         throw new Error(data.error || "Request failed");
//       }

//       if (!data.token || !data.user) {
//         throw new Error("Invalid response from server");
//       }

//       // Save auth info
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       setInfo(data.message || (mode === "login" ? "Logged in" : "Registered"));

//       // Redirect based on role
//       switch (data.user.role) {
//         case "farmer":
//           navigate("/farmer/dashboard");
//           break;
//         case "warehouse":
//           navigate("/warehouse/dashboard");
//           break;
//         case "bank":
//           navigate("/bank/dashboard");
//           break;
//         case "trader":
//           navigate("/trader/marketplace");
//           break;
//         default:
//           navigate("/");
//       }
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-50">
//       <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-4">
//         <div className="flex justify-center gap-2 mb-2">
//           <button
//             onClick={() => {
//               setMode("login");
//               setError(null);
//               setInfo(null);
//             }}
//             className={`px-4 py-2 rounded-lg text-sm font-medium ${
//               mode === "login"
//                 ? "bg-slate-900 text-white"
//                 : "bg-slate-100 text-slate-700"
//             }`}
//           >
//             Login
//           </button>
//           <button
//             onClick={() => {
//               setMode("register");
//               setError(null);
//               setInfo(null);
//             }}
//             className={`px-4 py-2 rounded-lg text-sm font-medium ${
//               mode === "register"
//                 ? "bg-slate-900 text-white"
//                 : "bg-slate-100 text-slate-700"
//             }`}
//           >
//             Register
//           </button>
//         </div>

//         <h1 className="text-xl font-semibold text-center">
//           {mode === "login" ? "Sign in" : "Create an account"}
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-3">
//           {mode === "register" && (
//             <>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Name</label>
//                 <input
//                   className="w-full border rounded-md px-3 py-2 text-sm"
//                   placeholder="Your name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required={mode === "register"}
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Role</label>
//                 <select
//                   className="w-full border rounded-md px-3 py-2 text-sm"
//                   value={role}
//                   onChange={(e) =>
//                     setRole(e.target.value as typeof role)
//                   }
//                 >
//                   <option value="farmer">Farmer</option>
//                   <option value="warehouse">Warehouse</option>
//                   <option value="bank">Bank</option>
//                   <option value="trader">Trader</option>
//                 </select>
//               </div>
//             </>
//           )}

//           <div className="space-y-1">
//             <label className="text-sm font-medium">Email</label>
//             <input
//               type="email"
//               className="w-full border rounded-md px-3 py-2 text-sm"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="space-y-1">
//             <label className="text-sm font-medium">Password</label>
//             <input
//               type="password"
//               className="w-full border rounded-md px-3 py-2 text-sm"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {error && (
//             <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-md px-3 py-2">
//               {error}
//             </div>
//           )}

//           {info && !error && (
//             <div className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2">
//               {info}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full mt-2 flex items-center justify-center rounded-md bg-slate-900 text-white py-2 text-sm font-medium disabled:opacity-60"
//           >
//             {loading
//               ? mode === "login"
//                 ? "Signing in..."
//                 : "Creating account..."
//               : mode === "login"
//               ? "Sign in"
//               : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Auth;

import { useState, FormEvent, type SetStateAction } from "react";
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
import  { useAuth } from "@/lib/auth";

const API_URL = "http://localhost:4000/api/auth";

const mobileToEmail = (mobile: string) => `${mobile}@agrivault.local`;

const Auth = () => {
  const { setAuth } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleParam = searchParams.get("role");

  const [selectedRole, setSelectedRole] = useState<string | null>(roleParam);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState(""); // we’ll use password instead of OTP

  // Signup fields
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");

  const [loading, setLoading] = useState(false);

  const roles = [
    { id: "farmer", name: "Farmer", icon: iconFarmer },
    { id: "warehouse", name: "Warehouse Operator", icon: iconWarehouse },
    { id: "bank", name: "Bank", icon: iconBank },
    { id: "trader", name: "Trader", icon: iconTrader },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error("Please select a role first");
      return;
    }
    if (mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!password || password.length < 4) {
      toast.error("Please enter a password (min 4 characters)");
      return;
    }

    try {
      setLoading(true);
      // const email = mobileToEmail(mobile);

      const url =
        authMode === "login" ? `${API_URL}/login` : `${API_URL}/register`;

      const body =
        authMode === "login"
          ? { mobile, password }
          : {
              name,
              mobile,
              password,
              role: selectedRole,
              // extra fields not in User model yet, but can be added later:
              village,
              district,
            };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Authentication failed");
        return;
      }

      if (!data.token || !data.user) {
        toast.error("Invalid response from server");
        return;
      }

      // Save token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      

      toast.success(
        authMode === "login" ? "Login successful!" : "Account created!"
      );
      
      setAuth(data.user, data.token);

      // Navigate based on role
      switch (data.user.role) {
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
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
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
                  <img
                    src={role.icon}
                    alt={role.name}
                    className="w-16 h-16 mx-auto"
                  />
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="village">Village</Label>
                  <Input
                    id="village"
                    value={village}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setVillage(e.target.value)}
                    placeholder="Enter your village"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={district}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setDistrict(e.target.value)}
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
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setMobile(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                {authMode === "login" ? "Password" : "Set Password"}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? authMode === "login"
                  ? "Logging in..."
                  : "Creating account..."
                : authMode === "login"
                ? "Login"
                : "Sign up"}
            </Button>
          </form>

          <div className="text-center">
            <button
              className="text-sm text-primary hover:underline"
              onClick={() => {
                setAuthMode(authMode === "login" ? "signup" : "login");
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
