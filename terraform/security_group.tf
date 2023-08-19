# ---------------------------------------------
# Security Group
# ---------------------------------------------
### ALB Security Group
resource "aws_security_group" "alb_sg" {
  name        = "${var.project}-${var.environment}-alb-sg"
  description = "Security Group for ALB"
  vpc_id      = aws_vpc.vpc.id

  tags = {
    Name    = "${var.project}-${var.environment}-alb-sg"
    Project = var.project
    Env     = var.environment
  }
}

### Ingress rule for ALB
resource "aws_security_group_rule" "alb_ingress" {
  security_group_id = aws_security_group.alb_sg.id
  type              = "ingress"
  protocol          = "tcp"
  from_port         = 443
  to_port           = 443
  cidr_blocks       = ["0.0.0.0/0"]
}

### Egress rule for ALB
resource "aws_security_group_rule" "alb_egress" {
  security_group_id = aws_security_group.alb_sg.id
  type              = "egress"
  protocol          = "-1"
  from_port         = 0
  to_port           = 0
  cidr_blocks       = ["0.0.0.0/0"]
}

### ECS Security Group
resource "aws_security_group" "ecs_sg" {
  name        = "${var.project}-${var.environment}-ecs-sg"
  description = "Security Group for ECS"
  vpc_id      = aws_vpc.vpc.id

  tags = {
    Name    = "${var.project}-${var.environment}-ecs-sg"
    Project = var.project
    Env     = var.environment
  }
}

### Ingress rule for ECS
resource "aws_security_group_rule" "ecs_ingress" {
  security_group_id        = aws_security_group.ecs_sg.id
  type                     = "ingress"
  protocol                 = "tcp"
  from_port                = 80
  to_port                  = 80
  source_security_group_id = aws_security_group.alb_sg.id
}

### Egress rule for ECS
resource "aws_security_group_rule" "ecs_egress" {
  security_group_id = aws_security_group.ecs_sg.id
  type              = "egress"
  protocol          = "-1"
  from_port         = 0
  to_port           = 0
  cidr_blocks       = ["0.0.0.0/0"]
}

### RDS Security Group
resource "aws_security_group" "rds_sg" {
  name        = "${var.project}-${var.environment}-rds-sg"
  description = "Security Group for RDS"
  vpc_id      = aws_vpc.vpc.id

  tags = {
    Name    = "${var.project}-${var.environment}-rds-sg"
    Project = var.project
    Env     = var.environment
  }
}

### Ingress rule for RDS
resource "aws_security_group_rule" "db_ingress_mysql_from_ecs" {
  security_group_id        = aws_security_group.rds_sg.id
  type                     = "ingress"
  protocol                 = "tcp"
  from_port                = 3306
  to_port                  = 3306
  source_security_group_id = aws_security_group.ecs_sg.id
}

### ECS Security Group for Endpoint
resource "aws_security_group" "ecs_sg_for_endpoint" {
  name        = "${var.project}-${var.environment}-ecs-sg-for-endpoint"
  description = "ECS Security Group for ECR and CloueWatch Endpoint"
  vpc_id      = aws_vpc.vpc.id

  tags = {
    Name    = "${var.project}-${var.environment}-ecs-sg-for-endpoint"
    Project = var.project
    Env     = var.environment
  }
}

### Ingress rule for ECS Endpoint
resource "aws_security_group_rule" "ecs_endpoint_ingress" {
  security_group_id = aws_security_group.ecs_sg_for_endpoint.id
  type              = "ingress"
  protocol          = "tcp"
  from_port         = 443
  to_port           = 443
  cidr_blocks       = ["0.0.0.0/0"]
}

### Egress rule for ECS Endpoint
resource "aws_security_group_rule" "ecs_endpoint_egress" {
  security_group_id = aws_security_group.ecs_sg_for_endpoint.id
  type              = "egress"
  protocol          = "-1"
  from_port         = 0
  to_port           = 0
  cidr_blocks       = ["0.0.0.0/0"]
}
