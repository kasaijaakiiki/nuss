/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE ALGERIA------------------------------------*/
var config_01 = {
	'default':{
		'landColor':'#EBECED', //general country color
		'borderColor':'#9CA8B6', //outline border color
		'shortName':'#d9d9d9', //color of the shortname of this country
		'pinsShadow':'#808080', //shadow color below the pins
	},
	'pins':[
	{
		'shape':'rectangle',//choose the shape of the pin circle or rectangle
		'hover': '<u><b>Algiers</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',//the content of the hover popup
		'pos_X':365,//location of the pin on X axis
		'pos_Y':39,//location of the pin on Y axis
		'width':16,//width of the pin if rectangle (if circle, use diameter)
		'height':16,//height of the pin if rectangle (if circle, delete this line)
		'outline':'#FFF',//outline color of the pin
		'upColor':'#0000FF',//color of the pin when map loads
		'overColor':'#3399ff',//color of the pin when mouse hover
		'downColor':'#00ffff',//color of the pin when clicked 
		//(trick, if you make this pin un-clickable > make the overColor and downColor the same)
		'url':'http://africanews.africa/',//URL of this pin
		'target':'same_window',//'new_window' opens URL in new window//'same_window' opens URL in the same window //'none' pin is not clickable
		'enable':true,//true/false to enable/disable this pin
	},
	{
		'shape':'circle',
		'hover': '<u><b>Oran</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':256,'pos_Y':72,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Timimoun</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':281,'pos_Y':293,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Constantine</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':472,'pos_Y':50,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Batna</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':459,'pos_Y':78,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Chlef</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':314,'pos_Y':58,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Tamanrasset</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':439,'pos_Y':499,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE ANGOLA------------------------------------*/
var config_02 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Luanda</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':201,'pos_Y':244,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Benguela</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':203,'pos_Y':354,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Menongue</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':328,'pos_Y':414,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Namibe</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':165,'pos_Y':431,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Uíge</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':249,'pos_Y':210,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Luena</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':395,'pos_Y':329,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Lubango</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':202,'pos_Y':422,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE BENIN------------------------------------*/
var config_03 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Porto-Novo</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':339,'pos_Y':376,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE BOTSWANA------------------------------------*/
var config_04 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Gaborone</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':364,'pos_Y':380,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Selebi-Phikwe</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':421,'pos_Y':301,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Francistown</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':412,'pos_Y':273,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE BURKINA FASO------------------------------------*/
var config_05 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Ouagadougou</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':341,'pos_Y':288,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bobo-Dioulasso</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':254,'pos_Y':330,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE BURUNDI------------------------------------*/
var config_06 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Bujumbura</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':319,'pos_Y':302,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE CAMEROON------------------------------------*/
var config_07 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Yaoundé</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':287,'pos_Y':396,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Douala</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':233,'pos_Y':393,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Ebolowa</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':277,'pos_Y':424,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bamenda</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':249,'pos_Y':336,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Garoua</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':343,'pos_Y':239,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bertoua</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':350,'pos_Y':375,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE CAPE VERDE------------------------------------*/
var config_08 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Praia</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':325,'pos_Y':347,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE CENTRAL AFRICAN REPUBLIC------------------------------------*/
var config_09 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Bangui</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':275,'pos_Y':382,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bambari</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':338,'pos_Y':343,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bouar</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':186,'pos_Y':338,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE CHAD------------------------------------*/
var config_10 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>N’Djamena</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':217,'pos_Y':414,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Abéché</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':388,'pos_Y':369,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE COMOROS------------------------------------*/
var config_11 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Moroni</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':274,'pos_Y':286,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE DEMOCRATIC REPUBLIC OF THE CONGO------------------------------------*/
var config_12 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Kinshasa</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':123,'pos_Y':341,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kananga</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':333,'pos_Y':384,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Mbuji-Mayi</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':368,'pos_Y':390,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kisangani</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':416,'pos_Y':196,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kikwit</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':226,'pos_Y':359,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE REPUBLIC OF THE CONGO------------------------------------*/
var config_13 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Brazzaville</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':333,'pos_Y':411,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Pointe Noire</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':233,'pos_Y':424,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Loubomo</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':254,'pos_Y':411,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE DJIBOUTI------------------------------------*/
var config_14 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Djibouti City</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':345,'pos_Y':309,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE EGYPT------------------------------------*/
var config_15 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Cairo</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':350,'pos_Y':195,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Alexandria</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':310,'pos_Y':159,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Suez</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':387,'pos_Y':196,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Asyut</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':349,'pos_Y':289,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Aswan</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':399,'pos_Y':386,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE EQUATORIAL GUINEA------------------------------------*/
var config_16 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Malabo</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':302,'pos_Y':258,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE ERITREA------------------------------------*/
var config_17 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Asmara</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':313,'pos_Y':303,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Assab</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':431,'pos_Y':372,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE ETHIOPIA------------------------------------*/
var config_18 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Addis Ababa</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':282,'pos_Y':327,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Dire Dawa</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':374,'pos_Y':310,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Gondar</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':245,'pos_Y':219,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE GABON------------------------------------*/
var config_19 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Libreville</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':254,'pos_Y':273,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Port-Gentil</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':238,'pos_Y':310,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE GAMBIA------------------------------------*/
var config_20 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Banjul</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':291,'pos_Y':298,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE GHANA------------------------------------*/
var config_21 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Accra</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':351,'pos_Y':382,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Tamale</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':335,'pos_Y':274,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Sekondi-Takoradi</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':306,'pos_Y':400,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE GUINEA------------------------------------*/
var config_22 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Conakry</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':256,'pos_Y':309,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kankan</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':381,'pos_Y':288,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Labé</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':291,'pos_Y':262,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE GUINEA-BISSAU------------------------------------*/
var config_23 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Bissau</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':310,'pos_Y':302,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE IVORY COAST------------------------------------*/
var config_24 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Yamoussoukro</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':331,'pos_Y':325,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Abidjan</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':370,'pos_Y':366,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Korhogo</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':321,'pos_Y':248,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bouna</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':398,'pos_Y':256,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Daloa</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':296,'pos_Y':232,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE KENYA------------------------------------*/
var config_25 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Nairobi</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':300,'pos_Y':364,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Mombasa</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':383,'pos_Y':441,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Nakuru</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':280,'pos_Y':335,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Eldoret</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':256,'pos_Y':313,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kitale</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':247,'pos_Y':300,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE LESOTHO------------------------------------*/
var config_26 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Maseru</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':296,'pos_Y':293,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE LIBERIA------------------------------------*/
var config_27 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Monrovia</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':283,'pos_Y':311,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE LIBYA------------------------------------*/
var config_28 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Tripoli</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':193,'pos_Y':118,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Misrata</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':252,'pos_Y':136,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Benghazi</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':399,'pos_Y':142,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bayda</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':448,'pos_Y':118,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE MADAGASCAR------------------------------------*/
var config_29 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Antananarivo</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':348,'pos_Y':318,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Antsirabe</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':335,'pos_Y':347,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Mahajanga</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':316,'pos_Y':224,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Toamasina</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':404,'pos_Y':294,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Toliara</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':241,'pos_Y':456,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE MALAWI------------------------------------*/
var config_30 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Lilongwe</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':318,'pos_Y':337,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Blantyre</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':353,'pos_Y':392,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Zomba</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':361,'pos_Y':379,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE MALI------------------------------------*/
var config_31 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Bamako</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':210,'pos_Y':460,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Gao</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':445,'pos_Y':352,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Tombouctou</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':356,'pos_Y':338,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE MAURITANIA------------------------------------*/
var config_32 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Nouakchott</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':175,'pos_Y':404,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE MAURITIUS------------------------------------*/
var config_33 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Port Louis</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':327,'pos_Y':302,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE MOROCCO------------------------------------*/
var config_34 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Rabat</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':385,'pos_Y':155,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Fez</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':438,'pos_Y':150,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Marrakesh</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':350,'pos_Y':231,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Casablanca</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':359,'pos_Y':167,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Tangier</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':413,'pos_Y':90,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE MOZAMBIQUE------------------------------------*/
var config_35 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Maputo</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':241,'pos_Y':550,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Nacala</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':484,'pos_Y':198,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Nampula</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':442,'pos_Y':217,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Pemba</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':477,'pos_Y':151,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Beira</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':308,'pos_Y':356,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE NAMIBIA------------------------------------*/
var config_36 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Windhoek</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':277,'pos_Y':308,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Lüderitz</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':222,'pos_Y':436,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Walvis Bay</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':202,'pos_Y':320,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE NIGER------------------------------------*/
var config_37 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Niamey</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':146,'pos_Y':436,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Tahoua</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':236,'pos_Y':396,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Zinder</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':347,'pos_Y':428,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Maradi</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':293,'pos_Y':439,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE NIGERIA------------------------------------*/
var config_38 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Abuja</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':307,'pos_Y':340,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Maiduguri</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':476,'pos_Y':253,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Lagos</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':185,'pos_Y':405,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Benin City</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':250,'pos_Y':413,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kano</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':339,'pos_Y':248,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Ibadan</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':202,'pos_Y':380,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Zaria</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':316,'pos_Y':274,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE RWANDA------------------------------------*/
var config_39 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Kigali</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':330,'pos_Y':308,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SÃO TOMÉ AND PRÍNCIPE------------------------------------*/
var config_40 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>São Tomé</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':338,'pos_Y':295,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SENEGAL------------------------------------*/
var config_41 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Dakar</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':243,'pos_Y':292,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kaolack</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':288,'pos_Y':310,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SEYCHELLES------------------------------------*/
var config_42 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Victoria</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':323,'pos_Y':294,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SIERRA LEONE------------------------------------*/
var config_43 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Freetown</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':281,'pos_Y':301,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SOMALIA------------------------------------*/
var config_44 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Mogadishu</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':316,'pos_Y':433,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bosaso</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':435,'pos_Y':171,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Qardho</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':430,'pos_Y':219,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Hargeisa</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':283,'pos_Y':218,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SOUTH AFRICA------------------------------------*/
var config_45 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Bloemfontein</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':377,'pos_Y':335,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Cape Town</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':147,'pos_Y':495,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Pretoria</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':436,'pos_Y':225,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Johannesburg</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':427,'pos_Y':242,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Durban</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':515,'pos_Y':358,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>East London</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':423,'pos_Y':464,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Port Elizabeth</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':353,'pos_Y':490,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SOUTH SUDAN------------------------------------*/
var config_46 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Juba</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':378,'pos_Y':409,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Wau</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':271,'pos_Y':325,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Malakal</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':381,'pos_Y':271,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SUDAN------------------------------------*/
var config_47 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Khartoum</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':395,'pos_Y':310,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Port Sudan</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':530,'pos_Y':185,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Al Fashir</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':182,'pos_Y':366,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE SWAZILAND------------------------------------*/
var config_48 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Mbabane</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':325,'pos_Y':293,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE TANZANIA------------------------------------*/
var config_49 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Dodoma</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':355,'pos_Y':332,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Dar es Salaam</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':457,'pos_Y':346,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Mwanza</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':271,'pos_Y':218,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Tanga</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':453,'pos_Y':292,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Tabora</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':268,'pos_Y':290,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}
/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE TOGO------------------------------------*/
var config_50 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Lomé</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':325,'pos_Y':369,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}

/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE TUNISIA------------------------------------*/
var config_51 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Tunis</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':348,'pos_Y':197,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Sfax</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':360,'pos_Y':268,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}

/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE UGANDA------------------------------------*/
var config_52 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Kampala</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':338,'pos_Y':342,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}

/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE ZAMBIA------------------------------------*/
var config_53 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Lusaka</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':323,'pos_Y':387,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Chingola</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':308,'pos_Y':303,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Kitwe</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':324,'pos_Y':312,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
}

/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE ZIMBABWE------------------------------------*/
var config_54 = {
	'default':{
		'landColor':'#EBECED','borderColor':'#9CA8B6','shortName':'#d9d9d9','pinsShadow':'#808080',
	},
	'pins':[
	{
		'shape':'rectangle',
		'hover': '<u><b>Harare</b></u><br>Write any text and load images<br><img src="hover.png" width="196px">',
		'pos_X':375,'pos_Y':269,
		'width':16,'height':16,
		'outline':'#FFF',
		'upColor':'#0000FF','overColor':'#3399ff','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Bulawayo</b></u><br><span style="color: #bcbcbc;">Street Address:</span><br>&nbsp;321 Example Road 9. Area, Country 54321<br><span style="color: #bcbcbc;">Telephone:</span><br>&nbsp;(256) 555-4321 / (256) 555-1234',
		'pos_X':300,'pos_Y':341,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	{
		'shape':'circle',
		'hover': '<u><b>Gweru</b></u><br><span style="color:yellow;">*Link each pin to any webpage*</span>',
		'pos_X':336,'pos_Y':317,
		'diameter':14,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://africanews.africa/','target':'same_window',
		'enable':true,
	},
	]
};
