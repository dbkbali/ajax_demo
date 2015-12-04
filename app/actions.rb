
before do
  @count = Note.count
end

get '/' do
  @notes = Note.all
  erb :index
end

post '/create' do
  @note = Note.new(params["note"])
  if @note.save
    flash["sucess"] = "Your Note was successfully created"
  else
    flash["error"] = "A note was not created as you left fields blank!"
  end
  redirect '/'
end
