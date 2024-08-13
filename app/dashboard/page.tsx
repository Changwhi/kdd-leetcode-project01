"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ERROR } from "@/text/error"; 
export default function Page() {
    const route = useRouter()
    useEffect(() => {
        route.push("/dashboard/admin/summary")
    })
  return <div>{ERROR.PAGE_NOT_FOUND}</div>;
}
