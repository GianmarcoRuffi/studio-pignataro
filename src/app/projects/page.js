import Link from "next/link";
import Image from "next/image";
import ProjectCard from "../../components/ProjectCard";

export default function Projects() {
    return (
        <div className="flex justify-center">
          <div className="presses-container flex justify-center items-center max-w-7xl">
            <div class="card-box bg-gray-100 p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-16">
              {/* container start */}
    
              <ProjectCard
                name="rivista di architettura"
                imageSource="/IMG_25.JPG"
                description="01/04/2018"
              >
                {" "}
              </ProjectCard>
    
              <ProjectCard
                name="https://www.tubesradiatori.com/it/progetti/ristrutturazione-di-un-appartamento/"
                imageSource="/tubes.jpg"
                description="2013"
              >
                {" "}
              </ProjectCard>
    
              <ProjectCard
                name="rivista di architettura"
                imageSource="/IMG_25.JPG"
                description="01/04/2018"
              >
                {" "}
              </ProjectCard>
    
    
              <ProjectCard
                name="rivista di architettura"
                imageSource="/IMG_25.JPG"
                description="01/04/2018"
              >
                {" "}
              </ProjectCard>
    
              <ProjectCard
                name="rivista di architettura"
                imageSource="/IMG_25.JPG"
                description="01/04/2018"
              >
                {" "}
              </ProjectCard>
            </div>
          </div>
        </div>
      );
}
