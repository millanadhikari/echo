import { DashhboardLayout } from "@/modules/dashboard/ui/layout/dashboard-layout";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return <DashhboardLayout>{children}</DashhboardLayout>;
}

export default Layout;
