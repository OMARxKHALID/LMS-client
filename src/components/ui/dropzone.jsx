import { Upload, PDF, Trash } from "@/lib/icons";
import { useDropzoneHook } from "@/hooks/useDropzone";
import { cn } from "@/lib/utils";

const Dropzone = ({
  containerClassName,
  dropZoneClassName,
  pdfs,
  setPdfs,
  handleDrop,
  isUploading,
  ...props
}) => {
  const { dropzone, errorMessage } = useDropzoneHook({
    ...props,
    accept: { "application/pdf": [] }, // Accept only PDFs
    onDrop: handleDrop,
  });

  const truncateFileName = (fileName, maxLength = 15) => {
    if (fileName.length > maxLength) {
      return fileName.substring(0, maxLength) + "...";
    }
    return fileName;
  };

  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      <div
        {...dropzone.getRootProps()}
        className={cn(
          "flex justify-center items-center w-full h-32 border-dashed border-2 border-gray-200 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all select-none cursor-pointer",
          dropZoneClassName
        )}
      >
        <input {...dropzone.getInputProps()} />
        {dropzone.isDragAccept ? (
          <div className="text-sm font-medium">Drop your PDF files here!</div>
        ) : (
          <div className="flex items-center flex-col gap-1.5">
            <div className="flex items-center flex-row gap-0.5 text-sm font-medium">
              <Upload
                className={cn("mr-1 h-4 w-4", { "animate-spin": isUploading })}
              />
              {isUploading ? <p>Uploading...</p> : <p>Upload PDF files</p>}
            </div>
          </div>
        )}
      </div>
      {errorMessage && (
        <span className="text-xs text-red-600 mt-3">{errorMessage}</span>
      )}
      {pdfs.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          {pdfs.map((pdf, index) => (
            <div
              key={index}
              className="flex justify-between items-center flex-row w-full h-16 mt-2 px-4 border-solid border-2 border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4 h-full">
                <PDF className="text-rose-700 w-6 h-6" />
                <div className="flex flex-col gap-0">
                  <div className="text-[0.85rem] font-medium leading-snug">
                    {truncateFileName(pdf.name)}
                  </div>
                  <div className="text-[0.7rem] text-gray-500 leading-tight">
                    {Math.round(pdf.size / 1024)} KB
                  </div>
                </div>
              </div>
              <div
                className="p-2 rounded-full border-solid border-2 border-gray-100 shadow-sm hover:bg-accent transition-all cursor-pointer"
                onClick={() => setPdfs(pdfs.filter((_, i) => i !== index))}
              >
                <Trash className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
