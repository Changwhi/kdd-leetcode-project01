import JoinButton from "@/components/link/join-button";
import { getMyGroups } from "@/lib/actions/group";
import { getLoggedInUser } from "@/lib/actions/user";

export default async function JoinPage() {
  const currentUser = await getLoggedInUser();
    const myGroups = await getMyGroups({ email: currentUser ? currentUser.email : '' });
    const isMember = myGroups.some((group) => group.group_id === 10);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <main className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Join Our Community</h1>
        <p className="text-xl mb-8">
          Welcome to our vibrant community! We&apos;re excited to have you join us on
          this journey. Our platform offers a space for collaboration, learning,
          and growth. Whether you&apos;re a seasoned professional or just starting
          out, there&apos;s a place for you here.
        </p>
        {isMember ? (
          // Render a disabled button indicating the user is already a member
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
            disabled
          >
            You are already a member
          </button>
        ) : (
          // Render the JoinButton component
          <JoinButton user={currentUser} />
        )}
      </main>
    </div>
  );
}
