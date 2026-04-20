variable "cloudflare_api_token" {
  description = "El API Token de Cloudflare"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "El Account ID de Cloudflare"
  type        = string
}


variable "project_name_fe" {
  description = "El nombre del proyecto de Cloudflare Pages Frontend"
  type        = string
}

variable "project_name_be" {
  description = "El nombre del proyecto de Cloudflare Pages Backend"
  type        = string
}

variable "database_name" {
  description = "El nombre de la base de datos D1"
  type        = string
}

variable "github_owner" {
  description = "El usuario/organización de GitHub"
  type        = string
  default     = "internetgdl"
}

variable "github_repo" {
  description = "El nombre del repositorio de GitHub"
  type        = string
  default     = "p10"
}
