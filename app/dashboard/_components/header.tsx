"use client";

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

export default function Header() {
  return (
    <header className="flex justify-between gap-8 items-center py-4 border-b-1">
      <section className="font-bold text-2xl flex">
        <img src={"/logoDark.png"} alt="Logo" className="size-12" />
        <span>
          SnugWork
        </span>
      </section>
      <div className="not-sm:hidden flex gap-2">
        <Button className="cursor-pointer">
          <PlusIcon />
          <span>Add Job</span>
        </Button>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <div className="sm:hidden">
        <MiniMenu />
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
          <DropdownMenuItem>
            <div className="flex p-1 size-full rounded-sm gap-2 items-center cursor-pointer">
              <PlusIcon />
              <span>Add Job</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
