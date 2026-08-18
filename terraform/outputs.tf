output "database_host" {
  value       = "db.${supabase_project.db.id}.supabase.co"
  description = "Host do Banco de Dados PostgreSQL no Supabase"
}

output "backend_url" {
  value       = render_web_service.backend.url
  description = "URL do Backend no Render"
}

output "frontend_url" {
  value       = render_web_service.frontend.url
  description = "URL do Frontend no Render"
}

output "landing_url" {
  value       = data.netlify_site.landing.ssl_url
  description = "URL da Landing Page no Netlify"
}