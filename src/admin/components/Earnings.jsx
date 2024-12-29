import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useEarning } from "@/hooks/useEarning";

const Earnings = () => {
  const { getEarningsRecords } = useEarning();
  const { user } = useSelector((state) => state.auth);
  const { earnings, loading } = useSelector((state) => state.earning);

  useEffect(() => {
    getEarningsRecords(user._id);
  }, [user._id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Your Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${earnings}</div>
        <p className="text-xs text-muted-foreground">
          Total earnings from borrowed books
        </p>
      </CardContent>
    </Card>
  );
};

export default Earnings;
