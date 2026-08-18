data "netlify_site" "landing" {
  name = var.netlify_site_name
}

# Gerenciamento de variáveis da Landing Page via Provider Netlify
resource "netlify_environment_variable" "landing_api_url" {
  site_id = data.netlify_site.landing.id
  key     = "PUBLIC_API_URL"
  values = [
    {
      value = "https://${render_web_service.backend.domain_name}"
    }
  ]
}