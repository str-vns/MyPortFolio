import SidebarNav from "@_/shared/Sidebar/layout";
import Main from "@_/pages/Home/main";
import Portfolio from "@_/pages/Home/portfolio";
import Resume from "@_/pages/Home/resume";
import About from "@_/pages/Home/about";
import { useScrollSpy } from "@_/hooks/scrollSpy";
import { items } from "@_/data/sidebarItem";
import { colorsTheme } from "@_/shared/colors";
const Home = () => {
  const activeId = useScrollSpy(items.map((i: { id: string }) => i.id));

  return (
    <div
      className={` scroll-smooth overflow-hidden`}
      style={{ backgroundColor: colorsTheme.LIGHTGREY }}
    >
      <SidebarNav activeId={activeId}>
        <section id="home" className="relative w-full h-screen overflow-hidden">
          <Main />
        </section>
        <div className="">
          <section id="about" className="min-h-screen scroll-mt-24">
            <About />
          </section>
          <section id="resume" className="min-h-screen scroll-mt-24">
            <Resume />
          </section>
          <section id="portfolio" className="min-h-screen scroll-mt-24">
            <Portfolio />
          </section>
        </div>
      </SidebarNav>
    </div>
  );
};

export default Home;
