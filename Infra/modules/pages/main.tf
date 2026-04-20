
resource "cloudflare_pages_project" "frontend" {
  account_id        = var.account_id
  name              = var.project_name_fe
  production_branch = var.production_branch

}
resource "cloudflare_pages_project" "backend" {
  account_id        = var.account_id
  name              = var.project_name_be
  production_branch = var.production_branch

  deployment_configs {
    production {
      d1_databases = var.d1_databases
    }
    preview {
      d1_databases = var.d1_databases
    }
  }
}
