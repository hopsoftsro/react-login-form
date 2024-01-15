import React from "react";
import { ILogin } from "../Models/ILogin";
import { TextInput } from "./TextInput";
import { Button } from "@mui/material";
import { isEmpty } from "validator";
import isEmail from "validator/lib/isEmail";
import { LoginService } from "../Services/LoginService";


type Inputs = {
    email: string;
    password: string;
};

export function LoginForm() {

    const [login, setLogin] = React.useState({
        email: '',
        password: ''
    } as ILogin);

    const [errors, setErrors] = React.useState({} as any);

    const handleValueChange = (name: string, value: string, error: string | undefined) => {
        console.log(`Value: ${value}, name: ${name}`);
        setLogin({ ...login, [name]: value });
        setErrors({ ...errors, [name]: error });
    };

    function validateEmail(value: string): string {
        if (isEmpty(value)) return `Email is required`;
        if (!isEmail(value)) return `Email has invalid format`;
        return '';
    }

    function validatePassword(value: string): string {
        if (isEmpty(value)) return `Password is required`;
        if (value.length <= 8) return `Password must be at least 8 chars long.`;
        return '';
    }

    function validate(): boolean {
        const emailError = validateEmail(login.email);
        const pwdError = validatePassword(login.password)
        const newErrors = { ...errors, email: emailError, password: pwdError };
        setErrors(newErrors);

        const invalidFields = Object.keys(newErrors).filter((k) => newErrors[k]);
        return invalidFields.length === 0;
    };

    const handleSubmit = () => {
        if (!validate())
            return;

        LoginService.submit(login).then(res => {
            setErrors({});
            setLogin({
                email: '',
                password: ''
            });

            alert(`Login success - token ${res.data}`);
            console.log(`${new Date().toISOString()} - XXX - handleSubmit - ${res.data}`);
        });
    };

    return (<div className="h-100 d-flex justify-content-center">
        <div className="d-flex align-items-center">
            <div className="form-login-container border border-1 d-flex flex-column p-4 gap-4 ">
                <div>
                    <TextInput
                        value={login.email}
                        name='email'
                        placeholder='Email'
                        error={errors['email']}
                        onValueChange={handleValueChange}
                        validate={validateEmail}
                    />

                </div>
                <div>
                    <TextInput
                        value={login.password}
                        name='password'
                        placeholder='Password'
                        error={errors['password']}
                        onValueChange={handleValueChange}
                        validate={validatePassword}
                    />
                </div>

                <Button className='mt-3' variant="contained" onClick={handleSubmit}>Submit</Button>
            </div>
        </div>

    </div>);
}