class User < ApplicationRecord
	validates :todos, presence: true
	# validates :is_all_done, presence: true
	validates :user_name, presence: true
	validates :password, presence: true

	def to_param
	 user_name
	end
end
