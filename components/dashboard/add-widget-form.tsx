"use client";

import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { WidgetType, WidgetBreakdown } from "@/types/dashboard";

interface AddWidgetFormProps {
  isOpen: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Widget title is required")
    .min(3, "Title must be at least 3 characters"),
  type: Yup.string()
    .oneOf(["donut"], "Invalid widget type")
    .required("Widget type is required"),
  data: Yup.object({
    total: Yup.number()
      .min(0, "Total must be a positive number")
      .required("Total is required"),
    breakdown: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required("Name is required"),
          value: Yup.number()
            .min(0, "Value must be positive")
            .required("Value is required"),
          color: Yup.string()
            .matches(/^#[0-9A-F]{6}$/i, "Color must be a valid hex color")
            .required("Color is required"),
        })
      )
      .min(1, "At least one breakdown item is required"),
  }),
});

const initialValues = {
  title: "",
  type: "donut" as WidgetType,
  data: {
    total: 100,
    breakdown: [
      { name: "Success", value: 60, color: "#1DA45A" },
      { name: "Failed", value: 40, color: "#B8150F" },
    ] as WidgetBreakdown[],
  },
};

const presetDataOptions = [
  {
    name: "Success/Failure",
    data: {
      total: 100,
      breakdown: [
        { name: "Success", value: 75, color: "#1DA45A" },
        { name: "Failed", value: 25, color: "#B8150F" },
      ],
    },
  },
  {
    name: "Risk Assessment",
    data: {
      total: 1000,
      breakdown: [
        { name: "Passed", value: 800, color: "#1DA45A" },
        { name: "Warning", value: 100, color: "#FBD830" },
        { name: "Failed", value: 100, color: "#B8150F" },
      ],
    },
  },
  {
    name: "Status Overview",
    data: {
      total: 50,
      breakdown: [
        { name: "Active", value: 30, color: "#5677FF" },
        { name: "Inactive", value: 15, color: "#C7CCDC" },
        { name: "Pending", value: 5, color: "#FBD830" },
      ],
    },
  },
];

const colorPresets = [
  "#1DA45A",
  "#B8150F",
  "#5677FF",
  "#FBD830",
  "#C7CCDC",
  "#E1EBFF",
  "#FF6B6B",
  "#4ECDC4",
];

export default function AddWidgetForm({
  isOpen,
  onSubmit,
  onCancel,
  isLoading,
}: AddWidgetFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>Add New Widget</DialogTitle>
          <DialogDescription>
            Create a new widget with custom data and styling.
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Widget Title</label>
                  <Field
                    name="title"
                    type="text"
                    className="w-full mt-1 px-3 py-2 border border-muted-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter widget title"
                  />
                  {errors.title && touched.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Widget Type</label>
                  <Field
                    as="select"
                    name="type"
                    className="w-full mt-1 px-3 py-2 border border-muted-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="donut">Donut Chart</option>
                    <option value="bar" disabled>
                      Bar Chart
                    </option>
                    <option value="line" disabled>
                      Line Chart
                    </option>
                    <option value="text" disabled>
                      Text Widget
                    </option>
                  </Field>
                  {errors.type && touched.type && (
                    <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Total Value</label>
                <Field
                  name="data.total"
                  type="number"
                  min="0"
                  className="w-full mt-1 px-3 py-2 border border-muted-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.data?.total && touched.data?.total && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.data.total}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Quick Presets</label>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {presetDataOptions.map((preset, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFieldValue("data", preset.data);
                      }}
                      className="text-xs"
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Chart Data</label>
                <FieldArray name="data.breakdown">
                  {({ push, remove }) => (
                    <div className="space-y-3 mt-2">
                      {values.data.breakdown.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end p-4 border border-muted-200 rounded-md bg-muted-50"
                        >
                          <div>
                            <label className="text-xs text-muted-600">
                              Name
                            </label>
                            <Field
                              name={`data.breakdown.${index}.name`}
                              type="text"
                              className="w-full px-2 py-1 border border-muted-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Item name"
                            />
                            {errors.data?.breakdown?.[index] &&
                              typeof errors.data.breakdown[index] ===
                                "object" &&
                              "name" in errors.data.breakdown[index] &&
                              touched.data?.breakdown?.[index]?.name && (
                                <p className="text-red-500 text-xs">
                                  {(errors.data.breakdown[index] as any).name}
                                </p>
                              )}
                          </div>
                          <div>
                            <label className="text-xs text-muted-600">
                              Value
                            </label>
                            <Field
                              name={`data.breakdown.${index}.value`}
                              type="number"
                              min="0"
                              className="w-full px-2 py-1 border border-muted-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.data?.breakdown?.[index] &&
                              typeof errors.data.breakdown[index] ===
                                "object" &&
                              "value" in errors.data.breakdown[index] &&
                              touched.data?.breakdown?.[index]?.value && (
                                <p className="text-red-500 text-xs">
                                  {(errors.data.breakdown[index] as any).value}
                                </p>
                              )}
                          </div>
                          <div>
                            <label className="text-xs text-muted-600">
                              Color
                            </label>
                            <div className="flex gap-1">
                              <Field
                                name={`data.breakdown.${index}.color`}
                                type="color"
                                className="min-w-8 h-8 border border-muted-300 rounded cursor-pointer"
                              />
                              <Field
                                name={`data.breakdown.${index}.color`}
                                type="text"
                                className="flex-1 px-2 py-1 border border-muted-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="#000000"
                              />
                            </div>
                            {errors.data?.breakdown?.[index] &&
                              typeof errors.data.breakdown[index] ===
                                "object" &&
                              "color" in errors.data.breakdown[index] &&
                              touched.data?.breakdown?.[index]?.color && (
                                <p className="text-red-500 text-xs">
                                  {(errors.data.breakdown[index] as any).color}
                                </p>
                              )}
                          </div>
                          <div className="flex items-end">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => remove(index)}
                              className="w-full px-2 py-1 text-red-600 hover:bg-red-50"
                              disabled={values.data.breakdown.length <= 1}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          push({
                            name: `Item ${values.data.breakdown.length + 1}`,
                            value: 0,
                            color:
                              colorPresets[
                                values.data.breakdown.length %
                                  colorPresets.length
                              ],
                          })
                        }
                        className="w-full"
                      >
                        + Add Data Point
                      </Button>
                    </div>
                  )}
                </FieldArray>
                {errors.data?.breakdown && touched.data?.breakdown && (
                  <p className="text-red-500 text-xs mt-1">
                    {Array.isArray(errors.data.breakdown)
                      ? "Please fix the errors above"
                      : errors.data.breakdown}
                  </p>
                )}
              </div>

              {/* Preview Section */}
              {values.title && values.data.breakdown.length > 0 && (
                <div className="mt-4 p-3 bg-muted-50 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Preview:</h4>
                  <div className="text-xs text-muted-600">
                    <p>
                      <strong>Title:</strong> {values.title}
                    </p>
                    <p>
                      <strong>Type:</strong> {values.type}
                    </p>
                    <p>
                      <strong>Total:</strong> {values.data.total}
                    </p>
                    <div className="mt-2">
                      <p>
                        <strong>Data Points:</strong>
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {values.data.breakdown.map((item, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs"
                            style={{
                              backgroundColor: item.color + "20",
                              color: item.color,
                            }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            {item.name} ({item.value})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Adding..." : "Add Widget"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
