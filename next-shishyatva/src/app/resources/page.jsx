"use client";

import React, { useState } from "react";
import {
  Search,
  Book,
  Code,
  Database,
  Globe,
  Terminal,
  Server,
  Layout,
  Cloud,
  Shield,
  Brain,
  ChevronDown,
  ChevronUp,
  Bookmark,
  ExternalLink,
} from "lucide-react";

const ResourcePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState({});
  const [activeTab, setActiveTab] = useState("all");

  const resources = [
    {
      category: "Frontend Development",
      icon: Layout,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      resources: [
        {
          title: "React Documentation",
          description: "Official React documentation and tutorials",
          url: "https://react.dev",
          type: "documentation",
        },
        {
          title: "MDN Web Docs",
          description: "Comprehensive web development documentation",
          url: "https://developer.mozilla.org",
          type: "documentation",
        },
        {
          title: "Next.js Learn",
          description: "Interactive Next.js tutorials and documentation",
          url: "https://nextjs.org/learn",
          type: "tutorial",
        },
        {
          title: "Tailwind CSS",
          description: "Utility-first CSS framework documentation",
          url: "https://tailwindcss.com/docs",
          type: "documentation",
        },
      ],
    },
    {
      category: "Backend Development",
      icon: Server,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      resources: [
        {
          title: "Node.js Documentation",
          description: "Official Node.js documentation and API reference",
          url: "https://nodejs.org/docs",
          type: "documentation",
        },
        {
          title: "Express.js",
          description: "Web framework for Node.js",
          url: "https://expressjs.com",
          type: "documentation",
        },
        {
          title: "Django Documentation",
          description: "Python web framework documentation",
          url: "https://docs.djangoproject.com",
          type: "documentation",
        },
      ],
    },
    {
      category: "Database",
      icon: Database,
      color: "text-green-500",
      bgColor: "bg-green-50",
      resources: [
        {
          title: "MongoDB University",
          description: "Free MongoDB courses and certification",
          url: "https://university.mongodb.com",
          type: "learning",
        },
        {
          title: "PostgreSQL Tutorial",
          description: "Comprehensive PostgreSQL learning resources",
          url: "https://www.postgresqltutorial.com",
          type: "tutorial",
        },
      ],
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      resources: [
        {
          title: "AWS Documentation",
          description: "Amazon Web Services documentation",
          url: "https://docs.aws.amazon.com",
          type: "documentation",
        },
        {
          title: "Docker Documentation",
          description: "Docker containerization platform docs",
          url: "https://docs.docker.com",
          type: "documentation",
        },
        {
          title: "Kubernetes Documentation",
          description: "Container orchestration platform documentation",
          url: "https://kubernetes.io/docs",
          type: "documentation",
        },
      ],
    },
    {
      category: "Machine Learning",
      icon: Brain,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      resources: [
        {
          title: "TensorFlow Documentation",
          description: "Machine learning framework documentation",
          url: "https://www.tensorflow.org/docs",
          type: "documentation",
        },
        {
          title: "PyTorch Tutorials",
          description: "Deep learning framework tutorials",
          url: "https://pytorch.org/tutorials",
          type: "tutorial",
        },
      ],
    },
    {
      category: "Security",
      icon: Shield,
      color: "text-red-500",
      bgColor: "bg-red-50",
      resources: [
        {
          title: "OWASP",
          description: "Web application security resources",
          url: "https://owasp.org",
          type: "documentation",
        },
        {
          title: "Web Security Academy",
          description: "Free web security training",
          url: "https://portswigger.net/web-security",
          type: "learning",
        },
      ],
    },
  ];

  const toggleSection = (category) => {
    setExpandedSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const filterResources = () => {
    return resources
      .map((category) => ({
        ...category,
        resources: category.resources.filter(
          (resource) =>
            (activeTab === "all" || resource.type === activeTab) &&
            (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              resource.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
        ),
      }))
      .filter((category) => category.resources.length > 0);
  };

  return (
    <div className="min-h-screen pl-52 bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learning Resources
          </h1>
          <p className="text-lg text-gray-600">
            Curated documentation, tutorials, and learning materials
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {["all", "documentation", "tutorial", "learning"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filterResources().map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleSection(category.category)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${category.bgColor}`}>
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {category.category}
                  </h2>
                </div>
                {expandedSections[category.category] ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {expandedSections[category.category] && (
                <div className="px-6 pb-4">
                  <div className="grid gap-4 mt-4">
                    {category.resources.map((resource, resourceIndex) => (
                      <a
                        key={resourceIndex}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 p-4 rounded-lg border hover:border-blue-500 transition-colors"
                      >
                        <Book className={`h-5 w-5 ${category.color} mt-1`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">
                              {resource.title}
                            </h3>
                            <ExternalLink className="h-4 w-4 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {resource.description}
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          {resource.type}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Missing a Resource?
          </h2>
          <p className="text-gray-600 mb-6">
            If you know of a valuable resource that should be included, let us
            know!
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Suggest a Resource
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
