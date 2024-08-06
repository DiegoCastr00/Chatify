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
  height: string;
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
    <div className="flex">
        <div className="w-3/5 p-10 grid grid-cols-3 md:grid-cols-4 mx-auto gap-4 relative">
                {cards.map((card, i) => (
                  <div key={i} className={cn(card.height, selected?.id === card.id
                    ? "":"","")}>
                    <motion.div
                      onClick={() => handleClick(card, card.company)}
                      className={cn(
                        card.className,
                        "relative overflow-hidden",
                        selected?.id === card.id
                          ? "fixed self-center rounded-lg cursor-pointer inset-0 top-0 h-max w-4/5 z-40 flex justify-self-center items-center"
                          : lastSelected?.id === card.id
                          ? "z-40 bg-white rounded-xl h-full w-full"
                          : "bg-white rounded-xl h-full w-full"
                      )}
                      layoutId={`card-${card.id}`}
                    >
                      <ImageComponent card={card} />
                      {selected?.id === card.id && <SelectedCard selected={selected} />}
                    </motion.div>
                  </div>
                ))}
        </div>
        
        <motion.div
            onClick={handleOutsideClick}
            className={cn(
              "absolute min-h-screen bottom-0 w-full left-0 top-0 dark:bg-black bg-white opacity-0 z-10",
              selected?.id ? "pointer-events-auto" : "pointer-events-none"
            )}
            animate={{ opacity: selected?.id ? 1 : 0 }}
        />
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <div className="flex-col w-full h-full">
      <div className="flex w-full h-3/5 items-center justify-center bg-white rounded-t-lg overflow-hidden">
        <motion.img
          layoutId={`image-${card.id}-image`}
          src={card.thumbnail}
          className={cn(
            "w-full transition duration-200 rounded-t-lg self-center"
          )}
          alt="thumbnail"
        />
      </div>
      <div className="flex w-full h-2/5 items-center rounded-b-lg justify-center p-5 bg-gradient-to-r dark:from-[#00054A] dark:to-[#3B004A] from-[#88C7FF] to-[#E2A9FF]">
        <p className="text-bold text-sm text-center self-center">{card.company.name}</p>
      </div>
    </div>
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="h-full w-full">
      <div className="bg-transparent h-max w-full flex flex-col justify-end rounded-lg relative z-[60]">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 0.6,
          }}
          className="absolute inset-0 h-full w-full bg-transparent  z-10"
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
    </div>
  );
};
