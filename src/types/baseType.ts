import { SaleInvoice, SaleInvoiceDetails, Staff } from "@prisma/client";

export interface ApiResponse<T = any> {
    message?: string;
    result?: number;
    data: T;
}

export type SaleInvoicesReturnType = SaleInvoice & {
    saleInvoiceDetails: SaleInvoiceDetails[];
    staff: Staff;
};
