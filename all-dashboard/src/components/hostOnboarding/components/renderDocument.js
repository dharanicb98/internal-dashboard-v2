import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
const renderDocument = ({ DocURL }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  function getAllPages() {
    let jsxData = [];
    for (let i = 1; i <= numPages; i++) {
      jsxData.push(<Page key={`page_${i}`} pageNumber={i} />);
    }
    return jsxData;
  }


  return (!DocURL ? '' :
    <div className="w-[90%] lg:w-[100%] h-[60vh] mx-auto border rounded-lg m-10 overflow-auto">
      <Document file={DocURL} onLoadSuccess={onDocumentLoadSuccess}>
        {getAllPages().map((item) => item)}
      </Document>
    </div>
  );
};

export default renderDocument;
