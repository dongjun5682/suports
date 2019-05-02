var team = team || {};

team = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs, memberjs, stadiumjs, tournamentjs,homejs;

    let init = () => {
        _ = $.ctx();
        js = $.js();
        compojs = js + '/compo/compo.js';
        memberjs = js + '/member/member.js';
        stadiumjs = js + '/stadium/stadium.js';
        tournamentjs = js + '/tournament/tournament.js';
        homejs = js + '/home/home.js';
    };
    let onCreate = (d) => {
        init();
        $.when(
            $.getScript(compojs),
            $.getScript(memberjs),
            $.getScript(stadiumjs),
            $.getScript(tournamentjs),
            $.getScript(homejs),
            $.Deferred(function(d) {
                $(d.resolve);
            })
        ).done(() => {
            setContentView(d);
        });
    };
    let setContentView = (d) => {
    	$('#content').empty();
    	$('#footer').empty();
    	team_list();
    	$('#team_create').click(()=>{
    			team_create(d);    			    			
    	})
    	$('.course-img').click(()=>{
    		alert('팀 디테일');
    	})
    }
    let team_list =()=>{
    	$('#content').html(compo.team_list());
    }
    let team_detail =()=>{
    	
    }
    let team_create =(d)=>{
    	$('#modal-content2').html(compo.team_create_1(d));
    		let d_data = { memberId : d.id }
    		alert('create2 '+d_data.memberId);
        $('.fieldbtn').click(() => {
            $('#modal-content2').html(compo.team_create_2());
            $('.textnext').click(() => {
            	let formdata = {
    					name : $('input[name="teamName"]').val(),
    					avgage : $('input[name="teamAge"]').val(),
    					sort : $('select[name="teamSort"]').val(),
    					address : $('select[name="teamLocation"]').val(),
    					sport : $('select[name="teamSport"]').val(),
    					style : $('select[name="teamStyle"]').val(),
    					info : $('#teamInfo').val()
    			};
                $('#modal-content2').html(compo.team_create_3());
                $('.textnext').click(() => {
                	let formdata2 = {
                			emblem : 'default_emblem.jpg'
        			};
                    $('#modal-content2').html(compo.team_create_4());
                    $('.textnext').click(() => {
                        $('#modal-content2').html(compo.team_create_5());
                        	let formdata3 = {
                        			name : formdata.name,
                        			avgage : formdata.avgage,
                        			sort : formdata.sort,
                        			captain: '1',
//                        			captain: d_data.memberId,
                        			address : formdata.address,
                        			sport : formdata.sport,
                        			style : formdata.style,
                        			info : formdata.info,
                        			emblem : formdata2.emblem
                			};
                        	alert(formdata3.address+'  ==  '+formdata3.sport+'  ==  '+formdata3.info+'  ==  '+formdata3.emblem+"  ==  "+formdata3.name);
                        	 $('#team-create-btn').click(() => {
                            	$.ajax({
                                	url : $.ctx()+'/teams/',
                                	type : 'POST',
                                	data : JSON.stringify(formdata3),
                                	dataType : 'json',
                                	contentType : "application/json; charset=utf-8",
                                	success : d => {
                                		$('#myModal').modal('hide');
                                		},
                                		error : e => {
                                		alert('ajax fail');
                                		}
                                })
                            })
                    })
                })
            })
        })
    	
    }
    let team_update_info =()=>{
    	$('#footer').remove();
    	$('#content').empty().html(compo.team_update_info());
    
    	$('#team_update_info').click(()=>{
    		team_update_info();
    	});
    	$('#team_update_emblem').click(()=>{
    		team_update_emblem();
    	});
    	
    	$('#team_update_photo').click(()=>{
    		team_update_photo();
    	});
    	
    	$('#team_manage').click(()=>{
    		team_manage();
    	});
    	
    }
    let team_update_emblem =()=>{
    	$('#content').empty().html(compo.team_update_emblem());
    }
    let team_update_photo =()=>{
    	$('#content').empty().html(compo.team_update_picture());
    }
    let team_manage =()=>{
    	$('#content').empty().html(compo.team_manage());
    }
    return{onCreate:onCreate,
    	team_list:team_list,
    	team_detail:team_detail
    	,team_create:team_create
    	,team_update_info:team_update_info
    	,team_update_emblem:team_update_emblem
    	,team_update_photo:team_update_photo
    	,team_manage:team_manage};
    
})();
    