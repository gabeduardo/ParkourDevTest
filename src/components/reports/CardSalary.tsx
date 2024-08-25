"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormattedMessage } from "react-intl";

export function CardSalary({ averageSalary }: { averageSalary: number }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardDescription>
          <FormattedMessage id={"register_average"} />
        </CardDescription>
        <CardTitle>{averageSalary.toFixed(2)}</CardTitle>
      </CardHeader>
    </Card>
  );
}
