# ShoeShow E-commerce Web Application

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://maven.apache.org/)
[![Java](https://img.shields.io/badge/Java-21-blue)](https://adoptopenjdk.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.5-brightgreen)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-20%2B-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-brightgreen)](#)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Hashim-Sobhi/ShoeShow-E-commerce-Web-Application)

---

## 🛍️ Overview
ShoeShow is a modern, full-featured e-commerce platform for premium footwear, featuring a robust backend (Spring Boot, Java 21, MySQL) and two Angular 20+ frontends (user & admin). It offers secure authentication, product management, order processing, AI-powered recommendations, and a seamless, mobile-friendly shopping experience.

---

## ✨ Features
- User & admin authentication (JWT-secured)
- Product catalog with images, sizes, and advanced filters
- Shopping cart, wishlist, and order management
- Admin dashboard for product, order, and customer management
- AI-powered chat assistant & product recommendations (Llama 4 integration)
- RESTful APIs with OpenAPI/Swagger docs
- Database migrations (Flyway)
- File upload for product images
- Logging, monitoring, and analytics
- Responsive, modern UI (Angular Material, Bootstrap)

---

## 🗂️ Monorepo Structure
```
ShoeShow-E-commerce-Web-Application/
├── backend/                  # Spring Boot backend (REST API, DB, security, AI integration)
│   ├── src/main/java/iti/jets/
│   ├── src/main/resources/
│   ├── uploads/              # Product images
│   ├── logs/                 # Application logs
│   ├── pom.xml
│   └── ...
├── ShoeShow-frontend-user/   # Angular user-facing frontend
│   ├── src/
│   ├── public/
│   ├── angular.json
│   └── ...
├── ShoeShow-frontend-admin/  # Angular admin dashboard
│   ├── src/
│   ├── public/
│   ├── angular.json
│   └── ...
└── README.md                 # Monorepo documentation
```

---

## 🚀 Quick Start
### Prerequisites
- Java 21+, Maven 3.8+, MySQL 8+
- Node.js 18+, npm 9+, Angular CLI 20+

### 1. Backend Setup
```bash
cd backend
# Configure DB in src/main/resources/application.properties
mvn clean spring-boot:run
```
- API Docs: [http://localhost:8081/swagger-ui.html](http://localhost:8081/swagger-ui.html)

### 2. User Frontend
```bash
cd ShoeShow-frontend-user
npm install
ng serve
```
- Visit: [http://localhost:4200/](http://localhost:4200/)

### 3. Admin Frontend
```bash
cd ShoeShow-frontend-admin
npm install
ng serve
```
- Visit: [http://localhost:4201/](http://localhost:4201/)

---

## 🧠 AI & Model Integration
- **AI Chat Assistant:** Real-time support and shopping guidance (Llama 4 Scout 17B)
- **Personalized Recommendations:** Based on user behavior
- **Integration:** Via backend REST API, exposed to Angular frontends

---

## 🛠️ Tech Stack
- **Backend:** Java 21, Spring Boot 3.4.5, Spring Data JPA, Spring Security, JWT, MySQL, Flyway, MapStruct, Lombok, OpenAPI/Swagger, JUnit, Testcontainers
- **Frontend:** Angular 20+, Angular Material, Bootstrap, Chart.js, RxJS, SCSS, TypeScript
- **AI/ML:** meta-llama/llama-4-scout-17b-16e-instruct (API integration)

---

## 🗄️ Database & Migrations
- MySQL database: `iti_grad`
- Flyway migration scripts: `backend/src/main/resources/db/migration/`
- Sample data: `backend/script_data.sql`, `backend/db_script.sql`

---

## 🧪 Testing
- Backend: `mvn test` (JUnit, Testcontainers, H2)
- Frontend: `ng test` (Angular CLI, Jasmine, Karma)

---

## 📦 Deployment
- Backend: `mvn clean package` → `java -jar target/ITI-Graduation-Project-1.0.jar`
- Frontend: `ng build` (artifacts in `dist/`)

---

## 🤝 Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push and open a Pull Request

---

## 📚 Documentation & Support
- [DeepWiki Project Page](https://deepwiki.com/Hashim-Sobhi/ShoeShow-E-commerce-Web-Application)
- [Backend DeepWiki](https://deepwiki.com/ahmedelbrmbaly/ShoeShow-backup)
- [User Frontend DeepWiki](https://deepwiki.com/ahmedelbrmbaly/shoeshow-frontend-user)
- [Admin Frontend DeepWiki](https://deepwiki.com/ahmedelbrmbaly/shoeshow-frontend-admin)

---

## 📝 License
This project is licensed under the MIT License.

---

© 2025 ShoeShow. All rights reserved.
