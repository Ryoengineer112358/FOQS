# ---------------------------------------------
# ECS
# ---------------------------------------------
### Cluster
resource "aws_ecs_cluster" "cluster" {
  name = "${var.project}-${var.environment}-ecs-cluster"
}

### Task Definition
resource "aws_ecs_task_definition" "task_definition" {
  family                   = "${var.project}-${var.environment}-ecs-task"
  cpu                      = 512
  memory                   = 2048
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]

  container_definitions = jsonencode([
    {
      name      = "laravel-app",
      image     = "${aws_ecr_repository.laravel_app_repository.repository_url}:latest",
      memory    = 512,
      essential = true,
      environment = [
        {
          name  = "DB_HOST",
          value = aws_db_instance.mysql.endpoint
        },
        {
          name  = "DB_PORT",
          value = "3306"
        },
        {
          name  = "DB_DATABASE",
          value = "${var.project}_${var.environment}_db"
        },
        {
          name  = "DB_USERNAME",
          value = "admin"
        },
        {
          name  = "DB_PASSWORD",
          value = random_string.db_password.result
        }
      ]
    },
    {
      name      = "nextjs-frontend",
      image     = "${aws_ecr_repository.nextjs_frontend_repository.repository_url}:latest",
      memory    = 512,
      essential = true,
    },
    {
      name      = "nginx",
      image     = "nginx:latest",
      memory    = 512,
      essential = true,
      portMappings = [
        {
          containerPort = 80,
          hostPort      = 80,
          protocol      = "tcp"
        }
      ]
      dependsOn = [
        {
          containerName = "laravel-app",
          condition     = "START"
        }
      ]
    }
  ])
}
