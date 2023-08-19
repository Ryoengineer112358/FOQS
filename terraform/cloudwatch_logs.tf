# ---------------------------------------------
# Cloudwatch Logs
# ---------------------------------------------

### Log Group for ECS
resource "aws_cloudwatch_log_group" "ecs_logs" {
  name              = "${var.project}-${var.environment}-ecs-logs"
  retention_in_days = 30
}
