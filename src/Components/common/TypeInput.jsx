import React from "react";
import { TextField } from "@mui/material";

const TypeInput = ({ controller, field }) => {
    const error = controller.getError(field.id);

    return <TextField
        id={field?.id}
        label={field.label}
        variant="standard"
        type={field?.dataType}
        ref={controller.ref}
        value={controller.getValue(field.id)}
        onChange={(e) => {
            controller.setValue(field.id, e.target.value);
        }}
        error={error && true}
        helperText={error}
        fullWidth
    />
}

export default TypeInput;