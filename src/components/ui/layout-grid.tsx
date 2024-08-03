"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from '@/components/ui/button'
import Link from 'next/link';

type Company = {
    id: string
    name: string
    description: string
    img: string | null
    books: string[]

}

type Card = {
  id: string;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
  company: Company;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleClick = (card: Card, company: Company) => {
    setLastSelected(selected);
    setSelected(card);
    setSelectedCompany(company);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
    setSelectedCompany(null);
  };

  return (
    <div className="w-full h-screen flex">
        <div className="flex pl-32 pr-10 text-6xl h-screen items-center justify-center self-center font-bold">
            <p className="text-black dark:text-white">Tus compañías</p>
        </div>

        <div className="w-full h-screen p-10 grid grid-cols-1 md:grid-cols-3 mx-auto gap-4 relative">
                {cards.map((card, i) => (
                  <div key={i} className={cn(card.className, "")}>
                    <motion.div
                      onClick={() => handleClick(card, card.company)}
                      className={cn(
                        card.className,
                        "relative overflow-hidden",
                        selected?.id === card.id
                          ? "rounded-lg cursor-pointer absolute inset-0 top-0 h-3/4 w-full m-auto z-40 flex justify-center items-center"
                          : lastSelected?.id === card.id
                          ? "z-40 bg-white rounded-xl h-full w-full"
                          : "bg-white rounded-xl h-full w-full"
                      )}
                      layoutId={`card-${card.id}`}
                    >
                      {selected?.id === card.id && <SelectedCard selected={selected} />}
                      <ImageComponent card={card} />
                    </motion.div>
                  </div>
                ))}
        </div>
        <motion.div
            onClick={handleOutsideClick}
            className={cn(
              "absolute h-full bottom-0 w-full left-0 top-0 bg-black opacity-0 z-10",
              selected?.id ? "pointer-events-auto" : "pointer-events-none"
            )}
            animate={{ opacity: selected?.id ? 0.5 : 0 }}
        />
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height="500"
      width="500"
      className={cn(
        "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
      )}
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="z-[70] h-full p-5"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
