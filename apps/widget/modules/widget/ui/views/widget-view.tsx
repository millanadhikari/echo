"use client";

import { useAtomValue } from "jotai";
import WidgetFooter from "../components/widget-footer";
import WidgetAuthScreen from "../screens/widget-auth-screen";
import { screenAtom } from "../../atoms/widget-atoms";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);
  const screenComponents = {
    error:<p>TODO:ERROR</p>,
    loading:<p>TODO:LOADING</p>,
    auth:<WidgetAuthScreen/>,
    selection:<p>TODO:SELECTION</p>,
    voice:<p>TODO:VOICE</p>,
    inbox:<p>TODO:INBOX</p>,
    chat:<p>TODO:CHAT</p>,
    contact:<p>TODO:CONTACT</p>,

  }
  return (
    <main className="min-h-screen min-w-screen flex w-full h-full flex-col overflow-hidden rounded-xl border bg-muted">
      {/* <WidgetAuthScreen />
      <WidgetFooter /> */}
      {screenComponents[screen]}
    </main>
  );
};
