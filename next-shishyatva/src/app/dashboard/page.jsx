"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  BookOpen,
  Users,
  BarChart2,
  Star,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Video,
  Plus,
  X,
  GraduationCap,
  Trophy,
  MessageSquare,
  Target,
} from "lucide-react";

const mentorImages = {
  "Shrikant Swani": "/shirkanth.jfif",
  "Prathmesh Wadje": "/prathmesh.jfif",
  "Sajid Tamboli": "/sajid.jfif",
  "Cody Crazinski": "/cody.jfif",
  "Olajide Olatunji": "/olajides.jfif",
  "Chuck Wilson": "/chuck.jfif",
  "Manan Patel": "/manan.jpeg",
  "Sai Sharan Dadi": "/sharan.jpeg",
  "Garv Singh": "/garv.jpeg",
};

const MentorSessions = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("30");

  const upcomingSession = {
    date: "2024-12-05",
    time: "15:30",
    duration: "45",
    topic: "React Performance & State Management",
    mentorName: "Shrikant Swani",
  };

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleSchedule = (e) => {
    e.preventDefault();
    alert("Session scheduled successfully!");
    setShowScheduler(false);
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Session Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0470bd] to-[#eeab7c] bg-clip-text text-transparent mb-1">
              Upcoming Session
            </h2>
            <p className="text-gray-600 mb-4">
              with {upcomingSession.mentorName}
            </p>
          </div>
          <div className="bg-[#0470bd]/10 text-[#0470bd] px-4 py-1 rounded-full text-sm">
            45 minutes
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Video className="h-5 w-5 text-[#0470bd]" />
            <span className="font-medium">{upcomingSession.topic}</span>
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {new Date(upcomingSession.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {upcomingSession.time}
              </span>
            </div>
          </div>

          <button className="w-full mt-4 bg-[#0470bd] text-white py-2 rounded-lg hover:bg-[#0358a1] transition-colors">
            Join Call
          </button>
        </div>
      </div>

      <button
        onClick={() => setShowScheduler(true)}
        className="w-full bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-[#0470bd] hover:bg-[#0470bd]/5 transition-all group"
      >
        <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-[#0470bd]">
          <Plus className="h-6 w-6" />
          <span className="font-medium">Schedule New Session</span>
        </div>
      </button>

      {showScheduler && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Schedule Session</h3>
              <button
                onClick={() => setShowScheduler(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSchedule} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0470bd]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded-lg border ${
                        selectedTime === time
                          ? "bg-[#0470bd] text-white border-[#0470bd]"
                          : "hover:border-[#0470bd] hover:text-[#0470bd]"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0470bd]"
                  required
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0470bd] text-white py-3 rounded-lg hover:bg-[#0358a1] transition-colors"
              >
                Schedule Session
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardPage = () => {
  const [mentors, setMentors] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [learningPath] = useState({
    currentLevel: "Intermediate",
    progress: 65,
    nextMilestone: "Advanced JavaScript Concepts",
    completedModules: 8,
    totalModules: 12,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mentorsRes = await fetch("http://localhost:3000/mentors");
        const mentorsData = await mentorsRes.json();
        setMentors(mentorsData);

        const projectsRes = await fetch("http://localhost:3000/projects");
        const projectsData = await projectsRes.json();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Learning Progress",
      value: `${learningPath.progress}%`,
      change: `${learningPath.completedModules}/${learningPath.totalModules} modules completed`,
      icon: GraduationCap,
      color: "from-[#0470bd] to-[#0358a1]",
    },
    {
      title: "Active Projects",
      value: projects.filter((p) => p.project_completion < 100).length,
      change: "In progress",
      icon: BookOpen,
      color: "from-[#eeab7c] to-[#e59a66]",
    },
    {
      title: "Completed Milestones",
      value: learningPath.completedModules,
      change: "Keep going!",
      icon: Trophy,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Learning Hours",
      value: "24",
      change: "This month",
      icon: Clock,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === Math.floor(mentors.length / 3) ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.floor(mentors.length / 3) : prev - 1
    );
  };

  return (
    <div className="pl-56 pr-6 py-6 min-h-screen bg-gray-50">
      <div className="max-w-[1500px] mx-auto space-y-6">
        <header className="flex justify-between items-center bg-gradient-to-r p-6 rounded-2xl">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r bg-[#0470bd] flex items-center justify-center text-white text-2xl font-bold">
              US
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r bg-clip-text">
                Welcome back, User!
              </h1>
              <p className="text-gray-600">
                Let's continue your learning journey
              </p>
            </div>
          </div>
        </header>

        <MentorSessions />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  {stat.title}
                </h3>
                <div
                  className={`p-2 rounded-full bg-gradient-to-r ${stat.color} text-white`}
                >
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0470bd] to-[#eeab7c] bg-clip-text text-transparent">
                Your Learning Journey
              </h2>
              <p className="text-gray-500">
                Current Level: {learningPath.currentLevel}
              </p>
            </div>
            <button className="px-4 py-2 bg-[#0470bd] text-white rounded-lg hover:bg-[#0358a1] transition-colors">
              View Curriculum
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0470bd] to-[#eeab7c]"
                    style={{ width: `${learningPath.progress}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-semibold">
                {learningPath.progress}%
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Target className="h-4 w-4 text-[#0470bd]" />
              <span>Next Milestone: {learningPath.nextMilestone}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0470bd] to-[#eeab7c] bg-clip-text text-transparent">
                Active Projects
              </h2>
              <p className="text-gray-500">
                Track your ongoing project progress
              </p>
            </div>
            <a href="/projects">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                View All Projects
              </button>
            </a>
          </div>

          <ul className="space-y-4">
            {projects.slice(0, 3).map((project, index) => (
              <li
                key={index}
                className="p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {project.project_name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CalendarDays className="h-4 w-4" />
                      Due:{" "}
                      {new Date(
                        project.project_goal_deadline
                      ).toLocaleDateString()}
                      <span className="text-[#0470bd]">•</span>
                      {project.project_domain}
                    </div>
                  </div>
                  <span className="px-3 py-1 border rounded-full">
                    {project.project_completion}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0470bd] to-[#eeab7c]"
                    style={{ width: `${project.project_completion}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0470bd] to-[#eeab7c] bg-clip-text text-transparent">
                Featured Mentors
              </h2>
              <p className="text-gray-500">
                Explore personalized mentorship opportunities
              </p>
            </div>
          </div>

          <div className="relative px-4">
            <div className="flex gap-6">
              {mentors
                .slice(currentSlide * 3, (currentSlide + 1) * 3)
                .map((mentor, index) => (
                  <div key={index} className="flex-none w-[calc(33.333%-1rem)]">
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">
                      <div className="relative mb-6">
                        <div className="w-full h-48 rounded-lg bg-gradient-to-br from-[#0470bd]/10 to-[#eeab7c]/10 flex items-center justify-center overflow-hidden">
                          {mentorImages[mentor.mentor_name] ? (
                            <Image
                              src={mentorImages[mentor.mentor_name]}
                              alt={mentor.mentor_name}
                              width={160}
                              height={160}
                              className="rounded-full object-cover h-32 w-32"
                            />
                          ) : (
                            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-[#0470bd] to-[#eeab7c] flex items-center justify-center text-white text-2xl">
                              {mentor.mentor_name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span>{mentor.rating}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {mentor.mentor_name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {mentor.mentor_domains.join(", ")}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {mentor.mentor_domains.map((domain, i) => (
                            <span
                              key={i}
                              className="bg-[#0470bd]/10 text-[#0470bd] px-3 py-1 rounded-full text-sm"
                            >
                              {domain}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t">
                          <div className="text-sm">
                            <p className="font-semibold text-[#0470bd]">
                              {mentor.experience_years} years exp.
                            </p>
                          </div>
                          <button className="px-4 py-2 border border-[#0470bd] text-[#0470bd] rounded-lg hover:bg-[#0470bd] hover:text-white transition-colors">
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <button
              onClick={prevSlide}
              className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 z-10"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 z-10"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <a href="/projects">
            <button className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all text-left group">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Submit Project Update</h3>
                <ArrowRight className="h-5 w-5 text-[#0470bd] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Keep your mentors informed about your progress
              </p>
            </button>
          </a>
          <a href="resources">
            <button className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all text-left group">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">
                  Access Learning Resources
                </h3>
                <ArrowRight className="h-5 w-5 text-[#0470bd] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Browse tutorials, documentation, and guides
              </p>
            </button>
          </a>
          <a href="/faq">
            <button className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all text-left group">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Get Help</h3>
                <ArrowRight className="h-5 w-5 text-[#0470bd] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Connect with support or browse FAQs
              </p>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
