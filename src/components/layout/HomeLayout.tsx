import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#EAF3FB] min-h-screen">
      <Sidebar />
      <Topbar />

      <main className="pt-24 pl-[300px] ">{children}</main>
    </div>
  );
}
