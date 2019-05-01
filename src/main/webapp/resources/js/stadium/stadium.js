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
        	$('.stadium-list').remove();
        	$('.col-md-9').html();
        });
    	$.getJSON($.ctx()+'/stadiums/page/'+x,d=>{
    		$('<div id="asearch" class="row stadium-row"></div>').appendTo('.stadium-list');
	    	$.each(d.ls,(i,j)=>{
	    		$('<div class="col-md-4">'
	  		  			+'    <div class="w3-card" id="content_2"><img src="'+j.stadiumPhoto+'" style="width:90%">'
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
    let list_detail = (j) => {
    	$('#content').html(compo.stadium_list_detail(j));
    	$('#footer').css('.section','padding-bottom:78px;');
    	$('#footer').css('.section','background-color: #1db91d9e;');
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
    	$('#map').html('');
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
    let srch =x=>{
    	let url = _+'/stadiums/search/'+ x.s+'/'+x.p;
    	$.getJSON(url,d=>{
    		$('<div id="asearch" class="row stadium-row"></div>').appendTo('.stadium-list');
	    	$.each(d.ls,(i,j)=>{
	    		$('<div class="col-md-4">'
	  		  			+'    <div class="w3-card" id="content_2"><img src="'+j.stadiumPhoto+'" style="width:90%">'
	  		  			+'      <div class="w3-container">'
	  		  			+'        <h5 style=" margin-top: 25px;">'+j.stadiumName+'</h5>'
	  		  			+'        <h5>'+j.stadiumInfo+'</h5>'
	  		  			+'      </div>'
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
    };
    return {
        onCreate: onCreate,
        list:list,
        list_detail: list_detail,
        payment: payment,
        payment_reservation: payment_reservation,
    	srch: srch}
})();