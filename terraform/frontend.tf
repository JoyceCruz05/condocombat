resource "render_web_service" "frontend" {
  name            = "condocombat-frontend"
  plan            = "free"
  region          = "oregon"
  runtime_source  = "docker"

  image_url = "${var.dockerhub_username}/condocombat-frontend:latest"

  env_vars = [
    {
      key   = "NEXT_PUBLIC_API_URL"
      value = "https://${render_web_service.backend.domain_name}"
    }
  ]
}