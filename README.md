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
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
- has many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false |

### Association
- has many :user  :through:members
- has many :members
- has many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message|string|null: true|
|image_url|string|null: true|
|member_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs to :user
- belongs to :group
- belongs to :member