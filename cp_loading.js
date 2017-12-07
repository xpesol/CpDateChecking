setDeliveryEstimatedDateFromLoadingEstimatedDate = function(){
		whichLoadingEstimatedDateFr = document.getElementById('h_loading_estimated_date').value; 
		
		deliveryDurationInDays = 21;
		deliveryDurationInMilliSeconds = deliveryDurationInDays*24*3600*1000;
		
		arrayDate = whichLoadingEstimatedDateFr.split("/");
		day = arrayDate[0];
		month = arrayDate[1]-1;
		year = arrayDate[2];
		
		var whichLoadingEDate = new Date(year,month,day);
		var whichDeliveryDate = new Date(whichLoadingEDate.getTime()+deliveryDurationInMilliSeconds);

		day = whichDeliveryDate.getDate();
		month = whichDeliveryDate.getMonth()+1;
		if((month+='').length == 1){
			month = '0'+month;
		}
		if((day+='').length == 1){
			day = '0'+day;
		}
		year = whichDeliveryDate.getFullYear();
		whichDeliveryEstimatedDateFr = day+'/'+month+'/'+year;
		
		document.getElementById('h_delivery_estimated_date').value = whichDeliveryEstimatedDateFr;

}


var testIfLoadingEstimatedEalierThanDeliveryEstimated = true;

setToTrueTestIfLoadingEstimatedEalierThanDeliveryEstimated = function(){
	testIfLoadingEstimatedEalierThanDeliveryEstimated = true;
}

var tmIfLoadingEstimatedEalierThanDeliveryEstimated;

ifLoadingEstimatedEalierThanDeliveryEstimated = function( isReady ){
	if(!isReady ){
		
//	if(document.getElementById('h_loading_estimated_date').value == undefined ){
	} else {
		whichLoadingEstimatedDateFr = document.getElementById('h_loading_estimated_date').value; 
		whichLoadingEstimatedTimeHour = document.getElementById('h_loading_estimated_time_hour').value; 
		whichLoadingEstimatedTimeMinute = document.getElementById('h_loading_estimated_time_minute').value; 

		whichDeliveryEstimatedDateFr = document.getElementById('h_delivery_estimated_date').value; 
		whichDeliveryEstimatedTimeHour = document.getElementById('h_delivery_estimated_time_hour').value; 
		whichDeliveryEstimatedTimeMinute = document.getElementById('h_delivery_estimated_time_minute').value; 
		whichLoadingEstimatedEn = getDateFrToEn(whichLoadingEstimatedDateFr)+whichLoadingEstimatedTimeHour+whichLoadingEstimatedTimeMinute;
		whichDeliveryEstimatedEn = getDateFrToEn(whichDeliveryEstimatedDateFr)+whichDeliveryEstimatedTimeHour+whichDeliveryEstimatedTimeMinute;
//		alert("testIfLoadingEstimatedEalierThanDeliveryEstimated : "+testIfLoadingEstimatedEalierThanDeliveryEstimated);
		if(
			whichLoadingEstimatedEn>=whichDeliveryEstimatedEn 
			&&whichLoadingEstimatedEn != ""
			&&whichDeliveryEstimatedEn != "" 
			&& testIfLoadingEstimatedEalierThanDeliveryEstimated 
		){
			alert("Loading date have to be earlier than Delivery Date;");
			testIfLoadingEstimatedEalierThanDeliveryEstimated = false;
		}
	}
	clearTimeout(tmIfLoadingEstimatedEalierThanDeliveryEstimated);
	tmIfLoadingEstimatedEalierThanDeliveryEstimated = setTimeout(function(){ ifLoadingEstimatedEalierThanDeliveryEstimated(true); },2000);
}

getDateFrToEn = function(whichDateFr){
	var arrayDate = whichDateFr.split("/");
	return arrayDate[2]+arrayDate[1]+arrayDate[0];
}


closeWindow = function(){
	if(testIfLoadingEstimatedEalierThanDeliveryEstimated){
		window.close();
	} else {
		setToTrueTestIfLoadingEstimatedEalierThanDeliveryEstimated();
	}
}


delete_ref = function(which_id, which_ref, which_num_po){
	var params = '?';
	params += "&ticket="+$F('ticket');
	params += "&idloading_po_sku="+which_id;
	params += "&ref="+which_ref;
	params += "&num_po="+which_num_po;
	var url = 'ajax/cp_loading_delete_detail.psp';
	if(confirm("Any remove is definitive.")){
		fill_div('div_save_detail', url, params);
	}
}

