const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mysql = require("mysql2");
const PDFDocument = require("pdfkit");
const pdfParse = require("pdf-parse");

const apiKey = "add api key here"; //update
const genAI = new GoogleGenerativeAI(apiKey);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass", //update
  database: "shishyatva",
});

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

const connectWithRetry = () => {
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err);
      console.log("Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("Successfully connected to MySQL database.");
    }
  });
};

connectWithRetry();

app.get("/mentors", (req, res) => {
  const query = `
    SELECT 
      mentor_id,
      mentor_name,
      JSON_EXTRACT(mentor_domains, '$') as mentor_domains,
      experience_years,
      rating,
      created_at,
      updated_at
    FROM mentors 
    ORDER BY mentor_name
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching mentors:", err);
      return res.status(500).json({ error: "Failed to fetch mentors" });
    }

    console.log("Raw results:", results);

    try {
      const formattedResults = results.map((mentor) => {
        console.log("Processing mentor:", mentor.mentor_name);
        console.log("Raw mentor_domains:", mentor.mentor_domains);

        const domains = mentor.mentor_domains;
        console.log("Parsed domains:", domains);

        return {
          ...mentor,
          mentor_domains:
            typeof domains === "string" ? JSON.parse(domains) : domains,
        };
      });

      res.json(formattedResults);
    } catch (error) {
      console.error("Error processing results:", error);
      res.status(500).json({
        error: "Failed to process mentor data",
        details: error.message,
      });
    }
  });
});

app.get("/mentors/:id", (req, res) => {
  const query = "SELECT * FROM mentors WHERE mentor_id = ?";

  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error("Error fetching mentor:", err);
      return res.status(500).json({ error: "Failed to fetch mentor" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    const mentor = {
      ...results[0],
      mentor_domains: JSON.parse(results[0].mentor_domains),
    };

    res.json(mentor);
  });
});

app.post("/mentors", (req, res) => {
  const { mentor_name, mentor_domains, experience_years, rating } = req.body;

  if (
    !mentor_name ||
    !mentor_domains ||
    !experience_years ||
    rating === undefined
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (rating % 0.5 !== 0 || rating < 0 || rating > 5) {
    return res
      .status(400)
      .json({ error: "Rating must be between 0 and 5 with 0.5 increments" });
  }

  const query = `
    INSERT INTO mentors (mentor_name, mentor_domains, experience_years, rating)
    VALUES (?, ?, ?, ?)
  `;

  const domains = Array.isArray(mentor_domains)
    ? JSON.stringify(mentor_domains)
    : mentor_domains;

  db.query(
    query,
    [mentor_name, domains, experience_years, rating],
    (err, result) => {
      if (err) {
        console.error("Error creating mentor:", err);
        return res.status(500).json({ error: "Failed to create mentor" });
      }

      res.status(201).json({
        mentor_id: result.insertId,
        message: "Mentor created successfully",
      });
    }
  );
});

app.put("/mentors/:id", (req, res) => {
  const { mentor_name, mentor_domains, experience_years, rating } = req.body;
  const mentorId = req.params.id;

  if (
    !mentor_name ||
    !mentor_domains ||
    !experience_years ||
    rating === undefined
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (rating % 0.5 !== 0 || rating < 0 || rating > 5) {
    return res
      .status(400)
      .json({ error: "Rating must be between 0 and 5 with 0.5 increments" });
  }

  const query = `
    UPDATE mentors 
    SET mentor_name = ?, 
        mentor_domains = ?,
        experience_years = ?,
        rating = ?
    WHERE mentor_id = ?
  `;

  const domains = Array.isArray(mentor_domains)
    ? JSON.stringify(mentor_domains)
    : mentor_domains;

  db.query(
    query,
    [mentor_name, domains, experience_years, rating, mentorId],
    (err, result) => {
      if (err) {
        console.error("Error updating mentor:", err);
        return res.status(500).json({ error: "Failed to update mentor" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Mentor not found" });
      }

      res.json({ message: "Mentor updated successfully" });
    }
  );
});

app.delete("/mentors/:id", (req, res) => {
  const query = "DELETE FROM mentors WHERE mentor_id = ?";

  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error("Error deleting mentor:", err);
      return res.status(500).json({ error: "Failed to delete mentor" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    res.json({ message: "Mentor deleted successfully" });
  });
});

app.get("/projects", (req, res) => {
  const query = `
    SELECT p.*, m.mentor_name,
           JSON_EXTRACT(p.project_goals, '$') as project_goals
    FROM projects p
    LEFT JOIN mentors m ON p.mentor_id = m.mentor_id
    ORDER BY p.project_goal_deadline
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching projects:", err);
      return res.status(500).json({ error: "Failed to fetch projects" });
    }

    try {
      const formattedResults = results.map((project) => {
        console.log("Processing project:", project.project_name);
        console.log("Raw project_goals:", project.project_goals);

        return {
          ...project,
          project_goals:
            typeof project.project_goals === "string"
              ? JSON.parse(project.project_goals)
              : project.project_goals,
        };
      });

      res.json(formattedResults);
    } catch (error) {
      console.error("Error processing projects:", error);
      res.status(500).json({
        error: "Failed to process project data",
        details: error.message,
      });
    }
  });
});

