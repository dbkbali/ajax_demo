$(document).ready(function() {

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
      },

    $('#loader').css('visibility', 'visible');
   //$.ajax({
   //   url: "/notes",
   //   method: "GET",
   //   dataType: 'json',
   //   success: function(notes) {
   //     $(notes).each(function(i, note){
   //       renderNote(note);
   //       $('span.note-count').text($('.post-description').length);
   //     })
   //    },
   //     // Iterates through our json and renders and
   //     // appends our note
   // })

    // Shorthand command for the above is jQuery.getJSON( url [, data ] [, success ] )
    $.getJSON("/notes")
      .done(function(notes){
        $(notes).each(function(i, note){
          renderNote(note);
        });
        $('span.note-count').text($('.post-description').length);
        $('#loader').css('visibility', 'hidden');
      }).fail(function(){alert('problem - come back later')});

    //})

    // Can also submit our form using post but we need to disable form default action
    // and disable usual form action
    //

    post_url = "/notes"
    $(document).on('click','button#form-button', function(event){
      event.preventDefault();
      $('#messages > div.pure-alert').remove();
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
            $('#messages').append(($('<div>')
              .addClass('pure-alert pure-alert-error')
              .text(data.responseText)));
          },
        success: function(data) {
            $('#messages').append($('<div/>')
              .addClass('pure-alert pure-alert-success')
              .text("Your note was created").fadeOut(1500));
            renderNote(data);
            $('span.note-count').text($('.post-description').length)
            $("input[type=text],input[type=url],textarea").val("");
          }
      })

    })

    // Shortcut commands for $.ajax POST is available as follows
    // $.post - http://api.jquery.com/jquery.post/
    // jQuery.post( url [, data ] [, success ] [, dataType ] )
    //
    // Difference is no error or other callbacks like the ajax command

});
