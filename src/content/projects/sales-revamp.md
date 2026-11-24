---
# TODO(davis): Confirm the public-facing title; the prototype called this “Sales-for revamp.”
title: Sales tracking automation
summary: End-to-end automation of a manual sales-tracking process — from intake through reporting.
kind: excel
kindLabel: excel · vba
year: 2024
order: 1
# TODO(davis): role: "<your role>"
# TODO(davis): timeframe: "<e.g. 2024, 3 months>"
figure: sales-revamp
stack: [Excel, Power Query, VBA, Pivot models]
# TODO(davis): verify or remove — unverified figure
impactVerified: false
impact:
  - label: runtime
    value: manual half-day → 90s
  - label: inputs
    value: 7 workbooks → 1 model
  - label: errors
    value: eliminated ~12 reconciliation breaks / month
draft: false
---

## Problem

Sales tracking was spread across multiple workbooks. The team copied and pasted data to move it from intake to reporting, then spent time reconciling differences between files.

## Approach

I audited the full process and moved it into a single model. I replaced manual transfers with parameterized inputs and set up reports to update when the workbook was saved.

## Result

The team could run reports from one source without rebuilding or reconciling them by hand each time.
