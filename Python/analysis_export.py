import pandas as pd

df = pd.read_csv("Data/healthcare_dataset.csv")

# Dates
df["Date of Admission"] = pd.to_datetime(df["Date of Admission"])
df["Discharge Date"] = pd.to_datetime(df["Discharge Date"])

# Length of Stay
df["Length of Stay"] = (
    df["Discharge Date"] - df["Date of Admission"]
).dt.days


# KPI
kpi = pd.DataFrame({
    "Metric": [
        "Total Patients",
        "Total Billing",
        "Average Age",
        "Average Stay"
    ],
    "Value": [
        len(df),
        df["Billing Amount"].sum(),
        df["Age"].mean(),
        df["Length of Stay"].mean()
    ]
})

kpi.to_csv("Data/dashboard_data/kpi.csv", index=False)


# Medical Condition Revenue
condition = (
    df.groupby("Medical Condition")["Billing Amount"]
    .sum()
    .reset_index()
)

condition.to_csv(
    "Data/dashboard_data/condition_revenue.csv",
    index=False
)


# Monthly Admissions
df["Month"] = df["Date of Admission"].dt.to_period("M").astype(str)

monthly = (
    df.groupby("Month")
    .size()
    .reset_index(name="Patients")
)

monthly.to_csv(
    "Data/dashboard_data/monthly_admissions.csv",
    index=False
)


# Insurance Revenue
insurance = (
    df.groupby("Insurance Provider")["Billing Amount"]
    .sum()
    .reset_index()
)

insurance.to_csv(
    "Data/dashboard_data/insurance_revenue.csv",
    index=False
)


# Hospital Revenue
hospital = (
    df.groupby("Hospital")["Billing Amount"]
    .sum()
    .sort_values(ascending=False)
    .head(10)
    .reset_index()
)

hospital.to_csv(
    "Data/dashboard_data/hospital_revenue.csv",
    index=False
)


print("Export completed successfully!")