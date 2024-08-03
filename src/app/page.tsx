"use client";

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { placeholders } from '@/components/const/placeholders';
import { SparklesCore } from "../components/ui/sparkles";
import { useTheme } from "next-themes"

function App() {
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('inputValue', inputValue);
        router.push(`/amazon?query=${encodeURIComponent(inputValue)}`);
    };

    const { theme } = useTheme();

    return (
        <div className='flex w-full justify-end'>
            <div className="flex flex-col h-[90vh] pl-36 justify-center">
                <div className="flex w-full">
                    <div className="">
                        <div className="space-y-2 w-3/5">
                            <h1 className="text-8xl font-bold text-left">Chatify</h1>
                            <div className="w-[40rem] h-40 absolute left-16">
                                {/* Gradients */}
                                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
                        
                                {/* Core component */}
                                <SparklesCore
                                background="transparent"
                                minSize={0.8}
                                maxSize={1}
                                particleDensity={1200}
                                className="w-full h-full"
                                particleColor={theme === 'dark' ? "#FFFFFF" : "#71a3ff"}
                                />
                        
                                {/* Radial Gradient to prevent sharp edges */}
                                <div className="absolute inset-0 w-full h-full bg-white dark:bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                            </div>
                            <p className="text-left text-2xl pt-3 text-black dark:text-white">Hola, soy un asistente dedicado a las ciudades. ¿Cómo puedo ayudarte?</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full mt-10">
                    <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit} />
                </div>

                {/* <form onSubmit={handleSubmit} className="p-4 flex clear-both w-full items-center justify-center">

                    <div className="flex w-full max-w-screen-md items-center space-x-2">
                        <Input type="text"
                            placeholder="Escribe tu pregunta a la IA"
                            value={inputValue}
                            onChange={handleInputChange} />

                        <Button type="submit" className='px-10'>Pregunta</Button>
                    </div> 
                </form>*/}

            </div>

            <div className='self-end justify-self-end'>
                <img
                    src={`/assets/home_dark.jpeg`}
                    alt="Company Logo"
                    width={513}
                    height={531}
                    className="h-0 dark:h-max"
                />
                <img
                    src={`/assets/home_light.png`}
                    alt="Company Logo"
                    width={513}
                    height={531}
                    className="h-max dark:h-0"
                />
            </div>

        </div>
    )
}

export default App