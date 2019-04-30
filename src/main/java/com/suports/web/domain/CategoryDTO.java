package com.suports.web.domain;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

@Data @Component @Lazy
public class CategoryDTO {
	private String sports_Name;
	private int sports_Index;
}
