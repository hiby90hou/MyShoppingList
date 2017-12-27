module Api
	module V1
		class UsersController < ApplicationController
			# use GET "http://localhost:3000/api/v1/users/"
			def index
				users = User.order('created_at DESC')
				render json: {status: 'SUCCESS', message:'Loaded shoppinglists', data:users},status: :ok
			end

			# use GET "http://localhost:3000/api/v1/users/Richard%20Burke"
			def show
				user = User.find_by_user_name(params[:id])
				if user
					render json: {status: 'SUCCESS', message:'Loaded shoppinglist', data:user},status: :ok
				else
					render json: {status: 'ERROR', message:'shoppinglist cannot find', data:"error"},status: :unprocessable_entity	
				end
			end

			# use POST "http://localhost:3000/api/v1/users"
			# head Content-Type : application/json
			# body
			# {
	 	  #   	 "todos": "[{'is_done':'false',title:'Chicken wings3',expire:null},{is_done:false,title:'Scotch eggs2',expire:null},{is_done:'false','title':'Tiramisù2','expire':'null'}]",
   		#      "is_all_done": "false",
   		#      "user_name": "rachel_green2",
			# 	   "password": "12345"
			# }

			def create
				user = User.new(user_params)
			
				if user.save
					render json: {status: 'SUCCESS', message:'Saved shoppinglist', data:user},status: :ok
 				else
					render json: {status: 'ERROR', message:'shoppinglist not saved', data:user.errors},status: :unprocessable_entity
 				end
			end

			# use DELETE "http://localhost:3000/api/v1/users/rachel_green2"

			def destroy
				user = User.find_by_user_name(params[:id])
				if user
					user.destroy
					render json: {status: 'SUCCESS', message:'Deleted shoppinglist', data:user}, status: :ok
				else
					render json: {status: 'ERROR', message:'shoppinglist cannot find', data:"cannot find shopping list, so I cannot delete it."},status: :unprocessable_entity
				end
			end

			# use PUT "http://localhost:3000/api/v1/users/Richard%20Burke"
			# head Content-Type : application/json
			# body
			# {
			# 	"todos":"[{'is_done':'false',title:'Chicken wings4',expire:null}]"
			# }

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