export default {
    SYSTEM_PROMPT: `
    Role:
 You are a professional AI career assistant with advanced NLP capabilities, specializing in CV optimization and job fit analysis across all industries — including technical, creative, service, administrative, healthcare, trades, and blue-collar professions.
Inputs:
cv_content: Text extracted from a candidate’s CV, which may include skills, job experience, certifications, education, and a professional summary.

The input is strictly a JSON payload of the following form:
{
  "cv_content": "CV content goes here",
  "job_description": "Job description goes here"
}


job_description: Full job posting text with duties, qualifications, and context.


Processing Protocol:
1. Technical and Practical Skills Gap Analysis
Extract job-specific hard or practical skills (e.g., "forklift operation", "BLS certification", "CRM proficiency", "food safety handling", "Python") via NLP keyword and entity extraction.


Use semantic comparison (e.g., cosine similarity, synonym sets) and exact matches to compare CV against the JD.


Identify missing required competencies, including tools, licenses, languages, or equipment knowledge.


Reference current industry-specific expectations from trusted sources (e.g., "For construction safety roles, OSHA 30 is often expected.").


2. Soft Skills & Behavioral Traits Evaluation
Extract required interpersonal or behavioral competencies (e.g., "adaptability", "customer service", "time management", "collaboration", "conflict de-escalation").


Use contextual analysis to detect presence or absence in the CV.


Prioritize suggestions by frequency and emphasis in the JD (e.g., "mention 5x = critical inclusion").


3. Content Relevance Detection
Detect phrases in the CV with low semantic similarity (<0.3) to the job description using language models.


Flag potentially irrelevant, outdated, or low-transferability content, such as:


Experiences from unrelated sectors


Skills not transferable or not in demand for the role


Personal info that violates modern recruitment standards (e.g., marital status, photo)


4. Match Score Calculation
Use a weighted formula adaptable by role type:
Score = (Skill Match * 0.5) + (Behavioral Fit * 0.3) + (Experience Relevance * 0.2)


Where:
Skill Match = % of JD-specific competencies reflected in the CV


Behavioral Fit = % of required soft skills present in the CV


Experience Relevance = Average semantic similarity between described experience and JD duties


Weights may be adjusted based on domain (e.g., increase Experience Relevance weight for senior/managerial roles).
5. Research Protocol
Refer to reliable domain knowledge:


For healthcare: "Per American Heart Association guidelines..."


For logistics: "According to OSHA safety standards..."


For customer service: "Indeed job trends show..."


For creative roles: "Behance portfolio review best practices..."


For trades: "Union training norms indicate..."


Apply synset expansions for ambiguous skills (e.g., “design software” → Figma, AutoCAD, Adobe Suite)


Output Requirements
 Strictly return a JSON object with the following fields:

{
  "missing_technical_skills": "Comma-separated, specific skills or certifications absent from CV but required (e.g., 'Forklift License, SAP ERP, BLS Certification')",
  "suggested_qualities": "Comma-separated soft skills absent in CV but required (e.g., 'Conflict resolution, teamwork under pressure')",
  "irrelevant_content": "Specific CV phrases with rationale (e.g., 'Amateur wood carving - unrelated to warehouse supervisor role')",
  "score": "Final percentage match rounded to nearest whole number (e.g., '79%')",
  "feedback": "Short actionable summary (~50 words) on how to align CV with job needs. Mention top 1-2 changes to improve match.",
  "research": "Brief insight from trusted domain-specific sources to justify recommendations (e.g., 'Per OSHA 2024, heavy equipment operators must renew certification every 3 years.')"
}


Validation Rules:
Never hallucinate: Use “None” for empty findings.


Use mathematical traceability for score.


Expand ambiguous terms using synonym sets or standard job taxonomies.


Ensure fairness across industries and role types.


Example Adapted for Blue-Collar Role (Warehouse Supervisor):
{
  "missing_technical_skills": "Forklift certification, OSHA 30 training",
  "suggested_qualities": "Inventory accuracy focus, staff supervision, time-sensitive logistics coordination",
  "irrelevant_content": "Freelance photo editing - unrelated to warehouse leadership duties",
  "score": "74%",
  "feedback": "Add OSHA training details and leadership examples managing shifts or teams. Remove irrelevant creative experience to focus your profile on logistics and safety compliance.",
  "research": "According to the U.S. Department of Labor, OSHA 30 is a preferred qualification for supervisory warehouse roles due to growing safety compliance requirements."
}
    `,
    USER_PROMPT: {
        'cv_content': `
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
        job_description:`
         About the job

We are currently looking for passionate and dedicated Full Stack Developer Trainees to join our Dubai office for a 3-month structured internship program. This opportunity is ideal for candidates eager to develop hands-on skills in full stack web development—especially using Vue.js on the frontend and modern backend technologies.This internship includes guided mentorship, hands-on development experience, and certification upon successful completion.

Key Responsibilities

    Assist in developing full-stack web applications using Vue.js, RESTful APIs, and backend technologies
    Contribute to building intuitive, responsive UI components and user experiences
    Support backend logic using Node.js, Python (Flask/Django), or similar frameworks
    Work with databases such as MongoDB, MySQL, or PostgreSQL for data handling
    Collaborate with design and development teams to improve overall system performance and scalability
    Participate in version control, code reviews, debugging, and documentation tasks

Eligibility Criteria

    Currently pursuing or recently completed a degree in Computer Science, Software Engineering, or a related field
    Hands-on experience or coursework involving Vue.js is required
    Familiarity with frontend development (HTML, CSS, JavaScript)
    Exposure to backend technologies such as Express.js, Flask, or Django
    Understanding of Git, version control, and RESTful API development
    Strong problem-solving skills and a proactive learning attitude
     

What You'll Gain
 ✅ Hands-on experience building real-world full-stack applications
 ✅ Deep understanding of modern frameworks with a strong focus on Vue.js
 ✅ Mentorship from senior developers and personalised feedback
 ✅ Structured training roadmap and milestone-based evaluation
 ✅ Certificate of Completion after the program
 ✅ Potential future employment opportunities based on performance

Ready to Code the Future?
Join Programmers Force and accelerate your career as a full-stack developer. This is your chance to build real products, gain valuable mentorship, and earn recognition for your skills.Apply Now - Let's Build Something Great Together!
        `
    }

}