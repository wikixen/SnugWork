'use client';

import { Separator } from "@radix-ui/react-dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { CalendarIcon, LayoutDashboard, ListIcon, LogOut, SearchIcon, Settings, Settings2, User } from "lucide-react";
import Link from "next/link";
import { SyntheticEvent } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

export default function Header() {
  return (
    <header className="grid grid-cols-3 gap-8 items-center px-4 py-4">
      <section className="font-bold text-2xl">
        SnugWork
      </section>
      <section className="max-w-[40rem] not-sm:hidden">
        <Search />
      </section>
      <nav className="flex justify-end gap-1">
        <NavBar />
        <SettingsDropdown />
      </nav>
    </header>
  );
}

function Search() {
  const handleSubmit = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const target = e.target as HTMLInputElement
    console.log(target.value)
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center gap-1">
        <Input
          type="search"
          name="search"
          placeholder="Search jobs, companies..."
        />
        <Button>
          <SearchIcon />
        </Button>
      </form>
    </>
  )
}

function NavBar() {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline">
              <LayoutDashboard />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="p-2 border-1 border-white/20 rounded-sm mt-1">Dashboard</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline">
              <ListIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="p-2 border-1 border-white/20 rounded-sm mt-1">Applications</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline">
              <CalendarIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="p-2 border-1 border-white/20 rounded-sm mt-1">Calendar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}

function SettingsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <Settings2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <p className="font-semibold">
            My Account
          </p>
        </DropdownMenuLabel>
        <Separator />
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile" className="flex p-1 size-full rounded-sm gap-2 items-center hover:bg-white/20">
            <User />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings" className="flex p-1 size-full rounded-sm gap-2 items-center hover:bg-white/20">
            <Settings />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex p-1 size-full rounded-sm gap-2 items-center hover:bg-white/20">
            <LogOut />
            Log Out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}