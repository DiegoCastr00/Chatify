"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { placeholders } from "@/components/const/placeholders";
import { motion } from "framer-motion";
import { BackgroundGradient } from "../components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { ArchiveIcon } from "@radix-ui/react-icons";
import Link from "next/link";

function App() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("inputValue", inputValue);
    router.push(`/amazon?query=${encodeURIComponent(inputValue)}`);
  };

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
      <div className="flex relative">
        <div className="absolute top-4 left-4 flex items-center z-20">
          <img
            src="../../../../assets/logo_dark.png"
            className="h-0 dark:h-7"
            alt="latgoblab Logo"
          />
          <img
            src="../../../../assets/logo_light.png"
            className="h-7 dark:h-0"
            alt="latgoblab Logo"
          />
          <span className="ml-2 text-xl whitespace-nowrap">Chatify</span>
        </div>

        {/* Botón en la esquina superior derecha */}
        <div className="absolute top-4 right-4 z-20">
          <Link href="/biblioteca">
            <Button variant="ghost">
              <ArchiveIcon className="mr-2 h-4 w-4" /> Biblioteca
            </Button>
          </Link>
        </div>

        <div className="absolute h-full w-full overflow-hidden">
          <BackgroundGradient />
        </div>
        <div className="flex flex-col z-10 w-full h-[100vh] items-center justify-center ">
          <div className=" ">
            <div className="space-y-2 self-center">
              <div className="w-full flex flex-col items-center justify-center p-0 m-0">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl ">
                  ¡Hola! Soy un agente especializado en
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                  literatura para el desarrollo
                </p>
              </div>
            </div>
          </div>

          <div className="flex  items-center mt-10 max-w-screen-md w-80 sm:w-full ">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default App;
