# 3. テスト & QA

- **独立性** : 各テストは単体で通ること。グローバル状態を持たない。
- **失敗ハンドリング** : 2 連続失敗で作業停止 → 状況整理 → ユーザー相談。
- **カバレッジ目標** : Python 80% / TypeScript 70%。

### 代表的コマンド
```bash
yarn build
yarn test:unit src/spec/utils/example.spec.ts
```

