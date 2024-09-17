/*

This creates the following routes:

/api/auth/login: The route used to perform login with Auth0.
/api/auth/logout: The route used to log the user out.
/api/auth/callback: The route Auth0 will redirect the user to after a successful login.
/api/auth/me: The route to fetch the user profile from.

 */
import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import { createUser, retrieveUser } from "@/lib/actions/user";
import { UserGroupProps } from "@/types/group";
import { createUserGroup } from "@/lib/actions/usergroup";


//TODO: This will be deleted after making create/join group page, now all new users will be automatically assigned to group 1 as user
const addNewUserToGroup = async (email: string) => {
  try {
    const response = await retrieveUser(email);
    if (response.length === 0) {
      return "User does not exist.";
    }
    const user = response[0].user_id;
    const user_group_form: UserGroupProps = {
      user_type: 1,
      init_amount: 27,
      curr_amount: 27,
      group_id: 1,
      user_id: user,
    };
    return await createUserGroup(user_group_form);
  } catch (error) {
    console.error("Error adding user to group:", error);
    return "Error adding user to group.";
  }
};

interface UserProfile {
  name: string;
  nickname: string;
  email: string;
  [key: string]: any;
}

const afterCallback = async (req: any, session: any) => {
  const user = session.user as UserProfile;

  const username = user.given_name ? user.given_name : user.username as string;
  console.log(user);
  if (user) {
    try {
      console.log(await createUser(username, user.email));
    } catch (error) {
      console.error("Error creating user:", error);
    }
    return session;
  } else {
    console.log("not logged in");
    return NextResponse.redirect("http://localhost:3000");
  }
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
});
