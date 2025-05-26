"use client";

import { LogOut, MenuIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
        <Button variant="destructive" className="cursor-pointer">
          <LogOut />
          <span>Log Out</span>
        </Button>
      </div>
      <div className="sm:hidden">
        <MiniMenu />
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
          <DropdownMenuItem variant="destructive">
            <div className="flex p-1 size-full rounded-sm gap-2 items-center cursor-pointer">
              <LogOut />
              Log Out
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

