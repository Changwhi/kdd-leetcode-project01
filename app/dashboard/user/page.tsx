"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page({params}: {params: {groupId: string}}) {
    const route = useRouter()
    useEffect(() => {
      route.push(`/dashboard/user/${params.groupId}/summary`)
    })
  return <div>404 page </div>;
}

