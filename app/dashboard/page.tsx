import Dropzone from "@/components/Dropzone";
import TableWrapper from "@/components/table/TableWrapper";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase";
import { FIleType } from "@/typing";
import { auth, useClerk } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

async function page() {
  const { userId, user } = auth();

  const docsResult = await getDocs(
     collection(db, "users", userId ? userId : "", "files")
  );
  const skeletonFiles: FIleType[] = docsResult.docs.map((doc) => ({
    id: doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    downloadURL: doc.data().downloadURL,
    filename: doc.data().filename,
    fullName: doc.data().fullName,
    size: doc.data().size,
    type: doc.data().type,
  }));

  // console.log("skeletonFiles", skeletonFiles);

  return (
    <div className=" dark:text-blue-300 ">
      <Dropzone />

      <section className="container space-y-5 ">
        <h2 className="font-bold mt-5">All Files</h2>

        <div>
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
}

export default page;
