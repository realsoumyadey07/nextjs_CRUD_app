import connectMongoDb from "@/lib/mongodb";
import { Topic } from "@/models/task.model";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDb();
  await Topic.create({ title, description });
  return NextResponse.json({ message: "Topic created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDb();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}


export async function DELETE(request) {
  try {
    const url = new URL(request?.url);
    const id = url.searchParams.get("id");

    await connectMongoDb();
    const result = await Topic.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error deleting topic" }, { status: 500 });
  }
}

