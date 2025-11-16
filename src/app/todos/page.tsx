"use client";

import { redirect } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getAccessToken } from "@/utils/token";

export default function TodosPage() {
  const token = getAccessToken();

  if (!token) {
    redirect("/login");
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-4">Todos</h2>
    </DashboardLayout>
  );
}
