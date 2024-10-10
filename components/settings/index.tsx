"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { SETTINGS_CONSTANTS } from "@/text/settings";
import { updateUserName } from "@/lib/actions/user";

interface SettingsProps {
  email: string;
  name: string;
  setName: (name: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({email, name, setName}) => {
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      await updateUserName(email, name);
      toast({ title: "Success", description: "User name updated successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update user name. Please try again." });
    }
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic
    console.log("Deleting account...");
    setIsDeleteDialogOpen(false);
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{SETTINGS_CONSTANTS.CARD_TITLE}</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">{SETTINGS_CONSTANTS.SETTINGS_NAME}</Label>
          <Input id="name" value={name} onChange={handleNameChange} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button onClick={handleSaveChanges} className="w-full">
          {SETTINGS_CONSTANTS.SETTINGS_SAVE}
        </Button>
        <div className="flex justify-between w-full">
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="flex w-full items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>{SETTINGS_CONSTANTS.SETTINGS_DELETE_ACCOUNT}</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {SETTINGS_CONSTANTS.ALERT_TITLE}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {SETTINGS_CONSTANTS.ALERT_DESCRIPTION}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {SETTINGS_CONSTANTS.ALERT_CANCEL}
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount}>
                  {SETTINGS_CONSTANTS.SETTINGS_DELETE_ACCOUNT}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};
