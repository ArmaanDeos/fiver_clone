import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedby/TrustedBy";
import Slider from "../../components/slide/Slider";
import Features from "../../components/features/Features";
import Explore from "../../components/explore/Explore";
import BusinessFeature from "../../components/features/BusinessFeature";
import Cards from "../../components/cards/Cards";
import { cards } from "../../data";
import { projects } from "../../data";
import ProjectCard from "../../components/projectCard/ProjectCard";

const Home = () => {
  const catcards = cards.map((item) => {
    return <Cards item={item} key={item.id} />;
  });

  const project = projects.map((item) => {
    return <ProjectCard item={item} key={item.id} />;
  });

  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slider catcards={catcards} catHeading="Popular Services" />
      <Features />
      <Explore />
      <BusinessFeature />
      <Slider project={project} popHeading="Popular Projects" />
    </div>
  );
};

export default Home;
