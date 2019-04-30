package com.suports.web.domain;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

@Data @Component @Lazy
public class AreaDTO {
	private String area_Name;
	private int area_Code;
}
