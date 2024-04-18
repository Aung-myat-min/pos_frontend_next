import axiosInstance from "@/lib/axios";
import { ApiResponse, SaleInvoicesReturnType } from "@/types/baseType";
import { paymentSchema } from "@/validations/payment";
import { createSaleInvoiceSchema } from "@/validations/saleInvoice";
import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query";
import { z } from "zod";

export const useGetSaleInvoices = (startDate: Date | string, endDate: Date | string) => {
    return useQuery({
        queryKey: ["sale-invoices", "get-many", startDate, endDate],
        queryFn: (): Promise<ApiResponse<{ saleInvoices: SaleInvoicesReturnType[] }>> => {
            return axiosInstance
                .get(`/sale-invoices?start=${startDate}&end=${endDate}`)
                .then((res) => res.data);
        },
        placeholderData: keepPreviousData,
    });
};

export const useGetSaleInvoiceById = (sid: string) => {
    return useQuery({
        queryKey: ["sale-invoice", "get", sid],
        queryFn: (): Promise<ApiResponse<{ saleInvoice: SaleInvoicesReturnType }>> => {
            return axiosInstance.get(`/sale-invoices/${sid}`).then((res) => res.data);
        },
    });
};

export const useCreateSaleInvoice = () => {
    return useMutation({
        mutationKey: ["sale-invoice", "create"],
        mutationFn: (
            payload: z.infer<typeof createSaleInvoiceSchema>,
        ): Promise<ApiResponse<{ saleInvoice: SaleInvoicesReturnType }>> => {
            return axiosInstance.post("/sale-invoices", payload).then((res) => res.data);
        },
    });
};

export const useUpdateInvoiceAndConfirmPayment = () => {
    return useMutation({
        mutationKey: ["payment", "sale-invoice", "update"],
        mutationFn: (payload: z.infer<typeof paymentSchema>) => {
            return axiosInstance.patch("/payment", payload);
        },
    });
};