delete_po_sku = function(which_id){
	var params = '?';
	params += "&ticket="+$F('ticket');
	params += "&idloading_po_sku="+which_id;
	var url = 'ajax/cp_loading_delete_detail.psp';
	fill_div('div_save_detail', url, params);
}

delete_po_sku_detail = function(which_id){
	var params = '?';
	params += "&ticket="+$F('ticket');
	params += "&idloading_po_sku_detail="+which_id;
	var url = 'ajax/cp_loading_delete_detail.psp';
	fill_div('div_save_detail', url, params);
}

duplicate_po_sku_detail = function(which_id){
	var params = '?';
	params += "&ticket="+$F('ticket');
	params += "&idloading_po_sku_detail="+which_id;
	var url = 'ajax/cp_loading_duplicate_detail.psp';
	fill_div('div_save_detail', url, params);
}

update_po_sku_detail = function(which_id, which_object){
	var params = '?';
	params += "&ticket="+$F('ticket');
	params += "&idloading_po_sku_detail="+which_id;
	params += "&which_element="+which_object.name;
	params += "&which_value="+which_object.value;
	var url = 'ajax/cp_loading_update_detail.psp';
	fill_div('div_save_detail', url, params);
}

show_detail = function(){
	var params = '?';
	params += "&supplier="+$F('h_supplier');
	params += "&code_fournisseur="+$F('h_code_fournisseur');
	params += "&ticket="+$F('ticket');
	params += "&ref="+$F('h_ref');
	var url = 'ajax/cp_loading_show_detail.psp';
	fill_div('cp_loading_show_detail', url, params);
}

save_detail = function(which_object){
	var detail = which_object.split("#");
	var params = "?";
	params += "&ticket="+$F('ticket');
	params += "&supplier="+$F('h_supplier');
	params += "&code_fournisseur="+$F('h_code_fournisseur');
	params += "&ref="+$F('h_ref');
	params += "&num_po="+detail[0];
	params += "&sku_id="+detail[1];
	params += "&pallet_nb="+detail[2];
	params += "&pallet_ctn_per="+detail[3];
	params += "&pallet_weight="+detail[4];
	params += "&pallet_family="+detail[5];
	
	var url = 'ajax/cp_loading_save_detail.psp';
	fill_div('div_save_detail', url, params);

}

show_available = function( which_supplier ){
	var params = '?';
	params += "&supplier="+$F('h_supplier');
	
	params += "&code_fournisseur="+$F('h_code_fournisseur');
	params += "&ticket="+$F('ticket');
	var url = 'ajax/cp_loading_show_available.psp';
	show_detail();
	fill_div('cp_loading_show_available', url, params);
}

set_default_header = function(){

	var d = new Date();
	$('h_ref').value=d.getTime();
/*
	$('h_loading_address').value="h_loading_address";
	$('h_loading_contact').value="h_loading_contact";
	$('h_loading_estimated_date').value="20/05/2017";
	$('h_loading_estimated_time_hour').value="07";
	$('h_loading_estimated_time_minute').value="15";
	$('h_delivery_contact').value="h_delivery_contact";
	$('h_delivery_estimated_date').value="20/06/2017";
	$('h_delivery_estimated_time_hour').value="18";
	$('h_delivery_estimated_time_minute').value="45";
	$('h_remarks').value="h_remarks";
*/		  

}

get_header_params = function(){

	var params = "?";
	params += "&ticket="+$F('ticket');
	params += "&supplier="+$F('h_supplier');
	params += "&code_fournisseur="+$F('h_code_fournisseur');
	params += "&ref="+$F('h_ref');
	params += "&loading_address="+$F('h_loading_address');
	params += "&loading_contact="+$F('h_loading_contact');
	params += "&delivery_contact="+$F('h_delivery_contact');
	params += "&remarks="+$F('h_remarks');
	params += "&loading_estimated_date="+convert_date_from_fr_to_en($F('h_loading_estimated_date'));
	params += "&delivery_estimated_date="+convert_date_from_fr_to_en($F('h_delivery_estimated_date'));
	params += "&loading_estimated_time="+$('h_loading_estimated_time_hour').value+$('h_loading_estimated_time_minute').value;
	params += "&delivery_estimated_time="+$('h_delivery_estimated_time_hour').value+$('h_delivery_estimated_time_minute').value;

	return params;
		
}


save_and_exit = function(){
		save_header('1');
		exit();
}

delete_and_exit = function(){
		save_header('0');
		exit();
}

exit = function(){
		document.getElementById('h_ref').focus();
		setTimeout(function(){ window.close(); },2000);
}

