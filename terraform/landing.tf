data "netlify_site" "landing" {
  name      = var.netlify_site_name
  team_slug = var.dockerhub_username
}

resource "netlify_environment_variable" "landing_api_url" {
  site_id = data.netlify_site.landing.id
  key     = "PUBLIC_API_URL"
  values = [
    {
      context = "all"
      value   = render_web_service.backend.url
    }
  ]
}