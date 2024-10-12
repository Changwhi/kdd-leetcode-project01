"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
} from "@/components/ui/alert-dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Trash2, User, Loader2, CheckCircle } from "lucide-react"
import { SETTINGS_CONSTANTS } from "@/text/settings"
import { deleteUser, updateUserName } from "@/lib/actions/user"
import { useRouter } from "next/navigation"

interface ProfileProps {
  email: string
  name: string
  setName: (name: string) => void
  setUserName: (userName: string) => void
}

export default function Profile({ email, name, setName, setUserName }: ProfileProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [nameChangeSuccess, setNameChangeSuccess] = useState(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setNameChangeSuccess(false)
  }

  const handleSaveChanges = async () => {
    setIsSaving(true)
    setNameChangeSuccess(false)
    try {
      await updateUserName(email, name)
      setUserName(name)
      setNameChangeSuccess(true)
      toast({ title: "Success", description: "User name updated successfully!" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to update user name. Please try again." })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      await deleteUser(email)
      setIsDeleteDialogOpen(false)
      toast({ title: "Success", description: "Account deleted successfully!" })
      router.push("/api/auth/logout")
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete account. Please try again." })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {SETTINGS_CONSTANTS.PROFILE_SETTINGS}
          </CardTitle>
          <CardDescription>{SETTINGS_CONSTANTS.PROFILE_DESCRIPTION}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              {SETTINGS_CONSTANTS.SETTINGS_NAME}
              {nameChangeSuccess && (
                <span className="text-green-500 flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Updated
                </span>
              )}
            </Label>
            <Input 
              id="name" 
              value={name} 
              onChange={handleNameChange}
              className={nameChangeSuccess ? "border-green-500" : ""}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSaveChanges} 
            className="w-full" 
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              SETTINGS_CONSTANTS.SETTINGS_SAVE
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex text-lg items-center gap-2 text-destructive">
            <Trash2 className="h-4 w-4" />
            {SETTINGS_CONSTANTS.DANGER_ZONE}
          </CardTitle>
          <CardDescription>{SETTINGS_CONSTANTS.DANGER_DESCRIPTION}</CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                {SETTINGS_CONSTANTS.SETTINGS_DELETE_ACCOUNT}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{SETTINGS_CONSTANTS.ALERT_TITLE}</AlertDialogTitle>
                <AlertDialogDescription>
                  {SETTINGS_CONSTANTS.ALERT_DESCRIPTION}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{SETTINGS_CONSTANTS.ALERT_CANCEL}</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteAccount} 
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    SETTINGS_CONSTANTS.SETTINGS_DELETE_ACCOUNT
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}