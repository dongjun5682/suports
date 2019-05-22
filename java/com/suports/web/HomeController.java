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

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String intro(HttpSession session, HttpServletRequest request) {
		String ctx = request.getContextPath();
		session.setAttribute("ctx", ctx); 
		session.setAttribute("css", ctx+"/resources/css");
		session.setAttribute("js", ctx+"/resources/js");
		session.setAttribute("img", ctx+"/resources/img");
		return "intro";
	}
	
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		
		return "index";
	}
}
