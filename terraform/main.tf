terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# The Cloud Run service configuration
resource "google_cloud_run_v2_service" "app_service" {
  name     = "ashanti"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "gcr.io/${var.project_id}/ashanti:latest"

      env {
        name = "NODE_ENV"
        value = "production"
      }
      
      # We attach the Gemini API Key from Secret Manager here
      env {
        name = "GEMINI_API_KEY"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.gemini_api_key.secret_id
            version = "latest"
          }
        }
      }

      resources {
        limits = {
          cpu    = "1000m"
          memory = "512Mi"
        }
      }
      
      ports {
        container_port = 8080
      }
    }

    # Enable Session Affinity for WebSockets
    session_affinity = true
    
    # 60 minute timeout for live AI sessions
    timeout = "3600s"
    
    scaling {
      min_instance_count = 0
      max_instance_count = 10
    }
  }

  depends_on = [
    google_project_service.run_api,
    google_project_iam_member.secret_accessor
  ]
}

# Allow unauthenticated access to the Cloud Run service
resource "google_cloud_run_v2_service_iam_member" "public_access" {
  name     = google_cloud_run_v2_service.app_service.name
  location = google_cloud_run_v2_service.app_service.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Create the Secret Manager Secret for the API key
resource "google_secret_manager_secret" "gemini_api_key" {
  secret_id = "GEMINI_API_KEY"

  replication {
    auto {}
  }

  depends_on = [
    google_project_service.secretmanager_api
  ]
}

# Note: The actual secret version (the value) should be added manually or via a separate script to avoid storing it in state
# Make sure the Cloud Run compute service account has access to the secret
resource "google_project_iam_member" "secret_accessor" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}


# Data source to get project number dynamically
data "google_project" "project" {}

# Enable necessary APIs
resource "google_project_service" "run_api" {
  service            = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "secretmanager_api" {
  service            = "secretmanager.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "firestore_api" {
  service            = "firestore.googleapis.com"
  disable_on_destroy = false
}
