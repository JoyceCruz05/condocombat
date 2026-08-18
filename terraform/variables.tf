variable "supabase_access_token" {
  type      = string
  sensitive = true
}

variable "supabase_org_id" {
  type = string
}

variable "supabase_db_password" {
  type      = string
  sensitive = true
}

variable "render_api_key" {
  type      = string
  sensitive = true
}

variable "render_owner_id" {
  type = string
}

variable "netlify_auth_token" {
  type      = string
  sensitive = true
}

variable "netlify_site_name" {
  type = string
}

variable "dockerhub_username" {
  type = string
}

variable "backend_secret_key" {
  type      = string
  sensitive = true
}