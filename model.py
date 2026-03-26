# model.py

import pandas as pd
import os

# Load dataset using path relative to this file (works from any working directory)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
df = pd.read_csv(os.path.join(BASE_DIR, "data", "aethercost_dataset.csv"))

# Track resolved issue IDs (use a set for O(1) lookup)
resolved_ids = set()


# Keep only important (non-LOW) issues that haven't been resolved yet
def get_anomalies():
    issues = df[(df["severity"] != "LOW") & (~df["id"].isin(resolved_ids))]
    return issues.to_dict(orient="records")


# Metrics for dashboard
def get_metrics():
    total_spend = df["amount"].sum()
    total_risk = df["risk_if_ignored"].sum()
    # Only count positive impact rows (actual anomalies with recoverable money)
    recoverable = df[df["impact"] > 0]["impact"].sum()

    return {
        "total_spend": int(total_spend),
        "potential_loss": int(total_risk),
        "recoverable_savings": int(recoverable),
    }


# Mark an issue as resolved by its id
def approve_issue(issue_id: int):
    if issue_id not in df["id"].values:
        return {"error": f"Issue {issue_id} not found"}
    resolved_ids.add(issue_id)
    return {"message": f"Issue {issue_id} resolved"}
