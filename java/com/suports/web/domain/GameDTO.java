package com.suports.web.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component @Lazy
public class GameDTO {

	private int gameIndex,timeIndex,memberIndex;
	private String positionName,gameDate;
}
