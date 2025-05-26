import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between gap-8 items-center py-4 border-b-1">
      <section className="font-bold text-2xl flex">
        <img src={"/logoDark.png"} alt="Logo" className="size-12" />
        <span>
          SnugWork
        </span>
      </section>
      <Button>
        <Link href="/login">
          Log In
        </Link>
      </Button>
    </header>
  );
}
