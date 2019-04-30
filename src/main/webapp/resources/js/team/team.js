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
    let onCreate = () => {
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
            setContentView();
        });
    };
    let setContentView = () => {
    	$('#content').empty();
    	$('#footer').empty();
    	team_list();
    	$('#team_create').click(()=>{
    		alert('팀 창설');
    		team_create();
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
    let team_create =()=>{
    	$('#modal-content2').html(compo.team_create_1());
        $('.fieldbtn').click(() => {
            $('#modal-content2').html(compo.team_create_2());
            $('.textnext').click(() => {
                $('#modal-content2').html(compo.team_create_3());
                $('.textnext').click(() => {
                    $('#modal-content2').html(compo.team_create_4());
                    $('.textnext').click(() => {
                        $('#modal-content2').html(compo.team_create_5());
                        $('.fieldbtn').click(() => {
                            $('#myModal2').modal('hide');
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
    