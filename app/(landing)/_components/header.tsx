import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="flex justify-between gap-8 items-center py-4 border-b-1">
      <section className="font-bold text-2xl flex">
        <img src={"/logoDark.png"} alt="Logo" className="size-12" />
        <span>
          SnugWork
        </span>
      </section>
      <SignedOut>
        <SignInButton
          forceRedirectUrl={"/dashboard"}
          children={
          <Button className="cursor-pointer">
            Log In
          </Button>
        } />
      </SignedOut>
    </header>
  );
}
