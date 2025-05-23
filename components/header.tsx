"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  CalendarIcon,
  LayoutDashboard,
  ListIcon,
  LogOut,
  MenuIcon,
  SearchIcon,
  Settings,
  Settings2,
  User,
} from "lucide-react";
import Link from "next/link";
import { ReactNode, SyntheticEvent } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

export default function Header() {
  return (
    <header className="flex justify-between gap-8 items-center py-4 border-b-1">
      <section className="font-bold text-2xl">
        SnugWork
      </section>
      <section className="max-w-[60rem] not-sm:hidden">
        <Search />
      </section>
      <nav className="flex justify-end">
        <div className="not-sm:hidden">
          <NavBar />
          <SettingsDropdown />
        </div>
        <div className="sm:hidden">
          <MiniNav />
        </div>
      </nav>
    </header>
  );
}

// Need to finish implementing search later
function Search() {
  const handleSubmit = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const target = e.target as HTMLInputElement;
    console.log(target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center gap-1">
        <Input
          type="search"
          name="search"
          placeholder="Search jobs, companies..."
        />
        <Button variant="secondary">
          <SearchIcon />
        </Button>
      </form>
    </>
  );
}

const NavMenu = [
  {
    key: 1,
    icon: <LayoutDashboard />,
    tooltip: "Dashboard",
  },
  {
    key: 2,
    icon: <ListIcon />,
    tooltip: "Applications",
  },
  {
    key: 3,
    icon: <CalendarIcon />,
    tooltip: "Calendar",
  },
];

function NavBar() {
  return (
    <>
      {NavMenu.map((navLink) => (
        <TooltipProvider key={navLink.key}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                {navLink.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="p-2 border-1 border-white/20 rounded-sm mt-1 bg-black">
                {navLink.tooltip}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  );
}

const SettingsDropdownItems = [
  {
    key: 1,
    link: "/profile",
    icon: <User />,
    itemTitle: "Profile"
  },
  {
    key: 2,
    link: "/settings",
    icon: <Settings />,
    itemTitle: "Settings"
  },
]

function SettingsDropdown() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Settings2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="font-semibold">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          SettingsDropdownItems.map(item => (
            <DropdownMenuItem key={item.key}>
              <Link
                href={item.link}
                className="flex p-1 size-full rounded-sm gap-2 items-center hover:bg-white/20"
              >
                {item.icon}
                <span>{ item.itemTitle }</span>
              </Link>
            </DropdownMenuItem>
          ))
        }
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex p-1 size-full rounded-sm gap-2 items-center hover:bg-white/20">
            <LogOut />
            Log Out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
            Navigate To
          </DropdownMenuLabel>
          {
            NavMenu.map(navLink => (
              <DropdownMenuItem key={navLink.key}>
                <Link
                  href=""
                  className="flex p-1 size-full rounded-sm gap-2 items-center hover:bg-white/20"
                >
                  {navLink.icon}
                  <span>{navLink.tooltip}</span>
                </Link>
              </DropdownMenuItem>
            ))
          }
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="font-semibold">
            My Account
          </DropdownMenuLabel>
          {
            SettingsDropdownItems.map(item => (
              <DropdownMenuItem key={item.key}>
                <Link
                  href={item.link}
                  className="flex p-1 size-full rounded-sm gap-2 items-center hover:bg-white/20"
                >
                  {item.icon}
                  <span>{item.itemTitle}</span>
                </Link>
              </DropdownMenuItem>
            ))
          }
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex p-1 size-full rounded-sm gap-2 items-center hover:bg-white/20">
              <LogOut />
              Log Out
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}