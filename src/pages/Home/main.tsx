import { Github, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import TextType from "@_/shared/text/textType";
import { mainText } from "@_/data/mainText";
import { useEffect, useState } from "react";

interface textType {
  subtitle: string;
}
const Main = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(false);

  useEffect(() => {
    const interval = setTimeout(
      () => {
        setTextIndex((prev) => (prev + 1) % mainText.length);
        setResetTrigger(true);
      },
      mainText[textIndex].subtitle.length * 100 + 2500
    );

    return () => clearTimeout(interval);
  }, [textIndex]);

  return (
    <div className="relative w-full h-full ">
      <img
        src="https://res.cloudinary.com/diljhwf3a/image/upload/v1696484873/cld-sample-2.jpg"
        alt="Main page"
        className="absolute top-0 left-0 w-screen h-screen object-cover pointer-events-none [mask-image:linear-gradient(to_left,black,transparent)]"
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-10">
        <div className="absolute inset-0 bg-gradient-to-r to-transparent pointer-events-none" />
        <div className="flex flex-col items-start justify-center min-h-screen text-left space-y-4 mx-auto w-fit lg:pr-[500px] md:pr-[100px] sm:pr-[150px] pr-10 pl-10">
          <h1
            className="text-6xl font-bold text-gray-800 "
            style={{
              fontWeight: "bold",
            }}
          >
            Stevens Barrantes
          </h1>

          <p className="text-lg text-gray-600 ">
            <span className="border-b-2 border-blue-500">
              <TextType
                key={textIndex + "-" + resetTrigger}
                text={mainText[textIndex].subtitle}
              />
            </span>
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-2 text-gray-600 items-center ">
            <a
              href="https://github.com/str-vns"
              className="flex flex-col items-center justify-center"
            >
              <Github className="rounded-full p-2 w-9 h-9 text-[#F1EFEC] bg-[#123458] hover:bg-[#030303] transition" />

              <span className=" text-[#123458] text-xs  text-[#123458] text-xs items-center justify-center flex mt-1">
                GitHub
              </span>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61553000139498"
              className="flex flex-col items-center justify-center"
            >
              <Facebook className="rounded-full p-2 w-9 h-9 text-[#F1EFEC] bg-[#123458] hover:bg-[#030303] transition" />
              <span className=" text-[#123458] text-xs items-center justify-center flex mt-1">
                Facebook
              </span>
            </a>

            <a
              href="https://x.com/Justoromomo"
              className="flex flex-col items-center justify-center"
            >
              <Twitter className="rounded-full p-2 w-9 h-9 text-[#F1EFEC] bg-[#123458] hover:bg-[#030303] transition" />
              <span className=" text-[#123458] text-xs items-center justify-center flex mt-1">
                X
              </span>
            </a>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex flex-col items-center justify-center cursor-not-allowed opacity-50 pointer-events-none"
              aria-disabled="true"
            >
              <Instagram className="rounded-full p-2 w-9 h-9 text-[#F1EFEC] bg-[#123458]" />
              <span className="text-[#123458] text-xs items-center justify-center flex mt-1">
                Instagram
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/stevens-barrantes-0630bb269"
              className="flex flex-col items-center justify-center"
            >
              <Linkedin className="rounded p-2 w-9 h-9 text-[#F1EFEC] bg-[#123458] hover:bg-[#030303] transition" />
              <span className=" text-[#123458] text-xs items-center justify-center flex mt-1">
                LinkedIn
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
