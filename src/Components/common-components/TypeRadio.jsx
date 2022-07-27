import React from "react";
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, FormHelperText } from "@mui/material";


const TypeRadio = ({ controller, field }) => {
    const error = controller.getError(field.id);

    return <FormControl error={error && true} fullWidth>
        <FormLabel id={field.id} >{field?.label}</FormLabel>
        <RadioGroup
            name="radio-buttons-group"
            value={controller.getValue(field.id)}
            onChange={(e) => {
                controller.setValue(field.id, e.target.value);
            }}
        >
            {field?.options && field?.options.map((option) => (
                <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.displayValue}
                />
            ))}
        </RadioGroup>
        {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
}

export default TypeRadio;