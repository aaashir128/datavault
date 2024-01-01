"use client";
import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import DropzoneComponent from "react-dropzone";
import { useToast } from "./ui/use-toast";

function Dropzone() {
  const maxSize = 20971520;
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const { toast } = useToast();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles?.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading has failed");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });

    const uploadPost = async (selectedFile: File) => {
      if (loading) return;
      setLoading(true);
      toast({
        variant: "default",
        title: "Uploading",
      });

      const docRef = await addDoc(
        collection(db, "users", user ? user.id : "", "files"),
        {
          userId: user ? user.id : "",
          filename: selectedFile.name,
          fullName: user ? user.fullName : "",
          profileImg: user?.imageUrl,
          timestamp: serverTimestamp(),
          type: selectedFile.type,
          size: selectedFile?.size,
        }
      );

      const imageRef = ref(
        storage,
        `users/${user && user.id}/files/${docRef.id}`
      );

      uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(
          doc(db, "users", user ? user.id : "", "files", docRef.id),
          {
            downloadURL,
          }
        );
      });

      setLoading(false);
    };
  };
  return (
    <DropzoneComponent onDrop={(acceptedFiles) => onDrop(acceptedFiles)}>
      {({
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0]?.file.size > maxSize;
        return (
          <section>
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-[#035FFE] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop to upload this file!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large.</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}

export default Dropzone;
