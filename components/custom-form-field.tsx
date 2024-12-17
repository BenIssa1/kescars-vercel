"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormFieldType } from "@/types";
import { E164Number } from "libphonenumber-js/core";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Textarea } from "./ui/textarea";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  inputType?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;

  onChange?: (value: any) => void;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    inputType,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex items-center rounded shadow dark:shadow-primary">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              type={inputType}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="CI"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex items-center rounded shadow dark:shadow-primary">
          <Image
            src="/svg/calendar.svg"
            height={20}
            width={20}
            alt="calendar"
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              placeholderText="dd/MM/yyyy"
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "dd/MM/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className="h-12">
              <SelectTrigger className="">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white">{props.children}</SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor={props.name}>{props.label}</Label>
          </div>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, onChange } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField
            field={{
              ...field,
              onChange: (value: any) => {
                field.onChange(value); // Appel de la fonction onChange de base
                if (onChange) onChange(value); // Appel de onChange personnalisé
              },
            }}
            props={props}
          />

          <FormMessage className="text-pink-500" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
