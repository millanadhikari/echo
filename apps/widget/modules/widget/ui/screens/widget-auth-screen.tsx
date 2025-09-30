import React from "react";
import WidgetHeader from "../components/widget-header";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Doc } from "@workspace/backend/_generated/dataModel";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be at most 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
});

//Temporary test organization id
const organizationId = "123";
const WidgetAuthScreen = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const createContactSession = useMutation(api.public.contactSessions.create);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!organizationId) {
      return;
    }

    const metadata: Doc<"contactSessions">["metadata"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(","),
      platform: navigator.platform,
      vendor: (navigator as any).vendor,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewPortSize: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset().toString(),
      cookieEnabled: navigator.cookieEnabled.toString(),
      referrer: document.referrer,
      currentUrl: window.location.href,
    };
    const contactSessionId = await createContactSession({
      ...values,
      organizationId,
      metadata,
    });
    console.log("Contact Session ID:", contactSessionId);
  };
  return (
    <>
      <WidgetHeader>
        <div className=" font-semiboldflex flex-col justify-between gap-y-2 px-2 py-6">
          <p className=" text-3xl ">Hi there! 👋</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <Form {...form}>
        <form
          className="flex flex-1 flex-col gap-y-4 p-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 bg-background"
                    placeholder="e.g. John Doe"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 bg-background"
                    placeholder="e.g. john.doe@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            size="lg"
            type="submit"
            className="mt-4"
          >
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
};

export default WidgetAuthScreen;
