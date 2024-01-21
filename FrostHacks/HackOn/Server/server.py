from fastapi import FastAPI, HTTPException, Depends, Request, Form
import uvicorn, httpx, json
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from bson import ObjectId
import jwt, requests # PyJWT library for generating tokens
import motor.motor_asyncio  # Async MongoDB driver for FastAPI
from functions import *
from spamDetection import *

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # Endpoint for token generation

origins = ["http://192.168.0.105:8081", "*"]
# origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def default():
    return {"FastAPI status": "connected"}

@app.get("/hello")
def read_root():
    print("Hello from FastAPI")
    return {"message": "Hello from FastAPI"}

#############################################################################
# ------------------ MongoDB connection & processes starts ------------------
#############################################################################
# class User(BaseModel):
#     id: Optional[str] = None
#     name: str
#     email: str
#     password: str
#     image: Optional[str] = None


# Secret key for token generation
SECRET_KEY = "Q$%&*^%$#@!@#$%^&*()_+Q"
ALGORITHM = "HS256"

# User model
class User(BaseModel):
    id: Optional[str] = None
    name: str
    email: str
    password: str
    image: Optional[str] = None

class File(BaseModel):
    id: Optional[str] = None
    Message: str
    scan_id: str
    file_name: str
    type: str
    GUI_Report: str
    malicious: int
    suspicious: int
    harmless: int
    typeunsupported: int
    confirmedtimeout: int
    timeout: int
    failure: int
    undetected: int
    fileName: str
    fileType: str
    file_Hash: str
    userId: str
    size: int

# Token model
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Function to create a token
async def create_token(user_id: str):
    payload = {"userId": str(user_id)}
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return Token(access_token=token)

# Registration endpoint
@app.post("/register")
async def register(user: User):
    try:
      existing_user = await userDb.find_one({"email": user.email})
      if existing_user:
         print("Email already exists")
         return {"status_code":400, "message": "Email already exists"}
      
      new_user = await userDb.insert_one(user.dict(exclude_unset=True))
      return {"message": "User registered successfully"}
    except Exception as e:
      print(e)
      raise HTTPException(status_code=500, detail="Server error")

@app.post("/login")
async def login(request: Request):
    try:
      user = await request.json()
      print("User Details:", user)
      print("User Details:", user["email"])
      existing_user = await userDb.find_one({"email": user["email"], "password": user["password"]})
      if existing_user:
        token = await create_token(str(existing_user["_id"]))
        obj = {"token": token.access_token, "userId": str(existing_user["_id"]), "userName": existing_user["name"]}
        print(obj)
        return obj
      raise HTTPException(status_code=401, detail="Invalid credentials")
    except Exception as e:
       print(e)
       raise HTTPException(status_code=500, detail="Server error")
    
###########################################################################
# --------------------------- Virus-total Scan URL -----------------------
###########################################################################
    
import hashlib
import base64

def base64_to_sha256(base64_string):
    decoded_bytes = base64.b64decode(base64_string)
    sha256_hash = hashlib.sha256(decoded_bytes).hexdigest()
    return sha256_hash

@app.post('/scanurl')
async def scanUrl(request: Request):
    try:
        data = await request.json()
        url = data["url"]
        curUser = data["userId"]
        api_key = '303e5c0196f610a9b9ae0ff8be7790bf9db6f14f6255674a9f18d5b0539a2d7f'
        vt_url = 'https://virustotal.com/vtapi/v2/url/report'

        params = {'apikey': api_key, 'resource': url}
        response = requests.get(vt_url, params=params)
        response.raise_for_status()
        result = response.json()

        results = [scan['result'] for scan in result['scans'].values()]
        result_counts = {result: results.count(result) for result in set(results)}
        result.update({'result_counts': result_counts})

        if result['positives'] > 0:
            result.update({'1message' : 'This site is malicious'})
        else:
            result.update({'message' : 'This site is not malicious'})
        print("Result :", result)
        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Server error")

async def insertFileDetails(file: File):
    try:
        print("File Hash:", file['file_Hash'])
        existing_file = await fileDb.find_one({"file_Hash": file['file_Hash'], "userId": file['userId']})
        if existing_file:
            print("File Hash:", existing_file['file_Hash'])
            print("File already exists")
        else:
            newFile = await fileDb.insert_one(file)
            print("File inserted successfully")
    except Exception as e:
        print(e)
        # raise HTTPException(status_code=500, detail="Server error")
    
