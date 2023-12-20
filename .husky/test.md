# Minigame, Renewed.

![Header](minigamerenewal.jpg)

---

# MINIGAME
このレポジトリは、ねこぞうねこサーバーのミニゲームサーバーリニューアルに向け、様々なプログラムを保管しているレポジトリです。
主に Team Nekozouneko Dev による開発を行っております。

## How to Use
このレポジトリは、GitHub_AutoUpdate.skによる自動更新システムを導入しているレポジトリのひとつです。
ミニゲームロビーサーバーにて、`/github`と実行すると、どのファイルのコミットを自動更新するかを選択します。
ハッシュ値の変化から更新をするため、1回目は更新がされません。2回目以降更新がなされますので、ご了承ください。

## Available Systems
ロビーサーバーに入っているSkriptの詳細を簡潔的にまとめたものです。
```bash
bedwars.sk # towa0111さんが開発しているベッドウォーズSkript
bridge.sk # towa0111さんが作ったBridge Skript
docker_bot.sk # Dockerの操作を行うためのDiscord Bot。うねこ鯖ミニゲーム部に導入。
docker_libraries.sk # Dockerの制御を行う関数を構成するSkript
ffa.sk # Yeahnが作っている製作途中のFFA
GitHub_AutoUpdate.sk # GitHubの更新を受け取り自動で更新するためのSkript
hatowohaatonihenkanwww.sk # チャットで「鳩」と打つと「♡」に変換されるSkript。もちろんおふざけ枠で意味はない。
instance.sk # Dockerの操作をマイクラ内で行えるようにするSkript (/instance)
libraries.sk # サイドバーや名前のランク付けなどを行っているSkript
nkznite.sk # Yeahnによる製作途中のフォートナイトのパクリSkript
root.sk # ロビー用システム。高度制限やアイテム、参加メッセージなど。
skywars.sk # Yeahnが作ったSkyWarsのSkript
```

## What is Server-separation System?
ミニゲームサーバーでは、ゲーム1試合につき、1サーバーを用意する方式を採用しています。
使用方法を、サポートセンター対応のAdmin様用と、開発者用のものを用意しております。
状況に応じてお読みください。

### Admin様へ
どれかのインスタンスにてエラーが起きた際には
サーバー内で `/instance list` を実行すると、インスタンスの一覧を得ることができます。
また、Bungeecord内に組み込みを行っているため
プレイヤーがどのインスタンスにいるかは`/find`コマンド等で知ることができます。
Adminの皆様にはインスタンスが開始された時点でOP権限を付与するようにしておりますので、
そのまま/serverで接続ができます。また、インスタンスは停止をすることができ、
`/instance stop <名前>` を実行すると特定のインスタンスの停止をすることができます。
サーバーの停止からデータの破棄を含め、最終的に30秒ほどかかりますが、最も簡潔的な対処ができます。

### 開発者様へ
当サーバーでは、Dockerによるサーバー操作を行っており、こちらの操作はすべてdocker_libraries.skにて処理をしています。
基本的には、 docker_process() 関数に引数を付けることで処理をさせることができます。
指令には2種類あり、インスタンス一覧を取得する `getcontainers` 指令と、インスタンスを作成する `start` 指令があります。
また、docker_process()関数にて行われる一連の動作を「プロセス」とし、docker_process()関数では返り値としプロセスIDが設定されています。
プロセスはステータスコードがあり、これは `{docker.processinfo::<PROCESS ID>::status}` に格納されています。
```
0: プロセスの実行中
1: プロセスが正常に終了
2: 同じプロセスが他のプロセスによりされているため終了
3: 時間のかかりすぎ（タイムアウト）にて終了
4: 不明なエラーにて終了
```
また、実行結果を変数に格納するものもあり、 これは `{docker.processinfo::<PROCESS ID>::result[ ::*} or } ]` に格納されてます。
実行結果を返すものとし、`getcontainers`指令では `(割愛)::result::*}` にインスタンス一覧が入り、`start`指令では、`(割愛::result}` にサーバー名が入ります。

