import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

# Load dataset
df = pd.read_csv("Cybersecurity_Dataset.csv")

# Features and target
X = df["Cleaned Threat Description"]
y = df["Threat Category"]

# Create pipeline
pipeline = Pipeline([
    ("tfidf", TfidfVectorizer()),
    ("clf", LogisticRegression(max_iter=1000))
])

# Train
pipeline.fit(X, y)

# Save model
with open("model_pipeline.pkl", "wb") as f:
    pickle.dump(pipeline, f)

print("Model trained and saved successfully.")
