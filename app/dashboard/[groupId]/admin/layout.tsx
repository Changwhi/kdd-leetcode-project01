import Dashboard from "@/components/dashboard";
import React from "react";
export default function MainLayout({
  children, // will be a page or nested layout
  params
}: {
  children: React.ReactNode;
  params: { groupId: string };
}) {
  return (
    <section className="bg-black">
        <Dashboard  groupId={params.groupId} admin={true}>{children}</Dashboard>
    </section>
  );
}
