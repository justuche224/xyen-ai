"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "./nav-documents";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SVGLogo from "@/components/logo";
import { Link } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending, error } = authClient.useSession();
  const {
    data: quizList,
    error: quizListError,
    isLoading: quizListLoading,
  } = useQuery(
    orpc.quiz.getOnlyQuizTitle.queryOptions({
      input: { userId: session?.user?.id as string, limit: 10, offset: 0 },
    })
  );

  const data = {
    user: isPending
      ? {
          name: "Loading...",
          email: "Loading...",
          avatar: "/placeholder.png",
        }
      : error || !session
      ? {
          name: "Error",
          email: "Error",
          avatar: "/placeholder.png",
        }
      : {
          name: session.user.name,
          email: session.user.email,
          avatar: session.user.image || "/placeholder.png",
        },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
      },
      {
        title: "Quizzes",
        url: "/dashboard/quizzes",
        icon: IconListDetails,
      },
      {
        title: "Analytics",
        url: "#",
        icon: IconChartBar,
      },
      {
        title: "Projects",
        url: "#",
        icon: IconFolder,
      },
      {
        title: "Team",
        url: "#",
        icon: IconUsers,
      },
    ],
    navClouds: [
      {
        title: "Capture",
        icon: IconCamera,
        isActive: true,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Proposal",
        icon: IconFileDescription,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Prompts",
        icon: IconFileAi,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "/dashboard/help",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "/dashboard/search",
        icon: IconSearch,
      },
    ],
    documents: quizListLoading
      ? [
          {
            name: "Loading quizzes...",
            url: "#",
            icon: IconFileWord,
          },
        ]
      : quizListError
      ? [
          {
            name: "Error loading quizzes",
            url: "#",
            icon: IconFileWord,
          },
        ]
      : quizList?.map((quiz) => ({
          name: quiz.title,
          url: `/dashboard/quizzes/${quiz.id}`,
          icon: IconFileWord,
        })) || [],
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/dashboard">
                <SVGLogo width={50} height={50} className="h-10 w-10" />
                <span className="text-base font-semibold">Xyen AI</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
