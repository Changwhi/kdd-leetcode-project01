"use client";
import Sidebar from "./sidebar";

export default function Dashboard({
  groupId,
  children,
  admin,
}: {
  groupId: string ;
  children: React.ReactNode;
  admin: boolean;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar admin={admin} groupId={groupId}/>
      <main className="flex-1 bg-white my-5 mr-5 p-10 rounded-2xl">{children}</main>;
    </div>
  );
}
