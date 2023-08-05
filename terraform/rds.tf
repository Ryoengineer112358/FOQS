# ---------------------------------------------
# RDS parameter group
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
# RDS subnet group
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
