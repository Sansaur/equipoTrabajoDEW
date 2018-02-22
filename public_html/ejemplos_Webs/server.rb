require 'sinatra'
require 'rest-client'
require 'json'

CLIENT_ID = d671fd09fe12180a0a2f
CLIENT_SECRET = 169065c9b73cf597abf8ed8af2d2ca8db8068b29

get '/' do
  erb :index, :locals => {:client_id => CLIENT_ID}
end