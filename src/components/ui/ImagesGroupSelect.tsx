import { Plus, Trash } from "@phosphor-icons/react";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import ProgressBar from "./ProgressBar";
import { v4 as uuidv4 } from "uuid";

interface IImagesGroupSelect {
  label?: string;
  onChange?: (files: FileType['url'][]) => any;
}

type FileType = {
  id: string;
  state: string;
  progress?: number;
  url?: string;
};

const ImagesGroupSelect = ({ label, onChange }: IImagesGroupSelect) => {
  const hiddenFileInput = useRef(null);
  const [files, setFiles] = useState<FileType[]>([]);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    onDrop: async (acceptedFiles) => {},
    onDropAccepted: (files, event) => {
      const uuid = uuidv4();

      let fileConfig = {
        id: uuid,
        state: "ready",
        progress: 0,
      };

      handleUploadFile(files[0], fileConfig);
    },
    onDropRejected: (files, event) => {
      console.log("rejected", files, event);
    },
  });

  const handleDeleteImage = useCallback((id: string) => {
    setFiles((oldFiles) => {
      return oldFiles.filter((file) => file.id !== id)
    });
  }, [files]);

  const handleUploadFile = useCallback(
    async (file: File, fileConfig: FileType) => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        setFiles([...files, fileConfig]);

        const response = await axios.post(
          "http://localhost:9000/media/upload",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentage = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total ?? 0),
              );

              setFiles((oldFiles) => {
                return oldFiles.map((currentFile) => {
                  if (currentFile.id === fileConfig.id) {
                    return {
                      ...currentFile,
                      progress: percentage,
                    };
                  } else {
                    return currentFile;
                  }
                });
              });
            },
          },
        );

        if (response.data) {
          setFiles((oldFiles) => {
            return oldFiles.map((currentFile) => {
              if (currentFile.id === fileConfig.id) {
                return {
                  ...currentFile,
                  state: "ready",
                  url: response?.data?.data,
                };
              } else {
                return currentFile;
              }
            });
          });
          console.log(response.data);
        }
      } catch (error) {
        // Handle the error
        console.error("Error uploading file", error);
      }
    },
    [files],
  );

  const handleOpen = () => {
    open();
  };

  useEffect(() => {
    if(onChange) {
      onChange(files.map((file) => file.url));
    }
  }, [files]);

  return (
    <div className="fromGroup">
      {label && <label className="block capitalize form-label">{label}</label>}

      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(240px,_1fr))]">
        {files.map((file) => (
          <div
            className={`relative flex h-[135px] items-center justify-center w-full border-2 border-solid 
            border-sky-500 text-gray-500 cursor-pointer hover:border-sky-500 hover:text-sky-500`}
          >
           
            <div className="h-12 w-12">
              <ProgressBar value={Number(file.progress)} />
            </div>

            {file.state === "ready" && (
              <>
                <img src={file.url} className="absolute h-full w-full object-contain" />
                
                <div 
                  className="absolute p-1 rounded-full top-[-7px] right-[-7px] bg-red-500"
                  onClick={() => {
                    handleDeleteImage(file.id);
                  }}
                >
                  <Trash size={17} weight="bold" color="white" />
                </div>
              </>
            )}
          </div>
        ))}

        <div
          className={`dropbox flex h-[135px] items-center justify-center w-full border-2 border-dashed ${
            isDragAccept
              ? "border-sky-500 text-sky-500"
              : isDragReject
                ? "border-red-500 text-red-500"
                : "border-gray-500 text-gray-500"
          } cursor-pointer hover:border-sky-500 hover:text-sky-500`}
          {...getRootProps({ isDragAccept, isFocused, isDragReject })}
          onClick={handleOpen}
        >
          <div className="row-start-2">
            <Plus size={40} weight="bold" />
          </div>

          <input
            type="file"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            {...getInputProps()}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagesGroupSelect;
