import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, IndianRupee, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Loan {
  id: string;
  loan_amount: number;
  interest_rate: number;
  duration_months: number;
  status: string;
  application_date: string | null;
  approval_date: string | null;
  due_date: string | null;
}

const Loans = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetchLoans = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Please login",
          description: "You need to be logged in to view loans",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("loans")
          .select("*")
          .eq("farmer_id", session.user.id)
          .order("application_date", { ascending: false });

        if (error) throw error;
        setLoans(data || []);
      } catch (error: any) {
        toast({
          title: "Error fetching loans",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchLoans();
  }, [navigate, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "disbursed":
        return "bg-blue-100 text-blue-800";
      case "repaid":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background pb-20">
      <header className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">My Loans</h1>
      </header>

      <main className="p-4 space-y-4">
        {loans.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              <p>No loan applications yet.</p>
              <p className="text-sm mt-2">Apply for a loan against your warehouse receipts.</p>
            </CardContent>
          </Card>
        ) : (
          loans.map((loan) => (
            <Card key={loan.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <IndianRupee className="h-5 w-5" />
                    ₹{loan.loan_amount.toLocaleString()}
                  </CardTitle>
                  <Badge className={getStatusColor(loan.status)}>
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{loan.duration_months} months</span>
                  </div>
                  <div className="text-right text-muted-foreground">
                    {loan.interest_rate}% interest
                  </div>
                </div>
                {loan.application_date && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Applied: {format(new Date(loan.application_date), "dd MMM yyyy")}</span>
                  </div>
                )}
                {loan.due_date && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {format(new Date(loan.due_date), "dd MMM yyyy")}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Loans;
