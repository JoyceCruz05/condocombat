output "backend_url" {
  value       = "https://${render_web_service.backend.domain_name}"
  description = "URL do Backend no Render"
}

output "frontend_url" {
  value       = "https://${render_web_service.frontend.domain_name}"
  description = "URL do Frontend no Render"
}

output "landing_url" {
  value       = netlify_site.landing.domain_name
  description = "URL da Landing Page no Netlify"
}