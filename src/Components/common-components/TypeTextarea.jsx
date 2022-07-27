import React from "react";
import { TextField } from "@mui/material";

const TypeTextarea = ({ controller, field }) => {
    const error = controller.getError(field.id);

    return <TextField
        id={field?.id}
        label={field.label}
        multiline
        rows={field.rows || 2}
        value={controller.getValue(field.id)}
        onChange={(e) => {
            controller.setValue(field.id, e.target.value);
        }}
        error={error && true}
        helperText={error}
        fullWidth
    />

}

export default TypeTextarea;