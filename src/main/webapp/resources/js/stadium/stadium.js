var stadium = stadium || {}

stadium = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs;

    let init = () => {
        _ = $.ctx();
        js = $.js();
        compojs = js + '/compo/compo.js';
    };
    let onCreate = () => {
        init();
        $.when(
            $.getScript(compojs),
            $.Deferred(function(d) {
                $(d.resolve);
            })
        ).done(() => {
            setContentView();
        });
    };

    let setContentView = () => {
    	let arr = {p :1};
    	list(arr);
       
    }
    let list =(x)=> {
    	$('#map').empty();
    	$('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
        $('#map_button').click(()=>{
        	alert('지도 클릭');
        	$('#content').empty().html(compo.stadium_list_sidebar());
        });
        $('#area_srch').on('click',()=>{
        	alert('검색 클릭')
			let search = $('#search').val();
			if($.fn.nullChecker(search)){
				alert('검색어를 입력하십시오');
			}else{
				alert('검색중 ');
				let arr = {p:'1', s:search};
				srch(arr);
			}
		});
    	$.getJSON($.ctx()+'/stadiums/page/'+x.p,d=>{
    	
    		$('<div id="asearch" class="contianer"></div>').appendTo('.stadium-list');
	    	$.each(d.ls,(i,j)=>{
	    		$('<div class="col-md-3 col-sm-6 col-xs-6" >' +
                        '  <div class="course">' +
                        '    <a href="#" class="course-img">' +
                        '      <img src="' + j.stadiumPhoto + '" alt="' + i + '" style="height: 220px;">' +
                        '      <i class="course-link-icon fa fa-link"></i>' +
                        '    </a>' +
                        '    <a class="course-title" href="#">' + j.stadiumName + '</a>' +
                        '    <div class="course-details">' +
                        '      <span class="course-category">' + j.stadiumAddr + '</span>' +
                        '    </div>' +
                        '    <div class="course-people">' +
                        '      <span class="course-price course-free">' + 10 + '/' + 22 + '</span>' +
                        '    </div>' +
                        '  </div>' +
                        '</div> ')
	  		  			.appendTo('#asearch')
	  		  			.click(function() {
	  		  				$('#map').empty();
	  		  				$('#footer').empty();
	  			    		list_detail(j);
	  					});
	    	});
	    	let html = '<nav> <ul class="col-md-12 pagination" style="margin-left:500px;">'
                if (d.pxy.existPrev) {
                    html += '<li class="prevBlock"><a href="#">&laquo;</a></li>';
                }
                let i = 0;
                for (i = d.pxy.startPage; i <= d.pxy.endPage; i++) {
                    if (x == i) {
                        html += '<li class="active"><a href="#" class="page">' + i + '</a></li>';
                    } else {

                        html += '<li><a href="#" class="page">' + i + '</a></li>';
                    }
                }
                if (d.pxy.existNext) {
                    html += '<li class="nextBlock"><a href="#">&raquo;</a></li>';
                }
                $('.col-md-9').append(html);
                
                $('.page').each(function() {
                    $(this).click(() => {
                 	   let arr = {s :x.srch,
                 			   	  p :$(this).text()};
                 	   list(arr);
                    });
                });
                $('.nextBlock').click(function() {
             	   let arr = {s :x.srch,
          			   	  p :d.pxy.nextBlock};
             	  list(arr);
                })
                $('.prevBlock').click(function() {
             	   let arr = {s :x.srch,
          			   	  p :d.pxy.prevBlock};
             	  list(arr);
                }) 
                
    	});

    }
    //드래그앤드랍 업데이트
    let list_detail = (j) => {
    	/*function loadElement(){ 
    		if(!storageSupport()){ 
    			return null;  
    		}
    		return window.sessionStorage.getItem('id'); 
    	}*/
    	$('#content').html(compo.stadium_list_detail(j));
    	$('#sta_photo').css({'background-image':'url(resources/img/stadium/field.jpg)','width':'100%','margin-top':'50px','margin-bottom':'100px','height':'947px'})
    			.html('<div id="a-team" ondrop="drop(event)" ondragover="allowDrop(event)"> '
    			+'<img src="resources/img/soccer-ball.png" draggable="true" ondragstart="drag(event)" id="image1" width="72" height="72"> '
    			+'</div> '
    			////왼쪽 팀
    			+'<div id="a-team" class="roster_1" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 159px;position: absolute;bottom: -455px;"></div>'
    			+'<div id="a-team" class="roster_2" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;bottom: -230px;"></div>'
    			+'<div id="a-team" class="roster_3" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 252px;position: absolute;bottom: -356px;"></div>'
    			+'<div id="a-team" class="roster_4" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 252px;position: absolute;bottom: -562px;"></div>'
    			+'<div id="a-team" class="roster_5" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 252px;position: absolute;bottom: -690px;"></div>'
    			+'<div id="a-team" class="roster_6" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;margin-top: -60px;position: absolute;bottom: -300px;"></div>'
    			+'<div id="a-team" class="roster_7" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;bottom: -455px;"></div>'
    			+'<div id="a-team" class="roster_8" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;bottom: -610px;"></div>'
    			+'<div id="a-team" class="roster_9" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -300px;"></div>'
    			+'<div id="a-team" class="roster_10" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -455px;"></div>'
    			+'<div id="a-team" class="roster_11" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -610px;"></div>'
    			////오른쪽 팀
    			+'<div id="b-team" class="roster_12" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 703px;position: absolute;bottom: -455px;"></div>'
    			+'<div id="b-team" class="roster_13" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 703px;position: absolute;bottom: -300px;"></div>'
    			+'<div id="b-team" class="roster_14" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 703px;position: absolute;bottom: -610px;"></div>'
    			+'<div id="b-team" class="roster_15" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 804px;position: absolute;bottom: -525px;"></div>'
    			+'<div id="b-team" class="roster_16" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 803px;position: absolute;bottom: -380px;"></div>'
    			+'<div id="b-team" class="roster_17" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 895px;margin-top: -60px;position: absolute;bottom: -455px;"></div>'
    			+'<div id="b-team" class="roster_18" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -690px;"></div>'
    			+'<div id="b-team" class="roster_19" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -562px;"></div>'
    			+'<div id="b-team" class="roster_20" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -356px;"></div>'
    			+'<div id="b-team" class="roster_21" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -230px;"></div>'
    			+'<div id="b-team" class="roster_22" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 1055px;position: absolute;bottom: -455px;"></div>')
    	 
    	$('#footer').css('.section','padding-bottom:78px;');
    	$('#footer').css('.section','background-color: #1db91d9e;');
    	$('#footer').attr('style','position: fixed;left: 0;bottom: 0;width: 100%;background-color: #8cff88;color: white;text-align: center;padding-bottom: 5px;padding-bottom: 34px;-top: 5px;padding-top: 0px;"')
    	$('#footer').html('<div class="navbar-brand">'
    			+'<div class= col-ms-1>'
    	    	+'<a class="logo" href="index.html">'
    	    	+'<img src="resources/img/logo/logo.png" alt="logo"></a>'
    	    	+'<button type="button" class="btn hover2" data-toggle="modal" data-target="#myModal" style="width: 32%;padding: 14px;background-color: #337ab7;">'
    	    	+'<span style="color:white">예약하기</span>'
    	    	+'</button>'
    	    	+'</div>'
    	    	+'<div class= col-ms-11>'
    	    	+'</div>'
    	    	+'</div>'
    	    	+'</div>');
    	//map 설정 ////
    	
//    	$(document).ready(function() {
//            initMap();
//        });
//     	$('#myMpa').append(compo.map());
     	$('#map').css({'width':'100%','height':'400px','margin-bottom':'300px'});  
    	//예약 확인 버튼
        $('#pay_btn_1').click(()=>{
        	alert('모달로 확인창 뜨고 결제 예약으로 이동');
        	$('.modal-content').css({'border-radius':'6px','padding': '20px'})
        	.html(compo.pay_btn());
    		$('#pay_next').click(()=>{
    			alert('결제창 이동');
    			$('#myModal').modal('hide');
    			$('#footer').remove();
    			$('#content').empty();
    			payment();
    		});
        });
    }
    let payment = () => {
    	$('#footer').empty();
    	$('#map').remove();  // 확인 및 결제 예약 맵 삭제
        $('#content').empty().html(compo.payment());
        $('#payment_reservation').click(()=>{
        	payment_reservation();
        })

    }
    let payment_reservation = () => {
        $('#content').empty().html(compo.payment_reservation());
        $('#footer').empty();
    }
    let srch =x=>{
    	$('#map').empty();
    	$('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
        $('#content').css('margin-top', '80px');
        let url = $.ctx()+'/stadiums/search/'+ x.s+'/'+x.p;
    	$.getJSON(url,d=>{
    		$('<div id="asearch" class="contianer"></div>').appendTo('.stadium-list');
	    	$.each(d.srch,(i,j)=>{
	    		$('<div class="col-md-3 col-sm-6 col-xs-6" >' +
                        '  <div class="course">' +
                        '    <a href="#" class="course-img">' +
                        '      <img src="' + j.stadiumPhoto + '" alt="' + i + '" style="height: 220px;">' +
                        '      <i class="course-link-icon fa fa-link"></i>' +
                        '    </a>' +
                        '    <a class="course-title" href="#">' + j.stadiumName + '</a>' +
                        '    <div class="course-details">' +
                        '      <span class="course-category">' +j.stadiumAddr + '</span>' +
                        '    </div>' +
                        '    <div class="course-people">' +
                        '      <span class="course-price course-free">' + 10 + '/' + 22 + '</span>' +
                        '    </div>' +
                        '  </div>' +
                        '</div> ')
	  		  			.appendTo('#asearch')
	  		  			.click(function() {
	  		  				$('#map').empty();
	  		  				$('#footer').empty();
	  			    		list_detail(j);
	  					});
	    	});
	    	let html = '<nav> <ul class="col-md-12 pagination" style="margin-left:400px;">'
                if (d.pxy.existPrev) {
                    html += '<li class="prevBlock"><a href="#">&laquo;</a></li>';
                }
                let i = 0;
                for (i = d.pxy.startPage; i <= d.pxy.endPage; i++) {
                    if (x == i) {
                        html += '<li class="active"><a href="#" class="page">' + i + '</a></li>';
                    } else {

                        html += '<li><a href="#" class="page">' + i + '</a></li>';
                    }
                }
                if (d.pxy.existNext) {
                    html += '<li class="nextBlock"><a href="#">&raquo;</a></li>';
                }
                $('.col-md-9').append(html);
                
                $('.page').each(function() {
                    $(this).click(() => {
                 	   let arr = {s :x.srch,
                 			   	  p :$(this).text()};
                 	  srch(arr);
                    });
                });
                $('.nextBlock').click(function() {
             	   let arr = {s :x.srch,
          			   	  p :d.pxy.nextBlock};
             	  srch(arr);
                })
                $('.prevBlock').click(function() {
             	   let arr = {s :x.srch,
          			   	  p :d.pxy.prevBlock};
             	  srch(arr);
                }) 
    	});
    	 $('#area_srch').on('click',()=>{
         	alert('검색 클릭')
 			let search = $('#search').val();
 			if($.fn.nullChecker(search)){
 				alert('검색어를 입력하십시오');
 			}else{
 				alert('검색중 ');
 				let arr = {p:'1', s:search};
 				srch(arr);
 			}
 		});
    	
    };
//    function initMap() {
//        // The location of Uluru
//        var uluru = {lat: 37.552378, lng: 126.937635};
//        // The map, centered at Uluru
//        var map = new google.maps.Map(
//            document.getElementById('map'), {zoom: 15, center: uluru});
//        // The marker, positioned at Uluru
//        var marker = new google.maps.Marker({position: uluru, map: map});
//    }  
    return {
        onCreate: onCreate,
        list:list,
        list_detail: list_detail,
        payment: payment,
        payment_reservation: payment_reservation,
    	srch: srch}
})();