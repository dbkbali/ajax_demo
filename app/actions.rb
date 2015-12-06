
before do
  @count = Note.count
end

# Actions for full page load app

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

# Actions using AJAX

get '/notes' do
  @notes = Note.all
  @notes.to_json
end

post '/notes' do
  @note = Note.new(params["note"])
  if @note.save
    @note.to_json
  else
    message = "Note not created as title and/or description fields were blank!"
    halt 400, message
  end
end
