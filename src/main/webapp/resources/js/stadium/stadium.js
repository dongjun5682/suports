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
       list(1);
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
    	$.getJSON(_+'/stadiums/page/'+x,d=>{
    		$('<div id="asearch" class="row stadium-row"></div>').appendTo('.stadium-list');
	    	$.each(d.ls,(i,j)=>{
	    		$('<div class="col-md-4">'
	  		  			+'    <div class="w3-card" id="content_2"><img src="'+j.stadiumPhoto+'" style="width:208px">'
	  		  			+'      <div class="w3-container">'
	  		  			+'        <h5 style=" margin-top: 25px;">'+j.stadiumName+'</h5>'
	  		  			+'        <h5>'+j.stadiumInfo+'</h5>'
	  		  			+'      </div>'
	  		  			+'    </div>'
	  		  			+'  </div>')
	  		  			.appendTo('#asearch')
	  		  			.click(function() {
	  		  				$('#map').empty();
	  		  				$('#footer').empty();
	  		  				list_detail(j);
	  					});
	    	});
	    	
	    	$('<div style="height: 50px"></div>').appendTo('.col-md-4');
	    	$('<div class="pagination"></div>').appendTo('.col-md-9');
	    	if(d.pxy.existPrev){
	    		$('<li><a>&laquo;</a></li>')
	    		.appendTo('.pagination')
	    		.click(function(){
	    			alert($(this).text());
	    			list(d.pxy.prevBlock);
	    		});
	    	}
	    	let i =0;
	    	for(i=d.pxy.startPage; i<=d.pxy.endPage; i++){
	    		if(d.pxy.pageNum == i){
	    			$('<li><a class="page active">'+i+'</a></li>')
	    			.attr('href',$.ctx()+'/stadiums/page/'+i)
	    			.appendTo('.pagination')
	    			.click(function(){
	    				
	    				alert($(this).text());
	    				list($(this).text());
	    			});
	    		}else{
	    			$('<li><a class="page">'+i+'</a></li>')
	    			.attr('href',$.ctx()+'/stadiums/page/'+i)
	    			.appendTo('.pagination')
	    			.click(function(){
	    				alert($(this).text());
	    				list($(this).text());
	    			});
	    		}
	    	}
    		if(d.pxy.existnext){
    			$('<li><a>&raquo;</a></li>')
    			.appendTo('.pagination')
    			.click(function(){
    				alert($(this).text());
    				list(d.pxy.nextBlock);
    				});
    			};
    			
    	});

    }
    //드래그앤드랍 업데이트
    let list_detail = (j) => {
    	function loadElement(){ 
    		if(!storageSupport()){ 
    			return null;  
    		}
    		return window.sessionStorage.getItem('id'); 
    	}
    	$('#content').html(compo.stadium_list_detail(j));
    	$('#sta_photo').css({'background-image':'url(resources/img/stadium/field.jpg)','width':'100%','margin-top':'50px','margin-bottom':'100px','height':'947px'})
    			.html('<div id="a-team" ondrop="drop(event)" ondragover="allowDrop(event)"> '
    			+'<img src="resources/img/soccer-ball.png" draggable="true" ondragstart="drag(event)" id="image1" width="72" height="72"> '
    			+'</div> '
    			////왼쪽 팀
    			+'<div id="a-team" class="roster_1" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 159px;position: absolute;bottom: -455px;"></div>'
    			+'<div id="a-team" class="roster_2" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;bottom: -210px;"></div>'
    			+'<div id="a-team" class="roster_3" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 252px;position: absolute;bottom: -370px;"></div>'
    			+'<div id="a-team" class="roster_4" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 252px;position: absolute;bottom: -539px;"></div>'
    			+'<div id="a-team" class="roster_5" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 252px;position: absolute;bottom: -684px;"></div>'
    			+'<div id="a-team" class="roster_6" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;margin-top: -60px;position: absolute;bottom: -273px;"></div>'
    			+'<div id="a-team" class="roster_7" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;bottom: -454px;"></div>'
    			+'<div id="a-team" class="roster_8" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;bottom: -651px;"></div>'
    			+'<div id="a-team" class="roster_9" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -272px;"></div>'
    			+'<div id="a-team" class="roster_10" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -454px;"></div>'
    			+'<div id="a-team" class="roster_11" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -651px;"></div>'
    			////오른쪽 팀
    			+'<div id="b-team" class="roster_12" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 703px;position: absolute;bottom: -455px;"></div>'
    			+'<div id="b-team" class="roster_13" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 703px;position: absolute;bottom: -272px;"></div>'
    			+'<div id="b-team" class="roster_14" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 703px;position: absolute;bottom: -652px;"></div>'
    			+'<div id="b-team" class="roster_15" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 804px;position: absolute;bottom: -539px;"></div>'
    			+'<div id="b-team" class="roster_16" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 803px;position: absolute;bottom: -363px;"></div>'
    			+'<div id="b-team" class="roster_17" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 895px;margin-top: -60px;position: absolute;bottom: -455px;"></div>'
    			+'<div id="b-team" class="roster_18" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -684px;"></div>'
    			+'<div id="b-team" class="roster_19" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -539px;"></div>'
    			+'<div id="b-team" class="roster_20" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -370px;"></div>'
    			+'<div id="b-team" class="roster_21" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -210px;"></div>'
    			+'<div id="b-team" class="roster_22" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 1055px;position: absolute;bottom: -455px;"></div>'
    			)
    	 
    	$('#footer').css('.section','padding-bottom:78px;');
    	$('#footer').css('.section','background-color: #1db91d9e;');
    	$('#footer').attr('style','position: fixed; left: 0; bottom: 0; width: 100%; background-color: #8cff88; color: white; text-align: center; padding-bottom: 22px; padding-top: 5px;')
    	$('#footer').html('<div class="navbar-brand">'
    			+'<div class= col-ms-1>'
    	    	+'<a class="logo" href="index.html">'
    	    	+'<img src="resources/img/logo/logo.png" alt="logo"></a>'
    	    	+'<button type="button" class="btn hover2" data-toggle="modal" data-target="#myModal" id="pay_btn_1" style="width:32%; padding: 16px; background-color: #337ab7;">'
    	    	+'<span style="color:white">예약하기</span>'
    	    	+'</button>'
    	    	+'</div>'
    	    	+'<div class= col-ms-11>'
    	    	+'</div>'
    	    	+'</div>'
    	    	+'</div>');
    	//map 설정 ////
    	
    	$(document).ready(function() {
            initMap();
        });
     	$('#myMpa').append(compo.map());
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
    	let url = _+'/stadiums/search/'+ x.s+'/'+x.p;
    	$.getJSON(url,d=>{
    		$('<div id="asearch" class="row stadium-row"></div>').appendTo('.stadium-list');
	    	$.each(d.srch,(i,j)=>{
	    		$('<div class="row">'
	  		  			+'    <div class="col-sm-4" id="content_2"><img src="'+j.stadiumPhoto+'" style="width:208px">'
	  		  			+'        <h5 style=" margin-top: 25px;">'+j.stadiumName+'</h5>'
	  		  			+'        <h5>'+j.stadiumInfo+'</h5>'
	  		  			+'    </div>'
	  		  			+'  </div>')
	  		  		.appendTo('#asearch')
  		  			.click(function() {
  		  				$('#footer').empty();
  			    		alert(j.stadiumName);
  			    		list_detail(j);
  					});
	    	});
	    	$('<div style="height: 50px"></div>').appendTo('.col-md-4');
	    	$('<div class="pagination"></div>').appendTo('.col-md-9');
	    	if(d.pxy.existPrev){
				$('<li><a>&laquo;</a></li>')
				.appendTo('.pagination')
				.click(function(){
					let arr = {p:d.pxy.prevBlock, s:x.s};
					srch(arr);
				});
			}
	    	let i =0;
			for(i=d.pxy.startPage; i<=d.pxy.endPage; i++){
				if(d.pxy.pageNum == i){
					$('<li><a class="page active">'+i+'</a></li>')
					.attr('href',$.ctx()+'/stadiums/search/'+i)
					.appendTo('.pagination')
					.click(function(){
						let arr = {p:$(this).text(), s:x.s};
						srch(arr);
					});
				}else{
					$('<li><a class="page">'+i+'</a></li>')
					.attr('href',$.ctx()+'/stadiums/search/'+i)
					.appendTo('.pagination')
					.click(function(){
						let arr = {p:$(this).text(), s:x.s};
						srch(arr);
					});
				  }
				}
				if(d.pxy.existnext){
					$('<li><a>&raquo;</a></li>')
					.appendTo('.pagination')
					.click(function(){
						alert($(this).text());
						let arr = {p:d.pxy.nextBlock, s:x.s};
						srch(arr);
						});
					};
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
    function initMap() {
        // The location of Uluru
        var uluru = {lat: 37.552378, lng: 126.937635};
        // The map, centered at Uluru
        var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 15, center: uluru});
        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({position: uluru, map: map});
    }  
    return {
        onCreate: onCreate,
        list:list,
        list_detail: list_detail,
        payment: payment,
        payment_reservation: payment_reservation,
    	srch: srch}
})();