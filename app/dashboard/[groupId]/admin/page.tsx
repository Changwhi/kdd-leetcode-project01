"use client";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Page({params}: {params: {groupId: string}}) {
    const route = useRouter()
    useEffect(() => {
        route.push(`/dashboard/${params.groupId}/admin/summary`)
    })
  return <div>404 page </div>;
}

