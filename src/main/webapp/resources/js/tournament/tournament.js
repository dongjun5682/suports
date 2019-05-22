var tour = tour || {};

tour =(()=>{
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs,memberjs,stadiumjs,homejs;

    let init =()=> {
        _ = $.ctx();
        js = $.js();
        compojs = js+'/compo/compo.js';
        memberjs = js+'/member/member.js';
        stadiumjs = js+'/stadium/stadium.js';
        homejs = js+'/home/home.js';
    };
    let onCreate =()=> {
        init();
        $.when(
            $.getScript(compojs),
            $.getScript(memberjs),
            $.getScript(stadiumjs),
            $.getScript(homejs),
            $.Deferred(function(d) {
                $(d.resolve);
            })
        ).done(() => {
            setContentView();
        });
    };
    let setContentView =()=>{
    	$('#content').empty().html(compo.tournament()).css({
            'margin-top': '100px'
        });
    	$('.tournament-content button').click(function(e){
    		$('.tournament-content button').attr({'data-target':'#myModal','data-toggle':'modal'});
    		home.login();  
    	});
    	$('.m_segment img').click(()=>{
    		
    	})
    	
    }
   let tour_apply =()=>{
	   $('#content').empty().html(compo.tournament()).css({
           'margin-top': '100px'
       });
   	   $('#footer').remove();
	   $('.tournament-content button').click(function(e){
   		let _this = $(this).attr('id');
   		$.getJSON($.ctx()+'/tournament/'+$.member().memberIndex , d=>{
   			if(d.captain === null){
   			 swal({
            	 icon : 'info',
            	 text : '팀의 주장만 신청이 가능합니다.'
             });
   				$('#myModal_tour').modal("hide");
   			}else{
   				switch (_this) {
   				case 'btn1':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   																		,'height':'200px'
   																		,'width': '300px'
   																		,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.r_16 .m_segment .r_16_1').html('<span>'
   						+'<a href="#">'
   						+'<img src="resources/img/logo/'+d.emblem+'" alt="Brazil">'
   						+'<span>'+d.name+'</span>'
   						+'</a>'
   						+'<strong>4</strong>'
   						+'</span>');
   					})

   					break;
   				case 'btn2':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.r_16 .m_segment .r_16_2').html('<span>'
   						+'<a href="#">'
   						+'<img src="resources/img/logo/team_logo1.png" alt="Brazil">'
   						+'<span>Team Name</span>'
   						+'</a>'
   						+'<strong>4</strong>'
   						+'</span>');
   					})

   					break;
   				case 'btn3':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.r_16 .m_segment .r_16_3').html('<span>'
   						+'<a href="#">'
   						+'<img src="resources/img/logo/team_logo2.png" alt="Brazil">'
   						+'<span>Team Name</span>'
   						+'</a>'
   						+'<strong>4</strong>'
   						+'</span>');
   					})

   					break;
   				case 'btn4':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.r_16 .m_segment .r_16_4').html('<span>'
   						+'<a href="#">'
   						+'<img src="resources/img/logo/team_logo3.png" alt="Brazil">'
   						+'<span>Team Name</span>'
   						+'</a>'
   						+'<strong>4</strong>'
   						+'</span>');
   					})

   					break;
   				case 'btn5':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.r_16 .m_segment .r_16_5').html('<span>'
   						+'<a href="#">'
   						+'<img src="resources/img/logo/team_logo4.png" alt="Brazil">'
   						+'<span>Team Name</span>'
   						+'</a>'
   						+'<strong>4</strong>'
   						+'</span>');
   					})

   					break;
   				case 'btn6':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.r_16 .m_segment .r_16_6').html('<span>'
   						+'<a href="#">'
   						+'<img src="resources/img/logo/team_logo5.png" alt="Brazil">'
   						+'<span>Team Name</span>'
   						+'</a>'
   						+'<strong>4</strong>'
   						+'</span>');
   					})

   					break;
   				case 'btn7':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.r_16 .m_segment .r_16_7').html('<span>'
   						+'<a href="#">'
   						+'<img src="resources/img/logo/team_logo6.png" alt="Brazil">'
   						+'<span>Team Name</span>'
   						+'</a>'
   						+'<strong>4</strong>'
   						+'</span>');
   					})

   					break;
   				case 'btn8':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.r_16 .m_segment .r_16_8').html('<span>'
   						+'<a href="#">'
   						+'<img src="resources/img/logo/team_logo7.png" alt="Brazil">'
   						+'<span>Team Name</span>'
   						+'</a>'
   						+'<strong>4</strong>'
   						+'</span>');
   					})
   					break;
   				case 'l_btn1':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.l_16 .m_segment .l_16_1').html('<span>'
   								+'              <a href="#">'
   								+'                <img src="resources/img/logo/team_logo9.png" alt="Brazil">'
   								+'              <strong>4</strong>'
   								+'				<span>Team Name</span>'
   								+'              </a>'
   								+'            </span>');
   					})
   					break;
   				case 'l_btn2':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.l_16 .m_segment .l_16_2').html('<span>'
   								+'              <a href="#">'
   								+'                <img src="resources/img/logo/team_logo10.png" alt="Brazil">'
   								+'              <strong>4</strong>'
   								+'				<span>Team Name</span>'
   								+'              </a>'
   								+'            </span>');
   					})
   					break;
   				case 'l_btn1':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.l_16 .m_segment .l_16_3').html('<span>'
   								+'              <a href="#">'
   								+'                <img src="resources/img/logo/team_logo11.png" alt="Brazil">'
   								+'              <strong>4</strong>'
   								+'				<span>Team Name</span>'
   								+'              </a>'
   								+'            </span>');
   					})
   					break;
   				case 'l_btn1':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.l_16 .m_segment .l_16_4').html('<span>'
   								+'              <a href="#">'
   								+'                <img src="resources/img/logo/team_logo12.png" alt="Brazil">'
   								+'              <strong>4</strong>'
   								+'				<span>Team Name</span>'
   								+'              </a>'
   								+'            </span>');
   					})
   					break;
   				case 'l_btn1':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.l_16 .m_segment .l_16_5').html('<span>'
   								+'              <a href="#">'
   								+'                <img src="resources/img/logo/team_logo13.png" alt="Brazil">'
   								+'              <strong>4</strong>'
   								+'				<span>Team Name</span>'
   								+'              </a>'
   								+'            </span>');
   					})
   					break;
   				case 'l_btn1':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.l_16 .m_segment .l_16_6').html('<span>'
   								+'              <a href="#">'
   								+'                <img src="resources/img/logo/team_logo14.png" alt="Brazil">'
   								+'              <strong>4</strong>'
   								+'				<span>Team Name</span>'
   								+'              </a>'
   								+'            </span>');
   					})
   					break;
   				case 'l_btn1':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.l_16 .m_segment .l_16_7').html('<span>'
   								+'              <a href="#">'
   								+'                <img src="resources/img/logo/team_logo15.png" alt="Brazil">'
   								+'              <strong>4</strong>'
   								+'				<span>Team Name</span>'
   								+'              </a>'
   								+'            </span>');
   					})
   					break;
   				case 'l_btn1':
   					$('#modal-content3').html(compo.tour_modal()).css({'background-color':'white'
   						,'height':'200px'
   						,'width': '300px'
   						,'margin': '300px'});
   					$('.btn-primary').click(()=>{
   						$('#myModal_tour').modal('hide');
   						$('.l_16 .m_segment .l_16_8').html('<span>'
   								+'              <a href="#">'
   								+'                <img src="resources/img/logo/team_logo16.png" alt="Brazil">'
   								+'              <strong>4</strong>'
   								+'				<span>Team Name</span>'
   								+'              </a>'
   								+'            </span>');
   					})
   					break;
   					
   				}
   			}
   		})
   		
   	});
   }
	   
	   
    return{onCreate:onCreate
    	,tour_apply:tour_apply}
})();
