import Link from "next/link";
import projects from "../../data/data";
import ProjectCard from "../../components/ProjectCard";
import ScrollUpButton from "../../components/ScrollUpButton";

function renderProjects() {
  return projects.map((project, index) =>
    project.invisible ? (
      ""
    ) : (
      <Link key={index} href={`/projects/${project.slug}`}>
        <ProjectCard
          name={project.projectName}
          imageSource={project.imgSrc}
          description={project.description}
          className="uniform-card"
        >
        </ProjectCard>
      </Link>
    )
  );
}

export default function Projects() {
  return (
    <div className="projects-container flex-row justify-center">
      {/* Griglia per le card */}
      <div className="card-box bg-gray-100 p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {renderProjects()}
      </div>
      <ScrollUpButton></ScrollUpButton>
    </div>
  );
}
