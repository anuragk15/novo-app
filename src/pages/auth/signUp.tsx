import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex w-full justify-center h-screen  items-center">
      <SignUp forceRedirectUrl="/create-account" signInUrl="/sign-in" />
    </div>
  );
}
