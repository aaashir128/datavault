import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
// import bgVideo from "../public/Datavault.mp4";
const bgVideo =
  "https://firebasestorage.googleapis.com/v0/b/datavault-971a2.appspot.com/o/users%2Fuser_2YwHKNiTis0YZ9JNUkdiBP9khOB%2Ffiles%2FKZDSDUcZcRTFZurKUqky?alt=media&token=ae62e54f-9eb9-4ad7-9d57-f241124de143";
const bgVideo2 =
  "https://www.canva.com/design/DAF4i4BWp1w/aTwXOjNO13xZzUPa485AeQ/watch?utm_content=DAF4i4BWp1w&utm_campaign=designshare&utm_medium=link&utm_source=editor";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#2b2929] dark:bg-slate-800">
        <div className="p-10 flex flex-col  text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to Datavault.
            <br />
            <br />
            Your Files, Anywhere, Anytime.
          </h1>

          <p className="pb-20">
            Discover the freedom of secure, cloud-based file management with
            Datavault. Effortlessly sync, share, and access your files from
            anywhere, ensuring your data is always at your fingertips.
          </p>

          <Link
            href={"/dashboard"}
            className="flex cursor-pointer bg-blue-500 p-5 w-fit"
          >
            Try it for free!
            <ArrowRight className="ml-10" />
          </Link>
        </div>

        <div className="bg-[#1e1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-lg">
            <source src={bgVideo2} />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <p className="text-xl font-bold text-center pt-5">Disclaimer</p>
      <p className="font-lighttext-center p-2">
        Datavault is committed to the security of user data, employing robust
        measures to protect information. However, users must recognize that
        absolute security cannot be guaranteed. It is imperative for users to
        maintain the confidentiality of their credentials, back up data
        regularly, and be aware of service limitations. The app may undergo
        periodic maintenance or encounter technical issues, and users are
        encouraged to stay informed about service status. DataVault is not
        liable for direct or indirect damages and users must adhere to the Terms
        of Use. This disclaimer is subject to change, and users are advised to
        review it periodically.
      </p>
    </main>
  );
}
