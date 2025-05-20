import React from "react";
import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Separator } from "@/components/ui/separator";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const pathname = window.location.pathname;

  const generateBreadcrumbs = (path: string) => {
    const pathWithoutTrailingSlash = path.endsWith("/")
      ? path.slice(0, -1)
      : path;
    const segments = pathWithoutTrailingSlash.split("/").filter(Boolean);

    if (segments.length === 0) return [];

    return segments.map((segment, index) => {
      // Special handling for UUIDs in quiz paths
      if (
        segments[index - 1] === "quizzes" &&
        segment.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        )
      ) {
        return {
          text: "Quiz Details",
          href: "/" + segments.slice(0, index + 1).join("/"),
          isLast: index === segments.length - 1,
        };
      }

      const formattedSegment = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const href = "/" + segments.slice(0, index + 1).join("/");

      return {
        text: formattedSegment,
        href,
        isLast: index === segments.length - 1,
      };
    });
  };

  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1 bg-sidebar fixed top-0 left-0 right-0 z-50 shadow">
        <div className="flex items-center gap-2 px-4">
          <p className="text-lg font-bold">Xyen AI</p>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className="hidden md:block">
            <BreadcrumbList>
              {breadcrumbs.length === 0 ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  {breadcrumbs.map((breadcrumb, index) => (
                    <React.Fragment key={breadcrumb.href}>
                      {index > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {breadcrumb.isLast ? (
                          <BreadcrumbPage>{breadcrumb.text}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={breadcrumb.href}>{breadcrumb.text}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-2">
          <UserMenu />
          <ModeToggle />
          <Drawer>
            <DrawerTrigger className="md:hidden">
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent className="md:hidden">
              <DrawerHeader>
                <DrawerTitle>Xyen AI</DrawerTitle>
              </DrawerHeader>
              <DrawerFooter>
                <Button asChild variant="outline">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/dashboard/quizzes">Quizzes</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/dashboard/account">Account</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/dashboard/settings">Settings</Link>
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <hr />
    </div>
  );
}
