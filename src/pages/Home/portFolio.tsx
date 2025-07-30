import { useEffect, useState } from "react";
import Desc from "@_/shared/Items/desc";
import { useColorsTheme } from "@_/shared/colors";
import Paginate from "@_/shared/Pagination/index";
import { useDarkMode } from "@_/stores/useDarkMode";
import { ModalCE } from "@_/shared/Modal/index";
import { useGitProd } from "@_/hooks/useGitProd";
import type { images } from "@_/types/gitProd";
import LoadingText from "@_/shared/Loading/index";
interface DescProps {
  title: string;
  description: string;
  images: images[];
  gitUrl: string;
  favorite: string;
  features: string[];
  tools: string[];
}

const Portfolio = () => {
  const colorTheme = useColorsTheme();
  const [isSelected, setSelected] = useState<string>("All");
  const [page] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isId, setId] = useState<string>("");
  const { isDarkMode } = useDarkMode();

  const { data: gitProd, refetch, isLoading } = useGitProd(isSelected, page);

  useEffect(() => {
    refetch();
  }, [isSelected, page, refetch]);

  return (
    <div className="flex flex-col items-center justify-center pt-10 px-4  sm:mr-0 md:mr-20 lg:mr-30 ">
      <div className="max-w-6xl border-b-2 text-center mb-2 ">
        <h1
          className="text-4xl font-bold mb-4 "
          style={{ color: colorTheme.NAVYBLUE }}
        >
          PortFolio
        </h1>
      </div>

      {process.env.BUILD === "DEV" && (
        <ModalCE
          isEdit={isEdit}
          opening={isOpen}
          setOpening={(val: boolean) => setIsOpen(val)}
          setEdit={(val: boolean) => setIsEdit(val)}
          prodjectId={isEdit ? isId : undefined}
        />
      )}
      <div className="w-full max-w-6xl text-gray-700 flex flex-col items-center">
        <div className="flex justify-center items-center mb-5">
          <p
            className="text-lg font-semibold mr-2 text-center"
            style={{ color: colorTheme.SEMIBLACK }}
          >
            Others
            <p
              className={`text-[14px] mr-0 md:ml-3 lg:ml-3 mb-2 ${isDarkMode ? "hover:text-[#CF0F47]" : "hover:text-[#123458]"}`}
            >
              <a href="https://stvnsbarrantes.wixsite.com/operating-sys">
                {'>'} Operating System Windows Server
              </a>
            </p>
            <p
              className={`text-[14px] mr-0 md:ml-3 lg:ml-3 ${isDarkMode ? "hover:text-[#CF0F47]" : "hover:text-[#123458]"}`}>
              <a href="https://stvnsbarrantes.wixsite.com/operating-sys/about-3">  {'>'} MultiMedia</a>
            </p>
          </p>
        </div>
        <div className="flex justify-center items-center mb-5">
          <p
            className="text-lg font-semibold mr-2"
            style={{ color: colorTheme.SEMIBLACK }}
          >
            Filter by:
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 gap-10 max-w-[350px] py-3">
        <div
          className={`${
            isSelected === "All"
              ? isDarkMode
                ? "bg-[#000000] text-[#FFDEDE] border-b-2 border-[#CF0F47]"
                : "bg-[#F1EFEC] text-[#123458] border-b-2 border-[#123458]"
              : isDarkMode
                ? "bg-[#000000] text-[#FFDEDE]"
                : "bg-[#F1EFEC] text-[#123458]"
          } cursor-pointer`}
          onClick={() => setSelected("All")}
        >
          <p className="text-center text-lg font-semibold">All</p>
        </div>
        <div
          className={`${
            isSelected === "Web"
              ? isDarkMode
                ? "bg-[#000000] text-[#FFDEDE] border-b-2 border-[#CF0F47]"
                : "bg-[#F1EFEC] text-[#123458] border-b-2 border-[#123458]"
              : isDarkMode
                ? "bg-[#000000] text-[#FFDEDE]"
                : "bg-[#F1EFEC] text-[#123458]"
          } cursor-pointer`}
          onClick={() => setSelected("Web")}
        >
          <p className="text-center text-lg font-semibold">Web</p>
        </div>
        <div
          className={`${
            isSelected === "Server"
              ? isDarkMode
                ? "bg-[#000000] text-[#FFDEDE] border-b-2 border-[#CF0F47]"
                : "bg-[#F1EFEC] text-[#123458] border-b-2 border-[#123458]"
              : isDarkMode
                ? "bg-[#000000] text-[#FFDEDE]"
                : "bg-[#F1EFEC] text-[#123458]"
          } cursor-pointer`}
          onClick={() => setSelected("Server")}
        >
          <p className="text-center text-lg font-semibold">Server</p>
        </div>
        <div
          className={`${
            isSelected === "Mobile"
              ? isDarkMode
                ? "bg-[#000000] text-[#FFDEDE] border-b-2 border-[#CF0F47]"
                : "bg-[#F1EFEC] text-[#123458] border-b-2 border-[#123458]"
              : isDarkMode
                ? "bg-[#000000] text-[#FFDEDE]"
                : "bg-[#F1EFEC] text-[#123458]"
          } cursor-pointer`}
          onClick={() => setSelected("Mobile")}
        >
          <p className="text-center text-lg font-semibold">Mobile</p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        {isLoading ? (
         <LoadingText text="Loading..." />
        ) : gitProd?.results && gitProd.results.length > 0 ? (
          <div className="flex flex-col items-center mb-5">
            <Paginate>
              {gitProd.results.map((item: DescProps, index: number) => (
                <Desc
                  key={index}
                  dataProps={item}
                  opening={(val: boolean, isEdit: boolean) => {
                    setIsOpen(val);
                    setIsEdit(isEdit);
                  }}
                  valID={(value: string) => setId(value)}
                />
              ))}
            </Paginate>
          </div>
        ) : (
          <div
            className={`
              text-center 
              justify-center 
              left-30
              font-bold
              text-2xl
              p-45
              ${isDarkMode ? "text-[#FFDEDE]" : "text-[#123458]"}
              `}
          >
            <p>No {isSelected} projects to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
