"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { companies } from '@/components/const/companies';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type Company = {
    id: string;
    name: string;
    description: string;
    img: string | null;
    books: string[];
};

export default function Companies() {
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companies);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredCompanies(companies);
        } else {
            const filtered = companies.filter(company =>
                company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCompanies(filtered);
        }
    }, [searchTerm]);

    const handleCompanyClick = (company: Company) => {
        setSelectedCompany(company);
    };

    return (
        <div>
            <div className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
                <div className="grid gap-6 md:gap-8">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight">Biblioteca</h1>
                        <p className="text-muted-foreground">Descubre nuestra última colección de espacios de trabajo con información de alta calidad.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Busca por el nombre o descripcion..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg bg-background pl-10 pr-4 py-2"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <main className="container mx-auto py-12 px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {filteredCompanies.map((company) => (
                        <div
                            key={company.id}
                            className="bg-background rounded-lg shadow-lg overflow-hidden group cursor-pointer relative"
                            onClick={() => handleCompanyClick(company)}
                        >
                            <div className="relative h-40 md:h-48 w-full">
                                <img
                                    src={`/assets/${company.img}`}
                                    alt="Company Logo"
                                    width={400}
                                    height={300}
                                    className="rounded-lg object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <h3 className="text-white text-xl font-semibold text-center">{company.name}</h3>
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-center">
                                <h3 className="text-lg text-center group-hover:opacity-0 transition-opacity">{company.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {selectedCompany && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-background rounded-lg shadow-lg p-6 max-w-4xl w-full flex">
                        <div className="w-10/12 pr-6">
                            <img
                                src={`/assets/${selectedCompany.img}`}
                                alt={`${selectedCompany.name} Logo`}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                        <div className="w-2/3">
                            <h2 className="text-2xl font-bold mb-4">{selectedCompany.name}</h2>
                            <p className="text-muted-foreground">{selectedCompany.description}</p>
                            <div className="mt-4 flex justify-between">
                                <Button variant="outline" onClick={() => setSelectedCompany(null)}>
                                    Close
                                </Button>
                                <Link href={`${selectedCompany.id}`}>
                                    <Button>
                                        Ask {selectedCompany.id}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}