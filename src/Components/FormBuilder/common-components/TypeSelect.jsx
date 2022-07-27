import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

const TypeSelect = ({ controller, field }) => {
    const error = controller.getError(field.id);

    return <FormControl variant="standard" fullWidth error={error && true}>
        <InputLabel id={field?.id}>{field?.label}</InputLabel>
        <Select
            labelId={field?.id}
            id={`${field?.id}-select`}
            value={controller.getValue(field.id)}
            label={field?.label}
            onChange={(e) => {
                controller.setValue(field.id, e.target.value);
            }}

        >
            {field?.options && field?.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.displayValue}
                </MenuItem>
            ))}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
}

export default TypeSelect;