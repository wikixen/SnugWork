import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { MenuIcon, PlusIcon } from "lucide-react";
import CreateDialog from "./createDialog";
import Image from "next/image";

export default async function Header() {
  return (
    <header className="flex justify-between gap-8 items-center py-4 border-b-1">
      <section className="font-bold text-2xl flex">
        <Image src={"/logoDark.png"} alt="Logo" className="size-12" width={1920} height={1080} />
        <span>
          SnugWork
        </span>
      </section>
      <div className="not-sm:hidden flex gap-2">
        <CreateDialog />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <div className="sm:hidden flex items-center gap-2">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
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
