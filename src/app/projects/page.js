import Link from "next/link";
import Image from "next/image";
import projects from "../../data/data";
import ProjectCard from "../../components/ProjectCard";

function renderProjects() {
  return projects.map((project, index) => (
    <Link key={index} href={project.projectLink}>
      <ProjectCard
        name={project.projectName}
        imageSource={project.imgSrc}
        description={project.description}
      >
        {" "}
      </ProjectCard>
    </Link>
  ));
}

export default function Projects() {
  return (
    
      <div className="projects-container flex-row justify-center ">
        <div className="card-box bg-gray-100 p-10 flex flex-col md:gap-16 gap-16">
          {renderProjects()}
        </div>
      </div>
    
  );
}
