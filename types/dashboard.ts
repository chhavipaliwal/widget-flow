export interface WidgetBreakdown {
  name: string;
  value: number;
  color: string;
}

export interface DonutWidgetData {
  total: number;
  breakdown: WidgetBreakdown[];
}

export type WidgetType = "donut" | "bar" | "line" | "text";

export interface Widget {
  id: string;
  title: string;
  type: WidgetType;
  data: DonutWidgetData;
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export type DashboardConfig = Category[];
