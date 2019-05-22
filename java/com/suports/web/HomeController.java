package com.suports.web;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@SessionAttributes({"ctx","css","js","img"})
public class HomeController {
	
	@Autowired HttpSession session;
	@Autowired HttpServletRequest request;
	
	// Suports
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		
		return "index";
	}
	
	// Portfolio landing
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String intro(HttpSession session, HttpServletRequest request) {
		String ctx = request.getContextPath();
		session.setAttribute("ctx", ctx); 
		session.setAttribute("css", ctx+"/resources/css");
		session.setAttribute("js", ctx+"/resources/js");
		session.setAttribute("img", ctx+"/resources/img");
		return "intro";
	}
	
	@RequestMapping(value = "/intro", method = RequestMethod.GET)
	public String intro(Locale locale, Model model) {
		
		return "intro";
	}
	@RequestMapping(value = "/about", method = RequestMethod.GET)
	public String about(Locale locale, Model model) {
		
		return "about";
	}
	@RequestMapping(value = "/blogSingle", method = RequestMethod.GET)
	public String blogSingle(Locale locale, Model model) {
		
		return "blog-single";
	}
	@RequestMapping(value = "/blog", method = RequestMethod.GET)
	public String blog(Locale locale, Model model) {
		
		return "blog";
	}
	@RequestMapping(value = "/contact", method = RequestMethod.GET)
	public String contact(Locale locale, Model model) {
		
		return "contact";
	}
	@RequestMapping(value = "/portfolio", method = RequestMethod.GET)
	public String portfolio(Locale locale, Model model) {
		
		return "portfolio";
	}
	@RequestMapping(value = "/services", method = RequestMethod.GET)
	public String services(Locale locale, Model model) {
		
		return "services";
	}
	
}
