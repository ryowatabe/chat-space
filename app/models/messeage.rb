class Messeage < ApplicationRecord
  belongs_to :user
  belongs_to :group
  mount_uploader :image, ImageUploader
  validates :messeages, presence: true, unless: :image?
end
