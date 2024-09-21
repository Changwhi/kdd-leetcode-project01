"use client";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SIDEBAR_CONSTANTS } from "@/text/sideBar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/lib/actions/user";
import { UserType } from "@/types/user";

/**
 * Sidebar component for the dashboard.
 *
 * This component is used in both the admin and user dashboard and is
 * responsible for displaying the navigation links and the user's avatar and
 * name. The component is also responsible for checking if the user is an
 * admin and displaying the admin navigation links if they are.
 *
 * @param {boolean} admin - Whether the user is an admin or not.
 * @returns {JSX.Element} The sidebar component.
 */
const Sidebar = ({ groupId, admin }: { groupId: string; admin: boolean }) => {
  const pathname = usePathname();
  const [user, setUser] = useState<UserType>({
    user_id: 0,
    name: "",
    email: "",
    picture: "",
  });

  const isActive = (path: string) => pathname.startsWith(path);
  const sideBarOptions = admin
    ? [
        "summary",
        "instruction",
        "attendance",
        "events",
        "assignments",
        "members",
        "settings",
      ]
    : ["summary", "instruction", "events", "assignments", "settings"];

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await getLoggedInUser();
      if (response) {
        setUser({
          user_id: response.user_id,
          name: response.given_name ? response.given_name : response.username,
          email: response.email,
          picture: response.picture,
        });
      }
    };
    getCurrentUser();
  }, []);

  return (
    <aside className="flex flex-col justify-between w-1/5 2xl:w-2/12 bg-black text-white p-6">
      <div>
        <Link
          href={"/group"}
          className="flex flex-row items-center text-sm text-white"
        >
          <div>
            <ArrowLeftIcon className="pr-2" />
          </div>
          {SIDEBAR_CONSTANTS.BACK_BUTTON}
        </Link>
        <div className="py-16 flex flex-col items-start">
          <Avatar className="relative w-24 h-24">
            <AvatarImage
              src={user.picture ? user.picture : "/avatar.png"}
              alt="User Avatar"
            />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
          <p className="mt-2 text-base"></p>
          <a
            className="text-muted-foreground text-sm underline"
            href={"mailto:" + user.email}
            target="_blank"
          >
            {user.email}
          </a>
        </div>
        <nav className=" space-y-6">
          {sideBarOptions.map((option, index) => (
            <a
              key={index}
              href={`/dashboard/${groupId}/${admin ? "admin" : "user"}/${option}`}
              className={`block text-lg font-bold ${
                isActive(`/dashboard/${groupId}/${admin ? "admin" : "user"}/${option}`)
                  ? "text-white"
                  : "text-gray-500"
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </a>
          ))}
        </nav>
      </div>
      <div>
        <button className="text-sm font-medium hover:underline underline-offset-4">
          <a
            className={`block text-lg text-muted-foreground 
                  text-white pb-10`}
            href="/api/auth/logout"
          >
            {SIDEBAR_CONSTANTS.LOGOUT_BUTTON}
          </a>
        </button>
      </div>
    </aside>
  );
};

function ArrowLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export default Sidebar;
