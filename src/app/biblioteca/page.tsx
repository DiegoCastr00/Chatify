"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { workspaces } from "@/components/const/library";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { BackgroundGradient } from "@/components/ui/background-gradient";

type Workspace = {
  id: string;
  name: string;
  description: string;
  img: string | null;
  books: string[];
};

export default function Workspaces() {
  const [selectedworkspace, setSelectedworkspace] = useState<Workspace | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredworkspaces, setFilteredworkspaces] =
    useState<Workspace[]>(workspaces);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredworkspaces(workspaces);
    } else {
      const filtered = workspaces.filter(
        (workspace) =>
          workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workspace.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredworkspaces(filtered);
    }
  }, [searchTerm]);

  const handleworkspaceClick = (workspace: Workspace) => {
    setSelectedworkspace(workspace);
  };

  return (
    <div className="h-full">
      <div className="absolute h-full w-full overflow-hidden">
        <BackgroundGradient />
      </div>
      <div className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-6 md:gap-8">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Biblioteca</h1>
            <p className="text-muted-foreground">
              Descubre nuestra última colección de espacios de trabajo con
              información de alta calidad.
            </p>
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
          {filteredworkspaces.map((workspace) => (
            <div
              key={workspace.id}
              className="bg-background rounded-lg shadow-lg overflow-hidden group cursor-pointer relative"
              onClick={() => handleworkspaceClick(workspace)}
            >
              <div className="relative h-40 md:h-48 w-full">
                <img
                  src={`/assets/${workspace.img}`}
                  alt="workspace Logo"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-white text-xl font-semibold text-center">
                    {workspace.name}
                  </h3>
                </div>
              </div>
              <div className="p-4 flex items-center justify-center">
                <h3 className="text-lg text-center group-hover:opacity-0 transition-opacity">
                  {workspace.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedworkspace && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg shadow-lg p-6 max-w-4xl w-full flex">
            <div className="w-10/12 pr-6">
              <img
                src={`/assets/${selectedworkspace.img}`}
                alt={`${selectedworkspace.name} Logo`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="w-2/3">
              <h2 className="text-2xl font-bold mb-4">
                {selectedworkspace.name}
              </h2>
              <p className="text-muted-foreground">
                {selectedworkspace.description}
              </p>
              <div className="mt-4 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setSelectedworkspace(null)}
                >
                  Close
                </Button>
                <Link href={`${selectedworkspace.id}`}>
                  <Button>Ask {selectedworkspace.id}</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
