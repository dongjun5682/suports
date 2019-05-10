var member = member || {}

member = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs, stadiumjs, tournamentjs, teamjs;

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
    	$('#map').remove();
        alert('member!!!');
        $('#content').empty().append(compo.content());
        jQuery(function($) {
            $('#home').vidbg({
                'mp4': 'resources/video/Fifa.mp4',
            }, {
                // Options
                muted: true,
                loop: true,
                overlay: true,
            });
        });
        $('#home').attr('style', '" "');
        $('#rm_search').empty().append(compo.srch());
        $('#content').css('margin-top', '0');
        $('#footer').remove();
        $('#myMpa').after(compo.footer());
        home_list_after();
        $('#nav').empty().after(compo.login_nav());
        $('#userBtn').click(() => {
            $('#userBtn').after(compo.login_drop_btn());
            $('#user-drop').attr('style', '" "');
            $('#frofile').click(() => {
                profile();
            });
            $('#myteam').click(() => {
                team.team_update_info();
            });

        });
        $('.navbar-right a').click(function(e) {
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
                    let x = {
                        'page': 1
                    };
                    team.team_list_after(x);
                    break;
                case 'tourment':
                    $('#content').css('margin-top', '80px');
                    $('#content').css({
                        'margin-top': '70px',
                        'height': '850px'
                    });
                    alert('토너먼트 클릭!');
                    tour.tour_apply();
                    break;
                case 'about':
                    alert('소개 클릭!!');
                    break;
                default:
                    break;
            }
        })

        $('#sear-btn').click(function() {
            /*alert('addr : '+ $('.search-addr').val());
            alert('date : '+ $('.search-date').val());
            alert('time : '+ $('.search-time').val());
            alert('sport : '+ $('.search-sports').val());
            alert('position : '+ $('.search-position').val());*/
            let search = {
                p: 1,
                s: $('.search-addr').val()
            };
            if (search.s === '') {
                let arr = {
                    p: 1
                };
                stadium.list(arr);
            } else {
                stadium.srch(search);
            }
        });
        $('#stadium_list').click(() => {
            $('#content').css('margin-top', '80px');
            alert('전체 운동장 보기');
            let arr = {
                p: 1
            };
            stadium.list_after(arr);
        })


    }
    let home_list_after = () => {
        let list_stadium_detail = '';
        $.getJSON($.ctx() + '/stadiums', d => {
            $.each(d.home, (i, j) => {
                if (j.areaName == '서울') {
                    if (i < 4) {
                        $('<div class="col-md-3 col-sm-6 col-xs-6" >' +
                            '  <div class="course">' +
                            '    <a href="#" class="course-img">' +
                            '      <img src="' + j.stadiumPhoto + '" alt="' + i + '" style="height: 220px;">' +
                            '      <i class="course-link-icon fa fa-link"></i>' +
                            '    </a>' +
                            '    <a class="course-title" href="#">' + j.stadiumName + '</a>' +
                            '    <div class="course-details">' +
                            '      <span class="course-category">' + j.stadiumAddr + '</span>' +
                            '    </div>' +
                            '    <div class="course-people">' +
                            '      <span class="course-price course-free">' + 10 + '/' + 22 + '</span>' +
                            '    </div>' +
                            '  </div>' +
                            '</div> ').appendTo('.seoul_stadium').click(function() {
                            alert(j.stadiumName);
                            stadium.list_detail_after(j);
                            
                        });
                    }
                } else if (j.areaName == '인천') {
                    if (i < 14) {
                        $('<div class="col-md-3 col-sm-6 col-xs-6" >' +
                            '  <div class="course">' +
                            '    <a href="#" class="course-img">' +
                            '      <img src="' + j.stadiumPhoto + '" alt="' + i + '" style="height: 220px;">' +
                            '      <i class="course-link-icon fa fa-link"></i>' +
                            '    </a>' +
                            '    <a class="course-title" href="#">' + j.stadiumName + '</a>' +
                            '    <div class="course-details">' +
                            '      <span class="course-category">' + j.stadiumAddr + '</span>' +
                            '    </div>' +
                            '    <div class="course-people">' +
                            '      <span class="course-price course-free">' + 10 + '/' + 22 + '</span>' +
                            '    </div>' +
                            '  </div>' +
                            '</div> ').appendTo('.Incheon_stadium').click(function() {
                            alert(j.stadiumName);
                            stadium.list_detail_after(j);
                        });
                    }
                } else if (j.areaName == '경기') {
                    if (i < 20) {
                        $('<div class="col-md-3 col-sm-6 col-xs-6">' +
                            '  <div class="course">' +
                            '    <a href="#" class="course-img">' +
                            '      <img src="' + j.stadiumPhoto + '" alt="' + i + '" style="height: 220px;">' +
                            '      <i class="course-link-icon fa fa-link"></i>' +
                            '    </a>' +
                            '    <a class="course-title" href="#">' + j.stadiumName + '</a>' +
                            '    <div class="course-details">' +
                            '      <span class="course-category">' + j.stadiumAddr + '</span>' +
                            '    </div>' +
                            '    <div class="course-people">' +
                            '      <span class="course-price course-free">' + 10 + '/' + 22 + '</span>' +
                            '    </div>' +
                            '  </div>' +
                            '</div> ').appendTo('.gyeonggi_stadium').click(function() {
                            alert(j.stadiumName);
                            stadium.list_detail_after(j);
                        });
                    }
                }
            });
        });
    }

    let profile =()=>{
    	$('#footer').remove();
    	$('#content').empty().html(compo.update_player()).css('margin-top', '80px');
    	password_tooltip();
    	$('#profile_update').click(()=>{
    		profile();
    	});
    	$('#profile_photo_update').click(()=>{
    		profile_photo_update();
    		$('.fieldupdatepicture').html(compo.input_uploadImg());
			upload_ajax();
    	});
    	$('.imgsignupbtnbg button[type=submit]').click(e=>{
        	e.preventDefault();
    		let updateData = {
    				id : $.member().id,
    				name : $('form input[name="memberName"]').val(),
    				password : $('form input[name="memberPassword"]').val(),
    				birth : $('form input[name="memberBirth"]').val(),
    				characters : $('form select[id="memberSort"]').val(),
    				info : $('form input[name="memberInfo"]').val()
    		};
    		$.ajax({
    			url : $.ctx()+'/members/'+updateData.id,
    			type : 'PUT',
    			data : JSON.stringify(updateData),
    			dataType : 'json',
    			contentType : "application/json; charset=utf-8",
    			success : d => {
    				alert('ajax update :');
    			},
    			error : e => {
    				alert('ajax fail');
    			}
    		})
    	});
    }
    let profile_photo_update = () => {
        $('#content').empty().html(compo.update_photo_player());
        $('.textcontentpg1').click(() => {
            profile();
        });
        $('.textcontentpg11').click(() => {
            profile_photo_update();
            $('.fieldupdatepicture').html(compo.input_uploadImg());
			upload_ajax();
        });
    }

    // Sign Up { Modal, Date_Picker, Tool_Tip, Validate }
    let signup = () => {
        $('.modal-content').html(compo.signup_1());
    	$('form').on('submit', function(e){
    		e.preventDefault();
			let formdata = {
					id : $('form input[name="memberId"]').val(),
					name : $('form input[name="memberName"]').val(),
					email : $('form input[name="memberEmail"]').val()
			};
    		$('.modal-content').html(compo.signup_2());
    		password_tooltip();
    		$('#datepicker').datepicker({
    			locale: 'ko-kr',
                uiLibrary: 'bootstrap4'
    		});
    		$('.imgnextbtnbg').click(() => {
    			$('.js-mytooltip').myTooltip('destroy');
    			let formdata2 = {
    					password : $('form input[name="memberPassword"]').val(),
    					birth : $('form input[name="memberBirth"]').val(),
    					address : $('form select[id="memberLocation"]').val(),
    					sports : $('form select[id="memberSports"]').val(),
    					position : $('form select[id="memberPosition"]').val(),
    					phone : $('form input[id="memberPhone"]').val()
    					};
    			$('.modal-content').html(compo.signup_3());
    			$('.imgnextbtnbg').click(() => {
    				let formdata3 = {
    						characters : $('form input[name="charRadios"]:checked').val()
    				};
    				$('.modal-content').html(compo.signup_4());
    				
    				$('#upload_div').html(compo.input_uploadImg());
    				upload_ajax();
    				
    				$('.imgnextbtnbg').click(() => {
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
           						info : formdata4.info
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

    let upload_ajax = () => {
    	$('#img_upload_btn').click((e)=>{
			alert('iub click');
            e.preventDefault();
            let memberData = {
					memberId : $.member().id
			};
            alert('memberID saved = '+memberData.memberId);
            $('#img_upload_frm').ajaxForm({
                url: $.ctx()+'/uploadImg/'+memberData.memberId,
                dataType: 'json',
                encType: "multipart/form-data",
                type: 'POST',
                beforeSubmit: function() {
                    if($('#photo').val() === ""){
                         alert("사진을 선택하셔야 합니다.");
                         return false;
                    }else{
                         let ext = $("#photo").val().split(".").pop().toLowerCase();
                         if($.inArray(ext, ['jpg','png','jpeg']) == -1){
                        	 alert('JPG, JPEG, PNG 형식의 파일만 업로드 할 수 있습니다.');
                        	 return false;
                         }
                    }
                },
                success: function(d) {
                  alert(d.result);
                }
           }).submit();
        });
		
    }
    let password_tooltip = () => {
    	$('#checkPassword').click(()=>{
    		if($("#checkPassword").prop("checked")==true){
	        	$('#memberPassword').attr("type", "text");
	        	$("#checkPassword-text").css("color","#FC913A");
	        } 
    		else {
	        	$('#memberPassword').attr("type", "password");
	        	$("#checkPassword-text").css("color","#AEB5BD");
	        }
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
			'offset': 30,
			'theme': 'light',
			'customClass': 'mytooltip-content',
			'content': '<p>t</p>'
				});   
    }
    return {

        onCreate:onCreate,
        profile:profile,
        profile_photo_update:profile_photo_update,
        signup:signup,
        home_list_after:home_list_after,
        password_tooltip:password_tooltip
    }
})();