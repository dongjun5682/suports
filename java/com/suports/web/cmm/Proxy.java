package com.suports.web.cmm;

import java.util.Map;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import lombok.Data;

@Component @Data @Lazy
public class Proxy {

	private int pageNum,pageSize,
	blockSize,
	startRow,endRow,
	startPage,endPage,blockNum,
	prevBlock,nextBlock,totalCount,index,
	gmNumber,mIndex;
	private boolean existPrev, existNext;
	private String search,resNumber,name,date,time;

    public void carryOut(Map<?,?> paramMap) {

		pageSize = ((String)paramMap.get("pageSize") == null) ? 5 : Integer.parseInt((String) paramMap.get("pageSize"));
		pageNum = ((String)paramMap.get("pageNum") == null) ? 1 : Integer.parseInt((String) paramMap.get("pageNum"));
		totalCount = (paramMap.get("totalCount") == null ? 0 : (int) paramMap.get("totalCount"));
		
		index = (paramMap.get("index") == null) ? 0 : (int) paramMap.get("index");
		
		int pageCount = (totalCount % pageSize != 0) ?  totalCount/pageSize+1:totalCount/pageSize;
		String _blockSize = (String)paramMap.get("blockSize");
		blockSize = (_blockSize == null) ? 5 : Integer.parseInt(_blockSize);
		startRow = (pageNum -1) * pageSize + 1;
		endRow = (totalCount > pageNum * pageSize)? pageNum * pageSize: totalCount;
	
		blockNum = (int)(Math.ceil(pageNum / (double)blockSize) * blockSize);
		endPage = blockNum;
		startPage = (endPage - blockSize) + 1; 
		endPage = (blockNum > pageCount ) ? pageCount :blockNum ;
		existNext = (startPage+blockSize)>pageCount?false:true;
		existPrev = (pageNum<=blockSize)?false:true;
		prevBlock = startPage - pageSize;
		nextBlock = startPage + pageSize;
		search = (String) paramMap.get("search");
    }   
    public void carryOutLimit(Map<?,?> paramMap) {
    	pageSize = ((String)paramMap.get("pageSize") == null) ? 5 : Integer.parseInt((String) paramMap.get("pageSize"));
		pageNum = ((String)paramMap.get("pageNum") == null) ? 1 : Integer.parseInt((String) paramMap.get("pageNum"));
		totalCount = (paramMap.get("totalCount") == null ? 0 : (int) paramMap.get("totalCount"));
		
		int pageCount = (totalCount % pageSize != 0) ?  totalCount/pageSize+1:totalCount/pageSize;
		String _blockSize = (String)paramMap.get("blockSize");
		blockSize = (_blockSize == null) ? 5 : Integer.parseInt(_blockSize);
		startRow = (pageNum -1) * pageSize;
		endRow = (totalCount > pageNum * pageSize)? pageNum * pageSize: totalCount;
	
		blockNum = (int)(Math.ceil(pageNum / (double)blockSize) * blockSize);
		endPage = blockNum;
		startPage = (endPage - blockSize) + 1; 
		endPage = (blockNum > pageCount ) ? pageCount :blockNum ;
		existNext = (startPage+blockSize)>pageCount?false:true;
		existPrev = (pageNum<=blockSize)?false:true;
		prevBlock = startPage - pageSize;
		nextBlock = startPage + pageSize;
    }
    public void search(Map<?,?> paramMap) {
    	
    	pageSize = ((String)paramMap.get("pageSize") == null)	? 5 : Integer.parseInt((String) paramMap.get("pageSize"));
		pageNum = ((String)paramMap.get("pageNum") == null) ? 1 : Integer.parseInt((String) paramMap.get("pageNum"));
		totalCount = (paramMap.get("totalCount") == null ? 0 : (int) paramMap.get("totalCount"));
		
		int pageCount = (totalCount % pageSize != 0) ?  totalCount/pageSize+1:totalCount/pageSize;
		String _blockSize = (String)paramMap.get("blockSize");
		blockSize = (_blockSize == null) ? 5 : Integer.parseInt(_blockSize);
		startRow = (pageNum -1) *pageSize + 1;
		endRow = (totalCount > pageNum * pageSize)? pageNum * pageSize: totalCount;
		blockNum = (int)(Math.ceil(pageNum / (double)blockSize) * blockSize);
		endPage = blockNum;
		startPage = (endPage - blockSize) + 1; 
		endPage = (blockNum > pageCount ) ? pageCount :blockNum ;
		existNext = (startPage+blockSize)>pageCount?false:true;
		existPrev = (pageNum<=blockSize)?false:true;
		prevBlock = startPage - pageSize;
		nextBlock = startPage + pageSize;
		search = (String) paramMap.get("search");
		time = (String) paramMap.get("time");
    	
    }
    public void reservation(Map<?,?> paramMap) {
    	
		resNumber = (String) paramMap.get("resNumber");
		gmNumber = (int) paramMap.get("gmNumber");
		mIndex = (int) paramMap.get("mIndex");
    }
    
    public void alram(Map<?, ?> paramMap) {
    	
    	mIndex = (int) paramMap.get("mIndex");
    	name = (String) paramMap.get("name");
    }

}
