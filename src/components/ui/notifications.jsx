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

  // Calculate dynamic height
  const calculateHeight = () => {
    const totalBooks =
      notifications.dueSoonBooks.length + notifications.overdueBooks.length;
    // If there are no notifications, return a minimum height
    if (totalBooks === 0) return 100;
    // Each book card has an approximate height of 80px
    const height = totalBooks * 80;
    return height > 300 ? 300 : height;
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
        <ScrollArea
          style={{ height: `${calculateHeight()}px`, maxHeight: "300px" }}
        >
          {notifications.total > 0 ? (
            <>
              {notifications.dueSoonBooks.length > 0 && (
                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-sm">Due Soon</h4>
                  {notifications.dueSoonBooks.map((book) => (
                    <div
                      key={book._id}
                      className="mb-2 p-2 rounded-lg bg-muted/50"
                    >
                      <p className="font-medium text-sm">
                        {book.borrowed_book.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Due:{" "}
                        {format(new Date(book.expected_return_date), "PPP")}
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
                        Due:{" "}
                        {format(new Date(book.expected_return_date), "PPP")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          )}
        </ScrollArea>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Notifications;
