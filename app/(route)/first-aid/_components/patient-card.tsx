"use client";

import { StatmentRegistrationModalForm } from "@/components/forms/statement/registration-modal";
import { TreatmentRegistrationModalForm } from "@/components/forms/treatment/registration-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Insured } from "@prisma/client";
import { User2 } from "lucide-react";
import { BsDownload } from "react-icons/bs";

interface patientCardProps {
  patient: Insured;
}

const statusColors = {
  ACTIVE: "bg-green-500 text-primary-foreground px-3 py-2",
  INACTIVE: "bg-red-500 text-primary-foreground px-3 py-2",
  PENDING: "bg-yellow-500 text-primary-foreground px-3 py-2",
};
const statusLabels = {
  ACTIVE: "Actif",
  INACTIVE: "Inactif",
  PENDING: "En attente",
};

export function PatientCard({ patient }: patientCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-[120px] w-[120px] rounded-md shadow-lg">
          <AvatarImage src={patient?.avatar} alt={patient?.firstName} />
          <AvatarFallback>
            <User2 className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 flex items-start justify-between ">
          <div className="flex flex-col justify-around gap-6">
            <CardTitle className="text-2xl flex-1">
              <div className="">
                {patient.firstName} {patient.lastName}
                <p className="text-sm text-muted-foreground">
                  ID: {patient.identifier}
                </p>
              </div>
            </CardTitle>
            <div className="">
              <Badge variant="outline" className={statusColors[patient.status]}>
                {statusLabels[patient.status]}
              </Badge>
            </div>
          </div>
          <Button variant="outline" size={"sm"} className="font-bold">
            <BsDownload />
            Telecharger
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium">Date de naissance</p>
            <p className="text-sm text-muted-foreground">
              {new Date(patient.birthday).toLocaleDateString("fr-FR")}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Groupe sanguin</p>
            <p className="text-sm text-muted-foreground">
              {patient.bloodGroup}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">{"N° en cas d'urgent"}</p>
            <p className="text-sm text-muted-foreground">
              {patient.urgentNumber}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">{"Activité Professionnelle"}</p>
            <p className="text-sm text-muted-foreground">
              {patient.professionalActivity}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium">{"Type de couverture"}</p>
            <p className="text-sm text-muted-foreground">
              {'Couverture Sa'}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <TreatmentRegistrationModalForm insuredId={patient.id} />
        {/* <StatmentRegistrationModalForm insuredId={patient.id} /> */}
      </CardFooter>
    </Card>
  );
}
