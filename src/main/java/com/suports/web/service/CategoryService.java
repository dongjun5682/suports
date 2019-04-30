package com.suports.web.service;
import org.springframework.stereotype.Component;

import com.suports.web.mapper.CategoryMapper;

@Component
public interface CategoryService {
	public void selectCategoryList(); 
	public void selectCategory();
	public String selectCategory(String searchWord);
	public int countCategory();
	public boolean existsCategory(String searchword);
	public void updateCategory(CategoryMapper cat);
	public void deleteCategory(CategoryMapper cat);
}
