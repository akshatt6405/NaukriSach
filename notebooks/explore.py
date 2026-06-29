import pandas as pd

df = pd.read_csv("../data/fake_job_postings.csv")
print(df.shape)
print(df.columns.tolist())
print(df['fraudulent'].value_counts())
print(df.head())