@app.post('/scanfile')
async def scanFile(request: Request):
    try:
        data = await request.json()
        file = data["file"]
        file_hash = base64_to_sha256(file)
        upload_data = {'fileName': data["fileName"], 'fileType': data['fileType'], 'file_Hash': file_hash, 'userId': data["userId"], 'size': data["fileSize"]}
    except Exception as e:
        return {'error': str(e)}

    api_key = '31587f21cc5387a2db07acd81edbf3d6efd81d5484600ef4d885e3754bc08044'
    url = 'https://www.virustotal.com/api/v3/files/{0}'.format(file_hash)
    headers = { "accept": "application/json", "content-type": "multipart/form-data", "x-apikey": api_key }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        result = response.json()

    except requests.exceptions.RequestException as e:
        return {'error': str(e)}, 500
    except json.decoder.JSONDecodeError:
        print('Error')
        return {'error': 'Invalid response from VirusTotal API.'}, 500

    # print("Result :", result)


    malicious = result['data']['attributes']['last_analysis_stats']['malicious']
    suspicious = result['data']['attributes']['last_analysis_stats']['suspicious']
    if malicious + suspicious > 0:
        scan_result = {
            'Message': 'This file is malicious',
            'scan_id': result['data']['id'],
            'file_name': result['data']['attributes']['names'][0],
            'type': result['data']['attributes']['type_description'],
            'GUI_Report': 'https://www.virustotal.com/gui/file/{0}/detection'.format(file_hash),
            'malicious': malicious,
            'suspicious': suspicious,
            "harmless": result['data']['attributes']['last_analysis_stats']['harmless'],
            "typeunsupported": result['data']['attributes']['last_analysis_stats']['type-unsupported'],
            "confirmedtimeout": result['data']['attributes']['last_analysis_stats']['confirmed-timeout'],
            "timeout": result['data']['attributes']['last_analysis_stats']['timeout'],
            "failure": result['data']['attributes']['last_analysis_stats']['failure'],
            "undetected": result['data']['attributes']['last_analysis_stats']['undetected'],
            }
    else:
        scan_result = {
            'Message': 'This file is not malicious',
            'scan_id': result['data']['id'],
            'file_name': result['data']['attributes']['names'][0],
            'type': result['data']['attributes']['type_description'],
            'GUI_Report': 'https://www.virustotal.com/gui/file/{0}/detection'.format(file_hash),
            'malicious': malicious,
            'suspicious': suspicious,
            "harmless": result['data']['attributes']['last_analysis_stats']['harmless'],
            "typeunsupported": result['data']['attributes']['last_analysis_stats']['type-unsupported'],
            "confirmedtimeout": result['data']['attributes']['last_analysis_stats']['confirmed-timeout'],
            "timeout": result['data']['attributes']['last_analysis_stats']['timeout'],
            "failure": result['data']['attributes']['last_analysis_stats']['failure'],
            "undetected": result['data']['attributes']['last_analysis_stats']['undetected'],
            }
    scan_result.update(upload_data)
    await insertFileDetails(scan_result)
    # print("Scan Result :", scan_result)
    return scan_result
    
    
###########################################################################
# --------------------- File Forensics using exiftool ---------------------
###########################################################################
    
@app.post('/file')
async def file(request: Request):
    try:
        request = await request.json()
        # print("Request :", request)
        file = request["file"]
        FileType = request["fileType"]
        print("Type :", FileType)
        result = exifScan(file, FileType)
        print(result["gps_coordinates"] if result["gps_coordinates"] else "No GPS coordinates found")
        return {"result": result["output"], "gps": result["gps_coordinates"] if result["gps_coordinates"] else 0}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Server error")
    
###########################################################################
# ----------------------------- Predict Spam ------------------------------
###########################################################################
@app.post('/predict')
async def predict(request: Request):
    try:
        request = await request.json()
        message = request["messages"]
        # print("Message :", message)
        predictedMsg = getMsg(message)
        # print("Predicted Msg :", predictedMsg)
        return {"result": predictedMsg}
    except Exception as e:
        print("Error : ", e)
        raise HTTPException(status_code=500, detail="Server error")
  
if __name__ == "__main__":   
   try:
    client = motor.motor_asyncio.AsyncIOMotorClient(
        "mongodb+srv://jayaraj:jayaraj@cluster0.agiadw2.mongodb.net/"
    )
    print("Connected to MongoDB") if client else print("Could not connect to MongoDB")
    db = client["HackOn"]
    userDb = db["users"]
    fileDb = db['file']
   except Exception as e:
       print(e)
   import uvicorn
   uvicorn.run(app, host="0.0.0.0", port=8000)