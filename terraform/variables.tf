# variables.tf

variable "dockerhub_username" {
  type        = string
  description = "Usuário do DockerHub onde as imagens foram publicadas no CI"
  default     = "joycecruz05"
}

variable "supabase_access_token" {
  type        = string
  sensitive   = true
  description = "Token de acesso da API do Supabase"
}

variable "supabase_organization_id" {
  type        = string
  description = "Slug da organização Supabase com permissão para criar projetos"
}

variable "supabase_db_password" {
  type        = string
  sensitive   = true
  description = "Senha do banco de dados no Supabase"
  default     = "devcicd@2020"
}

variable "render_api_key" {
  type        = string
  sensitive   = true
  description = "Chave de API do Render"
}

variable "render_owner_id" {
  type        = string
  description = "ID do proprietário/usuário no Render"
}

variable "backend_secret_key" {
  type        = string
  sensitive   = true
  description = "Chave secreta da aplicação backend"
}

variable "netlify_api_token" {
  type        = string
  sensitive   = true
  description = "Token de acesso pessoal da Netlify"
}

variable "netlify_site_name" {
  type        = string
  description = "Nome do site na Netlify"
  default     = "condocombat-landing-joyce"
}