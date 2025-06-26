import SidebarNav from "@_/shared/Sidebar/layout";
import Main from "@_/pages/Home/main";
import Portfolio from "@_/pages/Home/portfolio";
import Resume from "@_/pages/Home/resume";
import About from "@_/pages/Home/about";
import { useScrollSpy } from "@_/hooks/scrollSpy";
import { items } from "@_/data/sidebarItem";
import { useColorsTheme } from "@_/shared/colors";
import FadeInOnScroll from "@_/hooks/FadeInOnScroll";
const Home = () => {
  const activeId = useScrollSpy(items.map((i: { id: string }) => i.id));
  const colorTheme = useColorsTheme();
  return (
    <div
      className={` scroll-smooth overflow-hidden`}
      style={{ backgroundColor: colorTheme.LIGHTGREY }}
    >

     <SidebarNav activeId={activeId}>
      
  <section id="home" className="relative w-full h-screen overflow-hidden">
    <Main />
  </section>
  <FadeInOnScroll>
    <section id="about" className="min-h-screen scroll-mt-24">
      <About />
    </section>
  </FadeInOnScroll>

  <FadeInOnScroll>
    <section id="resume" className="min-h-screen scroll-mt-24 ">
      <Resume />
    </section>
  </FadeInOnScroll>

  <FadeInOnScroll>
    <section id="portfolio" className="min-h-screen scroll-mt-24">
      <Portfolio />
    </section>
  </FadeInOnScroll>
</SidebarNav>
    </div>
  );
};

export default Home;
