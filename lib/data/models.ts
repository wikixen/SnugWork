export interface User {
  id: number;
  name: string;
  jobApps: JobApp[];
}

export interface JobApp {
  id: number;
  company: string;
  location: string;
  position: string;
  appStatus: "Applied" | "Interview" | "Offer" | "Rejected";
  dateApplied: Date;
}
