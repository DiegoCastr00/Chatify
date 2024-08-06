"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import React from 'react'
import { useState } from "react";
import { companies } from '@/components/const/companies';
import { LayoutGrid } from "../../components/ui/layout-grid";
import { motion } from "framer-motion";
import { AuroraBackground } from "../../components/ui/aurora-background";

type Company = {
    id: string
    name: string
    description: string
    img: string | null
    books: string[]

}
export default function Companies() {
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    const handleCompanyClick = (company: Company) => {
        setSelectedCompany(company)
    }

    const createCompanyComponent = (company: Company) => {
        return (
            <div className='flex-col h-full ml-10 w-full'>
                <div className='w-full items-center justify-center self-center'>
                    <p className="text-black dark:text-white text-xl">
                        {company.name}
                    </p>
                </div>
                <p className="font-normal text-base text-white"></p>
                <div className='flex flex-col w-full mt-14 justify-center'>
                    <p className="font-normal text-base max-w-lg text-black dark:text-white">
                        {company.description}
                    </p>
                    <div className="mt-14 flex justify-between z-50 rounded-full">
                        <Link href={`${company.id}`}>
                            <Button className='rounded-2xl font-bold text-sm'>
                                Ask {company.id}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    const companyComponents = companies.map(company => ({
        [company.id]: createCompanyComponent(company)
    }));

    const Skeletons = Object.assign({}, ...companyComponents);

    const cards = companies.flatMap((company, index) => {
        const isEvenRow = Math.floor(index / 3) % 2 === 0;
        const positionInRow = index % 3;

        let aspect, colSpan;

        if (isEvenRow) {
            if (positionInRow === 0) {
                aspect = "16/10";
                colSpan = "col-span-2";
            } else {
                aspect = "4/3";
                colSpan = "col-span-1";
            }
        } else {
            if (positionInRow === 2) {
                aspect = "16/10";
                colSpan = "col-span-2";
            } else {
                aspect = "4/3";
                colSpan = "col-span-1";
            }
        }

        return {
            id: company.id,
            content: React.createElement(Skeletons[company.id]),
            className: `${colSpan} aspect-[${aspect}]`,
            height: `${colSpan} h-56`,
            thumbnail: `/assets/${company.img}`,
            company: company,
        };
    });

    return (
        <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
            }}
            className="relative flex items-center justify-center px-4 w-full h-full"
        >
            <main className="w-full">
                <div className="h-full w-full overflow-hidden">
                    <div className='grid absolute w-[90%] h-[80%] mt-10'>
                        <div className='absolute -z-10 w-[30rem] h-[30rem] bg-[#88C7FF] dark:bg-[#00054A] rounded-full filter blur-3xl self-center justify-self-center'></div>
                        <div className='absolute -z-10 w-[30rem] h-[30rem] bg-[#E2A9FF] dark:bg-[#3B004A] rounded-full filter blur-3xl self-center justify-self-center mt-40'></div>
                    </div>
                    <div className="flex p-10 text-6xl font-bold self-center">
                        <p className="text-black dark:text-white text-center w-full">Biblioteca</p>
                    </div>
                    <LayoutGrid cards={cards} />
                </div>
            </main>
        </motion.div>
    )
}