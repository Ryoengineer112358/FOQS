# -------------------------------------------
# AWS Certificate Manager
# -------------------------------------------
### HTTPS Certificate for ALB
resource "aws_acm_certificate" "tokyo_cert" {
  domain_name               = data.aws_route53_zone.hostzone.name
  validation_method         = "DNS"
  subject_alternative_names = ["api.foqs.net"]

  tags = {
    Name    = "${var.project}-${var.environment}-tokyo-cert"
    Project = var.project
    Env     = var.environment
  }

  lifecycle {
    create_before_destroy = true
  }
}

### DNS Validation for HTTPS Certificate
resource "aws_acm_certificate_validation" "tokyo_cert_validation" {
  certificate_arn         = aws_acm_certificate.tokyo_cert.arn
  validation_record_fqdns = [for r in aws_route53_record.route53_acm_dns_resolve : r.fqdn]
}
