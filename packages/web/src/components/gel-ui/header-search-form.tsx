import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MagnifyingGlass } from '@phosphor-icons/react';
import { ChangeEvent, useState } from "react";

export default function HeaderSearchForm() {

    const [term, setTerm] = useState('')

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value)
    }

    return (
        <form className="flex items-center">
            <Input
                className="peer rounded-r-none border-slate-300 bg-slate-200/75 w-[240px] shadow-none focus:bg-white focus:w-[360px] focus-visible:border-primary focus-visible:ring-0 transition-all duration-700"
                placeholder="Pesquise..."
                value={term}
                onChange={handleSearchInput}
            />
            <Button 
                className="rounded-l-none px-2 bg-slate-400 peer-focus:bg-primary"
                disabled={term == ''}
            >
                <MagnifyingGlass size={24} />
            </Button>
        </form>
    );
}
