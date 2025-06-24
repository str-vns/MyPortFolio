import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@_/components/ui/sidebar";
import { items } from "@_/data/sidebarItem";
import { colorsTheme } from "@_/shared/colors";

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
  const { activeId } = props;

  return (
    <div className="fixed inset-0 sm:pointer-events-auto sm:opacity-100">
      <Sidebar className="border-none w-40 ">
        <SidebarContent>
          <SidebarGroup className="h-screen flex items-center justify-center bg-transparent">
            <SidebarGroupContent className="w-full px-4 py-10">
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
         text-white w-full`}
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
      </Sidebar>
    </div>
  );
}
