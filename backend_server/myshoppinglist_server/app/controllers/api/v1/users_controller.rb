module Api
	module V1
		class UsersController < ApplicationController
			def index
				users = User.order('created_at DESC')
				render json: {status: 'SUCCESS', message:'Loaded shoppinglists', data:users},status: :ok
			end

			def show
				user = User.find_by_user_name(params[:id])
				if user
					render json: {status: 'SUCCESS', message:'Loaded shoppinglist', data:user},status: :ok
				else
					render json: {status: 'ERROR', message:'shoppinglist cannot find', data:"error"},status: :unprocessable_entity	
				end
			end

			def create
				user = User.new(user_params)
			
				if user.save
					render json: {status: 'SUCCESS', message:'Saved shoppinglist', data:user},status: :ok
 				else
					render json: {status: 'ERROR', message:'shoppinglist not saved', data:user.errors},status: :unprocessable_entity
 				end
			end

			def destroy
				user = User.find_by_user_name(params[:id])
				if user
					user.destroy
					render json: {status: 'SUCCESS', message:'Deleted shoppinglist', data:user}, status: :ok
				else
					render json: {status: 'ERROR', message:'shoppinglist cannot find', data:"cannot find shopping list, so I cannot delete it."},status: :unprocessable_entity	

				end
			end

			def update
				user = User.find_by_user_name(params[:id])
				if user
					if user.update_attributes(user_params)
						render json: {status: 'SUCCESS', message:'Updated shoppinglist', data:user},status: :ok
					else
						render json: {status: 'ERROR', message:'shoppinglist not updated', data:user.errors},status: :ok
					end
				else
					render json: {status: 'ERROR', message:'shoppinglist not updated', data:"cannot find user name"},status: :ok
				end
			end

			private

			def user_params
				params.permit(:todos, :is_all_done, :user_name, :password)
			end
		end
	end
end