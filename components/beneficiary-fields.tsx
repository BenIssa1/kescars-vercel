"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FormFieldType } from "@/types";
import React from "react";
import { TiUserAddOutline, TiUserDelete } from "react-icons/ti";
import CustomFormField from "./custom-form-field";
import { Button } from "./ui/button";

interface Props {
  beneficiary: string;
  percentage: string;
  birthday: string;
}

export const BeneficiaryFields = ({ control }: { control: any }) => {
  const [data, setData] = React.useState<Props[]>([]);

  const handleBeneficiaryAdd = () => {
    setData([...data, { beneficiary: "", percentage: "", birthday: "" }]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [name]: value,
    }
    setData(updatedData);
  };

  const handleBeneficiaryRemove = (index: number) => {
    const deletedData = [...data];
    deletedData.splice(index, 1);
    setData(deletedData);
  };

  return (
    <div className="flex flex-col justify-center gap-y-3">
      <Button
        type="button"
        variant="outline"
        size={"sm"}
        className="font-medium tracking-wide text-primary broder-primary hover:text-primary shadow"
        onClick={handleBeneficiaryAdd}
      >
        <span className="">Ajouter un nouveau bénéficiaire</span>
        <TiUserAddOutline className="w-6 h-6" />
      </Button>

      <div>
        {data.map((beneficiary, index) => (
          <div
            key={index}
            className="grid  gap-2 mb-4 items-center"
          >
            
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={control}
                name={`beneficiary`}
                label={"Nom complet"}
                placeholder={"Ex: John Doe"}
                onChange={(e) => handleChange(e, index)}
              />

            {/* <div className="col-span-4">
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={control}
                name={`birthday`}
                label={"Date"}
                placeholder={"Ex: 01/01/1990"}
                onChange={(e) => handleChange(e, index)}
              />
            </div>

            <div className="col-span-2">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={control}
                name={`percentage`}
                label={"Part"}
                placeholder={"Ex: 50%"}
                onChange={(e) => handleChange(e, index)}
              />
            </div> */}

            <div className="col-span-1 flex justify-end w-full mt-8">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant={"destructive"}
                      size={"icon"}
                      onClick={() => handleBeneficiaryRemove(index)}
                    >
                      <TiUserDelete />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-destructive/80">
                    <p>{"Supprimer ce bénéficiaire"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
