---
title: Donations data pipeline
summary: Standardized cleaning, loading, processing, and reporting for the full donations intake.
kind: code
kindLabel: python · sql
year: 2024
order: 2
stack: [Python, pandas, SQL, Airflow-style orchestration]
# TODO(davis): Anonymise donor data before capturing or publishing any screenshots.
# TODO(davis): verify or remove — unverified figure
impact:
  - label: intake sources
    value: unified 5 disparate feeds
  - label: load
    value: nightly, idempotent, observable
  - label: quality
    value: duplicate rate < 0.1%
draft: false
---

## Problem

Donation records entered the organization through several feeds. Inconsistent formats and duplicate records made it difficult to reconcile downstream reports.

## Approach

I audited every point where donation data entered the organization and rebuilt the pipeline around a common schema. The new process removed duplicates automatically and could rerun a load without creating new records for donations already processed.

## Result

Downstream reports drew from the same cleaned data and stopped disagreeing with one another. The pipeline also laid the groundwork for the donor churn and prospect models.

## Stack

Python and pandas handled cleaning and standardization, SQL handled loading and reporting, and Airflow-style orchestration ran the nightly jobs.
