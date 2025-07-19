import React from "react";
import { PiDownloadBold } from "react-icons/pi";
import { educationData, experienceData } from "@_/data/resumeData";
import { Button } from "@_/components/ui/button";
import { useColorsTheme } from "@_/shared/colors";
import { useDarkMode } from "@_/stores/useDarkMode";
import { useEducation, useExperience } from "@_/hooks/useOthers";

export interface Educations {
  school: string;
  degree: string;
  duration: string;
  course: string;
  icon: React.ReactNode;
  iconColor?: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  icon: React.ReactNode;
  iconColor?: string;
}

const Resume = () => {
  const colorsTheme = useColorsTheme();
  const { isDarkMode } = useDarkMode();
  const { data: Educ } = useEducation();
  const { data: Exp } = useExperience();

  return (
    <div className="flex flex-col items-center justify-center pt-10 px-4  sm:mr-0 md:mr-20 lg:mr-30">
      <div className="max-w-6xl border-b-2 text-center mb-5 ">
        <h1
          className="text-4xl font-bold mb-4 "
          style={{ color: colorsTheme.NAVYBLUE }}
        >
          Resume
        </h1>
      </div>

      <div className="w-full max-w-6xl text-gray-700 flex flex-col items-center">
        <p
          className="mb-4 text-center"
          style={{ color: colorsTheme.SEMIBLACK }}
        >
          This is my resume, showcasing my education and experience.
        </p>
        <Button
          variant="outline"
          className={`mt-2

          ${isDarkMode ? "hover:bg-[#FFDEDE] hover:text-[#000000] text-[#FFDEDE] bg-[#CF0F47]" : "hover:bg-[#D4C9BE] hover:text-[#030303] text-[#F1EFEC] bg-[#123458]"} flex items-center justify-center gap-2`}
          asChild
        >
          <a
            href={process.env.DOWNLOADCV}
            download="Barrantes-Stevens-CV.pdf"
          >
            <PiDownloadBold size={18} />
            Download Resume
          </a>
        </Button>
      </div>

      <div className="flex grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-[1000px] pt-10">
        <div className="w-full max-w-[1000px] mx-auto">
          <div className="mb-6">
            <h2
              className="text-2xl font-bold text-center"
              style={{ color: colorsTheme.NAVYBLUE }}
            >
              Education
            </h2>
          </div>

          <div className="flex flex-col space-y-6 ml-4 relative border-l-2 border-gray-300">
            {Educ?.map((education: Educations, index: number) => (
              <div className="relative pl-6" key={index}>
                <div
                  className={`w-6 h-6 ${education.iconColor} rounded-full text-white text-xs flex items-center justify-center absolute -left-3 top-0`}
                >
                  {education.icon}
                </div>

                <p
                  className="mt-1 font-semibold"
                  style={{ color: colorsTheme.NAVYBLUE }}
                >
                  {education.icon} {education.school}
                </p>
                <p
                  className="mt-2 text-sm"
                  style={{ color: colorsTheme.SEMIBLACK }}
                >
                  Degree:{" "}
                  <span
                    className="font-semibold"
                    style={{ color: colorsTheme.SEMIBLACK }}
                  >
                    {education.degree}
                  </span>
                </p>
                <p
                  className="mt-2 text-sm"
                  style={{ color: colorsTheme.SEMIBLACK }}
                >
                  School Year:{" "}
                  <span
                    className="font-semibold"
                    style={{ color: colorsTheme.SEMIBLACK }}
                  >
                    {education.duration}
                  </span>
                </p>
                <p
                  className="mt-2 text-sm"
                  style={{ color: colorsTheme.SEMIBLACK }}
                >
                  Course:{" "}
                  <span
                    className="font-semibold"
                    style={{ color: colorsTheme.SEMIBLACK }}
                  >
                    {education.course}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[1000px] mx-auto">
          <div className="mb-6">
            <h2
              className="text-2xl font-bold text-center"
              style={{ color: colorsTheme.NAVYBLUE }}
            >
              Experience
            </h2>
          </div>
          <div className="flex flex-col space-y-6 ml-4 relative border-l-2 border-gray-300">
            {Exp?.map((experience: Experience, index: number) => (
              <div className="relative pl-6" key={index}>
                <div
                  className={`w-6 h-6 rounded-full ${experience.iconColor} text-white text-xs flex items-center justify-center absolute -left-3 top-0`}
                >
                  {experience.icon}
                </div>

                <p
                  className="mt-1 font-semibold"
                  style={{ color: colorsTheme.NAVYBLUE }}
                >
                  {" "}
                  {experience.icon} {experience.company}
                </p>

                <p
                  className="mt-2 text-sm"
                  style={{ color: colorsTheme.SEMIBLACK }}
                >
                  Role:{" "}
                  <span
                    className="font-semibold"
                    style={{ color: colorsTheme.SEMIBLACK }}
                  >
                    {experience.position}
                  </span>
                </p>

                <p
                  className="mt-2 text-sm"
                  style={{ color: colorsTheme.SEMIBLACK }}
                >
                  Year:{" "}
                  <span
                    className="font-semibold"
                    style={{ color: colorsTheme.SEMIBLACK }}
                  >
                    {experience.duration}
                  </span>
                </p>

                <div className="mt-2">
                  <ul
                    className="list-disc list-inside space-y-1 "
                    style={{ color: colorsTheme.SEMIBLACK }}
                  >
                    {experience.description
                      .split(".")
                      .filter((item) => item.trim())
                      .map((item, idx) => (
                        <li key={idx} className="text-sm">
                          <span
                            className="font-semibold"
                            style={{ color: colorsTheme.SEMIBLACK }}
                          >
                            {item.trim()}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
