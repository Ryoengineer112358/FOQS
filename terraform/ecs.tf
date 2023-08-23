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
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name      = "laravel-app",
      image     = "${aws_ecr_repository.laravel_app_repository.repository_url}:latest",
      memory    = 512,
      essential = true,
      portMappings = [
        {
          containerPort = 9000,
          protocol      = "tcp"
        }
      ]
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
      ],
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs_logs.name
          "awslogs-region"        = "ap-northeast-1"
          "awslogs-stream-prefix" = "laravel-app"
        }
      }
    },
    {
      name      = "nextjs-frontend",
      image     = "${aws_ecr_repository.nextjs_frontend_repository.repository_url}:latest",
      memory    = 512,
      essential = true,
      portMappings = [
        {
          containerPort = 3000,
          protocol      = "tcp"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs_logs.name
          "awslogs-region"        = "ap-northeast-1"
          "awslogs-stream-prefix" = "nextjs-frontend"
        }
      }
    },
    {
      name      = "nginx",
      image     = "${aws_ecr_repository.nginx_repository.repository_url}:latest",
      memory    = 512,
      essential = true,
      portMappings = [
        {
          containerPort = 80,
          protocol      = "tcp"
        }
      ]
      dependsOn = [
        {
          containerName = "laravel-app",
          condition     = "START"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs_logs.name
          "awslogs-region"        = "ap-northeast-1"
          "awslogs-stream-prefix" = "nginx"
        }
      }
    }
  ])
}

### Service
resource "aws_ecs_service" "service" {
  name                              = "${var.project}-${var.environment}-ecs-service"
  cluster                           = aws_ecs_cluster.cluster.id
  task_definition                   = aws_ecs_task_definition.task_definition.arn
  desired_count                     = 2
  launch_type                       = "FARGATE"
  platform_version                  = "1.4.0"
  health_check_grace_period_seconds = 600

  network_configuration {
    assign_public_ip = true
    subnets          = [aws_subnet.public_subnet_1a.id, aws_subnet.public_subnet_1c.id]
    security_groups  = [aws_security_group.ecs_sg.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.blue_tg.arn
    container_name   = "nginx"
    container_port   = 80
  }

  deployment_controller {
    type = "CODE_DEPLOY"
  }

  lifecycle {
    ignore_changes = [task_definition]
  }
}

### CodeDeploy
resource "aws_codedeploy_app" "codedeploy_app" {
  compute_platform = "ECS"
  name             = "${var.project}-${var.environment}-codedeploy-app"
}

resource "aws_codedeploy_deployment_group" "codedeploy_dg" {
  app_name               = aws_codedeploy_app.codedeploy_app.name
  deployment_group_name  = "${var.project}-${var.environment}-codedeploy-dg"
  service_role_arn       = aws_iam_role.ecs_code_deploy_role.arn
  deployment_config_name = "CodeDeployDefault.ECSAllAtOnce"

  auto_rollback_configuration {
    enabled = true
    events  = ["DEPLOYMENT_FAILURE"]
  }

  blue_green_deployment_config {
    deployment_ready_option {
      action_on_timeout = "CONTINUE_DEPLOYMENT"
    }

    terminate_blue_instances_on_deployment_success {
      action                           = "TERMINATE"
      termination_wait_time_in_minutes = 5
    }
  }

  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "BLUE_GREEN"
  }

  ecs_service {
    cluster_name = aws_ecs_cluster.cluster.name
    service_name = aws_ecs_service.service.name
  }

  load_balancer_info {
    target_group_pair_info {
      prod_traffic_route {
        listener_arns = [aws_lb_listener.https.arn]
      }

      target_group {
        name = aws_lb_target_group.blue_tg.name
      }

      target_group {
        name = aws_lb_target_group.green_tg.name
      }
    }
  }
}
