var chat = chat||{}

chat=(()=>{
	let  _, js,compojs,homejs,msessionjs;
	let init =()=>{
		_ = $.ctx();
        js = $.js();
		compojs = js + '/compo/compo.js';
        homejs = js+ '/home/home.js';
        msessionjs = js+'/home/membersession.js'
		onCreate();
		bot();
	};
	let onCreate =(d)=>{
		$.when(
	            $.getScript(compojs),
	            $.getScript(homejs),
	            $.getScript(msessionjs),
	            $.Deferred(function(d) {
	                $(d.resolve);
	            })
	        ).done(() => {
	            setContentView(d);
	        });
	    };
	let setContentView =(d)=>{
		$.extend(new MemberSession(d));
		let id = sessionStorage.getItem('id');
		let photo = sessionStorage.getItem('photo');
		if(id==null){
			id="로그인을 해주세요.";
		}
		if(photo==null){
			photo="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg";
		}
		$('.msg_container_base').empty();
		$('#btn-chat').click(function(){
			let value = $('#btn-input').val();
			$('<div class="row msg_container base_receive">'
					+'                        <div class="col-md-2 col-xs-2 avatar">'
					+'                            <img src="'+photo+'" class=" img-responsive ">'
					+'                            </div>'
					+'                        <div class="col-xs-10 col-md-10 ">'
					+'                            <div class="messages msg_receive">'
					+'                            <p>'+value+'</p>'
					+'                        </div>'
					+'                        </div>'
					+'                    </div>').appendTo('.msg_container_base');
			$(".msg_container_base").scrollTop($(".msg_container_base")[0].scrollHeight);
			$.ajax({
				url : $.ctx()+'/chat/'+value,
				type : 'post',
				data : JSON.stringify(),
				dataType : 'json',
				contentType : 'application/json',
				success : d=>{
							$('<div class="row msg_container base_sent">'
		    				+'                        <div class="col-md-10 col-xs-10 ">'
		    				+'                            <div class="messages msg_sent">'
		    				+'                                <p>'+id+'</p>'
		    				+'                            </div>'
		    				+'                        </div>'
		    				+'                        <div class="col-md-2 col-xs-2 avatar">'
		    				+'                            <img src="resources/img/logo/logo.png" class=" img-responsive ">'
		    				+'                        </div>'
		    				+'                    </div>').appendTo('.msg_container_base');
		    	
							 
							 $(".msg_container_base").scrollTop($(".msg_container_base")[0].scrollHeight);
				},
				error : e =>{

				}
			});
			
		});
		
	};
	let bot=()=>{
		$(document).on('click', '.panel-heading span.icon_minim', function (e) {
		    var $this = $(this);
		    if (!$this.hasClass('panel-collapsed')) {
		        $this.parents('.panel').find('.panel-body').slideToggle();
		        $this.addClass('panel-collapsed');
		        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
		    }else{
		        $this.parents('.panel').find('.panel-body').slideToggle();
		        $this.removeClass('panel-collapsed');
		        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');

		    }
		});
		$(document).on('focus', '.panel-footer input.chat_input', function (e) {
			
			var $this = $(this);
		    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
		        $this.parents('.panel').find('.panel-body').slideToggle();
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
	return{init:init}
})();