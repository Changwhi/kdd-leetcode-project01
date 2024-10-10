"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Account } from "@/components/account";
import { SETTINGS_CONSTANTS } from "@/text/settings";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import AccountNavBar from "@/components/account/account-nav";
import { retrieveUser } from "@/lib/actions/user";
import { UserGroupList } from "@/components/account/userGroupList";

/**
 * This component renders a page for updating user's information
 * @param {params} - An object containing a groupId property, which is the id of the group to fetch events and attendance for.
 * @returns A JSX element representing the page.
 */
export default function AccountPage() {
  const { user } = useUser();
  const [name, setName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("profile");
  const tabs = [
    { name: "Profile", key: "profile" },
    { name: "Groups", key: "groups" },
  ];

  useEffect(() => {
    const fetchUserInfo = async () => {
      const fetchedUser = await retrieveUser(user?.email);
      if (fetchedUser.length > 0) {
        setName(fetchedUser[0].name);
      }
    };
    
    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header user={user} />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-20 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="container mx-auto px-4 sm:px-36 ">
              <h1 className="text-3xl font-bold mb-2">
                {SETTINGS_CONSTANTS.SETTINGS_HEADER_TITLE}
              </h1>
              <p className="text-muted-foreground mb-8">
                {SETTINGS_CONSTANTS.SETTINGS_SUB_TITLE}
              </p>
              <div className="flex flex-row space-x-24">
                <AccountNavBar
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  tabs={tabs}
                />
                {activeTab == "profile" && <Account email={user?.email} name={name} setName={setName}/>}
                {activeTab == "groups" && <UserGroupList email={user?.email} />}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
