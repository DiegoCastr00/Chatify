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
        return () => (
            <div className='flex h-full'>
                <div className='w-1/2 p-10 items-center justify-center self-center'>
                    <p className="font-bold md:text-8xl text-white text-6xl">
                        {company.name}
                    </p>
                </div>
                <p className="font-normal text-base text-white"></p>
                <div className='flex flex-col bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-10 shadow-lg w-1/2 h-full justify-center'>
                    <p className="font-normal text-lg my-4 max-w-lg text-neutral-200">
                        {company.description}
                    </p>
                    <div className="mt-4 flex justify-between z-50">
                        <Link href={`${company.id}`}>
                            <Button>
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

    const cards = companies.map((company, index) => ({
        id: company.id,
        content: React.createElement(Skeletons[company.id]),
        className: index % 2 === 0 ? "md:col-span-2" : "col-span-1",
        thumbnail: `/assets/${company.img}`,
        company: company,
    }));

    return (
        <AuroraBackground>
        <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
            }}
            className="relative flex items-center justify-center px-4 w-full h-screen"
        >
            <main className="w-full">
                <div className="h-screen w-full">
                    <LayoutGrid cards={cards} />
                </div>
            </main>
        </motion.div>
        </AuroraBackground>
    )
}