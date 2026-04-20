variable "account_id" {
  description = "Cloudflare Account ID"
  type        = string
}

variable "project_name_fe" {
  description = "Name of the Pages project"
  type        = string
}

variable "project_name_be" {
  description = "Name of the Pages project"
  type        = string
}

variable "production_branch" {
  description = "Production branch name"
  type        = string
  default     = "main"
}

variable "github_owner" {
  description = "GitHub repository owner"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
}

variable "d1_databases" {
  description = "Map of D1 database bindings"
  type        = map(string)
  default     = {}
}
