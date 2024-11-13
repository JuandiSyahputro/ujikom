"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CardWrapperProps {
  className: string;
  label: string;
  title: string;
  children: React.ReactNode;
}
const CardWrapper = ({ className, label, title, children }: CardWrapperProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex w-full flex-col items-center justify-center gap-y-4">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
