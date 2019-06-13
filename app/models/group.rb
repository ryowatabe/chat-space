class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :messeages
  validates :name, presence: true
  validates :name, uniqueness: true

  def show_last_message
    if (last_message = messeages.last).present?
      last_message.messeages? ? last_message.messeages : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end
