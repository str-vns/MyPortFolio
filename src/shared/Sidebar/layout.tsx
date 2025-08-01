import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@_/components/ui/sidebar";
import { AppSidebar } from "@_/components/app-sidebar";

interface SidebarNavProps {
  activeId: string;
}

export default function SidebarNav({
  children,
  activeId,


}: { children: React.ReactNode } & SidebarNavProps) {

  return (
    
    <SidebarProvider>
      <AppSidebar activeId={activeId} />
      <SidebarInset>
        <header>
          <div className="flex items-center gap-2">
            <SidebarTrigger className={`lg:hidden md:hidden absolute left-5 top-5 z-50 `} />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
