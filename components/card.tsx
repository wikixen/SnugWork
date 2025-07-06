import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

interface Props {
  title: string;
  desc?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const CardTemplate = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.desc}</CardDescription>
      </CardHeader>
      <CardContent>
        {props.children}
      </CardContent>
      {props.footer ? <CardFooter>{ props.footer }</CardFooter> : ""}
    </Card>
  )
}

export default CardTemplate