# E-Commerce-Webapp-with-Stripe-Sync_Front

## 開発環境の構築

開発環境を Docker を使用して立ち上げることが可能。以下、その手順。
※以下はフロントエンドのたちあげ。バックエンドの立ち上げは以下リンクに記述。
[https://github.com/Karukan0814/SocialNetworkingService_back]

1. 当該レポジトリをローカル環境にコピー

2. 環境変数ファイルの準備　※ここはまだ必要ない
   　.env ファイルをルートフォルダ直下に用意し、以下を記述して保存する。

```




```

3. Docker ビルド
   　以下を実行してビルド。なお、以下は Docker がインストール済みであることを前提とする。

```
docker build -t my-react-app .
```

4. Docker 立ち上げ
   　以下を実行してコンテナを立ち上げ。

```
docker run -p 3000:3000 my-react-app
```

5. 動作確認
   　[http://localhost:3000/](http://localhost:3000/)にアクセスして動作確認