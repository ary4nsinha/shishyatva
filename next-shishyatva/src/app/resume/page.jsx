"use client";
import React, { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

const ResumePage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [feedback, setFeedback] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile?.type !== "application/pdf") {
      setStatus({ type: "error", message: "Please upload a PDF file" });
      return;
    }
    setFile(uploadedFile);
    setStatus({ type: "success", message: "File uploaded successfully" });
    setFeedback(null); // Clear previous feedback
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Remove data URL prefix
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const base64File = await convertToBase64(file);

      const response = await fetch("http://localhost:3000/review-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pdfBase64: base64File }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: "Resume analyzed successfully" });
        setFeedback(data.review);
      } else {
        throw new Error(data.error || "Failed to analyze resume");
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Error processing file",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pl-56 pr-6 py-6 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#0470bd] to-[#eeab7c] bg-clip-text text-transparent mb-2">
            AI Resume Reviewer
          </h1>
          <p className="text-gray-600">
            Upload your resume for instant AI-powered feedback and suggestions
          </p>

         
          <div className="mt-8 border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-[#0470bd]/50 transition-colors">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="cursor-pointer flex flex-col items-center space-y-4"
            >
              <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center">
                {file ? (
                  <FileText className="h-8 w-8 text-[#0470bd]" />
                ) : (
                  <Upload className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {file
                    ? file.name
                    : "Drop your resume here or click to upload"}
                </p>
                <p className="text-xs text-gray-500">
                  PDF files only, max 10MB
                </p>
              </div>
            </label>
          </div>

         
          {status.message && (
            <div
              className={`mt-4 p-4 rounded-lg flex items-start space-x-2 ${
                status.type === "error"
                  ? "bg-red-50 text-red-900"
                  : "bg-green-50 text-green-900"
              }`}
            >
              {status.type === "error" ? (
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              )}
              <div>
                <h3 className="font-medium">
                  {status.type === "error" ? "Error" : "Success"}
                </h3>
                <p className="text-sm">{status.message}</p>
              </div>
            </div>
          )}

         
          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className={`mt-6 w-full py-3 rounded-lg font-medium transition-all
              ${
                !file || loading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#0470bd] to-[#eeab7c] text-white hover:opacity-90"
              }`}
          >
            {loading ? "Analyzing Resume..." : "Analyze Resume"}
          </button>
        </div>


        {feedback && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-[#0470bd] mb-6">
              Resume Analysis
            </h2>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-gray-700 font-sans">
                {feedback}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePage;
