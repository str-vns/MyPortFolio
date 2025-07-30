import { useColorsTheme } from "@_/shared/colors";
import {
  SiJavascript,
  SiPython,
  SiTypescript,
  SiMysql,
  SiMongodb,
  SiReact,
  SiNodedotjs,
  SiPostman,
  SiRender,
  SiTailwindcss,
  SiShadcnui,
  SiSqlite,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiVercel,
  SiFirebase,
  SiGit,
  SiExpo,
  SiCss3,
  SiHtml5,
  SiWix,
  SiWordpress,
} from "react-icons/si";
import { FaWindows, FaLinux, FaMicrosoft } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import {
  PiMicrosoftExcelLogoFill,
  PiMicrosoftWordLogoFill,
  PiMicrosoftPowerpointLogoFill,
} from "react-icons/pi";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  SiJavascript,
  SiPython,
  SiTypescript,
  SiMysql,
  SiMongodb,
  SiReact,
  SiNodedotjs,
  SiPostman,
  SiRender,
  SiTailwindcss,
  SiShadcnui,
  SiSqlite,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiVercel,
  SiFirebase,
  SiGit,
  SiExpo,
  SiCss3,
  SiHtml5,
  SiWix,
  SiWordpress,
  FaWindows,
  FaLinux,
  FaMicrosoft,
  FaComputer,
  PiMicrosoftExcelLogoFill,
  PiMicrosoftWordLogoFill,
  PiMicrosoftPowerpointLogoFill,
};

type itemData = {
  title: string;
  color?: string;
  icon?: keyof typeof iconMap;
  knowledge?: string;
};

interface itemList {
  title?: string;
  category?: string;
  data: itemData[];
}

interface ListProps {
  items: itemList[];
  isTech: boolean;
}

export const List: React.FC<ListProps> = ({ items, isTech }) => {
  const colorTheme = useColorsTheme();
  return (
    <div className="gap-6">
      {isTech ? (
        items?.map((skill: itemList, index: number) => (
          <div key={index}>
            <p
              className="mb-6 text-2xl font-bold text-start"
              style={{ color: colorTheme.SEMIBLACK }}
            >
              {skill.category}
            </p>
            <div className="flex flex-col md:flex-row md:flex-wrap">
              {skill.data?.map((dataItem: itemData, idx: number) => (
                <div
                  key={idx}
                  className="flex flex-row items-center mb-2 md:mb-4 md:w-[45%] lg:w-[30%]"
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full"
                    style={{ backgroundColor: dataItem.color }}
                  >
                    {dataItem.icon &&
                      (() => {
                        const IconComponent = iconMap[
                          dataItem.icon
                        ] as React.ComponentType<{ className?: string }>;
                        return IconComponent ? (
                          <IconComponent className="text-white text-xl" />
                        ) : null;
                      })()}
                  </div>

                  <div className="flex flex-col ml-3">
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: colorTheme.SEMIBLACK }}
                    >
                      {dataItem.title}
                    </h3>
                    {dataItem.knowledge && (
                      <p
                        className="text-xs"
                        style={{ color: colorTheme.SEMIBLACK }}
                      >
                        Knowledge: {dataItem.knowledge}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="w-full max-w-6xl mx-auto px-4 ">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items?.map((skill, index) => (
              <li
                key={index}
                className="py-3 px-4 rounded-lg shadow-sm text-center text-gray-800 font-medium hover:shadow-md transition"
                style={{
                  color: colorTheme.TEXT,
                  background: colorTheme.BUTTON,
                }}
              >
                {skill.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
