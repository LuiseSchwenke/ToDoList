import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { config } from "process";
import prisma from "@/app/Utils/connect";

export async function DELETE(res: Request, {params} : {params: {id:string}}) {
    try {
        const userId = auth();
        const {id} = params;

        if (!userId) {
            return NextResponse.json({error: "Unauthorized", status:401})
        }

        const task = await prisma?.task.delete({
            where: {
                id,
            }
        });
        console.log("Task deleted: ", task);
        return NextResponse.json(task);
        
    } catch (error) {
        console.log("DELETE ERROR: ", error);
        return NextResponse.json({error: "Error deleting the task", status:500})
    }
}