"use client";
// This is for the pie chart that I use in the dashboard route

import { fill } from "@/components/chartFill";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { User } from "@/lib/data/models";
import { Pie, PieChart } from "recharts";

const chartConfig = {
  count: {
    label: "Count",
  },
  Applied: {
    label: "Applied",
    color: "#4f46e5",
  },
  Interview: {
    label: "Interview",
    color: "#f59e0b",
  },
  Offer: {
    label: "Offer",
    color: "#10b981",
  },
  Rejected: {
    label: "Rejected",
    color: "#ef4444",
  },
} satisfies ChartConfig;

export function DashPieChart({ data }: { data: User }) {
  // jobApps sums all of the appStatus by type i.e. sum(All jobApps that have status interview), etc.
  const jobApps = data.jobApps
    .reduce((acc: any, { appStatus }) => {
      acc[appStatus] = (acc[appStatus] || 0) + 1;
      return acc;
    }, {});

  const statusCount = Object.entries(jobApps).map(([appStatus, count]) => ({
    appStatus,
    count,
  }));

  // res contains final array with sums & color for pie chart
  const res = statusCount.map((item) => {
    (item as any).fill = (fill as any)[item.appStatus];
    return item;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={res}
              dataKey="count"
              nameKey="appStatus"
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="appStatus" />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
