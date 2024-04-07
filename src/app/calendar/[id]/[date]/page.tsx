"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMaskito } from "@maskito/react";
import type { MaskitoOptions } from "@maskito/core";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";

type SchedulerPage = {
  params: {
    id: string;
    date: string;
  };
};
const scheduleFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  description: z.string().max(400).optional(),
});

const phoneMask: MaskitoOptions = {
  mask: [
    "(",
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
};

export default function SchedulerPage({ params }: SchedulerPage) {
  const date = new Date(decodeURIComponent(params.date));
  const form = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
  });
  const phoneRef = useMaskito({ options: phoneMask });

  const onSubmit = (data: z.infer<typeof scheduleFormSchema>) => {
    console.log(data);
  };

  const dateFormatted = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="flex flex-col gap-3 items-start p-6 min-w-[50%]  h-full">
      <h1 className="text-lg font-bold">Agendamento</h1>
      <div className="flex gap-2">
        <Calendar></Calendar>
        <h2 className="text-lg font-bold">
          {dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1)}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    ref={phoneRef}
                    onInput={(event) =>
                      form.setValue("phone", event.currentTarget.value)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    maxLength={400}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="max-w-32 mt-5">
            Agendar
          </Button>
        </form>
      </Form>
    </div>
  );
}
