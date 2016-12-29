$('#scrollbody').scrollspy({ target: '#navbar-example' })  
$('[data-spy="scroll"]').each(function () {
  var $spy = $(this).scrollspy('refresh')
  console.log(123456)
}) 
