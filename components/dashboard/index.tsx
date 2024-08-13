import Sidebar from "./sidebar";

export default function Dashboard({
  children,
  admin,
}: {
  children: React.ReactNode;
  admin: boolean;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar admin={admin} />
      <main className="flex-1 bg-white my-5 mr-5 p-10 rounded-2xl">{children}</main>;
    </div>
  );
}
