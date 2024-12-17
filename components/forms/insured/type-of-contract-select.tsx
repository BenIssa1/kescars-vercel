import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { typeOfContrat } from "@/constants";
import { TypecustomSpecs, TypeOfContrat } from "@/types";
import { PlusCircle } from "lucide-react";
import React from "react";


export default function TypeOfContractSelect({
  customSpecs,
  setCustomSpecs,
  prime
}: {
  customSpecs: TypecustomSpecs,
  setCustomSpecs: (specs: any) => void,
  prime: string | null
}) {
  const [selectedContract, setSelectedContract] =
    React.useState<TypeOfContrat | null>(null);
  const [customPrime, setCustomPrime] = React.useState(0);

  const handleSpecChange = (field: keyof typeof customSpecs, value: number) => {

    setCustomSpecs((specs: TypecustomSpecs) => ({
      ...specs,
      [field]: value,
    }));
  };
  return (
    <div className="p-6 rounded-lg shadow space-y-4">
      <Select
        onValueChange={(value) => {
          const contract = typeOfContrat.find(
            (contract) => contract.id === value
          );
          setSelectedContract(contract || null);
          if (contract?.isCustom) {
            setCustomSpecs({
              deathCapital: 0,
              individualCapital: 0,
              medicalExpenses: 0,
              dailyCosts: 0,
            });
            setCustomPrime(0);
          } else {
            setCustomSpecs({
              deathCapital: contract?.specs.deathCapital,
              individualCapital: contract?.specs.individualCapital,
              medicalExpenses: contract?.specs.medicalExpenses,
              dailyCosts: contract?.specs.dailyCosts,
            });
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sélectionnez un contrat" />
        </SelectTrigger>
        <SelectContent>
          {typeOfContrat.map((contract) => (
            <SelectItem
              key={contract.id}
              value={contract.id}
              className="cursor-pointer"
            >
              {contract.isCustom ? (
                <span className="flex items-center gap-2 text-primary">
                  <PlusCircle className="w-4 h-4" />
                  <span className="font-medium ">
                    {contract.name}
                  </span>
                </span>
              ) : (
                <>
                  <span className="font-medium">{contract.name}</span>
                </>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedContract && (
        <>
          <div className="pt-4 border-t space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">{"Contrat Selectionné"}</span>
              <span className="text-primary">{selectedContract.name}</span>
            </div>
          </div>

          {selectedContract?.isCustom && (
            <div className="flex justify-between items-center">
              <span className="font-medium">{"Prime: "}</span>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={customPrime}
                  onChange={(e) => setCustomPrime(Number(e.target.value))}
                  className="w-32"
                  min="0"
                  step="1"
                />
              </div>
            </div>
          )}

          {!selectedContract?.isCustom && (
            <div className="flex justify-between items-center">
              <span className="font-medium">Prime:</span>
              <span className="text-green-600 font-semibold">
                {prime} FCFA
              </span>
            </div>
          )}

          <div className="grid gap-4 pt-4 border-t">
            <div className="grid gap-2">
              <Label htmlFor="deathCapital">{'Capital décès'}</Label>
              <Input
                type="number"
                id="deathCapital"
                value={selectedContract.isCustom ? customSpecs.deathCapital : selectedContract.specs.deathCapital}
                onChange={(e) => selectedContract.isCustom && handleSpecChange('deathCapital', Number(e.target.value))}
                readOnly={!selectedContract.isCustom}
                className={!selectedContract.isCustom ? "bg-gray-50" : ""}
                placeholder={selectedContract.isCustom ? "Entrez le capital décès" : ""}
                min="0"
                step="1"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="individualCapital">{'Capital individualité'}</Label>
              <Input
                type="number"
                id="individualCapital"
                value={selectedContract.isCustom ? customSpecs.individualCapital : selectedContract.specs.individualCapital}
                onChange={(e) => selectedContract.isCustom && handleSpecChange('individualCapital', Number(e.target.value))}
                readOnly={!selectedContract.isCustom}
                className={!selectedContract.isCustom ? "bg-gray-50" : ""}
                placeholder={selectedContract.isCustom ? "Entrez le capital individualité" : ""}
                min="0"
                step="1"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="medicalExpenses">{'Frais médicaux'}</Label>
              <Input
                type="number"
                id="medicalExpenses"
                value={selectedContract.isCustom ? customSpecs.medicalExpenses : selectedContract.specs.medicalExpenses}
                onChange={(e) => selectedContract.isCustom && handleSpecChange('medicalExpenses', Number(e.target.value))}
                readOnly={!selectedContract.isCustom}
                className={!selectedContract.isCustom ? "bg-gray-50" : ""}
                placeholder={selectedContract.isCustom ? "Entrez les frais médicaux" : ""}
                min="0"
                step="1"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dailyCosts">Frais journaliers</Label>
              <Input
                type="number"
                id="dailyCosts"
                value={selectedContract.isCustom ? customSpecs.dailyCosts : selectedContract.specs.dailyCosts}
                onChange={(e) => selectedContract.isCustom && handleSpecChange('dailyCosts', Number(e.target.value))}
                readOnly={!selectedContract.isCustom}
                className={!selectedContract.isCustom ? "bg-gray-50" : ""}
                placeholder={selectedContract.isCustom ? "Entrez les frais journaliers" : ""}
                min="0"
                step="1"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
