var member = member || {}

member = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs, stadiumjs, tournamentjs,teamjs;

    let init = () => {
        _ = $.ctx();
        js = $.js();
        compojs = js + '/compo/compo.js';
        stadiumjs = js + '/stadium/stadium.js';
        tournamentjs = js + '/tournament/tournament.js';
        teamjs = js + '/team/team.js';
    };
    let onCreate = () => {
        init();
        $.when(
            $.getScript(compojs),
            $.getScript(stadiumjs),
            $.getScript(tournamentjs),
            $.getScript(teamjs),
            $.Deferred(function(d) {
                $(d.resolve);
            })
        ).done(() => {
            setContentView();
        });
    };
    let setContentView = () => {
        $('#nav').empty().after(compo.login_nav());
        $('#userBtn').click(() => {
            $('#userBtn').after(compo.login_drop_btn());
          
            $('#frofile').click(()=>{
            	profile();
            });
            
            $('#myteam').click(()=>{
            	team.team_update_info();
            });
            
        });
        $('a').click(function(e) {
            alert('click :' + $(this).attr('id'));
            let _this = $(this).attr('id');
            switch (_this) {
                case 'alram':
                    $('#user-drop').remove();
                    $(this).attr({
                            'class': 'dropdown-toggle',
                            'data-toggle': 'dropdown',
                            'aria-expanded': 'false'
                        })
                        .after(compo.alram_drop_btn());
                    break;
                case 'exercise':
                    alert('운동 클릭!');
                    $('#content').css('margin-top', '80px');
                    stadium.payment_reservation();
                    break;
                case 'team':
                    $('#content').css('margin-top', '80px');
                    alert('팀 클릭!');
                    team.onCreate();
                    break;
                case 'tourment':
                    $('#content').css('margin-top', '80px');
                    $('#content').css({
                        'margin-top': '70px',
                        'background-color': '#f0f0f0',
                        'height': '850px'
                    });
                    alert('토너먼트 클릭!');
                    tour.onCreate();
                    break;
                case 'about':
                    alert('소개 클릭!!');
                    break;
                default:
                    break;
            }
        })
        
        
    }
    let profile =()=>{
    	$('#footer').remove();
    	$('#content').empty().html(compo.update_player()).css('margin-top', '80px');
    	$('#profile_update').click(()=>{
    		profile();
    	});
    	$('#profile_photo_update').click(()=>{
    		profile_photo_update();
    	});
    	
    }
    let profile_photo_update =()=>{
    	$('#content').empty().html(compo.update_photo_player());
    }
    return {onCreate:onCreate,profile:profile,profile_photo_update:profile_photo_update}
})();