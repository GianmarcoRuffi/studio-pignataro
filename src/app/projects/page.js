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
    <div className="flex justify-center">
      <div className="presses-container flex justify-center items-center">
        <div className="card-box bg-gray-100 p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-16">
          {renderProjects()}
        </div>
      </div>
    </div>
  );
}
