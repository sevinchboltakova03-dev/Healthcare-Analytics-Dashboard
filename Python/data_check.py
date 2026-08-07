import pandas as pd

df = pd.read_csv("Data/healthcare_dataset.csv")

print(df.head())

print("\n--- INFO ---")
print(df.info())

print("\n--- SHAPE ---")
print(df.shape)
# Date format
df["Date of Admission"] = pd.to_datetime(df["Date of Admission"])
df["Discharge Date"] = pd.to_datetime(df["Discharge Date"])
# Length of Stay
df["Length of Stay"] = (
    df["Discharge Date"] - df["Date of Admission"]
).dt.days
# KPI
print("\n--- KPI ---")

print("Total Patients:")
print(len(df))

print("\nTotal Billing:")
print(df["Billing Amount"].sum())

print("\nAverage Age:")
print(df["Age"].mean())

print("\nAverage Length of Stay:")
print(df["Length of Stay"].mean())
print("\nMedical Condition Distribution:")
print(df["Medical Condition"].value_counts())
print("\nBilling by Medical Condition:")

billing = (
    df.groupby("Medical Condition")["Billing Amount"]
      .sum()
      .sort_values(ascending=False)
)

print(billing)
print("\nAdmission Type Distribution:")

print(df["Admission Type"].value_counts())
print("\nBilling by Insurance Provider:")

insurance = (
    df.groupby("Insurance Provider")["Billing Amount"]
      .sum()
      .sort_values(ascending=False)
)

print(insurance)
print("\nMedication Distribution:")

print(df["Medication"].value_counts())
print("\nTest Results Distribution:")

print(df["Test Results"].value_counts())
print("\nGender Distribution:")

print(df["Gender"].value_counts())
print("\nAge Statistics:")
print(df["Age"].describe())
print("\nAge Group Distribution:")

def age_group(age):
    if age <= 18:
        return "0-18"
    elif age <= 35:
        return "19-35"
    elif age <= 50:
        return "36-50"
    elif age <= 65:
        return "51-65"
    else:
        return "65+"

df["Age Group"] = df["Age"].apply(age_group)

print(df["Age Group"].value_counts())
print("\nBlood Type Distribution:")

print(df["Blood Type"].value_counts())
print("\nMonthly Admissions:")

df["Admission Month"] = (
    df["Date of Admission"]
    .dt.to_period("M")
)

monthly = df["Admission Month"].value_counts().sort_index()

print(monthly)
print("\nTop Hospitals by Patients:")

print(df["Hospital"].value_counts().head(10))
print("\nTop Hospitals by Revenue:")

hospital_revenue = (
    df.groupby("Hospital")["Billing Amount"]
      .sum()
      .sort_values(ascending=False)
      .head(10)
)

print(hospital_revenue)
# Top Hospitals Revenue

top_hospitals = (
    df.groupby("Hospital")["Billing Amount"]
    .sum()
    .sort_values(ascending=False)
    .head(10)
)

top_hospitals.to_csv("Data/dashboard_data/top_hospitals_revenue.csv")

print(top_hospitals)
print("\nMedication Distribution:")

medication = df["Medication"].value_counts()

print(medication)

medication.to_csv(
    "Data/dashboard_data/medication_distribution.csv",
    header=["Patients"]
)
print("\nTest Results Distribution:")

test_results = df["Test Results"].value_counts()

print(test_results)

test_results.to_csv(
    "Data/dashboard_data/test_results_distribution.csv",
    header=["Patients"]
)
print("\nAdmission Type Distribution:")

admission = df["Admission Type"].value_counts()

print(admission)

admission.to_csv(
    "Data/dashboard_data/admission_distribution.csv",
    header=["Patients"]
)
print("\nGender Distribution:")

gender = df["Gender"].value_counts()

print(gender)

gender.to_csv(
    "Data/dashboard_data/gender_distribution.csv",
    header=["Patients"]
)