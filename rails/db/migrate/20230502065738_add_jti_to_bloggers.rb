class AddJtiToBloggers < ActiveRecord::Migration[6.1]
  def change
    add_column :bloggers, :jti, :string
    Blogger.all.each { |user| user.update_column(:jti, SecureRandom.uuid) }
    change_column_null :bloggers, :jti, false
    add_index :bloggers, :jti, unique: true
  end
end
