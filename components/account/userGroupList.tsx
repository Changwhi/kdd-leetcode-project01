"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SETTINGS_CONSTANTS } from "@/text/settings";
import { getMyGroups } from "@/lib/actions/group";
import { UserGroupCard } from "./userGroupCard";
import { deleteUserGroupById } from "@/lib/actions/usergroup";

interface UserGroupListProps {
  email: string;
}

export const UserGroupList: React.FC<UserGroupListProps> = ({ email }) => {
  const { toast } = useToast();
  const [adminGroups, setAdminGroups] = useState([]);
  const [memberGroups, SetMemberGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<"quit" | "delete" | null>(null);

  useEffect(() => {
    fetchUserGroups();
  }, []);

  const fetchUserGroups = async () => {
    const myGroups = await getMyGroups({ email });
    setAdminGroups(myGroups.filter((group) => group.user_type === 0));
    SetMemberGroups(myGroups.filter((group) => group.user_type === 1));
  };
  
  const handleConfirmAction = () => {
    if (actionType === "quit" && selectedGroupId !== null) {
      handleQuitGroup(selectedGroupId);
    } else if (actionType === "delete" && selectedGroupId !== null) {
      handleDeleteGroup(selectedGroupId);
    }
    setSelectedGroupId(null);
    setActionType(null);
  };

  const handleQuitGroup = async (userGroupId: number) => {
    try {
      await deleteUserGroupById(userGroupId);
      toast({
        description: "You have quit the group",
      });
      fetchUserGroups();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to quit the group. Please try again.",
      });
    }
  };

  const handleDeleteGroup = (groupId: number) => {
    // Implement account deletion logic
    console.log(`Delete group with id: ${groupId}`);
    toast({
      description: `You have deleted the group with ID: ${groupId}`,
    });
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
            {adminGroups.map((group, index) => (
              <UserGroupCard
                key={index}
                setSelectedGroupId={setSelectedGroupId}
                setActionType={setActionType}
                thisGroup={group}
                cardType="delete"
                handleConfirmAction={handleConfirmAction}
              />
            ))}
          </div>
        </div>
        <div className="container mx-auto p-4 max-w-2xl">
          <h1 className="text-xl font-bold mb-6">
            {SETTINGS_CONSTANTS.GROUP_MEMBER}
          </h1>
          <div className="space-y-4">
            {memberGroups.map((group, index) => (
              <UserGroupCard
                key={index}
                setSelectedGroupId={setSelectedGroupId}
                setActionType={setActionType}
                thisGroup={group}
                cardType="quit"
                handleConfirmAction={handleConfirmAction}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
