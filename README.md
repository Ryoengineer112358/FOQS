# 概要
- アプリ名：**FOQS**(Fast-Online-Question-Service)
- サービス内容：難関大学の一流講師の中から講師を選んで質問できるアプリ  
- 対象：受験生

# 使用技術
- フロントエンド
  - Next.js / TypeScript / React / Material-UI (MUI)
  - ESLint (リンター)
  - Prettier (フォーマッター)

- バックエンド
  - PHP / Laravel
  - PHP-CS-Fixer (フォーマッター)

- データベース
  - MySQL

- インフラ
  - AWS(VPC / ECS on Fargate / ECR / CodeDeploy / ALB / CloudFront / ACM / Route53 / RDS / S3 / ElastiCache for Redis)
  - Terraform(IaC)

- テスト
  - フロントエンド: Jest / react-test-renderer
  - バックエンド: PHPUnit

- CI/CD
  - GitHub Actions

- 開発環境
  - Docker / Docker-compose

- バージョン管理
  - Git / GitHub

# 作成した背景
私は過去8年間、小学生から浪人生までのあらゆる受験生に集団指導・個別指導を行ってきました。  
特に大学受験の個別指導を行っている際、受験生の学力が伸び悩む原因の一つとして、  
- **優秀な講師に気軽に質問できる環境が整っていない**

という課題を感じていました。

本アプリケーションは、以下の問題点を解決することを目的として開発されました。
- **受験生が全国どこからでも、難関大学に合格経験を持つ一流講師に気軽に質問できるプラットフォームを提供する**

## コードの整形

### フロントエンド
ESLintとPrettierを使用してコードの品質を確保します。  
フロントエンドのルートディレクトリ (`FOQS/frontend`) で以下のコマンドを実行してコードを整形します。

```sh
npm run format
```

### バックエンド
PHP-CS-Fixerを使用してコードの品質を確保します。  
バックエンドのルートディレクトリ (`FOQS/laravel-project`) で以下のコマンドを実行してコードを整形します。

```sh
docker compose exec app ./vendor/bin/php-cs-fixer fix
```

### コミット前の確認
コードが整形されていることを確認した後、リポジトリにコミットします。
