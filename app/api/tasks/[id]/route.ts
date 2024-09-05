import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/app/Utils/connect";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        // Destructure userId from auth() correctly
        const { userId } = auth();

        const { id } = params;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        // Ensure prisma is connected and delete the task by id
        const task = await prisma?.task.delete({
            where: {
                id,
            },
        });

        console.log("Task deleted: ", task);
        return NextResponse.json({ message: "Task deleted successfully", task });

    } catch (error) {
        console.log("DELETE ERROR: ", error);
        return NextResponse.json({ error: "Error deleting the task", status: 500 });
    }
}
