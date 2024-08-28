"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import { getLoggedInUser } from "@/lib/actions/user";
import { GroupCard } from "@/components/group/groupCard.tsx/groupCard";
import { getMyGroups, getOtherGroups } from "@/lib/actions/group";
import { useEffect, useState } from "react";
import { UserType } from "@/types/user";
import { GroupType, MyGroup, otherGroup } from "@/types/group";

export default function Group() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType>({
    user_id: 0,
    name: "",
    email: "",
  });
  const [myGroups, setMyGroups] = useState<MyGroup[]>([]);
  const [otherGroups, setOtherGroups] = useState<otherGroup[]>([]);
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await getLoggedInUser();
      if (user) {
        setCurrentUser({
          user_id: user.user_id,
          name: user.name,
          email: user.email,
        });
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchMyGroups = async () => {
      const myGroupsData = await getMyGroups({ email: currentUser.email });
      setMyGroups(myGroupsData);
    };
    const fetchOtherGroups = async () => {
      const otherGroups = await getOtherGroups({ email: currentUser.email });
      setOtherGroups(otherGroups);
    };
    fetchOtherGroups();
    fetchMyGroups();
  }, [currentUser]);

  return (
    <>
      <div className="flex flex-col min-h-[100dvh]">
        <Header user={currentUser} />
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 border-y">
            <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
              <div className="container mx-auto px-4 sm:px-36 ">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Manage Groups</h1>
                  <p className="text-muted-foreground">
                    Create, join, and manage your groups.
                  </p>
                </div>
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Your Groups</h2>
                    <Button>Create New Group</Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myGroups.map((group) => (
                      <GroupCard
                        isOwner={group.user_type}
                        isMyCard={true}
                        key={group.group_id}
                        name={group.name}
                        description={group.description}
                        group_id={group.group_id}
                      />
                    ))}
                    {/* Add more cards as needed */}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Join a Group</h2>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Search groups..."
                        className="w-full max-w-md"
                      />
                      <Button variant="outline">Browse</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherGroups.map((group) => (
                      <GroupCard
                      isOwner={group.user_type}
                        isMyCard={false}
                        key={group.group_id}
                        name={group.name}
                        description={group.description}
                        group_id={group.group_id}
                      />
                    ))}
                    {/* Add more cards as needed */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

//   <Dialog
//     open={isCreateModalOpen}
//     onOpenChange={setIsCreateModalOpen}
//   >
//     <DialogContent className="max-w-md">
//       <DialogHeader>
//         <DialogTitle>Create a New Group</DialogTitle>
//         <DialogDescription>
//           Enter the details for your new group.
//         </DialogDescription>
//       </DialogHeader>
//       <form
//         onSubmit={() => {
//           /* handle submit logic here */
//         }}
//       >
//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="groupName">Group Name</Label>
//             <Input
//               id="groupName"
//               placeholder="Enter group name"
//             />
//           </div>
//           <div>
//             <Label htmlFor="groupDescription">
//               Group Description
//             </Label>
//             <Textarea
//               id="groupDescription"
//               placeholder="Enter group description"
//               rows={3}
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="submit" className="ml-auto">
//             Create Group
//           </Button>
//         </DialogFooter>
//       </form>
//     </DialogContent>
//   </Dialog>
