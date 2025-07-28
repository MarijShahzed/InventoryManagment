# 📦 Inventory Management (Frontend)

A simple React-based inventory management system with **login**, **project creation**, and **CRUD operations**, integrated with a mock REST API. Includes E2E test automation using **Cypress**.

---

## 🚀 Getting Started

### 📁 Install Node Modules

install Node Modelue

```bash
npm install
npm start
```

## 🧪 Cypress E2E Testing

This project uses **Cypress** for end-to-end testing to ensure core flows like login and CRUD operations work as expected.

### 📁 Cypress Directory Structure

```bash
cypress/
├── e2e/ # Test specifications (e.g., login, create, edit, delete)
├── fixtures/ # Static test data (e.g., test users, project payloads)
├── support/ # Custom Cypress commands and configuration
└── downloads/ # (Optional) Downloaded files if your tests include file validation
```

---

### 📦 Cypress Setup & Commands

#### 1️⃣ Install Cypress

```bash
npm install cypress --save-dev //installing cypress
npm run cypress:open //command to run cypress
```

## 📮 Postman Collection

You can find the complete Postman automation test suite in the following file:

**`PostmanCollectionApiAutomation.json`**

### 🔍 What's Included:

- Automated API tests for login, create, update, and delete operations
- Pre-request scripts and test assertions
- Environment variable usage for chaining requests

### 🧪 How to Use:

1. Open [Postman](https://www.postman.com/)
2. Go to **File → Import**
3. Select `PostmanCollectionApiAutomation.json`
4. Run the collection in **Collection Runner** or via **Newman**
