"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const route = useRouter()
    useEffect(() => {
        route.push("/dashboard/admin/summary")
    })
  return <div>404 page </div>;
}

