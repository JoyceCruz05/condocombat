resource "render_web_service" "backend" {
  name            = "condocombat-backend"
  plan            = "free"
  region          = "oregon"
  runtime_source  = "docker"

  image_url = "${var.dockerhub_username}/condocombat-backend:latest"

  env_vars = [
    {
      key   = "DATABASE_URL"
      value = "postgresql://postgres:${var.supabase_db_password}@db.${supabase_project.db.id}.supabase.co:5432/postgres?sslmode=require"
    },
    {
      key   = "SECRET_KEY"
      value = var.backend_secret_key
    }
  ]
}