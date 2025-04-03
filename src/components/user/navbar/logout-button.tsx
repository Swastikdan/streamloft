import { useState, useCallback } from "react";
import { signOut } from "@/auth/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { Spinner } from "@/components/ui/icons";
export default function LogOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const handleSignOut = useCallback(async () => {
    setIsSigningOut(true);
    const signout = await signOut();

    if (signout.error) {
      toast.error("Sign out failed. Please try again.");
      setIsSigningOut(false);
    }
    setIsSigningOut(false);
  }, []);

  return (
    <Button
      variant="outline"
      className="flex h-14 w-full items-center justify-start gap-5 border-0 border-t has-[>svg]:px-6"
      size="lg"
      onClick={handleSignOut}
      disabled={isSigningOut}
    >
      {isSigningOut ? <Spinner className="size-4 animate-spin" /> : <LogOut />}
      Sign out
    </Button>
  );
}
