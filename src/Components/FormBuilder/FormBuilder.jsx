import React from "react";
import { Button } from "@mui/material";
import { ComponentCreator } from "../../util";
import useForm from "../common/useFormHook";
import './FormBuilder.css';

const FormBuilder = ({ formConfig, onSubmitListner }) => {
    const { controller, onSubmit, reset, formRef } = useForm(formConfig);

    return <div className="form-builder">
        <form onSubmit={onSubmit(onSubmitListner)} ref={formRef}>
            <h3>Some Crazy Form</h3>
            {
                formConfig?.fields && formConfig.fields.map(field => {
                    const Component = ComponentCreator(field?.type);
                    return <div className="element-wrapper" key={field.id}>
                        <Component controller={controller} field={field} />
                    </div>
                })
            }
            <Button variant="contained" type="submit">Submit</Button> &nbsp;
            <Button variant="outlined" onClick={reset}>Reset</Button>
        </form>
    </div>
}

export default FormBuilder;