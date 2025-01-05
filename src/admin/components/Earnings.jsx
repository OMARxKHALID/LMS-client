import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, DollarSign, BookOpen, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart } from "./ui/bar-chart";
import { PieChart } from "./ui/pie-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEarning } from "@/hooks/useEarning";

const Earnings = () => {
  const { getEarningsRecords } = useEarning();
  const { earnings, loading } = useSelector((state) => state.earning);
  const { borrows } = useSelector((state) => state.borrow);

  const [timeFrame, setTimeFrame] = useState("week");

  useEffect(() => {
    getEarningsRecords(timeFrame);
  }, [timeFrame]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const stats = [
    {
      title: "Total Earnings",
      value: earnings.totalEarnings || 0,
      icon: <DollarSign className="h-4 w-4" />,
      isDollar: true,
    },
    {
      title: "Avg. Daily Earnings",
      value:
        (earnings.totalEarnings || 0) /
        (timeFrame === "week" ? 7 : timeFrame === "month" ? 30 : 365),
      icon: <Calendar className="h-4 w-4" />,
      isDollar: true,
    },
    {
      title: "Books Borrowed",
      value: borrows.length || 0,
      icon: <BookOpen className="h-4 w-4" />,
      isDollar: false,
    },
  ];

  const chartData = Object.entries(
    timeFrame === "year"
      ? earnings.monthlyEarnings || {}
      : earnings.dailyEarnings || {}
  ).map(([date, earnings]) => ({
    day: date,
    earnings,
  }));

  const categoryData = Object.entries(earnings.earningsByCategory || {}).map(
    ([name, value]) => ({ name, value })
  );

  const topSellingBooks = earnings.topSellingBooks || [];

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">
              Earnings Overview
            </CardTitle>
            <CardDescription>
              Your financial performance at a glance
            </CardDescription>
          </div>
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {stats.map(({ title, value, icon, isDollar }, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isDollar ? `$${value.toFixed(2)}` : value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="trend" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trend">Earnings Trend</TabsTrigger>
            <TabsTrigger value="category">Earnings by Category</TabsTrigger>
          </TabsList>

          <TabsContent value="trend">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Earnings Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart data={chartData} timeFrame={timeFrame} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="category">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Earnings by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <PieChart data={categoryData} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Top Selling Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Copies Borrowed</TableHead>
                  <TableHead>Earnings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSellingBooks.map((book, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{borrows.length}</TableCell>
                    <TableCell>${book.earnings.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Earnings;
