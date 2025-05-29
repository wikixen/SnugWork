import z from "zod";

export const formSchema = z.object({
  company: z.string().min(1, {
    message: "Company can't be empty",
  }).max(255, {
    message: "Company can't be longer than 255 characters",
  }),
  location: z.string().min(1, {
    message: "Location can't be empty",
  }).max(255, {
    message: "Location can't be longer than 255 characters",
  }),
  position: z.string().min(1, {
    message: "Position can't be empty",
  }).max(255, {
    message: "Position can't be longer than 255 characters",
  }),
  appStatus: z.enum(["Applied", "Interview", "Offer", "Rejected"]),
  dateApplied: z.date()
    .max(new Date(Date.now()), {
      message: "Date applied can't be in the future",
    }),
});
