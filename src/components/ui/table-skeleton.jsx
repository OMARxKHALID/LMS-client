// src/components/ui/table-skeleton.js

export function TableSkeleton() {
  return (
    <div className="animate-pulse">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-200 h-8"></th>
            <th className="py-3 px-6 bg-gray-200 h-8"></th>
            <th className="py-3 px-6 bg-gray-200 h-8"></th>
            <th className="py-3 px-6 bg-gray-200 h-8"></th>
            <th className="py-3 px-6 bg-gray-200 h-8"></th>
          </tr>
        </thead>
        <tbody>
          {Array(5)
            .fill()
            .map((_, index) => (
              <tr key={index}>
                <td className="py-4 px-6">
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="w-32 h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="w-24 h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="w-24 h-4 bg-gray-200 rounded"></div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
