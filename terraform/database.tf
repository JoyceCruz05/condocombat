resource "supabase_project" "db" {
  organization_id = var.supabase_organization_id # ou var.supabase_org_id conforme seu variables.tf
  name            = "condocombat-db"
  db_pass         = var.supabase_db_password
  region          = "sa-east-1"
  instance_size   = "micro"
}