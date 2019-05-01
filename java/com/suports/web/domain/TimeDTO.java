package com.suports.web.domain;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

@Data @Component @Lazy
public class TimeDTO {
	private String game_Time;
	private int stadium_Index,game_Number;
}
