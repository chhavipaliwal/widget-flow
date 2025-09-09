import { readData } from "@/utils/server-helpers";
import { NextResponse } from "next/server";

type Params = Promise<{
  id: string;
}>;

const FILE_NAME = "categories.json";

// Get a category by id
export async function GET(_request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const data = await readData(FILE_NAME);

    const category = data.categories.find((c: any) => c.id === id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}