save_header = function(isEnabled){
	var params = get_header_params();
	disableHeader();
	if(isEnabled == '1'){
		params += "&is_enabled=1";
	}
	if(isEnabled == '0'){
		params += "&is_enabled=0";
	}
	var url = 'ajax/cp_loading_save_header.psp';
//	alert(params);
	if(testIfLoadingEstimatedEalierThanDeliveryEstimated){
		fill_div('div_save_header', url, params);
	} else {
		setToTrueTestIfLoadingEstimatedEalierThanDeliveryEstimated();
	}
	
}

disableHeader = function(){

	$('h_loading_address').disabled = true;
	$('h_loading_contact').disabled = true;
	$('h_delivery_contact').disabled = true;
	$('h_remarks').disabled = true;
	$('h_loading_estimated_date').disabled = true;
	$('h_delivery_estimated_date').disabled = true;
	$('h_loading_estimated_time_hour').disabled = true;
	$('h_loading_estimated_time_minute').disabled = true;
	$('h_delivery_estimated_time_hour').disabled = true;
	$('h_delivery_estimated_time_minute').disabled = true;


}

convert_date_from_fr_to_en = function(which_date){
	var fr_date_array = which_date.split("/");
	return fr_date_array[2]+fr_date_array[1]+fr_date_array[0];
}




//////////////////////////////////////////////////////////////////




start_loading = function(which_div){
	$('main_loading_div').innerHTML = "";
	body_node = $('main_loading_div');
	
	new_loading_div=document.createElement("div");

	id_loading_div = "loading_"+which_div;
	new_loading_div.setAttribute("id", id_loading_div);
	body_node.appendChild(new_loading_div);
	$(id_loading_div).innerHTML += "<br><br><img src=ajax/img/ajax-loader.gif><br>LOADING...<br><br>";
	
	$(id_loading_div ).style.width = '20%';
	$(id_loading_div ).style.textAlign = 'center';
	$(id_loading_div ).style.fontFamily = 'Arial';
	$(id_loading_div ).style.fontSize = '20px';
	$(id_loading_div ).style.fontWeight = 'bold';
	$(id_loading_div ).style.position = 'relative';
	$(id_loading_div ).style.backgroundColor = '#FFFFFF';
	$(id_loading_div ).style.top = '0';
	$(id_loading_div).style.left = '40%';
	//new Effect.Appear(id_loading_div);
}
var loaded = false;

startLoading = function() {
	loaded = false;
	window.setTimeout('showLoadingImage()', 1000);
}

showLoadingImage = function() {
	var el = $("loading_box").show();
	if (el && !loaded) {
		el.innerHTML = '<img src="/ajax/img/ajax-loader.gif">';
		new $('loading_box').show();
	}
}

stopLoading = function() {
	Element.hide('loading_box');
	loaded = true;
}
/*
Ajax.Responders.register({
    onCreate : startLoading,
    onComplete : stopLoading
  });
*/
///////////////////////////
// Functions 
///////////////////////////


fill_div = function ( which_div, url, params){

// Cette fonction permet d'afficher le contenu du résultat d'une requete Ajax dans le div passé en paramètre	
	var myAjax = new Ajax.Updater( 
	which_div, 
	url, 
	{	
		method: 'get', 
		parameters: params, 
		evalScripts: true, 
		asynchronous:true,
		onCreate: start_loading(which_div),
		onComplete: function(){
						Element.hide("loading_"+which_div);
					}
	}
	); 
}


sup_espace = function(chaine)
{
while(chaine.substring(0,1)==' ')
{

chaine=chaine.substring(1,chaine.length);
}

while(chaine.length > 0 && chaine.substring(chaine.length-1,chaine.length)==' ')
chaine=chaine.substring(0,chaine.length-1);

return chaine;
}

toggle_button = function(whichElement)
{
$$("th."+whichElement.name).invoke('toggle');
$$("td."+whichElement.name).invoke('toggle');
whichElement.innerHTML=(whichElement.innerHTML=="+")?" - ":"+";

}


getMousePosition = function (event)
{
	var e = event || window.event;
	var scroll = new Array((document.documentElement && document.documentElement.scrollLeft) || window.pageXOffset || self.pageXOffset || document.body.scrollLeft,(document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || self.pageYOffset || document.body.scrollTop);;
	return new Array(e.clientX + scroll[0] - document.body.clientLeft,e.clientY + scroll[1] - document.body.clientTop);
}


set_default_select = function( whichSelect, defaultValue ){
	var select_dpt = $("div_"+whichSelect).select('[name]').last();
	if (typeof(select_dpt) != 'undefined') {
		select_dpt.value = defaultValue;
	} else {
		setTimeout(function(){ set_default_select(whichSelect, defaultValue); },500);
	}
	
}


go_to = function(url){
//	alert("go_to");
	document.location.href = url;
}