インスタンスの停止は、サーバー名を必要とするため、別の関数として扱っております。
停止の際は `docker_processstop([SERVER NAME HERE])` 関数を使用してください。
このプロセスでは、実行結果はありません。

また、一連の動作はミニゲームロビーサーバー内の /instance でも可能です。
```bash
/instance list # 一覧表示
/instance start # インスタンス作成
/instance stop # インスタンス停止
```

## Global Variables
ミニゲームサーバー内では、各サーバーとロビーのデータシステムとの連携を行うため、グローバル変数システムというのが存在します。
グローバル変数は関数で扱われており、基本的に2秒程度でデータの更新及び取得ができるようにしております。
これが関数となります。
```bash
dockerlib_database(ACTION, TABLE, CELL, TYPE, DATA)
```
以下は引数の説明となっています。

### ACTION
ACTIONは、データベースにどのような動作をさせるかを指定するものです。
関数に送ることができるリクエストの種類は限られており、 `GET` `SET` `DELETE` の3つとなります。
名前の通り、`GET`はデータの取得、`SET`はデータの設定、`DELETE`はデータの削除に使用できます。

### TABLE
データを保存する際に使うテーブル、例にするとマンションの部屋番号のようなものです。
そのデータをどの部屋に格納するかを指定します。

### CELL
データを保存する具体的な場所です。マンションの部屋まではきたはいいものの、データをタンスの中に入れるのか、はたまた冷凍庫の中に入れるのか。
そのようなものを指定します。
`GET` リクエストでは、部屋の中のすべての物の出力するため、特別記号 `*` が使用できます。

### TYPE
TYPEは2種類あり、テーブル全体で保存する `SERVER` と、プレイヤーごとに保存する `PLAYER` があります。
`SERVER` では、部屋全体に保存するものですが、 `PLAYER` はその部屋の住民ごとに指定できます。

### DATA
ここが一番複雑です。ACTIONとTYPEごとにやることが違います。
```bash
ACTION が GET または DELETE でかつ SERVER: 空のJSONを送る
ACTION が GET または DELETE でかつ PLAYER: {"uuid":" <UUID> "} の形のJSONを送る
ACTION が SET でかつ SERVER: {"data": <data> } の形のJSONを送る
ACTION が SET でかつ PLAYER: {"data": <data>,"uuid":" <UUID> "} の形のJSONを送る

# <data> はデータタイプによりダブルクォーテーションの有無が異なる。
# UUID は常にstring型で送る。
```
---
### レスポンス

### 受け取り方
`dockerlib_database` 関数の返り値として、プロセスIDが返ってきますので、 `./varres/<プロセスID>.json` を参照してください。
また、重複を回避するため取得後は `sync delete file path "./varres/<プロセスID>.json"` で削除してください。

### 内容
返答はすべてJSON型で帰ってきます。
`{"status"}` が `success` であれば動作が成功したことを表し、 `{"status"}` が `error` であれば何らかのエラーが発生したこととなります。
エラーメッセージおよびダイアログは ``{"text"}`` に格納されていますので、そちらをご確認ください。

`GET` で取得したデータは `{"data"}` で帰ってきます。また、特別記号 `*` を指定した場合は`{"data"}`の中身もJSONですので、2重でのパースをお願いいたします。

グローバル変数の説明は以上です。


---

## 開発者クレジット (敬称略)
### Yeahn - Leader & Developer & Admin
ミニゲーム制作にあたって主導になってる人。このページの編集者。
作品としては、SkyWarsが挙げられる。
### runq_JP - Developer & Admin
めんどくさがり屋な開発者。開発力はかなりある。
主な作品としてはFFAPvPが挙げられる。
### towa0111 - Developer
PvPが強い開発者。BedWarsを制作中。ちなみにBedWarsは嫌いらしい。
### onigiri3425 - Developer
新入の開発者さん。PvP力はサバイバル鬼ごっこなどを見る限りかなりありそう。
まだ何も仕事は割り当てていないが、今後割り振る予定である。
### amedouhu - Developer
珍しいJavaの開発者さん。主な作品としては DuelsPlugin が挙げられる。
今回は他の仕事があったため、ミニゲーム開発に割り当てていない。
### shuntarokik0423 - ????
ちょっとわからない。