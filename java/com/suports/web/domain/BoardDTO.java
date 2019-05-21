package com.suports.web.domain;

import java.util.Date;

import org.springframework.context.annotation.Lazy;


import org.springframework.stereotype.Component;

import lombok.Data;


@Data @Component @Lazy
public class BoardDTO {
	private int boardNo, viewCount, rnum;
	private Date regDate;
	private String title, content, writer;
}
