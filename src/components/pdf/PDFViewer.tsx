import React from "react";
type Promps = {
  path: string;
  document: string | null;
};

function PDFViewer({ path, document }: Promps) {
  return (
    <iframe
      src={`/documents/${path}/${document}.pdf`}
      className="w-full h-[92vh]"
      style={{ border: "none" }}
    />
  );
}

export default PDFViewer;
