"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Copy, Link } from "lucide-react";

function encodeGroupId(groupId: number) {
  return Buffer.from(groupId.toString())
    .toString("base64")
    .replace(/\+/g, "-") 
    .replace(/\//g, "_")
    .replace(/=+$/, ""); 
}

export default function InvitationButton({ group_id }: { group_id: number }) {
  const [invitationUrl, setInvitationUrl] = useState<string | null>(null);
  const groupId = Number(group_id);

  const handleGenerateInvitation = () => {
    const encodedGroupId = encodeGroupId(groupId);
    const url = `${window.location.origin}/link/${encodedGroupId}`;
    setInvitationUrl(url);
  };

  const copyToClipboard = () => {
    if (invitationUrl) {
      navigator.clipboard.writeText(invitationUrl).then(() => {
        toast({
          title: "Copied to clipboard",
          description: "The invitation link has been copied to your clipboard.",
        });
      });
    }
  };

  return (
    <Card className="w-full max-w-md my-5">
      <CardHeader>
        <CardTitle>Group Invitation</CardTitle>
        <CardDescription>
          Generate and share an invitation link for your group
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!invitationUrl ? (
          <Button onClick={handleGenerateInvitation} className="w-full">
            <Link className="mr-2 h-4 w-4" />
            Generate Invitation Link
          </Button>
        ) : (
          <div className="space-y-2">
            <label htmlFor="invitation-link" className="text-sm font-medium">
              Invitation Link
            </label>
            <div className="flex">
              <Input
                id="invitation-link"
                value={invitationUrl}
                readOnly
                className="flex-grow"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                className="ml-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      {invitationUrl && (
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <a href={invitationUrl} target="_blank" rel="noopener noreferrer">
              Open Link
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
