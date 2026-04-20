# 📚 School Library Manager - Cloudflare Full-Stack Project

This project is a complete full-stack application designed to manage a school library system (Students and Books). It is built to run entirely on the **Cloudflare Developer Platform**, leveraging Edge computing and relational data at the edge.

## 🏗️ Architecture

The project is divided into three main components:

- **`App/Front`**: A modern React frontend deployed on Cloudflare Pages.
- **`App/Back`**: A high-performance API built with Hono, running on Cloudflare Workers.
- **`Infra`**: Infrastructure as Code (IaC) using Terraform to manage Cloudflare resources.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TypeScript, Lucide React (Icons).
- **Backend**: Hono (Web Framework), Cloudflare Workers.
- **Database**: Cloudflare D1 (SQL database at the edge).
- **IaC**: Terraform (Cloudflare Provider).
- **CI/CD**: GitHub Actions.

## 📁 Project Structure

```text
├── .github/workflows/    # Automated deployment pipelines
├── App/
│   ├── Back/             # Backend API (Cloudflare Workers)
│   │   ├── src/          # API Logic & D1 Integration
│   │   └── schema.sql    # Database schema
│   └── Front/            # Frontend UI (Cloudflare Pages)
│       └── src/          # React Components & API hooks
└── Infra/                # Terraform configuration
    └── modules/          # Reusable IaC components
```

## 🚀 Getting Started

### 1. Database Setup
Ensure you have the Cloudflare CLI (`wrangler`) installed and authenticated. Create your D1 database and initialize the schema:

```bash
# Create the database
npx wrangler d1 create my-app

# Initialize the tables
npx wrangler d1 execute my-app --remote --file=./App/Back/schema.sql
```

### 2. Infrastructure Deployment
Navigate to the `Infra` directory and apply the Terraform configuration:

```bash
cd Infra
terraform init
terraform apply
```

### 3. Local Development

#### Backend
```bash
cd App/Back
npm install
npm run dev
```

#### Frontend
```bash
cd App/Front
npm install
npm run dev
```

## 🚢 CI/CD Deployment

This repository includes automated workflows for GitHub Actions:
- **Deploy Backend**: Triggers on changes to `App/Back/**`.
- **Deploy Frontend**: Triggers on changes to `App/Front/**`.

### Required Configuration
To enable deployments, add the following to your GitHub Repository:
- **Secrets**: `CLOUDFLARE_API_TOKEN`
- **Variables**: `CLOUDFLARE_ACCOUNT_ID`

---
*Developed as a Final Project for the Advanced Coding Course.*
