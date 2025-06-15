# Vectrum

**Instantly optimize your resume for any job application with the power of AI.**

This tool acts as your personal career assistant, analyzing your resume against a specific job description to give you a competitive edge. It takes the guesswork out of job applications by providing concrete, data-driven feedback to help you land your dream job.

Powered by Google's state-of-the-art **Gemini** model, it goes beyond simple keyword matching to understand context, identify skill gaps, and suggest compelling improvements.

## Key Features

-   🎯 **Instant Match Score:** Get a percentage score that quantifies how well your resume aligns with the job description.
-   🧠 **Skill Gap Analysis:** Immediately see which required skills and qualifications are missing from your resume.
-   ✍️ **Smart Rewrite Suggestions:** Receive AI-generated suggestions to rephrase bullet points and better highlight your experience for the specific role.
-   🔧 **Adjustable Model:** Easily configure the tool to use different versions of the Gemini model to suit your needs.

## ⚙️ Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18.x or later recommended)
-   [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/) as your package manager.
-   A **Google Gemini API Key**. You can get one for free from [Google AI Studio](https://makersuite.google.com/app/apikey).

### 1. Clone the Repository

First, clone the project to your local machine:

```bash
git clone https://github.com/Kirubel1422/vectrum.git
cd vectrum
```

### 2. Install Dependencies

Install the necessary project dependencies using your preferred package manager:

```bash
# Using pnpm
pnpm install
```

### 3. Set Up Environment Variables

This step is crucial for the application to connect to the Google Gemini API.

1.  Create a new file named `.env` in the root of the project directory.
2.  Copy the contents of the `.env.example` file into your new `.env.local` file.
3.  Replace the necessary values from `.env`

### 4. Run the Development Server

Now you are ready to start the application!

```bash
# Using pnpm
pnpm dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application running.
