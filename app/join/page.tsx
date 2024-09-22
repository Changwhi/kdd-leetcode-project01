"use server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import { GroupCard } from "@/components/group/ui/groupCard";
import { getAllGroups, getMyGroups, getOtherGroups } from "@/lib/actions/group";
import { GROUP } from "@/text/group";
import { getSession } from "@auth0/nextjs-auth0";
import Footer from "@/components/footer";

/**
 * The join page, which displays a list of groups that the user is not part of yet
 * to allow users to join another groups
 *
 * @returns The join page.
 */
export default async function Join() {
  const session = await getSession();
  const user = session?.user;
  const otherGroups = user
    ? await getOtherGroups({ email: user.email })
    : await getAllGroups();

  return (
    <>
      <div className="flex flex-col min-h-[100dvh]">
        <Header user={user} />
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 border-y">
            <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
              <div className="container mx-auto px-4 sm:px-36 ">
                <div>
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-3xl font-bold mb-2">
                        {GROUP.JOIN_GROUP}
                      </h1>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Search groups..."
                          className="w-full max-w-md"
                        />
                        <Button variant="outline">
                          {GROUP.SEARCH_BTUTTON}
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {GROUP.JOIN_PAGE_SUB_TITLE}
                    </p>
                    {!user && (
                      <p className="mt-2 text-muted-foreground">
                        Login to join a new group!
                      </p>
                    )}
                  </div>
                  <div className="flex flex-row flex-wrap gap-6">
                    {otherGroups.map((group) => (
                      <GroupCard
                        email={user?.email}
                        isMyCard={false}
                        key={group.group_id}
                        name={group.name}
                        description={group.description}
                        group_id={group.group_id}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
