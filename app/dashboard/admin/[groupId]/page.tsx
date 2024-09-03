"use client";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Page({props}: {props: {groupId: string}}) {
    const route = useRouter()
    useEffect(() => {
        route.push(`/dashboard/admin/${props.groupId}/summary`)
    })
  return <div>404 page </div>;
}

