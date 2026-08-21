resource "render_web_service" "frontend" {
  name   = "condocombat-frontend-web"
  plan   = "free"
  region = "oregon"

  runtime_source = {
    image = {
      image_url = "${var.dockerhub_username}/condocombat-frontend"
      tag       = "latest"
    }
  }
}