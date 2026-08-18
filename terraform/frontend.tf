resource "render_web_service" "frontend" {
  name           = "condocombat-frontend"
  plan           = "free"
  region         = "oregon"
  start_command  = null

  runtime_source = {
    image = {
      image_url = "docker.io/${var.dockerhub_username}/condocombat-frontend:latest"
    }
  }

  env_vars = {
    NEXT_PUBLIC_API_URL = {
      value = render_web_service.backend.url
    }
  }
}