'use-client'

import Head from 'next/head'
import AppConteiner from '../../components/gel-ui/layout/app-container'
import PageTitle from '../../components/gel-ui/typography/page-title'
import { useState } from 'react'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import InputValidate from '../../components/gel-ui/forms/input-validate'
import { phoneMask } from '../../lib/utils'

export default function RegisterClient() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const handleSubmit = ( e: SubmitEvent) => {
        e.preventDefault()
    }

    const validadeNameInput = ( value: string ) => {
        if (value != "") {
            return {
                isValid: true,
                message: ""
            }
        } else {
            return {
                isValid: false,
                message: "O nome deve ser preenchido."
            }
        }
    }

    return (
        <>
            <Head>
                <title>Registrar cliente - ERP Limpeza</title>
            </Head>
            <AppConteiner>
                <PageTitle>Registro de cliente</PageTitle>

                <form>

                    <InputValidate 
                        id={'name'} 
                        label={'Nome do cliente'}
                        type='text' 
                        value={name} 
                        setValue={setName}
                        validate={validadeNameInput}                     
                    />

                    <InputValidate 
                        id={'phone'} 
                        label={'Telefone do cliente'} 
                        value={phone}
                        type='text'  
                        setValue={setPhone}
                        mask={phoneMask}
                        maxLength={20}                        
                    />

                    <InputValidate 
                        id={'email'} 
                        label={'E-mail do cliente'}
                        type='email' 
                        value={email} 
                        setValue={setEmail}                   
                    />
                    
                </form>



            </AppConteiner>
        </>
        
    )
}
