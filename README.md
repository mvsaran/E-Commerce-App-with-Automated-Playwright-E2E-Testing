# E-Commerce App with Automated Playwright E2E Testing

A modern, production-ready React E-Commerce application with a robust, Dockerized CI/CD pipeline powered by **GitHub Actions** and **Playwright**.

![CI Status](https://img.shields.io/badge/build-passing-brightgreen)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![Playwright](https://img.shields.io/badge/Playwright-1.61.1-red)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)

## 🌟 Features

- **Frontend Application**:
  - Built with React, TypeScript, and Vite.
  - Fully responsive, modern UI with Dark Mode support (via Context API).
  - Integrates with the FakeStoreAPI for fetching products.
  - Complete E-Commerce flow: Product Listing, Cart Management, and Simulated Checkout.
- **End-to-End Testing (E2E)**:
  - Automated testing using Microsoft Playwright.
  - Follows the **Page Object Model (POM)** pattern for maintainability.
  - Custom Fixtures for clean, readable test cases.
  - API mocking capabilities to ensure fast, deterministic tests.
- **DevOps & CI/CD**:
  - Fully Dockerized setup (`docker-compose` launches both the app and the test runner).
  - Automated GitHub Actions pipeline triggered on `push` and `pull_request`.
  - Automatic retention of Playwright HTML reports and failure traces as build artifacts.

---

## 📂 Project Structure

```text
├── .github/workflows/e2e.yml   # GitHub Actions CI/CD Pipeline
├── e2e-tests/                  # Playwright Automated Testing Framework
│   ├── fixtures/               # Playwright custom test fixtures
│   ├── pages/                  # Page Object Models (POMs)
│   ├── tests/                  # E2E Spec files (login, cart, checkout)
│   └── utils/                  # Mock utilities for deterministic testing
├── src/                        # React Application Source Code
│   ├── components/             # Reusable UI components
│   ├── context/                # Global React State (Auth, Cart)
│   ├── pages/                  # Main views (Login, Products, Cart, Checkout)
│   └── App.tsx                 # Routing configuration
├── Dockerfile                  # Builds the React app and serves it via Vite
├── Dockerfile.e2e              # Builds the Playwright test runner
├── docker-compose.yml          # Orchestrates the App and Playwright containers
└── playwright.config.ts        # Playwright framework configuration
```

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or v20+)
- [Git](https://git-scm.com/)
- [Docker & Docker Compose](https://www.docker.com/) (Optional, for containerized testing)

---

## 🚀 Getting Started (Local Development)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:5173`.*

---

## 🧪 Running Tests (Playwright)

We use Playwright to ensure the application works flawlessly from a user's perspective.

- **Run all tests headlessly (in the background):**
  ```bash
  npm run test:e2e
  ```

- **Run tests with the interactive UI (Great for debugging):**
  ```bash
  npm run test:e2e:ui
  ```

- **View the HTML test report:**
  ```bash
  npm run test:e2e:report
  ```

---

## 🐳 Dockerized Environment (Including Ollama)

To perfectly simulate the CI/CD environment locally and provide local AI capabilities, you can run the application, the testing suite, and an Ollama AI server inside Docker containers.

1. **Run the orchestrated containers:**
   ```bash
   docker-compose up --build
   ```
   *This command spins up:*
   - *The Vite production preview server (`app`)*
   - *The local LLM server (`ollama` on port `11434`)*
   - *The Playwright test container (`playwright`), which executes tests and shuts down.*

2. **Using the Local AI (Ollama):**
   Once the containers are running, you can pull and interact with AI models directly on your machine! For example, to run the lightweight `phi3` model:
   ```bash
   docker exec -it <project-name>-ollama-1 ollama run phi3
   ```
   *Note: Models are saved to a persistent Docker volume, so you only have to download them once.*

3. **View the Test Results:**
   Because we map a local volume, any test reports generated inside the container are automatically synced to your host machine. Simply run:
   ```bash
   npx playwright show-report
   ```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

This project features a fully automated CI/CD pipeline defined in `.github/workflows/e2e.yml`. 

### How GitHub Actions is Integrated
GitHub Actions is natively integrated into this project via the `.github/workflows` directory. When you push this code to a repository hosted on GitHub, GitHub's servers automatically detect the `e2e.yml` file. This file acts as an instruction manual, telling GitHub's free cloud computers exactly how to build and test your code without you needing to manually set up external CI servers like Jenkins.

### Step-by-Step Guide: Triggering the Pipeline

Here is the exact sequence of commands to get your code onto GitHub and trigger your automated testing pipeline.

**Step 1: Initialize Git & Link to GitHub**
*(If you haven't already, turn this folder into a Git repository and link it to an empty repository on your GitHub account)*
```bash
git init
git add .
git commit -m "Initial commit: React App + Playwright + Docker + Ollama"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Step 2: Push Your Code**
Whenever you push code to the `main` branch, the pipeline automatically triggers.
```bash
git push -u origin main
```

**Step 3: Watch the Action Live**
1. Open your web browser and navigate to your GitHub repository.
2. Click on the **"Actions"** tab at the top of the page.
3. You will see a workflow running named **"E2E Tests"**. Click on it to watch the logs populate in real-time!

### What GitHub Actions Does Behind the Scenes
Once triggered, the cloud computer executes the following sequence autonomously:
1. **Spin Up**: Provisions a fresh Ubuntu server.
2. **Checkout & Install**: Downloads your code and runs `npm ci` to install dependencies.
3. **Build**: Converts the React code into an optimized production bundle (`npm run build`).
4. **App Launch**: Starts the application container in the background.
5. **Test Attack**: Launches the Playwright test container to execute the E2E tests against the running app.
6. **Artifact Upload**: If a test fails, GitHub Actions zips the visual traces and HTML report, permanently attaching it to the workflow summary page for you to download and debug.
