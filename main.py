# main.py

import uvicorn
from fastapi import FastAPI
from model import get_anomalies, get_metrics, approve_issue

app = FastAPI()

# ------------------------
# 1. Get anomalies
# ------------------------
@app.get("/anomalies")
def anomalies():
    return get_anomalies()

# ------------------------
# 2. Get metrics
# ------------------------
@app.get("/metrics")
def metrics():
    return get_metrics()

# ------------------------
# 3. Approve issue
# ------------------------
@app.post("/approve/{issue_id}")
def approve(issue_id: int):
    return approve_issue(issue_id)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
