import { useState } from "react";
import { ScrollArea } from "./scroll-area";
import { format } from "date-fns";
import { Bell } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Button } from "./button";

const Notifications = ({ borrows }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = {
    dueSoonBooks: borrows.filter((borrow) => {
      const dueDate = new Date(borrow.expected_return_date);
      const today = new Date();
      const threeDaysFromNow = new Date(today.setDate(today.getDate() + 3));

      return (
        dueDate <= threeDaysFromNow &&
        dueDate > new Date() &&
        borrow.status === "borrowed"
      );
    }),
    overdueBooks: borrows.filter((borrow) => {
      const dueDate = new Date(borrow.expected_return_date);
      return dueDate < new Date() && borrow.status === "borrowed";
    }),
    get total() {
      return this.dueSoonBooks.length + this.overdueBooks.length;
    },
  };

  return (
    <HoverCard open={showNotifications} onOpenChange={setShowNotifications}>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => setShowNotifications((prev) => !prev)}
        >
          <Bell className="h-6 w-6 text-primary" />
          {notifications.total > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {notifications.total}
            </span>
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" align="end">
        <ScrollArea className="h-[300px]">
          {notifications.dueSoonBooks.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 font-semibold text-sm">Due Soon</h4>
              {notifications.dueSoonBooks.map((book) => (
                <div key={book._id} className="mb-2 p-2 rounded-lg bg-muted/50">
                  <p className="font-medium text-sm">
                    {book.borrowed_book.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Due: {format(new Date(book.expected_return_date), "PPP")}
                  </p>
                </div>
              ))}
            </div>
          )}
          {notifications.overdueBooks.length > 0 && (
            <div>
              <h4 className="mb-2 font-semibold text-sm text-red-500">
                Overdue Books
              </h4>
              {notifications.overdueBooks.map((book) => (
                <div
                  key={book._id}
                  className="mb-2 p-2 rounded-lg bg-red-100 dark:bg-red-900/20"
                >
                  <p className="font-medium text-sm">
                    {book.borrowed_book.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Due: {format(new Date(book.expected_return_date), "PPP")}
                  </p>
                </div>
              ))}
            </div>
          )}
          {notifications.total === 0 && (
            <div className="text-center text-sm text-muted-foreground py-4">
              No notifications
            </div>
          )}
        </ScrollArea>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Notifications;
