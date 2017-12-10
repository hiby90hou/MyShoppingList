class Api::V1::UsersController < ApplicationController
	before_action :set_user

	def show
		render json:{
			id: @user.id,
			username: @user.username,
			password: @user.password,
			todos: @user.todoings.first.todos
		}
	end

	private

		def set_user
			@user = User.find_by_username(params[:id])
		end
	end