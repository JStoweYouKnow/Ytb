output "cloud_run_url" {
  description = "The URL of the deployed Cloud Run service"
  value       = google_cloud_run_v2_service.app_service.uri
}

output "secret_manager_instructions" {
  description = "Instructions for adding the secret value"
  value       = "Run this command to add your API key: echo -n 'YOUR_API_KEY' | gcloud secrets versions add GEMINI_API_KEY --data-file=-"
}
