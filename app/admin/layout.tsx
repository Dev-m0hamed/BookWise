import { auth } from "@/auth";
import Sidebar from "@/components/admin/Sidebar";
import { redirect } from "next/navigation";

async function layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  return (
    <main className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex w-[calc(100%-264px)] flex-1 flex-col bg-light-300 p-5 xs:p-10">
        <p>header</p>
        {children}
      </div>
    </main>
  );
}

export default layout;
