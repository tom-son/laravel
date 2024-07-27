import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {useCustomerRoutes} from "../../hooks/customer";
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

  const customerRoutes = useCustomerRoutes(props.customerID);
  if (!customerRoutes.data) {
    return <>Error: No customer description</>;
  }

  const options = customerRoutes.data
      .filter(CustomerUtility.filterDeletedDescription)
      .map((option: Description) => (
        <MenuItem key={option.id} value={option.id}>
          {option.description}
        </MenuItem>
      ));

    // @ts-ignore
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
