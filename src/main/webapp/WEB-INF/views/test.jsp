<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>http://www.blueb.co.kr</title>
      <link rel="stylesheet" type="text/css" href="resources/css/backgroundTransition.css" />
  </head>
  <body>

      <div class="backgroundTransition">
       	<div></div>
      </div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>

<script type="text/javascript" src="resources/js/backgroundTransition.js"></script>

<script type="text/javascript">
  $(document).ready(function(){
	  $('.backgroundTransition').backgroundTransition({
		  backgrounds:[
			  { src: 'http://www.blueb.co.kr/SRC2/_image/01.jpg' },
			  { src: 'http://www.blueb.co.kr/SRC2/_image/02.jpg' },
			  { src: 'http://www.blueb.co.kr/SRC2/_image/03.jpg' },
			  { src: 'http://www.blueb.co.kr/SRC2/_image/04.jpg' },
			  { src: 'http://www.blueb.co.kr/SRC2/_image/05.jpg' },
			  { src: 'http://www.blueb.co.kr/SRC2/_image/06.jpg' },
			  { src: 'http://www.blueb.co.kr/SRC2/_image/07.jpg' }
		  ],
		  transitionDelay: 3,
		  animationSpeed: 800
	  });
  });
</script>
</body>
</html>
