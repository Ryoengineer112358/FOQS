# ---------------------------------------------
# ECR Repository
# ---------------------------------------------
### ECR Repository for Laravel App
resource "aws_ecr_repository" "laravel_app_repository" {
  name = "${var.project}-${var.environment}-laravel-app-repository"
}

### ECR Repository for Next.js frontend
resource "aws_ecr_repository" "nextjs_frontend_repository" {
  name = "${var.project}-${var.environment}-nextjs-frontend-repository"
}

### ECR Repository for Nginx
resource "aws_ecr_repository" "nginx_repository" {
  name = "${var.project}-${var.environment}-nginx-repository"
}
