import React from 'react';
import ReactDom from 'react-dom';
import { 
    ErrorMessage, 
    Formik, 
    Form, 
    Field, 
    useFormik,
    useField 
    } from 'formik';
import * as Yup from 'yup'
import './styles.css';

// custom validation with Formik:

// const validate = values => {
//     const errors = {};
//     if (!values.firstName) {
//         errors.firstName = 'Required';
//     } else if (values.firstName.length > 15){
//         errors.firstName = 'Must be 15 characters or less';
//     }

//     if (!values.lastName) {
//         errors.lastName = 'Required';
//     } else if (values.lastName.length > 20) {
//         errors.lastName = 'Must be 20 characters or less';
//     }

//     if (!values.email) {
//         errors.email = 'Required';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         errors.email = 'Invalid email address';
//     }
//     return errors
// }

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const MyCheckBox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    )
}

const SignupForm = () => {
    return ( 
        <>
        <h1>Subscribe!</h1>
        <Formik
            initialValues={{ 
                firstName: "", 
                lastName: "", 
                email: "",
                acceptedTerms: false,
                jobType: ""}}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                lastName: Yup.string() 
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                acceptedTerms: Yup.boolean()
                    .required('Required')
                    .oneOf([true], 'You must accept the terms and conditions'),
                jobType: Yup.string()
                    .oneOf(
                        ['designer', 'development', 'product', 'other'],
                        'Invalid job type'
                    )
                    .required('Required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400)
            }}
        >
        <Form>
            <MyTextInput 
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Cory"
            />

            <MyTextInput 
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Doe"
            />

            <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="cory@cory.com"
            />

            <MySelect label="Job Type" name="jobType">
                <option value="">Select a job type</option>
                <option value="designer">Designer</option>
                <option value="development">Developer</option>
                <option value="product">Product Manager</option>
                <option value="other">Other</option>
            </MySelect>

            <MyCheckBox name="acceptedTerms">
                I accept the terms and conditions.
            </MyCheckBox>

            <button type="submit">Submit</button>
        </Form>
        </Formik>
        </>
     );
};

function App() {
    return <SignupForm />
}

const rootElement = document.getElementById("root");
ReactDom.render(<App />, rootElement)