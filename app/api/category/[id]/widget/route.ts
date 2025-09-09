import { readData, writeData } from "@/utils/server-helpers";
import { NextResponse } from "next/server";
import { Widget, WidgetType } from "@/types/dashboard";
import slugify from "slugify";

const FILE_NAME = "categories.json";

// Add a widget to a category
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { id: categoryId } = await params;

    // Validate required fields
    if (!body.title || !body.type) {
      return NextResponse.json(
        { error: "Title and type are required" },
        { status: 400 }
      );
    }

    // Validate data structure if provided
    if (body.data) {
      if (typeof body.data.total !== "number" || body.data.total < 0) {
        return NextResponse.json(
          { error: "Data total must be a non-negative number" },
          { status: 400 }
        );
      }
      if (!Array.isArray(body.data.breakdown)) {
        return NextResponse.json(
          { error: "Data breakdown must be an array" },
          { status: 400 }
        );
      }
      for (const item of body.data.breakdown) {
        if (!item.name || typeof item.value !== "number" || !item.color) {
          return NextResponse.json(
            { error: "Each breakdown item must have name, value, and color" },
            { status: 400 }
          );
        }
      }
    }

    // Validate widget type
    const validTypes: WidgetType[] = ["donut", "bar", "line", "text"];
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        {
          error: "Invalid widget type. Must be one of: donut, bar, line, text",
        },
        { status: 400 }
      );
    }

    // Read current data
    const data = await readData(FILE_NAME);

    // Find the category
    const categoryIndex = data.findIndex((c: any) => c.id === categoryId);
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Generate widget ID
    const widgetId = slugify(body.title, { lower: true });

    // Check if widget already exists in this category
    const existingWidget = data[categoryIndex].widgets.find(
      (w: Widget) => w.id === widgetId
    );
    if (existingWidget) {
      return NextResponse.json(
        { error: "Widget with this title already exists in this category" },
        { status: 400 }
      );
    }

    // Create new widget with default data structure
    const newWidget: Widget = {
      id: widgetId,
      title: body.title,
      type: body.type,
      data: body.data || {
        total: 0,
        breakdown: [],
      },
    };

    // Add widget to category
    data[categoryIndex].widgets.push(newWidget);

    // Write updated data
    await writeData(FILE_NAME, data);

    return NextResponse.json({
      success: true,
      widget: newWidget,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add widget" },
      { status: 500 }
    );
  }
}
