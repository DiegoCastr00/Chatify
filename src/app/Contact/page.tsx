import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

export default function Contact() {
    return (
        <div className="flex min-h-screen justify-center pl-36 sm:pl-36 lg:pl-36 items-center top-0">
            <div className="w-1/2 justify-center">
                <div className="md:flex">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-6xl text-black dark:text-white">Contáctanos</div>
                    <h2 className="mt-2 text-gray-500">Estamos aquí para ayudarte</h2>
                    <p className="mt-2 text-gray-500">Completa el formulario y nos pondremos en contacto lo antes posible.</p>
                    <form className="mt-6">
                    <div className="mb-4">
                        <input className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nombre" />
                    </div>
                    <div className="mb-4">
                        <input className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Correo electronico" />
                    </div>
                    <div className="mb-6">
                        <textarea className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Escriba su mensaje aquí"></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-[#8AC1FF] hover:bg-[#52a3ff] w-full text-black py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline" type="button">
                        Enviar mensaje
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            <div className='w-1/2 justify-center items-center'>
                <img src="../../../../assets/phone.png" alt="contact" className='self-center'/>
            </div>
        </div>
    )
}
