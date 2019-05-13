var chat = chat||{}

chat=(()=>{
	let  _, js,compojs,homejs,msessionjs;
	let init =()=>{
		_ = $.ctx();
        js = $.js();
		compojs = js + '/compo/compo.js';
        homejs = js+ '/home/home.js';
        stajs = js+ '/stadium/stadium.js';
        msessionjs = js+'/home/membersession.js'
		onCreate();
	};
	let onCreate =(d)=>{
		$.when(
	            $.getScript(compojs),
	            $.getScript(homejs),
	            $.getScript(msessionjs),
	            $.getScript(stajs),
	            $.Deferred(function(d) {
	                $(d.resolve);
	            })
	        ).done(() => {
	            setContentView(d);
	        });
	    };
	let setContentView =(d)=>{
		chat_bot(d);
		
	};
	let chat_bot =(d)=>{
		/*bot();*/
		let id = sessionStorage.getItem('id');
		let photo = sessionStorage.getItem('photo');
		if(photo==null){
			photo="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg";
		}
		$('#chat_input').on('keydown',function(event){
	    if(event.keyCode ==13){
	    event.preventDefault();
	    $('#btn-chat').click();
	        }
	    });
		$('.msg_container_base').empty();
		$('#btn-chat').on('click', () => {
			let search = $('#chat_input').val();
	        	if (search === ''){
	            alert('검색어를 입력하십시오');
	        	} else {
	        	$('<div class="row msg_container base_receive">'
	    					+'                        <div class="col-md-2 col-xs-2 avatar">'
	    					+'                            <img src="'+photo+'" class=" img-responsive ">'
	    					+'                            </div>'
	    					+'                        <div class="col-xs-10 col-md-10 ">'
	    					+'                            <div class="messages msg_receive">'
	    					+'                            <p>'+search+'</p>'
	    					+'                        </div>'
	    					+'                        </div>'
	    					+'                    </div>').appendTo('.msg_container_base');
	    		$(".msg_container_base").scrollTop($(".msg_container_base")[0].scrollHeight);
	            let arr = {s: search};
	            chat_answer(arr);
	        	}
		    	});
	};
	let chat_answer =x=>{
		$.getJSON($.ctx()+'/chatbot/value/'+ x.s,d=>{
			switch(x.s){
			case "안녕" : case "안녕하세요" :
			$('<div class="row msg_container base_sent">'
    				+'                        <div class="col-md-10 col-xs-10 ">'
    				+'                            <div class="messages msg_sent">'
    				+'                                <p>'+d.value.msg+'</p>'
    				+'                            </div>'
    				+'                        </div>'
    				+'                        <div class="col-md-2 col-xs-2 avatar">'
    				+'                            <img src="resources/img/logo/logo.png" class=" img-responsive ">'
    				+'                        </div>'
    				+'                    </div>').appendTo('.msg_container_base');
					 $(".msg_container_base").scrollTop($(".msg_container_base")[0].scrollHeight);
					 break;
			case "운동장" : case "경기장" : case "리스트 보여줘" : 
			$('<div class="row msg_container base_sent">'
    				+'                        <div class="col-md-10 col-xs-10 ">'
    				+'                            <div class="messages msg_sent">'
    				+'                                <p>잠시만 기다려주세요</p>'
    				+'                            </div>'
    				+'                        </div>'
    				+'                        <div class="col-md-2 col-xs-2 avatar">'
    				+'                            <img src="resources/img/logo/logo.png" class=" img-responsive ">'
    				+'                        </div>'
    				+'                    </div>').appendTo('.msg_container_base');
					 $(".msg_container_base").scrollTop($(".msg_container_base")[0].scrollHeight);
					 let ar = {p: 1};
					 stadium.list(ar);
					 break;
			case "로그인" : 
					$('<div class="row msg_container base_sent">'
    				+'                        <div class="col-md-10 col-xs-10 ">'
    				+'                            <div class="messages msg_sent">'
    				+'                                <p>로그인 화면 이동중 입니다.</p>'
    				+'                            </div>'
    				+'                        </div>'
    				+'                        <div class="col-md-2 col-xs-2 avatar">'
    				+'                            <img src="resources/img/logo/logo.png" class=" img-responsive ">'
    				+'                        </div>'
    				+'                    </div>').appendTo('.msg_container_base');
					$('.modal-content').html(compo.signin());
					home.login();
			        break;
			default : 
				$('<div class="row msg_container base_sent">'
	    				+'                        <div class="col-md-10 col-xs-10 ">'
	    				+'                            <div class="messages msg_sent">'
	    				+'                                <p>죄송합니다 인식하지 못했어요.</p>'
	    				+'                            </div>'
	    				+'                        </div>'
	    				+'                        <div class="col-md-2 col-xs-2 avatar">'
	    				+'                            <img src="resources/img/logo/logo.png" class=" img-responsive ">'
	    				+'                        </div>'
	    				+'                    </div>').appendTo('.msg_container_base');
						 $(".msg_container_base").scrollTop($(".msg_container_base")[0].scrollHeight);
			};
		});
		};
	let bot=()=>{
		$(document).on('click', '.panel-heading span.icon_minim', function (e) {
		    var $this = $(this);
		    if (!$this.hasClass('panel-collapsed')) {
		        $this.parents('.panel').find('.panel-body').slideUp();
		        $this.addClass('panel-collapsed');
		        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
		    }else{
		        $this.parents('.panel').find('.panel-body').slideDown();
		        $this.removeClass('panel-collapsed');
		        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');

		    }
		});
		$(document).on('focus', '.panel-footer input.chat_input', function (e) {
			
			var $this = $(this);
		    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
		        $this.parents('.panel').find('.panel-body').slideDown();
		        $('#minim_chat_window').removeClass('panel-collapsed');
		        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
		    }
		});
		$(document).on('click', '#new_chat', function (e) {
		    var size = $( ".chat-window:last-child" ).css("margin-left");
		     size_total = parseInt(size) + 400;
		    alert(size_total);
		    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
		    clone.css("margin-left", size_total);
		});
		$(document).on('click', '.icon_close', function (e) {
		    $( "#chat_window_1" ).remove();
		});
	}
	let chat_login = () => {
		$('.modal-content').html(compo.signin());
        $('.login100-form-btn').click(e => {
            e.preventDefault();
            let logindata = {
                id: $('form input[name="username"]').val(),
                password: $('form input[name="pass"]').val()
            };
            $.ajax({
                url: $.ctx() + '/members/' + logindata.id,
                type: 'POST',
                data: JSON.stringify(logindata),
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: d => {
                    //멤버세션을 사용해서 어디서든 아이디를 호출 가능
                    $.extend(new MemberSession(d));
                    member.onCreate(d);
                },
                error: e => {
                    alert('ajax fail');
                }
            })
            $('#myModal').modal('hide');
        });
        $('#signupBtn_in_signin').click(() => {
            signup();
        })
    }
	return{init:init,bot:bot,chat_bot:chat_bot,chat_answer:chat_answer,chat_login:chat_login}
})();