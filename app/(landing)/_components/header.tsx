import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between gap-8 items-center py-4 border-b-1">
      <section className="font-bold text-2xl flex">
        <Image src={"/logoDark.png"} alt="Logo" className="size-12" width={1920} height={1080} />
        <span>
          SnugWork
        </span>
      </section>
      <SignedOut>
        <SignInButton forceRedirectUrl={"/dashboard"}>
          <Button className="cursor-pointer">
            Log In
          </Button>
        </SignInButton>
      </SignedOut>
    </header>
  );
}
