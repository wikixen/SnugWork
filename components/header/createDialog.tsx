"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogFooter
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobApp } from "@/lib/data/models";
import { cn } from "@/lib/utils";
import { createSchema } from "@/lib/zodSchemas/createSchema";
import { createJob } from "@/server/queries/createJob";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import DialogTemplate from "../dialog";

export default function CreateDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof createSchema>>({
    mode: "onBlur",
    resolver: zodResolver(createSchema),
    defaultValues: {
      company: "",
      location: "",
      position: "",
      appStatus: "Applied",
      notes: "",
      userId: "",
    },
    resetOptions: {
      keepDirty: false,
    },
  });

  const onSubmit = (values: z.infer<typeof createSchema>) => {
    createJob(values as JobApp);
    toast("Job Application has been added", {
      description:
        `Your application to ${values.company} for the ${values.position} position has been added`,
    });
    form.reset();
    setOpen(false);
  };

  return (
      <DialogTemplate
        trigger={
          <Button className="cursor-pointer">
            <PlusIcon />
            <span>Add Job</span>
          </Button>
        }
        title={"New Job Application"}
      desc={"Add a job that you've applied to below"}
      open={open}
      setOpen={setOpen}
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <Form {...form}>
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Amazon, Google..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="New York City,NY..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Fullstack, Frontend..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="border-1 rounded-md text-sm text-start py-[.45rem] px-3 bg-white/5">
                      <SelectTrigger>
                        <SelectValue placeholder="Applied" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Interview">Interview</SelectItem>
                        <SelectItem value="Offer">Offer</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    If no status is chosen, Applied is automatically selected.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter any notable tidibits..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {`Notes can be left empty if there's nothing to add.`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateApplied"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Applied</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-auto justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="opacity-50" />
                          {field.value
                            ? field.value.toLocaleDateString()
                            : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                          date > new Date(Date.now()) ||
                          date < new Date("1900-01-01")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          <DialogFooter className="flex justify-end">
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
    </DialogTemplate>
  );
}

