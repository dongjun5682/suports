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
        $('.stadium-list').html(compo.stadium_list_content());
        $('img').click(function(e) {
            list_detail();
        })
    }

    let list = () => {

    }
    let list_detail = () => {
    	$('#footer').css('.section','padding-bottom:78px;');
    	$('#footer').css('.section','background-color: #1db91d9e;');
    	$('#footer').html('<div class="wrap">'
    			+'    <div>'
    			+'        <nav class="navbar navbar-inverse" data-spy="affix" data-offset-top="179">'
    			+'            <ul>'
    			+'            <li>'
    			+'              <div class="footer-pay">'
    			+'                   <div class="navbar-brand">'
    			+'                     <a class="logo" href="index.html">'
    			+'                             <img src="resources/img/logo/logo.png" alt="logo">'
    			+'                      </a>'
    			+'                  </div>'
    			+'                  <button class="navbar-toggle"> </button>'
    			+'            </li>'
    			+'            <li>'
    			+'             <button id="footer_payment" style="width: 105%; padding: 10px; background-color: #3688bf; right: -1000px; top: -35px;"><span style="color:white">예약하기</span></button>'
    			+'            </li>'
    			+'            </ul>'
    			+'        </nav>'
    			+'  </div>'
    			+'    </div>');
        $('#content').empty().html(compo.stadium_list_detail());
        $('#footer_payment').click(()=>{
        	alert('모달로 확인창 뜨고 결제 예약으로 이동');
        	payment();
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