"use client";

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { placeholders } from '@/components/const/placeholders';
import { SparklesCore } from "../components/ui/sparkles";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import {BackgroundGradient} from "../components/ui/background-gradient"

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
        <motion.div
            initial={{ opacity: 0.0, y: 0.0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
            }}
        >
            <div className='flex w-full h-full justify-center'>
                <BackgroundGradient></BackgroundGradient>
                <div className="flex flex-col h-[90vh] pl-36 justify-center">
                    <div className="flex w-full">
                        <div className="">
                            <div className="space-y-2 w-full self-center">
                                <h1 className="text-8xl font-bold text-center">Chatify</h1>
                                <div className='w-full flex items-center justify-center p-0 m-0'>
                                    <p className="w-3/5 text-center text-2xl pt-3 text-black dark:text-white">Carga, organiza y obtén respuestas precisas al instante. ¿Cómo puedo ayudarte?</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-3/5 mt-10 self-center">
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

            </div>
        </motion.div>
    )
}

export default App