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
        $('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
        $('#map_button').click(function(e){
        	$('#content').empty().html(compo.stadium_list_sidebar());
        	$('#map').html('<div id="map" style="width:500px;height:400px;"></div>');
        });
        $('#header').css('border-bottom','2px solid rgba(235, 235, 235, 1)');
        	$('#content').empty().html(compo.stadium_list_sidebar());
        	
        	let arr = [{src : "resources/img/stadium/img_5terre.jpg"}
        	,{src : "resources/img/stadium/img_monterosso.jpg"}
        	,{src : "resources/img/stadium/img_vernazza.jpg"}
        	,{src : "resources/img/stadium/img_5terre.jpg"}
        	,{src : "resources/img/stadium/img_monterosso.jpg"}
        	,{src : "resources/img/stadium/img_vernazza.jpg"}]
        	let list = '<div id="asearch" class="row stadium-row">';
        	$.each(arr,(i,j)=>{
        		list +=  '  <div class="col-md-4">'
      		  			+'    <div class="w3-card"><img src="resources/img/stadium/img_monterosso.jpg" style="width:100%">'
      		  			+'      <div class="w3-container">'
      		  			+'        <h5>Monterosso</h5>'
      		  			+'      </div>'
      		  			+'    </div>'
      		  			+'  </div>'
        				+'<div class="col-md-4">'
        			  +'    <div class="w3-card"><img src="resources/img/stadium/img_5terre.jpg" style="width:100%">'
        			  +'      <div class="w3-container">'
        			  +'        <h5>Terre</h5>'
        			  +'      </div>'
        			  +'    </div>'
        			  +'</div>';
        	});
        	list += '</div>';
        	$(list).appendTo('.stadium-list');
        	$('<nav>'
        	+' <ul class="pagination">'
        	+'  <li>'
        	+'    <a href="#" aria-label="previous">'
        	 +' <span aria-hidden="true">&laquo;</span>'
        	+' </a>'
        	+'  </li>'
        	+'  <li><a href="#">1</a></li>'
        	 +'  <li><a href="#">2</a></li>'
        	 +'  <li><a href="#">3</a></li>'
        	+'  <li><a href="#">4</a></li>'
        	+'   <li><a href="#">5</a></li>'
        	 +'   <li>'
        			    +'    <a href="#" aria-label="next">'
        			    +'     <span aria-hidden="true">&raquo;</span>'
        			    +'   </a>'
        			    +'   </li>'
        			    +' </ul>'
        			    +'</nav>').appendTo('.col-md-9');
        	
        $('img').click(function(e) {
            list_detail();
        })
    }

    let list = () => {
    	
    }
    let list_detail = () => {
    	$('#footer').css('.section','padding-bottom:78px;');
    	$('#footer').css('.section','background-color: #1db91d9e;');
    	$('#header').css('border-bottom','2px solid rgba(235, 235, 235, 1)');
    	$('#footer').attr('style','position: fixed; left: 0; bottom: 0; width: 100%; background-color: #8cff88; color: white; text-align: center; padding-bottom: 22px; padding-top: 5px;')
    	$('#footer').html('<div class="navbar-brand">'
    			+'<div class= col-ms-1>'
    	    	+'                    <a class="logo" href="index.html">'
    	    	+'                          <img src="resources/img/logo/logo.png" alt="logo"></a>'
    	    	+'                  <button type="button" class="btn hover2" data-toggle="modal" data-target="#myModal" id="pay_btn_1" style="width:32%; padding: 16px; background-color: #337ab7;">'
    	    	+'                     <span style="color:white">예약하기</span>'
    	    	+'                 </button>'
    	    	+'                 </div>'
    	    	+'                 <div class= col-ms-11>'
    	    	+'                </div>'
    	    	+'             </div>'
    	    	+'      </div>');
        $('#content').empty().html(compo.stadium_list_detail());
        $('#pay_btn_1').click(()=>{
        	alert('모달로 확인창 뜨고 결제 예약으로 이동');
        	$('.modal-content').html(compo.pay_btn());
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
        $('#content').empty().html(compo.payment());
        $('#payment_reservation').click(()=>{
        	payment_reservation();
        })

    }
    let payment_reservation = () => {
        $('#content').empty().html(compo.payment_reservation());
        $('#footer').empty();
    }

    return {
        onCreate: onCreate,
        list: list,
        list_detail: list_detail,
        payment: payment,
        payment_reservation: payment_reservation
    }
})();