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
	prevBlock,nextBlock,totalCount,teamIndex,
	gmNumber,mIndex;
	private boolean existPrev, existNext;
	private String search,resNumber,name,date,time;

    public void carryOut(Map<?,?> paramMap) {

		pageSize = ((String)paramMap.get("pageSize") == null) ? 5 : Integer.parseInt((String) paramMap.get("pageSize"));
		pageNum = ((String)paramMap.get("pageNum") == null) ? 1 : Integer.parseInt((String) paramMap.get("pageNum"));
		totalCount = (paramMap.get("totalCount") == null ? 0 : (int) paramMap.get("totalCount"));
		
		teamIndex = (paramMap.get("teamIndex") == null) ? 0 : (int) paramMap.get("teamIndex");
		
		int pageCount = (totalCount % pageSize != 0) ?  totalCount/pageSize+1:totalCount/pageSize;
		String _blockSize = (String)paramMap.get("blockSize");
		blockSize = (_blockSize == null) ? 5 : Integer.parseInt(_blockSize);
		startRow = (pageNum -1) *pageSize + 1;
		endRow = (totalCount > pageNum * pageSize)? pageNum * pageSize: totalCount;
	
		blockNum = (int)(Math.ceil(pageNum / (double)blockSize) * blockSize);
		endPage = blockNum;
		startPage = (endPage - blockSize) + 1; 
		endPage = (blockNum > pageCount ) ? pageCount :blockNum ;
		existNext = (startPage + pageSize) <= pageCount;
		existPrev = (startPage - pageSize) > 0 ;
		prevBlock = startPage - pageSize;
		nextBlock = startPage + pageSize;

		search = (String) paramMap.get("search");
    }   
    public void search(Map<?,?> paramMap) {
    	
    	pageSize = ((String)paramMap.get("pageSize") == null)	? 5 : Integer.parseInt((String) paramMap.get("pageSize"));
		pageNum = ((String)paramMap.get("pageNum") == null) ? 1 : Integer.parseInt((String) paramMap.get("pageNum"));
		totalCount = (int) paramMap.get("totalCount");
		/* teamIndex = (int) paramMap.get("teamIndex"); */
		
		int pageCount = (totalCount % pageSize != 0) ?  totalCount/pageSize+1:totalCount/pageSize;
		String _blockSize = (String)paramMap.get("blockSize");
		blockSize = (_blockSize == null) ? 5 : Integer.parseInt(_blockSize);
		startRow = (pageNum -1) *pageSize + 1;
		endRow = (totalCount > pageNum * pageSize)? pageNum * pageSize: totalCount;
	
		blockNum = (int)(Math.ceil(pageNum / (double)blockSize) * blockSize);
		endPage = blockNum;
		startPage = (endPage - blockSize) + 1; 
		endPage = (blockNum > pageCount ) ? pageCount :blockNum ;
		existNext = (startPage + pageSize) <= pageCount;
		existPrev = (startPage - pageSize) > 0 ;
		prevBlock = startPage - pageSize;
		nextBlock = startPage + pageSize;

		search = (String) paramMap.get("search");
		date = (String) paramMap.get("date");
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
