<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:06b6d4&height=220&section=header&text=RoboLearn&fontSize=70&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Future-Ready%20Robotics%20%26%20STEM%20Education%20Platform&descAlignY=55&descSize=18" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=06B6D4&center=true&vCenter=true&width=700&lines=Robotics+%2B+AI+%2B+IoT+%2B+Coding+for+Schools;MERN+Stack+%7C+Role-Based+Dashboards+%7C+AI+Consultant;Built+by+Akshat+Srivastava" alt="Typing SVG" />

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-robo--learn--ten.vercel.app-06B6D4?style=for-the-badge)](https://robo-learn-ten.vercel.app/)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/221352989-518609ab-b4d1-459e-929f-a08cd2bd9b3c.gif" width="450" alt="robot animation"/>
</p>

<p align="center">
A modern, interactive, and scalable <b>Robotics &amp; STEM Education ecosystem</b> for schools, students, and teachers — combining lab setup, curriculum, an AI consultant, dashboards, competitions, and certificate verification into one connected platform.
</p>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Core Features](#-core-features)
- [System Design](#-system-design)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Roles & Access](#-roles--access)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## 🌟 Overview

**RoboLearn** turns traditional classrooms into future-ready STEM labs. It bundles together everything a school needs to run a Robotics/AI/IoT program — from an **AI-powered consultant** that answers curriculum and lab-setup questions, to **role-based dashboards** for Admins, Schools, Teachers, and Students, to a **certificate verification system**, **support ticketing**, and a **student innovation showcase**.

It's built as a single full-stack MERN application with a clean, futuristic **dark navy / electric blue / cyan** design language.

## 🔗 Live Demo

👉 **[robo-learn-ten.vercel.app](https://robo-learn-ten.vercel.app/)**

---

## ✨ Core Features

| Module | What it does |
|---|---|
| 🏠 **Interactive Homepage** | Hero section, why-robotics, services overview, lab setup process, trust stats, consultation CTA |
| 🧠 **AI Robotics Consultant** | Chat-style assistant that answers lab, curriculum, and kit-recommendation questions |
| 🏗️ **Smart Lab Planner** | Takes student count, grade level, budget & goals → suggests a lab configuration |
| 📚 **Curriculum Explorer** | Grade → Subject → Level → Module → Project → Skills learning flow (Grade 3–12) |
| 🎓 **Student & Teacher Training** | Structured, project-based training tracks (Arduino, IoT, AI, PCB, embedded systems) |
| 🤖 **Products Catalog** | Robotics kits, sensors, controllers, dev boards, electronics components |
| 🚀 **Student Innovation Showcase** | Students publish projects with problem statement, components, demo video |
| 🏆 **Competition Hub** | Monthly challenges, submissions, leaderboards, winner showcase |
| 🏫 **School Dashboard** | Training progress, curriculum progress, certificates, support tickets, analytics |
| 🎓 **Digital Certificates** | Unique ID + QR-code based public certificate verification |
| 🎫 **Support Portal** | Ticketing system with priority, categories, file uploads, status tracking |
| 🔐 **Role-Based Auth** | JWT-secured Admin / School / Teacher / Student roles with protected routes |

> Some modules above represent the platform's full product vision — see [Roadmap](#-roadmap) for what's shipped vs. planned.

---

## 🧩 System Design

### High-Level Architecture

```mermaid
flowchart TD
    A["Client - React + Vite<br/>Tailwind CSS UI"] -->|HTTPS / REST API| B["Express.js Server"]
    B --> C["JWT Auth Middleware"]
    C --> D["Route Controllers"]
    D --> E[("MongoDB Atlas")]
    D --> F["AI Consultant Service<br/>(LLM API)"]
    D --> G["Certificate / QR Service"]
    B --> H["Cloud Storage<br/>(images, uploads)"]
    A -->|Deployed on| I["Vercel"]
    B -->|Deployed on| J["Render / Railway"]
```

### Request Lifecycle

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as React Frontend
    participant API as Express API
    participant Auth as JWT Middleware
    participant DB as MongoDB

    U->>F: Interacts (login, form, dashboard)
    F->>API: REST request + JWT token
    API->>Auth: Verify token & role
    Auth-->>API: Authorized
    API->>DB: Query / Mutate data
    DB-->>API: Result
    API-->>F: JSON response
    F-->>U: Render updated UI
```

### Role-Based Access Model

```mermaid
flowchart LR
    Admin["👑 Admin"] --> M1["Manage Schools, Users, Curriculum,<br/>Certificates, Competitions, Content"]
    School["🏫 School"] --> M2["Dashboard, Training Progress,<br/>Certificates, Support Tickets"]
    Teacher["👨‍🏫 Teacher"] --> M3["Training Resources,<br/>Student Progress"]
    Student["🎓 Student"] --> M4["Curriculum, Challenges,<br/>Project Submission, Certificates"]
```

**Design principles:**
- **Separation of concerns** — frontend (React/Vite) is fully decoupled from the backend (Express REST API).
- **Stateless auth** — JWT tokens carry role claims; every protected route is guarded by middleware, not client-side checks alone.
- **Single source of truth** — MongoDB stores users, schools, curriculum, certificates, and tickets as normalized collections.
- **Extensibility** — the AI consultant and certificate/QR system are built as independent services so they can be swapped or scaled separately from the core API.

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Frontend** | React, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Auth** | JWT, bcrypt password hashing |
| **AI Layer** | LLM-based consultant integration |
| **Deployment** | Vercel (frontend), Render/Railway (backend) |
| **Design Theme** | Dark Navy · Electric Blue · Cyan Accents |

</div>

---

## 📁 Folder Structure

```
robolearn/
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/        # Navbar, Sidebar, Cards, Widgets
│   │   ├── pages/              # Home, Dashboard, Curriculum, Products, etc.
│   │   ├── context/            # Auth & global state
│   │   ├── services/           # API calls (axios)
│   │   └── assets/
│   └── vite.config.js
│
├── server/                    # Node + Express backend
│   ├── models/                 # User, School, Curriculum, Certificate, Ticket
│   ├── routes/                 # REST endpoints per module
│   ├── controllers/            # Business logic
│   ├── middleware/             # JWT auth, role guard, error handler
│   └── server.js
│
└── README.md
```

---

## 🔐 Roles & Access

| Role | Access |
|---|---|
| 👑 **Admin** | Full control — schools, users, products, curriculum, competitions, certificates, tickets, analytics |
| 🏫 **School** | School dashboard, training & curriculum progress, certificates, support tickets |
| 👨‍🏫 **Teacher** | Training resources, curriculum tracking, student activity |
| 🎓 **Student** | Curriculum access, competitions, project submission, certificates |

---

## ⚙️ Getting Started

```bash
# Clone the repository
git clone https://github.com/Akshatsrii/robolearn.git
cd robolearn

# Install frontend
cd client
npm install
npm run dev

# Install backend (in a new terminal)
cd ../server
npm install
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_provider_key
```

---

## 🚀 Roadmap

- [ ] Real-time notifications (Socket.IO)
- [ ] Mobile application
- [ ] AI-based personalized learning recommendations
- [ ] Gamification & achievement badges
- [ ] National robotics leaderboard
- [ ] Parent dashboard
- [ ] Multilingual support

---

## 🎯 Mission

To make Robotics, AI, IoT, Coding, and Electronics accessible to students through practical, project-based education — and give schools the tools to run a modern STEM program end-to-end.

---

## 👤 Author

**Akshat Srivastava**

[![GitHub](https://img.shields.io/badge/GitHub-Akshatsrii-181717?style=for-the-badge&logo=github)](https://github.com/Akshatsrii)
[![LeetCode](https://img.shields.io/badge/LeetCode-Akshatsrivastava007-FFA116?style=for-the-badge&logo=leetcode&logoColor=black)](https://leetcode.com/Akshatsrivastava007)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06b6d4,100:0f172a&height=120&section=footer" width="100%"/>

</div>
