"use client";

import WidgetFooter from "./components/widget-footer";
import WidgetHeader from "./components/widget-header";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  return (
    <main className="min-h-screen min-w-screen flex w-full h-full flex-col overflow-hidden rounded-xl border bg-muted">
      <WidgetHeader>
        <div className=" font-semiboldflex flex-col justify-between gap-y-2 px-2 py-6">
          <p className=" text-3xl ">Hi there! 👋</p>
          <p className="text-lg">How can we help you today?s</p>
        </div>
      </WidgetHeader>

      <div className="flex flex-1">Widget View: {organizationId}</div>
      <WidgetFooter />
    </main>
  );
};
