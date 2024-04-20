"use client";

import { useGetProductCategoryById } from "@/services/api/product-categories";
import { ProductCategoryForm } from "../form";
import { FormSkeleton } from "@/components/ui/skeletons";

interface EditProductCategoryProps {
    cid: string;
}
function EditProductCategory({ cid }: EditProductCategoryProps) {
    const { data: productCategoryRes, isLoading } = useGetProductCategoryById(cid);
    return (
        <section>
            <h1 className="mb-6 text-2xl font-medium">Edit Product Category</h1>
            <div className="flex">
                <div className="w-full">
                    {!productCategoryRes || isLoading ? (
                        <FormSkeleton />
                    ) : (
                        <ProductCategoryForm
                            initialValues={productCategoryRes?.data.category}
                            isEditMode
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

export default EditProductCategory;
