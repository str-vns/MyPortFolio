import { useEffect } from "react";
import { ChevronsLeftRightEllipsis, FileCode } from "lucide-react";
import { useColorsTheme } from "@_/shared/colors";
import { List } from "@_/shared/List";
import { showCase } from "@_/data/ShowCase";
import { useSkills, useSoftSkill } from "@_/hooks/useGitProd";

const About = () => {
  const { data: skills, refetch } = useSkills();
  const { data: softSkill } = useSoftSkill();
  const colorTheme = useColorsTheme();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex flex-col items-center justify-center pt-10 px-4  sm:mr-0 md:mr-20 lg:mr-30">
      <div className="max-w-6xl border-b-2 text-center mb-5 ">
        <h1
          className="text-4xl font-bold mb-4 "
          style={{ color: colorTheme.NAVYBLUE }}
        >
          About Me
        </h1>
      </div>
      {/* 
      <div className="w-full max-w-6xl flex flex-col items-center">
        <p className="mb-4 text-center" style={{ color: colorTheme.SEMIBLACK }}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor.
        </p>
      </div> */}

      <div className="flex flex-col lg:flex-row items-start justify-center gap-10 w-full max-w-[1000px] py-10">
        <img
          src={process.env.MYIMG}
          alt="About Me"
          className="rounded-full shadow-lg h-80 w-80 object-cover mx-auto"
        />

        <div className="max-w-[600px]">
          <h1
            className="text-3xl font-bold text-gray-800 mb-4 stroke-2"
            style={{
              color: colorTheme.NAVYBLUE,
            }}
          >
            {process.env.NAME}
          </h1>
          <p className="mb-4" style={{ color: colorTheme.SEMIBLACK }}>
            A fresh graduate always willing to learn and grow — aspiring to be a
            DevOps engineer or web and mobile developer, with a strong interest
            in exploring hardware as well.
          </p>

          <div className="mt-6 flex flex-col md:flex-row lg:flex-row justify-between gap-10 mr-5 text-[15px]">
            <div className="flex flex-col ">
              <p className="mb-5">
                <ChevronsLeftRightEllipsis
                  className="inline-block mr-2 "
                  style={{ color: colorTheme.SEMIBLACK }}
                />
                <span
                  className="font-bold"
                  style={{
                    color: colorTheme.NAVYBLUE,
                  }}
                >
                  Address: 114 Bagumbayan Taguig, 1630
                </span>
              </p>
              <p className="mb-5">
                <ChevronsLeftRightEllipsis
                  className="inline-block mr-2 "
                  style={{ color: colorTheme.SEMIBLACK }}
                />
                <span
                  className="font-bold"
                  style={{
                    color: colorTheme.NAVYBLUE,
                  }}
                >
                  Email: stvnsbarrantes@gmail.com
                </span>
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mb-5">
                <ChevronsLeftRightEllipsis
                  className="inline-block mr-2 "
                  style={{ color: colorTheme.SEMIBLACK }}
                />
                <span
                  className="font-bold"
                  style={{
                    color: colorTheme.NAVYBLUE,
                  }}
                >
                  Interest: Also exploring hardware and embedded systems
                </span>
              </p>
              <p className="mb-5">
                <ChevronsLeftRightEllipsis
                  className="inline-block mr-2 "
                  style={{ color: colorTheme.SEMIBLACK }}
                />
                <span
                  className="font-bold"
                  style={{
                    color: colorTheme.NAVYBLUE,
                  }}
                >
                  GitHub: str-vns
                </span>
              </p>
            </div>
          </div>
{/* 
          <p className="mt-4" style={{ color: colorTheme.SEMIBLACK }}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat.
          </p> */}
        </div>
      </div>

      {/* <p
        className="max-w-[1000px] text-center mb-10"
        style={{ color: colorTheme.SEMIBLACK }}
      >
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
        ex sapien vitae pellentesque sem placerat.
      </p> */}

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 lg:gap-40 mb-20">
        {showCase.map((item: any, index: number) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <div className={`rounded-full bg-[${colorTheme.NAVYBLUE}] p-4`}>
              <FileCode className={`text-[${colorTheme.LIGHTGREY}]`} />
            </div>
            <span
              className={`text-2xl mt-2 font-bold text-[${colorTheme.SEMIBLACK}]`}
            >
              {item.valueNum}
            </span>
            <span className={`text-[16px] mt-2 text-[${colorTheme.SEMIBLACK}]`}>
               {item.type}
            </span>
          </div>
        ))}
      </div>
      <div className="max-w-6xl border-b-2 text-center mb-5 ">
        <h1
          className="text-4xl font-bold mb-4 "
          style={{ color: colorTheme.NAVYBLUE }}
        >
          Skills
        </h1>
      </div>
      <div
        className="w-full max-w-6xl text-gray-700 flex flex-col items-center"
        style={{ color: colorTheme.SEMIBLACK }}
      >
        {/* <p className="mb-4 text-center">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat.
        </p> */}
      </div>
      <div className="w-full max-w-6xl ">
        <p
          className="mb-6 text-2xl font-bold text-center"
          style={{ color: colorTheme.SEMIBLACK }}
        >
          Technical Skills
        </p>
        <List items={skills} isTech={true} />

        <div className="w-full max-w-6xl mb-10">
          <p
            className="mb-10 text-2xl font-bold text-center"
            style={{ color: colorTheme.SEMIBLACK }}
          >
            Soft Skills
          </p>
          <List items={softSkill} isTech={false} />
        </div>
      </div>
    </div>
  );
};

export default About;
