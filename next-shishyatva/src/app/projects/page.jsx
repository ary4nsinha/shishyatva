"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Users,
  GitBranch,
  Star,
} from "lucide-react";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [projectStats, setProjectStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects
        const projectsRes = await fetch("http://localhost:3000/projects");
        const projectsData = await projectsRes.json();
        setProjects(projectsData);

        // Fetch project statistics
        const statsRes = await fetch(
          "http://localhost:3000/projects/stats/completion"
        );
        const statsData = await statsRes.json();
        setProjectStats(statsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredProjects = projects.filter((project) => {
    switch (activeTab) {
      case "active":
        return project.project_completion < 100;
      case "completed":
        return project.project_completion === 100;
      default:
        return true;
    }
  });

  const getPriorityColor = (completion) => {
    if (completion >= 75) return "text-green-600 bg-green-100";
    if (completion >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="pl-56 pr-6 py-6 min-h-screen bg-gray-50">
      <div className="max-w-[1500px] mx-auto space-y-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0470bd] to-[#eeab7c] bg-clip-text text-transparent">
              Projects Portfolio
            </h1>
            <p className="text-gray-600 mt-2">
              Track and manage your development projects
            </p>
          </div>
          <button className="bg-gradient-to-r from-[#0470bd] to-[#eeab7c] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Create New Project
          </button>
        </header>

        <div className="flex justify-between items-center">
          <div className="flex bg-white rounded-lg shadow-sm p-1">
            {["all", "active", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#0470bd] to-[#eeab7c] text-white"
                    : "text-gray-600 hover:text-[#0470bd]"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <GitBranch className="h-4 w-4 mr-2" />
              Sort
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Star className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="border-b bg-gradient-to-r from-[#0470bd]/10 to-[#eeab7c]/10 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {project.project_name}
                    </h3>
                    <p className="mt-2 text-gray-600">
                      {project.project_domain}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                      project.project_completion
                    )}`}
                  >
                    {project.project_completion}% Complete
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  {project.project_goals.map((goal, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white rounded-full text-sm text-[#0470bd]"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="text-[#0470bd] h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">
                        {project.project_duration}
                      </p>
                      <p className="text-xs text-gray-500">Days Duration</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="text-[#eeab7c] h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">
                        {project.mentor_name || "Unassigned"}
                      </p>
                      <p className="text-xs text-gray-500">Mentor</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="text-green-500 h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">
                        {new Date(
                          project.project_goal_deadline
                        ).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">Deadline</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-500">
                      {project.project_completion}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0470bd] to-[#eeab7c]"
                      style={{ width: `${project.project_completion}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    {project.project_completion === 100 ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Completed
                      </span>
                    ) : (
                      <span>In Progress</span>
                    )}
                  </div>
                  <button className="px-4 py-2 bg-[#0470bd] text-white rounded-lg hover:bg-[#0358a1] transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
