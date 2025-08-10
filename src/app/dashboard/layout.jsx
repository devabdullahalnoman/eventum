
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
