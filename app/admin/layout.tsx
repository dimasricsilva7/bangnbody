import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { getAdminSession } from "@/lib/auth";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const session = await getAdminSession();

  // /admin/login renders its own full-page layout without the sidebar.
  if (!session) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <AdminSidebar adminName={`${session.name} · ${session.role}`} />
      <main className="flex-1 overflow-y-auto px-8 py-8">{children}</main>
    </div>
  );
}
