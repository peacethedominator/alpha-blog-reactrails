class Blogger < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
  def jwt_payload
    super.merge('foo' => 'bar')
  end
  has_many :follows, foreign_key: :follower_id
  has_many :followings, through: :follows, source: :followed     
  has_many :reverse_follows, foreign_key: :followed_id, class_name: 'Follow', dependent: :destroy
  has_many :followers, through: :reverse_follows, source: :follower
  
  has_many :articles, dependent: :destroy 
end
