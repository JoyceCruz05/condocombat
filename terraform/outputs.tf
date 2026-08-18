output "backend_url" {
  value       = render_web_service.backend.url
  description = "URL do Backend no Render"
}

output "frontend_url" {
  value       = render_web_service.frontend.url
  description = "URL do Frontend no Render"
}

output "landing_url" {
  value       = data.netlify_site.landing.url
  description = "URL da Landing Page no Netlify"
}