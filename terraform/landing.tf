# Busca a referência do site da Landing Page na Netlify
data "netlify_site" "landing" {
  name      = var.netlify_site_name
  team_slug = "joycecruz05"
}

# Configura a variável de ambiente PUBLIC_APP_URL com a URL gerada para o Frontend (Render)
resource "netlify_environment_variable" "landing_public_url" {
  site_id   = data.netlify_site.landing.id
  key       = "NEXT_PUBLIC_FRONTEND_URL"

  values = [
    {
      value   = render_web_service.frontend.url
      context = "all"
    }
  ]
}
# Fazer o deploy dos arquivos compilados (landing/dist) gerados no CI via Terraform
resource "terraform_data" "landing_deploy" {
  triggers_replace = [
    data.netlify_site.landing.id,
    render_web_service.frontend.url
  ]

  provisioner "local-exec" {
    interpreter = ["powershell", "-Command"]
    command     = "Compress-Archive -Path ..\\landing\\dist\\* -DestinationPath ..\\site.zip -Force; curl.exe -s -X POST -H 'Content-Type: application/zip' -H 'Authorization: Bearer ${var.netlify_api_token}' --data-binary '@..\\site.zip' https://api.netlify.com/api/v1/sites/${data.netlify_site.landing.id}/deploys"
  }

  depends_on = [
    netlify_environment_variable.landing_public_url
  ]
}