import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ActivityIcon,
  ClipboardList,
  PartyPopper,
  UsersIcon,
} from "lucide-react";
import { ReactNode } from "react";
import { DashPieChart } from "./chart";
import { sampleUserData } from "@/lib/data/sample";

export default function Page() {
  return (
    <section className="flex flex-col gap-8">
      <section>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <h2 className="text-gray-400">
          Track your job applications and stay organized.
        </h2>
      </section>
      <section className="grid gap-4 lg:grid-cols-4">
        <DashMiniCards />
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_.5fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              You've applied to {""} jobs in the last month
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <DataTable columns={columns} data={sampleUserData[0].jobApps} /> */}
          </CardContent>
        </Card>
        <div className="grid gap-4">
          <DashPieChart data={sampleUserData} />
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
        </div>
      </section>
    </section>
  );
}

interface DashMiniCardType {
  key: number;
  title: string;
  icon: ReactNode;
  total: number; // i.e. Total Applications = 24 or Interview Invites = 20
  change: number; // change = current total +- last week total
}

function DashMiniCards() {
  // this uses sample data, change to query call
  const MiniCardArr: DashMiniCardType[] = [
    {
      key: 1,
      title: "Total Applications",
      icon: <UsersIcon />,
      total: 20,
      change: 4,
    },
    {
      key: 2,
      title: "Interview Invites",
      icon: <ClipboardList />,
      total: 20,
      change: 4,
    },
    {
      key: 3,
      title: "Offers",
      icon: <PartyPopper />,
      total: 20,
      change: 4,
    },
    {
      key: 4,
      title: "Response Rate",
      icon: <ActivityIcon />,
      total: 20,
      change: .4,
    },
  ];
  return (
    <>
      {MiniCardArr.map((card) => (
        <Card className="flex flex-col gap-4" key={card.key}>
          <CardHeader className="flex justify-between">
            <CardTitle>{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <div className="flex flex-col gap-1">
            <CardContent className="text-xl">{card.total}</CardContent>
            <CardFooter className="text-sm text-gray-400">
              +{card.change > 1 ? card.change : `${card.change * 100}%`}{" "}
              since last week
            </CardFooter>
          </div>
        </Card>
      ))}
    </>
  );
}
