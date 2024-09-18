import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;

  return (
    <div>
      <SectionTitle title="Projects" />
      <div className='flex py-10 gap-20 sm:flex-col'>
        {/* Project Titles List */}
        <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedItemIndex(index)}
              className='cursor-pointer'>
              <h1
                className={`text-xl px-5 ${selectedItemIndex === index
                  ? 'text-tertiary border-tertiary border-l-4  -ml-[3px] bg-[#1a7f5a31] py-3 sm:w-40'
                  : 'text-white'
                }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>

        {/* Project Details */}
        <div className='flex items-center justify-center gap-10 sm:flex-col'>
          <img
            src={projects[selectedItemIndex].image}
            alt={projects[selectedItemIndex].title}
            className='h-60 w-72'
          />
          <div className='flex flex-col gap-5'>
            <h1 className='text-secondry text-xl'>
              {projects[selectedItemIndex].title}
            </h1>
            <p className='text-white'>
              {projects[selectedItemIndex].description}
            </p>
            
            {/* Display Technologies with Borders */}
            <div className='flex flex-wrap gap-2'>
              {projects[selectedItemIndex].technologies.map((tech, index) => (
                <span
                  key={index}
                  className='border border-white px-2 py-1 rounded-md text-white'
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Check if the link is valid or "Not Deployed" */}
            {projects[selectedItemIndex].link && projects[selectedItemIndex].link !== '/' ? (
              <a
                href={projects[selectedItemIndex].link}
                target="_blank"
                rel="noopener noreferrer"
                className='text-tertiary underline'
              >
                View Project
              </a>
            ) : (
              <span className='text-red-500'>Not Deployed</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
