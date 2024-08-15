import Dashboard from "@/components/dashboard";
import React from "react";
export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-black">
        <Dashboard admin={false}>{children}</Dashboard>
    </section>
  );
}
