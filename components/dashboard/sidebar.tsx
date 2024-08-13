"use client";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CONSTANTS } from "@/text/sideBar";

const Sidebar = ({ admin }: { admin: boolean }) => {
  const pathname = usePathname();

  const getLinkClass = (link: string) => {
    return pathname === link ? CONSTANTS.LINK_ACTIVE : CONSTANTS.LINK_INACTIVE;
  };

  return (
    <aside className="w-1/5 2xl:w-2/12 bg-black text-white p-6">
      <div className="py-10 flex flex-col items-start">
        <Avatar className="relative w-24 h-24">
          <AvatarImage src="/avatar.png" alt={CONSTANTS.AVATAR_ALT} />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar>
        <h2 className="mt-4 text-2xl font-bold">{CONSTANTS.USER_NAME}</h2>
        <p className="mt-2 text-base">{CONSTANTS.USER_ROLE}</p>
        <a
          className="text-muted-foreground underline"
          href={`mailto:${CONSTANTS.USER_EMAIL}`}
          target="_blank"
        >
          {CONSTANTS.USER_EMAIL}
        </a>
      </div>
      <nav className="mt-8 space-y-8">
        <a
          href="/dashboard/admin/summary"
          className={getLinkClass("/dashboard/admin/summary")}
        >
          {CONSTANTS.SUMMARY}
        </a>
        {admin && (
          <>
            <a
              href="/dashboard/admin/attendance"
              className={getLinkClass("/dashboard/admin/attendance")}
            >
              {CONSTANTS.ATTENDANCE}
            </a>
            <a
              href="/dashboard/admin/members"
              className={getLinkClass("/dashboard/admin/members")}
            >
              {CONSTANTS.MEMBERS}
            </a>
          </>
        )}
        <a
          href="/dashboard/admin/events"
          className={getLinkClass("/dashboard/admin/events")}
        >
          {CONSTANTS.EVENTS}
        </a>
        <a
          href="/dashboard/admin/assignments"
          className={getLinkClass("/dashboard/admin/assignments")}
        >
          {CONSTANTS.ASSIGNMENTS}
        </a>
        <a href="#" className={CONSTANTS.SETTINGS_DISABLED}>
          {CONSTANTS.SETTINGS}
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
