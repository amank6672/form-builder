import { useRef, useState } from "react";
import { createSchema } from "../../../util";

const useForm = (formConfig) => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState({});
    const ref = useRef();

    const controller = () => {
        return {
            getValue: (key) => formData[key] || '',
            setValue: (key, data) => {
                const tempFormData = { ...formData, [key]: data };
                validate(key, data).then(() => {
                    clearError(key)
                }).catch(createAndSetError);
                setFormData(tempFormData);
            },
            getError: (key) => error[key],
        }
    };

    const reset = () => {
        ref.current.reset();
        setFormData({});
        setError({});
    }

    const clearError = (key) => {
        if (!error[key])
            return;
        const tempError = { ...error };
        delete tempError[key];
        setError({ ...tempError })
    }

    const validate = (key, data) => {
        const fields = key ? formConfig.fields.filter(it => it.id === key) : formConfig.fields;
        const schemaData = data ? { [key]: data } : formData;
        const schema = createSchema(fields);
        return schema.validate(schemaData, { abortEarly: false });
    }

    const createAndSetError = (err) => {
        const tempError = {};
        if (err.errors.length > 0) {
            err.inner.map(it => {
                tempError[it.path] = it.message;
            });
        }
        setError({ ...error, ...tempError });
    }

    const onSubmit = (submitHandler) => (e) => {
        e.preventDefault();
        validate()
            .then((res) => {
                if (Object.keys(error).length === 0 && typeof submitHandler === 'function') {
                    submitHandler(formData);
                    reset();
                }
            })
            .catch(createAndSetError);
    }

    return {
        formRef: ref,
        error,
        controller: controller(),
        onSubmit,
        reset,
        validate
    }
}

export default useForm;