import { readData, writeData } from "@/utils/server-helpers";
import { NextResponse } from "next/server";
import slugify from "slugify";

const FILE_NAME = "categories.json";

// Get all categories
export async function GET() {
  try {
    const data = await readData(FILE_NAME);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

// Create a category
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 }
      );
    }

    const id = slugify(body.name, { lower: true });

    const data = await readData(FILE_NAME);

    if (data.find((c: any) => c.id === id)) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 400 }
      );
    }

    data.push({
      widgets: [],
      ...body,
      id,
    });

    await writeData(FILE_NAME, data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to write data" },
      { status: 500 }
    );
  }
}
