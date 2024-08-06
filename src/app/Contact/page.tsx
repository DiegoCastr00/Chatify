import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { BackgroundGradient } from '@/components/ui/background-gradient'

export default function Contact() {
    return (
        <div className="flex min-h-screen justify-center items-center top-0">
            <div className='grid absolute w-[90%] h-[80%] mt-10'>
                <div className='absolute -z-10 w-[30rem] h-[30rem] bg-[#88C7FF] dark:bg-[#00054A] rounded-full filter blur-3xl self-end justify-self-start'></div>
                <div className='absolute -z-10 w-[30rem] h-[30rem] bg-[#E2A9FF] dark:bg-[#3B004A] rounded-full filter blur-3xl self-end justify-self-end'></div>
            </div>
            <div className="w-1/2 justify-center pl-36 sm:pl-36 lg:pl-36">
                <div className="md:flex">
                <div className="p-8">
                    <div className="tracking-wide text-6xl text-black dark:text-white">Contáctanos</div>
                    <h2 className="mt-2 dark:text-white text-black">Estamos aquí para ayudarte</h2>
                    <p className="mt-2 dark:text-white text-black">Completa el formulario y nos pondremos en contacto lo antes posible.</p>
                    <form className="mt-6">
                    <div className="mb-4">
                        <input className="shadow appearance-none bg-white border-gray-500 dark:bg-[#1E1E1E] dark:border-none rounded-md w-full h-16 py-2 px-3 text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nombre" />
                    </div>
                    <div className="mb-4">
                        <input className="shadow appearance-none bg-white border-gray-500 dark:bg-[#1E1E1E] rounded-md w-full h-16 py-2 px-3  text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Correo electronico" />
                    </div>
                    <div className="mb-6">
                        <textarea className="shadow appearance-none bg-white border-gray-500 dark:bg-[#1E1E1E] rounded-md w-full h-16 py-2 px-3  text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Escriba su mensaje aquí"></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="shadow appearance-none bg-white border-gray-500 dark:bg-[#1E1E1E] rounded-md w-full h-16 py-2 px-3  text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline" type="button">
                        Enviar mensaje
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}
