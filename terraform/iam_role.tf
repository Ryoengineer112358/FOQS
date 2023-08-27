# ---------------------------------------------
# IAM Roles for ECS
# ---------------------------------------------

### ECS Task Execution Role
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.project}-${var.environment}-ecs-task-execution-role"

  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "",
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "ecs-tasks.amazonaws.com"
        },
        "Action" : "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

### ECS Task Role
resource "aws_iam_role" "ecs_task_role" {
  name = "${var.project}-${var.environment}-ecs-task-role"

  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "",
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "ecs-tasks.amazonaws.com"
        },
        "Action" : "sts:AssumeRole"
      }
    ]
  })
}

### ECS Policy for CloudWatch Logs
resource "aws_iam_policy" "ecs_logging_policy" {
  name        = "ECSLoggingToCloudWatch"
  description = "Allows ECS tasks to push logs to CloudWatch"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:DescribeLogStreams"
        ],
        Effect   = "Allow",
        Resource = "*"
      }
    ]
  })
}

# Attach the logging policy to the ECS task execution role
resource "aws_iam_role_policy_attachment" "ecs_logging_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = aws_iam_policy.ecs_logging_policy.arn
}

# ---------------------------------------------
# IAM Role for CodeDeploy
# ---------------------------------------------

### CodeDeploy Role for ECS
resource "aws_iam_role" "ecs_code_deploy_role" {
  name = "${var.project}-${var.environment}-ecs-codedeploy-role"

  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "",
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "codedeploy.amazonaws.com"
        },
        "Action" : "sts:AssumeRole"
      }
    ]
  })
}

### Attach the necessary policy for CodeDeploy with ECS
resource "aws_iam_role_policy_attachment" "ecs_code_deploy_attachment" {
  role       = aws_iam_role.ecs_code_deploy_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSCodeDeployRoleForECSLimited"
}

# ---------------------------------------------
# IAM Role for S3
# ---------------------------------------------

### Policy to allow specific S3 access
resource "aws_iam_policy" "s3_access_policy" {
  name        = "${var.project}-${var.environment}-s3-access-policy"
  description = "Policy to allow specific users to access S3 bucket"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "s3:GetObject",
          "s3:PutObject"
        ],
        "Resource" : [
          "${aws_s3_bucket.s3_static_bucket.arn}",
          "${aws_s3_bucket.s3_static_bucket.arn}/*"
        ]
      }
    ]
  })
}

### Attach S3 access policy to the ECS task role
resource "aws_iam_role_policy_attachment" "ecs_task_s3_access_attachment" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.s3_access_policy.arn
}
