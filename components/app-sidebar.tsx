"use client";

import * as React from "react";

import { NavUser } from "@/components/nav-user";
import { NavUsers } from "@/components/nav-users";

import { Command } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { data } from "@/constants";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { NavHealthCenter } from "./nav-health-center";
import { NavRescue } from "./nav-rescue";
import { NavSecondary } from "./nav-secondary";
import { BrokerageCompany } from "./brokerage-company";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useCurrentUser();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Individuel Accident
                  </span>
                  <span className="truncate text-xs">Topfer</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {user?.role == "ADMIN" && (
          <>
            <NavUsers items={data.navUsers} />
            <NavRescue items={data.navRescue} />
            <NavHealthCenter healthCenter={data.healthCenter} />
            <BrokerageCompany brokerageCompany={data.brokerageCompany} />
            <NavSecondary items={data.navRescue} className="mt-auto" />
          </>
        )}

        {user?.role == "BROKERAGECOMPANY" && (
          <>
            <NavUsers items={data.navUsers} />
            <NavRescue items={data.navRescue} />
            <NavHealthCenter healthCenter={data.healthCenter} />
            <NavSecondary items={data.navRescue} className="mt-auto" />
          </>
        )}

        {user?.role == "FIRST_AIDERS" && (
          <>
            <NavRescue items={data.navRescue} />
            <NavSecondary items={data.navRescue} className="mt-auto" />
          </>
        )}

        {user?.role == "CARE_CENTER" && (
          <>
            <NavHealthCenter healthCenter={data.healthCenter} />
            <NavSecondary items={data.navRescue} className="mt-auto" />
          </>
        )}

      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
