"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Chat } from "@/components/chat";
import PDFViewer from "@/components/pdf/PDFViewer";
import { companies } from "@/components/const/companies";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<string[]>([]);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pathformatted = pathname.split("/").pop() ?? "";
  const queryParam = searchParams.get("query") ?? "";

  const company = companies.find((company) => company.id === pathformatted);

  const [selectBook, setSelectBook] = useState<string | null>(
    company?.books?.[0] ?? null
  );

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredBooks(company?.books || []);
    } else {
      const filtered =
        company?.books.filter((book) =>
          book.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];
      setFilteredBooks(filtered);
    }
  }, [searchTerm, company]);

  function handleBook(book: string) {
    setSelectBook(book);
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="border">
      <ResizablePanel defaultSize={13}>
        <ScrollArea className="h-[99vh] rounded-md border">
          <div className="flex flex-col p-6 gap-4">
            <div className="text-2xl font-bold flex justify-center items-center">
              <div className="text-sm text-center w-full">{company?.name}</div>
            </div>

            <div className="relative flex-1 my-4">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Busca el libro"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg bg-background pl-10 pr-4 py-2"
              />
            </div>

            {filteredBooks.map((book, index) => (
              <div key={index} className="flex w-full">
                <Button
                  {...(book === selectBook ? {} : { variant: "outline" })}
                  onClick={() => handleBook(book)}
                  className="w-full text-sm"
                >
                  {book}
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </ResizablePanel>

      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40}>
        <div className="flex items-center justify-center p-6">
          <PDFViewer path={pathformatted} document={selectBook || ""} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={47}>
        <div className="flex items-center justify-center p-6">
          <Chat path={pathformatted} userMessage={queryParam} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
