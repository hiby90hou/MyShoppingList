class User < ApplicationRecord
	has_many :todoings
	has_many :usernames
end
