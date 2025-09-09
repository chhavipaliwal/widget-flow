"use client";

import { getCategories, addWidget, deleteWidget } from "@/app/helper";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "../ui/card";
import { Category, WidgetType } from "@/types/dashboard";
import Widget from "./widget";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import AddWidgetForm from "./add-widget-form";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const addWidgetMutation = useMutation({
    mutationFn: ({
      categoryId,
      widgetData,
    }: {
      categoryId: string;
      widgetData: any;
    }) => addWidget(categoryId, widgetData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const deleteWidgetMutation = useMutation({
    mutationFn: ({
      categoryId,
      widgetId,
    }: {
      categoryId: string;
      widgetId: string;
    }) => deleteWidget(categoryId, widgetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("Failed to delete widget:", error);
      // You could add a toast notification here
    },
  });

  return (
    <div className="p-4">
      {categories?.map((category) => (
        <Card
          className="px-4 gap-0 shadow-none border-none py-2"
          key={category.id}
        >
          <h2 className="text-lg font-semibold">{category.name}</h2>
          <div className="grid grid-cols-3 gap-4">
            {category.widgets.map((widget) => (
              <Widget
                key={widget.id}
                chartData={widget.data.breakdown}
                widgetTitle={widget.title}
                widgetId={widget.id}
                categoryId={category.id}
                onDelete={(categoryId, widgetId) =>
                  deleteWidgetMutation.mutate({ categoryId, widgetId })
                }
                isDeleting={deleteWidgetMutation.isPending}
              />
            ))}
            <NewWidgetCard
              categoryId={category.id}
              onAddWidget={addWidgetMutation.mutate}
              isLoading={addWidgetMutation.isPending}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}

const NewWidgetCard = ({
  categoryId,
  onAddWidget,
  isLoading,
}: {
  categoryId: string;
  onAddWidget: (data: { categoryId: string; widgetData: any }) => void;
  isLoading: boolean;
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (values: any) => {
    onAddWidget({
      categoryId,
      widgetData: values,
    });
    setIsFormOpen(false);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      <AddWidgetForm
        isOpen={isFormOpen}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />

      <Card className="gap-0 py-3 bg-primary/5 border-none shadow-none">
        <CardContent className="text-lg h-full font-semibold flex justify-center items-center">
          <Button
            variant="outline"
            onClick={() => setIsFormOpen(true)}
            disabled={isLoading}
          >
            <PlusIcon className="w-4 h-4" />
            Add Widget
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
