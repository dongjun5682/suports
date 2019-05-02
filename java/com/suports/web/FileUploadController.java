package com.suports.web;

import java.io.File;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component @Data @Lazy
public class FileUploadController {

//	@Autowired Image img;
	
	@SuppressWarnings("null")
	public void fileUpload(String memberId) {
		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setFileSizeMax(1024 * 1024 * 40); // 40 MB
		upload.setSizeMax(1024 * 1024 * 50); // 50 MB
		List<FileItem> items = null;
		try {
			File file = null;
			Iterator<FileItem> it = items.iterator();
			while (it.hasNext()) {
				FileItem item = it.next();
				if (!item.isFormField()) {
					String fileName = item.getName();
					file = new File("" + fileName);
					item.write(file);
//					img.setImgName(fileName.substring(0, fileName.indexOf(".")));
//					img.setImgExtention(fileName.substring(fileName.indexOf(".") + 1));
//					img.setImgOwner(memberId);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
