"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { workspaces } from "@/components/const/library";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { placeholders } from "@/components/const/placeholders";
import { BackgroundGradient } from "@/components/ui/background-gradient";

type Workspace = {
  id: string;
  name: string;
  description: string;
  img: string | null;
  books: string[];
};

const WorkspaceItem: React.FC<{ workspace: Workspace }> = ({ workspace }) => (
  <div className="bg-background rounded-lg shadow-lg overflow-hidden group cursor-pointer">
    <Sheet>
      <SheetTrigger className="group block w-full">
        <div className="relative h-40 md:h-48 overflow-hidden">
          <img
            src={`/assets/${workspace.img}`}
            alt={`${workspace.name} Logo`}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="text-white text-xl font-semibold">
              {workspace.name}
            </h3>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold group-hover:opacity-50 transition-opacity">
            {workspace.name}
          </h3>
        </div>
      </SheetTrigger>

      <SheetContent className="w-4/12">
        <SheetHeader>
          <SheetTitle className="pt-5 text-center">{workspace.name}</SheetTitle>
          <SheetDescription>{workspace.description}</SheetDescription>
          <img
            src={`/assets/${workspace.img}`}
            alt="Company Logo"
            width={400}
            height={300}
            className="object-cover w-full h-full"
          />
        </SheetHeader>

        <p className="pt-4 font-semibold">Documentos: </p>
        {workspace.books.map((book) => (
          <div className="p-4" key={book}>
            <h3 className="text-lg ">{book}</h3>
          </div>
        ))}

        <SheetFooter>
          <Link href={`${workspace.id}`}>
            <Button>Chatear</Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
);

const WorkspaceGrid: React.FC<{ workspaces: Workspace[]; title?: string }> = ({
  workspaces,
  title,
}) => (
  <>
    <p className="text-3xl font-bold tracking-tight mb-6">{title}</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {workspaces.map((workspace) => (
        <WorkspaceItem key={workspace.id} workspace={workspace} />
      ))}
    </div>
  </>
);

const Workspaces: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWorkspaces, setFilteredWorkspaces] =
    useState<Workspace[]>(workspaces);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredWorkspaces(workspaces);
    } else {
      const normalizedSearchTerm = searchTerm
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const filtered = workspaces.filter((workspace) => {
        const normalizedName = workspace.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const normalizedDescription = workspace.description
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return (
          normalizedName.includes(normalizedSearchTerm) ||
          normalizedDescription.includes(normalizedSearchTerm)
        );
      });
      setFilteredWorkspaces(filtered);
    }
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searchTerm", searchTerm);
  };

  // const recentWorkspaces = workspaces.filter((workspace) =>
  //   ["amazon", "google", "microsoft"].includes(workspace.id)
  // );

  // const convocatorias = workspaces.filter((workspace) =>
  //   ["latgoblab", "escuela5"].includes(workspace.id)
  // );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundGradient />

      <div className="relative z-10">
        <div className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
            <div className="flex flex-col items-center md:items-center">
              <h1 className="text-3xl font-bold tracking-tight">Bienvenido</h1>
              <p className="text-muted-foreground mt-2">
                Explora nuestra biblioteca
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-muted-foreground mb-3 text-center">
                Busca por nombre o descripcion de la biblioteca
              </p>
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>

        <main className="container mx-auto py-3 px-4 md:px-6">
          <div className="mt-12">
            <WorkspaceGrid workspaces={filteredWorkspaces} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Workspaces;
