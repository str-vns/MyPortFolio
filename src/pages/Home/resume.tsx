import React from "react";
import { PiDownloadBold } from "react-icons/pi";
import { educationData, experienceData } from "@_/data/resumeData";
import { Button } from "@_/components/ui/button";

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
  return (
    <div className="flex flex-col items-center justify-center pt-10 px-4  sm:mr-0 md:mr-20 lg:mr-30">
      <div className="max-w-6xl border-b-2 text-center mb-5 ">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Resume</h1>
      </div>

      <div className="w-full max-w-6xl text-gray-700 flex flex-col items-center">
        <p className="mb-4 text-center">
          This is my resume, showcasing my education and experience.
        </p>
        <Button
          variant="outline"
          className="mt-2 hover:bg-gray-100 hover:text-black flex items-center justify-center gap-2"
          asChild
        >
          <a
            href="https://firebasestorage.googleapis.com/v0/b/uploadingfile-95e4b.appspot.com/o/Files%2FBarrantes%2C%20Stevens%2C%20C..pdf?alt=media&token=c2765cf3-adae-4ac4-aa55-f6df056a0bd5"
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
            <h2 className="text-2xl font-bold text-center">Education</h2>
          </div>

          <div className="flex flex-col space-y-6 ml-4 relative border-l-2 border-gray-300">
            {educationData.map((education: Educations, index: number) => (
              <div className="relative pl-6" key={index}>
                <div
                  className={`w-6 h-6 ${education.iconColor} rounded-full text-white text-xs flex items-center justify-center absolute -left-3 top-0`}
                >
                  {education.icon}
                </div>

                <p className="mt-1 font-semibold">{education.icon} {education.school}</p>
                <p className="mt-2 text-sm">
                  Degree:{" "}
                  <span className="font-semibold">{education.degree}</span>
                </p>
                <p className="mt-2 text-sm">
                  School Year:{" "}
                  <span className="font-semibold">{education.duration}</span>
                </p>
                <p className="mt-2 text-sm">
                  Course:{" "}
                  <span className="font-semibold">{education.course}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[1000px] mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center">Experience</h2>
          </div>
          <div className="flex flex-col space-y-6 ml-4 relative border-l-2 border-gray-300">
            {experienceData.map((experience: Experience, index: number) => (
              <div className="relative pl-6" key={index}>
                <div
                  className={`w-6 h-6 rounded-full ${experience.iconColor} text-white text-xs flex items-center justify-center absolute -left-3 top-0`}
                >
                  {experience.icon}
                </div>

                <p className="mt-1 font-semibold">  {experience.icon} {experience.company}</p>

                <p className="mt-2">
                  Role:{" "}
                  <span className="font-semibold">{experience.position}</span>
                </p>

                <p className="mt-2">
                  Year:{" "}
                  <span className="font-semibold">{experience.duration}</span>
                </p>

                <div className="mt-2">
                  <ul className="list-disc list-inside space-y-1">
                    {experience.description
                      .split(".")
                      .filter((item) => item.trim())
                      .map((item, idx) => (
                        <li key={idx} className="text-sm">
                          <span className="font-semibold">{item.trim()}</span>
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
