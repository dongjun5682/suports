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
    let onCreate = (d) => {
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
            setContentView(d);
        });
    };
    let setContentView = (d) => {
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
                    team.onCreate(d);
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

    let signup = () => {
        $('.modal-content').html(compo.signup_1());
        $('.fieldbtn').click(()=> {
        	let formdata = {
					id : $('form input[name="memberId"]').val(),
					name : $('form input[name="memberName"]').val(),
					email : $('form input[name="memberEmail"]').val()
			};
        	if($("#signupTerm").prop("checked")==true){
        		$('.modal-content').html(compo.signup_2());
        		$('#datepicker').datepicker({
                	locale: 'ko-kr',
                    uiLibrary: 'bootstrap4'
        		});
        		 $("#memberPassword").off("focus").on("focus", function () {
        			    var value = $(this).val();
        			    $('.js-mytooltip-pw').myTooltip('updateContent', getPwContent(value));
        			  });
        			  $("#memberPassword").off("click").on("click", function () {
        			    var value = $(this).val();
        			    if (!isNull(value)) {
        			      $('.js-mytooltip-pw').myTooltip('updateContent', getPwContent(value));
        			    }
        			  });
        			  $("#memberPassword").off("keyup").on("keyup", function () {
        			    $("#memberPassword").blur();
        			    $("#memberPassword").focus();
        			  });
        			  $('.js-mytooltip-pw').myTooltip({
        			    offset: 30,
        			    theme: 'light',
        			    customClass: 'mytooltip-content',
        			    direction: 'right',
        			    content: '<p>t</p>'
        			  });
        		   
        	} else {
        		alert('회원가입 약관에 동의하셔야 서비스 이용이 가능합니다.')
        	}
            $('.textnext').click(() => {
              	let formdata2 = {
    					password : $('form input[name="memberPassword"]').val(),
    					birth : $('form input[name="memberBirth"]').val(),
    					address : $('form select[id="memberLocation"]').val(),
    					sports : $('form select[id="memberSports"]').val(),
    					position : $('form select[id="memberPosition"]').val(),
    					phone : $('form input[id="memberPhone"]').val()
    			};
                $('.modal-content').html(compo.signup_3());
                $('.textnext').click(() => {
                  	let formdata3 = {
                  			characters : $('form input[name="charRadios"]:checked').val()
        			};
                    $('.modal-content').html(compo.signup_4());
                    $('.textnext').click(() => {
                    	let formdata4 = {
                    			info : $('form input[name="memberInfo"]').val()
            			};
                        $('.modal-content').html(compo.signup_5());
                        let formdata5 = {
                        		id : formdata.id,
                        		password : formdata2.password,
                        		email : formdata.email,
            					name : formdata.name,
            					birth : formdata2.birth,
            					position : formdata2.position,
            					characters : formdata3.characters,
            					sports : formdata2.sports,
            					address : formdata2.address,
            					phone : formdata2.phone,
            					info : formdata4.info,
            					photo : 'default_profile.jpg'
            			};
                        $('.beginbtn').click(() => {
                        	$.ajax({
                            	url : $.ctx()+'/members/',
                            	type : 'POST',
                            	data : JSON.stringify(formdata5),
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
    
    let upload =() => {
    	$('#addfile_btn').click(function (){
//			let ok = (this.files[0]) ? true : false;
//			if(ok) {
				let fd = new FormData();
				
				alert('click file upload');
				alert('this files[0]'+this.files[0]);
				
				fd.append('file', this.files[0]);
				$.ajax({
					url : $.ctx()+'/products/files',
					type : 'POST',
					data : fd,
					async : false,
					cache : false,
					contentType : false,
					processData : false,
					success : d => {
						alert('seccess');
					},
					error : e => {
						alert('error');
					}
				});
//			} else {
//				alert('Image file uploading..');
//			}
		});
    	
    }
    return {
        onCreate:onCreate,
        profile:profile,
        profile_photo_update:profile_photo_update,
        signup:signup
    }
})();