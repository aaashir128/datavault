"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { useState } from "react";

export function RenameModal() {
  const { toast } = useToast();
  const { user } = useUser();
  const {
    isRenameModalOpen,
    fileId,
    setFileId,
    filename,
    setFilename,
    setIsRenameModalOpen,
  } = useAppStore();

  async function renameFile() {
    if (!user || !fileId) return;

    await updateDoc(doc(db, `users/${user.id}/files/${fileId}`), {
      filename: filename,
    })
      .then(() => {
        toast({
          title: "Filename Changed Successfully",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Some Error Occured",
        });
      })
      .finally(() => {
        setIsRenameModalOpen(false);
      });
  }

  return (
    <Dialog
      open={isRenameModalOpen}
      //   onOpenChange={(isOpen) => {
      //     setIsDeleteModalOpen(isOpen);
      //   }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename the file</DialogTitle>
          <Input
            defaultValue={filename as string}
            onChange={(e) => setFilename(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />
        </DialogHeader>

        <div className="flex space-x-2 py-3">
          <Button
            size={"sm"}
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsRenameModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            size={"sm"}
            className="px-3 flex-1"
            type="submit"
            variant={"destructive"}
            onClick={() => renameFile()}
          >
            <span className="sr-only">Update</span>
            <span>Update</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
