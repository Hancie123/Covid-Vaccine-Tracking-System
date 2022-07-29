function getLazarSoftScanner(){var e={};function t(e,t){this.count=e,this.dataCodewords=t,this.__defineGetter__("Count",function(){return this.count}),this.__defineGetter__("DataCodewords",function(){return this.dataCodewords})}function n(e,t,n){this.ecCodewordsPerBlock=e,this.ecBlocks=n?new Array(t,n):new Array(t),this.__defineGetter__("ECCodewordsPerBlock",function(){return this.ecCodewordsPerBlock}),this.__defineGetter__("TotalECCodewords",function(){return this.ecCodewordsPerBlock*this.NumBlocks}),this.__defineGetter__("NumBlocks",function(){for(var e=0,t=0;t<this.ecBlocks.length;t++)e+=this.ecBlocks[t].length;return e}),this.getECBlocks=function(){return this.ecBlocks}}function r(e,t,n,r,i,a){this.versionNumber=e,this.alignmentPatternCenters=t,this.ecBlocks=new Array(n,r,i,a);for(var o=0,s=n.ECCodewordsPerBlock,h=n.getECBlocks(),w=0;w<h.length;w++){var f=h[w];o+=f.Count*(f.DataCodewords+s)}this.totalCodewords=o,this.__defineGetter__("VersionNumber",function(){return this.versionNumber}),this.__defineGetter__("AlignmentPatternCenters",function(){return this.alignmentPatternCenters}),this.__defineGetter__("TotalCodewords",function(){return this.totalCodewords}),this.__defineGetter__("DimensionForVersion",function(){return 17+4*this.versionNumber}),this.buildFunctionPattern=function(){var e=this.DimensionForVersion,t=new v(e);t.setRegion(0,0,9,9),t.setRegion(e-8,0,8,9),t.setRegion(0,e-8,9,8);for(var n=this.alignmentPatternCenters.length,r=0;r<n;r++)for(var i=this.alignmentPatternCenters[r]-2,a=0;a<n;a++)0==r&&(0==a||a==n-1)||r==n-1&&0==a||t.setRegion(this.alignmentPatternCenters[a]-2,i,5,5);return t.setRegion(6,9,1,e-17),t.setRegion(9,6,e-17,1),this.versionNumber>6&&(t.setRegion(e-11,0,3,6),t.setRegion(0,e-11,6,3)),t},this.getECBlocksForLevel=function(e){return this.ecBlocks[e.ordinal()]}}function i(e,t,n,r,a,o,s,h,w){this.a11=e,this.a12=r,this.a13=s,this.a21=t,this.a22=a,this.a23=h,this.a31=n,this.a32=o,this.a33=w,this.transformPoints1=function(e){for(var t=e.length,n=this.a11,r=this.a12,i=this.a13,a=this.a21,o=this.a22,s=this.a23,h=this.a31,w=this.a32,f=this.a33,u=0;u<t;u+=2){var d=e[u],l=e[u+1],c=i*d+s*l+f;e[u]=(n*d+a*l+h)/c,e[u+1]=(r*d+o*l+w)/c}},this.transformPoints2=function(e,t){for(var n=e.length,r=0;r<n;r++){var i=e[r],a=t[r],o=this.a13*i+this.a23*a+this.a33;e[r]=(this.a11*i+this.a21*a+this.a31)/o,t[r]=(this.a12*i+this.a22*a+this.a32)/o}},this.buildAdjoint=function(){return new i(this.a22*this.a33-this.a23*this.a32,this.a23*this.a31-this.a21*this.a33,this.a21*this.a32-this.a22*this.a31,this.a13*this.a32-this.a12*this.a33,this.a11*this.a33-this.a13*this.a31,this.a12*this.a31-this.a11*this.a32,this.a12*this.a23-this.a13*this.a22,this.a13*this.a21-this.a11*this.a23,this.a11*this.a22-this.a12*this.a21)},this.times=function(e){return new i(this.a11*e.a11+this.a21*e.a12+this.a31*e.a13,this.a11*e.a21+this.a21*e.a22+this.a31*e.a23,this.a11*e.a31+this.a21*e.a32+this.a31*e.a33,this.a12*e.a11+this.a22*e.a12+this.a32*e.a13,this.a12*e.a21+this.a22*e.a22+this.a32*e.a23,this.a12*e.a31+this.a22*e.a32+this.a32*e.a33,this.a13*e.a11+this.a23*e.a12+this.a33*e.a13,this.a13*e.a21+this.a23*e.a22+this.a33*e.a23,this.a13*e.a31+this.a23*e.a32+this.a33*e.a33)}}function a(e,t){this.bits=e,this.points=t}function o(t){this.image=t,this.resultPointCallback=null,this.sizeOfBlackWhiteBlackRun=function(e,t,n,r){var i=Math.abs(r-t)>Math.abs(n-e);if(i){var a=e;e=t,t=a,a=n,n=r,r=a}for(var o=Math.abs(n-e),s=Math.abs(r-t),h=-o>>1,w=t<r?1:-1,f=e<n?1:-1,u=0,d=e,l=t;d!=n;d+=f){var c=i?l:d,g=i?d:l;if(1==u?this.image[c+g*A.width]&&u++:this.image[c+g*A.width]||u++,3==u){var v=d-e,m=l-t;return Math.sqrt(v*v+m*m)}if((h+=s)>0){if(l==r)break;l+=w,h-=o}}var b=n-e,y=r-t;return Math.sqrt(b*b+y*y)},this.sizeOfBlackWhiteBlackRunBothWays=function(e,t,n,r){var i=this.sizeOfBlackWhiteBlackRun(e,t,n,r),a=1,o=e-(n-e);o<0?(a=e/(e-o),o=0):o>=A.width&&(a=(A.width-1-e)/(o-e),o=A.width-1);var s=Math.floor(t-(r-t)*a);return a=1,s<0?(a=t/(t-s),s=0):s>=A.height&&(a=(A.height-1-t)/(s-t),s=A.height-1),o=Math.floor(e+(o-e)*a),(i+=this.sizeOfBlackWhiteBlackRun(e,t,o,s))-1},this.calculateModuleSizeOneWay=function(e,t){var n=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(e.X),Math.floor(e.Y),Math.floor(t.X),Math.floor(t.Y)),r=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(t.X),Math.floor(t.Y),Math.floor(e.X),Math.floor(e.Y));return isNaN(n)?r/7:isNaN(r)?n/7:(n+r)/14},this.calculateModuleSize=function(e,t,n){return(this.calculateModuleSizeOneWay(e,t)+this.calculateModuleSizeOneWay(e,n))/2},this.distance=function(e,t){var n=e.X-t.X,r=e.Y-t.Y;return Math.sqrt(n*n+r*r)},this.computeDimension=function(e,t,n,r){var i=7+(Math.round(this.distance(e,t)/r)+Math.round(this.distance(e,n)/r)>>1);switch(3&i){case 0:i++;break;case 2:i--;break;case 3:throw"Error"}return i},this.findAlignmentInRegion=function(e,t,n,r){var i=Math.floor(r*e),a=Math.max(0,t-i),o=Math.min(A.width-1,t+i);if(o-a<3*e)throw"Error";var s=Math.max(0,n-i),h=Math.min(A.height-1,n+i);return new F(this.image,a,s,o-a,h-s,e,this.resultPointCallback).find()},this.createTransform=function(e,t,n,r,a){var o,s,h,w,f=a-3.5;return null!=r?(o=r.X,s=r.Y,h=w=f-3):(o=t.X-e.X+n.X,s=t.Y-e.Y+n.Y,h=w=f),i.quadrilateralToQuadrilateral(3.5,3.5,f,3.5,h,w,3.5,f,e.X,e.Y,t.X,t.Y,o,s,n.X,n.Y)},this.sampleGrid=function(t,n,r){return e.sampleGrid3(t,r,n)},this.processFinderPatternInfo=function(e){var t=e.TopLeft,n=e.TopRight,i=e.BottomLeft,o=this.calculateModuleSize(t,n,i);if(o<1)throw"Error";var s=this.computeDimension(t,n,i,o),h=r.getProvisionalVersionForDimension(s),w=h.DimensionForVersion-7,f=null;if(h.AlignmentPatternCenters.length>0)for(var u=n.X-t.X+i.X,d=n.Y-t.Y+i.Y,l=1-3/w,c=Math.floor(t.X+l*(u-t.X)),g=Math.floor(t.Y+l*(d-t.Y)),v=4;v<=16;v<<=1){f=this.findAlignmentInRegion(o,c,g,v);break}var m=this.createTransform(t,n,i,f,s);return new a(this.sampleGrid(this.image,m,s),null==f?new Array(i,t,n):new Array(i,t,n,f))},this.detect=function(){var e=(new D).findFinderPattern(this.image);return this.processFinderPatternInfo(e)}}e.checkAndNudgePoints=function(e,t){for(var n=A.width,r=A.height,i=!0,a=0;a<t.length&&i;a+=2){var o=Math.floor(t[a]),s=Math.floor(t[a+1]);if(o<-1||o>n||s<-1||s>r)throw"Error.checkAndNudgePoints ";i=!1,-1==o?(t[a]=0,i=!0):o==n&&(t[a]=n-1,i=!0),-1==s?(t[a+1]=0,i=!0):s==r&&(t[a+1]=r-1,i=!0)}i=!0;for(a=t.length-2;a>=0&&i;a-=2){o=Math.floor(t[a]),s=Math.floor(t[a+1]);if(o<-1||o>n||s<-1||s>r)throw"Error.checkAndNudgePoints ";i=!1,-1==o?(t[a]=0,i=!0):o==n&&(t[a]=n-1,i=!0),-1==s?(t[a+1]=0,i=!0):s==r&&(t[a+1]=r-1,i=!0)}},e.sampleGrid3=function(t,n,r){for(var i=new v(n),a=new Array(n<<1),o=0;o<n;o++){for(var s=a.length,h=o+.5,w=0;w<s;w+=2)a[w]=.5+(w>>1),a[w+1]=h;r.transformPoints1(a),e.checkAndNudgePoints(t,a);try{for(w=0;w<s;w+=2){t[Math.floor(a[w])+A.width*Math.floor(a[w+1])]&&i.set_Renamed(w>>1,o)}}catch(e){throw"Error.checkAndNudgePoints"}}return i},e.sampleGridx=function(t,n,r,a,o,s,h,w,f,u,d,l,c,g,v,m,b,y){var C=i.quadrilateralToQuadrilateral(r,a,o,s,h,w,f,u,d,l,c,g,v,m,b,y);return e.sampleGrid3(t,n,C)},r.VERSION_DECODE_INFO=new Array(31892,34236,39577,42195,48118,51042,55367,58893,63784,68472,70749,76311,79154,84390,87683,92361,96236,102084,102881,110507,110734,117786,119615,126325,127568,133589,136944,141498,145311,150283,152622,158308,161089,167017),r.VERSIONS=new Array(new r(1,new Array,new n(7,new t(1,19)),new n(10,new t(1,16)),new n(13,new t(1,13)),new n(17,new t(1,9))),new r(2,new Array(6,18),new n(10,new t(1,34)),new n(16,new t(1,28)),new n(22,new t(1,22)),new n(28,new t(1,16))),new r(3,new Array(6,22),new n(15,new t(1,55)),new n(26,new t(1,44)),new n(18,new t(2,17)),new n(22,new t(2,13))),new r(4,new Array(6,26),new n(20,new t(1,80)),new n(18,new t(2,32)),new n(26,new t(2,24)),new n(16,new t(4,9))),new r(5,new Array(6,30),new n(26,new t(1,108)),new n(24,new t(2,43)),new n(18,new t(2,15),new t(2,16)),new n(22,new t(2,11),new t(2,12))),new r(6,new Array(6,34),new n(18,new t(2,68)),new n(16,new t(4,27)),new n(24,new t(4,19)),new n(28,new t(4,15))),new r(7,new Array(6,22,38),new n(20,new t(2,78)),new n(18,new t(4,31)),new n(18,new t(2,14),new t(4,15)),new n(26,new t(4,13),new t(1,14))),new r(8,new Array(6,24,42),new n(24,new t(2,97)),new n(22,new t(2,38),new t(2,39)),new n(22,new t(4,18),new t(2,19)),new n(26,new t(4,14),new t(2,15))),new r(9,new Array(6,26,46),new n(30,new t(2,116)),new n(22,new t(3,36),new t(2,37)),new n(20,new t(4,16),new t(4,17)),new n(24,new t(4,12),new t(4,13))),new r(10,new Array(6,28,50),new n(18,new t(2,68),new t(2,69)),new n(26,new t(4,43),new t(1,44)),new n(24,new t(6,19),new t(2,20)),new n(28,new t(6,15),new t(2,16))),new r(11,new Array(6,30,54),new n(20,new t(4,81)),new n(30,new t(1,50),new t(4,51)),new n(28,new t(4,22),new t(4,23)),new n(24,new t(3,12),new t(8,13))),new r(12,new Array(6,32,58),new n(24,new t(2,92),new t(2,93)),new n(22,new t(6,36),new t(2,37)),new n(26,new t(4,20),new t(6,21)),new n(28,new t(7,14),new t(4,15))),new r(13,new Array(6,34,62),new n(26,new t(4,107)),new n(22,new t(8,37),new t(1,38)),new n(24,new t(8,20),new t(4,21)),new n(22,new t(12,11),new t(4,12))),new r(14,new Array(6,26,46,66),new n(30,new t(3,115),new t(1,116)),new n(24,new t(4,40),new t(5,41)),new n(20,new t(11,16),new t(5,17)),new n(24,new t(11,12),new t(5,13))),new r(15,new Array(6,26,48,70),new n(22,new t(5,87),new t(1,88)),new n(24,new t(5,41),new t(5,42)),new n(30,new t(5,24),new t(7,25)),new n(24,new t(11,12),new t(7,13))),new r(16,new Array(6,26,50,74),new n(24,new t(5,98),new t(1,99)),new n(28,new t(7,45),new t(3,46)),new n(24,new t(15,19),new t(2,20)),new n(30,new t(3,15),new t(13,16))),new r(17,new Array(6,30,54,78),new n(28,new t(1,107),new t(5,108)),new n(28,new t(10,46),new t(1,47)),new n(28,new t(1,22),new t(15,23)),new n(28,new t(2,14),new t(17,15))),new r(18,new Array(6,30,56,82),new n(30,new t(5,120),new t(1,121)),new n(26,new t(9,43),new t(4,44)),new n(28,new t(17,22),new t(1,23)),new n(28,new t(2,14),new t(19,15))),new r(19,new Array(6,30,58,86),new n(28,new t(3,113),new t(4,114)),new n(26,new t(3,44),new t(11,45)),new n(26,new t(17,21),new t(4,22)),new n(26,new t(9,13),new t(16,14))),new r(20,new Array(6,34,62,90),new n(28,new t(3,107),new t(5,108)),new n(26,new t(3,41),new t(13,42)),new n(30,new t(15,24),new t(5,25)),new n(28,new t(15,15),new t(10,16))),new r(21,new Array(6,28,50,72,94),new n(28,new t(4,116),new t(4,117)),new n(26,new t(17,42)),new n(28,new t(17,22),new t(6,23)),new n(30,new t(19,16),new t(6,17))),new r(22,new Array(6,26,50,74,98),new n(28,new t(2,111),new t(7,112)),new n(28,new t(17,46)),new n(30,new t(7,24),new t(16,25)),new n(24,new t(34,13))),new r(23,new Array(6,30,54,74,102),new n(30,new t(4,121),new t(5,122)),new n(28,new t(4,47),new t(14,48)),new n(30,new t(11,24),new t(14,25)),new n(30,new t(16,15),new t(14,16))),new r(24,new Array(6,28,54,80,106),new n(30,new t(6,117),new t(4,118)),new n(28,new t(6,45),new t(14,46)),new n(30,new t(11,24),new t(16,25)),new n(30,new t(30,16),new t(2,17))),new r(25,new Array(6,32,58,84,110),new n(26,new t(8,106),new t(4,107)),new n(28,new t(8,47),new t(13,48)),new n(30,new t(7,24),new t(22,25)),new n(30,new t(22,15),new t(13,16))),new r(26,new Array(6,30,58,86,114),new n(28,new t(10,114),new t(2,115)),new n(28,new t(19,46),new t(4,47)),new n(28,new t(28,22),new t(6,23)),new n(30,new t(33,16),new t(4,17))),new r(27,new Array(6,34,62,90,118),new n(30,new t(8,122),new t(4,123)),new n(28,new t(22,45),new t(3,46)),new n(30,new t(8,23),new t(26,24)),new n(30,new t(12,15),new t(28,16))),new r(28,new Array(6,26,50,74,98,122),new n(30,new t(3,117),new t(10,118)),new n(28,new t(3,45),new t(23,46)),new n(30,new t(4,24),new t(31,25)),new n(30,new t(11,15),new t(31,16))),new r(29,new Array(6,30,54,78,102,126),new n(30,new t(7,116),new t(7,117)),new n(28,new t(21,45),new t(7,46)),new n(30,new t(1,23),new t(37,24)),new n(30,new t(19,15),new t(26,16))),new r(30,new Array(6,26,52,78,104,130),new n(30,new t(5,115),new t(10,116)),new n(28,new t(19,47),new t(10,48)),new n(30,new t(15,24),new t(25,25)),new n(30,new t(23,15),new t(25,16))),new r(31,new Array(6,30,56,82,108,134),new n(30,new t(13,115),new t(3,116)),new n(28,new t(2,46),new t(29,47)),new n(30,new t(42,24),new t(1,25)),new n(30,new t(23,15),new t(28,16))),new r(32,new Array(6,34,60,86,112,138),new n(30,new t(17,115)),new n(28,new t(10,46),new t(23,47)),new n(30,new t(10,24),new t(35,25)),new n(30,new t(19,15),new t(35,16))),new r(33,new Array(6,30,58,86,114,142),new n(30,new t(17,115),new t(1,116)),new n(28,new t(14,46),new t(21,47)),new n(30,new t(29,24),new t(19,25)),new n(30,new t(11,15),new t(46,16))),new r(34,new Array(6,34,62,90,118,146),new n(30,new t(13,115),new t(6,116)),new n(28,new t(14,46),new t(23,47)),new n(30,new t(44,24),new t(7,25)),new n(30,new t(59,16),new t(1,17))),new r(35,new Array(6,30,54,78,102,126,150),new n(30,new t(12,121),new t(7,122)),new n(28,new t(12,47),new t(26,48)),new n(30,new t(39,24),new t(14,25)),new n(30,new t(22,15),new t(41,16))),new r(36,new Array(6,24,50,76,102,128,154),new n(30,new t(6,121),new t(14,122)),new n(28,new t(6,47),new t(34,48)),new n(30,new t(46,24),new t(10,25)),new n(30,new t(2,15),new t(64,16))),new r(37,new Array(6,28,54,80,106,132,158),new n(30,new t(17,122),new t(4,123)),new n(28,new t(29,46),new t(14,47)),new n(30,new t(49,24),new t(10,25)),new n(30,new t(24,15),new t(46,16))),new r(38,new Array(6,32,58,84,110,136,162),new n(30,new t(4,122),new t(18,123)),new n(28,new t(13,46),new t(32,47)),new n(30,new t(48,24),new t(14,25)),new n(30,new t(42,15),new t(32,16))),new r(39,new Array(6,26,54,82,110,138,166),new n(30,new t(20,117),new t(4,118)),new n(28,new t(40,47),new t(7,48)),new n(30,new t(43,24),new t(22,25)),new n(30,new t(10,15),new t(67,16))),new r(40,new Array(6,30,58,86,114,142,170),new n(30,new t(19,118),new t(6,119)),new n(28,new t(18,47),new t(31,48)),new n(30,new t(34,24),new t(34,25)),new n(30,new t(20,15),new t(61,16)))),r.getVersionForNumber=function(e){if(e<1||e>40)throw"ArgumentException";return r.VERSIONS[e-1]},r.getProvisionalVersionForDimension=function(e){if(e%4!=1)throw"Error getProvisionalVersionForDimension";try{return r.getVersionForNumber(e-17>>2)}catch(e){throw"Error getVersionForNumber"}},r.decodeVersionInformation=function(e){for(var t=4294967295,n=0,i=0;i<r.VERSION_DECODE_INFO.length;i++){var a=r.VERSION_DECODE_INFO[i];if(a==e)return this.getVersionForNumber(i+7);var o=w.numBitsDiffering(e,a);o<t&&(n=i+7,t=o)}return t<=3?this.getVersionForNumber(n):null},i.quadrilateralToQuadrilateral=function(e,t,n,r,i,a,o,s,h,w,f,u,d,l,c,g){var v=this.quadrilateralToSquare(e,t,n,r,i,a,o,s);return this.squareToQuadrilateral(h,w,f,u,d,l,c,g).times(v)},i.squareToQuadrilateral=function(e,t,n,r,a,o,s,h){var w=h-o,f=t-r+o-h;if(0==w&&0==f)return new i(n-e,a-n,e,r-t,o-r,t,0,0,1);var u=n-a,d=s-a,l=e-n+a-s,c=r-o,g=u*w-d*c,v=(l*w-d*f)/g,m=(u*f-l*c)/g;return new i(n-e+v*n,s-e+m*s,e,r-t+v*r,h-t+m*h,t,v,m,1)},i.quadrilateralToSquare=function(e,t,n,r,i,a,o,s){return this.squareToQuadrilateral(e,t,n,r,i,a,o,s).buildAdjoint()};var s=new Array(new Array(21522,0),new Array(20773,1),new Array(24188,2),new Array(23371,3),new Array(17913,4),new Array(16590,5),new Array(20375,6),new Array(19104,7),new Array(30660,8),new Array(29427,9),new Array(32170,10),new Array(30877,11),new Array(26159,12),new Array(25368,13),new Array(27713,14),new Array(26998,15),new Array(5769,16),new Array(5054,17),new Array(7399,18),new Array(6608,19),new Array(1890,20),new Array(597,21),new Array(3340,22),new Array(2107,23),new Array(13663,24),new Array(12392,25),new Array(16177,26),new Array(14854,27),new Array(9396,28),new Array(8579,29),new Array(11994,30),new Array(11245,31)),h=new Array(0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4);function w(e){this.errorCorrectionLevel=f.forBits(e>>3&3),this.dataMask=7&e,this.__defineGetter__("ErrorCorrectionLevel",function(){return this.errorCorrectionLevel}),this.__defineGetter__("DataMask",function(){return this.dataMask}),this.GetHashCode=function(){return this.errorCorrectionLevel.ordinal()<<3|this.dataMask},this.Equals=function(e){var t=e;return this.errorCorrectionLevel==t.errorCorrectionLevel&&this.dataMask==t.dataMask}}function f(e,t,n){this.ordinal_Renamed_Field=e,this.bits=t,this.name=n,this.__defineGetter__("Bits",function(){return this.bits}),this.__defineGetter__("Name",function(){return this.name}),this.ordinal=function(){return this.ordinal_Renamed_Field}}w.numBitsDiffering=function(e,t){return h[15&(e^=t)]+h[15&M(e,4)]+h[15&M(e,8)]+h[15&M(e,12)]+h[15&M(e,16)]+h[15&M(e,20)]+h[15&M(e,24)]+h[15&M(e,28)]},w.decodeFormatInformation=function(e){var t=w.doDecodeFormatInformation(e);return null!=t?t:w.doDecodeFormatInformation(21522^e)},w.doDecodeFormatInformation=function(e){for(var t=4294967295,n=0,r=0;r<s.length;r++){var i=s[r],a=i[0];if(a==e)return new w(i[1]);var o=this.numBitsDiffering(e,a);o<t&&(n=i[1],t=o)}return t<=3?new w(n):null},f.forBits=function(e){if(e<0||e>=g.length)throw"ArgumentException";return g[e]};var u=new f(0,1,"L"),d=new f(1,0,"M"),l=new f(2,3,"Q"),c=new f(3,2,"H"),g=new Array(d,u,c,l);function v(e,t){if(t||(t=e),e<1||t<1)throw"Both dimensions must be greater than 0";this.width=e,this.height=t;var n=e>>5;0!=(31&e)&&n++,this.rowSize=n,this.bits=new Array(n*t);for(var r=0;r<this.bits.length;r++)this.bits[r]=0;this.__defineGetter__("Width",function(){return this.width}),this.__defineGetter__("Height",function(){return this.height}),this.__defineGetter__("Dimension",function(){if(this.width!=this.height)throw"Can't call getDimension() on a non-square matrix";return this.width}),this.get_Renamed=function(e,t){var n=t*this.rowSize+(e>>5);return 0!=(1&M(this.bits[n],31&e))},this.set_Renamed=function(e,t){var n=t*this.rowSize+(e>>5);this.bits[n]|=1<<(31&e)},this.flip=function(e,t){var n=t*this.rowSize+(e>>5);this.bits[n]^=1<<(31&e)},this.clear=function(){for(var e=this.bits.length,t=0;t<e;t++)this.bits[t]=0},this.setRegion=function(e,t,n,r){if(t<0||e<0)throw"Left and top must be nonnegative";if(r<1||n<1)throw"Height and width must be at least 1";var i=e+n,a=t+r;if(a>this.height||i>this.width)throw"The region must fit inside the matrix";for(var o=t;o<a;o++)for(var s=o*this.rowSize,h=e;h<i;h++)this.bits[s+(h>>5)]|=1<<(31&h)}}function m(e,t){this.numDataCodewords=e,this.codewords=t,this.__defineGetter__("NumDataCodewords",function(){return this.numDataCodewords}),this.__defineGetter__("Codewords",function(){return this.codewords})}function b(e){var t=e.Dimension;if(t<21||1!=(3&t))throw"Error BitMatrixParser";this.bitMatrix=e,this.parsedVersion=null,this.parsedFormatInfo=null,this.copyBit=function(e,t,n){return this.bitMatrix.get_Renamed(e,t)?n<<1|1:n<<1},this.readFormatInformation=function(){if(null!=this.parsedFormatInfo)return this.parsedFormatInfo;for(var e=0,t=0;t<6;t++)e=this.copyBit(t,8,e);e=this.copyBit(7,8,e),e=this.copyBit(8,8,e),e=this.copyBit(8,7,e);for(var n=5;n>=0;n--)e=this.copyBit(8,n,e);if(this.parsedFormatInfo=w.decodeFormatInformation(e),null!=this.parsedFormatInfo)return this.parsedFormatInfo;var r=this.bitMatrix.Dimension;e=0;var i=r-8;for(t=r-1;t>=i;t--)e=this.copyBit(t,8,e);for(n=r-7;n<r;n++)e=this.copyBit(8,n,e);if(this.parsedFormatInfo=w.decodeFormatInformation(e),null!=this.parsedFormatInfo)return this.parsedFormatInfo;throw"Error readFormatInformation"},this.readVersion=function(){if(null!=this.parsedVersion)return this.parsedVersion;var e=this.bitMatrix.Dimension,t=e-17>>2;if(t<=6)return r.getVersionForNumber(t);for(var n=0,i=e-11,a=5;a>=0;a--)for(var o=e-9;o>=i;o--)n=this.copyBit(o,a,n);if(this.parsedVersion=r.decodeVersionInformation(n),null!=this.parsedVersion&&this.parsedVersion.DimensionForVersion==e)return this.parsedVersion;n=0;for(o=5;o>=0;o--)for(a=e-9;a>=i;a--)n=this.copyBit(o,a,n);if(this.parsedVersion=r.decodeVersionInformation(n),null!=this.parsedVersion&&this.parsedVersion.DimensionForVersion==e)return this.parsedVersion;throw"Error readVersion"},this.readCodewords=function(){var e=this.readFormatInformation(),t=this.readVersion(),n=y.forReference(e.DataMask),r=this.bitMatrix.Dimension;n.unmaskBitMatrix(this.bitMatrix,r);for(var i=t.buildFunctionPattern(),a=!0,o=new Array(t.TotalCodewords),s=0,h=0,w=0,f=r-1;f>0;f-=2){6==f&&f--;for(var u=0;u<r;u++)for(var d=a?r-1-u:u,l=0;l<2;l++)i.get_Renamed(f-l,d)||(w++,h<<=1,this.bitMatrix.get_Renamed(f-l,d)&&(h|=1),8==w&&(o[s++]=h,w=0,h=0));a^=!0}if(s!=t.TotalCodewords)throw"Error readCodewords";return o}}m.getDataBlocks=function(e,t,n){if(e.length!=t.TotalCodewords)throw"ArgumentException";for(var r=t.getECBlocksForLevel(n),i=0,a=r.getECBlocks(),o=0;o<a.length;o++)i+=a[o].Count;for(var s=new Array(i),h=0,w=0;w<a.length;w++){var f=a[w];for(o=0;o<f.Count;o++){var u=f.DataCodewords,d=r.ECCodewordsPerBlock+u;s[h++]=new m(u,new Array(d))}}for(var l=s[0].codewords.length,c=s.length-1;c>=0;){if(s[c].codewords.length==l)break;c--}c++;var g=l-r.ECCodewordsPerBlock,v=0;for(o=0;o<g;o++)for(w=0;w<h;w++)s[w].codewords[o]=e[v++];for(w=c;w<h;w++)s[w].codewords[g]=e[v++];var b=s[0].codewords.length;for(o=g;o<b;o++)for(w=0;w<h;w++){var y=w<c?o:o+1;s[w].codewords[y]=e[v++]}return s};var y={};function C(e,t){if(null==t||0==t.length)throw"System.ArgumentException";this.field=e;var n=t.length;if(n>1&&0==t[0]){for(var r=1;r<n&&0==t[r];)r++;if(r==n)this.coefficients=e.Zero.coefficients;else{this.coefficients=new Array(n-r);for(var i=0;i<this.coefficients.length;i++)this.coefficients[i]=0;for(var a=0;a<this.coefficients.length;a++)this.coefficients[a]=t[r+a]}}else this.coefficients=t;this.__defineGetter__("Zero",function(){return 0==this.coefficients[0]}),this.__defineGetter__("Degree",function(){return this.coefficients.length-1}),this.__defineGetter__("Coefficients",function(){return this.coefficients}),this.getCoefficient=function(e){return this.coefficients[this.coefficients.length-1-e]},this.evaluateAt=function(e){if(0==e)return this.getCoefficient(0);var t=this.coefficients.length;if(1==e){for(var n=0,r=0;r<t;r++)n=_.addOrSubtract(n,this.coefficients[r]);return n}var i=this.coefficients[0];for(r=1;r<t;r++)i=_.addOrSubtract(this.field.multiply(e,i),this.coefficients[r]);return i},this.addOrSubtract=function(t){if(this.field!=t.field)throw"GF256Polys do not have same GF256 field";if(this.Zero)return t;if(t.Zero)return this;var n=this.coefficients,r=t.coefficients;if(n.length>r.length){var i=n;n=r,r=i}for(var a=new Array(r.length),o=r.length-n.length,s=0;s<o;s++)a[s]=r[s];for(var h=o;h<r.length;h++)a[h]=_.addOrSubtract(n[h-o],r[h]);return new C(e,a)},this.multiply1=function(e){if(this.field!=e.field)throw"GF256Polys do not have same GF256 field";if(this.Zero||e.Zero)return this.field.Zero;for(var t=this.coefficients,n=t.length,r=e.coefficients,i=r.length,a=new Array(n+i-1),o=0;o<n;o++)for(var s=t[o],h=0;h<i;h++)a[o+h]=_.addOrSubtract(a[o+h],this.field.multiply(s,r[h]));return new C(this.field,a)},this.multiply2=function(e){if(0==e)return this.field.Zero;if(1==e)return this;for(var t=this.coefficients.length,n=new Array(t),r=0;r<t;r++)n[r]=this.field.multiply(this.coefficients[r],e);return new C(this.field,n)},this.multiplyByMonomial=function(e,t){if(e<0)throw"System.ArgumentException";if(0==t)return this.field.Zero;for(var n=this.coefficients.length,r=new Array(n+e),i=0;i<r.length;i++)r[i]=0;for(i=0;i<n;i++)r[i]=this.field.multiply(this.coefficients[i],t);return new C(this.field,r)},this.divide=function(e){if(this.field!=e.field)throw"GF256Polys do not have same GF256 field";if(e.Zero)throw"Divide by 0";for(var t=this.field.Zero,n=this,r=e.getCoefficient(e.Degree),i=this.field.inverse(r);n.Degree>=e.Degree&&!n.Zero;){var a=n.Degree-e.Degree,o=this.field.multiply(n.getCoefficient(n.Degree),i),s=e.multiplyByMonomial(a,o),h=this.field.buildMonomial(a,o);t=t.addOrSubtract(h),n=n.addOrSubtract(s)}return new Array(t,n)}}function _(e){this.expTable=new Array(256),this.logTable=new Array(256);for(var t=1,n=0;n<256;n++)this.expTable[n]=t,(t<<=1)>=256&&(t^=e);for(n=0;n<255;n++)this.logTable[this.expTable[n]]=n;var r=new Array(1);r[0]=0,this.zero=new C(this,new Array(r));var i=new Array(1);i[0]=1,this.one=new C(this,new Array(i)),this.__defineGetter__("Zero",function(){return this.zero}),this.__defineGetter__("One",function(){return this.one}),this.buildMonomial=function(e,t){if(e<0)throw"System.ArgumentException";if(0==t)return this.zero;for(var n=new Array(e+1),r=0;r<n.length;r++)n[r]=0;return n[0]=t,new C(this,n)},this.exp=function(e){return this.expTable[e]},this.log=function(e){if(0==e)throw"System.ArgumentException";return this.logTable[e]},this.inverse=function(e){if(0==e)throw"System.ArithmeticException";return this.expTable[255-this.logTable[e]]},this.multiply=function(e,t){return 0==e||0==t?0:1==e?t:1==t?e:this.expTable[(this.logTable[e]+this.logTable[t])%255]}}y.forReference=function(e){if(e<0||e>7)throw"System.ArgumentException";return y.DATA_MASKS[e]},y.DATA_MASKS=new Array(new function(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++)for(var r=0;r<t;r++)this.isMasked(n,r)&&e.flip(r,n)},this.isMasked=function(e,t){return 0==(e+t&1)}},new function(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++)for(var r=0;r<t;r++)this.isMasked(n,r)&&e.flip(r,n)},this.isMasked=function(e,t){return 0==(1&e)}},new function(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++)for(var r=0;r<t;r++)this.isMasked(n,r)&&e.flip(r,n)},this.isMasked=function(e,t){return t%3==0}},new function(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++)for(var r=0;r<t;r++)this.isMasked(n,r)&&e.flip(r,n)},this.isMasked=function(e,t){return(e+t)%3==0}},new function(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++)for(var r=0;r<t;r++)this.isMasked(n,r)&&e.flip(r,n)},this.isMasked=function(e,t){return 0==(M(e,1)+t/3&1)}},new function(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++)for(var r=0;r<t;r++)this.isMasked(n,r)&&e.flip(r,n)},this.isMasked=function(e,t){var n=e*t;return(1&n)+n%3==0}},new function(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++)for(var r=0;r<t;r++)this.isMasked(n,r)&&e.flip(r,n)},this.isMasked=function(e,t){var n=e*t;return 0==((1&n)+n%3&1)}},new function(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++)for(var r=0;r<t;r++)this.isMasked(n,r)&&e.flip(r,n)},this.isMasked=function(e,t){return 0==((e+t&1)+e*t%3&1)}}),_.QR_CODE_FIELD=new _(285),_.DATA_MATRIX_FIELD=new _(301),_.addOrSubtract=function(e,t){return e^t};var p={};p.rsDecoder=new function(e){this.field=e,this.decode=function(e,t){for(var n=new C(this.field,e),r=new Array(t),i=0;i<r.length;i++)r[i]=0;var a=!0;for(i=0;i<t;i++){var o=n.evaluateAt(this.field.exp(i));r[r.length-1-i]=o,0!=o&&(a=!1)}if(!a){var s=new C(this.field,r),h=this.runEuclideanAlgorithm(this.field.buildMonomial(t,1),s,t),w=h[0],f=h[1],u=this.findErrorLocations(w),d=this.findErrorMagnitudes(f,u,!1);for(i=0;i<u.length;i++){var l=e.length-1-this.field.log(u[i]);if(l<0)throw"ReedSolomonException Bad error location";e[l]=_.addOrSubtract(e[l],d[i])}}},this.runEuclideanAlgorithm=function(e,t,n){if(e.Degree<t.Degree){var r=e;e=t,t=r}for(var i=e,a=t,o=this.field.One,s=this.field.Zero,h=this.field.Zero,w=this.field.One;a.Degree>=Math.floor(n/2);){var f=i,u=o,d=h;if(o=s,h=w,(i=a).Zero)throw"r_{i-1} was zero";a=f;for(var l=this.field.Zero,c=i.getCoefficient(i.Degree),g=this.field.inverse(c);a.Degree>=i.Degree&&!a.Zero;){var v=a.Degree-i.Degree,m=this.field.multiply(a.getCoefficient(a.Degree),g);l=l.addOrSubtract(this.field.buildMonomial(v,m)),a=a.addOrSubtract(i.multiplyByMonomial(v,m))}s=l.multiply1(o).addOrSubtract(u),w=l.multiply1(h).addOrSubtract(d)}var b=w.getCoefficient(0);if(0==b)throw"ReedSolomonException sigmaTilde(0) was zero";var y=this.field.inverse(b),C=w.multiply2(y),_=a.multiply2(y);return new Array(C,_)},this.findErrorLocations=function(e){var t=e.Degree;if(1==t)return new Array(e.getCoefficient(1));for(var n=new Array(t),r=0,i=1;i<256&&r<t;i++)0==e.evaluateAt(i)&&(n[r]=this.field.inverse(i),r++);if(r!=t)throw"Error locator degree does not match number of roots";return n},this.findErrorMagnitudes=function(e,t,n){for(var r=t.length,i=new Array(r),a=0;a<r;a++){for(var o=this.field.inverse(t[a]),s=1,h=0;h<r;h++)a!=h&&(s=this.field.multiply(s,_.addOrSubtract(1,this.field.multiply(t[h],o))));i[a]=this.field.multiply(e.evaluateAt(o),this.field.inverse(s)),n&&(i[a]=this.field.multiply(i[a],o))}return i}}(_.QR_CODE_FIELD),p.correctErrors=function(e,t){for(var n=e.length,r=new Array(n),i=0;i<n;i++)r[i]=255&e[i];var a=e.length-t;try{p.rsDecoder.decode(r,a)}catch(e){throw e}for(i=0;i<t;i++)e[i]=r[i]},p.decode=function(e){for(var t=new b(e),n=t.readVersion(),r=t.readFormatInformation().ErrorCorrectionLevel,i=t.readCodewords(),a=m.getDataBlocks(i,n,r),o=0,s=0;s<a.length;s++)o+=a[s].NumDataCodewords;for(var h=new Array(o),w=0,f=0;f<a.length;f++){var u=a[f],d=u.Codewords,l=u.NumDataCodewords;p.correctErrors(d,l);for(s=0;s<l;s++)h[w++]=d[s]}return new I(h,n.VersionNumber,r.Bits)};var A={};function M(e,t){return e>=0?e>>t:(e>>t)+(2<<~t)}A.imagedata=null,A.width=0,A.height=0,A.qrCodeSymbol=null,A.debug=!1,A.maxImgSize=1048576,A.sizeOfDataLengthInfo=[[10,9,8,8],[12,11,16,10],[14,13,16,12]],A.callback=null,A.vidSuccess=function(e){A.localstream=e,A.webkit?A.video.src=window.webkitURL.createObjectURL(e):A.moz?(A.video.mozSrcObject=e,A.video.zoom(2),A.video.play()):A.video.src=e,A.gUM=!0,A.canvas_qr2=document.createElement("canvas"),A.canvas_qr2.id="qr-canvas",A.qrcontext2=A.canvas_qr2.getContext("2d"),A.canvas_qr2.width=A.video.videoWidth,A.canvas_qr2.height=A.video.videoHeight,setTimeout(A.captureToCanvas,500)},A.vidError=function(e){A.gUM=!1},A.captureToCanvas=function(){if(A.gUM)try{if(0==A.video.videoWidth)return void setTimeout(A.captureToCanvas,500);A.canvas_qr2.width=A.video.videoWidth,A.canvas_qr2.height=A.video.videoHeight,A.qrcontext2.drawImage(A.video,0,0);try{A.decode()}catch(e){console.log(e),setTimeout(A.captureToCanvas,500)}}catch(e){console.log(e),setTimeout(A.captureToCanvas,500)}},A.setWebcam=function(e){var t=navigator;A.video=document.getElementById(e);var n=!0;if(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)try{navigator.mediaDevices.enumerateDevices().then(function(e){e.forEach(function(e){console.log("deb1"),"videoinput"===e.kind&&e.label.toLowerCase().search("back")>-1&&(n=[{sourceId:e.deviceId}]),console.log(e.kind+": "+e.label+" id = "+e.deviceId)})})}catch(e){console.log(e)}else console.log("no navigator.mediaDevices.enumerateDevices");t.getUserMedia?t.getUserMedia({video:n,audio:!1},A.vidSuccess,A.vidError):t.webkitGetUserMedia?(A.webkit=!0,t.webkitGetUserMedia({video:n,audio:!1},A.vidSuccess,A.vidError)):t.mozGetUserMedia&&(A.moz=!0,t.mozGetUserMedia({video:n,audio:!1},A.vidSuccess,A.vidError))},A.decode=function(e){if(0==arguments.length){if(A.canvas_qr2)var t=A.canvas_qr2,n=A.qrcontext2;else n=(t=document.getElementById("qr-canvas")).getContext("2d");return A.width=t.width,A.height=t.height,A.imagedata=n.getImageData(0,0,A.width,A.height),A.result=A.process(n),null!=A.callback&&A.callback(A.result),A.result}var r=new Image;r.crossOrigin="Anonymous",r.onload=function(){var e=document.getElementById("out-canvas");if(null!=e){var t=e.getContext("2d");t.clearRect(0,0,320,240),t.drawImage(r,0,0,320,240)}var n=document.createElement("canvas"),i=n.getContext("2d"),a=r.height,o=r.width;if(r.width*r.height>A.maxImgSize){var s=r.width/r.height;o=s*(a=Math.sqrt(A.maxImgSize/s))}n.width=o,n.height=a,i.drawImage(r,0,0,n.width,n.height),A.width=n.width,A.height=n.height;try{A.imagedata=i.getImageData(0,0,n.width,n.height)}catch(e){return A.result="Cross domain image reading not supported in your browser! Save it to your computer then drag and drop the file!",void(null!=A.callback&&A.callback(A.result))}try{A.result=A.process(i)}catch(e){console.log(e),A.result="error decoding QR Code"}null!=A.callback&&A.callback(A.result)},r.onerror=function(){null!=A.callback&&A.callback("Failed to load the image")},r.src=e},A.isUrl=function(e){return/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(e)},A.decode_url=function(e){var t="";try{t=escape(e)}catch(n){console.log(n),t=e}var n="";try{n=decodeURIComponent(t)}catch(e){console.log(e),n=t}return n},A.decode_utf8=function(e){return A.isUrl(e)?A.decode_url(e):e},A.process=function(e){var t=(new Date).getTime(),n=A.grayScaleToBitmap(A.grayscale());if(A.debug){for(var r=0;r<A.height;r++)for(var i=0;i<A.width;i++){var a=4*i+r*A.width*4;A.imagedata.data[a]=(n[i+r*A.width],0),A.imagedata.data[a+1]=(n[i+r*A.width],0),A.imagedata.data[a+2]=n[i+r*A.width]?255:0}e.putImageData(A.imagedata,0,0)}var s=new o(n).detect();if(A.debug){for(r=0;r<s.bits.Height;r++)for(i=0;i<s.bits.Width;i++){a=4*i*2+2*r*A.width*4;A.imagedata.data[a]=(s.bits.get_Renamed(i,r),0),A.imagedata.data[a+1]=(s.bits.get_Renamed(i,r),0),A.imagedata.data[a+2]=s.bits.get_Renamed(i,r)?255:0}e.putImageData(A.imagedata,0,0)}for(var h=p.decode(s.bits).DataByte,w="",f=0;f<h.length;f++)for(var u=0;u<h[f].length;u++)w+=String.fromCharCode(h[f][u]);var d=(new Date).getTime()-t;return console.log(d),A.decode_utf8(w)},A.getPixel=function(e,t){if(A.width<e)throw"point error";if(A.height<t)throw"point error";var n=4*e+t*A.width*4;return(33*A.imagedata.data[n]+34*A.imagedata.data[n+1]+33*A.imagedata.data[n+2])/100},A.binarize=function(e){for(var t=new Array(A.width*A.height),n=0;n<A.height;n++)for(var r=0;r<A.width;r++){var i=A.getPixel(r,n);t[r+n*A.width]=i<=e}return t},A.getMiddleBrightnessPerArea=function(e){for(var t=Math.floor(A.width/4),n=Math.floor(A.height/4),r=new Array(4),i=0;i<4;i++){r[i]=new Array(4);for(var a=0;a<4;a++)r[i][a]=new Array(0,0)}for(var o=0;o<4;o++)for(var s=0;s<4;s++){r[s][o][0]=255;for(var h=0;h<n;h++)for(var w=0;w<t;w++){var f=e[t*s+w+(n*o+h)*A.width];f<r[s][o][0]&&(r[s][o][0]=f),f>r[s][o][1]&&(r[s][o][1]=f)}}for(var u=new Array(4),d=0;d<4;d++)u[d]=new Array(4);for(o=0;o<4;o++)for(s=0;s<4;s++)u[s][o]=Math.floor((r[s][o][0]+r[s][o][1])/2);return u},A.grayScaleToBitmap=function(e){for(var t=A.getMiddleBrightnessPerArea(e),n=t.length,r=Math.floor(A.width/n),i=Math.floor(A.height/n),a=new ArrayBuffer(A.width*A.height),o=new Uint8Array(a),s=0;s<n;s++)for(var h=0;h<n;h++)for(var w=0;w<i;w++)for(var f=0;f<r;f++)o[r*h+f+(i*s+w)*A.width]=e[r*h+f+(i*s+w)*A.width]<t[h][s];return o},A.grayscale=function(){for(var e=new ArrayBuffer(A.width*A.height),t=new Uint8Array(e),n=0;n<A.height;n++)for(var r=0;r<A.width;r++){var i=A.getPixel(r,n);t[r+n*A.width]=i}return t};var k=3,P=57,S=8,B=2;function N(e,t,n){this.x=e,this.y=t,this.count=1,this.estimatedModuleSize=n,this.__defineGetter__("EstimatedModuleSize",function(){return this.estimatedModuleSize}),this.__defineGetter__("Count",function(){return this.count}),this.__defineGetter__("X",function(){return this.x}),this.__defineGetter__("Y",function(){return this.y}),this.incrementCount=function(){this.count++},this.aboutEquals=function(e,t,n){if(Math.abs(t-this.y)<=e&&Math.abs(n-this.x)<=e){var r=Math.abs(e-this.estimatedModuleSize);return r<=1||r/this.estimatedModuleSize<=1}return!1}}function E(e){this.bottomLeft=e[0],this.topLeft=e[1],this.topRight=e[2],this.__defineGetter__("BottomLeft",function(){return this.bottomLeft}),this.__defineGetter__("TopLeft",function(){return this.topLeft}),this.__defineGetter__("TopRight",function(){return this.topRight})}function D(){this.image=null,this.possibleCenters=[],this.hasSkipped=!1,this.crossCheckStateCount=new Array(0,0,0,0,0),this.resultPointCallback=null,this.__defineGetter__("CrossCheckStateCount",function(){return this.crossCheckStateCount[0]=0,this.crossCheckStateCount[1]=0,this.crossCheckStateCount[2]=0,this.crossCheckStateCount[3]=0,this.crossCheckStateCount[4]=0,this.crossCheckStateCount}),this.foundPatternCross=function(e){for(var t=0,n=0;n<5;n++){var r=e[n];if(0==r)return!1;t+=r}if(t<7)return!1;var i=Math.floor((t<<S)/7),a=Math.floor(i/2);return Math.abs(i-(e[0]<<S))<a&&Math.abs(i-(e[1]<<S))<a&&Math.abs(3*i-(e[2]<<S))<3*a&&Math.abs(i-(e[3]<<S))<a&&Math.abs(i-(e[4]<<S))<a},this.centerFromEnd=function(e,t){return t-e[4]-e[3]-e[2]/2},this.crossCheckVertical=function(e,t,n,r){for(var i=this.image,a=A.height,o=this.CrossCheckStateCount,s=e;s>=0&&i[t+s*A.width];)o[2]++,s--;if(s<0)return NaN;for(;s>=0&&!i[t+s*A.width]&&o[1]<=n;)o[1]++,s--;if(s<0||o[1]>n)return NaN;for(;s>=0&&i[t+s*A.width]&&o[0]<=n;)o[0]++,s--;if(o[0]>n)return NaN;for(s=e+1;s<a&&i[t+s*A.width];)o[2]++,s++;if(s==a)return NaN;for(;s<a&&!i[t+s*A.width]&&o[3]<n;)o[3]++,s++;if(s==a||o[3]>=n)return NaN;for(;s<a&&i[t+s*A.width]&&o[4]<n;)o[4]++,s++;if(o[4]>=n)return NaN;var h=o[0]+o[1]+o[2]+o[3]+o[4];return 5*Math.abs(h-r)>=2*r?NaN:this.foundPatternCross(o)?this.centerFromEnd(o,s):NaN},this.crossCheckHorizontal=function(e,t,n,r){for(var i=this.image,a=A.width,o=this.CrossCheckStateCount,s=e;s>=0&&i[s+t*A.width];)o[2]++,s--;if(s<0)return NaN;for(;s>=0&&!i[s+t*A.width]&&o[1]<=n;)o[1]++,s--;if(s<0||o[1]>n)return NaN;for(;s>=0&&i[s+t*A.width]&&o[0]<=n;)o[0]++,s--;if(o[0]>n)return NaN;for(s=e+1;s<a&&i[s+t*A.width];)o[2]++,s++;if(s==a)return NaN;for(;s<a&&!i[s+t*A.width]&&o[3]<n;)o[3]++,s++;if(s==a||o[3]>=n)return NaN;for(;s<a&&i[s+t*A.width]&&o[4]<n;)o[4]++,s++;if(o[4]>=n)return NaN;var h=o[0]+o[1]+o[2]+o[3]+o[4];return 5*Math.abs(h-r)>=r?NaN:this.foundPatternCross(o)?this.centerFromEnd(o,s):NaN},this.handlePossibleCenter=function(e,t,n){var r=e[0]+e[1]+e[2]+e[3]+e[4],i=this.centerFromEnd(e,n),a=this.crossCheckVertical(t,Math.floor(i),e[2],r);if(!isNaN(a)&&(i=this.crossCheckHorizontal(Math.floor(i),Math.floor(a),e[2],r),!isNaN(i))){for(var o=r/7,s=!1,h=this.possibleCenters.length,w=0;w<h;w++){var f=this.possibleCenters[w];if(f.aboutEquals(o,a,i)){f.incrementCount(),s=!0;break}}if(!s){var u=new N(i,a,o);this.possibleCenters.push(u),null!=this.resultPointCallback&&this.resultPointCallback.foundPossibleResultPoint(u)}return!0}return!1},this.selectBestPatterns=function(){var e=this.possibleCenters.length;if(e<3)throw"Couldn't find enough finder patterns (found "+e+")";if(e>3){for(var t=0,n=0,r=0;r<e;r++){var i=this.possibleCenters[r].EstimatedModuleSize;t+=i,n+=i*i}var a=t/e;this.possibleCenters.sort(function(e,t){var n=Math.abs(t.EstimatedModuleSize-a),r=Math.abs(e.EstimatedModuleSize-a);return n<r?-1:n==r?0:1});var o=Math.sqrt(n/e-a*a),s=Math.max(.2*a,o);for(r=this.possibleCenters.length-1;r>=0;r--){var h=this.possibleCenters[r];Math.abs(h.EstimatedModuleSize-a)>s&&this.possibleCenters.splice(r,1)}}return this.possibleCenters.length>3&&this.possibleCenters.sort(function(e,t){return e.count>t.count?-1:e.count<t.count?1:0}),new Array(this.possibleCenters[0],this.possibleCenters[1],this.possibleCenters[2])},this.findRowSkip=function(){var e=this.possibleCenters.length;if(e<=1)return 0;for(var t=null,n=0;n<e;n++){var r=this.possibleCenters[n];if(r.Count>=B){if(null!=t)return this.hasSkipped=!0,Math.floor((Math.abs(t.X-r.X)-Math.abs(t.Y-r.Y))/2);t=r}}return 0},this.haveMultiplyConfirmedCenters=function(){for(var e=0,t=0,n=this.possibleCenters.length,r=0;r<n;r++){var i=this.possibleCenters[r];i.Count>=B&&(e++,t+=i.EstimatedModuleSize)}if(e<3)return!1;var a=t/n,o=0;for(r=0;r<n;r++)i=this.possibleCenters[r],o+=Math.abs(i.EstimatedModuleSize-a);return o<=.05*t},this.findFinderPattern=function(e){this.image=e;var t=A.height,n=A.width,r=Math.floor(3*t/(4*P));r<k&&(r=k);for(var i=!1,a=new Array(5),o=r-1;o<t&&!i;o+=r){a[0]=0,a[1]=0,a[2]=0,a[3]=0,a[4]=0;for(var s=0,h=0;h<n;h++)if(e[h+o*A.width])1==(1&s)&&s++,a[s]++;else if(0==(1&s))if(4==s)if(this.foundPatternCross(a)){if(this.handlePossibleCenter(a,o,h))if(r=2,this.hasSkipped)i=this.haveMultiplyConfirmedCenters();else{var w=this.findRowSkip();w>a[2]&&(o+=w-a[2]-r,h=n-1)}else{do{h++}while(h<n&&!e[h+o*A.width]);h--}s=0,a[0]=0,a[1]=0,a[2]=0,a[3]=0,a[4]=0}else a[0]=a[2],a[1]=a[3],a[2]=a[4],a[3]=1,a[4]=0,s=3;else a[++s]++;else a[s]++;if(this.foundPatternCross(a))this.handlePossibleCenter(a,o,n)&&(r=a[0],this.hasSkipped&&(i=this.haveMultiplyConfirmedCenters()))}var f=this.selectBestPatterns();return A.orderBestPatterns(f),new E(f)}}function x(e,t,n){this.x=e,this.y=t,this.count=1,this.estimatedModuleSize=n,this.__defineGetter__("EstimatedModuleSize",function(){return this.estimatedModuleSize}),this.__defineGetter__("Count",function(){return this.count}),this.__defineGetter__("X",function(){return Math.floor(this.x)}),this.__defineGetter__("Y",function(){return Math.floor(this.y)}),this.incrementCount=function(){this.count++},this.aboutEquals=function(e,t,n){if(Math.abs(t-this.y)<=e&&Math.abs(n-this.x)<=e){var r=Math.abs(e-this.estimatedModuleSize);return r<=1||r/this.estimatedModuleSize<=1}return!1}}function F(e,t,n,r,i,a,o){this.image=e,this.possibleCenters=new Array,this.startX=t,this.startY=n,this.width=r,this.height=i,this.moduleSize=a,this.crossCheckStateCount=new Array(0,0,0),this.resultPointCallback=o,this.centerFromEnd=function(e,t){return t-e[2]-e[1]/2},this.foundPatternCross=function(e){for(var t=this.moduleSize,n=t/2,r=0;r<3;r++)if(Math.abs(t-e[r])>=n)return!1;return!0},this.crossCheckVertical=function(e,t,n,r){var i=this.image,a=A.height,o=this.crossCheckStateCount;o[0]=0,o[1]=0,o[2]=0;for(var s=e;s>=0&&i[t+s*A.width]&&o[1]<=n;)o[1]++,s--;if(s<0||o[1]>n)return NaN;for(;s>=0&&!i[t+s*A.width]&&o[0]<=n;)o[0]++,s--;if(o[0]>n)return NaN;for(s=e+1;s<a&&i[t+s*A.width]&&o[1]<=n;)o[1]++,s++;if(s==a||o[1]>n)return NaN;for(;s<a&&!i[t+s*A.width]&&o[2]<=n;)o[2]++,s++;if(o[2]>n)return NaN;var h=o[0]+o[1]+o[2];return 5*Math.abs(h-r)>=2*r?NaN:this.foundPatternCross(o)?this.centerFromEnd(o,s):NaN},this.handlePossibleCenter=function(e,t,n){var r=e[0]+e[1]+e[2],i=this.centerFromEnd(e,n),a=this.crossCheckVertical(t,Math.floor(i),2*e[1],r);if(!isNaN(a)){for(var o=(e[0]+e[1]+e[2])/3,s=this.possibleCenters.length,h=0;h<s;h++){if(this.possibleCenters[h].aboutEquals(o,a,i))return new x(i,a,o)}var w=new x(i,a,o);this.possibleCenters.push(w),null!=this.resultPointCallback&&this.resultPointCallback.foundPossibleResultPoint(w)}return null},this.find=function(){for(var t=this.startX,i=this.height,a=t+r,o=n+(i>>1),s=new Array(0,0,0),h=0;h<i;h++){var w=o+(0==(1&h)?h+1>>1:-(h+1>>1));s[0]=0,s[1]=0,s[2]=0;for(var f=t;f<a&&!e[f+A.width*w];)f++;for(var u=0;f<a;){if(e[f+w*A.width])if(1==u)s[u]++;else if(2==u){var d;if(this.foundPatternCross(s))if(null!=(d=this.handlePossibleCenter(s,w,f)))return d;s[0]=s[2],s[1]=1,s[2]=0,u=1}else s[++u]++;else 1==u&&u++,s[u]++;f++}if(this.foundPatternCross(s))if(null!=(d=this.handlePossibleCenter(s,w,a)))return d}if(0!=this.possibleCenters.length)return this.possibleCenters[0];throw"Couldn't find enough alignment patterns"}}function I(e,t,n){this.blockPointer=0,this.bitPointer=7,this.dataLength=0,this.blocks=e,this.numErrorCorrectionCode=n,t<=9?this.dataLengthMode=0:t>=10&&t<=26?this.dataLengthMode=1:t>=27&&t<=40&&(this.dataLengthMode=2),this.getNextBits=function(e){var t=0;if(e<this.bitPointer+1){for(var n=0,r=0;r<e;r++)n+=1<<r;return n<<=this.bitPointer-e+1,t=(this.blocks[this.blockPointer]&n)>>this.bitPointer-e+1,this.bitPointer-=e,t}if(e<this.bitPointer+1+8){var i=0;for(r=0;r<this.bitPointer+1;r++)i+=1<<r;return t=(this.blocks[this.blockPointer]&i)<<e-(this.bitPointer+1),this.blockPointer++,t+=this.blocks[this.blockPointer]>>8-(e-(this.bitPointer+1)),this.bitPointer=this.bitPointer-e%8,this.bitPointer<0&&(this.bitPointer=8+this.bitPointer),t}if(e<this.bitPointer+1+16){i=0;var a=0;for(r=0;r<this.bitPointer+1;r++)i+=1<<r;var o=(this.blocks[this.blockPointer]&i)<<e-(this.bitPointer+1);this.blockPointer++;var s=this.blocks[this.blockPointer]<<e-(this.bitPointer+1+8);this.blockPointer++;for(r=0;r<e-(this.bitPointer+1+8);r++)a+=1<<r;return a<<=8-(e-(this.bitPointer+1+8)),t=o+s+((this.blocks[this.blockPointer]&a)>>8-(e-(this.bitPointer+1+8))),this.bitPointer=this.bitPointer-(e-8)%8,this.bitPointer<0&&(this.bitPointer=8+this.bitPointer),t}return 0},this.NextMode=function(){return this.blockPointer>this.blocks.length-this.numErrorCorrectionCode-2?0:this.getNextBits(4)},this.getDataLength=function(e){for(var t=0;e>>t!=1;)t++;return this.getNextBits(A.sizeOfDataLengthInfo[this.dataLengthMode][t])},this.getRomanAndFigureString=function(e){var t=e,n=0,r="",i=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":");do{if(t>1){var a=(n=this.getNextBits(11))%45;r+=i[Math.floor(n/45)],r+=i[a],t-=2}else 1==t&&(r+=i[n=this.getNextBits(6)],t-=1)}while(t>0);return r},this.getFigureString=function(e){var t=e,n=0,r="";do{t>=3?((n=this.getNextBits(10))<100&&(r+="0"),n<10&&(r+="0"),t-=3):2==t?((n=this.getNextBits(7))<10&&(r+="0"),t-=2):1==t&&(n=this.getNextBits(4),t-=1),r+=n}while(t>0);return r},this.get8bitByteArray=function(e){var t=e,n=0,r=new Array;do{n=this.getNextBits(8),r.push(n),t--}while(t>0);return r},this.getKanjiString=function(e){var t=e,n=0,r="";do{var i=((n=this.getNextBits(13))/192<<8)+n%192,a=0;a=i+33088<=40956?i+33088:i+49472,r+=String.fromCharCode(a),t--}while(t>0);return r},this.parseECIValue=function(){var e=0,t=this.getNextBits(8);(0==(128&t)&&(e=127&t),128==(192&t))&&(e=(63&t)<<8|this.getNextBits(8));192==(224&t)&&(e=(31&t)<<16|this.getNextBits(8));return e},this.__defineGetter__("DataByte",function(){for(var e=new Array;;){var t=this.NextMode();if(0==t){if(e.length>0)break;throw"Empty data block"}if(1!=t&&2!=t&&4!=t&&8!=t&&7!=t)throw"Invalid mode: "+t+" in (block:"+this.blockPointer+" bit:"+this.bitPointer+")";if(7==t)var n=this.parseECIValue();else{var r=this.getDataLength(t);if(r<1)throw"Invalid data length: "+r;switch(t){case 1:for(var i=this.getFigureString(r),a=new Array(i.length),o=0;o<i.length;o++)a[o]=i.charCodeAt(o);e.push(a);break;case 2:for(i=this.getRomanAndFigureString(r),a=new Array(i.length),o=0;o<i.length;o++)a[o]=i.charCodeAt(o);e.push(a);break;case 4:n=this.get8bitByteArray(r);e.push(n);break;case 8:i=this.getKanjiString(r);e.push(i)}}}return e})}return A.orderBestPatterns=function(e){function t(e,t){var n=e.X-t.X,r=e.Y-t.Y;return Math.sqrt(n*n+r*r)}var n,r,i,a=t(e[0],e[1]),o=t(e[1],e[2]),s=t(e[0],e[2]);if(o>=a&&o>=s?(r=e[0],n=e[1],i=e[2]):s>=o&&s>=a?(r=e[1],n=e[0],i=e[2]):(r=e[2],n=e[0],i=e[1]),function(e,t,n){var r=t.x,i=t.y;return(n.x-r)*(e.y-i)-(n.y-i)*(e.x-r)}(n,r,i)<0){var h=n;n=i,i=h}e[0]=n,e[1]=r,e[2]=i},A}

