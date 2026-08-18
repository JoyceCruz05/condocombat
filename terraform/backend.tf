resource "render_web_service" "backend" {
  name          = "condocombat-backend"
  plan          = "free"
  region        = "oregon"
  start_command = null

  runtime_source = {
    image = {
      image_url = "docker.io/${var.dockerhub_username}/condocombat-backend"
      tag       = "latest"
    }
  }

  env_vars = {
    DATABASE_URL = {
      value = "postgresql://postgres:${var.supabase_db_password}@db.${supabase_project.db.id}.supabase.co:5432/postgres?sslmode=require"
    }
    SECRET_KEY = {
      value = var.backend_secret_key
    }
  }
}