var maps = maps || {}

maps = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs,mapsjs,stadiumjs;

    let init = () => {
        _ = $.ctx();
        js = $.js();
        compojs = js + '/compo/compo.js';
        stadiumjs = js + '/stadium/stadium.js';
    };
    let onCreate = (x) => {
        init();
        $.when(
            $.getScript(compojs),
            $.getScript(stadiumjs),
            $.Deferred(function(d) {
                $(d.resolve);
            })
        ).done((x) => {
            setContentView(x);
        });
    };

    let setContentView = (x) => {
  		  // The location of Uluru
  		  var myLatLng = {lat: x.lat, lng: x.har};
  		  // The map, centered at Uluru
  		  var map = new google.maps.Map(document.getElementById('map'), {zoom: 16, center: myLatLng});
  		  // The marker, positioned at Uluru
  		  var marker = new google.maps.Marker({position: myLatLng, map: map});
    }
	return{onCreate:onCreate}
})();