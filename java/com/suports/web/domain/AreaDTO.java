package com.suports.web.domain;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

@Data @Component @Lazy
public class AreaDTO {
	private String areaName;
	private int areaCode;
}
