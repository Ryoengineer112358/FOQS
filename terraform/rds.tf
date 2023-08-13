# ---------------------------------------------
# RDS Parameter Group
# ---------------------------------------------
resource "aws_db_parameter_group" "mysql_parameter_group" {
  name   = "${var.project}-${var.environment}-mysql-parameter-group"
  family = "mysql8.0"

  parameter {
    name  = "character_set_database"
    value = "utf8mb4"
  }

  parameter {
    name  = "character_set_server"
    value = "utf8mb4"
  }
}

# ---------------------------------------------
# RDS Subnet Group
# ---------------------------------------------
resource "aws_db_subnet_group" "mysql_subnet_group" {
  name = "${var.project}-${var.environment}-mysql-subnet-group"
  subnet_ids = [
    aws_subnet.private_subnet_1a.id,
    aws_subnet.private_subnet_1c.id
  ]

  tags = {
    Name    = "${var.project}-${var.environment}-mysql-subnet-group"
    Project = var.project
    Env     = var.environment
  }
}

# ---------------------------------------------
# RDS Instance
# ---------------------------------------------
resource "random_string" "db_password" {
  length  = 16
  special = false
}

resource "aws_db_instance" "mysql" {
  engine         = "mysql"
  engine_version = "8.0.26"

  identifier = "${var.project}-${var.environment}-mysql"

  username = "admin"
  password = random_string.db_password.result

  instance_class = "db.t2.micro"

  allocated_storage     = 20
  max_allocated_storage = 50
  storage_type          = "gp2"
  storage_encrypted     = true

  multi_az               = true
  db_subnet_group_name   = aws_db_subnet_group.mysql_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  publicly_accessible    = false
  port                   = 3306

  name                 = "${var.project}-${var.environment}-db"
  parameter_group_name = aws_db_parameter_group.mysql_parameter_group.name

  backup_window              = "04:00-05:00"
  backup_retention_period    = 7
  maintenance_window         = "Mon:05:00-Mon:08:00"
  auto_minor_version_upgrade = false

  deletion_protection = true
  skip_final_snapshot = false

  apply_immediately = false

  tags = {
    Name    = "${var.project}-${var.environment}-mysql"
    Project = var.project
    Env     = var.environment
  }
}
