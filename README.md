# 🛒 E-Commerce App with Automated Testing

A modern shopping web app built with React — complete with automated tests that run every time you make a change to the code. Think of it as a robot QA tester that never sleeps.

![CI Status](https://img.shields.io/badge/build-passing-brightgreen)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![Playwright](https://img.shields.io/badge/Playwright-1.61.1-red)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)

---

## 🌟 What Does This Project Do?

This project has three main parts working together:

### 1. 🖥️ The Shopping App (Frontend)
The actual website users interact with. It was built using **React** (a popular JavaScript framework for building UIs) and **TypeScript** (a stricter, more reliable version of JavaScript).

- Pulls real product data from a free test API called [FakeStoreAPI](https://fakestoreapi.com/)
- Lets users browse products, add them to a cart, and simulate a checkout
- Supports **Dark Mode** — the whole site switches between light and dark themes
- Works well on both desktop and mobile screens

### 2. 🤖 The Automated Tests (Playwright)
Instead of a human manually clicking through the app to check if everything works, **Playwright** does it automatically. It opens a real browser, clicks buttons, fills in forms, and checks that the right things happen — just like a human tester would, but faster and 24/7.

- Tests are written in a clean, organized way using a pattern called **Page Object Model (POM)** — this just means each page of the app has its own "blueprint" file describing how to interact with it, keeping things tidy and easy to update
- Uses **API mocking** — instead of waiting for real data from the internet during tests, it uses pre-made fake data so tests are fast and always give the same result

### 3. ⚙️ The Automation Pipeline (GitHub Actions + Docker)
Every time code is pushed to GitHub, a cloud computer automatically:
1. Downloads the code
2. Builds the app
3. Runs all the tests
4. Saves a report so you can see exactly what passed or failed

**Docker** is used to package everything (the app + the tests) into neat, isolated containers — like shipping containers for software. This ensures the tests run the same way everywhere, whether on your laptop or a cloud server.

---

## 📂 Project Structure (What's in Each Folder)

```text
├── .github/workflows/e2e.yml   # The automation "instruction manual" for GitHub's cloud computers
├── e2e-tests/                  # Everything related to automated testing
│   ├── fixtures/               # Shared setup code used across multiple tests
│   ├── pages/                  # Blueprints describing how to interact with each page
│   ├── tests/                  # The actual test scenarios (login, cart, checkout)
│   └── utils/                  # Helpers for using fake data in tests
├── src/                        # The shopping app's source code
│   ├── components/             # Small, reusable pieces of the UI (buttons, cards, etc.)
│   ├── context/                # Shared app state (who's logged in, what's in the cart)
│   ├── pages/                  # Full page views (Login, Products, Cart, Checkout)
│   └── App.tsx                 # The map that connects all pages together
├── Dockerfile                  # Recipe for building and running the shopping app in a container
├── Dockerfile.e2e              # Recipe for building and running the test suite in a container
├── docker-compose.yml          # The conductor — starts all containers in the right order
└── playwright.config.ts        # Settings for the Playwright test framework
```

---

## 🛠️ What You Need Before Starting

Make sure these tools are installed on your computer:

| Tool | Why You Need It | Download |
|------|-----------------|----------|
| **Node.js** (v18 or v20+) | Runs JavaScript on your computer, needed for the app and tests | [nodejs.org](https://nodejs.org/) |
| **Git** | Tracks code changes and connects to GitHub | [git-scm.com](https://git-scm.com/) |
| **Docker** *(optional)* | Runs the app and tests inside containers, exactly like in the cloud | [docker.com](https://www.docker.com/) |

> **Not sure if you have these?** Open your terminal and type `node -v`, `git --version`, or `docker --version`. If you see a version number, you're good!

---

## 🚀 Running the App Locally

Follow these steps to get the shopping app running on your own computer:

**Step 1 — Download the project**
```bash
git clone <repository-url>
cd ecommerce-project
```

**Step 2 — Install the required packages**
```bash
npm install
```
> This downloads all the libraries the app depends on. It's like installing apps on a phone before you can use them.

**Step 3 — Start the app**
```bash
npm run dev
```

Once running, open your browser and go to **http://localhost:5173** to see the app. 🎉

---

## 🧪 Running the Automated Tests

Use these commands to run the Playwright tests on your machine:

| Command | What It Does |
|---------|--------------|
| `npm run test:e2e` | Runs all tests silently in the background (fastest) |
| `npm run test:e2e:ui` | Opens an interactive window so you can watch tests run step-by-step (great for debugging) |
| `npm run test:e2e:report` | Opens the visual test report in your browser showing what passed/failed |

> **Tip:** If a test fails, use the UI mode (`test:e2e:ui`) to watch exactly where it goes wrong — it's like slow-motion replay for your app.

---

## 🐳 Running Everything in Docker (Simulating the Cloud)

Docker lets you run the app, the tests, and even a local AI assistant all together in isolated containers — the same way it runs in the cloud. This is useful for making sure your code works in a clean environment, not just on your own machine.

**Step 1 — Start all containers**
```bash
docker-compose up --build
```

This single command spins up three things:
- **The App** — the shopping website, running in production mode
- **The Tests** — Playwright runs all tests against the live app, then shuts down
- **Ollama** — a local AI model server (see below), available on port `11434`

**Step 2 — (Optional) Use the Local AI**

This project includes [Ollama](https://ollama.com/), which lets you run AI language models directly on your machine — no internet or API key required. Once the containers are running, you can load a model like this:

```bash
docker exec -it <project-name>-ollama-1 ollama run phi3
```

> Models are stored in a persistent volume, so you only need to download them once. After that, they're ready instantly.

**Step 3 — View the Test Results**

Test reports are automatically saved to your computer while the tests run inside Docker. View them with:
```bash
npx playwright show-report
```

---

## 🔄 Automated CI/CD Pipeline (Tests in the Cloud)

**CI/CD** stands for *Continuous Integration / Continuous Deployment*. In plain English: every time you push code to GitHub, a cloud computer automatically runs your tests. You don't have to do anything — it just happens.

### How It Works

The file `.github/workflows/e2e.yml` is the instruction manual. When GitHub sees this file, it knows exactly what to do when new code arrives.

### Step-by-Step: Getting Your Code on GitHub

**Step 1 — Set up Git for the first time**
```bash
git init
git add .
git commit -m "Initial commit: React App + Playwright + Docker + Ollama"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```
> Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and the name of your new repo.

**Step 2 — Push your code to GitHub**
```bash
git push -u origin main
```
> This uploads your code. The moment it arrives on GitHub, the automated pipeline starts.

**Step 3 — Watch it in action**
1. Go to your GitHub repository in a browser
2. Click the **"Actions"** tab
3. You'll see a workflow called **"E2E Tests"** — click it to watch the logs run in real time

### What Happens Behind the Scenes

Once triggered, here's what the cloud computer does automatically, in order:

```
1. 🖥️  Spin Up     → A fresh Ubuntu (Linux) computer is created in the cloud
2. 📥  Download    → Your code is downloaded onto it
3. 📦  Install     → npm ci installs all dependencies
4. 🏗️  Build       → React code is compiled into a production-ready bundle
5. 🚀  Launch      → The app is started in a Docker container
6. 🧪  Test        → Playwright runs all E2E tests against the live app
7. 📊  Save Report → If any test fails, screenshots, traces, and the HTML report
                     are saved to the workflow page so you can download and debug them
```

> **No test infrastructure to maintain.** GitHub provides the servers, environment, and storage for free on public repositories.

---

## 💡 Quick Glossary

| Term | Plain English Explanation |
|------|--------------------------|
| **React** | A JavaScript tool for building web UIs out of reusable components |
| **TypeScript** | JavaScript with extra rules to catch bugs before the code runs |
| **Vite** | A super-fast tool that builds and serves the React app |
| **Playwright** | A tool that controls a real browser automatically to test your app |
| **Page Object Model (POM)** | An organized way to write tests — each page has its own file |
| **Docker** | Packages software into containers so it runs the same everywhere |
| **Docker Compose** | Starts and connects multiple Docker containers at once |
| **GitHub Actions** | GitHub's built-in automation — runs your tests in the cloud on every push |
| **CI/CD** | Automatically building and testing code every time changes are made |
| **Ollama** | A tool that runs AI language models locally on your own computer |
| **API Mocking** | Using fake pre-made data during tests instead of calling real internet services |
