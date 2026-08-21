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
    "PORT" = {
      value = "10000"
    }
    "SECRET_KEY" = {
      value = var.backend_secret_key
    }
    "ENVIRONMENT" = {
      value = "production"
    }
    "DATABASE_URL" = {
      value = "postgresql+asyncpg://postgres.${supabase_project.db.id}:${urlencode(var.supabase_db_password)}@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
    }
    "DB_HOST" = {
      value = "aws-0-us-east-1.pooler.supabase.com"
    }
    "DB_PORT" = {
      value = "5432"
    }
    "DB_NAME" = {
      value = "postgres"
    }
    "DB_USER" = {
      value = "postgres.${supabase_project.db.id}"
    }
    "DB_PASSWORD" = {
      value = var.supabase_db_password
    }
    "SUPABASE_URL" = {
      value = "https://${supabase_project.db.id}.supabase.co"
    }
  }
}