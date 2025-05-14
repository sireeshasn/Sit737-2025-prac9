# SIT737 Task 9.1 – Book Library App with MongoDB Atlas on Kubernetes

This project demonstrates a Node.js-based Book Library application deployed in a Kubernetes cluster, connected to **MongoDB Atlas** for persistent storage. The solution includes Kubernetes deployment and service configurations, a secret-based connection to the database, CRUD operation testing, and verification using MongoDB Compass.

---

## 📦 Project Structure

| File                     | Description |
|--------------------------|-------------|
| `Dockerfile`             | Builds the Node.js app container |
| `deployment.yaml`        | Kubernetes Deployment for the app |
| `service.yaml`           | Kubernetes Service to expose the app |
| `mongo-uri-secret.yaml`  | Kubernetes Secret storing MongoDB Atlas URI |
| `.env`                   | Environment variables (optional) |
| `server.js`              | Main Express app with MongoDB integration |
| `package.json` / `lock`  | App dependencies |
| `.dockerignore`          | Excludes unnecessary files from Docker build |
| `screenshots/`           | Contains Compass, CRUD, and pod screenshots |
| `README.md`              | This documentation |

---

## ✅ Key Highlights

- Connected to **MongoDB Atlas** instead of deploying MongoDB locally
- Secrets used to store MongoDB URI securely in Kubernetes
- CRUD operations implemented and tested
- Verified data in **MongoDB Compass**

---

## ⚙️ Deployment Instructions (Minikube)

1. **Start Minikube**
   ```bash
   minikube start# Sit737-2025-prac9
   Build the Docker image inside Minikube

eval $(minikube docker-env)
docker build -t book-library-app .

Apply MongoDB URI secret
kubectl apply -f mongo-uri-secret.yaml

Deploy the app
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

Access the app
minikube service book-library-app --url
🔐 MongoDB Configuration (Atlas)
You are using MongoDB Atlas at:
mongodb+srv://sireesha2622:Prash0204@cluster0.ekefhyn.mongodb.net/task9
The full connection string is stored in a Kubernetes Secret:
apiVersion: v1
kind: Secret
metadata:
  name: mongo-uri-secret
type: Opaque
stringData:
  MONGO_URI: mongodb+srv://sireesha2622:****@cluster0.ekefhyn.mongodb.net/task9?retryWrites=true&w=majority
In the app deployment:
env:
  - name: MONGO_URI
    valueFrom:
      secretKeyRef:
        name: mongo-uri-secret
        key: MONGO_URI
🧪 CRUD API Testing
Once the app is running, use these endpoints to test functionality:
# Create a book
curl -X POST http://<APP_URL>/books -H "Content-Type: application/json" -d "{\"title\":\"1984\",\"author\":\"George Orwell\"}"

# Get all books
curl http://<APP_URL>/books

# Update a book
curl -X PUT http://<APP_URL>/books/<BOOK_ID> -H "Content-Type: application/json" -d "{\"title\":\"Updated Book\"}"

# Delete a book
curl -X DELETE http://<APP_URL>/books/<BOOK_ID>
🖥 MongoDB Compass Verification
Open MongoDB Compass

Connect using:
mongodb+srv://sireesha2622:*****@cluster0.ekefhyn.mongodb.net/task9
