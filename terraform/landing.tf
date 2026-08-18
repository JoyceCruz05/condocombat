data "netlify_site" "landing" {
  name = var.netlify_site_name
}

# Gerenciamento de variáveis da Landing Page via Provider Netlify
resource "netlify_environment_variable" "landing_api_url" {
  site_id = data.netlify_site.landing.id
  key     = "PUBLIC_API_URL"
  values = [
    {
      value = render_web_service.backend.url
    }
  ]
}

# Deploy dos arquivos estáticos compilados pelo Astro
resource "netlify_deploy" "landing_deploy" {
  site_id   = data.netlify_site.landing.id
  directory = "${path.module}/../landing/dist"
}