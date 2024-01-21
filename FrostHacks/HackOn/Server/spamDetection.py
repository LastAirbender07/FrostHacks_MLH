import pickle
import joblib
import string
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
nltk.download('stopwords')
nltk.download('punkt')
from nltk.stem import PorterStemmer

port_stemmer = PorterStemmer()

# tfidf = pickle.load(open('vectorizer.pkl', 'rb'))
# model = pickle.load(open('model.pkl', 'rb'))

tfidf = joblib.load('vectorizer.joblib')
model = joblib.load('model.joblib')

# # Create a function to generate cleaned data from raw text

def clean_text(text):
    text = word_tokenize(text) # Create tokens
    text= " ".join(text) # Join tokens
    text = [char for char in text if char not in string.punctuation] # Remove punctuations
    text = ''.join(text) # Join the leters
    text = [char for char in text if char not in re.findall(r"[0-9]", text)] # Remove Numbers
    text = ''.join(text) # Join the leters
    text = [word.lower() for word in text.split() if word.lower() not in set(stopwords.words('english'))] # Remove common english words (I, you, we,...)
    text = ' '.join(text) # Join the leters
    text = list(map(lambda x: port_stemmer.stem(x), text.split()))
    return " ".join(text)   # error word

def predictSpam(message):
    message = clean_text(message)
    message = tfidf.transform([message])
    prediction = model.predict(message)
    if prediction == 1:
        return "Spam"
    else:
        return "Normal"

def getMsg(messages):
    # msg = ["Hello, I am a spam message", "Hello, I am not a spam message", "You", "I am a spam message", "I am not a spam message"]
    predictedMsg = {}
    for msg in messages:
         msg["type"] = predictSpam(msg["body"])
    for i in range(len(messages)):
            predictedMsg[i] = [messages[i]]
            
    return predictedMsg


