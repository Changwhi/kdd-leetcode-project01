"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Trash2, Upload } from "lucide-react";
import { SETTINGS_CONSTANTS } from "@/text/settings";

export const Settings = ({ group_id }: { group_id: number }) => {
  const [name, setName] = useState("Soo Park");
  const [photo, setPhoto] = useState("/placeholder.svg?height=100&width=100");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    // Implement the logic to save changes to the backend
    console.log("Saving changes:", { name, photo });
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic
    console.log("Deleting account...");
    setIsDeleteDialogOpen(false);
  };
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{SETTINGS_CONSTANTS.CARD_TITLE}</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">{SETTINGS_CONSTANTS.SETTINGS_NAME}</Label>
          <Input id="name" value={name} onChange={handleNameChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="photo">{SETTINGS_CONSTANTS.SETTINGS_PHOTO}</Label>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={photo} alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Label htmlFor="photo-upload" className="cursor-pointer">
              <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md">
                <Upload className="w-4 h-4" />
                <span>{SETTINGS_CONSTANTS.SETTINGS_UPLOAD}</span>
              </div>
              <Input
                id="photo-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </Label>
          </div>
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
