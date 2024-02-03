"use-client";

import Head from "next/head";
import AppConteiner from "../../components/gel-ui/layout/app-container";
import PageTitle from "../../components/gel-ui/typography/page-title";
import { FormEvent, useState } from "react";
import InputValidate from "../../components/gel-ui/forms/input-validate";
import { phoneMask, phoneRemoveMask } from "../../lib/utils";
import { postClient } from "../../services/clients";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { useToast } from "../../components/ui/use-toast";
import { Toaster } from "../../components/ui/toaster";
import { ToastAction } from "../../components/ui/toast";
import Link from "next/link";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

export default function RegisterClient() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [lon, setLon] = useState("");
    const [lat, setLat] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const isFillForm = (): boolean => {
        return ( name && email && phone && lon && lat ) ? true : false;
    };

    const resetForm = () => {
        setEmail("");
        setName("");
        setPhone("");
        setLon("");
        setLat("");
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isLoading && isFillForm()) {
            setIsLoading(true);
            const formatedPhone = phoneRemoveMask(phone);
            postClient({ name, email, phone: formatedPhone, lon: parseFloat(lon), lat: parseFloat(lat) }).then(
                (response) => {
                    setIsLoading(false);
                    resetForm();
                    if (response)
                        toast({
                            description: response.message,
                            action: (
                                <ToastAction altText="Acessar clientes">
                                    <Link href={"/clients"}>Acessar</Link>
                                </ToastAction>
                            ),
                        });
                }
            );
        }
    };

    return (
        <>
            <Head>
                <title>Registrar cliente - ERP Limpeza</title>
            </Head>
            <AppConteiner>
                <PageTitle>Registro de cliente</PageTitle>

                <div className="w-full h-full container max-w-[720px] pt-8">
                    <Card className="rounded-md shadow-none">
                        <CardHeader>
                            <CardTitle>Cadastre seu cliente</CardTitle>
                            <CardDescription>
                                Preencha todas as informações abaixo para salvar
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4 mb-2"
                            >
                                <InputValidate
                                    id={"name"}
                                    label={"Nome do cliente"}
                                    type="text"
                                    value={name}
                                    setValue={setName}
                                    required={true}
                                    autoComplete="off"
                                />

                                <InputValidate
                                    id={"phone"}
                                    label={"Telefone do cliente"}
                                    value={phone}
                                    type="text"
                                    setValue={setPhone}
                                    mask={phoneMask}
                                    maxLength={20}
                                    required={true}
                                    autoComplete="off"
                                />

                                <InputValidate
                                    id={"email"}
                                    label={"E-mail do cliente"}
                                    type="email"
                                    value={email}
                                    setValue={setEmail}
                                    required={true}
                                    autoComplete="off"
                                />

                                <Label>Localização (x,y)</Label>
                                <div className="flex w-full gap-4">
                                    <div className="flex items-center gap-2">
                                        <label className="font-medium text-foreground text-sm" htmlFor="lon">x</label>
                                        <Input type="number" id="lon" value={lon} onChange={(e) => setLon(e.target.value)} />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <label className="font-medium text-foreground text-sm" htmlFor="lat">y</label>
                                        <Input type="number" id="lat" value={lat} onChange={(e) => setLat(e.target.value)} />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading || !isFillForm()}
                                    className="w-[120px] mt-4"
                                >
                                    Salvar
                                </Button>

                                <Toaster />
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </AppConteiner>
        </>
    );
}