app.get("/projects/:id", (req, res) => {
  const query = `
    SELECT p.*, m.mentor_name 
    FROM projects p
    LEFT JOIN mentors m ON p.mentor_id = m.mentor_id
    WHERE p.project_id = ?
  `;

  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error("Error fetching project:", err);
      return res.status(500).json({ error: "Failed to fetch project" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    const project = {
      ...results[0],
      project_goals: JSON.parse(results[0].project_goals),
    };

    res.json(project);
  });
});

app.post("/projects", (req, res) => {
  const {
    project_name,
    project_domain,
    project_completion,
    project_goals,
    project_duration,
    project_goal_deadline,
    mentor_id,
  } = req.body;

  if (
    !project_name ||
    !project_domain ||
    project_completion === undefined ||
    !project_goals ||
    !project_duration ||
    !project_goal_deadline
  ) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  if (project_completion < 0 || project_completion > 100) {
    return res
      .status(400)
      .json({ error: "Project completion must be between 0 and 100" });
  }

  if (new Date(project_goal_deadline) <= new Date()) {
    return res
      .status(400)
      .json({ error: "Project deadline must be in the future" });
  }

  const query = `
    INSERT INTO projects (
      project_name, project_domain, project_completion, project_goals,
      project_duration, project_goal_deadline, mentor_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const goals = Array.isArray(project_goals)
    ? JSON.stringify(project_goals)
    : project_goals;

  db.query(
    query,
    [
      project_name,
      project_domain,
      project_completion,
      goals,
      project_duration,
      project_goal_deadline,
      mentor_id || null,
    ],
    (err, result) => {
      if (err) {
        console.error("Error creating project:", err);
        return res.status(500).json({ error: "Failed to create project" });
      }

      res.status(201).json({
        project_id: result.insertId,
        message: "Project created successfully",
      });
    }
  );
});

app.put("/projects/:id", (req, res) => {
  const {
    project_name,
    project_domain,
    project_completion,
    project_goals,
    project_duration,
    project_goal_deadline,
    mentor_id,
  } = req.body;

  if (
    !project_name ||
    !project_domain ||
    project_completion === undefined ||
    !project_goals ||
    !project_duration ||
    !project_goal_deadline
  ) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  if (project_completion < 0 || project_completion > 100) {
    return res
      .status(400)
      .json({ error: "Project completion must be between 0 and 100" });
  }

  if (new Date(project_goal_deadline) <= new Date()) {
    return res
      .status(400)
      .json({ error: "Project deadline must be in the future" });
  }

  const query = `
    UPDATE projects 
    SET project_name = ?,
        project_domain = ?,
        project_completion = ?,
        project_goals = ?,
        project_duration = ?,
        project_goal_deadline = ?,
        mentor_id = ?
    WHERE project_id = ?
  `;

  const goals = Array.isArray(project_goals)
    ? JSON.stringify(project_goals)
    : project_goals;

  db.query(
    query,
    [
      project_name,
      project_domain,
      project_completion,
      goals,
      project_duration,
      project_goal_deadline,
      mentor_id || null,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating project:", err);
        return res.status(500).json({ error: "Failed to update project" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.json({ message: "Project updated successfully" });
    }
  );
});

app.delete("/projects/:id", (req, res) => {
  const query = "DELETE FROM projects WHERE project_id = ?";

  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error("Error deleting project:", err);
      return res.status(500).json({ error: "Failed to delete project" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  });
});

app.get("/mentors/:id/projects", (req, res) => {
  const query = `
    SELECT p.*, m.mentor_name 
    FROM projects p
    JOIN mentors m ON p.mentor_id = m.mentor_id
    WHERE p.mentor_id = ?
    ORDER BY p.project_goal_deadline
  `;

  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error("Error fetching mentor's projects:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch mentor's projects" });
    }

    const formattedResults = results.map((project) => ({
      ...project,
      project_goals: JSON.parse(project.project_goals),
    }));

    res.json(formattedResults);
  });
});

app.get("/projects/domain/:domain", (req, res) => {
  const query = `
    SELECT p.*, m.mentor_name 
    FROM projects p
    LEFT JOIN mentors m ON p.mentor_id = m.mentor_id
    WHERE p.project_domain = ?
    ORDER BY p.project_goal_deadline
  `;

  db.query(query, [req.params.domain], (err, results) => {
    if (err) {
      console.error("Error fetching projects by domain:", err);
      return res.status(500).json({ error: "Failed to fetch projects" });
    }

    const formattedResults = results.map((project) => ({
      ...project,
      project_goals: JSON.parse(project.project_goals),
    }));

    res.json(formattedResults);
  });
});

app.get("/projects/stats/completion", (req, res) => {
  const query = `
    SELECT 
      project_domain,
      COUNT(*) as total_projects,
      ROUND(AVG(project_completion), 2) as avg_completion,
      COUNT(CASE WHEN project_completion = 100 THEN 1 END) as completed_projects
    FROM projects
    GROUP BY project_domain
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching project statistics:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch project statistics" });
    }

    res.json(results);
  });
});

