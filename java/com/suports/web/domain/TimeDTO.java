package com.suports.web.domain;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

@Data @Component @Lazy
public class TimeDTO {
	private String timeIndex;
	private int time,timePrice,stadiumIndex;
}
