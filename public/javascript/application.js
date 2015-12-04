

$(document).ready(function() {
   //$.ajax({
   //  url: "/notes",
   //  method: "GET",
   //  dataType: 'json',
   //  success: function(notes) {
   //    $(notes).each(function(i, note){
   //      heading = $('<h2/>').addClass('post-title').text(note.title)
   //      time = $('<p/>').addClass('post-meta').append($('<span/>')
   //        .addClass('post-category post-category-design').text('Created: ' + note.created_at))
   //      header = $("<header/>").addClass('post-header')
   //                .append(heading).append(time)
   //      $('#notes').append(
   //        $("<section/>")
   //          .append(header)
   //          .append($('<div/>').addClass("post-description")
   //            .append($('<p/>').text(note.description)))
   //            .append($("<a/>").attr('href', note.reference_url).text(note.reference_url)
   //          ))
   //      })
   //    }

   //    // Iterates through our json and renders and
   //    // appends our notes

   //})

    // Shorthand command for the above is jQuery.getJSON( url [, data ] [, success ] )
    //
    //

    renderNote = function(note) {
      heading = $('<h2/>').addClass('post-title').text(note.title)
      time = $('<p/>').addClass('post-meta').append($('<span/>')
        .addClass('post-category post-category-design').text('Created: ' + note.created_at))
      header = $("<header/>").addClass('post-header')
                .append(heading).append(time)
      $('#notes').append(
        $("<section/>").append(header)
          .append($('<div/>').addClass("post-description")
            .append($('<p/>').text(note.description)))
            .append($("<a/>").attr('href', note.reference_url).text(note.reference_url)
          ));
        }

    $.getJSON("/notes", function(notes){
        $(notes).each(function(i, note){
            renderNote(note)
            //heading = $('<h2/>').addClass('post-title').text(note.title)
            //time = $('<p/>').addClass('post-meta').append($('<span/>')
            //  .addClass('post-category post-category-design').text('Created: ' + note.created_at))
            //header = $("<header/>").addClass('post-header')
            //          .append(heading).append(time)
            //$('#notes').append(
            //  $("<section/>")
            //    .append(header)
            //    .append($('<div/>').addClass("post-description")
            //      .append($('<p/>').text(note.description)))
            //      .append($("<a/>").attr('href', note.reference_url).text(note.reference_url)
            //    ))
            })
        });

    // Can also submit our form using post but we need to disable form default action
    // and disable usual form action
    //



    post_url = "/notes"


    $(document).on('click','button#form-button', function(event){
      event.preventDefault();
      data = {
        note: {
          title: $('#title').val(),
          description: $('#description').val(),
          reference_url: $('#ref_url').val()
        }
      };

      $.ajax({
        url: post_url,
        method: 'POST',
        dataType: 'json',
        data: data,
        error: function(data) {
            $('#messages').append($('<div>'))
              .addClass('pure-alert pure-alert-error')
              .text(data.responseText)
          },
        success: function(data) {
            $('#messages').append($('<div>'))
              .addClass('pure-alert pure-alert-success')
              .text("Your note was created").fadeOut(600);
            renderNote(data);
            debugger;
            if (data["count"]) {
              $('span.note-count').text(data["count"])
            }
            $("input[type=text],input[type=url],textarea").val("");
          }
      })

    })

    // Shortcut commands for $.ajax are available as follows
    // $.get
    //

});
