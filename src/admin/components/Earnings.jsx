import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, DollarSign, BookOpen, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart } from "./ui/bar-chart";
import { EarningsPieChart } from "./ui/pie-chart";
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
import { exportToCsv } from "@/utils/exportCSV";
import { Button } from "@/components/ui/button";

const Earnings = () => {
  const { getEarningsRecords } = useEarning();
  const { earnings, loading } = useSelector((state) => state.earning);

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

  const calculateStats = (key) => {
    const daysInPeriod = timeFrame === "week" ? 7 : 30;
    return (earnings[key] || 0) / daysInPeriod;
  };

  const stats = [
    {
      title: "Total Borrow Earnings",
      value: calculateStats("totalBorrowEarnings"),
      icon: <DollarSign className="h-4 w-4" />,
      isDollar: true,
    },
    {
      title: "Total Purchase Earnings",
      value: calculateStats("totalPurchaseEarnings"),
      icon: <DollarSign className="h-4 w-4" />,
      isDollar: true,
    },
    {
      title: "Books Borrowed",
      value: earnings.totalBooksBorrowed || 0,
      icon: <BookOpen className="h-4 w-4" />,
      isDollar: false,
    },
    {
      title: "Books Purchased",
      value: earnings.totalBooksPurchased || 0,
      icon: <BookOpen className="h-4 w-4" />,
      isDollar: false,
    },
  ];

  const cardColors = [
    "bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-800",
    "bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900 dark:to-yellow-800",
    "bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900 dark:to-red-800",
    "bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900 dark:to-yellow-800",
  ];

  const topSellingBooks = earnings.topSellingBooks || [];

  const handleExportCsv = () => {
    const csvData = topSellingBooks.map((book) => ({
      Title: book.title,
      Author: book.author,
      "Copies Borrowed": book.copies_borrowed,
      "Copies Purchased": book.copies_purchased,
      Earnings: `$${book.earnings.toFixed(2)}`,
    }));
    exportToCsv(csvData, "earnings.csv");
  };

  const earningsData = earnings.earningsData || [];

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
          <div className="flex items-center space-x-4">
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select time frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {stats.map(({ title, value, icon, isDollar }, index) => (
            <Card key={index} className={cardColors[index % cardColors.length]}>
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
                  <BarChart data={earningsData} timeFrame={timeFrame} />
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
                  <EarningsPieChart data={earnings?.earningsByCategory} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              <div className="flex items-center space-x-4 text-right justify-between">
                Top Selling Books
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleExportCsv}
                  className="text-sm flex items-center"
                >
                  <Download className="h-5 w-5" />
                  <span className="sr-only">Export CSV</span>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden mb-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Copies Borrowed</TableHead>
                    <TableHead>Copies Purchased</TableHead>
                    <TableHead>Earnings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSellingBooks.map((book, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {book.title}
                      </TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.copies_borrowed}</TableCell>
                      <TableCell>{book.copies_purchased}</TableCell>
                      <TableCell>${book.earnings.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Earnings;