/**
 * @fileoverview
 * HTML5 QR code scanning library.
 * - Decode QR Code using web cam or smartphone camera
 *
 * @author mebjas <minhazav@gmail.com>
 *
 * The word "QR Code" is registered trademark of DENSO WAVE INCORPORATED
 * http://www.denso-wave.com/qrcode/faqpatent-e.html
 *
 * Note: ECMA Script is not supported by all browsers. Use minified/html5-qrcode.min.js for better
 * browser support. Alternatively the transpiled code lives in transpiled/html5-qrcode.js
 */
class Html5Qrcode {
    //#region static constants
    static DEFAULT_WIDTH = 300;
    static DEFAULT_WIDTH_OFFSET = 2;
    static FILE_SCAN_MIN_HEIGHT = 300;
    static SCAN_DEFAULT_FPS = 2;
    static MIN_QR_BOX_SIZE = 50;
    static SHADED_LEFT = 1;
    static SHADED_RIGHT = 2;
    static SHADED_TOP = 3;
    static SHADED_BOTTOM = 4;
    static SHADED_REGION_CLASSNAME = "qr-shaded-region";
    static VERBOSE = false;
    static BORDER_SHADER_DEFAULT_COLOR = "#ffffff";
    static BORDER_SHADER_MATCH_COLOR = "rgb(90, 193, 56)";
    //#endregion

