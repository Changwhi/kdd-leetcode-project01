"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getIsAdmin } from "@/lib/actions/usergroup";
import DotLoader from "react-spinners/DotLoader";

export default function Page({ params }: { params: { groupId: string } }) {
  const route = useRouter();

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getIsAdmin(Number(params.groupId));

      if (userInfo.length <= 0) {
        route.push(`/group`);
      } else {
        if (userInfo[0].user_type === 0) {
          route.push(`/dashboard/${params.groupId}/admin/summary`);
        } else {
          route.push(`/dashboard/${params.groupId}/user/summary`);
        }
      }
    };
    getUserInfo();
  }, []);
  return (
    <div className="flex flex-col  justify-center items-center min-h-screen">
      <div>
        <DotLoader color="#6a6868" size={60} />
      </div>
      <div className="mt-4">
        Redirecting...
      </div>
    </div>
  );
}
