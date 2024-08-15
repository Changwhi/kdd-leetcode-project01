import { CONSTANTS } from "@/text/summary";
import { Assignment } from "./assignment";
import { SelectEvent } from "./selectEvents";

export const Assignments = () => {
  return (
    <>
      <h2 className="text-lg font-bold">{CONSTANTS.ASSIGNMENTS_TITLE}</h2>
      <div className="flex flex-col lg:flex-row">
      <aside className="block lg:hidden basis-1/3 lg:w-1/2">
            <SelectEvent></SelectEvent>
        </aside>
        <main className="basis-2/3 p-6 bg-white lg:pr-6 lg:w-3/4">
          <Assignment></Assignment>
        </main>
        <aside className="hidden lg:block basis-1/3 lg:w-1/2">
            <SelectEvent></SelectEvent>
        </aside>
      </div>
    </>
  );
};
