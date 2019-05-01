package com.suports.web.mapper;

import org.springframework.stereotype.Repository;

@Repository
public interface CategoryMapper {
	public void selectCategoryList(); 
	public void selectCategory();
	public String selectCategory(String searchWord);
	public int countCategory();
	public boolean existsCategory(String searchword);
	public void updateCategory(CategoryMapper cat);
	public void deleteCategory(CategoryMapper cat);
}
