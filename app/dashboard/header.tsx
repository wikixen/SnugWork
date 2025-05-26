"use client";

import { LogOut, MenuIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export default function Header() {
  return (
    <header className="flex justify-between gap-8 items-center py-4 border-b-1">
      <section className="font-bold text-2xl flex">
        <img src={"/logoDark.png"} alt="Logo" className="size-12" />
        <span>
          SnugWork
        </span>
      </section>
      <nav className="flex justify-end">
        <div className="not-sm:hidden">
          <Button variant="destructive">
            <LogOut />
            <span>Log Out</span>
          </Button>
        </div>
        <div className="sm:hidden">
          <MiniNav />
        </div>
      </nav>
    </header>
  );
}

function MiniNav() {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-semibold">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <div className="flex p-1 size-full rounded-sm gap-2 items-center">
              <LogOut />
              Log Out
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
