import Link from "next/link";
import projects from "../../data/data";
import ProjectCard from "../../components/ProjectCard";
import ScrollUpButton from "../../components/ScrollUpButton";

function renderProjects() {
  return projects.map((project, index) =>
    project.invisible ? null : (
      <Link key={index} href={project.projectLink}>
        <ProjectCard
          name={project.projectName}
          imageSource={project.imgSrc}
          description={project.description}
        >
          {" "}
        </ProjectCard>
      </Link>
    )
  );
}

export default function Projects() {
  return (
    <div className="projects-container flex-row justify-center ">
      <div className="card-box bg-gray-100 p-10 flex flex-col gap-16">
        {renderProjects()}
      </div>
      <ScrollUpButton></ScrollUpButton>
    </div>
  );
}
