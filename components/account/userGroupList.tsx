"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, LogOut } from "lucide-react";
import { SETTINGS_CONSTANTS } from "@/text/settings";
import { getMyGroups } from "@/lib/actions/group";

interface UserGroupListProps {
  email: string;
}

export const UserGroupList: React.FC<UserGroupListProps> = ({ email }) => {
  const { toast } = useToast();
  const [adminGroups, setAdminGroups] = useState([]);
  const [memberGroups, SetMemberGroups] = useState([]);

  useEffect(() => {
    const fetchUserGroups = async () => {
      const myGroups = await getMyGroups({ email });
      setAdminGroups(myGroups.filter((group) => group.user_type === 0));
      SetMemberGroups(myGroups.filter((group) => group.user_type === 1));
    };

    fetchUserGroups();
  }, []);

  const handleQuitGroup = (groupId: number) => {
    // Implement account deletion logic
    console.log(`Quit group with id: ${groupId}`);
  };

  const handleDeleteGroup = (groupId: number) => {
    // Implement account deletion logic
    console.log(`Delete group with id: ${groupId}`);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{SETTINGS_CONSTANTS.MANAGEMENT_GROUPS}</CardTitle>
        <CardDescription>
          {SETTINGS_CONSTANTS.MANAGEMENT_GROUPS_DESCRIPTION}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="container mx-auto p-4 max-w-2xl">
          <h1 className="text-xl font-bold mb-6">
            {SETTINGS_CONSTANTS.GROUP_ADMIN}
          </h1>
          <div className="space-y-4">
            {adminGroups.map((group) => (
              <Card key={group.id} className="flex items-center p-4">
                <CardContent className="flex-grow p-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {group.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="self-end sm:self-center"
                      onClick={() => handleDeleteGroup(group.id)}
                      aria-label={`Quit ${group.name} group`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="container mx-auto p-4 max-w-2xl">
          <h1 className="text-xl font-bold mb-6">
            {SETTINGS_CONSTANTS.GROUP_MEMBER}
          </h1>
          <div className="space-y-4">
            {memberGroups.map((group) => (
              <Card key={group.id} className="flex items-center p-4">
                <CardContent className="flex-grow p-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {group.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="self-end sm:self-center"
                      onClick={() => handleQuitGroup(group.id)}
                      aria-label={`Quit ${group.name} group`}
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
