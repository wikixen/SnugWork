import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface Props {
  trigger: ReactNode;
  title: string;
  desc: string;
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogTemplate = (props: Props) => {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger asChild>
        {props.trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>
            {props.desc}
          </DialogDescription>
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  )
}

export default DialogTemplate