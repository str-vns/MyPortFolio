import { Outlet } from "@tanstack/react-router";
import { useGitProd, useSkills, useSoftSkill } from "@_/hooks/useGitProd";
import { useEducation, useExperience } from "@_/hooks/useOthers";
import { useDarkMode } from "@_/stores/useDarkMode";
import LoadingText from "@_/shared/Loading/index";
import "./App.css";

function App() {
  const { isDarkMode } = useDarkMode();
  const { isLoading, data: gitProd } = useGitProd("All", 1);
  const { data: Educ } = useEducation();
  const { data: Exp } = useExperience();
  const { data: skills } = useSkills();
  const { data: softSkill } = useSoftSkill();
  if (isLoading || !gitProd || !skills || !softSkill || !Educ || !Exp) {
    return (
      <div
        className={`flex items-center justify-center h-screen p-4 ${isDarkMode ? "bg-black" : "bg-white"}`}
      >
        <LoadingText text="Please Wait Thank You ..." />
      </div>
    );
  }

  return (
    <>
      <hr />
      <Outlet />
    </>
  );
}

export default App;
