// import { redirect } from "next/navigation";
import HomeLayout from "@/components/layout/HomeLayout";

// import { getAccessToken } from "@/utils/token";

export default function HomePage() {
  // const token = getAccessToken();

  // ❌ No token → redirect to login
  // if (!token) {
  //   redirect("/login");
  // }

  // ✅ Token exists → show dashboard
  return (
    <HomeLayout>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-3 text-gray-600">Welcome to your dashboard.</p>
    
    </HomeLayout>
  );
}
