// "use client";

// import { useRef, useState } from "react";
// import {
//   upload,
//   ImageKitAbortError,
//   ImageKitInvalidRequestError,
//   ImageKitServerError,
//   ImageKitUploadNetworkError,
// } from "@imagekit/next";

// interface ImageUploadProps {
//   value?: string; // URL or some identifier
//   onChange?: (value: string) => void;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [progress, setProgress] = useState(0);
//   const [uploadedURL, setUploadedURL] = useState<string | undefined>("");
//   const [previewURL, setPreviewURL] = useState<string | null>(null);
//   const [fileName, setFileName] = useState<string | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isUploaded, setIsUploaded] = useState(false);
//   const abortController = new AbortController();

//   const authenticator = async () => {
//     const res = await fetch("/api/auth/imagekit");
//     if (!res.ok) throw new Error("Authentication failed");
//     const { signature, expire, token, publicKey } = await res.json();
//     return { signature, expire, token, publicKey };
//   };

//   const handleFileChange = () => {
//     const input = fileInputRef.current;
//     if (!input || !input.files?.[0]) return;

//     const file = input.files[0];
//     const fileSizeMB = file.size / (1024 * 1024);
//     const fileType = file.type;

//     if (fileType.startsWith("image/") && fileSizeMB > 20) {
//       alert("Image file must be less than or equal to 20MB.");
//       input.value = "";
//       return;
//     }

//     if (fileType.startsWith("video/") && fileSizeMB > 50) {
//       alert("Video file must be less than or equal to 50MB.");
//       input.value = "";
//       return;
//     }

//     setFileName(file.name);

//     if (fileType.startsWith("image/")) {
//       setPreviewURL(URL.createObjectURL(file));
//     } else {
//       setPreviewURL(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (isUploading || isUploaded) return;

//     const input = fileInputRef.current;
//     if (!input || !input.files?.[0]) {
//       alert("Please select a file to upload");
//       return;
//     }

//     const file = input.files[0];

//     try {
//       setIsUploading(true);
//       const { signature, expire, token, publicKey } = await authenticator();

//       const result = await upload({
//         file,
//         fileName: file.name,
//         signature,
//         expire,
//         token,
//         publicKey,
//         onProgress: (event) => {
//           setProgress((event.loaded / event.total) * 100);
//         },
//         abortSignal: abortController.signal,
//       });

//       setUploadedURL(result.url);
//       setIsUploaded(true);
//       onChange?.(result.url);
//     } catch (error) {
//       if (error instanceof ImageKitAbortError) {
//         console.error("Upload aborted:", error.reason);
//       } else if (error instanceof ImageKitInvalidRequestError) {
//         console.error("Invalid request:", error.message);
//       } else if (error instanceof ImageKitUploadNetworkError) {
//         console.error("Network error:", error.message);
//       } else if (error instanceof ImageKitServerError) {
//         console.error("Server error:", error.message);
//       } else {
//         console.error("Upload error:", error);
//       }
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <label className="cursor-pointer bg-gray-200 px-4 py-2 rounded text-black inline-block mr-3">
//         Choose File
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           disabled={isUploaded}
//           accept="image/*,video/*,application/pdf"
//           className="hidden"
//         />
//       </label>

//       {previewURL && (
//         <div>
//           <p className="text-gray-600">Preview:</p>
//           <img
//             src={previewURL}
//             alt="Preview"
//             className="rounded shadow w-full"
//           />
//         </div>
//       )}

//       {fileName && !previewURL && (
//         <p className="text-gray-500">Selected file: {fileName}</p>
//       )}

//       <button
//         onClick={handleUpload}
//         disabled={isUploading || isUploaded}
//         className={`px-4 py-2 rounded text-[hsl(var(--primary))]  cursor-pointer ${
//           isUploading || isUploaded
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-[var(--dark-600)]"
//         }`}
//       >
//         {isUploading ? "Uploading..." : isUploaded ? "Uploaded" : "Upload"}
//       </button>

//       {progress > 0 && (
//         <progress value={progress} max={100} className="w-full"></progress>
//       )}

//       {uploadedURL && (
//         <div>
//           <p className="text-[var(--light-100)]">Uploaded successfully</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;

"use client";

import { useRef, useState } from "react";
import { upload } from "@imagekit/next";

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [previewURL, setPreviewURL] = useState<string | null>(value ?? null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(!!value);
  const abortController = new AbortController();

  const authenticator = async () => {
    const res = await fetch("/api/auth/imagekit");
    if (!res.ok) throw new Error("Authentication failed");
    const { signature, expire, token, publicKey } = await res.json();
    return { signature, expire, token, publicKey };
  };

  const handleFileChange = () => {
    const input = fileInputRef.current;
    if (!input || !input.files?.[0]) return;

    const file = input.files[0];
    const fileSizeMB = file.size / (1024 * 1024);
    const fileType = file.type;

    if (fileType.startsWith("image/") && fileSizeMB > 20) {
      alert("Image file must be ≤ 20MB.");
      input.value = "";
      return;
    }

    if (fileType.startsWith("video/") && fileSizeMB > 50) {
      alert("Video file must be ≤ 50MB.");
      input.value = "";
      return;
    }

    setFileName(file.name);

    if (fileType.startsWith("image/")) {
      setPreviewURL(URL.createObjectURL(file));
    } else {
      setPreviewURL(null);
    }
  };

  const handleUpload = async () => {
    if (isUploading || isUploaded) return;

    const input = fileInputRef.current;
    if (!input || !input.files?.[0]) {
      alert("Please select a file to upload");
      return;
    }

    const file = input.files[0];

    try {
      setIsUploading(true);
      const { signature, expire, token, publicKey } = await authenticator();

      const result = await upload({
        file,
        fileName: file.name,
        signature,
        expire,
        token,
        publicKey,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.signal,
      });

      if (result.url) {
        setIsUploaded(true);
        onChange?.(result.url); // ✅ Only if result.url is defined
      } else {
        console.error("Upload succeeded but URL is missing");
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="cursor-pointer bg-gray-200 px-4 py-2 rounded text-black inline-block mr-3">
        Choose File
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isUploaded}
          accept="image/*,video/*,application/pdf"
          className="hidden"
        />
      </label>

      {previewURL && (
        <div>
          <p className="text-gray-600">Preview:</p>
          <img
            src={previewURL}
            alt="Preview"
            className="rounded shadow w-full"
          />
        </div>
      )}

      {fileName && !previewURL && (
        <p className="text-gray-500">Selected file: {fileName}</p>
      )}

      <button
        onClick={handleUpload}
        disabled={isUploading || isUploaded}
        className={`px-4 py-2 rounded text-[hsl(var(--primary))] cursor-pointer ${
          isUploading || isUploaded
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[var(--dark-600)]"
        }`}
      >
        {isUploading ? "Uploading..." : isUploaded ? "Uploaded" : "Upload"}
      </button>

      {progress > 0 && (
        <progress value={progress} max={100} className="w-full"></progress>
      )}

      {value && (
        <div>
          <p className="text-[var(--light-100)]">Uploaded successfully</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
