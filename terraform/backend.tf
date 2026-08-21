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
    "PORT" = {
      value = "10000"
    }
    "DATABASE_URL" = {
      value = "postgresql+asyncpg://postgres:${var.supabase_db_password}@db.${supabase_project.db.id}.supabase.co:5432/postgres"
    }
    "DB_HOST" = {
      value = "db.${supabase_project.db.id}.supabase.co"
    }
    "DB_PORT" = {
      value = "5432"
    }
    "DB_NAME" = {
      value = "postgres"
    }
    "DB_USER" = {
      value = "postgres"
    }
    "DB_PASSWORD" = {
      value = var.supabase_db_password
    }
    "SUPABASE_URL" = {
      value = "https://${supabase_project.db.id}.supabase.co"
    }
  }
}