import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { db } from "@/server/db/db";
import { ReactNode } from "react";

const formSchema = z.object 

interface CreateDialogProps {
  trigger: ReactNode;
  desc?: string;
}

export default function CreateDialog({trigger, desc}: CreateDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Add a Job Application</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
          <section></section>
          <DialogFooter className="flex justify-end">
            <Button onClick={() => { }}>Save</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}