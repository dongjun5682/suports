<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
<style>
       /* Set the size of the div element that contains the map */
      #map {
        height: 400px;  /* The height is 400 pixels */
        width: 100%;  /* The width is the width of the web page */
       }
    </style>
<meta charset="UTF-8" />
<title>Document</title>
<script src='//unpkg.com/popper.js@1/dist/umd/popper.min.js'></script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'></script>
<script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js'></script>
<!-- <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c3c4beaf10eac4d6d6910770fdc4d4bb"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=APIKEY&libraries=LIBRARY"></script> -->

<!-- default css -->
<link rel="stylesheet" href="resources/css/bootstrap.min.css">
<link rel="stylesheet" href="resources/css/style.css">
<link rel="stylesheet" href="resources/css/font-awesome.min.css">

<!-- modal css -->
<link rel="stylesheet" href="resources/css/modal.css">

<!-- signin css -->
<link rel="stylesheet" href="resources/css/signin/util.css">
<link rel="stylesheet" href="resources/css/signin/main.css">

<!-- player css -->
<link rel="stylesheet" href="resources/css/playersignuppg1.css">
<link rel="stylesheet" href="resources/css/playersignuppg2.css">
<link rel="stylesheet" href="resources/css/playersignuppg3.css">
<link rel="stylesheet" href="resources/css/playersignuppg4.css">
<link rel="stylesheet" href="resources/css/playersignuppg5.css">
<link rel="stylesheet" href="resources/css/playerupdateinfo.css">
<link rel="stylesheet" href="resources/css/playerupdatepicture.css">
<!-- team css -->
<link rel="stylesheet" href="resources/css/team/teamcreatepg1.css">
<link rel="stylesheet" href="resources/css/team/teamcreatepg2.css">
<link rel="stylesheet" href="resources/css/team/teamcreatepg3.css">
<link rel="stylesheet" href="resources/css/team/teamcreatepg4.css">
<link rel="stylesheet" href="resources/css/team/teamcreatepg5.css">
<link rel="stylesheet" href="resources/css/team/teammanageplayers.css">
<link rel="stylesheet" href="resources/css/team/teamupdateemblem.css">
<link rel="stylesheet" href="resources/css/team/teamupdateinfo.css">
<link rel="stylesheet" href="resources/css/team/teamupdatepicture.css">

</head>
<body>
	<div id="content"></div>
	<!-- Fullsize Modal -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content"></div>
		</div>
	</div>
		<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div id="modal-content2"></div>
		</div>
	</div>
<!-- /////////////////// -->
<div id="map"></div>
	
	
	
	
	
	<!-- /////////////////// -->
<script 
	src="<%=application.getContextPath()%>/resources/js/app.js"></script>
<script
	src="<%=application.getContextPath()%>/resources/js/com/router.js"></script>
<script
	src="<%=application.getContextPath()%>/resources/js/home/home.js"></script>
<script
	src="<%=application.getContextPath()%>/resources/js/compo/compo.js"></script>
<script
	src="<%=application.getContextPath()%>/resources/js/member/member.js"></script>	
<script
	src="<%=application.getContextPath()%>/resources/js/bootstrap.min.js"></script>
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBAQX1xNr1pIAgaFoZIyZXHXw2WnJvlgGY&callback=initMap">
    </script>		
<script>

// Initialize and add the map
function initMap() {
  // The location of Uluru
  var uluru = {lat: -25.344, lng: 131.036};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}
    </script>    
<script>
 app.run('<%=application.getContextPath()%>');
</script>
</body>
</html>