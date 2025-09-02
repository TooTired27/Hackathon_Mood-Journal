from flask import Flask, render_template, request, jsonify
import mysql.connector
import requests
from datetime import datetime
import os
from dotenv import load_dotenv
load_dotenv() # Load environment variables from .env file

app = Flask(__name__)
app.config[ 'SECRET_KEY' ] = os.getenv( 'SECRET_KEY')
# Hugging Face API setup
API_URL = "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base"
HEADERS = {"Authorization": f"Bearer {os.getenv('HUGGING_FACE_API_KEY')}"}  

# MySQL database setup (update with your credentials)
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="@Pammie2703",
    database="mood_journal"
)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze_mood():
    try:
        data = request.json
        text = data['text']

        # Call Hugging Face API
        response = requests.post(API_URL, headers=HEADERS, json={"inputs": text})
        print(f"✅ API Response status: {response.status_code}")
        print(f"📄 API Response: {response.text}")  # Debug: see raw response
        if response.status_code != 200:
            print(f"❌ API Error: {response.text}")
            return jsonify({"error": "Hugging Face API failed"}), 500
        emotion_data = response.json()
        print(f"🎭 Raw emotion data: {emotion_data}")

        # Handle different API response formats
        if isinstance(emotion_data, dict) and 'error' in emotion_data:
            # API returned an error (e.g., model loading)
            print(f"❌ Model loading error: {emotion_data}")
            return jsonify({"error": "Model is loading, try again in 30 seconds"}), 500
        if isinstance(emotion_data, list) and len(emotion_data) > 0:
            # Successful response - get the first item
            emotions = emotion_data[0]
        # Find the highest emotion score
    
            top_emotion = max(emotions, key=lambda x: x['score'])
        # Save to database
            print("💾 Saving to database...")
            cursor = db.cursor()
            query = "INSERT INTO entries (text, emotion, score, date) VALUES (%s, %s, %s, %s)"
            values = (text, top_emotion['label'], top_emotion['score'], datetime.now())
            cursor.execute(query, values)
            db.commit()
            cursor.close()
            print("✅ Saved entry to database.")
            return jsonify({
            "emotion": top_emotion['label'],
            "score": top_emotion['score']
            })
        else:
            print(f"❌ Unexpected API response format: {emotion_data}")
            return jsonify({"error": "Unexpected API response"}), 500
        
    except Exception as e:
        print(f"🔥 ERROR in analyze_mood: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
@app.route('/entries', methods=['GET'])
def get_entries():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM entries ORDER BY date DESC")
    entries = cursor.fetchall()
    cursor.close()
    return jsonify(entries)

if __name__ == '__main__':
    app.run(debug=True)

# Flutterwave API endpoints
FLUTTERWAVE_BASE_URL = "https://api.flutterwave.com/v3"
FLUTTERWAVE_PUBLIC_KEY = "FLWPUBK_TEST-33776e49568692ca885d5d6bdc9411e7-X"
FLUTTERWAVE_SECRET_KEY = "FLWSECK_TEST-c61aef6979ced3161afd19deae0f8b0d-X"

@app.route('/create-payment', methods=['POST'])
def create_payment():
    try:
        email = request.json.get('email')
        
        # Create payment with Flutterwave Direct API
        headers = {
            "Authorization": f"Bearer {FLUTTERWAVE_SECRET_KEY}",
            "Content-Type": "application/json"
        }
        
        payment_data = {
            "tx_ref": f"mood-journal-{datetime.now().timestamp()}",
            "amount": "3000",  # 3000 Naira (or use "30" for USD, "300" for ZAR)
            "currency": "NGN",  # or "USD", "ZAR", "KES", "GHS"
            "redirect_url": "http://localhost:5000/payment-success",
            "customer": {
                "email": email,
                "name": "Mood Journal User"
            },
            "customizations": {
                "title": "Mood Journal Premium",
                "description": "Monthly subscription for advanced features"
            }
        }
        
        # Make API request to Flutterwave
        response = requests.post(
            f"{FLUTTERWAVE_BASE_URL}/payments",
            headers=headers,
            json=payment_data
        )
        
        if response.status_code == 200:
            payment_response = response.json()
            payment_url = payment_response['data']['link']
            return jsonify({"payment_url": payment_url})
        else:
            print(f"Flutterwave API error: {response.text}")
            return jsonify({"error": "Payment failed to initialize"}), 500
        
    except Exception as e:
        print(f"Payment error: {str(e)}")
        return jsonify({"error": "Payment system error"}), 500
