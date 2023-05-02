to run application:

1. sudo service postgresql start

2. rails s

rails secret
26c8bdb8f4cd0e6231cc93dcda1e13d6f86b66f9b444fd64724e4a2da9b06ec24d489b5c8bac2fd155c7e4fcc25a1f6ade701a293b9056700b0ba0909c954ed0

We can access serializer data for single record by:
UserSerializer.new(resource).serializable_hash[:data][:attributes]
And multiple records by,
UserSerializer.new(resource).serializable_hash[:data].map{|data| data[:attributes]}