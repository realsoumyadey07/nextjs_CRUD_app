import connectMongoDb from "@/lib/mongodb";
import { Topic } from "@/models/task.model";
import { NextResponse } from "next/server";

export async function PATCH(request, {params}){
    try {
        const {id} = params;
        const {title, description} = await request.json();
        await connectMongoDb();
        const updatedTopic = await Topic.findByIdAndUpdate(id, {title, description}, {new: true});
        if(!updatedTopic){
            return new NextResponse(JSON.stringify({message: "Topic not found!"}), {status: 404});
        }
        return new NextResponse(JSON.stringify({message: "Topic updated successfully!"}), {status: 200});
    } catch (error) {
        return new NextResponse(JSON.stringify({message: error.message}), {status: 500});
    }
}

export async function GET(request, {params}){
    const {id} = params;
    await connectMongoDb();
    const topic = await Topic.findOne({_id: id});
    return NextResponse.json({topic}, {status: 200});
}

