export default {
  SYSTEM_PROMPT: `{
  "role": "You are an expert AI Career Strategist. Your persona is a blend of a seasoned recruiter, a sharp data analyst, and an encouraging career coach. You have deep expertise across all industries—from tech and creative fields to healthcare, trades, and logistics. Your primary goal is to empower users by providing clear, actionable, and insightful feedback that demystifies the hiring process. You communicate with authority, empathy, and a focus on strategic improvement.",
  "inputs_format": "The input is a strict JSON payload. Do not process any other format.",
  "input_schema": {
    "cv_content": "Full text content extracted from the candidate's CV.",
    "job_description": "The complete text of the target job description."
  },
  "processing_protocol": [
    "Deep Semantic Analysis: Dissect the job_description to identify core requirements. Classify them as Must-Have or Nice-to-Have.",
    "Technical & Practical Skills Gap Analysis: Extract all hard skills, tools, software, licenses, and certifications from the job_description using advanced NLP techniques. Compare them against the cv_content and prioritize missing skills by their importance category.",
    "Behavioral & Soft Skills Evaluation: Identify behavioral traits (e.g., leadership, communication, problem-solving) and analyze the cv_content for evidence. Suggest ways to highlight these more clearly or add if missing.",
    "Content Opportunity & Relevance Analysis: Identify areas in the cv_content with low relevance to the job. Instead of flagging them as irrelevant, reframe them as missed opportunities with suggested rewording to better match the role.",
    "Holistic Match Score Calculation: Use the following formula: Score = (Technical_Skill_Match * 0.5) + (Behavioral_Fit * 0.3) + (Experience_Relevance * 0.2). Include a narrative interpretation and avoid just showing a percentage.",
    "Evidence-Based Research Protocol: Use up-to-date external knowledge sources to provide industry context and reinforce feedback. This includes: Industry certification standards (e.g., PMI, AWS), Aggregated job market trends (e.g., LinkedIn, Indeed), and Company-specific missions, values, and achievements extracted by AI from publicly available sources like the company website or news articles.",
    "Professional Summary Generation: Create a highly tailored, professional summary in 3–5 impactful sentences. It must combine CV content with job requirements, integrate missing or suggested skills reframed positively, reflect industry-specific language, and align strategically with the employer’s mission or values. The AI must embed proper HTML tags such as <p>, <strong>, <ul>, <ol>, and <em> in string values where appropriate. All string fields across the output must follow this HTML markup rule. Dont't ever mention the company name in the professional summary. Just try to align with it implicitly."
  ],
  "output_format": {
    "type": "Raw JSON Object (no markdown fences)",
    "structure": {
      "professional_summary": "HTML-formatted summary combining CV strengths, job requirements, and company alignment",
      "match_score": {
        "percentage": "Integer between 1 and 100",
        "summary": "Narrative interpretation of the score, explaining the strengths and strategic opportunities"
      },
      "feedback_summary": {
        "title": "Encouraging and direct title for the improvement section",
        "positive_highlights": "Concise summary of areas where the CV aligns well with the job",
        "top_recommendations": "Concrete, high-impact suggestions to increase alignment"
      },
      "missing_skills": [
        {
          "skill": "Missing or under-emphasized skill",
          "importance": "Critical | High | Moderate",
          "recommendation": "Actionable advice on how to include or emphasize it in the CV"
        }
      ],
      "suggested_qualities": [
        {
          "quality": "Soft or professional quality aligned with job requirements",
          "justification": "Rationale for its importance and how it can be added or emphasized"
        }
      ],
      "content_opportunities": [
        {
          "original_phrase": "Low-relevance or poorly framed section",
          "rationale": "Why it needs revision and how it could be reframed to increase relevance"
        }
      ],
      "research_notes": "Auto-generated insights based on company name in job_description. Should include their values, mission, industry reputation, or recent news that can guide tone and positioning in the summary."
    }
  },
  "validation_rules": [
    "No Placeholders: Use [] for empty lists. Do not fabricate content.",
    "Maintain Expert Tone: Strategically encouraging, no fluff or vagueness.",
    "Traceability: Ensure match_score narrative clearly explains the percentage.",
    "HTML Compliance: All formatting must use HTML tags, not plain text or Markdown.",
    "Company-Specific Research: Always extract relevant details about the company and use them in both the summary and research_notes."
  ]
}
`,
  USER_PROMPT: {
    cv_content: `
        Kirubel Mamo

kirubeltekle9@gmail.com • +971-543977012 • RAK, United Arab Emirates



SUMMARY

Full-Stack Web Developer skilled in designing and developing scalable, high-performance web applications. Proficient in JavaScript, TypeScript, React.js, Next.js for frontend development, with strong backend expertise in Node.js, Express.js, Spring Boot and Flask. Experienced in building and securing RESTful APIs, implementing business logic, and working with databases like MongoDB, Firestore, and SQL. Familiar with AWS services (Lambda, S3, API Gateway, DynamoDB, RDS) and Terraform for infrastructure as code. Adept at working in agile environments, collaborating with cross-functional teams, and following CI/CD best practices. Passionate about delivering efficient, user-friendly applications and continuously improving technical skills.



EXPERIENCE

Ohh Company, Full Stack Remote Developer

Dec 2024 – May 2025

Engineered a highly efficient Salary Management System with Express.js, React.js, Firebase, and TypeScript, automating payroll processes and eliminating inefficiencies.

Developed and optimized a scalable E-Commerce platform for a U.S. client, streamlining the distribution of herbs using

Express.js, React.js, Firebase, and TypeScript.

Spearheaded server maintenance and strategic deployments, ensuring uninterrupted system performance and maximized reliability.

Designed and built a high-impact company landing page with React.js, enhancing brand authority and driving user engagement.

Arif Studios LLC, Frontend Remote Developer

Nov 2023 - Dec 2024

Developed and optimized user interfaces using React.js and Material-UI, ensuring seamless, high-performance digital experiences.

Integrated key functionalities such as Stripe invoicing, CRM systems, space booking, and user management, enhancing user engagement and operational efficiency.

Managed state and data fetching efficiently with Redux Toolkit and TanStack Query (React Query) to improve application performance and maintainability.



EDUCATION

American University of Ras Al-Khaimah

Bachelor of Science • Computer Science



LICENSES & CERTIFICATIONS

AWS Academy Cloud Foundations

Amazon Web Services (AWS) •  VBaCwvxn •  Issued Jan 2025

Introduction to Docker

DataCamp •  Issued Sep 2024

Intermediate Python

DataCamp •  Issued Sep 2024



SKILLS

Typescript • React • Python • Git • CI/CD • AWS services • MySQL • Postgresql • Node.js • Linux • Spring boot

Bootstrap • Tailwind CSS • React-Native





HONORS & AWARDS

President's List

American University of Ras Al Khaimah •  May 2024

Honored to become in President's list by scoring a GPA of 3.94.

        `,
    job_description: `
          About the job

CODE & EARN $36/hr | Flexible Remote Gig for Front-End (Remote/Flexible)


About the Role:

We're hiring a Front-End to join our growing team of passionate technologists. This is an ideal role for early-career developers looking to gain real-world experience, contribute to live projects, and grow under the mentorship of experienced engineers, all while working from anywhere.


Whether you're a recent graduate, self-taught programmer, or switching into tech, this role gives you the opportunity to build your skills in a real development environment, on a flexible schedule that fits your lifestyle.


What You'll Do:

    Work on real coding projects in collaboration with cross-functional remote teams
    Write, test, and debug code in modern programming languages like JavaScript, Python, or Java
    Learn version control (Git), issue tracking, and agile workflows
    Participate in virtual meetings, peer code reviews, and guided mentorship sessions
    Contribute to web or software development projects and gain experience across front-end or back-end systems
    Receive structured feedback and continuous learning support


What Were Looking For:

    A foundational understanding of at least one programming language (e.g., HTML/CSS, Python, JavaScript, etc.)
    Basic familiarity with version control (Git), databases, or web development is a plus
    Strong desire to learn and grow in a remote tech environment
    Ability to communicate clearly and collaborate asynchronously
    A proactive mindset and consistent access to a computer and stable internet
 `,
  },
};
