import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";
import { AdminToaster } from "@/components/admin/Toaster";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <div className="admin-shell min-h-screen flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar email={session.user?.email} />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
      <AdminToaster />
    </div>
  );
}
