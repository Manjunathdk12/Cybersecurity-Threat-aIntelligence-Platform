import sys
import pickle
import json

# Load model
with open("model_pipeline.pkl", "rb") as f:
    model = pickle.load(f)

# Get description
description = " ".join(sys.argv[1:])

# Predict
predicted = model.predict([description])[0]

# Return JSON
print(json.dumps({ "predicted_category": predicted }))
