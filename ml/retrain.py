import pandas as pd
import joblib
from pymongo import MongoClient
from sklearn.model_selection import RandomizedSearchCV
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# 1. Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['ultra_db']
collection = db['tradelogs']

# 2. Fetch trade data
docs = list(collection.find())

# 3. Transform into DataFrame
df = pd.DataFrame(docs)

# 4. Prepare features
features = ['atrEntry', 'volumeAtEntry', 'volumeSpike', 'priceVsMA', 'confidence', 'fallbackActive']
X = df[features]
y = df['outcome'].map({'win': 1, 'loss': 0, 'breakeven': 0})

# 5. Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestClassifier()
model.fit(X_train, y_train)

# 6. Save model
joblib.dump(model, 'trade_predictor.joblib')

print('✅ Model retrained and saved successfully!')

# Random Forest hyperparameter grid
param_grid = {
    'n_estimators': [100, 200, 500],
    'max_depth': [5, 10, 20, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4],
    'bootstrap': [True, False]
}

base_model = RandomForestClassifier()

# Randomized Search (you can also use GridSearchCV for exhaustive search)
rf_random = RandomizedSearchCV(
    estimator=base_model,
    param_distributions=param_grid,
    n_iter=10,
    cv=3,
    verbose=2,
    random_state=42,
    n_jobs=-1
)

rf_random.fit(X_train, y_train)

best_model = rf_random.best_estimator_

# Save best model
joblib.dump(best_model, 'trade_predictor.joblib')

import requests

# After joblib.dump(best_model, 'trade_predictor.joblib')
try:
    requests.post('http://localhost:5005/reload')
    print('✅ Hot reload of model triggered successfully!')
except Exception as e:
    print('⚠️ Failed to trigger hot reload:', str(e))
