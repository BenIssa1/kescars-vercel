"use client";

import { Patient } from "@/types";
import { Ambulance } from "lucide-react";
import React from "react";
import { PatientCard } from "./_components/patient-card";
import { SearchForm } from "./_components/search-form";
import { Insured } from "@prisma/client";

function FirstAidPage() {
  const [patient, setPatient] = React.useState<Insured | null>(null);

  return (
    <main className="h-[713.5px] overflow-auto remove-scrollbar bg-gradient-to-b from-gray-[#E8EDDF] to-gray-[#CFDBD5] dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <Ambulance className="h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold mb-2">{"Portail de secouriste"}</h1>
          <p className="text-muted-foreground">
            {"Recherchez un assuré en utilisant son identifiant"}
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <SearchForm onPatientFound={setPatient} />

          {patient && (
            <div className="w-full flex justify-center">
              <PatientCard patient={patient} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default FirstAidPage;
