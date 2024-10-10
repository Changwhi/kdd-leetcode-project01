import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { LogOut, Trash2 } from "lucide-react";
import { MyGroup } from "@/types/group";

interface UserGroupCardProps {
  setSelectedGroupId: (selectedGroupId: number | null) => void;
  setActionType: (actionType: "quit" | "delete" | null) => void;
  thisGroup: MyGroup;
  cardType: string;
  handleConfirmAction: () => void;
}

export const UserGroupCard: React.FC<UserGroupCardProps> = ({
  setSelectedGroupId,
  setActionType,
  thisGroup,
  cardType,
  handleConfirmAction,
}) => {
  const actionConstants: {
    icon: JSX.Element;
    promptAction: "quit" | "delete" | null;
    title: string;
    description: string;
    label: string;
    buttonName: string;
  } =
    cardType == "delete"
      ? {
          icon: <Trash2 className="h-4 w-4" />,
          promptAction: "delete",
          title: "Delete Group",
          description: `Are you sure you want to delete the group ${thisGroup.name}? This action cannot be undone.`,
          label: `Delete ${thisGroup.name} group`,
          buttonName: "Delete",
        }
      : {
          icon: <LogOut className="h-4 w-4" />,
          promptAction: "quit",
          title: "Quit Group",
          description: `Are you sure you want to quit the group ${thisGroup.name}?`,
          label: `Quit ${thisGroup.name} group`,
          buttonName: "Quit",
        };

  return (
    <Card className="flex items-center p-4">
      <CardContent className="flex-grow p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{thisGroup.name}</CardTitle>
            <CardDescription className="text-sm mt-1">
              {thisGroup.description}
            </CardDescription>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="self-end sm:self-center"
                onClick={() => {
                  setSelectedGroupId(thisGroup.group_id);
                  setActionType(actionConstants.promptAction); // Set action to quit
                }}
                aria-label={actionConstants.label}
              >
                {actionConstants.icon}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{actionConstants.title}</AlertDialogTitle>
                <AlertDialogDescription>
                  {actionConstants.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmAction}>
                  {actionConstants.buttonName}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};
