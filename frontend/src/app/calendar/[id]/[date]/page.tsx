"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import type { MaskitoOptions } from "@maskito/core";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useMemo } from "react";
import { useMaskito } from "@maskito/react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SchedulerPage = {
  params: {
    id: string;
    date: string;
  };
};

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

const scheduleFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email(),
  phone: z.string({
    required_error: "Phone is required",
  }),
  observations: z.string().optional(),
});

//TODO: Create reuseable components for the form

export default function SchedulerPage({ params }: SchedulerPage) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
  });

  const onSubmit = (
    data: z.infer<typeof scheduleFormSchema>,
    ev?: React.BaseSyntheticEvent
  ) => {
    ev?.preventDefault();
    console.log(data);
  };

  const phoneRef = useMaskito({
    options: phoneMask,
  });

  const dateString = useMemo(() => {
    const date = new Date(decodeURIComponent(params.date));
    const dateFormatted = date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
    });
    return dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);
  }, [params.date]);

  return (
    <div className="flex flex-col gap-3 items-start p-6 min-w-[50%]  h-full">
      <h1 className="text-lg font-bold">Agendamento</h1>
      <div className="flex gap-2">
        <Calendar></Calendar>
        <h2 className="text-lg font-bold">{dateString}</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full"
      >
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name" className={errors.name && "text-red-500"}>
            Name
          </Label>
          <Input id="name" placeholder="Your name" {...register("name")} />
          {errors.name && (
            <small className="text-red-500">{errors.name.message}</small>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email" className={errors.name && "text-red-500"}>
            E-mail
          </Label>
          <Input id="email" placeholder="Your e-mail" {...register("email")} />
          {errors.email && (
            <small className="text-red-500">{errors.email.message}</small>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="phone" className={errors.name && "text-red-500"}>
            Phone
          </Label>
          <Input
            id="phone"
            placeholder="(xx) xxxxx-xxxx"
            {...register("phone")}
            ref={phoneRef}
            onInput={(ev) => {
              setValue("phone", ev.currentTarget.value);
            }}
          />
          {errors.phone && (
            <small className="text-red-500">{errors.phone.message}</small>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label
            htmlFor="observations"
            className={errors.name && "text-red-500"}
          >
            Observations
          </Label>
          <Textarea id="observations" {...register("observations")} />
        </div>
        <Button type="submit" className="max-w-32 mt-5">
          Agendar
        </Button>
      </form>
    </div>
  );
}