import pandas as pd
import re
import matplotlib.pyplot as plt
from wordcloud import WordCloud

# Load
df = pd.read_csv("../data/fake_job_postings.csv")

# Step 1 — Check nulls
print("Null values:\n", df.isnull().sum())

# Step 2 — Fill nulls with empty string (text columns)
text_cols = ['title', 'description', 'company_profile', 
             'requirements', 'benefits', 'salary_range']
df[text_cols] = df[text_cols].fillna('')

# Step 3 — Combine all text into one column
df['combined_text'] = (df['title'] + ' ' + 
                       df['description'] + ' ' + 
                       df['requirements'] + ' ' + 
                       df['company_profile'])

# Step 4 — Clean text function
def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'http\S+', '', text)        # remove URLs
    text = re.sub(r'[^a-zA-Z\s]', '', text)   # remove special chars/numbers
    text = re.sub(r'\s+', ' ', text).strip()   # remove extra spaces
    return text

df['clean_text'] = df['combined_text'].apply(clean_text)

# Step 5 — EDA Plot 1: Fake vs Real count
df['fraudulent'].value_counts().plot(kind='bar', color=['green','red'])
plt.title('Real vs Fake Job Postings')
plt.xticks([0,1], ['Real','Fake'], rotation=0)
plt.savefig('../data/class_distribution.png')
plt.close()
print("Plot 1 saved")

# Step 6 — EDA Plot 2: Word cloud for FAKE postings
fake_text = ' '.join(df[df['fraudulent']==1]['clean_text'])
wc = WordCloud(width=800, height=400, background_color='white').generate(fake_text)
plt.figure(figsize=(10,5))
plt.imshow(wc)
plt.axis('off')
plt.title('Most Common Words in FAKE Postings')
plt.savefig('../data/fake_wordcloud.png')
plt.close()
print("Plot 2 saved")

# Step 7 — EDA Plot 3: Word cloud for REAL postings
real_text = ' '.join(df[df['fraudulent']==0]['clean_text'].sample(1000))
wc2 = WordCloud(width=800, height=400, background_color='white').generate(real_text)
plt.figure(figsize=(10,5))
plt.imshow(wc2)
plt.axis('off')
plt.title('Most Common Words in REAL Postings')
plt.savefig('../data/real_wordcloud.png')
plt.close()
print("Plot 3 saved")

# Step 8 — Save cleaned dataset
df.to_csv('../data/cleaned_dataset.csv', index=False)
print("Cleaned dataset saved — shape:", df.shape)
print("\nSample clean text:")
print(df['clean_text'].iloc[0][:200])