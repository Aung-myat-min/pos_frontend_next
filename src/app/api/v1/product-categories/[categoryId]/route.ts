import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";
import { NextRequest, NextResponse } from "next/server";

type paramsType = { params: { categoryId: string } };

/* GET /api/v1/product-categories/:categoryId */
export async function GET(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[CATEGORY_GETONE]", async () => {
        const productCategory = await prisma.productCategory.findUnique({
            where: {
                productCategoryId: params.categoryId,
            },
        });

        if (!productCategory)
            return NextResponse.json({ message: "Product category not found." }, { status: 404 });

        return NextResponse.json(productCategory, { status: 200 });
    });

    return response;
}

/* PUT /api/v1/product-categories/:categoryId */
export async function PUT(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[CATEGORY_PUT]", async () => {
        const body = await req.json();

        const updatedCategory = await prisma.productCategory.update({
            where: {
                productCategoryId: params.categoryId,
            },
            data: {
                productCategoryName: body.productCategoryName,
                productCategoryCode: body.productCategoryCode,
            },
        });

        if (!updatedCategory)
            return NextResponse.json({ message: "Product category not found." }, { status: 404 });

        return NextResponse.json(updatedCategory, { status: 200 });
    });

    return response;
}

/* DELETE /api/v1/product-categories/:categoryId */
export async function DELETE(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[CATEGORY_DELETE]", async () => {
        const deletedCategory = await prisma.productCategory.delete({
            where: { productCategoryId: params.categoryId },
        });

        if (!deletedCategory)
            return NextResponse.json({ message: "Product category not found." }, { status: 404 });

        return NextResponse.json(
            {
                message: "Product category deleted.",
                productCategoryId: deletedCategory.productCategoryId,
            },
            { status: 200 },
        );
    });

    return response;
}