const resumeReviewContext = `
You are an expert resume reviewer with years of experience in HR and technical recruitment.
Analyze the given resume and provide feedback in a structured JSON format.

Your response must be a valid JSON object with the following structure:
{
  "overall_impact": "A single paragraph summarizing the resume's effectiveness",
  "key_strengths": [
    "First strength point",
    "Second strength point",
    "Third strength point",
    "Fourth strength point"
  ],
  "areas_for_improvement": [
    "First improvement point",
    "Second improvement point",
    "Third improvement point",
    "Fourth improvement point"
  ],
  "format_and_presentation": "A single paragraph discussing the layout and organization",
  "content_quality": "A single paragraph assessing how well experiences and skills are described",
  "action_items": [
    {
      "priority": 1,
      "action": "First action item",
      "description": "Brief explanation of first action"
    },
    {
      "priority": 2,
      "action": "Second action item",
      "description": "Brief explanation of second action"
    },
    {
      "priority": 3,
      "action": "Third action item",
      "description": "Brief explanation of third action"
    }
  ]
}

Ensure your response is strictly in this JSON format with no markdown or additional formatting. Each section should be clear and concise.`;

app.post("/review-resume", async (req, res) => {
  try {
    const { pdfBase64 } = req.body;

    if (!pdfBase64) {
      return res.status(400).json({ error: "PDF data is required" });
    }

    const pdfBuffer = Buffer.from(pdfBase64, "base64");
    let pdfData;
    try {
      pdfData = await pdfParse(pdfBuffer);
    } catch (error) {
      console.error("Error parsing PDF:", error);
      return res.status(400).json({ error: "Invalid PDF format or content" });
    }

    const prompt = `${resumeReviewContext}\n\nPlease review the following resume and provide feedback in the specified JSON format:\n\n${pdfData.text}`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const review = result.response.candidates[0].content.parts[0].text;

    try {
      const parsedReview = JSON.parse(review);
      res.json({
        success: true,
        review: parsedReview,
      });
    } catch (error) {
      console.error("Error parsing Gemini response as JSON:", error);
      res.status(500).json({
        error: "Failed to parse review response",
        details: error.message,
      });
    }
  } catch (error) {
    console.error("Resume review error:", error);
    res.status(500).json({
      error: "Failed to review resume",
      details: error.message,
    });
  }
});

app.post("/generate-pdf", (req, res) => {
  const { content } = req.body;

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=document.pdf");

  doc.pipe(res);
  doc.fontSize(12).text(content);
  doc.end();
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
