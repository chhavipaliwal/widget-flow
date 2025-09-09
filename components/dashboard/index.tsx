"use client";

import { getCategories } from "@/app/helper";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Category, WidgetBreakdown } from "@/types/dashboard";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";
import { Badge } from "../ui/badge";

export default function Dashboard() {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <div className="p-4 space-y-4">
      {categories?.map((category) => (
        <Card
          className="px-4 gap-0 shadow-none border-none py-2"
          key={category.id}
        >
          <h2 className="text-lg font-semibold mb-4">{category.name}</h2>
          <div className="grid grid-cols-3 gap-4">
            {category.widgets.map((widget) => (
              <WidgetContainerCard
                key={widget.id}
                chartData={widget.data.breakdown}
                widgetTitle={widget.title}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function WidgetContainerCard({
  chartData,
  widgetTitle,
}: {
  chartData: WidgetBreakdown[];
  widgetTitle: string;
}) {
  return (
    <Card className="gap-0 py-3">
      <CardHeader className="px-4">
        <CardTitle>{widgetTitle}</CardTitle>
      </CardHeader>

      <CardContent className="flex-row justify-between flex gap-4 px-2">
        <ResponsiveContainer
          className="[&_.recharts-surface]:outline-hidden"
          height={180}
          width={180}
          minWidth={180}
        >
          <PieChart accessibilityLayer>
            <Tooltip
              content={({ payload }) =>
                payload?.map((p, index) => {
                  const name = p.name;
                  const value = p.value;

                  return (
                    <Badge key={index}>
                      {value} {name}
                    </Badge>
                  );
                })
              }
              cursor={false}
            />
            <Pie
              data={chartData}
              cx={80}
              cy={80}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              animationEasing="ease"
              nameKey="name"
              strokeWidth={0}
            >
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="text-tiny text-default-500 flex min-w-40 flex-col justify-center gap-4 p-4 lg:p-0">
          {chartData.map((entry, index) => (
            <div key={index} className="flex text-xs items-center gap-2">
              <span
                className="h-4 w-4 rounded-sm"
                style={{
                  backgroundColor: entry.color,
                }}
              />
              <span className="capitalize">
                {entry.name} ({entry.value})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
