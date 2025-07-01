import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarFooter,
} from "@_/components/ui/sidebar";
import { items } from "@_/data/sidebarItem";
import { useColorsTheme } from "@_/shared/colors";
import { Switch } from "@_/components/ui/switch";
import { PiSun, PiMoon } from "react-icons/pi";
import { useDarkMode } from "@_/stores/useDarkMode";
import { KeyValModal } from "@_/shared/Modal/index";
import { useTokenStore } from "@_/stores/useTokenStore";
import { Button } from "./ui/button";


interface AppSidebarProps {
  id: string;
  title: string;
  url: string;
  icon: React.ComponentType;
}

interface SidebarNavProps {
  activeId: string;
}

export function AppSidebar(props: SidebarNavProps) {
  const colorsTheme = useColorsTheme();
  const { activeId } = props;
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { auth } = useTokenStore();

  const handleDarkMode = (dark: boolean) => {
    toggleDarkMode(dark);
  };
 
  const removeToken = () => {
    useTokenStore.getState().setToken("");
    useTokenStore.getState().setAuthenticated(false);
  };

  return (
    <div className="inset-0">
      <Sidebar className="border-none w-40 ">
        <SidebarContent>
          <SidebarGroup className="h-screen flex items-center justify-center bg-transparent ">
            <SidebarGroupContent className="w-full px-4 py-10 ">
              <SidebarMenu>
                {items.map((item: AppSidebarProps) => {
                  const isActive = item.id === activeId;

                  return (
                    <div
                      key={item.id}
                      className={`group relative mt-5 transition-all duration-300 opacity-100 w-14 ${
                        isActive ? "w-32" : "hover:w-32"
                      }`}
                    >
                      <button
                        onClick={() => {
                          const el = document.getElementById(item.id);
                          if (el) {
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }}
                        className={`h-14 rounded-full flex items-center overflow-hidden transition-all duration-300 
         text-white w-full `}
                        style={{
                          backgroundColor: isActive
                            ? colorsTheme.SEMIBLACK
                            : colorsTheme.NAVYBLUE,
                        }}
                      >
                        <div
                          className="min-w-14 h-14 flex items-center justify-center"
                          style={{
                            color: colorsTheme.LIGHTGREY,
                          }}
                        >
                          <item.icon />
                        </div>
                        <span
                          className={`ml-2 whitespace-nowrap transition-opacity duration-300 ${
                            isActive
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          }`}
                          style={{
                            color: colorsTheme.LIGHTGREY,
                          }}
                        >
                          {item.title}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className={`flex items-center justify-center`}>
          {process.env.BUILD === "DEV" && (
            <div className="mb-3">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <p
                  className={`text-sm text-[${isDarkMode ? "#FFDEDE" : "#123458"}]`}
                >
                  DEV MODE
                </p>
              </div>
              {!auth ? (
                <KeyValModal />
              ) : (
                <Button
                  className={`bg-[${isDarkMode ? "#CF0F47" : "#123458"}] text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]
            hover:bg-[${isDarkMode ? "#FF0B55" : "#D4C9BE"}] hover:text-[${isDarkMode ? "#000000" : "#030303"}]`}
                  onClick={() => removeToken()}
                >
                  Token Remove
                </Button>
              )}
            </div>
          )}
          <div
            className={`flex items-center space-x-2 ${isDarkMode ? "bg-pink-200" : `bg-[${colorsTheme.NAVYBLUE}]`} p-4 mb-3 rounded-full h-6 w-16 `}
          >
            <Switch
              checked={isDarkMode}
              onCheckedChange={() => {
                handleDarkMode(!isDarkMode);
              }}
              className={` 
          data-[state=checked]:translate-x-5
          data-[state=unchecked]:-translate-x-2
          data-[state=checked]:transition-transform
          data-[state=unchecked]:transition-transform
          ring-1
          w-5 h-5 transition-colors duration-500  `}
              checkedIcon={<PiMoon size={14} className="text-[#FFDEDE]" />}
              uncheckedIcon={<PiSun size={14} className="text-[#123458]" />}
            />
          </div>
          {/* <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Str_Vns. All rights reserved.
          </p> */}
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
