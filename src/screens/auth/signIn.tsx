import { SignIn } from "@clerk/clerk-react";
export default function SignInPage() {
  return (
    <div className=" flex justify-center h-screen  items-center">
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
}