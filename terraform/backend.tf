resource "render_web_service" "backend" {
  name   = "condocombat-backend"
  plan   = "free"
  region = "oregon"

  runtime_source = {
    docker_image = "${var.dockerhub_username}/condocombat-backend:latest"
  }

  env_vars = {
    DATABASE_URL = "postgresql://postgres:${var.supabase_db_password}@db.${supabase_project.db.id}.supabase.co:5432/postgres?sslmode=require"
    SECRET_KEY   = var.backend_secret_key
  }
}