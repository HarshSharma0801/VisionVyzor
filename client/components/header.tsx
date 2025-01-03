"use client";
import { DefaultSession } from "next-auth";
import { ReactElement } from "react";
import { Typewriter } from "react-simple-typewriter";

const Header = ({ user }: { user: DefaultSession["user"] }): ReactElement => {
  return (
    <>
      <div className="p-4 md:p-14 w-full h-full">
        <div className="flex justify-center flex-col gap-4 text-black ">
          <div className=" md:text-5xl text-3xl text-center font-railway font-bold">
            <Typewriter
              words={[
                "Unlock Insights with OCR & NLP",
                "Empower Searchability with Smart Tags",
                "Transform Raw Data into Actionable Insights",
                "Seamless Integration for Maximum Efficiency",
              ]}
              loop={0}
              cursor
              typeSpeed={10}
              deleteSpeed={10}
              delaySpeed={5000}
            />
          </div>

          <div className="text-xl md:text-3xl text-center font-extrabold font-railway">
            <Typewriter
              words={[
                "Extract, analyze, and tag key information from your documents effortlessly.",
                "Find part names, error codes, and instructions instantly with advanced tagging features.",
                "Convert unstructured text into searchable and meaningful data for smarter decision-making.",
                "Easily upload, process, and retrieve your documents with an intuitive, user-friendly interface.",
              ]}
              loop={0}
              cursor
              typeSpeed={10}
              deleteSpeed={10}
              delaySpeed={3000}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
