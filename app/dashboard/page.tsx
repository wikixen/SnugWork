import CardTemplate from "@/components/card";
import { JobApp } from "@/lib/data/models";
import { getJobs } from "@/server/queries/getJobs";
import {
  ActivityIcon,
  ClipboardList,
  PartyPopper,
  UsersIcon,
} from "lucide-react";
import { ReactNode } from "react";
import { DataTable } from "../../components/DataTable/dataTable";
import { DashPieChart } from "../../components/pieChart";

export default async function Page() {
  const data = await getJobs();

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
        <DashMiniCards data={data ? data : []} />
      </section>
      <section className="grid gap-4 2xl:grid-cols-[1fr_.5fr]">
        <CardTemplate
          title="Recent Applications"
          desc="A list of your recent applications"
        >
          <DataTable data={data ? data : []} />
        </CardTemplate>
        <div className="grid gap-4">
          <DashPieChart data={data ? data : []} />
          <InterviewCard data={data ? data : []} />
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
        <CardTemplate title={card.title} key={card.key}>
          <div className="flex flex-col gap-1">
            {card.total >= 1
              ? card.total
              : `${(card.total * 100).toFixed(1)}%`}
          </div>
        </CardTemplate>
      ))}
    </>
  );
}

function InterviewCard({ data }: { data: JobApp[] }) {
  const interviews = data.filter((x) => x.appStatus === "Interview")
    .slice(0, 5);
  return (
    <CardTemplate title="Upcoming Interviews">
      {interviews.length > 0
        ? interviews.map((item) => (
          <CardTemplate key={item.id} title={item.company} desc={item.position}>
            Applied on {item.dateApplied.toLocaleDateString()}
          </CardTemplate>
        ))
        : <p className="text-gray-400 text-sm">No upcoming interviews😔</p>}
    </CardTemplate>
  );
}
