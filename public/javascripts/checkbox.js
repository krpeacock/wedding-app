$( document ).ready(function() {
  var mail = $('#mail').attr('value');
  var email = $('#email').attr('value');
  var rsvp = $('#rsvp')[0];
  var thanked = $('#thanked')[0];
  var id = "/" + $('#id').attr('value');
  var formData = {};





  rsvpReady();
  thankedReady();




});

function rsvpReady(){
  if(rsvp.value.value === true){
    $('#true')[0].checked = true
  }
  else{
    $('#rsvp_false')[0].checked = true
  }

  $('#rsvp_true').on('click', function(e){
    if(e.target.checked){
      $('#rsvp_false')[0].checked = false
      rsvp.value = true;
    }
    else{
      $('#rsvp_false')[0].checked = true
      rsvp.value = false;
    }
    console.log(rsvp);
  })
  $('#rsvp_false').on('change', function(e){
    if(e.target.checked){
      $('#rsvp_true')[0].checked = false
      rsvp.value = false;
    }
    else{
      $('#rsvp_true')[0].checked = true
      rsvp.value = true;
    }
  }) 
  }   

function thankedReady(){
  if(thanked === true){
    $('#true')[0].checked = true
  }
  else{
    $('#thanked_false')[0].checked = true
  }

  $('#thanked_true').on('click', function(e){
    if(e.target.checked){
      $('#thanked_false')[0].checked = false
      thanked.value = true;
    }
    else{
      $('#thanked_false')[0].checked = true
      thanked.value = false;
    }
    console.log(thanked);
  })
  $('#thanked_false').on('change', function(e){
    if(e.target.checked){
      $('#thanked_true')[0].checked = false
      thanked.value = false;
    }
    else{
      $('#thanked_true')[0].checked = true
      thanked.value = true;
    }
  }) 
  }   



