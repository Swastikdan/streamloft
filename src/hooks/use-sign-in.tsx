"use client";

import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
  memo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Link from "next/link";
import { signIn } from "@/auth/auth-client";
import { useSession } from "@/auth/auth-client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Google, Spinner, Logo } from "@/components/ui/icons";
import { MODAL_QUERY_PARAM, CALLBACK_URL_QUERY_PARAM } from "@/constants";

/**
 * Type definition for the authentication modal context
 * @property openAuthModal - Function to open the auth modal with optional callback URL
 */
type AuthModalContextType = {
  openAuthModal: (callbackURL?: string) => void;
};

// Create context for authentication modal with initial null value
const AuthModalContext = createContext<AuthModalContextType | null>(null);

/**
 * Provider component that manages authentication modal state and provides context
 * to child components
 * @param children - Child components that will have access to the auth modal context
 */
export const AuthModalProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending: isSessionLoading } = useSession();

  // Ref to store the AbortController for canceling ongoing sign-in requests
  const signInControllerRef = useRef<AbortController | null>(null);

  // State for managing modal visibility, redirect URL, and loading states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("/");
  const [isSignInLoading, setIsSignInLoading] = useState(false);

  /**
   * Effect hook to initialize modal state from URL query parameters
   * Opens modal if the corresponding query param is present
   * Sets redirect URL if specified in query params
   */
  useEffect(() => {
    if (searchParams.get(MODAL_QUERY_PARAM) === "true") {
      setIsModalOpen(true);
    }
    const urlCallback = searchParams.get(CALLBACK_URL_QUERY_PARAM);
    if (urlCallback) setRedirectUrl(urlCallback);
  }, [searchParams]);

  /**
   * Cleans up authentication-related query parameters from the URL
   * @returns The cleaned URL string without auth-related query params
   */
  const normalizeUrlParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete(MODAL_QUERY_PARAM);
    params.delete(CALLBACK_URL_QUERY_PARAM);
    return `${window.location.pathname}${params.toString() ? `?${params}` : ""}`;
  }, []);

  /**
   * Handles modal open/close state changes
   * @param shouldOpen - Boolean indicating whether modal should be open
   */
  const handleModalToggle = useCallback(
    (shouldOpen: boolean) => {
      if (!shouldOpen) {
        // Abort any ongoing sign-in request when closing modal
        signInControllerRef.current?.abort();
        signInControllerRef.current = null;

        // Clean up URL parameters when closing modal
        router.replace(normalizeUrlParams(), { scroll: false });
      }
      setIsModalOpen(shouldOpen);
    },
    [router, normalizeUrlParams],
  );

  /**
   * Handles social authentication (Google sign-in)
   * Manages loading state and request cancellation
   */
  const handleSocialSignIn = useCallback(async () => {
    try {
      setIsSignInLoading(true);
      // Create new AbortController for this sign-in attempt
      signInControllerRef.current = new AbortController();

      const response = await signIn.social({
        provider: "google",
        callbackURL: redirectUrl,
        fetchOptions: { signal: signInControllerRef.current.signal },
      });

      // Show error toast if authentication fails
      if (response?.error) {
        toast.error("Authentication failed. Please try again.");
      }
    } catch (error) {
      // Only handle non-abort errors
      if (!(error instanceof Error)) return;
      if (error.name !== "AbortError") {
        toast.error("An unexpected error occurred during authentication.");
      }
    } finally {
      // Reset loading state regardless of success/failure
      setIsSignInLoading(false);
    }
  }, [redirectUrl]);

  /**
   * Opens the authentication modal and sets up necessary URL parameters
   * @param callbackURL - Optional URL to redirect to after successful authentication
   */
  const openAuthModal = useCallback(
    (callbackURL?: string) => {
      // Don't open if user is already authenticated
      if (session?.user) return;

      const newCallbackUrl = callbackURL ?? "/";
      setRedirectUrl(newCallbackUrl);

      // Set up URL parameters for modal and callback URL
      const params = new URLSearchParams({
        [MODAL_QUERY_PARAM]: "true",
        ...(callbackURL && { [CALLBACK_URL_QUERY_PARAM]: newCallbackUrl }),
      });

      // Update URL to reflect modal state
      router.push(`/?${params}`);
    },
    [session?.user, router],
  );

  return (
    <AuthModalContext.Provider value={{ openAuthModal }}>
      {children}

      <AuthDialog
        isOpen={isModalOpen}
        onOpenChange={handleModalToggle}
        onSubmit={handleSocialSignIn}
        isLoading={isSignInLoading}
        isSessionLoading={isSessionLoading}
      />
    </AuthModalContext.Provider>
  );
};

/**
 * Memoized authentication dialog component
 * Handles the visual presentation of the authentication modal
 */
const AuthDialog = memo(
  ({
    isOpen,
    onOpenChange,
    onSubmit,
    isLoading,
    isSessionLoading,
  }: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: () => void;
    isLoading: boolean;
    isSessionLoading: boolean;
  }) => {
    /**
     * Memoized sign-in button component
     * Shows loading spinner during authentication process
     */
    const SignInButton = useCallback(
      () => (
        <Button
          variant="secondary"
          size="lg"
          className="ring-ring/50 my-2 flex h-12 w-full max-w-80 items-center justify-center gap-2 ring-2"
          disabled={isLoading || isSessionLoading}
          onClick={onSubmit}
        >
          {isLoading ? (
            <Spinner className="size-4 animate-spin" />
          ) : (
            <Google className="size-4" />
          )}
          Continue with Google
        </Button>
      ),
      [onSubmit, isLoading, isSessionLoading],
    );

    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="flex w-full max-w-sm flex-col items-center justify-center py-10 sm:max-w-md">
          <DialogHeader className="flex flex-col items-center justify-center">
            <Logo className="mb-2 size-16" />
            <DialogTitle className="text-xl font-bold sm:text-2xl">
              Sign in to Streamloft
            </DialogTitle>
            <DialogDescription className="text-sm">
              Welcome back! Please sign in to continue
            </DialogDescription>
          </DialogHeader>

          <SignInButton />

          <DialogFooter>
            <span className="text-[10px]">
              By continuing, you agree to our &nbsp;
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>
              &nbsp; and &nbsp;
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </span>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

AuthDialog.displayName = "AuthDialog";

/**
 * Custom hook for accessing authentication modal context
 * @throws Error if used outside of AuthModalProvider
 * @returns AuthModalContext with openAuthModal function
 */
export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};
