"use client";
// This is for the pie chart that I use in the dashboard route

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import { JobApp } from "@/lib/data/models";
import { string } from "zod";

const fill = {
  Applied: "#4f46e5",
  Interview: "#f59e0b",
  Offer: "#10b981",
  Rejected: "#ef4444",
};

const chartConfig = {
  count: {
    label: "Count",
  },
  Applied: {
    label: "Applied",
    color: fill.Applied,
  },
  Interview: {
    label: "Interview",
    color: fill.Interview,
  },
  Offer: {
    label: "Offer",
    color: fill.Offer,
  },
  Rejected: {
    label: "Rejected",
    color: fill.Rejected,
  },
} satisfies ChartConfig;

export function DashPieChart({ data }: { data: JobApp[] }) {
  const count = {
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0,
  };
  // jobApps sums all of the appStatus by type i.e. sum(All jobApps that have status interview), etc.
  const jobApps = data
    .reduce((acc, { appStatus }) => {
      acc[appStatus] = (acc[appStatus] || 0) + 1;
      return acc;
    }, count);

  const statusCount = Object.entries(jobApps).map(([appStatus, count]) => ({
    appStatus,
    count,
    fill: "",
  }));

  // res contains final array with sums & color for pie chart
  const res = statusCount.map((item) => {
    item.fill = fill[item.appStatus as keyof typeof string];
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
              content={<ChartLegendContent key={0} nameKey="appStatus" />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
