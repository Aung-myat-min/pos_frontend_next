import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";

type paramsType = { params: { staffId: string } };

/* GET /api/v1/staffs/:staffId */
export async function GET(req: NextRequest, { params }: { params: { staffId: string } }) {
    const response = await catchAsyncError("[STAFF_GETONE]", async () => {
        const staff = await prisma.staff.findUnique({
            where: {
                staffId: params.staffId,
            },
        });

        if (!staff) return NextResponse.json({ message: "Staff not found." }, { status: 404 });

        return NextResponse.json({
            message: "success",
            data: {
                staff,
            },
        });
    });

    return response;
}

/* PATCH /api/v1/staffs/:staffId */
export async function PATCH(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[STAFF_PATCH]", async () => {
        const body = await req.json();

        const updatedStaff = await prisma.staff.update({
            where: {
                staffId: params.staffId,
            },
            data: {
                staffCode: body.staffCode,
                staffName: body.staffName,
            },
        });

        if (!updatedStaff)
            return NextResponse.json({ message: "Staff not found." }, { status: 404 });

        return NextResponse.json({
            message: "success",
            data: {
                staff: updatedStaff,
            },
        });
    });

    return response;
}

/* DELETE /api/v1/staffs/:staffId */
export async function DELETE(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[STAFF_DELETE]", async () => {
        const deletedStaff = await prisma.staff.delete({
            where: { staffId: params.staffId },
        });

        if (!deletedStaff)
            return NextResponse.json({ message: "Staff not found." }, { status: 404 });

        return NextResponse.json(
            {
                message: "success",
                data: null,
            },
            { status: 204 },
        );
    });

    return response;
}
