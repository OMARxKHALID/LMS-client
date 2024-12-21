import { useState } from "react";
import { useDropzone } from "react-dropzone";

export const useDropzoneHook = (props) => {
  const [filesUploaded, setFilesUploaded] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const dropzone = useDropzone({
    ...props,
    onDrop(acceptedFiles, fileRejections, event) {
      if (props.onDrop) props.onDrop(acceptedFiles, fileRejections, event);
      else {
        setFilesUploaded((prevFiles) => [...prevFiles, ...acceptedFiles]);
        if (fileRejections.length > 0) {
          const _errorMessage = fileRejections
            .map(
              (rejection) =>
                `Could not upload ${rejection.file.name} - ${rejection.errors[0]?.message}`
            )
            .join(", ");
          setErrorMessage(_errorMessage);
        } else {
          setErrorMessage("");
        }
      }
    },
  });

  const deleteUploadedFile = (index) => {
    setFilesUploaded((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return {
    dropzone,
    filesUploaded,
    errorMessage,
    deleteUploadedFile,
  };
};
