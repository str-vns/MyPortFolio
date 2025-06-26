import TextType from "@_/shared/text/textType";
import { mainText } from "@_/data/mainText";
import { useEffect, useState } from "react";
import { useColorsTheme } from "@_/shared/colors";
import { socials } from "@_/data/socials";
import { useDarkMode } from "@_/stores/useDarkMode";

interface Social {
  id: string;
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
}

const Main = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(false);
  const colorsTheme = useColorsTheme();
  const { isDarkMode } = useDarkMode();

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
        src={`${ isDarkMode ? "https://res.cloudinary.com/diljhwf3a/image/upload/v1750943279/jywdqpskrrlrtsimbxln.jpg" : "https://res.cloudinary.com/diljhwf3a/image/upload/v1696484873/cld-sample-2.jpg"}`}
        alt="Main page"
        className="absolute top-0 left-0 w-screen h-screen object-cover pointer-events-none [mask-image:linear-gradient(to_left,black,transparent)]"
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-10">
        <div className="absolute inset-0 bg-gradient-to-r to-transparent pointer-events-none" />
        <div className="flex flex-col items-start justify-center min-h-screen text-left space-y-4 mx-auto w-fit lg:pr-[500px] md:pr-[100px] sm:pr-[150px] pr-10 pl-10">
          <h1
            className={`text-6xl font-bold`}
            style={{
              color: colorsTheme.SEMIBLACK,
              fontWeight: "bold",
            }}
          >
            Stevens Barrantes
          </h1>

          <p className={`text-lg`} style={{ color: colorsTheme.SEMIBLACK }}>
            <span className={`border-b-2`} style={{ borderColor: colorsTheme.SEMIBLACK }}>
              <TextType
                key={textIndex + "-" + resetTrigger}
                text={mainText[textIndex].subtitle}
              />
            </span>
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-2 text-gray-600 items-center ">
            { socials.map((social: Social) => (
              <a
                href={social.url}
                className={`flex flex-col items-center justify-center ${social.disabled ? 'cursor-not-allowed opacity-50 pointer-events-none' : ''}`}
                key={social.id}
              >
                <social.icon className={`${social.title !== 'LinkedIn' ? 'rounded-full' : 'rounded-xl'} 
                p-2 w-9 h-9 ${ isDarkMode ?" text-[#FFDEDE] bg-[#CF0F47] hover:bg-[#FF0B55]" : "text-[#F1EFEC] bg-[#123458] hover:bg-[#030303]" } transition`} />

                <span className={` ${isDarkMode ? 'text-[#FFDEDE]' : 'text-[#123458]'} text-xs items-center justify-center flex mt-1`}>
                  {social.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
