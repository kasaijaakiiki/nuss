/*-----------------------------------------------------------------------------------------------*/
/*-------------------------------CUSTOMIZE Main Map of Africa------------------------------------*/
var af_config = {
	'default':{
		'borderColor':'#9CA8B6',//country outlines
		'shortNames': '#919191',//color of the shortnames (ZA, NG, etc)
	},
	'af_1':{
		'hover': 'ALGERIA',//hover information in the popup
		'enable':true,//true/false to enable/disable this country
		'upColor':'#EBECED',//country color when page loads
		'overColor':'#99CC00',//country color when mouse hover
		'downColor':'#993366',//country color when mouse clicking
		'zoom':'no',//zoom in to a detailed view 'no' or 'no'
		'url':'http://algeriatimes.info/',//Goto URL
		'target':'new_window',//open link in new window:new_window, open in current window:new_window, or none for nothing.
		'id':'afc-01','iso':'iso_01',//PLEASE DON"T CHANGE THIS
	},
	'af_2':{
		'hover': 'ANGOLA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.angop.ao/angola/en_us/index.html', //http://jornaldeangola.sapo.ao//
		'target':'new_window',
		'id':'afc-02','iso':'iso_02',
	},
	'af_3':{
		'hover': 'BENIN',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.nta.ng/tag/benin/', //https://www.lanationbenin.info/
		'target':'new_window',
		'id':'afc-03','iso':'iso_03',
	},
	'af_4':{
		'hover': 'BOTSWANA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.dailynews.gov.bw/',
		'target':'new_window',
		'id':'afc-04','iso':'iso_04',
	},
	'af_5':{
		'hover': 'BURKINA FASO',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.sidwaya.bf/',
		'target':'new_window',
		'id':'afc-05','iso':'iso_05',
	},
	'af_6':{
		'hover': 'BURUNDI',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.iwacu-burundi.org/englishnews/',
		'target':'new_window',
		'id':'afc-06','iso':'iso_06',
	},
	'af_7':{
		'hover': 'CAMEROON',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.journalducameroun.com/en/',
		'target':'new_window',
		'id':'afc-07','iso':'iso_07',
	},
	'af_8':{
		'hover': 'CAPE VERDE',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://expressodasilhas.cv/',
		'target':'new_window',
		'id':'afc-08','iso':'iso_08',
	},
	'af_9':{
		'hover': 'CENTRAL AFRICAN REPUBLIC',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://abangui.com/',
		'target':'new_window',
		'id':'afc-09','iso':'iso_09',
	},
	'af_10':{
		'hover': 'CHAD',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://tchadinfos.com/', // https://www.alwihdainfo.com/
		'target':'new_window',
		'id':'afc-10','iso':'iso_10',
	},
	'af_11':{
		'hover': 'COMOROS',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.alwatwan.net/', // http://www.comores-online.com/Comores-infosweb/
		'target':'new_window',
		'id':'afc-11','iso':'iso_11',
	},
	'af_12':{
		'hover': 'DEMOCRATIC REPUBLIC OF THE CONGO',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.lepotentielonline.com/', // http://www.lephareonline.net/
		'target':'new_window',
		'id':'afc-12','iso':'iso_12',
	},
	'af_13':{
		'hover': 'REPUBLIC OF THE CONGO',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.bizcongo.cd/',
		'target':'new_window',
		'id':'afc-13','iso':'iso_13',
	},
	'af_14':{
		'hover': 'DJIBOUTI',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.lanationdj.com/', // https://laprosperiteonline.net/
		'target':'new_window',
		'id':'afc-14','iso':'iso_14',
	},
	'af_15':{
		'hover': 'EGYPT',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.ahram.org.eg/', // https://www.tahrirnews.com/
		'target':'new_window',
		'id':'afc-15','iso':'iso_15',
	},
	'af_16':{
		'hover': 'EQUATORIAL GUINEA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://diariorombe.es/inicio/', // http://www.gacetadeguinea.com/
		'target':'new_window',
		'id':'afc-16','iso':'iso_16',
	},
	'af_17':{
		'hover': 'ERITREA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.caperi.com/', //  http://awate.com/
		'target':'new_window',
		'id':'afc-17','iso':'iso_17',
	},
	'af_18':{
		'hover': 'ETHIOPIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.thereporterethiopia.com/', // http://capitalethiopia.com/
		'target':'new_window',
		'id':'afc-18','iso':'iso_18',
	},
	'af_19':{
		'hover': 'GABON',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.gabonews.com/', // http://www.union.sonapresse.com/
		'target':'new_window',
		'id':'afc-19','iso':'iso_19',
	},
	'af_20':{
		'hover': 'GAMBIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://thepoint.gm/', //  http://foroyaa.gm/
		'target':'new_window',
		'id':'afc-20','iso':'iso_20',
	},
	'af_21':{
		'hover': 'GHANA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.graphic.com.gh/', // http://www.ghanaiantimes.com.gh/
		'target':'new_window',
		'id':'afc-21','iso':'iso_21',
	},
	'af_22':{
		'hover': 'GUINEA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.africaguinee.com/', // http://www.radio-kankan.com/,  https://www.guineenews.org/
		'target':'new_window',
		'id':'afc-22','iso':'iso_22',
	},
	'af_23':{
		'hover': 'GUINEA-BISSAU',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.gbissau.com/', // http://www.lejourguinee.com/index.php?lang=fr
		'target':'new_window',
		'id':'afc-23','iso':'iso_23',
	},
	'af_24':{
		'hover': 'IVORY COAST',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.fratmat.info/', // http://www.lenouveaureveil.com/
		'target':'new_window',
		'id':'afc-24','iso':'iso_24',
	},
	'af_25':{
		'hover': 'KENYA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.nation.co.ke/', // https://www.standardmedia.co.ke/
		'target':'new_window',
		'id':'afc-25','iso':'iso_25',
	},
	'af_26':{
		'hover': 'LESOTHO',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.lestimes.com/', // http://sundayexpress.co.ls/, http://informativenews.co.ls/
		'target':'new_window',
		'id':'afc-26','iso':'iso_26',
	},
	'af_27':{
		'hover': 'LIBERIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.liberianobserver.com/', // http://www.emansion.gov.lr/, http://www.thenewdawnliberia.com/
		'target':'new_window',
		'id':'afc-27','iso':'iso_27',
	},
	'af_28':{
		'hover': 'LIBYA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://libyanewstoday.com/', // https://www.libyaherald.com/, http://akhbarlibya24.net/
		'target':'new_window',
		'id':'afc-28','iso':'iso_28',
	},
	'af_29':{
		'hover': 'MADAGASCAR',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.lexpressmada.com/', // https://www.madagascar-tribune.com/, http://www.midi-madagasikara.mg/
		'target':'new_window',
		'id':'afc-29','iso':'iso_29',
	},
	'af_30':{
		'hover': 'MALAWI',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://mwnation.com/', // http://www.nyasatimes.com/, http://news.maraviexpress.com/
		'target':'new_window',
		'id':'afc-30','iso':'iso_30',
	},
	'af_31':{
		'hover': 'MALI',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.essor.ml/', // http://www.lesechos.ml/, https://www.maliweb.net/, https://amap.ml/
		'target':'new_window',
		'id':'afc-31','iso':'iso_31',
	},
	'af_32':{
		'hover': 'MAURITANIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.lecalame.info/', // https://www.saharamedias.net/, // http://www.alakhbar.info/,  http://www.ani.mr/
		'target':'new_window',
		'id':'afc-32','iso':'iso_32',
	},
	'af_33':{
		'hover': 'MAURITIUS',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.lexpress.mu/', // http://www.lemauricien.com/, http://www.5plus.mu/, https://defimedia.info/
		'target':'new_window',
		'id':'afc-33','iso':'iso_33',
	},
	'af_34':{
		'hover': 'MOROCCO',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://lematin.ma/', // https://www.leconomiste.com/, https://lanouvelletribune.info/
		'target':'new_window',
		'id':'afc-34','iso':'iso_34',
	},
	'af_35':{
		'hover': 'MOZAMBIQUE',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.jornalnoticias.co.mz/', // http://opais.sapo.mz/, https://www.mmo.co.mz/
		'target':'new_window',
		'id':'afc-35','iso':'iso_35',
	},
	'af_36':{
		'hover': 'NAMIBIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.newera.com.na/', // https://www.namibian.com.na/, https://economist.com.na/
		'target':'new_window',
		'id':'afc-36','iso':'iso_36',
	},
	'af_37':{
		'hover': 'NIGER',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.lesahel.org/', // http://www.news.aniamey.com/, https://www.actuniger.com/, 
		'target':'new_window',
		'id':'afc-37','iso':'iso_37',
	},
	'af_38':{
		'hover': 'NIGERIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.vanguardngr.com/', // http://guardian.ng/, http://punchng.com/, http://thenationonlineng.net/
		'target':'new_window',
		'id':'afc-38','iso':'iso_38',
	},
	'af_39':{
		'hover': 'RWANDA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.therwandan.com/', // http://www.newtimes.co.rw/, http://www.newsofrwanda.com/category/english/, http://imvahonshya.co.rw/, http://www.rba.co.rw/
		'target':'new_window',
		'id':'afc-39','iso':'iso_39',
	},
	'af_40':{
		'hover': 'SÃO TOMÉ AND PRÍNCIPE',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.telanon.info/', // http://www.irinnews.org/afrique/afrique-de-louest/sao-tome-and-principe
		'target':'new_window',
		'id':'afc-40','iso':'iso_40',
	},
	'af_41':{
		'hover': 'SENEGAL',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.lequotidien.sn/', // http://www.enqueteplus.com/, https://jollofnews.com/
		'target':'new_window',
		'id':'afc-41','iso':'iso_41',
	},
	'af_42':{
		'hover': 'SEYCHELLES',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.nation.sc/', // http://www.thepeople.sc/, http://www.sbc.sc/
		'target':'new_window',
		'id':'afc-42','iso':'iso_42',
	},
	'af_43':{
		'hover': 'SIERRA LEONE',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://awoko.org/', // http://www.critiqueecho.com/, http://www.expotimesonline.net/, http://www.thepatrioticvanguard.com/
		'target':'new_window',
		'id':'afc-43','iso':'iso_43',
	},
	'af_44':{
		'hover': 'SOMALIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.garoweonline.com/en', // https://www.hiiraan.com/, http://www.simbanews.net/
		'target':'new_window',
		'id':'afc-44','iso':'iso_44',
	},
	'af_45':{
		'hover': 'SOUTH AFRICA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://citizen.co.za/', // https://www.businesslive.co.za/bd/, https://www.dailysun.co.za/, https://city-press.news24.com/
		'target':'new_window',
		'id':'afc-45','iso':'iso_45',
	},
	'af_46':{
		'hover': 'SOUTH SUDAN',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://southsudannewsagency.org/', // http://www.southsudannation.com/, http://www.newsudanvision.com/, 
		'target':'new_window',
		'id':'afc-46','iso':'iso_46',
	},
	'af_47':{
		'hover': 'SUDAN',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.almshaheer.com/', // http://alsadda.net/, http://sudaneseonline.com/
		'target':'new_window',
		'id':'afc-47','iso':'iso_47',
	},
	'af_48':{
		'hover': 'SWAZILAND',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://new.observer.org.sz/', // http://www.times.co.sz/
		'target':'new_window',
		'id':'afc-48','iso':'iso_48',
	},
	'af_49':{
		'hover': 'TANZANIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.thecitizen.co.tz/', // http://www.dailynews.co.tz/, http://www.habarileo.co.tz/, http://www.mwananchi.co.tz/
		'target':'new_window',
		'id':'afc-49','iso':'iso_49',
	},
	'af_50':{
		'hover': 'TOGO',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.letogolais.com/', // http://focusinfos.net/, http://togozine.com/
		'target':'new_window',
		'id':'afc-50','iso':'iso_50',
	},
	'af_51':{
		'hover': 'TUNISIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.letemps.com.tn/', // https://www.tap.info.tn/ar, http://www.lapresse.tn/, http://www.essahafa.tn/
		'target':'new_window',
		'id':'afc-51','iso':'iso_51',
	},
	'af_52':{
		'hover': 'UGANDA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.newvision.co.ug/', // http://www.monitor.co.ug/, http://www.observer.ug/, https://www.redpepper.co.ug/
		'target':'new_window',
		'id':'afc-52','iso':'iso_52',
	},
	'af_53':{
		'hover': 'ZAMBIA',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'http://www.daily-mail.co.zm/', // https://www.lusakatimes.com/, http://www.times.co.zm/
		'target':'new_window',
		'id':'afc-53','iso':'iso_53',
	},
	'af_54':{
		'hover': 'ZIMBABWE',
		'enable':true,
		'upColor':'#EBECED',
		'overColor':'#99CC00',
		'downColor':'#993366',
		'zoom':'no',
		'url':'https://www.newsday.co.zw/', // https://www.dailynews.co.zw/, https://www.herald.co.zw/
		'target':'new_window',
		'id':'afc-54','iso':'iso_54',
	},
}
/*---------------- Add pins on the main map of Africa ----------------*/
var af_pins = {
	'default':{
		'pinsShadow':'#808080', //shadow color below the pins
	},
	'pins':[
	{
		'shape':'rectangle',//choose the shape of the pin circle or rectangle
		'hover': '<u><b>Kampala</b></u><br>Example of pin on main map<br>Write any text and load images<br><img src="hover.png" width="196px">',//the content of the hover popup
		'pos_X':448,//location of the pin on X axis
		'pos_Y':325,//location of the pin on Y axis
		'width':16,//width of the pin if rectangle (if circle > use diameter)
		'height':16,//height of the pin if rectangle (if circle > delete this line)
		'outline':'#FFF',//outline color of the pin
		'upColor':'#0000FF',//color of the pin when map loads
		'overColor':'#3399ff',//color of the pin when mouse hover
		'downColor':'#00ffff',//color of the pin when clicked 
		//(trick, if you make this pin un-clickable > make the overColor and downColor the same)
		'url':'http://www.monitor.co.ug/',//URL of this pin
		'target':'new_window',//'new_window' opens URL in new window//'new_window' opens URL in the same window //'none' pin is not clickable
		'enable':true,//true/false to enable/disable this pin
	},
	{
		'shape':'circle',
		'hover': '<u><b>Dakar</b></u><br>Example of pin on main map<br>Write any text and load images',
		'pos_X':99,
		'pos_Y':209,
		'diameter':18,
		'outline':'#FFF',
		'upColor':'#FF0000','overColor':'#FFEE88','downColor':'#00ffff',
		'url':'http://www.enqueteplus.com/','target':'new_window',
		'enable':true,
	},
	]
};
