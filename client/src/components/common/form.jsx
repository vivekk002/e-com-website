import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const types = {
  INPUT: "input",
  SELECT: "dropdown",
  TEXTAREA: "textarea",
};

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  hideSubmitButton = false,
}) => {
  const renderInputByComponentType = (getControlItem) => {
    let element = null;
    const value = formData[getControlItem.name] || "";
    switch (getControlItem.componentType) {
      case types.INPUT:
        element = (
          <Input
            name={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(event) => {
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              });
            }}
          />
        );
        break;
      case types.SELECT:
        element = (
          <Select
            value={value}
            onValueChange={(value) => {
              setFormData({ ...formData, [getControlItem.name]: value });
            }}
          >
            <SelectTrigger id={getControlItem.name} className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.label}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case types.TEXTAREA:
        element = (
          <textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(event) => {
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              });
            }}
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            onChange={(event) => {
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              });
            }}
          />
        );
        break;
    }
    return element;
  };

  return (
    <div className="space-y-4">
      {formControls.map((controlItem) => (
        <div key={controlItem.id} className="space-y-2">
          <Label htmlFor={controlItem.id}>{controlItem.label}</Label>
          {renderInputByComponentType(controlItem)}
        </div>
      ))}
      {!hideSubmitButton && (
        <Button
          type="submit"
          className="w-full"
          onClick={onSubmit}
          disabled={isBtnDisabled}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default CommonForm;
