class CreateMesseages < ActiveRecord::Migration[5.0]
  def change
    create_table :messeages do |t|
      t.string  :messeages
      t.string  :image
      t.references  :user,  foreign_key: true
      t.references  :group, foreign_key: true
      t.timestamps
    end
  end
end
