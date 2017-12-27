module Api
	module V1
		class UsersController < ApplicationController
			def index
				users = User.order('created_at DESC')
				render json: {status: 'SUCCESS', message:'Loaded shoppinglists', data:users},status: :ok
			end

			def show
				user = User.friendly.find(params[:id])
				render json: {status: 'SUCCESS', message:'Loaded shoppinglist', data:user},status: :ok
			end

			def create
				user = User.new(user_params)
			
				if user.save
					render json: {status: 'SUCCESS', message:'Saved shoppinglist', data:user},status: :ok
 				else
					render json: {status: 'ERROR', message:'shoppinglist not saved', data:user.error},status: :unprocessable_entity
 				end
			end

			def destroy
				user = User.find(params[:user_name])
				# user.destroy
				render json: {status: 'SUCCESS', message:'Deleted shoppinglist', data:user}, status: :ok
			end

			# def update
			# 	article = Article.find(params[:id])
			# 	if article.update_attributes(article_params)
			# 		render json: {status: 'SUCCESS', message:'Updated article', data:article},status: :ok
			# 	else
			# 		render json: {status: 'ERROR', message:'Article not updated', data:article.errors},status: :ok
			# 	end
			# end

			# private

			def user_params
				params.permit(:todos, :is_all_done, :user_name, :password)
			end
		end
	end
end