/* eslint-disable @typescript-eslint/no-explicit-any */
import { projectData } from "../mocks/projectInfo";
import { FaEdit, FaDollarSign, FaCalendarAlt } from "react-icons/fa";

const ProjectSettings = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto  space-y-10">
      <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-10">
        Project Settings
      </h1>

      {/* Project Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800">
            {projectData.name}
          </h2>
          <p className="text-gray-600 mt-2">{projectData.description}</p>

          <div className="space-y-4 mt-6 text-gray-700">
            <div className="flex items-center">
              <FaCalendarAlt className="text-blue-500 mr-2" />
              <p>
                <strong className="font-medium">Estimated Start Date:</strong>{" "}
                {new Date(projectData.estimatedStartDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-blue-500 mr-2" />
              <p>
                <strong className="font-medium">Estimated End Date:</strong>{" "}
                {new Date(projectData.estimatedEndDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-blue-500 mr-2" />
              <p>
                <strong className="font-medium">Actual Start Date:</strong>{" "}
                {new Date(projectData.actualStartDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center">
              <FaDollarSign className="text-green-500 mr-2" />
              <p>
                <strong className="font-medium">Status:</strong>{" "}
                {
                  projectData.projectStatus[
                    projectData.projectStatus.length - 1
                  ].status
                }
              </p>
            </div>
          </div>

          <button className="mt-6 flex items-center text-blue-600 hover:text-blue-800">
            <FaEdit className="mr-2" /> Edit Project Details
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-800">
            Budget Information
          </h3>
          <div className="space-y-4 mt-4 text-gray-700">
            <div className="flex items-center">
              <FaDollarSign className="text-green-500 mr-2" />
              <p>
                <strong className="font-medium">Total Budget:</strong> $
                {projectData.totalBudget}
              </p>
            </div>
            <div className="flex items-center">
              <FaDollarSign className="text-green-500 mr-2" />
              <p>
                <strong className="font-medium">Forecasted Budget:</strong> $
                {projectData.forecastedBudget}
              </p>
            </div>
          </div>
          <button className="mt-6 flex items-center text-blue-600 hover:text-blue-800">
            <FaEdit className="mr-2" /> Edit Budget
          </button>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Team Information
        </h3>
        <div className="space-y-6">
          {/* Project Leader */}
          <div className="flex items-center space-x-6">
            <img
              src={projectData.projectLeader.avatarImage}
              alt={`${projectData.projectLeader.firstname} ${projectData.projectLeader.lastname}`}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {projectData.projectLeader.firstname}{" "}
                {projectData.projectLeader.lastname}
              </p>
              <p className="text-gray-600">
                {projectData.projectLeader.position}
              </p>
              <p className="text-gray-500">{projectData.projectLeader.email}</p>
            </div>
          </div>

          {/* Team Members */}
          <div className="mt-4">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Team Members
            </h4>
            <div className="space-y-4">
              {projectData.members.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-6 py-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all duration-200"
                >
                  <img
                    src={member.userId.avatarImage}
                    alt={`${member.userId.firstname} ${member.userId.lastname}`}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {member.userId.firstname} {member.userId.lastname}
                    </p>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="mt-6 flex items-center text-blue-600 hover:text-blue-800">
          <FaEdit className="mr-2" /> Manage Team
        </button>
      </div>

      {/* Expenditures Section */}
      <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Expenditures
        </h3>
        <div className="space-y-6">
          {/* Opex Expenditures */}
          <div>
            <h4 className="text-xl font-semibold text-gray-800">
              Opex Expenditures
            </h4>
            <div className="space-y-4">
              {projectData.opexExpenditures.map((expenditure, index) => (
                <div
                  key={index}
                  className="space-y-2 hover:bg-gray-50 p-4 rounded-lg transition duration-300"
                >
                  <p>
                    <strong className="font-medium text-gray-900">
                      Person:
                    </strong>{" "}
                    {expenditure.personName}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-900">Role:</strong>{" "}
                    {expenditure.role}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-900">
                      Estimated Amount:
                    </strong>{" "}
                    ${expenditure.estimatedAmount}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-900">
                      Actual Amount:
                    </strong>{" "}
                    ${expenditure.actualAmount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Capex Expenditures */}
          <div>
            <h4 className="text-xl font-semibold text-gray-800">
              Capex Expenditures
            </h4>
            <div className="space-y-4">
              {projectData.capexExpenditures.map((expenditure, index) => (
                <div
                  key={index}
                  className="space-y-2 hover:bg-gray-50 p-4 rounded-lg transition duration-300"
                >
                  <p>
                    <strong className="font-medium text-gray-900">
                      Description:
                    </strong>{" "}
                    {expenditure.description}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-900">Type:</strong>{" "}
                    {expenditure.type}
                  </p>

                  <p>
                    <strong className="font-medium text-gray-900">
                      Estimated Amount:
                    </strong>{" "}
                    ${expenditure.estimatedAmount}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-900">
                      Actual Amount:
                    </strong>{" "}
                    ${expenditure.actualAmount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="mt-6 flex items-center text-blue-600 hover:text-blue-800">
          <FaEdit className="mr-2" /> Manage Expenditures
        </button>
      </div>
      {/* Team Section */}
      <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Monthly Breakdown
        </h3>
        <div className="space-y-6">
          {projectData.monthlyBreakdown.map((breakdown, index) => (
            <div
              key={index}
              className="space-y-2 bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition duration-300"
            >
              <p>
                <strong className="font-medium text-gray-900">
                  {breakdown.month}:
                </strong>
              </p>
              <p>
                <strong className="font-medium text-gray-900">
                  Expenditures:
                </strong>{" "}
                ${breakdown.expenditures}
              </p>
              <p>
                <strong className="font-medium text-gray-900">Budget:</strong> $
                {breakdown.budget}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSettings;
