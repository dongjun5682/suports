var tour = tour || {};

tour =(()=>{
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs,memberjs,stadiumjs;

    let init =()=> {
        _ = $.ctx();
        js = $.js();
        compojs = js+'/compo/compo.js';
        memberjs = js+'/member/member.js';
        stadiumjs = js+'/stadium/stadium.js';
    };
    let onCreate =()=> {
        init();
        $.when(
            $.getScript(compojs),
            
            $.getScript(memberjs),
            $.getScript(stadiumjs),
            $.Deferred(function(d) {
                $(d.resolve);
            })
        ).done(() => {
            setContentView();
        });
    };
    let setContentView =()=>{
    	$('#content').empty().html(compo.tournament()).css({
            'margin-top': '100px',
            'height': '850px'
        });
    	$('#footer').remove();
    	$('.tournament-content').click(()=>{
    		alert('팀참가! 모달로 나오기');
    	})
    }
   
    return{onCreate:onCreate}
})();