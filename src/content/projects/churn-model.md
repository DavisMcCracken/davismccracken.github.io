---
title: Churn & high‑value prediction
summary: Statistical models to flag donors at risk of lapsing and identify high-potential prospects.
kind: algo
kindLabel: stats · regression
year: 2025
order: 3
# TODO(davis): role: "<your role>"
# TODO(davis): timeframe: "<e.g. 2024, 3 months>"
figure: churn-model
stack: [Python, scikit-learn, statsmodels, matplotlib]
# TODO(davis): Anonymise donor data before capturing or publishing any screenshots.
# TODO(davis): verify or remove — unverified figure
impactVerified: false
impact:
  - label: churn AUC
    value: 0.84 on holdout
  - label: prospect lift
    value: top decile gives 6× baseline
  - label: shipped
    value: in production, refreshed monthly
draft: false
---

## Problem

The development team needed to know which donors were at risk of lapsing and which prospects were most likely to make a high-value gift. Those were different questions and called for separate scores.

## Approach

I used logistic regression to estimate churn probability and built a separate model to score prospects. I created features from how often donors gave, which channels they used, and how they had engaged with the organization.

## Result

The scores went directly into the development team’s outreach queue, where staff could use them to prioritize follow-ups.

## Stack

Python with scikit-learn and statsmodels for modeling, and matplotlib for visualization.
