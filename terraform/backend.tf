resource "render_web_service" "backend" {
  name   = "condocombat-backend-api"
  plan   = "free"
  region = "oregon"

  runtime_source = {
    image = {
      image_url = "${var.dockerhub_username}/condocombat-backend"
      tag       = "latest"
    }
  }

  env_vars = {
    "SECRET_KEY" = {
      value = var.backend_secret_key
    }
  }
}