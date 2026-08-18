resource "supabase_project" "db" {
  organization_id   = var.supabase_org_id
  name              = "condocombat-db"
  database_password = var.supabase_db_password
  region            = "sa-east-1"
  instance_size     = "nano"
}