import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from imblearn.over_sampling import SMOTE
import xgboost as xgb
import pickle

# Load cleaned data
df = pd.read_csv('../data/cleaned_dataset.csv')

X = df['clean_text']
y = df['fraudulent']

# TF-IDF vectorization
tfidf = TfidfVectorizer(max_features=5000, ngram_range=(1,2))
X_tfidf = tfidf.fit_transform(X)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X_tfidf, y, test_size=0.2, random_state=42, stratify=y
)

# SMOTE for class imbalance
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

# Train XGBoost
model = xgb.XGBClassifier(
    n_estimators=200,
    max_depth=6,
    scale_pos_weight=20,
    eval_metric='logloss',
    random_state=42
)
model.fit(X_train_res, y_train_res)

# Evaluate
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred, target_names=['Real', 'Fake']))

# Save model and vectorizer
with open('../models/xgb_model.pkl', 'wb') as f:
    pickle.dump(model, f)
with open('../models/tfidf_vectorizer.pkl', 'wb') as f:
    pickle.dump(tfidf, f)

print("Model saved to models/")