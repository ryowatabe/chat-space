# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|String|null: false, unique: true, index: true|
|e-mail|String|null: false, unique: true|
|password|String| null: false|

### Association
- has many :groups, through:members
- has many :members
- has many :messages


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false |

### Association
- has many :users  :through:members
- has many :members
- has many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message|string|null: true|
|image_url|string|null: true|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs to :user
- belongs to :group