import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Cookies from "js-cookie";
import { NewProject, User } from "../config/interfaces";
import { FaCalendarAlt } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  status: "In Progress" | "Completed" | "Pending";
  date: string;
  project: NewProject;
  projectLeader: User;
  viewMode: "grid" | "line";
}

const ProjectCard = ({
  title,
  status,
  project,
  date,
  projectLeader,
}: ProjectCardProps) => {
  const getProgress = (status: string): number => {
    switch (status) {
      case "Completed":
        return 100;
      case "In Progress":
        return 50;
      case "Pending":
        return 0;
      default:
        return 0;
    }
  };

  const progress = getProgress(status);
  const statusColor = {
    Completed: "#4caf50",
    "In Progress": "#f1c40f",
    Pending: "#f44336",
  }[status];

  const handleCardClick = () => {
    Cookies.set("projectName", project.name, { expires: 1 });
  };

  return (
    <Link
      to={`/dashboard/${project.name}`}
      state={project}
      className="no-underline"
      onClick={handleCardClick}
    >
      <div className="bg-white shadow-2xl rounded-lg p-6 h-full flex flex-col relative overflow-hidden">
        <div
          style={{ width: 50, height: 50 }}
          className="absolute top-4 right-4"
        >
          <CircularProgressbar
            value={progress}
            text={`${status}`}
            styles={{
              path: { stroke: statusColor, strokeWidth: 5 },
              text: { fill: statusColor, fontSize: "13px", fontWeight: "bold" },
              trail: { stroke: "#f1f1f1" },
            }}
          />
        </div>
        <h2 className="font-semibold text-2xl text-gray-800 mb-3 transition-colors duration-300 hover:text-indigo-600">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8">
          {/* Render project leader */}
          <div className="border-t border-gray-200 pt-4">
            {projectLeader ? (
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform">
                <img
                  src={projectLeader.avatarImage}
                  alt={`${projectLeader.firstname} ${projectLeader.lastname}`}
                  className="w-14 h-14 rounded-full border-2 border-gray-300"
                />
                <div>
                  <p className="text-black/90 text-sm font-medium">
                    {projectLeader.firstname} {projectLeader.lastname}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {projectLeader.position}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-black/80 text-sm mb-2">
                No project leader assigned
              </p>
            )}
          </div>

          {/* Status */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600 text-xs mb-2">Status</p>
            <p className="text-black/80 text-sm font-semibold mb-2">{status}</p>
          </div>

          {/* Date */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600 text-xs mb-2">Date</p>
            <p className="text-black/80 text-sm mb-2 flex items-center space-x-2">
              <FaCalendarAlt className="text-gray-400" />
              <span>
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { ProjectCard };
