"use client";
import { useEffect, useState } from "react";
import { DefaultSession } from "next-auth";
import { IDocument } from "@/utils/types";
import { get_user_documents } from "@/services/document";
import { IoMdDocument } from "react-icons/io";
import { useRouter } from "next/navigation";

const Documents = ({ user }: { user: DefaultSession["user"] }) => {
  const [documents, setDocuments] = useState<IDocument[] | null>(null);

  const router = useRouter();

  if (!user) return;

  const getDocs = async () => {
    console.log("get");
    if (user.id) {
      const data = await get_user_documents(user?.id);
      setDocuments(data);
    }
  };

  useEffect(() => {
    getDocs();
  }, []);

   const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const ordinalSuffix = (n: any) => {
      if (n % 10 === 1 && n % 100 !== 11) return "st";
      if (n % 10 === 2 && n % 100 !== 12) return "nd";
      if (n % 10 === 3 && n % 100 !== 13) return "rd";
      return "th";
    };

    return `${day}${ordinalSuffix(day)} ${month} ${year}`;
  };

  return (
    <>
      <div className="flex w-full font-railway justify-center items-center flex-col gap-3">
        {!documents && (
          <>
            <div className="flex text-left text-xl gap-2 font-railway">
              Process Documents !
            </div>
          </>
        )}
        {documents && documents.length > 0 && (
          <>
            <div className="flex text-left gap-2 text-xl">
              <div className="flex justify-center items-center">
                <IoMdDocument />
              </div>
              Your Documents
            </div>
            <div className="flex flex-col gap-3 md:w-[800px] py-4 px-4 w-full ">
              {documents.map((data) => {
                return (
                  <>
                    <div
                      onClick={() => {
                        router.push(`/documents/${data.id}`);
                      }}
                      className="w-full cursor-pointer rounded-xl flex justify-between border hover:bg-slate-200 border-slate-400 p-2 md:p-3 "
                    >
                      <div>{data.title}</div>
                      <div>{formatDate(data.createdAt)}</div>
                      <div>view</div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Documents;
