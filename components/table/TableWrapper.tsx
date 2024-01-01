"use client";

import { FIleType } from "@/typing";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { columns } from "./Column";
import { DataTable } from "./Table";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

function TableWrapper({ skeletonFiles }: { skeletonFiles: FIleType[] }) {
  const { user } = useUser();
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [initailFiles, setInitialFiles] = useState<FIleType[]>([]);

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;

    const files: FIleType[] = docs?.docs?.map((doc) => ({
      id: doc.id,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      downloadURL: doc.data().downloadURL,
      filename: doc.data().filename,
      fullName: doc.data().fullName,
      size: doc.data().size,
      type: doc.data().type,
    }));

    setInitialFiles(files);
  }, [docs]);

  console.log("initialFiles", initailFiles);

  if (docs?.docs.length === undefined) {
    return (
      <div className="flex flex-col">
        <Button variant={"outline"} className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="border rounded-lg">
          <div className="border-b h-12" />
          {skeletonFiles?.map((file) => (
            <div
              className="flex items-center space-x-4 p-5 w-full"
              key={file?.id}
            >
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}

          {skeletonFiles.length === 0 && (
            <div className="flex items-center space-x-4 p-5 w-full">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        variant="outline"
        className="ml-auto w-fit"
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
      >
        Sort By {sort === "desc" ? "Newest" : "Oldest"}
      </Button>
      <DataTable columns={columns} data={initailFiles} />
    </div>
  );
}

export default TableWrapper;
