import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { WidgetBreakdown } from "@/types/dashboard";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import ConfirmationDialog from "../ui/confirmation-dialog";

export default function Widget({
  chartData,
  widgetTitle,
  widgetId,
  categoryId,
  onDelete,
  isDeleting = false,
}: {
  chartData: WidgetBreakdown[];
  widgetTitle: string;
  widgetId: string;
  categoryId: string;
  onDelete: (categoryId: string, widgetId: string) => void;
  isDeleting?: boolean;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(categoryId, widgetId);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };
  return (
    <Card className="gap-0 py-3 bg-primary/5 border-none shadow-none relative group">
      {isDeleting && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            Deleting...
          </div>
        </div>
      )}
      <CardHeader className="px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm">{widgetTitle}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 text-gray-400 hover:text-red-500"
            title="Delete widget"
          >
            <Trash2Icon className="w-4 h-4" />
          </Button>
        </div>
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

      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Widget"
        message={`Are you sure you want to delete "${widgetTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </Card>
  );
}
