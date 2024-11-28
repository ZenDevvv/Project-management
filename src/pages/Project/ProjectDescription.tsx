import React from "react";
import { Project } from "../../types/common";

const ProjectDescription: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4">
    <h2 className="font-semibold text-lg">Description</h2>
    <p>{project.description}</p>
    <h2 className="font-semibold text-lg mt-4">Tags</h2>
    <Tags tags={project.tags} />
  </div>
);

const Tags: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div className="mt-2">
    {tags.map((tag, index) => (
      <span
        key={index}
        className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
      >
        {tag}
      </span>
    ))}
  </div>
);

export { ProjectDescription };
