# 5. 技術スタック指針

## Python
- PEP8 + タイプヒント + mypy
- pytest・coverage 80% 以上
- poetry / pipenv で依存管理

## Next.js & Vercel
- React + TypeScript + Tailwind
- `pnpm` を使用
- Vercel Preview で CI/CD

## Stripe & Supabase
- Webhook 検証必須
- Supabase Auth / Realtime を活用し、変更時は ER 図も更新

## AWS & Cloudflare
- 最小権限 IAM
- Cloudflare CDN + WAF でパフォーマンス & セキュリティ
