import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useCustomerDescriptions } from "../../hooks/customer";
import Description from "../../types/Description";
import CustomerUtility from "../../utilities/CustomerUtility";

interface DescriptionSelectionFieldProps {
  customerID: number;
  value: any | null;
  onChange: (value: number) => void;
}

function DescriptionSelectionField(props: DescriptionSelectionFieldProps) {
  const fieldID = "description-selection-field";
  const fieldLabel = "Description";

  const customerDescriptionsQuery = useCustomerDescriptions(props.customerID);
  if (!customerDescriptionsQuery.data) {
    return <>Error: No customer description</>;
  }

  const options = customerDescriptionsQuery.data
      .filter(CustomerUtility.filterDeletedDescription)
      .map((option: Description) => (
        <MenuItem key={option.id} value={option.id}>
          {option.description}
        </MenuItem>
      ));

  function onFieldChange(event: any, child: any) {
    props.onChange(child.props.value);
  }

  return (
    <FormControl fullWidth>
      <InputLabel id={fieldID}>{fieldLabel}</InputLabel>
      <Select
        labelId={fieldID}
        id="description-field"
        value={props.value ?? ""}
        label={fieldLabel}
        onChange={onFieldChange}
      >
        {options}
      </Select>
    </FormControl>
  );
}

export default DescriptionSelectionField;
