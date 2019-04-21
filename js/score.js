function setScore(cName,value){
	if(value>getScore(cName));
	document.cookie=cName+'='+value;		
}
function getScore(cName){
	var a=-1;
	if(document.cookie.length>0){
		start=document.cookie.indexOf(cName+"=");
		if(start!=-1){
			start=start+cName.length+1;
			end=document.cookie.indexOf(';',start);
			if(end==-1)end=document.cookie.length;
			a=parseInt(unescape(document.cookie.substring(start,end)));   
		}
	}
	return (a==-1)?0:a;
}