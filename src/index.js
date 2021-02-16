import React from 'react';
import ReactDom from 'react-dom';
import { 
    Formik, 
    Form, 
    } from 'formik';
import * as Yup from 'yup'
import * as Fields from './fields'
import * as Inputs from './inputs'
import './styles.css';

const ProjectForm = () => {

    function formValues(){
        let arr = []
        Fields.projectFields.forEach(field => {
            const object = {}
            Object.defineProperty(object, `${field.name}`, { value: " ", writable: true })
            arr.push(
                object
                // (`${field.name}: ""`)
                )
        })
        return arr
    }
    const initValues = formValues()
    
    return ( 
        <>
        <h1>Create a Project</h1>
        <Formik
            initialValues={{
                name: "",
                description: "",
                objectives: "",
                targetAudiences: "",
                roles: "",
                successCriteria: "",
                implementations: "",
                scopes: "",
                scopeTiming: "",
                Timings: "",
                engineeringSkills: "",
                designAbilities: "",
                dependencies: "",
                risks: "",
                acceptedTerms: false
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                acceptedTerms: Yup.boolean()
                    .required('Required')
                    .oneOf([true], 'Check the box to confirm Project creation.'),
                // jobType: Yup.string()
                //     .oneOf(
                //         ['designer', 'development', 'product', 'other'],
                //         'Invalid job type'
                //     )
                //     .required('Required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400)
            }}
        >
        <Form>
            <Inputs.MyTextInput label="Project Name"name="name"type="text"placeholder="User Rolodex"/>

            { Fields.projectFields.map(f =>(
                <Inputs.MySelect label={f.name} name={f.value}>
                    <option value=""></option>
                    {f.selections.map(s => (
                        <option value={s}>{s}</option>
                    ))}
                </Inputs.MySelect>
            ))}

            <Inputs.MyCheckBox name="acceptedTerms">
                I'm ready to create a new project.
            </Inputs.MyCheckBox>

            <button type="submit">Submit</button>
        </Form>
        </Formik>
        </>
     );
};

function App() {
    return <ProjectForm />
}

const rootElement = document.getElementById("root");
ReactDom.render(<App />, rootElement)