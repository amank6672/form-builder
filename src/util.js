import TypeInput from "./Components/common-components/TypeInput";
import TypeRadio from "./Components/common-components/TypeRadio";
import TypeSelect from "./Components/common-components/TypeSelect";
import TypeTextarea from "./Components/common-components/TypeTextarea";
import { string, number, object } from 'yup';


export const ComponentCreator = (type) => {
    switch (type) {
        case 'textarea':
            return TypeTextarea;
        case 'input':
            return TypeInput;
        case 'select':
            return TypeSelect;
        case 'radio':
            return TypeRadio;
        default:
            return null;
    }
}

export const formConfig = {
    fields: [
        {
            label: 'Name',
            id: 'name',
            type: 'input',
            placeholder: 'Enter name',
            dataType: 'text',
            value: '',
            validation: {
                required: true
            },
            valid: false,
            errorMessage: 'Please Enter Your Name',
        },
        {
            label: 'Address',
            id: 'street',
            type: 'textarea',
            placeholder: 'Enter Address',
            dataType: 'text',
            value: '',
            validation: {
                required: false
            },
            valid: false,
            errorMessage: 'Please Enter Your Address',
        },
        {
            label: 'Zipcode',
            id: 'zipCode',
            type: 'input',
            placeholder: 'Enter zipcode',
            dataType: 'number',
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            errorMessage: 'Please Enter Your Zipcode',
        },
        {
            label: 'Country',
            id: 'country',
            type: 'select',
            placeholder: 'Enter country',
            dataType: 'text',
            options: [
                {
                    value: 'IN',
                    displayValue: 'India'
                },
                {
                    value: 'USA',
                    displayValue: 'America'
                },
                {
                    value: 'JAP',
                    displayValue: 'Japan'
                },

            ],
            value: '',
            validation: {
                required: true
            },
            valid: false,
            errorMessage: '',
        },
        {
            label: 'Email',
            id: 'email',
            type: 'input',
            placeholder: 'Enter email',
            dataType: 'email',
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            errorMessage: 'Please Enter Your Email',
        },
        {
            id: 'relation',
            label: 'Select Your Identity',
            type: 'radio',
            dataType: 'radio',
            value: '',
            validation: {
                required: true,
            },
            options: [
                {
                    value: 'student',
                    displayValue: 'Student'
                },
                {
                    value: 'parents',
                    displayValue: 'Parents'
                },
            ],
            valid: false,
            errorMessage: 'Please select',
            student: {
                fields: [
                    {
                        id: 'name',
                        type: 'input',
                        placeholder: 'Enter your favorite subject',
                        dataType: 'text',
                        value: '',
                        validation: {
                            required: true
                        },
                        valid: false,
                        errorMessage: '',
                    },
                ]
            },
            parents: {
                fields: [
                    {
                        id: 'street',
                        type: 'textarea',
                        placeholder: 'Describe your child nature',
                        dataType: 'text',
                        value: '',
                        validation: {
                            required: true
                        },
                        valid: false,
                        errorMessage: '',
                    }
                ]
            }
        },
    ]
}

const getCorrespondingSchemValidator = (type, field) => {
    switch (type) {
        case 'text':
        case 'email':
        case 'radio': return string();
        case 'number': return number();
        case 'required': return field.required();
        case 'isEmail': return field.email();
        default: return null;
    }
}

export const createSchema = (fields) => {
    const schemObject = {};
    fields.map(field => {
        const { validation } = field;
        let fieldValidation = getCorrespondingSchemValidator(field.dataType);
        Object.keys(validation).map(validationType => {
            if (validation[validationType]) {
                fieldValidation = getCorrespondingSchemValidator(validationType, fieldValidation);
            }
        });
        if (fieldValidation)
            schemObject[field.id] = fieldValidation;
    })
    return object(schemObject);
}