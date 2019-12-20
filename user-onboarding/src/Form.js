import React, { useEffect, useState } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

//need Form inputs for: name,email, pass, Terms(checkbox), submit button to axios
const FormikForm = ({
values, errors, touched, status

}) =>{
    // console.log ("values", values);
    // console.log ("erros", errors);
    // console.log ("touched", touched);


    //state for initial form data
    const [users, setUsers] = useState([]);

    //effect for fom data changes
    useEffect(() => {
        console.log("status change", status);

        //set what to do on status change. if does-render function. spread array values to add on to new. dependency array is status b/c thats what affect is watching for-status change(data change) 


        status && setUsers(users => [
            ...users, status
        ]);
    },[status]);
    
return (
    <div className = "user-form">

    <Form>
    <label>
    Name
        <Field
        type="text"
        name="name"
        placeholder = "name"
        />

        {touched.name && errors.name && (
            <p className = "errors">
                    {errors.name}
                    </p>
        )}

        {/*add errors touch/error*/}

    </label> 
    {/*name form field*/}

    <label>
    Email
    <Field
    type = "email"
    name = "email"
    placeholder = "email"
    />

{touched.email && errors.email && (
           <p>
            {errors.email}
                    </p>
        )}

    </label>  {/*email form field*/}

    <label>
    Password
    <Field
    type = "text"
    name = "password"
    placeholder = "password"
    />

{touched.password && errors.password && (
            <p className = "errors">
                    {errors.password}
                    </p>
        )}

</label>
    {/*pass form field*/}

<label className = "checkbox">
    Terms Of Sevice
<Field 
type = "checkbox"
name = "terms"
checked = {values.terms}
/>

{touched.terms && errors.terms && (
            <p className = "errors">
                    {errors.terms}
                    </p>
        )}

</label>

 {/*checkbox(TOS) form field*/}

<button type ="sbumit">
    Log In!
</button>
      {/*submit button form field*/}


    </Form>
    {users.map(user => {
        return (
        <ul key= {user.id}>
           <li> Name: {user.name}</li>
           <li> Email: {user.email}</li>
           <li> Password: {user.password}</li>
        <li>Terms: {user.terms}</li>
        </ul>
        );
    })} 
    </div>
);
};

const UserFormikForm = withFormik ({
    mapPropsToValues(props){
        return {
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            terms: props.terms || false
        };
        }, //pass props to new users?

validationSchema: Yup.object().shape({
name :Yup.string().required("name required!"),
email: Yup.string().required("emailed required!"),
password:Yup.string().required("password required!")
}),
    
//validation for inputs

handleSubmit(
    values, {setStatus, resetForm}
) {
    console.log("submitted" ,values); //console log values inputted on submit. 'post' console log shows results came bck
    axios
    .post ("https://reqres.in/api/users/", values)
    
    .then (res => {
        console.log("worked", res);
        setStatus(res.data);

        resetForm();
    })

    .catch(error =>
        console.log("nope", error.response)
    );
    }}) (FormikForm);

//submit to axios for inputs
//console log response that comes back WITH data entered(if worked)

export default UserFormikForm;