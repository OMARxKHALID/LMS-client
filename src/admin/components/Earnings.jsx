import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Loader2,
  DollarSign,
  BookOpen,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChartIcon,
  PieChartIcon,
} from "lucide-react";
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

  const TotalBorrowedBooks = borrows.length;
  const [timeFrame, setTimeFrame] = useState("week");

  useEffect(() => {
    getEarningsRecords(timeFrame);
  }, [timeFrame]);

  const formatPercentageChange = (change) => (
    <span className={change >= 0 ? "text-green-600" : "text-red-600"}>
      {change >= 0 ? (
        <TrendingUp className="h-4 w-4 mr-1" />
      ) : (
        <TrendingDown className="h-4 w-4 mr-1" />
      )}
      {Math.abs(change)}%
    </span>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const totalEarnings = earnings.totalEarnings || 0;
  const avgDailyEarnings =
    totalEarnings /
    (timeFrame === "week" ? 7 : timeFrame === "month" ? 30 : 365);
  const totalChange = earnings.totalChange || 0;
  const avgDailyChange = earnings.avgDailyChange || 0;
  const booksBorrowedChange = earnings.booksBorrowedChange || 0;
  const topSellingBooks = earnings.topSellingBooks || [];

  const chartData = Object.entries(earnings.dailyEarnings || {}).map(
    ([date, earnings]) => ({
      day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      earnings,
    })
  );

  const categoryData = Object.entries(earnings.earningsByCategory || {}).map(
    ([category, earnings]) => ({
      name: category,
      value: earnings,
    })
  );

  const comparisonData = [
    { period: "Current", earnings: totalEarnings },
    { period: "Previous", earnings: earnings.previousEarnings || 0 },
  ];

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
          {[
            {
              title: "Total Earnings",
              value: totalEarnings,
              change: totalChange,
              icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
              isDollar: true,
            },
            {
              title: "Avg. Daily Earnings",
              value: avgDailyEarnings,
              change: avgDailyChange,
              icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
              isDollar: true,
            },
            {
              title: "Books Borrowed",
              value: TotalBorrowedBooks || 0,
              change: booksBorrowedChange,
              icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
              isDollar: false,
            },
          ].map(({ title, value, change, icon, isDollar }, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isDollar ? `$${value.toFixed(2)}` : value}
                </div>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  {formatPercentageChange(change)}
                  <span className="ml-1">from last {timeFrame}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="trend" className="space-y-4">
          <TabsList>
            {["trend", "category", "comparison"].map((value) => (
              <TabsTrigger key={value} value={value}>
                {value === "trend" && <BarChartIcon className="h-4 w-4 mr-2" />}
                {value === "category" && (
                  <PieChartIcon className="h-4 w-4 mr-2" />
                )}
                {value === "comparison" && (
                  <BarChartIcon className="h-4 w-4 mr-2" />
                )}
                {value === "trend"
                  ? "Earnings Trend"
                  : value === "category"
                  ? "Earnings by Category"
                  : "Period Comparison"}
              </TabsTrigger>
            ))}
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
                  <BarChart data={chartData} />
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

          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Period Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart data={comparisonData} />
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
                    <TableCell>{TotalBorrowedBooks}</TableCell>
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
