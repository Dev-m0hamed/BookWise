"use client";

import config from "@/lib/config";
import {
  Image as IKImage,
  upload,
  ImageKitInvalidRequestError,
  ImageKitAbortError,
  ImageKitUploadNetworkError,
  ImageKitServerError,
  ImageKitProvider,
  Video,
} from "@imagekit/next";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "@/lib/utils";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { token, expire, signature } = data;
    return { token, expire, signature };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Authentication request failed: ${errorMessage}`);
  }
};

interface Props {
  type: "image" | "video";
  value: string;
  accept: string;
  placeholder: string;
  variant: "dark" | "light";
  onChange?: (value: string) => void;
}

function FileUpload({
  type,
  value,
  accept,
  placeholder,
  variant,
  onChange,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!onValidate(file)) return;

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setUploading(true);
    setProgress(0);

    abortControllerRef.current = new AbortController();

    try {
      const { token, expire, signature } = await authenticator();

      const uploadOptions = {
        file,
        fileName: file.name,
        token,
        signature,
        expire,
        publicKey,
        onProgress: (event: { loaded: number; total: number }) => {
          const percentCompleted = (event.loaded / event.total) * 100;
          setProgress(percentCompleted);
        },
        abortSignal: abortControllerRef.current.signal,
      };

      const response = await upload(uploadOptions);

      const imagePath = response.filePath;
      setPreview(imagePath);
      if (onChange && response.url) {
        onChange(response.url);
      }
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        toast.error("Upload cancelled" + error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        toast.error("Invalid request: " + error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        toast.error("Network error: " + error.message);
      } else if (error instanceof ImageKitServerError) {
        toast.error("Server error: " + error.message);
      } else {
        toast.error("An unexpected error occurred during upload." + error);
      }
    } finally {
      setUploading(false);
      setProgress(0);
      abortControllerRef.current = null;
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    if (onChange) {
      onChange("");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAbortUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast("File size too large", {
          description: "Please upload a file that is less than 20MB in size",
        });
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast("File size too large", {
          description: "Please upload a file that is less than 50MB in size",
        });
        return false;
      }
    }
    return true;
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative w-full rounded-md overflow-hidden">
          <ImageKitProvider urlEndpoint={urlEndpoint}>
            {type === "image" ? (
              <IKImage
                src={preview}
                alt="Uploaded Image"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
            ) : (
              <Video
                src={preview}
                controls
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
            )}
          </ImageKitProvider>
          <Button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 p-2 h-auto z-10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="w-full">
          <div
            onClick={!uploading ? triggerUpload : undefined}
            className={cn(
              variant === "dark"
                ? "bg-dark-300"
                : "bg-light-600 border border-gray-100",
              "w-full min-h-14 rounded-md flex flex-col items-center justify-center gap-2 py-1 px-3 cursor-pointer"
            )}
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-100"></div>
                <p
                  className={cn(
                    "text-sm",
                    variant === "dark" ? "text-light-100" : "text-slate-500"
                  )}
                >
                  Uploading... {Math.round(progress)}%
                </p>
                <div className="w-full max-w-xs rounded-full h-2">
                  <div
                    className="bg-green h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleAbortUpload}
                  className={cn(
                    "mt-2 text-white text-xs px-4 py-1 h-auto cursor-pointer",
                    variant === "dark" ? "bg-primary" : "bg-primary-admin"
                  )}
                >
                  Cancel Upload
                </Button>
              </>
            ) : (
              <>
                <div className="flex gap-2">
                  <Image
                    src="/icons/upload.svg"
                    alt="Upload icon"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <p
                    className={cn(
                      variant === "dark" ? "text-light-100" : "text-slate-500"
                    )}
                  >
                    {placeholder}
                  </p>
                </div>
              </>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={accept}
            style={{ display: "none" }}
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
}

export default FileUpload;
