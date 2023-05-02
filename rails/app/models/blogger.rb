class Blogger < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :follows, foreign_key: :follower_id
  has_many :followings, through: :follows, source: :followed     
  has_many :reverse_follows, foreign_key: :followed_id, class_name: 'Follow', dependent: :destroy
  has_many :followers, through: :reverse_follows, source: :follower
  
  has_many :articles, dependent: :destroy 
end
