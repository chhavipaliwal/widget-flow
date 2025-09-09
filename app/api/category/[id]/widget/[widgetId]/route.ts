import { readData, writeData } from "@/utils/server-helpers";
import { NextResponse } from "next/server";
import { Widget, WidgetType } from "@/types/dashboard";

const FILE_NAME = "categories.json";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; widgetId: string }> }
) {
  try {
    const body = await req.json();
    const { id: categoryId, widgetId } = await params;

    if (!body.title || !body.type) {
      return NextResponse.json(
        { error: "Title and type are required" },
        { status: 400 }
      );
    }

    const validTypes: WidgetType[] = ["donut", "bar", "line", "text"];
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        {
          error: "Invalid widget type. Must be one of: donut, bar, line, text",
        },
        { status: 400 }
      );
    }

    const data = await readData(FILE_NAME);

    const categoryIndex = data.findIndex((c: any) => c.id === categoryId);
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const widgetIndex = data[categoryIndex].widgets.findIndex(
      (w: Widget) => w.id === widgetId
    );
    if (widgetIndex === -1) {
      return NextResponse.json({ error: "Widget not found" }, { status: 404 });
    }

    data[categoryIndex].widgets[widgetIndex] = {
      ...data[categoryIndex].widgets[widgetIndex],
      title: body.title,
      type: body.type,
      data: body.data || data[categoryIndex].widgets[widgetIndex].data,
    };

    await writeData(FILE_NAME, data);

    return NextResponse.json({
      success: true,
      widget: data[categoryIndex].widgets[widgetIndex],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update widget" },
      { status: 500 }
    );
  }
}

// Delete a widget from a category
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; widgetId: string }> }
) {
  try {
    const { id: categoryId, widgetId } = await params;

    const data = await readData(FILE_NAME);

    const categoryIndex = data.findIndex((c: any) => c.id === categoryId);
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const widgetIndex = data[categoryIndex].widgets.findIndex(
      (w: Widget) => w.id === widgetId
    );
    if (widgetIndex === -1) {
      return NextResponse.json({ error: "Widget not found" }, { status: 404 });
    }

    data[categoryIndex].widgets.splice(widgetIndex, 1);

    await writeData(FILE_NAME, data);

    return NextResponse.json({
      success: true,
      message: "Widget deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete widget" },
      { status: 500 }
    );
  }
}
