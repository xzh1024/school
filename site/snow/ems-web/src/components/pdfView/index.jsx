import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc =
  process.env.REACT_APP_ENV === 'prod'
    ? 'http://fssc.crb.cn/image/pdf.worker.min.js'
    : 'http://fssc-uat.crb.cn/image/pdf.worker.min.js';

const defaultOptions = {
  cMapUrl: process.env.REACT_APP_ENV === 'dev' ? 'cmaps/' : '/image/cmaps/',
  cMapPacked: true,
};
let count = 0;

export default function Index(props) {
  const [numPages, setNumPages] = useState(null); //pdf的总页数
  const [error, setError] = useState(false);
  const { fileName, hideLoading, width, print, rotate = 0, scale = 1 } = props;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleSuccess = () => {
    if (print) {
      count++;
      if (numPages === count) {
        hideLoading && hideLoading();
      }
      return;
    }
    hideLoading && hideLoading();
  };

  const onError = () => {
    setError(true);
    hideLoading && hideLoading();
  };

  return (
    <div
      className={`w-full h-full overflow-scroll ${error ? 'flex flex-col justify-center items-center' : ''} ${
        print ? 'flex flex-col justify-center items-center' : ''
      }`}
      style={
        scale > 1
          ? {
              transform: `matrix(${scale}, 0, 0, ${scale}, 0, 0)`,
            }
          : {}
      }
    >
      <Document
        file={fileName}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onError}
        options={defaultOptions}
        error={'Failed to load the pdf file. Procedure'}
        loading={<div className="flex justify-center items-center"></div>}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div key={`page_${index + 1}`} style={{ pageBreakAfter: 'always' }}>
            <Page
              width={print ? 1200 : width ? width - 100 : 400}
              onRenderSuccess={handleSuccess}
              onRenderError={onError}
              error={<div className="flex justify-center items-center">{'Failed to load the pdf file. Procedure'}</div>}
              loading={<div className="flex justify-center items-center"></div>}
              pageNumber={index + 1}
              scale={scale <= 1 ? scale : undefined}
              rotate={rotate}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
