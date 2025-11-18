import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#f6fafd] min-h-screen">
      <Sidebar />
      <Topbar />

      <main className="pt-24 pl-[300px] ">{children}</main>
    </div>
  );
}
