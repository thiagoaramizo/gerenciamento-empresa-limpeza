import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { Input, InputProps } from "../../ui/input";
import { Label } from "../../ui/label";

interface InputValidateProps extends InputProps{
    id: string,
    label: string,
    value: any
    setValue: ( value:any ) => void
    validate?: ( value: any ) => ValidateInterface
    mask?: ( value: string ) => string
}

export interface ValidateInterface {
    isValid: boolean,
    message: string
}


export default function InputValidate( {id, label, value, setValue, validate, mask,  ...props}: InputValidateProps ) {
    
    const [isValid, setIsValid] = useState(true)
    const [message, setMessage] = useState("")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue =  mask ? mask(e.target.value) : e.target.value
        setValue( newValue )
    }

    const handleBlur = () => {
        if ( validate ) {
            const {isValid, message} = validate( value )
            setIsValid( isValid )
            setMessage( message )
        }
    }
    
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <Input {...props} value={value} id={id} onChange={handleChange} onBlur={handleBlur} aria-invalid={!isValid}/>
            { !isValid && <span>{message}</span> }
        </div>
    )
}