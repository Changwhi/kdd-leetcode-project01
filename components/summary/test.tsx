"use client";

import { adjustCurrAmountForAllUsers } from "@/lib/actions/submission";
import { Button } from "../ui/button";

export const Test = () => {
  
  const handler = async () => {
    console.log("test works")
    await adjustCurrAmountForAllUsers();
  };

  return (
    <div>
      <Button onClick={() => handler()}>Test</Button>
    </div>
  );
};
