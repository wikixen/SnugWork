export interface JobApp {
  id: number;
  userId: string;
  company: string;
  location: string;
  position: string;
  appStatus: "Applied" | "Interview" | "Offer" | "Rejected";
  notes: string;
  dateApplied: Date;
}
