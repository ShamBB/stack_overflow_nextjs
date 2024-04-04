"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileSchema } from "@/lib/validations";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { updateUserInfo } from "@/lib/actions/user.action";

// const type: any = "create";

interface Props {
  clerkId: string;
  user: string;
}

export default function Profile({ user, clerkId }: Props) {
  const UserInfo = JSON.parse(user);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      fullName: UserInfo.name || "",
      userName: UserInfo.username || "",
      portfolio: UserInfo.portfolioWebsite || "",
      location: UserInfo.location || "",
      bio: UserInfo.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    setIsSubmitting(true);
    try {
      await updateUserInfo({
        clerkId,
        updateData: {
          username: values.userName,
          portfolioWebsite: values.portfolio,
          name: values.fullName,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });

      router.push(`/profile/${clerkId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="
        mt-9
        flex
        w-full
        flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Full Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  placeholder="Your name"
                  className="no-focus paragraph-regular 
                  background-light700_dark300 light-border-2 
                  text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Username <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  placeholder="Your username"
                  className="no-focus paragraph-regular 
                  background-light700_dark300 light-border-2 
                  text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Portfolio Link
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  placeholder="Your portfolio URL"
                  className="no-focus paragraph-regular 
                  background-light700_dark300 light-border-2 
                  text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Location <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  placeholder="Your location"
                  className="no-focus paragraph-regular 
                  background-light700_dark300 light-border-2 
                  text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Bio <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="no-focus paragraph-regular 
                  background-light700_dark300 light-border-2 
                  text-dark300_light700 resize-none border"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="primary-gradient w-fit self-end !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
}
