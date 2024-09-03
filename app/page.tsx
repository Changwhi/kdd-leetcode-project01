"use server";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CONSTANTS } from "@/text/landing";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { createUser, retrieveUser } from "@/lib/actions/user";
import Header from "@/components/header";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header user={user} />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="items-center grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  {CONSTANTS.MAIN_TITLE}
                </h1>
                <p className="mt-6 mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {CONSTANTS.MAIN_DESCRIPTION}
                </p>
                <div className="space-x-4 mt-6">
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    {CONSTANTS.LETS_START}
                  </Link>
                  {/* <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    {CONSTANTS.JOIN_GROUP}
                  </Link> */}
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  priority
                  src="/landing1.png"
                  alt="Landing Page"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  {CONSTANTS.KEY_FEATURES}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {CONSTANTS.SECTION_TITLE}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {CONSTANTS.SECTION_DESCRIPTION}
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">
                  {CONSTANTS.FEATURE_CREATE}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {CONSTANTS.FEATURE_CREATE_DESC}
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">
                  {CONSTANTS.FEATURE_MANAGE}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {CONSTANTS.FEATURE_MANAGE_DESC}
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">
                  {CONSTANTS.FEATURE_DEPOSIT}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {CONSTANTS.FEATURE_DEPOSIT_DESC}
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">
                  {CONSTANTS.FEATURE_NOTIFICATIONS}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {CONSTANTS.FEATURE_NOTIFICATIONS_DESC}
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">
                  {CONSTANTS.FEATURE_REPORTING}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {CONSTANTS.FEATURE_REPORTING_DESC}
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">
                  {CONSTANTS.FEATURE_INTEGRATIONS}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {CONSTANTS.FEATURE_INTEGRATIONS_DESC}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                {CONSTANTS.JOIN_COMMUNITY_TITLE}
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                {CONSTANTS.JOIN_COMMUNITY_DESC}
              </p>
            </div>
            <div className="mx-auto mt-6 max-w-md rounded-lg bg-background p-4 shadow md:max-w-lg md:px-6">
              <form>
                <div className="grid gap-2 sm:flex sm:items-center sm:justify-center sm:gap-0">
                  <Input
                    type="email"
                    placeholder={CONSTANTS.JOIN_COMMUNITY_EMAIL_PLACEHOLDER}
                  />
                  <Button className="w-full sm:ml-2 sm:w-auto">
                    {CONSTANTS.JOIN_COMMUNITY_GET_STARTED}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-background border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <nav className="flex gap-4 text-sm">
            <Link
              href="#"
              className="font-medium transition-colors hover:underline underline-offset-4"
            >
              {CONSTANTS.FOOTER_TERMS}
            </Link>
            <Link
              href="#"
              className="font-medium transition-colors hover:underline underline-offset-4"
            >
              {CONSTANTS.FOOTER_PRIVACY}
            </Link>
          </nav>
          <div className="text-center text-sm">
            {CONSTANTS.FOOTER_COPYRIGHT}
          </div>
        </div>
      </footer>
    </div>
  );
}
