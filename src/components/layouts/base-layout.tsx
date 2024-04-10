"use client";
import ReactQueryProvider from "@/providers/react-query-provider";
import ThemeProvider from "@/providers/theme-provider";
import { PropsWithChildren } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { SaleInvoiceStoreContextProvider } from "@/providers/sale-invoice-store-provider";
interface Props extends PropsWithChildren {
    session: Session | null;
}
const BaseLayout = ({ children, session }: Props) => {
    // console.log(session?.user?.email);

    return (
        <ReactQueryProvider>
            <SessionProvider session={session}>
                <ThemeProvider>
                    <SaleInvoiceStoreContextProvider>{children}</SaleInvoiceStoreContextProvider>
                </ThemeProvider>
            </SessionProvider>
        </ReactQueryProvider>
    );
};

export default BaseLayout;
