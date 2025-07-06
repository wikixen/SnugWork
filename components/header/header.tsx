import CreateDialog from "@/components/header/createDialog";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MenuIcon } from "lucide-react";
import Image from "next/image";

export default async function Header() {
  return (
    <header className="flex justify-between gap-8 items-center py-4 border-b-1">
      <section className="font-bold text-2xl flex">
        <Image
          src={"/logoDark.png"}
          alt="Logo"
          className="size-12"
          width={1920}
          height={1080}
        />
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
      <SignedIn>
        <div className="not-sm:hidden flex gap-2">
          <CreateDialog />
          <UserButton />
        </div>
        <div className="sm:hidden flex items-center gap-2">
          <MiniMenu />
          <UserButton />
        </div>
      </SignedIn>
    </header>
  )
}

// MiniMenu is only shown on small screens & contains the add & log out btns
function MiniMenu() {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Button variant="outline">
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-semibold">
            Options
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <CreateDialog />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}