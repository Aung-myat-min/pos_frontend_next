import { BarChartBig, Home, PackageSearch, SquareGanttChart } from "lucide-react";
import { ReactNode } from "react";

export const routeLinks: {
    href: string;
    label: string;
    iconName: string;
    icon: ReactNode;
}[] = [
    {
        href: "/",
        label: "Home",
        iconName: "home",
        icon: <Home />,
    },
    {
        href: "/dashboard",
        label: "Dashboard",
        iconName: "layout-dashboard",
        icon: <BarChartBig />,
    },
    {
        href: "/products",
        label: "Products",
        iconName: "package-search",
        icon: <PackageSearch />,
    },
    {
        href: "/product-categories",
        label: "Product Categories",
        iconName: "square-gantt-chart",
        icon: <SquareGanttChart />,
    },
];
