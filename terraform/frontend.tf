resource "render_web_service" "frontend" {
  name   = "condocombat-frontend"
  plan   = "free"
  region = "oregon"

  runtime_source = {
    docker_image = "${var.dockerhub_username}/condocombat-frontend:latest"
  }

  env_vars = {
    NEXT_PUBLIC_API_URL = "https://${render_web_service.backend.domain_name}"
  }
}