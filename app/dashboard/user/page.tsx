"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page({props}: {props: {groupId: string}}) {
    const route = useRouter()
    useEffect(() => {
      route.push(`/dashboard/user/${props.groupId}/summary`)
    })
  return <div>404 page </div>;
}

