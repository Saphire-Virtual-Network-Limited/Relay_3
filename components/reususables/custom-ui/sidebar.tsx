"use client";
import {
  Home,
  Users,
  Settings,
  LogOut,
  ChartBar,
  ChevronDown,
  Store,
  Package2Icon,
  Users2,
  Phone,
  Code,
  CreditCard,
  Check,
  X,
  UserCheck,
  BriefcaseBusiness,
  ClipboardCheckIcon,
  Wrench,
  BarChart3,
  LayoutDashboard,
  IdCard,
  Receipt,
  Package,
} from "lucide-react";
import { IoLogoAndroid, IoLogoApple } from "react-icons/io5";
import { getUserRole } from "@/lib";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib";
import { useState } from "react";
import { IoBusiness } from "react-icons/io5";
import { getSelectedProduct } from "@/utils";
import { hasPermission } from "@/lib/permissions";

console.log("Selected Product:", getSelectedProduct());
// Define types for menu items
type SubItem = {
  title: string;
  url?: string;
  subItems?: SubItem[];
};

type MenuItem = {
  title: string;
  icon: React.FC<any>;
  url?: string;
  subItems?: SubItem[];
  id?: string;
};

export function AppSidebar() {
  const { logout, userResponse } = useAuth();
  const { setOpenMobile, isMobile } = useSidebar();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [openNestedMenus, setOpenNestedMenus] = useState<{
    [key: string]: boolean;
  }>({});
  const { label: selectedProduct } = getSelectedProduct();
  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Function to close mobile sidebar
  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const apiDocsUrl = process.env.NEXT_PUBLIC_API_DOCS_URL;
  const accessRole = getUserRole(userResponse?.data?.role);
  const canVerifyMobiflex = hasPermission(
    accessRole,
    "verifyMobiflex",
    userResponse?.data?.email
  );
  const conditionalSentinelItems: MenuItem[] =
    //    selectedProduct === "Sentinel"
    //     ?
    [
      {
        icon: BriefcaseBusiness,
        title: "Activities",
        id: "finance-stores",
        subItems: [
          {
            title: "Activation OTP",
            url: "/access/sales/activities/activation-otp",
          },
          {
            title: "Approved",
            url: "/access/sales/referees/approved-referees",
          },
          {
            title: "Rejected",
            url: "/access/sales/referees/rejected-referees",
          },
        ],
      },
      {
        icon: IoLogoAndroid,
        title: "Android Tools",
        id: "android-tools",
        subItems: [
          {
            title: "Android Activation",
            url: "/access/sales/android-tools/android-activation",
          },
          {
            title: "Approved",
            url: "/access/sales/referees/approved-referees",
          },
          {
            title: "Rejected",
            url: "/access/sales/referees/rejected-referees",
          },
        ],
      },
      {
        icon: IoLogoApple,
        title: "IOS Tools",
        id: "ios-tools",
        subItems: [
          {
            title: "IOS Activation",
            url: "/access/sales/ios-tools/ios-activation",
          },
          {
            title: "Approved",
            url: "/access/sales/referees/approved-referees",
          },
          {
            title: "Rejected",
            url: "/access/sales/referees/rejected-referees",
          },
        ],
      },
    ];
  // : [];

  const scanParterItems: MenuItem[] = [
    {
      icon: IoBusiness,
      title: "Profile",
      url: "/access/scan-partner/profile",
      id: "scan-partner-profile",
    },
  ];

  const adminRootItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/access/admin/",
      id: "admin-dashboard",
    },
    {
      icon: CreditCard,
      title: "Loans",
      url: "/access/admin/loans",
      id: "admin-loans",
    },
    {
      icon: Users,
      title: "Customers",
      url: "/access/admin/customers",
      id: "admin-customers",
    },
    {
      icon: UserCheck,
      title: "Verification",
      id: "admin-referees",
      subItems: [
        {
          title: "Pending",
          url: "/access/admin/referees/unapproved-referees",
        },
        {
          title: "Approved",
          url: "/access/admin/referees/approved-referees",
        },
        {
          title: "Rejected",
          url: "/access/admin/referees/rejected-referees",
        },
      ],
    },
    {
      icon: Store,
      title: "Stores",
      url: "/access/admin/stores",
      id: "admin-stores",
    },
    {
      icon: IoBusiness,
      title: "Staff",
      url: "/access/admin/staff",
      id: "admin-staff",
      subItems: [
        {
          title: "Mobiflex Sales Agent",
          url: "/access/admin/staff/agents",
        },
        {
          title: "MBE",
          url: "/access/admin/staff/mbe",
        },

        {
          title: "SCAN Partners",
          url: "/access/admin/staff/scan-partners",
        },
      ],
    },
    {
      icon: ChartBar,
      title: "Reports",
      id: "admin-reports",
      subItems: [
        {
          title: "Sales",
          subItems: [
            {
              title: "Overview",
              url: "/access/admin/reports/sales/overview",
            },
            {
              title: "MBE Report",
              url: "/access/admin/reports/sales/mbe",
            },
            {
              title: "Samsung Report",
              url: "/access/admin/reports/sales/samsung",
            },
            {
              title: "Xiaomi Report",
              url: "/access/admin/reports/sales/xiaomi",
            },
            {
              title: "Oppo Report",
              url: "/access/admin/reports/sales/oppo",
            },
            {
              title: "Sentinel",
              url: "/access/admin/reports/sales/sentinel",
            },
            {
              title: "Low Downpayment",
              url: "/access/admin/reports/sales/low-downpayment",
            },
          ],
        },
        { title: "Drop-offs", url: "/access/admin/reports/drop-offs" },
        { title: "Tracker", url: "/access/admin/reports/tracker" },
      ],
    },
    {
      icon: Users2,
      title: "Users",
      id: "admin-users",
      url: "/access/admin/users/",
    },

    {
      icon: Package2Icon,
      title: "Inventory",
      id: "admin-inventory",
      subItems: [
        { title: "Devices", url: "/access/admin/inventory/devices" },
        { title: "TVs", url: "/access/admin/inventory/tvs" },
        { title: "Solar", url: "/access/admin/inventory/solar" },
      ],
    },
  ];

  const adminAndroidItems: MenuItem[] =
    selectedProduct === "Android"
      ? [
          {
            title: "Dashboard",
            icon: Home,
            url: "/access/admin/android/",
            id: "admin-android-dashboard",
          },
          {
            icon: ChartBar,
            title: "Reports",
            id: "admin-android-reports",
            subItems: [
              {
                title: "Sales",
                subItems: [
                  {
                    title: "All Activation Report",
                    url: "/access/sales/reports/sales/overview",
                  },
                  {
                    title: "Sentiflex Activation Report",
                    url: "/access/sales/reports/sales/mbe",
                  },
                  {
                    title: "Sentinel Activation Report",
                    url: "/access/sales/reports/sales/samsung",
                  },
                ],
              },

              { title: "Tracker", url: "/access/sales/reports/tracker" },
            ],
          },
          {
            title: "Claims",
            icon: BriefcaseBusiness,
            url: "/access/sales/reports/drop-offs",
            subItems: [
              {
                title: "All Device Claim Requests",
                url: "/access/sales/reports/drop-offs",
              },
            ],
          },
          {
            title: "Tools",
            icon: Wrench,
            url: "/access/sales/reports/drop-offs",
          },
          {
            title: "Statistics",
            icon: BarChart3,
            url: "/access/sales/reports/drop-offs",
          },
        ]
      : [];

  const adminRelayItems: MenuItem[] =
    selectedProduct === "Relay"
      ? [
          {
            title: "Dashboard",
            icon: Home,
            url: "/access/admin/relay/",
            id: "admin-relay-dashboard",
          },
          {
            icon: ChartBar,
            title: "Reports",
            id: "admin-relay-reports",
            subItems: [
              {
                title: "Sales",
                subItems: [
                  {
                    title: "All Sales Report",
                    url: "/access/sales/reports/sales/overview",
                  },
                  {
                    title: "MBE Sales Report",
                    url: "/access/sales/reports/sales/mbe",
                  },
                ],
              },
            ],
          },
          {
            title: "Tools",
            icon: Wrench,
            url: "/access/sales/reports/drop-offs",
            subItems: [
              {
                title: "Item Manager",
                url: "/access/sales/reports/drop-offs",
              },
              {
                title: "Active Sales User",
                url: "/access/sales/reports/drop-offs",
              },
            ],
          },
          {
            title: "Statistics",
            icon: BarChart3,
            url: "/access/sales/reports/drop-offs",
            subItems: [
              {
                title: "Daily Analytics",
                url: "/access/sales/reports/drop-offs",
              },
              {
                title: "MTD Analytics",
                url: "/access/sales/reports/drop-offs",
              },
            ],
          },
        ]
      : [];

  const adminCreditflexItems: MenuItem[] =
    selectedProduct === "Creditflex"
      ? [
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            url: `/access/${accessRole}`, ///creditflex`,
            id: `${accessRole}-creditflex-dashboard`,
          },
          {
            icon: IdCard,
            title: "Loan Management",
            id: `${accessRole}-creditflex-loan-management`,
            subItems: [
              {
                title: "All Loans",
                url: `/access/${accessRole}/creditflex/all-loans`,
              },
              {
                title: "Disbursed Loans",
                url: `/access/${accessRole}/creditflex/all-loans?status=active`,
              },
            ],
          },
          {
            title: "Loan Products",
            icon: Receipt,
            url: `/access/${accessRole}`, ///creditflex/loan-products`,
            id: `${accessRole}-creditflex-loan-products`,
          },
          {
            title: "Invoice",
            icon: Package,
            url: `/access/${accessRole}`, ///creditflex/invoices`,
            id: `${accessRole}-creditflex-invoices`,
          },
          {
            title: "Repayment",
            icon: Package,
            url: `/access/${accessRole}`, ///creditflex/repayments`,
            id: `${accessRole}-creditflex-repayments`,
          },
          {
            title: "Liquidation Request",
            icon: Package,
            url: `/access/${accessRole}`, ///creditflex/liquidation-requests`,
            id: `${accessRole}-creditflex-liquidation-requests`,
          },
          {
            title: "Top-Up Request",
            icon: Package,
            url: `/access/${accessRole}`, ///creditflex/topup-requests`,
            id: `${accessRole}-creditflex-topup-requests`,
          },
          {
            title: "Telesales Agents",
            icon: Users,
            url: `/access/${accessRole}`, ///creditflex/telesales-agents`,
            id: `${accessRole}-creditflex-telesales-agents`,
          },
        ]
      : [];

  const subAdminItems: MenuItem[] =
    selectedProduct == "Creditflex"
      ? adminCreditflexItems
      : [
          {
            title: "Dashboard",
            icon: Home,
            url: "/access/sub-admin/",
            id: "sub-admin-dashboard",
          },
          {
            icon: CreditCard,
            title: "Loans",
            url: "/access/sub-admin/loans",
            id: "sub-admin-loans",
          },
          {
            icon: Users,
            title: "Customers",
            url: "/access/sub-admin/customers",
            id: "sub-admin-customers",
          },
          {
            icon: UserCheck,
            title: "Verification",
            id: "sub-admin-referees",
            subItems: [
              {
                title: "Pending",
                url: "/access/sub-admin/referees/unapproved-referees",
              },
              {
                title: "Approved",
                url: "/access/sub-admin/referees/approved-referees",
              },
              {
                title: "Rejected",
                url: "/access/sub-admin/referees/rejected-referees",
              },
            ],
          },
          {
            icon: Store,
            title: "Stores",
            url: "/access/sub-admin/stores",
            id: "sub-admin-stores",
          },
          {
            icon: IoBusiness,
            title: "Staff",
            url: "/access/sub-admin/staff",
            id: "sub-admin-staff",
            subItems: [
              {
                title: "Mobiflex Sales Agent",
                url: "/access/sub-admin/staff/agents",
              },
              {
                title: "MBE",
                url: "/access/sub-admin/staff/mbe",
              },
              {
                title: "SCAN Partners",
                url: "/access/sub-admin/staff/scan-partners",
              },
            ],
          },
          {
            icon: ChartBar,
            title: "Reports",
            id: "sub-admin-reports",
            subItems: [
              {
                title: "Sales",
                subItems: [
                  {
                    title: "Overview",
                    url: "/access/sub-admin/reports/sales/overview",
                  },
                  {
                    title: "MBE Report",
                    url: "/access/sub-admin/reports/sales/mbe",
                  },
                  {
                    title: "Samsung Report",
                    url: "/access/sub-admin/reports/sales/samsung",
                  },
                  {
                    title: "Xiaomi Report",
                    url: "/access/sub-admin/reports/sales/xiaomi",
                  },
                  {
                    title: "Oppo Report",
                    url: "/access/sub-admin/reports/sales/oppo",
                  },
                  {
                    title: "Sentinel",
                    url: "/access/sub-admin/reports/sales/sentinel",
                  },
                ],
              },
              {
                title: "Drop-offs",
                url: "/access/sub-admin/reports/drop-offs",
              },
              { title: "Tracker", url: "/access/sub-admin/reports/tracker" },
            ],
          },
          {
            icon: Users2,
            title: "Users",
            id: "admin-users",
            url: "/access/sub-admin/users/",
          },

          {
            icon: Package2Icon,
            title: "Inventory",
            id: "sub-admin-inventory",
            subItems: [
              { title: "Devices", url: "/access/sub-admin/inventory/devices" },
              { title: "TVs", url: "/access/sub-admin/inventory/tvs" },
              { title: "Solar", url: "/access/sub-admin/inventory/solar" },
            ],
          },
        ];

  const adminItems: MenuItem[] =
    selectedProduct == "Creditflex"
      ? adminCreditflexItems
      : [...adminRootItems, ...adminRelayItems, ...adminAndroidItems];

  const salesItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/access/sales/",
      id: "sales-dashboard",
    },
    {
      title: "Report Sales",
      icon: ClipboardCheckIcon,
      url: "/access/sales/report-sales",
      id: "report-sales",
      subItems: [
        {
          title: "Accessories Sales ",
          url: "/access/sales/report-sales/accessories-sales",
        },
        {
          title: "Accessories Trade-In ",
          url: "/access/sales/report-sales/accessories-trade-in",
        },
        { title: "Devices ", url: "/access/sales/report-sales/devices" },
      ],
    },
    ...conditionalSentinelItems,
    {
      icon: ChartBar,
      title: "Reports",
      id: "sales-reports",
      subItems: [
        {
          title: "Sales",
          subItems: [
            { title: "Overview", url: "/access/sales/reports/sales/overview" },
            { title: "MBE Report", url: "/access/sales/reports/sales/mbe" },
            {
              title: "Samsung Report",
              url: "/access/sales/reports/sales/samsung",
            },
            {
              title: "Xiaomi Report",
              url: "/access/sales/reports/sales/xiaomi",
            },
            { title: "Oppo Report", url: "/access/sales/reports/sales/oppo" },
            { title: "Sentinel", url: "/access/sales/reports/sales/sentinel" },
          ],
        },
        { title: "Drop-offs", url: "/access/sales/reports/drop-offs" },
        { title: "Tracker", url: "/access/sales/reports/tracker" },
      ],
    },
    {
      icon: Package2Icon,
      title: "Inventory",
      id: "sales-inventory",
      subItems: [
        { title: "Devices", url: "/access/sales/inventory/devices" },
        { title: "TVs", url: "/access/sales/inventory/tvs" },
        { title: "Solar", url: "/access/sales/inventory/solar" },
      ],
    },
  ];
  const developerItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/access/dev/",
      id: "developer-dashboard",
    },
    {
      icon: Users,
      title: "Customers",
      url: "/access/dev/customers",
      id: "developer-customers",
    },
    {
      icon: Users,
      title: "Referees",
      id: "developer-referees",
      subItems: [
        { title: "Pending", url: "/access/dev/referees/unapproved-referees" },
        { title: "Approved", url: "/access/dev/referees/approved-referees" },
        { title: "Rejected", url: "/access/dev/referees/rejected-referees" },
      ],
    },

    {
      icon: Phone,
      title: "Devices",
      url: "/access/dev/devices",
      id: "developer-devices",
    },
    {
      icon: CreditCard,
      title: "Loans",
      url: "/access/dev/loans",
      id: "developer-loans",
    },
    {
      icon: Package2Icon,
      title: "Products",
      url: "/access/dev/products",
      id: "developer-products",
    },
    {
      icon: Users2,
      title: "Users",
      id: "admin-users",
      url: "/access/admin/users/",
    },
    {
      icon: Store,
      title: "Stores",
      url: "/access/dev/stores",
      id: "developer-stores",
    },
    {
      icon: Code,
      title: "API Docs",
      url: apiDocsUrl,
      id: "developer-api-docs",
    },
    {
      icon: ChartBar,
      title: "Drop-offs",
      url: "/access/dev/drop-offs",
      id: "developer-drop-offs",
    },
    {
      icon: ChartBar,
      title: "Sentinel",
      url: "/access/dev/sales",
      id: "developer-sales",
    },
  ];

  const adminVerificationItems: MenuItem[] = [
    {
      icon: IoBusiness,
      title: "Mobiflex Sales Agent",
      id: "verify-staff-mobiflex",
    },
  ];
  const verificationItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/access/verify/",
      id: "verification-dashboard",
    },
    {
      icon: Users,
      title: "Pending",
      url: "/access/verify/referees/unapproved-referees",
      id: "unapproved-referees",
    },
    {
      icon: Check,
      title: "Approved",
      url: "/access/verify/referees/approved-referees",
      id: "approved-referees",
    },
    {
      icon: X,
      title: "Rejected",
      url: "/access/verify/referees/rejected-referees",
      id: "rejected-referees",
    },
    ...(canVerifyMobiflex ? adminVerificationItems : []),
  ];

  const financeItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/access/finance/",
      id: "finance-dashboard",
    },
    {
      icon: Store,
      title: "Stores",
      url: "/access/finance/stores",
      id: "finance-stores",
    },
    {
      icon: CreditCard,
      title: "Loans",
      url: "/access/finance/loans",
      id: "finance-loans",
    },
    {
      icon: Store,
      title: "Customers",
      url: "/access/finance/customers",
      id: "finance-customers",
    },
    {
      icon: ChartBar,
      title: "Reports",
      id: "sales-reports",
      subItems: [
        {
          title: "Sales",
          subItems: [
            {
              title: "Overview",
              url: "/access/finance/reports/sales/overview",
            },
            { title: "MBE Report", url: "/access/finance/reports/sales/mbe" },
            {
              title: "Samsung Report",
              url: "/access/finance/reports/sales/samsung",
            },
            {
              title: "Xiaomi Report",
              url: "/access/finance/reports/sales/xiaomi",
            },
            { title: "Oppo Report", url: "/access/finance/reports/sales/oppo" },
            {
              title: "Sentinel",
              url: "/access/finance/reports/sales/sentinel",
            },
          ],
        },
        { title: "Drop-offs", url: "/access/finance/reports/drop-offs" },
        { title: "Tracker", url: "/access/finance/reports/tracker" },
      ],
    },
    {
      icon: IoBusiness,
      title: "Staff",
      url: "/access/finance/staff",
      id: "finance-staff",
      subItems: [
        {
          title: "Mobiflex Sales Agent",
          url: "/access/finance/staff/agents",
        },
        {
          title: "MBE",
          url: "/access/finance/staff/mbe",
        },
        {
          title: "SCAN Partners",
          url: "/access/finance/staff/scan-partners",
        },
      ],
    },
  ];

  const supportItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/access/support/",
      id: "support-dashboard",
    },
    {
      icon: Store,
      title: "Stores",
      url: "/access/support/stores",
      id: "support-stores",
    },
    {
      icon: CreditCard,
      title: "Customers",
      url: "/access/support/customers",
      id: "support-customers",
    },
    {
      icon: CreditCard,
      title: "Loans",
      url: "/access/support/loans",
      id: "support-loans",
    },
    {
      icon: Users,
      title: "MobiflexAgents",
      url: "/access/support/agents",
      id: "support-agents",
    },
  ];

  const collectionAdminItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/access/collection-admin/",
      id: "collection-admin-dashboard",
    },
    {
      title: "Loans",
      icon: Home,
      url: "/access/collection-admin/loans",
      id: "collection-admin-loans",
    },
    {
      icon: CreditCard,
      title: "Customers",
      url: "/access/collection-admin/customers",
      id: "collection-admin-customers",
    },
    {
      icon: UserCheck,
      title: "Verification",
      id: "collection-verification",
      subItems: [
        {
          title: "Pending",
          url: "/access/collection-admin/referees/unapproved-referees",
        },
        {
          title: "Approved",
          url: "/access/collection-admin/referees/approved-referees",
        },
        {
          title: "Rejected",
          url: "/access/collection-admin/referees/rejected-referees",
        },
      ],
    },
    {
      icon: CreditCard,
      title: "Reports",
      id: "collection-reports",
      subItems: [
        { title: "Overview", url: "/access/collection-admin/reports/overview" },
        { title: "MBE Report", url: "/access/collection-admin/reports/mbe" },
        {
          title: "Samsung Report",
          url: "/access/collection-admin/reports/samsung",
        },
        {
          title: "Xiaomi Report",
          url: "/access/collection-admin/reports/xiaomi",
        },
        { title: "Oppo Report", url: "/access/collection-admin/reports/oppo" },
      ],
    },
  ];
  const collectionOfficerItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/access/collection-officer/",
      id: "collection-officer-dashboard",
    },
    {
      icon: CreditCard,
      title: "Customers",
      url: "/access/collection-officer/customers",
      id: "collection-officer-customers",
    },
    {
      icon: CreditCard,
      title: "Reports",
      id: "collection-reports",
      subItems: [
        {
          title: "Overview",
          url: "/access/collection-officer/reports/overview",
        },
        { title: "MBE Report", url: "/access/collection-officer/reports/mbe" },
        {
          title: "Samsung Report",
          url: "/access/collection-officer/reports/samsung",
        },
        {
          title: "Xiaomi Report",
          url: "/access/collection-officer/reports/xiaomi",
        },
        {
          title: "Oppo Report",
          url: "/access/collection-officer/reports/oppo",
        },
      ],
    },
  ];

  const mbeItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/access/mbe/",
      id: "mbe-dashboard",
    },
    {
      icon: Store,
      title: "Stores",
      url: "/access/mbe/stores",
      id: "mbe-stores",
    },
    {
      icon: CreditCard,
      title: "Customers",
      url: "/access/mbe/customers",
      id: "mbe-customers",
    },
    {
      icon: CreditCard,
      title: "Loans",
      url: "/access/mbe/loans",
      id: "mbe-loans",
    },
    {
      icon: Users,
      title: "MobiflexAgents",
      url: "/access/mbe/agents",
      id: "mbe-agents",
    },
  ];

  // Get items based on user role
  const items: MenuItem[] = (() => {
    const role = userResponse?.data?.role;
    switch (role) {
      case "SUPER_ADMIN":
        return adminItems;
      case "ADMIN":
        return subAdminItems;
      case "VERIFICATION":
      case "VERIFICATION_OFFICER":
        return verificationItems;
      case "DEVELOPER":
        return developerItems;
      case "SALES":
        return salesItems;
      case "FINANCE":
        return financeItems;
      case "SUPPORT":
        return supportItems;
      case "COLLECTION_ADMIN":
        return collectionAdminItems;
      case "COLLECTION_OFFICER":
        return collectionOfficerItems;
      case "MBE":
        return mbeItems;
      case "SCAN_PARTNER":
        return scanParterItems;
      default:
        return [];
    }
  })();

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleNestedMenu = (id: string) => {
    setOpenNestedMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Sidebar
        variant="sidebar"
        className="border-none outline-none shadow-none sidebar-transition"
      >
        <SidebarHeader className="bg-black border-b border-gray-800 sidebar-transition">
          <SidebarMenu>
            <SidebarMenuItem className="py-2">
              <SidebarMenuButton
                size="lg"
                asChild
                className="hover:bg-black sidebar-transition sidebar-focus"
              >
                <Link href="/dashboard" onClick={handleLinkClick}>
                  <div className="flex items-center justify-center gap-3 px-1 p-4 sidebar-transition">
                    <div className="flex-shrink-0">
                      <Image
                        src="/images/SapphireCredit Approved Logo icon.png"
                        alt="Sapphire Credit Logo"
                        width={50}
                        height={50}
                        aria-label="Sapphire Credit Logo"
                        className="object-contain sidebar-transition"
                        style={{ height: "auto" }}
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-white font-bold text-lg sm:text-xl sidebar-text">
                        Sapphire Credit
                      </span>
                    </div>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="bg-black text-white pb-8 px-3 sm:px-5 sidebar-transition sidebar-scroll">
          <SidebarMenu className="mt-4 flex flex-1 flex-col gap-2 sm:gap-4">
            {items.map((item) => (
              <SidebarMenuItem
                key={item.id || item.title}
                className="flex flex-col gap-1 sm:gap-2"
              >
                {item.subItems ? (
                  <>
                    <SidebarMenuButton
                      className="sidebar-item-hover w-full rounded-lg px-3 py-2.5 sm:py-3 sidebar-focus"
                      onClick={() => item.id && toggleMenu(item.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <item.icon
                            className="sidebar-icon"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <span className="text-sm sm:text-base font-medium sidebar-text">
                            {item.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 sidebar-transition ${
                            item.id && openMenus[item.id] ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </SidebarMenuButton>
                    {item.id && openMenus[item.id] && (
                      <div className="ml-4 sm:ml-6 flex flex-col gap-1 sm:gap-2 sidebar-submenu">
                        {item.subItems.map((subItem) => (
                          <div key={subItem.title}>
                            {subItem.subItems ? (
                              <>
                                <button
                                  onClick={() =>
                                    toggleNestedMenu(
                                      `${item.id}-${subItem.title}`
                                    )
                                  }
                                  className="text-sm hover:text-gray-300 hover:bg-gray-800 py-2 px-3 sm:px-4 rounded-md sidebar-transition font-medium sidebar-focus w-full text-left flex items-center justify-between"
                                >
                                  <span>{subItem.title}</span>
                                  <ChevronDown
                                    className={`w-3 h-3 flex-shrink-0 sidebar-transition ${
                                      openNestedMenus[
                                        `${item.id}-${subItem.title}`
                                      ]
                                        ? "rotate-180"
                                        : ""
                                    }`}
                                  />
                                </button>
                                {openNestedMenus[
                                  `${item.id}-${subItem.title}`
                                ] && (
                                  <div className="ml-4 flex flex-col gap-1 sm:gap-2">
                                    {subItem.subItems.map((nestedItem) => (
                                      <Link
                                        key={nestedItem.title}
                                        href={nestedItem.url || "#"}
                                        onClick={handleLinkClick}
                                        className="text-sm hover:text-gray-300 hover:bg-gray-800 py-2 px-3 sm:px-4 rounded-md sidebar-transition font-medium sidebar-focus"
                                      >
                                        {nestedItem.title}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                href={subItem.url || "#"}
                                onClick={handleLinkClick}
                                className="text-sm hover:text-gray-300 hover:bg-gray-800 py-2 px-3 sm:px-4 rounded-md sidebar-transition font-medium sidebar-focus"
                              >
                                {subItem.title}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary hover:text-white w-full sidebar-transition rounded-lg px-3 py-2.5 sm:py-3 sidebar-focus"
                  >
                    <Link
                      href={item.url || "#"}
                      onClick={handleLinkClick}
                      className="flex items-center gap-2.5 sm:gap-3 w-full"
                    >
                      <item.icon
                        className="sidebar-icon"
                        style={{ width: "18px", height: "18px" }}
                      />
                      <span className="text-sm sm:text-base font-medium sidebar-text">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="bg-black text-white border-t border-gray-800 sidebar-transition">
          <SidebarMenu className="py-2 px-2 sm:px-3 flex flex-1 flex-col gap-1 sm:gap-2">
            <SidebarMenuItem className="flex flex-col gap-1 sm:gap-2">
              <SidebarMenuButton
                asChild
                className="hover:bg-primary hover:text-white w-full sidebar-transition rounded-lg px-3 py-2.5 sm:py-3 sidebar-focus"
              >
                <Link
                  href="/access/settings"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2.5 sm:gap-3 w-full"
                >
                  <Settings
                    className="sidebar-icon"
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span className="text-sm sm:text-base font-medium sidebar-transition">
                    Settings
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem className="flex flex-col gap-1 sm:gap-2">
              <SidebarMenuButton
                asChild
                className="hover:bg-red-600 hover:text-white w-full sidebar-transition rounded-lg px-3 py-2.5 sm:py-3 sidebar-focus"
              >
                <button
                  onClick={() => {
                    handleLogout();
                    if (isMobile) setOpenMobile(false);
                  }}
                  className="flex items-center gap-2.5 sm:gap-3 w-full text-sm sm:text-base font-medium sidebar-transition"
                >
                  <LogOut
                    className="sidebar-icon"
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span>Log Out</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
