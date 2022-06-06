function w3SetColorsByAttribute(){var b,a,c;for(a=0,b=document.getElementsByTagName("*");a<b.length;a++)(c=b[a].getAttribute("data-w3-color"))&&(b[a].style.backgroundColor=w3color(c).toRgbString())}function Psychrometrics(){var a=Math.log,b=Math.exp,c=Math.pow,d=Math.min,e=Math.max,f=Math.abs,g=void 0,h=void 0;this.IP=1,this.SI=2,this.SetUnitSystem=function(a){if(a!=this.IP&&a!=this.SI)throw new Error("UnitSystem must be IP or SI");h=(g=a)==this.IP?.001*9/5:.001},this.GetUnitSystem=function(){return g},this.isIP=function(){if(g==this.IP)return!0;if(g==this.SI)return!1;throw new Error("Unit system is not defined")},this.GetTRankineFromTFahrenheit=function(a){return a+459.67},this.GetTFahrenheitFromTRankine=function(a){return a-459.67},this.GetTKelvinFromTCelsius=function(a){return a+273.15},this.GetTCelsiusFromTKelvin=function(a){return a-273.15},this.GetTWetBulbFromTDewPoint=function(a,b,c){var d;if(!(b<=a))throw new Error("Dew point temperature is above dry bulb temperature");return d=this.GetHumRatioFromTDewPoint(b,c),this.GetTWetBulbFromHumRatio(a,d,c)},this.GetTWetBulbFromRelHum=function(b,a,c){var d;if(!(a>=0&&a<=1))throw new Error("Relative humidity is outside range [0,1]");return d=this.GetHumRatioFromRelHum(b,a,c),this.GetTWetBulbFromHumRatio(b,d,c)},this.GetRelHumFromTDewPoint=function(a,b){var c;if(!(b<=a))throw new Error("Dew point temperature is above dry bulb temperature");return this.GetSatVapPres(b)/this.GetSatVapPres(a)},this.GetRelHumFromTWetBulb=function(a,b,c){var d;if(!(b<=a))throw new Error("Wet bulb temperature is above dry bulb temperature");return d=this.GetHumRatioFromTWetBulb(a,b,c),this.GetRelHumFromHumRatio(a,d,c)},this.GetTDewPointFromRelHum=function(b,a){var c;if(!(a>=0&&a<=1))throw new Error("Relative humidity is outside range [0,1]");return c=this.GetVapPresFromRelHum(b,a),this.GetTDewPointFromVapPres(b,c)},this.GetTDewPointFromTWetBulb=function(a,b,c){var d;if(!(b<=a))throw new Error("Wet bulb temperature is above dry bulb temperature");return d=this.GetHumRatioFromTWetBulb(a,b,c),this.GetTDewPointFromHumRatio(a,d,c)},this.GetVapPresFromRelHum=function(b,a){if(!(a>=0&&a<=1))throw new Error("Relative humidity is outside range [0,1]");return a*this.GetSatVapPres(b)},this.GetRelHumFromVapPres=function(b,a){if(!(a>=0))throw new Error("Partial pressure of water vapor in moist air is negative");return a/this.GetSatVapPres(b)},this.dLnPws_=function(b){var d,a;return this.isIP()?(a=this.GetTRankineFromTFahrenheit(b),d=b<=32.018?10214.165/c(a,2)-.0053765794+38404754e-14*a+3*35575832e-17*c(a,2)-4*90344688e-21*c(a,3)+4.1635019/a:10440.397/c(a,2)-.027022355+2578072e-11*a-3*24780681e-16*c(a,2)+6.5459673/a):(a=this.GetTKelvinFromTCelsius(b),d=b<=.01?5674.5359/c(a,2)-.009677843+124431402e-14*a+3*20747825e-16*c(a,2)-4*9484024e-19*c(a,3)+4.1635019/a:5800.2206/c(a,2)-.048640239+83529536e-12*a-43356279e-15*c(a,2)+6.5459673/a),d},this.GetTDewPointFromVapPres=function(i,g){if(j=this.isIP()?[-148,392]:[-100,200],g<this.GetSatVapPres(j[0])||g>this.GetSatVapPres(j[1]))throw new Error("Partial pressure of water vapor is outside range of validity of equations");var j,c,k,b=i,m=a(g),l=1;do{c=b,k=a(this.GetSatVapPres(c));var n=this.dLnPws_(c);if(b=e(b=c-(k-m)/n,j[0]),b=d(b,j[1]),l>100)throw new Error("Convergence not reached in GetTDewPointFromVapPres. Stopping.");l++}while(f(b-c)>h)return d(b,i)},this.GetVapPresFromTDewPoint=function(a){return this.GetSatVapPres(a)},this.GetTWetBulbFromHumRatio=function(d,g,i){var j,a,b,c,f,k=1;if(!(g>=0))throw new Error("Humidity ratio is negative");for(f=e(g,1e-7),j=this.GetTDewPointFromHumRatio(d,f,i),b=d,c=j,a=(c+b)/2;b-c>h;){if(this.GetHumRatioFromTWetBulb(d,a,i)>f?b=a:c=a,a=(b+c)/2,k>100)throw new Error("Convergence not reached in GetTWetBulbFromHumRatio. Stopping.");k++}return a},this.GetHumRatioFromTWetBulb=function(b,a,d){var c;if(!(a<=b))throw new Error("Wet bulb temperature is above dry bulb temperature");return c=this.GetSatHumRatio(a,d),e(this.isIP()?a>=32?((1093-.556*a)*c-.24*(b-a))/(1093+.444*b-a):((1220-.04*a)*c-.24*(b-a))/(1220+.444*b-.48*a):a>=0?((2501-2.326*a)*c-1.006*(b-a))/(2501+1.86*b-4.186*a):((2830-.24*a)*c-1.006*(b-a))/(2830+1.86*b-2.1*a),1e-7)},this.GetHumRatioFromRelHum=function(c,a,d){var b;if(!(a>=0&&a<=1))throw new Error("Relative humidity is outside range [0,1]");return b=this.GetVapPresFromRelHum(c,a),this.GetHumRatioFromVapPres(b,d)},this.GetRelHumFromHumRatio=function(c,a,d){var b;if(!(a>=0))throw new Error("Humidity ratio is negative");return b=this.GetVapPresFromHumRatio(a,d),this.GetRelHumFromVapPres(c,b)},this.GetHumRatioFromTDewPoint=function(b,c){var a;return a=this.GetSatVapPres(b),this.GetHumRatioFromVapPres(a,c)},this.GetTDewPointFromHumRatio=function(c,a,d){var b;if(!(a>=0))throw new Error("Humidity ratio is negative");return b=this.GetVapPresFromHumRatio(a,d),this.GetTDewPointFromVapPres(c,b)},this.GetHumRatioFromVapPres=function(a,b){if(!(a>=0))throw new Error("Partial pressure of water vapor in moist air is negative");return e(.621945*a/(b-a),1e-7)},this.GetVapPresFromHumRatio=function(b,c){var a;if(!(b>=0))throw new Error("Humidity ratio is negative");return a=e(b,1e-7),c*a/(.621945+a)},this.GetSpecificHumFromHumRatio=function(a){var b;if(!(a>=0))throw new Error("Humidity ratio is negative");return(b=e(a,1e-7))/(1+b)},this.GetHumRatioFromSpecificHum=function(a){if(!(a>=0&&a<1))throw new Error("Specific humidity is outside range [0, 1)");return e(a/(1-a),1e-7)},this.GetDryAirEnthalpy=function(a){return this.isIP()?.24*a:1006*a},this.GetDryAirDensity=function(a,b){return this.isIP()?144*b/53.35/this.GetTRankineFromTFahrenheit(a):b/287.042/this.GetTKelvinFromTCelsius(a)},this.GetDryAirVolume=function(a,b){return this.isIP()?53.35*this.GetTRankineFromTFahrenheit(a)/(144*b):287.042*this.GetTKelvinFromTCelsius(a)/b},this.GetTDryBulbFromEnthalpyAndHumRatio=function(b,c){var a;if(!(c>=0))throw new Error("Humidity ratio is negative");return(a=e(c,1e-7),this.isIP())?(b-1061*a)/(.24+.444*a):(b/1e3-2501*a)/(1.006+1.86*a)},this.GetHumRatioFromEnthalpyAndTDryBulb=function(b,a){return e(this.isIP()?(b-.24*a)/(1061+.444*a):(b/1e3-1.006*a)/(2501+1.86*a),1e-7)},this.GetSatVapPres=function(e){var f,d;if(this.isIP()){if(!(e>= -148&&e<=392))throw new Error("Dry bulb temperature is outside range [-148, 392]");d=this.GetTRankineFromTFahrenheit(e),f=e<=32.018?-10214.165/d-4.8932428-.0053765794*d+19202377e-14*d*d+35575832e-17*c(d,3)-90344688e-21*c(d,4)+4.1635019*a(d):-10440.397/d-11.29465-.027022355*d+1289036e-11*d*d-24780681e-16*c(d,3)+6.5459673*a(d)}else{if(!(e>= -100&&e<=200))throw new Error("Dry bulb temperature is outside range [-100, 200]");d=this.GetTKelvinFromTCelsius(e),f=e<=.01?-5674.5359/d+6.3925247-.009677843*d+62215701e-14*d*d+20747825e-16*c(d,3)-9484024e-19*c(d,4)+4.1635019*a(d):-5800.2206/d+1.3914993-.048640239*d+41764768e-12*d*d-14452093e-15*c(d,3)+6.5459673*a(d)}return b(f)},this.GetSatHumRatio=function(b,c){var a;return e(.621945*(a=this.GetSatVapPres(b))/(c-a),1e-7)},this.GetSatAirEnthalpy=function(a,b){return this.GetMoistAirEnthalpy(a,this.GetSatHumRatio(a,b))},this.GetVaporPressureDeficit=function(a,b,d){var c;if(!(b>=0))throw new Error("Humidity ratio is negative");return c=this.GetRelHumFromHumRatio(a,b,d),this.GetSatVapPres(a)*(1-c)},this.GetDegreeOfSaturation=function(b,a,c){if(!(a>=0))throw new Error("Humidity ratio is negative");return e(a,1e-7)/this.GetSatHumRatio(b,c)},this.GetMoistAirEnthalpy=function(a,c){var b;if(!(c>=0))throw new Error("Humidity ratio is negative");return(b=e(c,1e-7),this.isIP())?.24*a+b*(1061+.444*a):(1.006*a+b*(2501+1.86*a))*1e3},this.GetMoistAirVolume=function(b,c,d){var a;if(!(c>=0))throw new Error("Humidity ratio is negative");return(a=e(c,1e-7),this.isIP())?53.35*this.GetTRankineFromTFahrenheit(b)*(1+1.607858*a)/(144*d):287.042*this.GetTKelvinFromTCelsius(b)*(1+1.607858*a)/d},this.GetTDryBulbFromMoistAirVolumeAndHumRatio=function(b,c,d){var a;if(!(c>=0))throw new Error("Humidity ratio is negative");return(a=e(c,1e-7),this.isIP())?this.GetTFahrenheitFromTRankine(b*(144*d)/(53.35*(1+1.607858*a))):this.GetTCelsiusFromTKelvin(b*d/(287.042*(1+1.607858*a)))},this.GetMoistAirDensity=function(c,a,d){var b;if(!(a>=0))throw new Error("Humidity ratio is negative");return(1+(b=e(a,1e-7)))/this.GetMoistAirVolume(c,b,d)},this.GetStandardAtmPressure=function(a){return this.isIP()?14.696*c(1-68754e-10*a,5.2559):101325*c(1-225577e-10*a,5.2559)},this.GetStandardAtmTemperature=function(a){return this.isIP()?59-.0035662*a:15-.0065*a},this.GetSeaLevelPressure=function(f,c,e){var a,d;return this.isIP()?(a=e+.0036*c/2,d=53.351*this.GetTRankineFromTFahrenheit(a)):(a=e+.0065*c/2,d=287.055*this.GetTKelvinFromTCelsius(a)/9.807),f*b(c/d)},this.GetStationPressure=function(a,b,c){return a/this.GetSeaLevelPressure(1,b,c)},this.CalcPsychrometricsFromTWetBulb=function(b,d,c){var a=this.GetHumRatioFromTWetBulb(b,d,c),e=this.GetTDewPointFromHumRatio(b,a,c),f=this.GetRelHumFromHumRatio(b,a,c),g=this.GetVapPresFromHumRatio(a,c),h=this.GetMoistAirEnthalpy(b,a),i=this.GetMoistAirVolume(b,a,c),j=this.GetDegreeOfSaturation(b,a,c);return[a,e,f,g,h,i,j]},this.CalcPsychrometricsFromTDewPoint=function(c,d,b){var a=this.GetHumRatioFromTDewPoint(d,b),e=this.GetTWetBulbFromHumRatio(c,a,b),f=this.GetRelHumFromHumRatio(c,a,b),g=this.GetVapPresFromHumRatio(a,b),h=this.GetMoistAirEnthalpy(c,a),i=this.GetMoistAirVolume(c,a,b),j=this.GetDegreeOfSaturation(c,a,b);return[a,e,f,g,h,i,j]},this.CalcPsychrometricsFromRelHum=function(b,d,c){var a=this.GetHumRatioFromRelHum(b,d,c),e=this.GetTWetBulbFromHumRatio(b,a,c),f=this.GetTDewPointFromHumRatio(b,a,c),g=this.GetVapPresFromHumRatio(a,c),h=this.GetMoistAirEnthalpy(b,a),i=this.GetMoistAirVolume(b,a,c),j=this.GetDegreeOfSaturation(b,a,c);return[a,e,f,g,h,i,j]}}!function(){function a(c,d){return this instanceof a?"object"==typeof c?c:void(this.attachValues(b(c)),d&&(d.style.backgroundColor=this.toRgbString())):new a(c,d)}function b(f){var o,w,h,l,b,p,u,q,x,y,n,a=[],v=[],t=[];if(o=(f=r(f.toLowerCase())).substr(0,1).toUpperCase(),w=f.substr(1),q=1,"R"!=o&&"Y"!=o&&"G"!=o&&"C"!=o&&"B"!=o&&"M"!=o&&"W"!=o||isNaN(w)||(6!=f.length|| -1!=f.indexOf(","))&&(f="ncol("+f+")"),3==f.length||6==f.length||isNaN(f)||(f="ncol("+f+")"),f.indexOf(",")>0&& -1==f.indexOf("(")&&(f="ncol("+f+")"),"rgb"==f.substr(0,3)||"hsl"==f.substr(0,3)||"hwb"==f.substr(0,3)||"ncol"==f.substr(0,4)||"cmyk"==f.substr(0,4)){if("ncol"==f.substr(0,4)?(4==f.split(",").length&& -1==f.indexOf("ncola")&&(f=f.replace("ncol","ncola")),h="ncol",f=f.substr(4)):"cmyk"==f.substr(0,4)?(h="cmyk",f=f.substr(4)):(h=f.substr(0,3),f=f.substr(3)),l=3,p=!1,"a"==f.substr(0,1).toLowerCase()?(l=4,p=!0,f=f.substr(1)):"cmyk"==h&&(l=4,5==f.split(",").length&&(l=5,p=!0)),a=(f=(f=f.replace("(","")).replace(")","")).split(","),"rgb"==h){if(a.length!=l)return d();for(b=0;b<l;b++){if((""==a[b]||" "==a[b])&&(a[b]="0"),a[b].indexOf("%")> -1&&(a[b]=a[b].replace("%",""),a[b]=Number(a[b]/100),b<3&&(a[b]=Math.round(255*a[b]))),isNaN(a[b]))return d();parseInt(a[b])>255&&(a[b]=255),b<3&&(a[b]=parseInt(a[b])),3==b&&Number(a[b])>1&&(a[b]=1)}n={r:a[0],g:a[1],b:a[2]},!0==p&&(q=Number(a[3]))}if("hsl"==h||"hwb"==h||"ncol"==h){for(;a.length<l;)a.push("0");for(("hsl"==h||"hwb"==h)&&parseInt(a[0])>=360&&(a[0]=0),b=1;b<l;b++){if(a[b].indexOf("%")> -1){if(a[b]=a[b].replace("%",""),a[b]=Number(a[b]),isNaN(a[b]))return d();a[b]=a[b]/100}else a[b]=Number(a[b]);Number(a[b])>1&&(a[b]=1),0>Number(a[b])&&(a[b]=0)}"hsl"==h&&(n=g(a[0],a[1],a[2]),x=Number(a[0]),y=Number(a[1])),"hwb"==h&&(n=i(a[0],a[1],a[2])),"ncol"==h&&(n=k(a[0],a[1],a[2])),!0==p&&(q=Number(a[3]))}if("cmyk"==h){for(;a.length<l;)a.push("0");for(b=0;b<l;b++){if(a[b].indexOf("%")> -1){if(a[b]=a[b].replace("%",""),a[b]=Number(a[b]),isNaN(a[b]))return d();a[b]=a[b]/100}else a[b]=Number(a[b]);Number(a[b])>1&&(a[b]=1),0>Number(a[b])&&(a[b]=0)}n=j(a[0],a[1],a[2],a[3]),!0==p&&(q=Number(a[4]))}}else if("ncs"==f.substr(0,3))n=m(f);else{for(b=0,u=!1,v=e("names");b<v.length;b++)if(f.toLowerCase()==v[b].toLowerCase()){t=e("hexs"),u=!0,n={r:parseInt(t[b].substr(0,2),16),g:parseInt(t[b].substr(2,2),16),b:parseInt(t[b].substr(4,2),16)};break}if(!1==u){for(3==(f=f.replace("#","")).length&&(f=f.substr(0,1)+f.substr(0,1)+f.substr(1,1)+f.substr(1,1)+f.substr(2,1)+f.substr(2,1)),b=0;b<f.length;b++)if(!s(f.substr(b,1)))return d();for(b=0,a[0]=parseInt(f.substr(0,2),16),a[1]=parseInt(f.substr(2,2),16),a[2]=parseInt(f.substr(4,2),16);b<3;b++)if(isNaN(a[b]))return d();n={r:a[0],g:a[1],b:a[2]}}}return c(n,q,x,y)}function c(a,e,m,q){var c,g,b,j,h,i,k;return a?(null===e&&(e=1),c=n(a.r,a.g,a.b),g=o(a.r,a.g,a.b),b=p(a.r,a.g,a.b),i=m||c.h,k=q||c.s,j=l(i),h={red:a.r,green:a.g,blue:a.b,hue:i,sat:k,lightness:c.l,whiteness:g.w,blackness:g.b,cyan:b.c,magenta:b.m,yellow:b.y,black:b.k,ncol:j,opacity:e,valid:!0},h=f(h)):d()}function d(){return{red:0,green:0,blue:0,hue:0,sat:0,lightness:0,whiteness:0,blackness:0,cyan:0,magenta:0,yellow:0,black:0,ncol:"R",opacity:1,valid:!1}}function e(a){return"names"==a?["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]:"hexs"==a?["f0f8ff","faebd7","00ffff","7fffd4","f0ffff","f5f5dc","ffe4c4","000000","ffebcd","0000ff","8a2be2","a52a2a","deb887","5f9ea0","7fff00","d2691e","ff7f50","6495ed","fff8dc","dc143c","00ffff","00008b","008b8b","b8860b","a9a9a9","a9a9a9","006400","bdb76b","8b008b","556b2f","ff8c00","9932cc","8b0000","e9967a","8fbc8f","483d8b","2f4f4f","2f4f4f","00ced1","9400d3","ff1493","00bfff","696969","696969","1e90ff","b22222","fffaf0","228b22","ff00ff","dcdcdc","f8f8ff","ffd700","daa520","808080","808080","008000","adff2f","f0fff0","ff69b4","cd5c5c","4b0082","fffff0","f0e68c","e6e6fa","fff0f5","7cfc00","fffacd","add8e6","f08080","e0ffff","fafad2","d3d3d3","d3d3d3","90ee90","ffb6c1","ffa07a","20b2aa","87cefa","778899","778899","b0c4de","ffffe0","00ff00","32cd32","faf0e6","ff00ff","800000","66cdaa","0000cd","ba55d3","9370db","3cb371","7b68ee","00fa9a","48d1cc","c71585","191970","f5fffa","ffe4e1","ffe4b5","ffdead","000080","fdf5e6","808000","6b8e23","ffa500","ff4500","da70d6","eee8aa","98fb98","afeeee","db7093","ffefd5","ffdab9","cd853f","ffc0cb","dda0dd","b0e0e6","800080","663399","ff0000","bc8f8f","4169e1","8b4513","fa8072","f4a460","2e8b57","fff5ee","a0522d","c0c0c0","87ceeb","6a5acd","708090","708090","fffafa","00ff7f","4682b4","d2b48c","008080","d8bfd8","ff6347","40e0d0","ee82ee","f5deb3","ffffff","f5f5f5","ffff00","9acd32"]:void 0}function f(a){return a.red=Number(a.red.toFixed(0)),a.green=Number(a.green.toFixed(0)),a.blue=Number(a.blue.toFixed(0)),a.hue=Number(a.hue.toFixed(0)),a.sat=Number(a.sat.toFixed(2)),a.lightness=Number(a.lightness.toFixed(2)),a.whiteness=Number(a.whiteness.toFixed(2)),a.blackness=Number(a.blackness.toFixed(2)),a.cyan=Number(a.cyan.toFixed(2)),a.magenta=Number(a.magenta.toFixed(2)),a.yellow=Number(a.yellow.toFixed(2)),a.black=Number(a.black.toFixed(2)),a.ncol=a.ncol.substr(0,1)+Math.round(Number(a.ncol.substr(1))),a.opacity=Number(a.opacity.toFixed(2)),a}function g(c,e,a){var d,b,f,g,i;return c/=60,b=a<=.5?a*(e+1):a+e-a*e,d=2*a-b,f=255*h(d,b,c+2),g=255*h(d,b,c),i=255*h(d,b,c-2),{r:f,g:g,b:i}}function h(b,c,a){return(a<0&&(a+=6),a>=6&&(a-=6),a<1)?(c-b)*a+b:a<3?c:a<4?(c-b)*(4-a)+b:b}function i(h,c,d){var b,e,f,a=[];for(e=g(h,1,.5),a[0]=e.r/255,a[1]=e.g/255,a[2]=e.b/255,(f=c+d)>1&&(c=Number((c/f).toFixed(2)),d=Number((d/f).toFixed(2))),b=0;b<3;b++)a[b]*=1-c-d,a[b]+=c,a[b]=Number(255*a[b]);return{r:a[0],g:a[1],b:a[2]}}function j(e,f,g,a){var b,c,d;return b=255-255*Math.min(1,e*(1-a)+a),c=255-255*Math.min(1,f*(1-a)+a),d=255-255*Math.min(1,g*(1-a)+a),{r:b,g:c,b:d}}function k(d,e,f){var c,a,b;if(b=d,isNaN(d.substr(0,1))){if(c=d.substr(0,1).toUpperCase(),a=d.substr(1),""==a&&(a=0),a=Number(a),isNaN(a))return!1;"R"==c&&(b=0+.6*a),"Y"==c&&(b=60+.6*a),"G"==c&&(b=120+.6*a),"C"==c&&(b=180+.6*a),"B"==c&&(b=240+.6*a),"M"==c&&(b=300+.6*a),"W"==c&&(b=0,e=1-a/100,f=a/100)}return i(b,e,f)}function l(a){for(;a>=360;)a-=360;return a<60?"R"+a/.6:a<120?"Y"+(a-60)/.6:a<180?"G"+(a-120)/.6:a<240?"C"+(a-180)/.6:a<300?"B"+(a-240)/.6:a<360?"M"+(a-300)/.6:void 0}function m(c){var q,s,a,b,n,o,d,e,i,f,g,h,t,p,j,k,l,m;return -1==(c=(c=(c=(c=(c=r(c).toUpperCase()).replace("(","")).replace(")","")).replace("NCS","NCS ")).replace(/  /g," ")).indexOf("NCS")&&(c="NCS "+c),null!==(c=c.match(/^(?:NCS|NCS\sS)\s(\d{2})(\d{2})-(N|[A-Z])(\d{2})?([A-Z])?$/))&&(q=parseInt(c[1],10),s=parseInt(c[2],10),a=c[3],("N"==a||"Y"==a||"R"==a||"B"==a||"G"==a)&&(b=parseInt(c[4],10)||0,"N"!==a?(n=1.05*q-5.25,o=s,"Y"===a&&b<=60?i=1:"Y"===a&&b>60||"R"===a&&b<=80?i=(Math.sqrt(14884-Math.pow(d="Y"===a?b-60:b+40,2))-22)/100:"R"===a&&b>80||"B"===a?i=0:"G"===a&&(i=(Math.sqrt(33800-Math.pow(d=b-170,2))-70)/100),"Y"===a&&b<=80?e=0:"Y"===a&&b>80||"R"===a&&b<=60?e=(104-Math.sqrt(11236-Math.pow(d="Y"===a?b-80+20.5:b+20+20.5,2)))/100:"R"===a&&b>60||"B"===a&&b<=80?e=(Math.sqrt(1e4-Math.pow(d="R"===a?b-60-60:b+40-60,2))-10)/100:"B"===a&&b>80||"G"===a&&b<=40?e=(122-Math.sqrt(19881-Math.pow(d="B"===a?b-80-131:b+20-131,2)))/100:"G"===a&&b>40&&(e=0),"Y"===a?green1=(85-.85*b)/100:"R"===a&&b<=60?green1=0:"R"===a&&b>60?green1=(67.5-Math.sqrt(5776-Math.pow(d=b-60+35,2)))/100:"B"===a&&b<=60?green1=(6.5+Math.sqrt(7044.5-Math.pow(d=1*b-68.5,2)))/100:"B"===a&&b>60||"G"===a&&b<=60?green1=.9:"G"===a&&b>60&&(green1=(90-1/8*(d=b-60))/100),f=((d=(i+green1+e)/3)-i)*(100-o)/100+i,g=(d-green1)*(100-o)/100+green1,h=(d-e)*(100-o)/100+e,t=f>g&&f>h?f:g>f&&g>h?g:h>f&&h>g?h:(f+g+h)/3,p=1/t,k=parseInt(f*p*(100-n)/100*255,10),l=parseInt(g*p*(100-n)/100*255,10),m=parseInt(h*p*(100-n)/100*255,10),k>255&&(k=255),l>255&&(l=255),m>255&&(m=255),k<0&&(k=0),l<0&&(l=0),m<0&&(m=0)):((j=parseInt((1-q/100)*255,10))>255&&(j=255),j<0&&(j=0),k=j,l=j,m=j),{r:k,g:l,b:m}))}function n(i,j,k){var b,c,d,g,h,f,e,a=[];for(d=0,a[0]=i/255,a[1]=j/255,a[2]=k/255,b=a[0],c=a[0],f=0;d<a.length-1;d++)a[d+1]<=b&&(b=a[d+1]),a[d+1]>=c&&(c=a[d+1],f=d+1);return 0==f&&(e=(a[1]-a[2])/(c-b)),1==f&&(e=2+(a[2]-a[0])/(c-b)),2==f&&(e=4+(a[0]-a[1])/(c-b)),isNaN(e)&&(e=0),(e*=60)<0&&(e+=360),g=(b+c)/2,h=b==c?0:g<.5?(c-b)/(c+b):(c-b)/(2-c-b),{h:e,s:h,l:g}}function o(a,b,c){var g,h,i,f,d,e;return a/=255,b/=255,c/=255,d=Math.max(a,b,c),f=Math.min(a,b,c),e=d-f,g=0==e?0:a==d?(b-c)/e%6*360:b==d?((c-a)/e+2)%6*360:((a-b)/e+4)%6*360,h=f,i=1-d,{h:g,w:h,b:i}}function p(b,c,d){var e,f,g,a;return b/=255,c/=255,d/=255,1==(a=1-Math.max(b,c,d))?(e=0,f=0,g=0):(e=(1-b-a)/(1-a),f=(1-c-a)/(1-a),g=(1-d-a)/(1-a)),{c:e,m:f,y:g,k:a}}function q(b){for(var a=b.toString(16);a.length<2;)a="0"+a;return a}function r(a){return a.replace(/^\s+|\s+$/g,"")}function s(a){return"0123456789ABCDEFabcdef".indexOf(a)> -1}a.prototype={toRgbString:function(){return"rgb("+this.red+", "+this.green+", "+this.blue+")"},toRgbaString:function(){return"rgba("+this.red+", "+this.green+", "+this.blue+", "+this.opacity+")"},toHwbString:function(){return"hwb("+this.hue+", "+Math.round(100*this.whiteness)+"%, "+Math.round(100*this.blackness)+"%)"},toHwbStringDecimal:function(){return"hwb("+this.hue+", "+this.whiteness+", "+this.blackness+")"},toHwbaString:function(){return"hwba("+this.hue+", "+Math.round(100*this.whiteness)+"%, "+Math.round(100*this.blackness)+"%, "+this.opacity+")"},toHslString:function(){return"hsl("+this.hue+", "+Math.round(100*this.sat)+"%, "+Math.round(100*this.lightness)+"%)"},toHslStringDecimal:function(){return"hsl("+this.hue+", "+this.sat+", "+this.lightness+")"},toHslaString:function(){return"hsla("+this.hue+", "+Math.round(100*this.sat)+"%, "+Math.round(100*this.lightness)+"%, "+this.opacity+")"},toCmykString:function(){return"cmyk("+Math.round(100*this.cyan)+"%, "+Math.round(100*this.magenta)+"%, "+Math.round(100*this.yellow)+"%, "+Math.round(100*this.black)+"%)"},toCmykStringDecimal:function(){return"cmyk("+this.cyan+", "+this.magenta+", "+this.yellow+", "+this.black+")"},toNcolString:function(){return this.ncol+", "+Math.round(100*this.whiteness)+"%, "+Math.round(100*this.blackness)+"%"},toNcolStringDecimal:function(){return this.ncol+", "+this.whiteness+", "+this.blackness},toNcolaString:function(){return this.ncol+", "+Math.round(100*this.whiteness)+"%, "+Math.round(100*this.blackness)+"%, "+this.opacity},toName:function(){var b,c,d,a=e("hexs");for(i=0;i<a.length;i++)if(b=parseInt(a[i].substr(0,2),16),c=parseInt(a[i].substr(2,2),16),d=parseInt(a[i].substr(4,2),16),this.red==b&&this.green==c&&this.blue==d)return e("names")[i];return""},toHexString:function(){var a=q(this.red),b=q(this.green),c=q(this.blue);return"#"+a+b+c},toRgb:function(){return{r:this.red,g:this.green,b:this.blue,a:this.opacity}},toHsl:function(){return{h:this.hue,s:this.sat,l:this.lightness,a:this.opacity}},toHwb:function(){return{h:this.hue,w:this.whiteness,b:this.blackness,a:this.opacity}},toCmyk:function(){return{c:this.cyan,m:this.magenta,y:this.yellow,k:this.black,a:this.opacity}},toNcol:function(){return{ncol:this.ncol,w:this.whiteness,b:this.blackness,a:this.opacity}},isDark:function(a){return(299*this.red+587*this.green+114*this.blue)/1e3<(a||128)},saturate:function(d){var a,b;a=d/100||.1,this.sat+=a,this.sat>1&&(this.sat=1),b=c(g(this.hue,this.sat,this.lightness),this.opacity,this.hue,this.sat),this.attachValues(b)},desaturate:function(d){var a,b;a=d/100||.1,this.sat-=a,this.sat<0&&(this.sat=0),b=c(g(this.hue,this.sat,this.lightness),this.opacity,this.hue,this.sat),this.attachValues(b)},lighter:function(d){var a,b;a=d/100||.1,this.lightness+=a,this.lightness>1&&(this.lightness=1),b=c(g(this.hue,this.sat,this.lightness),this.opacity,this.hue,this.sat),this.attachValues(b)},darker:function(d){var a,b;a=d/100||.1,this.lightness-=a,this.lightness<0&&(this.lightness=0),b=c(g(this.hue,this.sat,this.lightness),this.opacity,this.hue,this.sat),this.attachValues(b)},attachValues:function(a){this.red=a.red,this.green=a.green,this.blue=a.blue,this.hue=a.hue,this.sat=a.sat,this.lightness=a.lightness,this.whiteness=a.whiteness,this.blackness=a.blackness,this.cyan=a.cyan,this.magenta=a.magenta,this.yellow=a.yellow,this.black=a.black,this.ncol=a.ncol,this.opacity=a.opacity,this.valid=a.valid}},window.w3color=a}(),function(b,a){"function"==typeof define&&define.amd?define([],a):"object"==typeof module&&module.exports?module.exports=a():b.psychrolib=a()}("undefined"!=typeof self?self:this,function(){return new Psychrometrics});export function Psychart(y,z,A,p,c,t,B,L,M,N){let d="http://www.w3.org/2000/svg",e=document.createElementNS(d,"svg"),a=new Psychrometrics;a.SetUnitSystem(A?a.SI:a.IP);let C=a.GetStandardAtmPressure(B),O=0,P=a.GetHumRatioFromTDewPoint(t,C),i=30,q="\xb0"+(a.isIP()?"F":"C"),Q=a.isIP()?"lbw/lba":"kgw/kga",R=a.isIP()?"Psi":"Pa",S=a.isIP()?"Btu/lb":"J/kg",T=a.isIP()?"ft\xb3/lb":"m\xb3/kg",k={NW:0,N:1,NE:2,E:3,SE:4,S:5,SW:6,W:7,C:8},U,V;e.setAttribute("viewBox","0 0 "+y+" "+z);let W=()=>e.dispatchEvent(new Event("updatePsychart")),X=()=>ae(J),Y=(b,a,c)=>(b-a)/(c-a),Z=(b,a,c)=>b*(c-a)+a,$=(a,b,c,d,e)=>Z(Y(a,b,c),d,e),_=(a,b,c)=>a-b<c&&b-a<c,aa=(b,a=0)=>Math.round(b*10**a)/10**a,m=(a,b)=>new af($(a,p,c,i,y-i),z-$(ab(a,b).hr,O,P,i,z-i)),D=(a,b)=>new af($(a,p,c,i,y-i),z-$(ac(a,b).hr,O,P,i,z-i)),l=(a,b)=>new af($(a,p,c,i,y-i),z-$(ad(a,b).hr,O,P,i,z-i)),ab=(c,d)=>{let b=a.CalcPsychrometricsFromRelHum(c,d,C);return new ag(c,d,b[1],b[2],b[0],b[3],b[4],b[5])},ac=(c,d)=>{let b=a.CalcPsychrometricsFromTWetBulb(c,d,C);return new ag(c,b[2],d,b[1],b[0],b[3],b[4],b[5])},ad=(c,d)=>{let b=a.CalcPsychrometricsFromTDewPoint(c,d,C);return new ag(c,b[2],b[1],d,b[0],b[3],b[4],b[5])},ae=a=>{let b;for(;b=a.firstChild;)a.removeChild(b)},E=document.createElementNS(d,"g");e.appendChild(E);let F=document.createElementNS(d,"g");e.appendChild(F);let G=document.createElementNS(d,"g");e.appendChild(G);let H=document.createElementNS(d,"g");e.appendChild(H);let I=document.createElementNS(d,"g");e.appendChild(I);let J=document.createElementNS(d,"g");e.appendChild(J);for(let f=p;f<=c;f+=10){let u=new ah(1);u.addPoint(m(f,0));let n=l(f,f);n.y<i&&(n=new af(n.x,i)),u.addPoint(n),ak(m(f,0),k.N,f+q,!0,"Dry Bulb","")}for(let g=0;g<=t;g+=10){let v=new ah(1),o=l(g,g);o.x<i&&(o=new af(i,o.y)),v.addPoint(o),v.addPoint(l(c,g)),ak(l(c,g),k.W,g+q,!0,"Dew Point","")}for(let h=p;h<c;h+=10){let K=new ah(1);for(let r=h;r<=c;r+=.5)K.addPoint(D(r,h));ak(l(h,h),k.SE,h+q,!0,"Wet Bulb","")}for(let b=0;b<=100;b+=10){let w=new ah(1),x=!0;for(let s=p;s<=c;s+=.5){let j=m(s,b/100);if(j.y<i){j=new af(j.x,i),w.addPoint(j),ak(j,k.S,0===b||100===b?"":b+"%",!0,"Relative Humidity",""),x=!1;break}w.addPoint(j)}x&&ak(m(c,b/100),k.NE,0===b||100===b?"":b+"%",!0,"Relative Humidity","")}function af(a,b){this.x=a,this.y=b}function ag(a,b,c,d,e,f,g,h){this.db=a,this.rh=b,this.wb=c,this.dp=d,this.hr=e,this.vp=f,this.h=g,this.v=h}function ah(b){let a=document.createElementNS(d,"path");a.setAttribute("fill","none"),a.setAttribute("stroke",M),a.setAttribute("stroke-width",b+"px"),a.setAttribute("vector-effect","non-scaling-stroke"),F.appendChild(a);let c="M";this.addPoint=b=>{if(b instanceof af)c+=" "+b.x+","+b.y,a.setAttribute("d",c);else throw"Incorrect parameter types for Line.addPoint(Point)."}}function ai(f,a,i,g,h){if(!(a instanceof ag))throw"Incorrect parameter types in PlotPoint.";let e=l(a.db,a.dp);if(h>0&&V instanceof af){let c=document.createElementNS(d,"path");c.setAttribute("fill","none"),c.setAttribute("stroke",g),c.setAttribute("stroke-width",h+"px"),c.setAttribute("stroke-linecap","round"),c.setAttribute("vector-effect","non-scaling-stroke"),c.setAttribute("d","M "+V.x+","+V.y+" "+e.x+","+e.y),H.appendChild(c)}V=e;let b=document.createElementNS(d,"path");b.setAttribute("fill","none"),b.setAttribute("stroke",g),b.setAttribute("stroke-width",i+"px"),b.setAttribute("stroke-linecap","round"),b.setAttribute("vector-effect","non-scaling-stroke"),b.setAttribute("d","M "+e.x+","+e.y+" h 0"),I.appendChild(b);let j=(f?f+"\n":"")+aa(a.db,1)+q+" Dry Bulb\n"+aa(100*a.rh)+"% Rel. Hum.\n"+aa(a.wb,1)+q+" Wet Bulb\n"+aa(a.dp,1)+q+" Dew Point"+(L?"\n"+aa(a.hr,2)+" "+Q+" Hum. Ratio\n"+aa(a.vp,1)+" "+R+" Vap. Press.\n"+aa(a.h,1)+" "+S+" Enthalpy\n"+aa(a.v,2)+" "+T+" Volume":"");b.onmouseover=()=>al(e.x,e.y,g,j,!0),b.onmouseleave=()=>X(),W()}function aj(a,b){let c="M",e,f,g=a=>{if(a instanceof af)c+=" "+a.x+","+a.y;else throw"Incorrect parameter types for Region.addPoint(Point)."};this.nextPsy=a=>{if(a instanceof ag){if(f instanceof ag){let b=.001;if(_(a.rh,f.rh,b)){if(f.db<a.db)for(let c=f.db;c<=a.db+b;c+=.5)g(m(c,f.rh));else for(let d=f.db;d>=a.db-b;d-=.5)g(m(d,f.rh));g(m(a.db,a.rh))}else g(l(a.db,a.dp))}else e=a,g(l(a.db,a.dp));f=a}else throw"Incorrect parameter types for Region.nextPsy(Psy)."},this.build=()=>{if(e instanceof ag){this.nextPsy(e);let f=document.createElementNS(d,"path");if(f.setAttribute("fill",b),f.setAttribute("stroke","none"),f.setAttribute("d",c+" z"),E.appendChild(f),a){let g=l(e.db,e.dp);f.onmouseover=()=>al(g.x,g.y,b,a,!0),f.onmouseleave=X}W()}},this.clearAll=()=>{ae(E),W()}}function ak(b,h,i,j,l="",m=""){if(!(b instanceof af))throw"Incorrect parameter types in Label.";let a=document.createElementNS(d,"text");a.setAttribute("fill",m||N),a.setAttribute("x",b.x),a.setAttribute("y",b.y),a.setAttribute("font-family","sans-serif"),a.setAttribute("font-size","12px"),a.setAttribute("text-anchor","middle"),a.setAttribute("dominant-baseline","middle"),a.textContent=i,l&&(a.onmouseover=()=>al(b.x,b.y,N,l,!0),a.onmouseleave=X),j&&G.appendChild(a);let c=()=>{a.setAttribute("y",b.y+6),a.setAttribute("dominant-baseline","hanging")},e=()=>{a.setAttribute("y",b.y-6),a.setAttribute("dominant-baseline","alphabetic")},f=()=>{a.setAttribute("x",b.x+6),a.setAttribute("text-anchor","start")},g=()=>{a.setAttribute("x",b.x-6),a.setAttribute("text-anchor","end")};switch(h){case k.NW:c(),f();break;case k.N:c();break;case k.NE:c(),g();break;case k.E:g();break;case k.SE:e(),g();break;case k.S:e();break;case k.SW:e(),f();break;case k.W:f();break;case k.C:break;default:throw"Incorrect Anchor type ("+h+"). Expected "+JSON.stringify(k)}return a}function al(c,e,j,o,p){p&&X();let f=document.createElementNS(d,"g"),a=document.createElementNS(d,"rect"),g=[],q=w3color(j).lightness>.5,h=o.split("\n");for(let l in h)g.push(ak(new af(0,12*l),k.NW,h[l],!1,"",q?"#000":"#fff"));J.appendChild(f),f.appendChild(a);let b=0,m,i=12*h.length+10;for(let n in g)f.appendChild(g[n]),(m=g[n].getBBox().width+10)>b&&(b=m);a.setAttribute("stroke",M),a.setAttribute("fill",j),a.setAttribute("x",0),a.setAttribute("y",0),a.setAttribute("width",b),a.setAttribute("height",i),a.setAttribute("rx",2),a.setAttribute("stroke-width","1px"),c+b+10>y?c-=b+10:c+=10,e+i+10>z?e-=i+10:e+=10,f.setAttribute("transform","translate("+c+","+e+")")}this.plotDbRh=(a,b,c="",d="#f00",e=5,f=0)=>ai(c,ab(a,b),e,d,f),this.plotDbWb=(a,b,c="",d="#f00",e=5,f=0)=>ai(c,ac(a,b),e,d,f),this.plotDbDp=(a,b,c="",d="#f00",e=5,f=0)=>ai(c,ad(a,b),e,d,f),this.newRegion=(a="",b="#00f")=>!(U instanceof aj)&&(U=new aj(a,b)),this.regionDbRh=(a,b)=>U instanceof aj&&U.nextPsy(ab(a,b)),this.regionDbWb=(a,b)=>U instanceof aj&&U.nextPsy(ac(a,b)),this.regionDbDp=(a,b)=>U instanceof aj&&U.nextPsy(ad(a,b)),this.buildRegion=()=>{U instanceof aj&&(U.build(),U=void 0)},this.clearRegions=()=>!(U instanceof aj)&&new aj("").clearAll(),this.clearData=()=>{ae(I),ae(H),V=void 0,W()},this.el=()=>e}