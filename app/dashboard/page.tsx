import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/lib/data/models";
import { sampleUserData } from "@/lib/data/sample";
import {
  ActivityIcon,
  ClipboardList,
  PartyPopper,
  UsersIcon,
} from "lucide-react";
import { ReactNode } from "react";
import { DashPieChart } from "../../components/dashboard/chart";
import { DataTable } from "../../components/dashboard/data-table";

export default function Page() {
  const currMonth = new Date().getMonth();
  const totalApply = sampleUserData.jobApps
    .filter((x) => x.appStatus === "Applied")
    .reduce((acc, app) => {
      if (app.dateApplied.getMonth() === currMonth) acc++;
      return acc;
    }, 0);

  return (
    <section className="flex flex-col gap-8">
      <section>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <h2 className="text-gray-400">
          Track your job applications and stay organized.
        </h2>
      </section>
      <section className="grid gap-4 lg:grid-cols-4">
        <DashMiniCards data={sampleUserData} />
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_.5fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              You've applied to {totalApply} jobs in the last month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable />
          </CardContent>
        </Card>
        <div className="grid gap-4">
          <DashPieChart data={sampleUserData} />
          <InterviewCard data={sampleUserData} />
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
}

function DashMiniCards({ data }: { data: User }) {
  // this uses sample data, change to query call

  // Still need to fix change
  const MiniCardArr: DashMiniCardType[] = [
    {
      key: 1,
      title: "Total Applications",
      icon: <UsersIcon />,
      total: data.jobApps.length,
    },
    {
      key: 2,
      title: "Interview Invites",
      icon: <ClipboardList />,
      total: data.jobApps.filter((x) => x.appStatus === "Interview").length,
    },
    {
      key: 3,
      title: "Offers",
      icon: <PartyPopper />,
      total: data.jobApps.filter((x) => x.appStatus === "Offer").length,
    },
    {
      key: 4,
      title: "Response Rate",
      icon: <ActivityIcon />,
      total: (data.jobApps.filter((x) => x.appStatus !== "Applied").length /
        data.jobApps.length),
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
            <CardContent className="text-xl">
              {card.total >= 1
                ? card.total
                : `${(card.total * 100).toFixed(1)}%`}
            </CardContent>
          </div>
        </Card>
      ))}
    </>
  );
}

function InterviewCard({ data }: { data: User }) {
  const interviews = data.jobApps.filter((x) => x.appStatus === "Interview")
    .slice(0, 5);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {interviews.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.company}</CardTitle>
              <CardDescription>{item.position}</CardDescription>
              <CardDescription className="text-xs">
                Applied on {item.dateApplied.toLocaleDateString()}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
