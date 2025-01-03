"use client";

import { ReactElement, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { get_document_by_id } from "@/services/document";
import { IDocument } from "@/utils/types";

const Content = (): ReactElement => {
  const params = useParams();

  const [document, setDocument] = useState<IDocument | null>(null);

  const getDocument = async () => {
    if (params.id) {
      const data = await get_document_by_id(params.id as string);
      setDocument(data);
    }
  };

  useEffect(() => {
    getDocument();
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

  const sample_pages = [
    {
      id: "cm5gm0cvz0003egqrxmlwcika",
      pageNumber: 1,
      content: {
        ORG: ["TW"],
        PRODUCT: ["PRESSURE COOKER"],
        INSTRUCTION: ["INSTRUCTION"],
      },
      createdAt: "2025-01-03T10:25:48.863000Z",
      updatedAt: "2025-01-03T10:25:48.863000Z",
      docId: "cm5gm0cvo0001egqro4vlu1qh",
      document: null,
    },
    {
      id: "cm5gm0cw30005egqr5fl6z6l5",
      pageNumber: 2,
      content: {},
      createdAt: "2025-01-03T10:25:48.867000Z",
      updatedAt: "2025-01-03T10:25:48.867000Z",
      docId: "cm5gm0cvo0001egqro4vlu1qh",
      document: null,
    },
    {
      id: "cm5gm0cw50007egqrfv7lvodi",
      pageNumber: 3,
      content: {
        FAC: ["Maker Tower F-101"],
        GPE: ["Mumbai", "India", "Mumbai"],
        LOC: ["Cuffe Parade"],
        ORG: [
          "Copyright Reserved Hawkins Cookers Limited",
          "Hawkins Cookers Limited",
        ],
        DATE: ["2003"],
        PERSON: ["Brahm Vasudeva", "Usha Multigraphs"],
        PRODUCT: ["PRESSURE COOKER"],
        INSTRUCTION: ["INSTRUCTION"],
      },
      createdAt: "2025-01-03T10:25:48.869000Z",
      updatedAt: "2025-01-03T10:25:48.869000Z",
      docId: "cm5gm0cvo0001egqro4vlu1qh",
      document: null,
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-4 md:justify-center font-railway items-center w-full h-full md:p-10 px-5 py-5">
        {document && (
          <>
            <div className="flex flex-col gap-3 justify-start md:justify-center">
              <div className="md:text-4xl text-xl text-center">
                {document.title}
              </div>
              <div className="md:text-3xl text-[16px]">
                {formatDate(document.createdAt)}
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full md:p-10">
              <div className="md:text-3xl text-xl">
                Pages - {document.pages.length}
              </div>

              <div className="w-full flex justify-center items-center flex-col gap-3">
                {document.pages &&
                  document.pages.map((page: any) => {
                    return (
                      <>
                        <div className="bg-[#EEEDEB] cursor-pointer flex flex-col w-full justify-center items-center md:p-8 gap-2 border border-slate-400 rounded-xl">
                          <div className="md:text-xl ">
                            Page - {page.pageNumber}
                          </div>

                          <div className="w-full flex flex-col gap-2 justify-start">
                            {Object.entries(page.content).map(
                              ([key, values]) => {
                                return (
                                  <>
                                    <div className="flex gap-4 ">
                                      <div className="text-[16px]">{key} :</div>

                                      <div className="flex gap-2"></div>
                                      {Array.isArray(values) &&
                                        values.map(
                                          (data: any, index: number) => {
                                            return (
                                              <>
                                                {index + 1 !== values.length ? (
                                                  <div className="text-[16px]">
                                                    {data} ,
                                                  </div>
                                                ) : (
                                                  <div className="text-[16px]">
                                                    {data}
                                                  </div>
                                                )}
                                              </>
                                            );
                                          }
                                        )}
                                    </div>
                                  </>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Content;
