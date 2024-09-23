import { retrieveAllUsers } from "@/lib/actions/summary";
import UserTable from "./user-table";
import { MEMBERS } from "@/text/members";

async function Members({ group_id }: { group_id: number }) {
  const users = await retrieveAllUsers({ group_id });

  return (
    <div className="w-full flex flex-col min-h-full ">
      <main className="bg-white">
        <h2 className="text-2xl font-bold pb-10">{MEMBERS.MEMBERS_DESCRIPTION}</h2>
        <UserTable usersInGroup={users} />
      </main>
    </div>
  );
}

export default Members;
