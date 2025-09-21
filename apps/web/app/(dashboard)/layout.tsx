import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}

export default Layout;
