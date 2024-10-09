"use server";

import { redirect } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Settings } from "@/components/settings";
import { SETTINGS_CONSTANTS } from "@/text/settings";
import { getLoggedInUser } from "@/lib/actions/user";

/**
 * This component renders a page for updating user's information
 * @param {params} - An object containing a groupId property, which is the id of the group to fetch events and attendance for.
 * @returns A JSX element representing the page.
 */
export default async function SettingPage({
  params,
}: {
  params: { groupId: string };
}) {
  const currentUser = await getLoggedInUser();
  if (!currentUser) {
    redirect("/api/auth/login"); // Redirect to login if user is not logged in
    return null; // Important to return null after redirect
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header user={currentUser} />
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
              <Settings group_id={Number(params.groupId)} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
