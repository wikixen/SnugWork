import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignedOut, SignUpButton } from "@clerk/nextjs";
import { ArrowRight, Briefcase, TrendingUpIcon } from "lucide-react";
import { ReactNode } from "react";

interface HomeCardProps {
  id: number;
  icon: ReactNode;
  title: string;
  desc: string;
}

export default function Home() {
  const HomeCards: HomeCardProps[] = [
    {
      id: 0,
      icon: <Briefcase />,
      title: "Track Applications",
      desc:
        "Keep track of all your job applications in one organized dashboard.",
    },
    {
      id: 1,
      icon: <TrendingUpIcon />,
      title: "Analytics & Insights",
      desc: "Get insights into your job search performance and trends.",
    },
  ];
  return (
    <>
      <main className="flex flex-col gap-16 justify-center h-full">
        <section className="flex flex-col text-center gap-4 items-center">
          <h1 className="font-bold text-4xl">
            Track Your Job Search<br />
            Like a Pro
          </h1>
          <h2 className="text-gray-300">
            Stay organized, track applications, and land your dream job with
            our<br />
            comprehensive job search management platform.
          </h2>
          <SignedOut>
            <SignUpButton forceRedirectUrl={"/dashboard"}>
              <Button className="w-1/4 max-w-[12rem] cursor-pointer">
                <span className="sr-only">Sign Up</span>
                <span>Get Started</span>
                <ArrowRight />
              </Button>
            </SignUpButton>
          </SignedOut>
        </section>
        <section className="space-y-4">
          <section className="flex flex-col gap-4 items-center">
            {HomeCards.map((card) => (
              <Card
                key={card.id}
                className="flex flex-col text-center w-fit min-w-[30rem]"
              >
                <CardHeader>
                  <CardTitle>{card.icon}</CardTitle>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {card.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </section>
        </section>
      </main>
    </>
  );
}
