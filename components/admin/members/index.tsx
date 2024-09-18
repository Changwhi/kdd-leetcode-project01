import { retrieveAllUsers } from "@/lib/actions/summary";
import UserTable from "./user-table";

async function Members({group_id}: {group_id: number}) {
  const users = await retrieveAllUsers({ group_id });
  
  return (
    <div className="w-full flex flex-col min-h-full lg:flex-row">
      <main className="basis-3/4 p-6 bg-white lg:pr-6 lg:w-3/4">
        <h2 className="text-2xl font-bold pb-10">Members</h2>
        <UserTable usersInGroup={users}/>
      </main>
    </div>
  );
}

export default Members;
