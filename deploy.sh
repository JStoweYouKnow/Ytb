#!/bin/bash
set -euo pipefail

# ── Configuration ──
PROJECT_ID="${GCP_PROJECT_ID:-}"
REGION="${GCP_REGION:-us-central1}"
SERVICE_NAME="ashanti"
SECRET_NAME="${GEMINI_SECRET_NAME:-GEMINI_API_KEY}"

if [ -z "$PROJECT_ID" ]; then
    echo "Error: GCP_PROJECT_ID environment variable is required"
    echo ""
    echo "Usage:"
    echo "  GCP_PROJECT_ID=my-project ./deploy.sh"
    echo ""
    echo "Prerequisites:"
    echo "  1. gcloud CLI installed and authenticated"
    echo "  2. APIs enabled: run.googleapis.com, cloudbuild.googleapis.com, firestore.googleapis.com, secretmanager.googleapis.com"
    echo "  3. GEMINI_API_KEY in Secret Manager (or set GEMINI_SECRET_NAME=your-secret):"
    echo "     echo -n 'your-key' | gcloud secrets create GEMINI_API_KEY --data-file=-"
    exit 1
fi

echo "==> Deploying '${SERVICE_NAME}' to Cloud Run in project '${PROJECT_ID}' (${REGION})"
echo ""

# ── Step 1: Build and push Docker image via Cloud Build ──
echo "==> Building Docker image..."
gcloud builds submit \
    --project "${PROJECT_ID}" \
    --tag "gcr.io/${PROJECT_ID}/${SERVICE_NAME}" \
    .

# ── Step 2: Deploy to Cloud Run ──
echo "==> Deploying to Cloud Run..."
gcloud run deploy "${SERVICE_NAME}" \
    --project "${PROJECT_ID}" \
    --image "gcr.io/${PROJECT_ID}/${SERVICE_NAME}" \
    --region "${REGION}" \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --timeout 3600 \
    --session-affinity \
    --min-instances 0 \
    --max-instances 10 \
    --memory 512Mi \
    --cpu 1 \
    --set-env-vars "NODE_ENV=production"

# ── Step 3: Attach secrets ──
echo "==> Attaching GEMINI_API_KEY from Secret Manager (${SECRET_NAME})..."
gcloud run services update "${SERVICE_NAME}" \
    --project "${PROJECT_ID}" \
    --region "${REGION}" \
    --set-secrets "GEMINI_API_KEY=${SECRET_NAME}:latest"

# ── Done ──
SERVICE_URL=$(gcloud run services describe "${SERVICE_NAME}" \
    --project "${PROJECT_ID}" \
    --region "${REGION}" \
    --format 'value(status.url)')

echo ""
echo "=========================================="
echo "  Deployment complete!"
echo "  URL: ${SERVICE_URL}"
echo "  WebSocket: ${SERVICE_URL/https/wss}/ws"
echo "  Health: ${SERVICE_URL}/health"
echo "=========================================="
