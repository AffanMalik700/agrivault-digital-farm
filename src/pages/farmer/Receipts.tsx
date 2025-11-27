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


//Actually implemented Receipts page

// src/pages/farmer/Receipts.tsx
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ArrowLeft, FileText } from "lucide-react";
// import BottomNav from "@/components/BottomNav";
// import { useAuth, fetchWithAuth } from "@/lib/auth";

// type Receipt = {
//   _id: string;
//   farmerId: string;
//   warehouseId: string;
//   commodity?: string;
//   crop?: string; // keep compatibility with UI fields
//   grade?: string;
//   quantity: number;
//   unit?: string;
//   status: string;
//   value?: number;
//   createdAt?: string;
//   warehouse?: string;
// };

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "Available":
//     case "stored":
//       return "bg-success text-success-foreground";
//     case "Pledged":
//     case "pledged":
//       return "bg-warning text-warning-foreground";
//     case "Sold":
//     case "sold":
//       return "bg-muted text-muted-foreground";
//     default:
//       return "bg-secondary text-secondary-foreground";
//   }
// };

// const Receipts = () => {
//   const { user } = useAuth();
//   const [receipts, setReceipts] = useState<Receipt[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let mounted = true;
//     setLoading(true);
//     setError(null);

//     const load = async () => {
//       try {
//         const res = await fetchWithAuth("http://localhost:4000/api/receipts");
//         if (!res.ok) throw new Error(`API error ${res.status}`);
//         const all: Receipt[] = await res.json();
//         if (!mounted) return;
//         // show only receipts belonging to logged-in farmer (if available)
//         // const filtered = user ? all.filter((r) => r.farmerId === user.id) : all;
//         // setReceipts(filtered);
//         // after fetching `all` receipts
//         console.log("fetched receipts:", all);
//         console.log("logged-in user:", user);

//         const filtered = user
//           ? all.filter((r) => {
//             const farmerId = (r.farmerId || "").toString();
//             const userIdsToCheck = [user.id, user.userId, user._id].filter(Boolean);
//             return userIdsToCheck.some((uid) => uid === farmerId);
//           })
//           : all;
//         setReceipts(filtered);

//       } catch (err: any) {
//         if (!mounted) return;
//         setError(err.message || "Failed to load receipts");
//       } finally {
//         if (!mounted) return;
//         setLoading(false);
//       }
//     };

//     load();
//     return () => {
//       mounted = false;
//     };
//   }, [user]);

//   if (loading) return <div className="p-6">Loading receipts...</div>;
//   if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
//   if (!receipts || receipts.length === 0)
//     return <div className="p-6">No receipts found.</div>;

//   return (
//     <div className="min-h-screen bg-background pb-20">
//       {/* Header */}
//       <header className="bg-card border-b border-border sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center gap-3">
//             <Link to="/farmer/dashboard">
//               <Button variant="ghost" size="icon">
//                 <ArrowLeft className="h-5 w-5" />
//               </Button>
//             </Link>
//             <div>
//               <h1 className="text-xl font-bold">My Receipts</h1>
//               <p className="text-sm text-muted-foreground">
//                 {receipts.length} Active
//               </p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-6 space-y-4">
//         {receipts.map((receipt) => {
//           const id = receipt._id || (receipt as any).id;
//           const crop = receipt.crop || receipt.commodity || "Unknown";
//           const grade = receipt.grade || "Grade A";
//           const warehouse = receipt.warehouse || receipt.warehouseId || "—";
//           const quantity = receipt.quantity;
//           const value = receipt.value ?? 0;
//           const statusLabel =
//             receipt.status[0]?.toUpperCase() + receipt.status.slice(1);

//           return (
//             <Card key={id} className="overflow-hidden">
//               <CardContent className="p-0">
//                 <div className="p-4 space-y-3">
//                   <div className="flex justify-between items-start">
//                     <div className="flex items-start gap-3">
//                       <div className="bg-primary/10 p-3 rounded-lg">
//                         <FileText className="h-6 w-6 text-primary" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-lg">
//                           {crop} - {grade}
//                         </h3>
//                         <p className="text-sm text-muted-foreground">{id}</p>
//                       </div>
//                     </div>
//                     <Badge className={getStatusColor(receipt.status)}>
//                       {statusLabel}
//                     </Badge>
//                   </div>

//                   <div className="grid grid-cols-2 gap-3 text-sm">
//                     <div>
//                       <span className="text-muted-foreground">Quantity</span>
//                       <p className="font-semibold">
//                         {quantity} {receipt.unit || "quintals"}
//                       </p>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">Est. Value</span>
//                       <p className="font-semibold text-success">
//                         ₹{value.toLocaleString()}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="text-sm">
//                     <span className="text-muted-foreground">Warehouse: </span>
//                     <span className="font-medium">{warehouse}</span>
//                   </div>

//                   <div className="flex gap-2 pt-2">
//                     <Button className="flex-1" variant="outline" size="sm" asChild>
//                       <Link to={`/farmer/receipts/${id}`}>View Details</Link>
//                     </Button>
//                     {receipt.status.toLowerCase() === "available" ||
//                       receipt.status.toLowerCase() === "stored" ? (
//                       <>
//                         <Button className="flex-1" size="sm" asChild>
//                           <Link to={`/farmer/loan/${id}`}>Apply Loan</Link>
//                         </Button>
//                         <Button
//                           className="flex-1"
//                           size="sm"
//                           variant="secondary"
//                           asChild
//                         >
//                           <Link to={`/farmer/sell/${id}`}>Sell</Link>
//                         </Button>
//                       </>
//                     ) : null}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       <BottomNav />
//     </div>
//   );
// };

// export default Receipts;
