import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { isEmpty } from "validator";

interface IProps {
    value: string;
    name?: string;
    placeholder?: string;
    error?: string;
    validate?: (value: string) => string;
    onValueChange?: (name: string, value: string, error: string | undefined) => void;
}

export function TextInput(props: IProps) {    
        
    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;    

        if (props.onValueChange) {
            let newError = props.validate ? props.validate(newValue) : '';
            props.onValueChange(e.target.name, newValue, newError);
        }
    };
    
    const isError = () => !isEmpty(props.error ?? '')

    return (
        <>            
            <TextField variant="outlined" value={props.value} name={props.name} placeholder={props.placeholder}
                onChange={handleValueChange} error={isError()} helperText={props.error} />
        </>
    );
}