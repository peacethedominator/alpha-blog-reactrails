class BloggerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :email, :created_at
end
