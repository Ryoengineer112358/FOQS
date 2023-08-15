# -------------------------------------------
# Route53
# -------------------------------------------
### Create a Route53 Hosted Zone
data "aws_route53_zone" "hostzone" {
  name = "foqs.net"
}

### Create an A record for ALB
resource "aws_route53_record" "alb" {
  zone_id = data.aws_route53_zone.hostzone.zone_id
  name    = data.aws_route53_zone.hostzone.name
  type    = "A"

  alias {
    name                   = aws_lb.alb.dns_name
    zone_id                = aws_lb.alb.zone_id
    evaluate_target_health = true
  }
}

### Create a CNAME record for ALB
resource "aws_route53_record" "route53_acm_dns_resolve" {
  for_each = {
    for dvo in aws_acm_certificate.tokyo_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  allow_overwrite = true
  zone_id         = data.aws_route53_zone.hostzone.zone_id
  name            = each.value.name
  type            = each.value.type
  records         = [each.value.record]
  ttl             = 60
}
