# Colton Williams Portfolio Website

Modern, high-performance personal portfolio and engineering showcase for **Colton Williams**, Advisory Software Engineer based in Austin, TX.

🌐 Live Site: [https://www.coltonwilliams.net](https://www.coltonwilliams.net)  
✍️ Engineering Blog: [https://blog.coltonwilliams.net](https://blog.coltonwilliams.net)  
💼 LinkedIn: [https://www.linkedin.com/in/colton-williams-swe/](https://www.linkedin.com/in/colton-williams-swe/)

---

## ✨ Features & Architecture

- **Dynamic Tenure Calculation**: Automatically calculates and renders the exact number of years and months of software development experience since career inception (June 2015), dynamically keeping the hero stats and bio current without manual updates.
- **2x Outstanding Technical Achievement Awards**: Showcasing honors for architectural leadership on **IBM Verify for Government** (FedRAMP & FIPS in AWS GovCloud) and the **MFA Policy Engine**.
- **Interactive Most Used Technologies Panel (28 Technologies)**:
  - Categorized across *Security & IAM*, *Cloud & DevOps*, *AI & Innovation*, *Backend & Messaging*, and *Data & NoSQL*.
  - Added enterprise coverage: **SpiceDB (Zanzibar ReBAC)**, **FedRAMP & AWS GovCloud**, **FIPS 140 Enablement**, **Gemini AI**, **IBM BobAI**, **ArgoCD (GitOps)**, **Rundeck**, **Jenkins**, **RabbitMQ**, and distributed **NoSQL (CouchDB, Cloudant, DynamoDB)**.
  - Real-time search filter with instant query matching across tech titles, descriptions, and tag pills.
- **Modern Dark & Light Theme System**:
  - Built strictly adhering to the latest Modern Web Standards (`light-dark()`, `:has()`, and `color-scheme` metadata).
  - Respects OS preference by default with seamless toggle support and persistent storage.
  - Zero Flash of Unstyled Content (FOUC).
- **Visual Design & Glassmorphism**:
  - Radiant accents (Cyber Cyan & Electric Violet) with subtle ambient glow lighting and micro-animations.
  - High-resolution authentic imagery and responsive glassmorphic cards.
  - Responsive mobile-first layout with smooth navigation spy.
- **Automated Testing Suite**: End-to-end automated UI validation powered by Playwright across Chromium and WebKit.

---

## 🚀 Quick Start

### 1. Run Locally
Run the development server using `serve`:
```bash
npm run dev
```
Then visit `http://localhost:3000` in your browser.

Or simply open `index.html` directly in any modern browser:
```bash
open index.html
```

### 2. Run Automated Playwright Tests
```bash
npm run test
```

---

## 📁 Project Structure

```
.
├── index.html            # Main semantic HTML5 markup & SEO metadata
├── index.css             # Vanilla CSS design system, themes & glassmorphism
├── app.js                # Dynamic tenure calculations & interactive tech panel logic
├── package.json          # Project metadata, scripts, and dev dependencies
├── playwright.config.ts  # End-to-end testing configuration
├── assets/
│   ├── colton_portrait.png  # High-resolution profile portrait
│   └── desk_work.png        # Selected work & blog visual asset
└── tests/                # Automated Playwright test specs
```

---

## 🛠️ Tech Stack

- **Core**: Vanilla HTML5, Vanilla CSS3, Vanilla ECMAScript (Zero bloated runtime dependencies)
- **Testing**: Playwright (`@playwright/test`)
- **Typography**: Google Fonts (Plus Jakarta Sans, Outfit, JetBrains Mono)
