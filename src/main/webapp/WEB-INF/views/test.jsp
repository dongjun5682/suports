<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Vidbg.js Demo</title>
  
<!-- Start: injected by AdGuard -->
<script src="//local.adguard.com/adguard-ajax-api/injections/content-script.js?ts=1556844302.616274&sb=0&domain=www.blueb.co.kr&mask=103" type="text/javascript" nonce="96403707657A4D4C9BB304EF3C3EB01B"></script>
<script src="//local.adguard.com/adguard-ajax-api/injections/userscripts/Adguard Assistant?ts=1556844476.397813" type="text/javascript" nonce="96403707657A4D4C9BB304EF3C3EB01B"></script>
<!-- End: injected by AdGuard -->
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
  <link href="resources/css/fullscreenDemo.css" rel="stylesheet" type="text/css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
</head>

<body>

  <div class="block-container">
    <div class="block">
      <h1>Video Background</h1>
      <h3>Fullscreen applied to </h3>
    </div>
  </div>

  <script type="text/javascript">
    jQuery(function($){
          $('body').vidbg({
              'mp4': 'resources/video/mp4_video.mp4',
              'webm': 'resources/video/webm_video.webm',
              'poster': 'resources/video/fallback.jpg',
          }, {
            // Options
            muted: true,
            loop: true,
  					overlay: true,
          });
      });
  </script>

  <script src="resources/js/vidbg.js"></script>

</body>
</html>
