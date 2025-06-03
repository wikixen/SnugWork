import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JobApp } from "@/lib/data/models";
import {
  ActivityIcon,
  ClipboardList,
  PartyPopper,
  UsersIcon,
} from "lucide-react";
import { ReactNode } from "react";
import { DashPieChart } from "./_components/chart";
import { DataTable } from "./_components/DataTable/dataTable";
import { getJobs } from "@/app/dashboard/getJobs";

export default async function Page() {
  const data = await getJobs();

  if (data) {
    const currMonth = new Date().getMonth();
    const totalApply = data
      .filter((x) => x.appStatus === "Applied")
      .reduce((acc, app) => {
        if (app.dateApplied.getMonth() + 1 === currMonth) acc++;
        return acc;
      }, 0);

    return (
      <section className="flex flex-col gap-8">
        <section className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-gray-400">
              Track your job applications and stay organized.
            </p>
          </div>
        </section>
        <section className="grid gap-4 lg:grid-cols-4">
          <DashMiniCards data={data} />
        </section>
        <section className="grid gap-4 lg:grid-cols-[1fr_.5fr]">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>
                {`You've applied to ${totalApply} job(s) in the last month`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable data={data} />
            </CardContent>
          </Card>
          <div className="grid gap-4">
            <DashPieChart data={data} />
            <InterviewCard data={data} />
          </div>
        </section>
      </section>
    );
  } else {
    return (
      <section className="flex flex-col gap-8">
        <section className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-gray-400">
              Track your job applications and stay organized.
            </p>
          </div>
        </section>
        <section className="grid gap-4 lg:grid-cols-4">
          <DashMiniCards data={[]} />
        </section>
        <section className="grid gap-4 lg:grid-cols-[1fr_.5fr]">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>
                {`You've applied to 0 job(s) in the last month`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable data={[]} />
            </CardContent>
          </Card>
          <div className="grid gap-4">
            <DashPieChart data={[]} />
            <InterviewCard data={[]} />
          </div>
        </section>
      </section>
    );
  }
}

interface DashMiniCardType {
  key: number;
  title: string;
  icon: ReactNode;
  total: number; // i.e. Total Applications = 24 or Interview Invites = 20
}

function DashMiniCards({ data }: { data: JobApp[] }) {
  const MiniCardArr: DashMiniCardType[] = [
    {
      key: 1,
      title: "Total Applications",
      icon: <UsersIcon />,
      total: data.length,
    },
    {
      key: 2,
      title: "Interview Invites",
      icon: <ClipboardList />,
      total: data.filter((x) => x.appStatus === "Interview").length,
    },
    {
      key: 3,
      title: "Offers",
      icon: <PartyPopper />,
      total: data.filter((x) => x.appStatus === "Offer").length,
    },
    {
      key: 4,
      title: "Response Rate",
      icon: <ActivityIcon />,
      total: data.filter((x) => x.appStatus !== "Applied").length > 0
        ? (data.filter((x) => x.appStatus !== "Applied").length /
          data.length)
        : 0,
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

function InterviewCard({ data }: { data: JobApp[] }) {
  const interviews = data.filter((x) => x.appStatus === "Interview")
    .slice(0, 5);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {interviews.length > 0
          ? interviews.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.company}</CardTitle>
                <CardDescription>{item.position}</CardDescription>
                <CardDescription className="text-xs">
                  Applied on {item.dateApplied.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
            </Card>
          ))
          : <p className="text-gray-400 text-sm">No upcoming interviews😔</p>}
      </CardContent>
    </Card>
  );
}
