import { Outlet } from "@tanstack/react-router";
import { useGitProd } from "@_/hooks/useGitProd";
import { useDarkMode } from "@_/stores/useDarkMode";
import LoadingText from "@_/shared/Loading/index";
import "./App.css";

function App() {
  const { isLoading } = useGitProd("all", 1);
  const { isDarkMode } = useDarkMode();
  return (
    <>
      <div>
        {isLoading ? (
          <div className={`flex items-center justify-center h-screen p-4 ${isDarkMode ? "bg-black" : "bg-white"}`}>
          <LoadingText text="Please Wait Thank You ..." />
          </div>
        ) : (
          <>
            <hr />
            <Outlet />
          </>
        )}
      </div>
    </>
  );
}

export default App;
