"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const FAQPage = () => {
  const [openSections, setOpenSections] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        {
          q: "How does your mentorship program work?",
          a: "Our platform connects young professionals with experienced mentors for 1-on-1 guidance. You can browse mentor profiles, schedule sessions based on your needs, and engage in direct conversations about your career goals and challenges.",
        },
        {
          q: "How do I choose the right mentor?",
          a: "You can filter mentors by industry, expertise, and experience level. Each mentor profile includes their background, areas of expertise, and reviews from other mentees. We encourage you to book an initial session to ensure it's a good fit.",
        },
        {
          q: "What is the time commitment required?",
          a: "The time commitment is flexible and based on your needs. Most mentees schedule 45-60 minute sessions weekly or bi-weekly. You can adjust the frequency based on your goals and availability.",
        },
      ],
    },
    {
      title: "Sessions & Scheduling",
      questions: [
        {
          q: "How long is each mentoring session?",
          a: "Standard sessions are 45 minutes, with options for 30 or 60-minute sessions depending on your needs and the mentor's availability.",
        },
        {
          q: "Can I reschedule or cancel a session?",
          a: "Yes, you can reschedule or cancel sessions up to 24 hours before the scheduled time without any penalty. Last-minute cancellations may be subject to our cancellation policy.",
        },
        {
          q: "What happens during a typical session?",
          a: "Sessions are personalized based on your goals. They typically include discussion of your progress, challenges, career goals, and specific advice. Mentors may also provide resources, assignments, or action items for follow-up.",
        },
      ],
    },
    {
      title: "Payment & Pricing",
      questions: [
        {
          q: "How much does mentorship cost?",
          a: "Pricing varies by mentor, based on their experience and expertise. You can view each mentor's hourly rate on their profile. We also offer package deals for multiple sessions.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards, debit cards, and digital payment methods. Payment is processed securely through our platform.",
        },
        {
          q: "Is there a refund policy?",
          a: "Yes, we offer a satisfaction guarantee. If you're not satisfied with your first session, we'll provide a full refund or match you with a different mentor.",
        },
      ],
    },
    {
      title: "Technical & Platform",
      questions: [
        {
          q: "What technology do I need for sessions?",
          a: "You'll need a reliable internet connection and a device with a camera and microphone. Sessions are conducted through our secure video platform, accessible via web browser.",
        },
        {
          q: "Is my information kept confidential?",
          a: "Yes, we take privacy seriously. All sessions are private and confidential. We have strict data protection policies and never share your personal information without consent.",
        },
        {
          q: "What if I experience technical issues?",
          a: "Our support team is available during all scheduled sessions. If you experience technical difficulties, you can reach out through our help center or emergency support line.",
        },
      ],
    },
  ];

  const toggleSection = (categoryIndex, questionIndex) => {
    setOpenSections((prev) => {
      const key = `${categoryIndex}-${questionIndex}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const filterQuestions = () => {
    return faqCategories
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((category) => category.questions.length > 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
  
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about our mentorship platform
          </p>
        </div>

       
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

      
        <div className="space-y-8">
          {filterQuestions().map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                  >
                    <button
                      onClick={() =>
                        toggleSection(categoryIndex, questionIndex)
                      }
                      className="w-full flex justify-between items-start text-left"
                    >
                      <span className="font-medium text-gray-900">
                        {item.q}
                      </span>
                      {openSections[`${categoryIndex}-${questionIndex}`] ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {openSections[`${categoryIndex}-${questionIndex}`] && (
                      <p className="mt-2 text-gray-600">{item.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        
        <div className="mt-12 text-center bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? We're here to help!
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
