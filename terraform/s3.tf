# ---------------------------------------------
# S3 Static Bucket for Images
# ---------------------------------------------
resource "aws_s3_bucket" "s3_static_bucket" {
  bucket = "${var.project}-${var.environment}-static-bucket"
}

### S3 Public Access Block
resource "aws_s3_bucket_public_access_block" "s3_static_bucket" {
  bucket = aws_s3_bucket.s3_static_bucket.id
}

### S3 Bucket Policy
resource "aws_s3_bucket_policy" "s3_static_bucket" {
  bucket = aws_s3_bucket.s3_static_bucket.id
  policy = data.aws_iam_policy_document.s3_static_bucket.json
}

data "aws_iam_policy_document" "s3_static_bucket" {
  statement {
    effect  = "Allow"
    actions = ["s3:GetObject"]
    resources = [
      "${aws_s3_bucket.s3_static_bucket.arn}/*",
      aws_s3_bucket.s3_static_bucket.arn
    ]
    principals {
      type        = "AWS"
      identifiers = [aws_iam_role.ecs_task_role.arn]
    }
  }
}
