import connectMongoDb from "@/lib/mongodb";
import { Topic } from "@/models/task.model";
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const {title, description} = await request.json();
    await connectMongoDb();
    const newTopic = await Topic.create({title, description});
    if(!newTopic){
      return new NextResponse(JSON.stringify({message: "Error while creating new topic!"}), {status: 500})
    }
    return new NextResponse(JSON.stringify(newTopic), {status: 200});
  } catch (error) {
    console.log(error.message);
    return new NextResponse(JSON.stringify({message: error.message}), {status: 500})
  }
}

export async function GET() {
  try {
    await connectMongoDb();
    const topics = await Topic.find();
    return new NextResponse(JSON.stringify({topics}), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({message: "Topics not found!"}), {status: 500});
  }
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
    return new NextResponse.json({ message: "Error while deleting topic" }, { status: 500 });
  }
}

