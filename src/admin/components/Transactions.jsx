import { useEffect, useState } from "react";
import { BookOpen, DollarSign, RotateCcw, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTransaction } from "@/hooks/useTransaction";
import { useSelector } from "react-redux";
import TransactionTable from "./ui/TranscationTable";
import PaginationControls from "@/components/ui/pagination-controls";

const ITEMS_PER_PAGE = 5;

function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const { getTransactions } = useTransaction();
  const { transactions, loading } = useSelector((state) => state.transactions);
  const { user } = useSelector((state) => state.auth);

  const { _id: userId, role } = user || [];

  useEffect(() => {
    getTransactions();
  }, []);

  const filteredTransactions =
    role === "admin"
      ? transactions
      : transactions.filter((t) => t.user._id === userId);

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const totalTransactions = sortedTransactions.length;
  const successfulTransactions = sortedTransactions.filter(
    (t) => t.status === "success"
  ).length;
  const pendingTransactions = sortedTransactions.filter(
    (t) => t.status === "pending"
  ).length;
  const failedTransactions = sortedTransactions.filter(
    (t) => t.status === "failed"
  ).length;

  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(sortedTransactions.length / ITEMS_PER_PAGE);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">
              Transaction History
            </CardTitle>
            <CardDescription>
              Your transaction activity at a glance
            </CardDescription>
          </div>
          <Button variant="outline" onClick={getTransactions}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Transactions
              </CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTransactions}</div>
              <p className="text-xs text-muted-foreground">
                All-time transactions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Successful Transactions
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{successfulTransactions}</div>
              <Progress
                value={(successfulTransactions / totalTransactions) * 100}
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900 dark:to-yellow-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Transactions
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTransactions}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting completion
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900 dark:to-red-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Failed Transactions
              </CardTitle>
              <DollarSign className="h-4 w-4 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{failedTransactions}</div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="successful">Successful</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <TransactionTable
              transactions={paginatedTransactions}
              loading={loading}
            />
          </TabsContent>
          <TabsContent value="successful">
            <TransactionTable
              transactions={paginatedTransactions.filter(
                (t) => t.status === "success"
              )}
              loading={loading}
            />
          </TabsContent>
          <TabsContent value="pending">
            <TransactionTable
              transactions={paginatedTransactions.filter(
                (t) => t.status === "pending"
              )}
              loading={loading}
            />
          </TabsContent>
          <TabsContent value="failed">
            <TransactionTable
              transactions={paginatedTransactions.filter(
                (t) => t.status === "failed"
              )}
              loading={loading}
            />
          </TabsContent>
        </Tabs>
        <PaginationControls
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </CardContent>
    </Card>
  );
}

export default Transactions;
