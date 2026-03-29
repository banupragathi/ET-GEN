# 🚀 Cost Pilot – Autonomous Cost Intelligence Engine

Cost Pilot is an AI-powered enterprise system that detects cost inefficiencies, explains their root cause, quantifies financial impact, and enables real-time corrective actions.

Unlike traditional dashboards, AetherCost transforms cost intelligence into **actionable decision-making**.

---

## 🧠 Problem Statement

Enterprises lose significant revenue due to:

* Duplicate payments
* Vendor overpricing
* Undetected anomalies in operational data

Most existing solutions:

* Provide only dashboards
* Lack real-time decision-making
* Do not enable corrective actions

---

## 💡 Solution

AetherCost bridges this gap by combining:

* 🔍 **Anomaly Detection (ML)**
* 🧠 **Root Cause Intelligence**
* ⚠️ **Risk Simulation Engine**
* ⚡ **Action-Oriented Workflow**
* 💸 **Financial Impact Tracking**

---

## 🔥 Key Features

### 1. 📊 Smart Anomaly Detection

* Detects abnormal transactions using machine learning
* Identifies duplicates and unusual spending patterns

### 2. 🧠 Root Cause Intelligence

* Explains *why* an anomaly occurred
* Example:

  > Vendor price spike (2.07x above average)

### 3. ⚠️ Risk Simulation

* Estimates financial loss if ignored
* Example:

  > ₹45,000 anomaly → ₹2,25,000 projected loss

### 4. ⚡ Action Engine

* Approve / Ignore anomalies
* Simulates real enterprise workflows

### 5. 💸 Financial Impact Tracking

* Calculates:

  * Total spend
  * Potential loss
  * Recoverable savings

---

## 🏗️ System Architecture

```text
Data → ML Model → Root Cause Engine → Risk Simulation → Decision Engine → API → Frontend
```

---

## 🧠 Machine Learning

* Algorithm: Isolation Forest
* Features:

  * Transaction amount
  * Vendor average
  * Deviation ratio

The model identifies anomalies and feeds them into a business intelligence pipeline.

---

## 🧩 Tech Stack

### Backend

* FastAPI
* Python
* Pandas

### Machine Learning

* Scikit-learn (Isolation Forest)

### Frontend

* React + Tailwind CSS

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/banupragathi/ET-GEN.git
cd aethercost
```

---

### 2. Install Dependencies

```bash
pip install fastapi uvicorn pandas
```

---

### 3. Run Backend Server

```bash
uvicorn main:app --reload
```

---

### 4. Open API Docs

👉 http://127.0.0.1:8000/docs

---

## 🔌 API Endpoints

### GET /anomalies

Returns detected anomalies

### GET /metrics

Returns:

* Total Spend
* Potential Loss
* Recoverable Savings

### POST /approve/{id}

Marks an issue as resolved

---

## 📊 Example Output

```json
{
  "vendor": "Azure",
  "amount": 45000,
  "root_cause": "Vendor price spike (2.07x above average)",
  "risk_if_ignored": 225000,
  "severity": "HIGH",
  "confidence": 0.85
}
```

---

## 💼 Business Value

* Reduces operational costs by **10–15%**
* Provides **real-time financial intelligence**
* Enables **decision + action loop**

---

## 🏆 Key Differentiator

> “From Insight to Action”

CostPilot doesn’t just detect problems —
it enables immediate resolution with measurable financial impact.

---

## 📈 Future Enhancements

* SLA breach prediction
* Resource optimization engine
* Automated workflow execution
* Integration with ERP systems (SAP, Oracle)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📜 License

This project is for educational and hackathon purposes.

---

## 👨‍💻 Authors

Built with ❤️ for innovation and impact.