    /**
     * Initialize QR Code scanner.
     *
     * @param {String} elementId - Id of the HTML element.
     * @param {Boolean} verbose - Optional argument, if true, all logs
     *                  would be printed to console.
     */
    constructor(elementId, verbose) {
        if (!getLazarSoftScanner) {
            throw 'Use html5qrcode.min.js without edit, getLazarSoftScanner'
            + 'not found.';
        }

        this.qrcode = getLazarSoftScanner();
        if (!this.qrcode) {
            throw 'qrcode is not defined, use the minified/html5-qrcode.min.js'
            + ' for proper support';
        }

        this._elementId = elementId;
        this._foreverScanTimeout = null;
        this._localMediaStream = null;
        this._shouldScan = true;
        this._url
            = window.URL || window.webkitURL || window.mozURL || window.msURL;
        this._userMedia
            = navigator.getUserMedia || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        this._isScanning = false;

        Html5Qrcode.VERBOSE = verbose === true;
    }

    /**
     * Start scanning QR Code for given camera.
     *
     * @param {String or Object} identifier of the camera, it can either be the
     *  cameraId retrieved from {@code Html5Qrcode#getCameras()} method or
     *  object with facingMode constraint.
     *  Example values:
     *      - "a76afe74e95e3aba9fc1b69c39b8701cde2d3e29aa73065c9cd89438627b3bde"
     *          ^ This is 'deviceId' from camera retrieved from
     *          {@code Html5Qrcode#getCameras()}
     *      - { facingMode: "user" }
     *      - { facingMode: "environment" }
     *      - { facingMode: { exact: "environment" } }
     *      - { facingMode: { exact: "user" } }
     *      - { deviceId: { exact: "a76afe74e95e3....73065c9cd89438627b3bde" }
     *      - { deviceId: "a76afe74e95e3....73065c9cd89438627b3bde" }
     *  Reference: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Syntax
     * @param {Object} config extra configurations to tune QR code scanner.
     *  Supported Fields:
     *      - fps: expected framerate of qr code scanning. example { fps: 2 }
     *          means the scanning would be done every 500 ms.
     *      - qrbox: width of QR scanning box, this should be smaller than
     *          the width and height of the box. This would make the scanner
     *          look like this:
     *          ----------------------
     *          |********************|
     *          |******,,,,,,,,,*****|      <--- shaded region
     *          |******|       |*****|      <--- non shaded region would be
     *          |******|       |*****|          used for QR code scanning.
     *          |******|_______|*****|
     *          |********************|
     *          |********************|
     *          ----------------------
     *      - aspectRatio: Optional, desired aspect ratio for the video feed.
     *          Ideal aspect ratios are 4:3 or 16:9. Passing very wrong aspect
     *          ratio could lead to video feed not showing up.
     *      - disableFlip: Optional, if {@code true} flipped QR Code won't be
     *          scanned. Only use this if you are sure the camera cannot give
     *          mirrored feed if you are facing performance constraints.
     *      - videoConstraints: {MediaTrackConstraints}, Optional
     *          @beta(this config is not well supported yet).
     *
     *          Important: When passed this will override other parameters
     *          like 'cameraIdOrConfig' or configurations like 'aspectRatio'.
     *
     *          videoConstraints should be of type {@code MediaTrackConstraints}
     *          as defined in
     *          https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints
     *          and is used to specify a variety of video or camera controls
     *          like: aspectRatio, facingMode, frameRate, etc.
     * @param {Function} qrCodeSuccessCallback callback on QR Code found.
     *  Example:
     *      function(qrCodeMessage) {}
     * @param {Function} qrCodeErrorCallback callback on QR Code parse error.
     *  Example:
     *      function(errorMessage) {}
     *
     * @returns Promise for starting the scan. The Promise can fail if the user
     * doesn't grant permission or some API is not supported by the browser.
     */
    start(cameraIdOrConfig,
        configuration,
        qrCodeSuccessCallback,
        qrCodeErrorCallback) {
        if (!cameraIdOrConfig) {
            throw "cameraIdOrConfig is required";
        }

        if (!qrCodeSuccessCallback
            || typeof qrCodeSuccessCallback != "function") {
            throw "qrCodeSuccessCallback is required and should be a function."
        }

        if (!qrCodeErrorCallback) {
            qrCodeErrorCallback = console.log;
        }

        // Cleanup.
        this._clearElement();
        const $this = this;

        // Create configuration by merging default and input settings.
        const config = configuration ? configuration : {};
        config.fps = config.fps ? config.fps : Html5Qrcode.SCAN_DEFAULT_FPS;

        // Check if videoConstraints is passed and valid
        let videoConstraintsAvailableAndValid = false;
        if (config.videoConstraints) {
            if (!this._isMediaStreamConstraintsValid(config.videoConstraints)) {
                Html5Qrcode._logError(
                    "'videoConstraints' is not valid 'MediaStreamConstraints, "
                        + "it will be ignored.'",
                    /* experimental= */ true);
            } else {
                videoConstraintsAvailableAndValid = true;
            }
        }
        const videoConstraintsEnabled = videoConstraintsAvailableAndValid;

        // qr shaded box
        const isShadedBoxEnabled = config.qrbox != undefined;
        const element = document.getElementById(this._elementId);
        const width = element.clientWidth
            ? element.clientWidth : Html5Qrcode.DEFAULT_WIDTH;
        element.style.position = "relative";

        this._shouldScan = true;
        this._element = element;
        this.qrcode.callback = qrCodeSuccessCallback;

        // Validate before insertion
        if (isShadedBoxEnabled) {
            const qrboxSize = config.qrbox;
            if (qrboxSize < Html5Qrcode.MIN_QR_BOX_SIZE) {
                throw "minimum size of 'config.qrbox' is"
                + ` ${Html5Qrcode.MIN_QR_BOX_SIZE}px.`;
            }

            if (qrboxSize > width) {
                throw "'config.qrbox' should not be greater than the "
                + "width of the HTML element.";
            }
        }

        //#region local methods
        /**
         * Setups the UI elements, changes the state of this class.
         *
         * @param width derived width of viewfinder.
         * @param height derived height of viewfinder.
         */
        const setupUi = (width, height) => {
            const qrboxSize = config.qrbox;
            if (qrboxSize > height) {
                // TODO(mebjas): Migrate to common logging.
                console.warn("[Html5Qrcode] config.qrboxsize is greater "
                    + "than video height. Shading will be ignored");
            }

            const shouldShadingBeApplied
                = isShadedBoxEnabled && qrboxSize <= height;
            const defaultQrRegion = {
                x: 0,
                y: 0,
                width: width,
                height: height
            };
            const qrRegion = shouldShadingBeApplied
                ? this._getShadedRegionBounds(width, height, qrboxSize)
                : defaultQrRegion;

            const canvasElement = this._createCanvasElement(
                qrRegion.width, qrRegion.height);
            const context = canvasElement.getContext('2d');
            context.canvas.width = qrRegion.width;
            context.canvas.height = qrRegion.height;

            // Insert the canvas
            element.append(canvasElement);
            if (shouldShadingBeApplied) {
                this._possiblyInsertShadingElement(element, width, height, qrboxSize);
            }

            // Update local states
            $this._qrRegion = qrRegion;
            $this._context = context;
            $this._canvasElement = canvasElement;
        }

        /**
         * Scans current context using the qrcode library.
         *
         * <p>This method call would result in callback being triggered by the
         * qrcode library. This method also handles the border coloring.
         *
         * @returns true if scan match is found, false otherwise.
         */
        const scanContext = () => {
            try {
                $this.qrcode.decode();
                this._possiblyUpdateShaders(/* qrMatch= */ true);
                return true;
            } catch (exception) {
                this._possiblyUpdateShaders(/* qrMatch= */ false);
                qrCodeErrorCallback(
                    `QR code parse error, error = ${exception}`);
                return false;
            }
        }

        // Method that scans forever.
        const foreverScan = () => {
            if (!$this._shouldScan) {
                // Stop scanning.
                return;
            }
            if ($this._localMediaStream) {

                // There is difference in size of rendered video and one that is
                // considered by the canvas. Need to account for scaling factor.
                const videoElement = $this._videoElement;
                const widthRatio
                    = videoElement.videoWidth / videoElement.clientWidth;
                const heightRatio
                    = videoElement.videoHeight / videoElement.clientHeight;
                const sWidthOffset = $this._qrRegion.width * widthRatio;
                const sHeightOffset = $this._qrRegion.height * heightRatio;
                const sxOffset = $this._qrRegion.x * widthRatio;
                const syOffset = $this._qrRegion.y * heightRatio;

                // Only decode the relevant area, ignore the shaded area,
                // More reference:
                // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
                $this._context.drawImage(
                    $this._videoElement,
                    /* sx= */ sxOffset,
                    /* sy= */ syOffset,
                    /* sWidth= */ sWidthOffset,
                    /* sHeight= */ sHeightOffset,
                    /* dx= */ 0,
                    /* dy= */  0,
                    /* dWidth= */ $this._qrRegion.width,
                    /* dHeight= */ $this._qrRegion.height);

                    // Try scanning normal frame and in case of failure, scan
                    // the inverted context if not explictly disabled.
                    // TODO(mebjas): Move this logic to qrcode.js
                    if (!scanContext() && config.disableFlip !== true) {
                        // scan inverted context.
                        this._context.translate(this._context.canvas.width, 0);
                        this._context.scale(-1, 1);
                        scanContext();
                    }
            }
            $this._foreverScanTimeout = setTimeout(
                foreverScan, Html5Qrcode._getTimeoutFps(config.fps));
        }

        // success callback when user media (Camera) is attached.
        const onMediaStreamReceived = mediaStream => {
            return new Promise((resolve, reject) => {
                const setupVideo = () => {
                    const videoElement = this._createVideoElement(width);
                    $this._element.append(videoElement);
                    // Attach listeners to video.
                    videoElement.onabort = reject;
                    videoElement.onerror = reject;
                    videoElement.onplaying = () => {
                        const videoWidth = videoElement.clientWidth;
                        const videoHeight = videoElement.clientHeight;
                        setupUi(videoWidth, videoHeight);

                        // start scanning after video feed has started
                        foreverScan();
                        resolve();
                    }

                    videoElement.srcObject = mediaStream;
                    videoElement.play();

                    // Set state
                    $this._videoElement = videoElement;
                }

                $this._localMediaStream = mediaStream;
                // If videoConstraints is passed, ignore all other configs.
                if (videoConstraintsEnabled || !config.aspectRatio) {
                    setupVideo();
                } else {
                    const constraints = {
                        aspectRatio : config.aspectRatio
                    }
                    const track = mediaStream.getVideoTracks()[0];
                    track.applyConstraints(constraints)
                        .then(_ => setupVideo())
                        .catch(error => {
                            // TODO(mebjas): Migrate to common logging.
                            console.log(
                                "[Warning] [Html5Qrcode] Constriants could not "
                                    + "be satisfied, ignoring constraints",
                                error);
                            setupVideo();
                        });
                }
            });
        }
        //#endregion

        return new Promise((resolve, reject) => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Ignore all other video constraints if the videoConstraints
                // is passed.
                const videoConstraints = videoConstraintsEnabled
                    ? config.videoConstraints
                    : $this._createVideoConstraints(cameraIdOrConfig);
                navigator.mediaDevices.getUserMedia(
                    {
                        audio: false,
                        video: videoConstraints
                    }).then(stream => {
                        onMediaStreamReceived(stream)
                            .then(_ => {
                                $this._isScanning = true;
                                resolve();
                            })
                            .catch(reject);
                    })
                    .catch(err => {
                        reject(`Error getting userMedia, error = ${err}`);
                    });
            } else if (navigator.getUserMedia) {
                if (typeof cameraIdOrConfig != "string") {
                    throw "The device doesn't support navigator.mediaDevices"
                        + ", only supported cameraIdOrConfig in this case is"
                        + " deviceId parameter (string)."
                }
                const getCameraConfig = {
                    video: {
                        optional: [{
                            sourceId: cameraIdOrConfig
                        }]
                    }
                };
                navigator.getUserMedia(getCameraConfig,
                    stream => {
                        onMediaStreamReceived(stream)
                            .then(_ => {
                                $this._isScanning = true;
                                resolve();
                            })
                            .catch(reject);
                    }, err => {
                        reject(`Error getting userMedia, error = ${err}`);
                    });
            } else {
                reject("Web camera streaming not supported by the browser.");
            }
        });
    }

    /**
     * Stops streaming QR Code video and scanning.
     *
     * @returns Promise for safely closing the video stream.
     */
    stop() {
        // TODO(mebjas): fail fast if the start() wasn't called.
        this._shouldScan = false;
        clearTimeout(this._foreverScanTimeout);

        const $this = this;
        return new Promise((resolve, /* ignore */ reject) => {
            $this.qrcode.callback = null;
            const tracksToClose
                = $this._localMediaStream.getVideoTracks().length;
            var tracksClosed = 0;

            // Removes the shaded region if exists.
            const removeQrRegion = () => {
                while ($this._element.getElementsByClassName(
                    Html5Qrcode.SHADED_REGION_CLASSNAME).length) {
                    const shadedChild = $this._element.getElementsByClassName(
                        Html5Qrcode.SHADED_REGION_CLASSNAME)[0];
                    $this._element.removeChild(shadedChild);
                }
            }

            const onAllTracksClosed = () => {
                $this._localMediaStream = null;
                $this._element.removeChild($this._videoElement);
                $this._element.removeChild($this._canvasElement);
                removeQrRegion();
                $this._isScanning = false;
                if ($this._qrRegion) {
                    $this._qrRegion = null;
                }
                if ($this._context) {
                    $this._context = null;
                }
                resolve(true);
            }

            $this._localMediaStream.getVideoTracks().forEach(videoTrack => {
                videoTrack.stop();
                ++tracksClosed;

                if (tracksClosed >= tracksToClose) {
                    onAllTracksClosed();
                }
            });
        });
    }

    /**
     * Scans an Image File for QR Code.
     *
     * This feature is mutually exclusive to camera based scanning, you should
     * call stop() if the camera based scanning was ongoing.
     *
     * @param {File} imageFile a local file with Image content.
     * @param {boolean} showImage if true the Image will be rendered on given
     * element.
     *
     * @returns Promise with decoded QR code string on success and error message
      *             on failure. Failure could happen due to different reasons:
     *            1. QR Code decode failed because enough patterns not found in
      *                 image.
     *            2. Input file was not image or unable to load the image or
      *                 other image load errors.
     */
    scanFile(imageFile, /* default=true */ showImage) {
        const $this = this;
        if (!imageFile || !(imageFile instanceof File)) {
            throw "imageFile argument is mandatory and should be instance "
            + "of File. Use 'event.target.files[0]'";
        }

        showImage = showImage === undefined ? true : showImage;

        if ($this._isScanning) {
            throw "Close ongoing scan before scanning a file.";
        }

        const computeCanvasDrawConfig = (
            imageWidth,
            imageHeight,
            containerWidth,
            containerHeight) => {

            if (imageWidth <= containerWidth
                && imageHeight <= containerHeight) {
                // no downsampling needed.
                const xoffset = (containerWidth - imageWidth) / 2;
                const yoffset = (containerHeight - imageHeight) / 2;
                return {
                    x: xoffset,
                    y: yoffset,
                    width: imageWidth,
                    height: imageHeight
                };
            } else {
                const formerImageWidth = imageWidth;
                const formerImageHeight = imageHeight;
                if (imageWidth > containerWidth) {
                    imageHeight = (containerWidth / imageWidth) * imageHeight;
                    imageWidth = containerWidth;
                }

                if (imageHeight > containerHeight) {
                    imageWidth = (containerHeight / imageHeight) * imageWidth;
                    imageHeight = containerHeight;
                }

                Html5Qrcode._log(
                    "Image downsampled from "
                    + `${formerImageWidth}X${formerImageHeight}`
                    + ` to ${imageWidth}X${imageHeight}.`);

                return computeCanvasDrawConfig(
                    imageWidth, imageHeight, containerWidth, containerHeight);
            }
        }

        return new Promise((resolve, reject) => {
            $this._possiblyCloseLastScanImageFile();
            $this._clearElement();
            $this._lastScanImageFile = imageFile;

            const inputImage = new Image;
            inputImage.onload = () => {
                const imageWidth = inputImage.width;
                const imageHeight = inputImage.height;
                const element = document.getElementById($this._elementId);
                const containerWidth = element.clientWidth
                    ? element.clientWidth : Html5Qrcode.DEFAULT_WIDTH;
                // No default height anymore.
                const containerHeight =  Math.max(
                    element.clientHeight ? element.clientHeight : imageHeight,
                    Html5Qrcode.FILE_SCAN_MIN_HEIGHT);

                const config = computeCanvasDrawConfig(
                    imageWidth, imageHeight, containerWidth, containerHeight);
                if (showImage) {
                    const visibleCanvas = $this._createCanvasElement(
                        containerWidth, containerHeight, 'qr-canvas-visible');
                    visibleCanvas.style.display = "inline-block";
                    element.appendChild(visibleCanvas);
                    const context = visibleCanvas.getContext('2d');
                    context.canvas.width = containerWidth;
                    context.canvas.height = containerHeight;
                    // More reference
                    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
                    context.drawImage(
                        inputImage,
                        /* sx= */ 0,
                        /* sy= */ 0,
                        /* sWidth= */ imageWidth,
                        /* sHeight= */ imageHeight,
                        /* dx= */ config.x,
                        /* dy= */  config.y,
                        /* dWidth= */ config.width,
                        /* dHeight= */ config.height);
                }

                const hiddenCanvas = $this._createCanvasElement(config.width, config.height);
                element.appendChild(hiddenCanvas);
                const context = hiddenCanvas.getContext('2d');
                context.canvas.width = config.width;
                context.canvas.height = config.height;
                context.drawImage(
                    inputImage,
                    /* sx= */ 0,
                    /* sy= */ 0,
                    /* sWidth= */ imageWidth,
                    /* sHeight= */ imageHeight,
                    /* dx= */ 0,
                    /* dy= */  0,
                    /* dWidth= */ config.width,
                    /* dHeight= */ config.height);
                try {
                    resolve($this.qrcode.decode());
                } catch (exception) {
                    reject(`QR code parse error, error = ${exception}`);
                }
            }

            inputImage.onerror = reject;
            inputImage.onabort = reject;
            inputImage.onstalled = reject;
            inputImage.onsuspend = reject;
            inputImage.src = URL.createObjectURL(imageFile);
        });
    }

    /**
     * Clears the existing canvas.
     *
     * Note: in case of ongoing web cam based scan, it needs to be explicitly
     * closed before calling this method, else it will throw exception.
     */
    clear() {
        this._clearElement();
    }

    /**
     * Returns a Promise with list of all cameras supported by the device.
     *
     * The returned object is a list of result object of type:
     * [{
     *      id: String;     // Id of the camera.
     *      label: String;  // Human readable name of the camera.
     * }]
     */
    static getCameras() {
        return new Promise((resolve, reject) => {
            if (navigator.mediaDevices
                && navigator.mediaDevices.enumerateDevices
                && navigator.mediaDevices.getUserMedia) {
                this._log("navigator.mediaDevices used");
                navigator.mediaDevices.getUserMedia(
                    { audio: false, video: true })
                    .then(stream => {
                        // hacky approach to close any active stream if they are
                        // active.
                        stream.oninactive
                            = _ => this._log("All streams closed");
                        const closeActiveStreams = stream => {
                            const tracks = stream.getVideoTracks();
                            for (var i = 0; i < tracks.length; i++) {
                                const track = tracks[i];
                                track.enabled = false;
                                track.stop();
                                stream.removeTrack(track);
                            }
                        }

                        navigator.mediaDevices.enumerateDevices()
                            .then(devices => {
                                const results = [];
                                for (var i = 0; i < devices.length; i++) {
                                    const device = devices[i];
                                    if (device.kind == "videoinput") {
                                        results.push({
                                            id: device.deviceId,
                                            label: device.label
                                        });
                                    }
                                }
                                this._log(`${results.length} results found`);
                                closeActiveStreams(stream);
                                resolve(results);
                            })
                            .catch(err => {
                                reject(`${err.name} : ${err.message}`);
                            });
                    })
                    .catch(err => {
                        reject(`${err.name} : ${err.message}`);
                    })
            } else if (MediaStreamTrack && MediaStreamTrack.getSources) {
                this._log("MediaStreamTrack.getSources used");
                const callback = sourceInfos => {
                    const results = [];
                    for (var i = 0; i !== sourceInfos.length; ++i) {
                        const sourceInfo = sourceInfos[i];
                        if (sourceInfo.kind === 'video') {
                            results.push({
                                id: sourceInfo.id,
                                label: sourceInfo.label
                            });
                        }
                    }
                    this._log(`${results.length} results found`);
                    resolve(results);
                }
                MediaStreamTrack.getSources(callback);
            } else {
                this._log("unable to query supported devices.");
                reject("unable to query supported devices.");
            }
        });
    }

    /**
     * Returns the capabilities of the running video track.
     *
     * @beta This is an experimental API
     * @returns the capabilities of a running video track.
     * @throws error if the scanning is not in running state.
     */
    getRunningTrackCapabilities() {
        if (this._localMediaStream == null) {
            throw "Scanning is not in running state, call this API only when"
                + " QR code scanning using camera is in running state.";
        }

        if (this._localMediaStream.getVideoTracks().length == 0) {
            throw "No video tracks found";
        }

        const videoTrack = this._localMediaStream.getVideoTracks()[0];
        return videoTrack.getCapabilities();
    }

    /**
     * Apply a video constraints on running video track from camera.
     *
     * Important:
     *  1. Must be called only if the camera based scanning is in progress.
     *  2. Changing aspectRatio while scanner is running is not yet supported.
     *
     * @beta This is an experimental API
     * @param {MediaTrackConstraints} specifies a variety of video or camera
     *  controls as defined in
     *  https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints
     * @returns a Promise which succeeds if the passed constraints are applied,
     *  fails otherwise.
     * @throws error if the scanning is not in running state.
     */
    applyVideoConstraints(videoConstaints) {
        if (!videoConstaints) {
            throw "videoConstaints is required argument.";
        } else if (!this._isMediaStreamConstraintsValid(videoConstaints)) {
            throw "invalid videoConstaints passed, check logs for more details";
        }

        if (this._localMediaStream == null) {
            throw "Scanning is not in running state, call this API only when"
                + " QR code scanning using camera is in running state.";
        }

        if (this._localMediaStream.getVideoTracks().length == 0) {
            throw "No video tracks found";
        }

        return new Promise((resolve, reject) => {
            if ("aspectRatio" in videoConstaints) {
                reject("Chaning 'aspectRatio' in run-time is not yet "
                    + "supported.");
                return;
            }
            const videoTrack = this._localMediaStream.getVideoTracks()[0];
            // TODO(mebjas): This can be simplified to just return the promise
            // directly.
            videoTrack.applyConstraints(videoConstaints)
                .then(_ => {
                    resolve(_);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    _clearElement() {
        if (this._isScanning) {
            throw 'Cannot clear while scan is ongoing, close it first.';
        }
        const element = document.getElementById(this._elementId);
        element.innerHTML = "";
    }

    _createCanvasElement(width, height, customId) {
        const canvasWidth = width;
        const canvasHeight = height;
        const canvasElement = document.createElement('canvas');
        canvasElement.style.width = `${canvasWidth}px`;
        canvasElement.style.height = `${canvasHeight}px`;
        canvasElement.style.display = "none";
        // This id is set by lazarsoft/jsqrcode
        canvasElement.id = customId == undefined ? 'qr-canvas' : customId;
        return canvasElement;
    }

    _createVideoElement(width) {
        const videoElement = document.createElement('video');
        videoElement.style.width = `${width}px`;
        videoElement.muted = true;
        videoElement.playsInline = true;
        return videoElement;
    }

    _getShadedRegionBounds(width, height, qrboxSize) {
        if (qrboxSize > width || qrboxSize > height) {
            throw "'config.qrbox' should not be greater than the "
            + "width and height of the HTML element.";
        }

        return {
            x: (width - qrboxSize) / 2,
            y: (height - qrboxSize) / 2,
            width: qrboxSize,
            height: qrboxSize
        };
    }

    _possiblyInsertShadingElement(element, width, height, qrboxSize) {
      if ((width - qrboxSize) < 1 || (height - qrboxSize) < 1) {
        return;
      }
      const shadingElement = document.createElement('div');
      shadingElement.style.position = "absolute";
      shadingElement.style.borderLeft = `${(width-qrboxSize)/2}px solid #0000007a`;
      shadingElement.style.borderRight = `${(width-qrboxSize)/2}px solid #0000007a`;
      shadingElement.style.borderTop = `${(height-qrboxSize)/2}px solid #0000007a`;
      shadingElement.style.borderBottom = `${(height-qrboxSize)/2}px solid #0000007a`;
      shadingElement.style.boxSizing = "border-box";
      shadingElement.style.top = "0px";
      shadingElement.style.bottom = "0px";
      shadingElement.style.left = "0px";
      shadingElement.style.right = "0px";
      shadingElement.id = `${Html5Qrcode.SHADED_REGION_CLASSNAME}`;

      // Check if div is too small for shadows. As there are two 5px width borders the needs to have a size above 10px.
      if ((width - qrboxSize) < 11 || (height - qrboxSize) < 11) {
        this.hasBorderShaders = false;
      } else {
        const smallSize = 5;
        const largeSize = 40;
        this._insertShaderBorders(shadingElement, largeSize, smallSize, -smallSize, 0, true);
        this._insertShaderBorders(shadingElement, largeSize, smallSize, -smallSize, 0, false);
        this._insertShaderBorders(shadingElement, largeSize, smallSize, qrboxSize+smallSize, 0, true);
        this._insertShaderBorders(shadingElement, largeSize, smallSize, qrboxSize+smallSize, 0, false);
        this._insertShaderBorders(shadingElement, smallSize, largeSize+smallSize, -smallSize, -smallSize, true);
        this._insertShaderBorders(shadingElement, smallSize, largeSize+smallSize, qrboxSize+smallSize-largeSize, -smallSize, true);
        this._insertShaderBorders(shadingElement, smallSize, largeSize+smallSize, -smallSize, -smallSize, false);
        this._insertShaderBorders(shadingElement, smallSize, largeSize+smallSize, qrboxSize+smallSize-largeSize, -smallSize, false);
        this.hasBorderShaders = true;
      }
      element.append(shadingElement);

    }

    _insertShaderBorders(shaderElem, width, height, top, side, isLeft) {
        const elem = document.createElement("div");
        elem.style.position = "absolute";
        elem.style.backgroundColor = Html5Qrcode.BORDER_SHADER_DEFAULT_COLOR;
        elem.style.width = `${width}px`;
        elem.style.height = `${height}px`;
        elem.style.top = `${top}px`;
        if (isLeft) {
          elem.style.left = `${side}px`;
        } else {
          elem.style.right = `${side}px`;
        }
        if (!this.borderShaders) {
          this.borderShaders = [];
        }
        this.borderShaders.push(elem);
        shaderElem.appendChild(elem);
    }

    _possiblyUpdateShaders(qrMatch) {
        if (this.qrMatch === qrMatch) {
            return;
        }

        if (this.hasBorderShaders
            && this.borderShaders
            && this.borderShaders.length) {
            this.borderShaders.forEach(shader => {
                shader.style.backgroundColor = qrMatch
                    ? Html5Qrcode.BORDER_SHADER_MATCH_COLOR
                    : Html5Qrcode.BORDER_SHADER_DEFAULT_COLOR;
            });
        }
        this.qrMatch = qrMatch;
    }

    _possiblyCloseLastScanImageFile() {
        if (this._lastScanImageFile) {
            URL.revokeObjectURL(this._lastScanImageFile);
            this._lastScanImageFile = null;
        }
    }

    //#region private method to create correct camera selection filter.
    _createVideoConstraints(cameraIdOrConfig) {
        if (typeof cameraIdOrConfig == "string") {
            // If it's a string it should be camera device Id.
            return { deviceId: { exact: cameraIdOrConfig } };
        } else if (typeof cameraIdOrConfig == "object") {
            const facingModeKey = "facingMode";
            const deviceIdKey = "deviceId";
            const allowedFacingModeValues
                = { "user" : true, "environment" : true};
            const exactKey = "exact";
            const isValidFacingModeValue = value => {
                if (value in allowedFacingModeValues) {
                    // Valid config
                    return true;
                } else {
                    // Invalid config
                    throw "config has invalid 'facingMode' value = "
                        + `'${value}'`;
                }
            };

            const keys = Object.keys(cameraIdOrConfig);
            if (keys.length != 1) {
                throw "'cameraIdOrConfig' object should have exactly 1 key,"
                    + ` if passed as an object, found ${keys.length} keys`;
            }

            const key = Object.keys(cameraIdOrConfig)[0];
            if (key != facingModeKey && key != deviceIdKey) {
                throw `Only '${facingModeKey}' and '${deviceIdKey}' `
                    + " are supported for 'cameraIdOrConfig'";
            }

            if (key == facingModeKey) {
                /**
                 * Supported scenarios:
                 * - { facingMode: "user" }
                 * - { facingMode: "environment" }
                 * - { facingMode: { exact: "environment" } }
                 * - { facingMode: { exact: "user" } }
                 */
                const facingMode = cameraIdOrConfig[key];
                if (typeof facingMode == "string") {
                    if (isValidFacingModeValue(facingMode)) {
                        return { facingMode: facingMode };
                    }
                } else if (typeof facingMode == "object") {
                    if (exactKey in facingMode) {
                        if (isValidFacingModeValue(facingMode[exactKey])) {
                                return {
                                    facingMode: {
                                        exact: facingMode[exactKey]
                                    }
                                };
                        }
                    } else {
                        throw "'facingMode' should be string or object with"
                            + ` ${exactKey} as key.`;
                    }
                } else {
                    const type = (typeof facingMode);
                    throw `Invalid type of 'facingMode' = ${type}`;
                }
            } else {
                /**
                 * key == deviceIdKey; Supported scenarios:
                 * - { deviceId: { exact: "a76afe74e95e3.....38627b3bde" }
                 * - { deviceId: "a76afe74e95e3....065c9cd89438627b3bde" }
                 */
                const deviceId = cameraIdOrConfig[key];
                if (typeof deviceId == "string") {
                    return { deviceId: deviceId };
                } else if (typeof deviceId == "object") {
                    if (exactKey in deviceId) {
                        return {
                            deviceId : { exact: deviceId[exactKey] }
                        };
                    } else {
                        throw "'deviceId' should be string or object with"
                            + ` ${exactKey} as key.`;
                    }
                } else {
                    const type = (typeof deviceId);
                    throw `Invalid type of 'deviceId' = ${type}`;
                }
            }
        } else {
            // invalid type
            const type = (typeof cameraIdOrConfig);
            throw `Invalid type of 'cameraIdOrConfig' = ${type}`;
        }
    }
    //#endregion

    //#region private method to check for valid videoConstraints
    _isMediaStreamConstraintsValid(videoConstraints) {
        if (!videoConstraints) {
            Html5Qrcode._logError(
                "Empty videoConstraints", /* experimental= */ true);
            return false;
        }

        if (typeof videoConstraints !== "object") {
            const typeofVideoConstraints = typeof videoConstraints;
            Html5Qrcode._logError(
                "videoConstraints should be of type object, the "
                    + `object passed is of type ${typeofVideoConstraints}.`,
                /* experimental= */ true);
            return false;
        }
        // TODO(mebjas): Make this validity check more sophisticuated
        // Following keys are audio controls, audio controls are not supported.
        const bannedKeys = [
            "autoGainControl",
            "channelCount",
            "echoCancellation",
            "latency",
            "noiseSuppression",
            "sampleRate",
            "sampleSize",
            "volume"
        ];
        const bannedkeysSet = new Set(bannedKeys);
        const keysInVideoConstraints = Object.keys(videoConstraints);
        for (let i = 0; i < keysInVideoConstraints.length; i++) {
            const key = keysInVideoConstraints[i];
            if (bannedkeysSet.has(key)) {
                Html5Qrcode._logError(
                    `${key} is not supported videoConstaints.`,
                    /* experimental= */ true);
                return false;
            }
        }

        return true;
    }
    //#endregion

    static _getTimeoutFps(fps) {
        return 1000 / fps;
    }

    static _log(message) {
        if (Html5Qrcode.VERBOSE) {
            console.log(message);
        }
    }

    static _logError(message, experimental) {
        if (Html5Qrcode.VERBOSE || experimental === true) {
            console.error(message);
        }
    }
}
