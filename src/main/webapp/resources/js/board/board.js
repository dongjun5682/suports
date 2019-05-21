var board = board || {}

board = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs, stadiumjs, tournamentjs, teamjs, chatjs;

    let init = () => {
        _ = $.ctx();
        js = $.js();
        compojs = js + '/compo/compo.js';
        stadiumjs = js + '/stadium/stadium.js';
        tournamentjs = js + '/tournament/tournament.js';
        teamjs = js + '/team/team.js';
        chatjs = js + '/home/chat.js';
    };
    let onCreate = (x) => {
        init();
        $.when(
            $.getScript(compojs),
            $.getScript(stadiumjs),
            $.getScript(tournamentjs),
            $.getScript(teamjs),
            $.getScript(chatjs),
            $.Deferred(function(x) {
                $(x.resolve);
            })
        ).done(() => {
            setContentView(x);
        });
    };
    let setContentView = (x) => {
    	$('#content').html(compo.notice_frame());
    	
    	let title = '<div class="notice_title"><h3>서포츠 공지사항</h3></div>';
    	
    	let table = '';
    	table += '<table class="table table-hover" id="notice_table_form">'
    	+'        <thead>'
    	+'          <tr class="notice_titles">'
    	+'            <th scope="col">번호</th>'
    	+'            <th scope="col">제목</th>'
    	+'            <th scope="col">작성자</th>'
    	+'            <th scope="col">작성일자</th>'
    	+'            <th scope="col">조회수</th>'
    	+'          </tr>'
    	+'        </thead>'
    	+'        <tbody>';
    	
    	$.getJSON($.ctx() + '/boards/page/'+x.page, d => {
    		$.each(d.board, (i,j) => {
    			let date = new Date(j.regDate);
    			let regDateDeco = date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();
    			table += '<tr class="notice_articles">'
    				+'    <th scope="row">'+j.rnum+'</th>'
                	+'    <td class="NA_title"><a href="#" class="board_no" name="'+j.boardNo+'">'+j.title+'</td>'
                	+'    <td class="NA_writer">'+j.writer+'</td>'
                	+'    <td class="NA_regdate">'+regDateDeco+'</td>'
                	+'    <td class="NA_regdate">'+j.viewCount+'</td>'
                	+'</tr>'
    		})
    		table += '</tbody></table>';
        	
        	let pagination = '<ul class="pagination" id="member_List_Paging">';

        	let i = 0;
			for(i = d.pxy.startPage; i <= d.pxy.endPage; i++){
				if (d.pxy.pageNum == i){
					pagination += '<li class="page-item active"><a href="#" class="paging">'+i+'</a></li>';
				} else {
					pagination += '<li class="page-item"><a href="#" class="paging">'+i+'</a></li>';
				}
			};
			pagination += '</ul>'
			let attach = '';
			if(sessionStorage['member']) {
				if($.member().memberIndex == 1){
					let create_btn = '<div class="article_write_btn"><button type="button" class="writing">글쓰기</button></div>';
		        	attach = title + table + create_btn + pagination;
				}
			} else {
				attach = title + table + pagination;
			}
        	$('#update_mid_content').append(attach);
        	
        	$('.page-item').click(function(){
				let xn = {
					page : $(this).text()
				}
				onCreate(xn);
			});
        	$('.board_no').click(function(){
        		let xy = {
        				boardNo : $(this).attr('name')
        			}
        		read(xy);
        	});
        	$('.writing').click(function(){
        		write();
        	});
    	});
    };
    let read = (xy) => {
		$.getJSON($.ctx() + '/boards/article/'+xy.boardNo, d => {
			$('#update_mid_content').empty();
			let date = new Date(d.regDate);
			let regDateDeco = date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear();
			
			let article_content = '<div class="board_article">'
					+'    <div class="ba_titles">'
					+'        <div class="ba_title_n">번호</div>'
					+'        <div class="ba_title_t">제목</div>'
					+'        <div class="ba_title_w">작성자</div>'
					+'        <div class="ba_title_d">작성일자</div>'
					+'        <div class="ba_title_v">조회수</div>'
					+'    </div>'
					+'    <div class="ba_infos">'
					+'        <div class="ba_info_n">'+d.boardNo+'</div>'
					+'        <div class="ba_info_t">'+d.title+'</div>'
					+'        <div class="ba_info_w">'+d.writer+'</div>'
					+'        <div class="ba_info_d">'+regDateDeco+'</div>'
					+'        <div class="ba_info_v">'+d.viewCount+'</div>'
					+'    </div>'
					+'    <div class="ba_content">'
					+'        <div class="board_content">'+d.content+'</div>'
					+'    </div>'
					+'</div>';
			$('#update_mid_content').append(article_content);
		});
    }
    write = () => {
		let smart_editor = '<div id="update_mid_content"><div class="notice_h"><h3>공지사항</h3></div>'
			+'<div class="notice_editor">'
			+'<form method="post">'
			+'<div class="form-group">'
			+' <label for="notice_title">제목:</label>'
			+'  <input type="text" class="form-control" id="notice_title" placeholder="제목을 입력하세요.">'
			+'</div>'
			+'  <textarea id="summernote" name="editordata"></textarea>'
			+'</div><div class="article_insert_btn"><button type="submit" class="insert_article">작성완료</button></div></div>';
			+'</form>'
		$('#update_mid_content').html(smart_editor);
		$('#summernote').summernote({
			height: 320,
			minHeight: null,
			maxHeight: 540,
			lang: 'ko-KR',
			callbacks: {
				onImageUpload: function(files, editor, welEditable) {
					for (var i = files.length - 1; i >= 0; i--) {
						sendFile(files[i], this);
					}
		        }
		    }
		});
		$('.insert_article').click(()=>{
			let articleData = {
					title : $('form input[id="notice_title"]').val(),
					content : $('#summernote').summernote('code'),
					writer : $.member().name
			}
			$.ajax({
				url : $.ctx()+'/boards/',
				type : 'PUT',
				data : JSON.stringify(articleData),
				dataType : 'json',
				contentType : "application/json; charset=utf-8",
				success : d => {
					let xn = {
							page : 1
					}
					board.onCreate(xn);
				},
				error : e => {				
					
				}
			});
		})
	
    }
    return {
        onCreate : onCreate,
        read : read,
        write : write
    }
})();