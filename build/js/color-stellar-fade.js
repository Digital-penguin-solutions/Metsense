!function(t){function e(e){return t(e).filter(function(){return t(this).is(":appeared")})}function i(){r=!1;for(var t=0,i=n.length;t<i;t++){var s=e(n[t]);if(s.trigger("appear",[s]),f[t]){var o=f[t].not(s);o.trigger("disappear",[o])}f[t]=s}}function s(t){n.push(t),f.push()}var n=[],o=!1,r=!1,a={interval:250,force_process:!1},l=t(window),f=[];t.expr[":"].appeared=function(e){var i=t(e);if(!i.is(":visible"))return!1;var s=l.scrollLeft(),n=l.scrollTop(),o=i.offset(),r=o.left,a=o.top;return a+i.height()>=n&&a-(i.data("appear-top-offset")||0)<=n+l.height()&&r+i.width()>=s&&r-(i.data("appear-left-offset")||0)<=s+l.width()},t.fn.extend({appear:function(e){var n=t.extend({},a,e||{}),l=this.selector||this;if(!o){var f=function(){r||(r=!0,setTimeout(i,n.interval))};t(window).scroll(f).resize(f),o=!0}return n.force_process&&setTimeout(i,n.interval),s(l),t(l)}}),t.extend({force_appear:function(){return!!o&&(i(),!0)}})}(function(){return"undefined"!=typeof module?require("jquery"):jQuery}()),$(document).ready(function(){$(".slide-in").css("visibility","visible"),jQuery.fx.interval=100;$("body").width()>992&&($(".slide-in").appear(),$(".slide-in").addClass("has-not-slided"),$(".slide-in").css("opacity","0"),$(".slide-in").css("position","relative"),$(".slide-in").css("top","1px"),jQuery.each($(".slide-in"),function(t,e){var i=$(this).width();$(this).hasClass("slide-in-left")?$(this).css("right",i-1+"px"):$(this).css("left",i-1+"px")}),$("body").on("appear",".slide-in",function(t,e){var i=$(this);if($(this).hasClass("has-not-slided")){var s=0;$(this).hasClass("slide-delay-1")?s=500:$(this).hasClass("slide-delay-2")?s=1e3:$(this).hasClass("slide-delay-3")?s=1500:$(this).hasClass("slide-delay-4")&&(s=2e3),setTimeout(function(){i.removeClass("has-not-slided"),i.animate({opacity:"1"},{duration:500,queue:!1}),i.hasClass("slide-in-left")?i.animate({right:"0px"},{duration:1e3,queue:!1}):i.animate({left:"0px"},{duration:1e3,queue:!1})},s)}}),$.force_appear())}),$(document).ready(function(){$(".fade-in").css("visibility","visible"),jQuery.fx.interval=100;$("body").width()>992&&($(".fade-in").appear(),$(".fade-in").addClass("has-not-faded"),$(".fade-in").css("opacity","0"),$(".fade-in").css("position","relative"),$(".fade-in").css("top","20px"),$("body").on("appear",".fade-in",function(t,e){var i=$(this);if($(this).hasClass("has-not-faded")){var s=0;$(this).hasClass("fade-delay-05")?s=250:$(this).hasClass("fade-delay-1")?s=500:$(this).hasClass("fade-delay-2")?s=1e3:$(this).hasClass("fade-delay-3")?s=1500:$(this).hasClass("fade-delay-4")&&(s=2e3),setTimeout(function(){i.removeClass("has-not-faded"),i.animate({opacity:"1"},{duration:1e3,queue:!1}),i.animate({top:"0px"},{duration:500,queue:!1})},s)}}),$.force_appear(),setTimeout(function(){$.force_appear()},100))}),function(t,e,i,s){function n(e,i){this.element=e,this.options=t.extend({},r,i),this._defaults=r,this._name=o,this.init()}var o="stellar",r={scrollProperty:"scroll",positionProperty:"position",horizontalScrolling:!0,verticalScrolling:!0,horizontalOffset:0,verticalOffset:0,responsive:!1,parallaxBackgrounds:!0,parallaxElements:!0,hideDistantElements:!0,hideElement:function(t){t.hide()},showElement:function(t){t.show()}},a={scroll:{getLeft:function(t){return t.scrollLeft()},setLeft:function(t,e){t.scrollLeft(e)},getTop:function(t){return t.scrollTop()},setTop:function(t,e){t.scrollTop(e)}},position:{getLeft:function(t){return parseInt(t.css("left"),10)*-1},getTop:function(t){return parseInt(t.css("top"),10)*-1}},margin:{getLeft:function(t){return parseInt(t.css("margin-left"),10)*-1},getTop:function(t){return parseInt(t.css("margin-top"),10)*-1}},transform:{getLeft:function(t){var e=getComputedStyle(t[0])[c];return"none"!==e?parseInt(e.match(/(-?[0-9]+)/g)[4],10)*-1:0},getTop:function(t){var e=getComputedStyle(t[0])[c];return"none"!==e?parseInt(e.match(/(-?[0-9]+)/g)[5],10)*-1:0}}},l={position:{setLeft:function(t,e){t.css("left",e)},setTop:function(t,e){t.css("top",e)}},transform:{setPosition:function(t,e,i,s,n){t[0].style[c]="translate3d("+(e-i)+"px, "+(s-n)+"px, 0)"}}},f=function(){var e,i=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,s=t("script")[0].style,n="";for(e in s)if(i.test(e)){n=e.match(i)[0];break}return"WebkitOpacity"in s&&(n="Webkit"),"KhtmlOpacity"in s&&(n="Khtml"),function(t){return n+(n.length>0?t.charAt(0).toUpperCase()+t.slice(1):t)}}(),c=f("transform"),p=t("<div />",{style:"background:#fff"}).css("background-position-x")!==s,h=p?function(t,e,i){t.css({"background-position-x":e,"background-position-y":i})}:function(t,e,i){t.css("background-position",e+" "+i)},u=p?function(t){return[t.css("background-position-x"),t.css("background-position-y")]}:function(t){return t.css("background-position").split(" ")},d=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(t){setTimeout(t,1e3/60)};n.prototype={init:function(){this.options.name=o+"_"+Math.floor(1e9*Math.random()),this._defineElements(),this._defineGetters(),this._defineSetters(),this._handleWindowLoadAndResize(),this._detectViewport(),this.refresh({firstLoad:!0}),"scroll"===this.options.scrollProperty?this._handleScrollEvent():this._startAnimationLoop()},_defineElements:function(){this.element===i.body&&(this.element=e),this.$scrollElement=t(this.element),this.$element=this.element===e?t("body"):this.$scrollElement,this.$viewportElement=this.options.viewportElement!==s?t(this.options.viewportElement):this.$scrollElement[0]===e||"scroll"===this.options.scrollProperty?this.$scrollElement:this.$scrollElement.parent()},_defineGetters:function(){var t=this,e=a[t.options.scrollProperty];this._getScrollLeft=function(){return e.getLeft(t.$scrollElement)},this._getScrollTop=function(){return e.getTop(t.$scrollElement)}},_defineSetters:function(){var e=this,i=a[e.options.scrollProperty],s=l[e.options.positionProperty],n=i.setLeft,o=i.setTop;this._setScrollLeft="function"==typeof n?function(t){n(e.$scrollElement,t)}:t.noop,this._setScrollTop="function"==typeof o?function(t){o(e.$scrollElement,t)}:t.noop,this._setPosition=s.setPosition||function(t,i,n,o,r){e.options.horizontalScrolling&&s.setLeft(t,i,n),e.options.verticalScrolling&&s.setTop(t,o,r)}},_handleWindowLoadAndResize:function(){var i=this,s=t(e);i.options.responsive&&s.bind("load."+this.name,function(){i.refresh()}),s.bind("resize."+this.name,function(){i._detectViewport(),i.options.responsive&&i.refresh()})},refresh:function(i){var s=this,n=s._getScrollLeft(),o=s._getScrollTop();i&&i.firstLoad||this._reset(),this._setScrollLeft(0),this._setScrollTop(0),this._setOffsets(),this._findParticles(),this._findBackgrounds(),i&&i.firstLoad&&/WebKit/.test(navigator.userAgent)&&t(e).load(function(){var t=s._getScrollLeft(),e=s._getScrollTop();s._setScrollLeft(t+1),s._setScrollTop(e+1),s._setScrollLeft(t),s._setScrollTop(e)}),this._setScrollLeft(n),this._setScrollTop(o)},_detectViewport:function(){var t=this.$viewportElement.offset(),e=null!==t&&t!==s;this.viewportWidth=this.$viewportElement.width(),this.viewportHeight=this.$viewportElement.height(),this.viewportOffsetTop=e?t.top:0,this.viewportOffsetLeft=e?t.left:0},_findParticles:function(){var e=this;if(this._getScrollLeft(),this._getScrollTop(),this.particles!==s)for(var i=this.particles.length-1;i>=0;i--)this.particles[i].$element.data("stellar-elementIsActive",s);this.particles=[],this.options.parallaxElements&&this.$element.find("[data-stellar-ratio]").each(function(i){var n,o,r,a,l,f,c,p,h,u=t(this),d=0,g=0,m=0,v=0;if(u.data("stellar-elementIsActive")){if(u.data("stellar-elementIsActive")!==this)return}else u.data("stellar-elementIsActive",this);e.options.showElement(u),u.data("stellar-startingLeft")?(u.css("left",u.data("stellar-startingLeft")),u.css("top",u.data("stellar-startingTop"))):(u.data("stellar-startingLeft",u.css("left")),u.data("stellar-startingTop",u.css("top"))),r=u.position().left,a=u.position().top,l="auto"===u.css("margin-left")?0:parseInt(u.css("margin-left"),10),f="auto"===u.css("margin-top")?0:parseInt(u.css("margin-top"),10),p=u.offset().left-l,h=u.offset().top-f,u.parents().each(function(){var e=t(this);return e.data("stellar-offset-parent")===!0?(d=m,g=v,c=e,!1):(m+=e.position().left,void(v+=e.position().top))}),n=u.data("stellar-horizontal-offset")!==s?u.data("stellar-horizontal-offset"):c!==s&&c.data("stellar-horizontal-offset")!==s?c.data("stellar-horizontal-offset"):e.horizontalOffset,o=u.data("stellar-vertical-offset")!==s?u.data("stellar-vertical-offset"):c!==s&&c.data("stellar-vertical-offset")!==s?c.data("stellar-vertical-offset"):e.verticalOffset,e.particles.push({$element:u,$offsetParent:c,isFixed:"fixed"===u.css("position"),horizontalOffset:n,verticalOffset:o,startingPositionLeft:r,startingPositionTop:a,startingOffsetLeft:p,startingOffsetTop:h,parentOffsetLeft:d,parentOffsetTop:g,stellarRatio:u.data("stellar-ratio")!==s?u.data("stellar-ratio"):1,width:u.outerWidth(!0),height:u.outerHeight(!0),isHidden:!1})})},_findBackgrounds:function(){var e,i=this,n=this._getScrollLeft(),o=this._getScrollTop();this.backgrounds=[],this.options.parallaxBackgrounds&&(e=this.$element.find("[data-stellar-background-ratio]"),this.$element.data("stellar-background-ratio")&&(e=e.add(this.$element)),e.each(function(){var e,r,a,l,f,c,p,d=t(this),g=u(d),m=0,v=0,b=0,y=0;if(d.data("stellar-backgroundIsActive")){if(d.data("stellar-backgroundIsActive")!==this)return}else d.data("stellar-backgroundIsActive",this);d.data("stellar-backgroundStartingLeft")?h(d,d.data("stellar-backgroundStartingLeft"),d.data("stellar-backgroundStartingTop")):(d.data("stellar-backgroundStartingLeft",g[0]),d.data("stellar-backgroundStartingTop",g[1])),a="auto"===d.css("margin-left")?0:parseInt(d.css("margin-left"),10),l="auto"===d.css("margin-top")?0:parseInt(d.css("margin-top"),10),f=d.offset().left-a-n,c=d.offset().top-l-o,d.parents().each(function(){var e=t(this);return e.data("stellar-offset-parent")===!0?(m=b,v=y,p=e,!1):(b+=e.position().left,void(y+=e.position().top))}),e=d.data("stellar-horizontal-offset")!==s?d.data("stellar-horizontal-offset"):p!==s&&p.data("stellar-horizontal-offset")!==s?p.data("stellar-horizontal-offset"):i.horizontalOffset,r=d.data("stellar-vertical-offset")!==s?d.data("stellar-vertical-offset"):p!==s&&p.data("stellar-vertical-offset")!==s?p.data("stellar-vertical-offset"):i.verticalOffset,i.backgrounds.push({$element:d,$offsetParent:p,isFixed:"fixed"===d.css("background-attachment"),horizontalOffset:e,verticalOffset:r,startingValueLeft:g[0],startingValueTop:g[1],startingBackgroundPositionLeft:isNaN(parseInt(g[0],10))?0:parseInt(g[0],10),startingBackgroundPositionTop:isNaN(parseInt(g[1],10))?0:parseInt(g[1],10),startingPositionLeft:d.position().left,startingPositionTop:d.position().top,startingOffsetLeft:f,startingOffsetTop:c,parentOffsetLeft:m,parentOffsetTop:v,stellarRatio:d.data("stellar-background-ratio")===s?1:d.data("stellar-background-ratio")})}))},_reset:function(){var t,e,i,s,n;for(n=this.particles.length-1;n>=0;n--)t=this.particles[n],e=t.$element.data("stellar-startingLeft"),i=t.$element.data("stellar-startingTop"),this._setPosition(t.$element,e,e,i,i),this.options.showElement(t.$element),t.$element.data("stellar-startingLeft",null).data("stellar-elementIsActive",null).data("stellar-backgroundIsActive",null);for(n=this.backgrounds.length-1;n>=0;n--)s=this.backgrounds[n],s.$element.data("stellar-backgroundStartingLeft",null).data("stellar-backgroundStartingTop",null),h(s.$element,s.startingValueLeft,s.startingValueTop)},destroy:function(){this._reset(),this.$scrollElement.unbind("resize."+this.name).unbind("scroll."+this.name),this._animationLoop=t.noop,t(e).unbind("load."+this.name).unbind("resize."+this.name)},_setOffsets:function(){var i=this,s=t(e);s.unbind("resize.horizontal-"+this.name).unbind("resize.vertical-"+this.name),"function"==typeof this.options.horizontalOffset?(this.horizontalOffset=this.options.horizontalOffset(),s.bind("resize.horizontal-"+this.name,function(){i.horizontalOffset=i.options.horizontalOffset()})):this.horizontalOffset=this.options.horizontalOffset,"function"==typeof this.options.verticalOffset?(this.verticalOffset=this.options.verticalOffset(),s.bind("resize.vertical-"+this.name,function(){i.verticalOffset=i.options.verticalOffset()})):this.verticalOffset=this.options.verticalOffset},_repositionElements:function(){var t,e,i,s,n,o,r,a,l,f,c=this._getScrollLeft(),p=this._getScrollTop(),u=!0,d=!0;if(this.currentScrollLeft!==c||this.currentScrollTop!==p||this.currentWidth!==this.viewportWidth||this.currentHeight!==this.viewportHeight){for(this.currentScrollLeft=c,this.currentScrollTop=p,this.currentWidth=this.viewportWidth,this.currentHeight=this.viewportHeight,f=this.particles.length-1;f>=0;f--)t=this.particles[f],e=t.isFixed?1:0,this.options.horizontalScrolling?(o=(c+t.horizontalOffset+this.viewportOffsetLeft+t.startingPositionLeft-t.startingOffsetLeft+t.parentOffsetLeft)*-(t.stellarRatio+e-1)+t.startingPositionLeft,a=o-t.startingPositionLeft+t.startingOffsetLeft):(o=t.startingPositionLeft,a=t.startingOffsetLeft),this.options.verticalScrolling?(r=(p+t.verticalOffset+this.viewportOffsetTop+t.startingPositionTop-t.startingOffsetTop+t.parentOffsetTop)*-(t.stellarRatio+e-1)+t.startingPositionTop,l=r-t.startingPositionTop+t.startingOffsetTop):(r=t.startingPositionTop,l=t.startingOffsetTop),this.options.hideDistantElements&&(d=!this.options.horizontalScrolling||a+t.width>(t.isFixed?0:c)&&a<(t.isFixed?0:c)+this.viewportWidth+this.viewportOffsetLeft,u=!this.options.verticalScrolling||l+t.height>(t.isFixed?0:p)&&l<(t.isFixed?0:p)+this.viewportHeight+this.viewportOffsetTop),d&&u?(t.isHidden&&(this.options.showElement(t.$element),t.isHidden=!1),this._setPosition(t.$element,o,t.startingPositionLeft,r,t.startingPositionTop)):t.isHidden||(this.options.hideElement(t.$element),t.isHidden=!0);for(f=this.backgrounds.length-1;f>=0;f--)i=this.backgrounds[f],e=i.isFixed?0:1,s=this.options.horizontalScrolling?(c+i.horizontalOffset-this.viewportOffsetLeft-i.startingOffsetLeft+i.parentOffsetLeft-i.startingBackgroundPositionLeft)*(e-i.stellarRatio)+"px":i.startingValueLeft,n=this.options.verticalScrolling?(p+i.verticalOffset-this.viewportOffsetTop-i.startingOffsetTop+i.parentOffsetTop-i.startingBackgroundPositionTop)*(e-i.stellarRatio)+"px":i.startingValueTop,h(i.$element,s,n)}},_handleScrollEvent:function(){var t=this,e=!1,i=function(){t._repositionElements(),e=!1},s=function(){e||(d(i),e=!0)};this.$scrollElement.bind("scroll."+this.name,s),s()},_startAnimationLoop:function(){var t=this;this._animationLoop=function(){d(t._animationLoop),t._repositionElements()},this._animationLoop()}},t.fn[o]=function(e){var i=arguments;return e===s||"object"==typeof e?this.each(function(){t.data(this,"plugin_"+o)||t.data(this,"plugin_"+o,new n(this,e))}):"string"==typeof e&&"_"!==e[0]&&"init"!==e?this.each(function(){var s=t.data(this,"plugin_"+o);s instanceof n&&"function"==typeof s[e]&&s[e].apply(s,Array.prototype.slice.call(i,1)),"destroy"===e&&t.data(this,"plugin_"+o,null)}):void 0},t[o]=function(i){var s=t(e);return s.stellar.apply(s,Array.prototype.slice.call(arguments,0))},t[o].scrollProperty=a,t[o].positionProperty=l,e.Stellar=n}(jQuery,this,document),function(t,e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(t.jQuery)}(this,function(t,e){function i(t,e,i){var s=c[e.type]||{};return null==t?i||!e.def?null:e.def:(t=s.floor?~~t:parseFloat(t),isNaN(t)?e.def:s.mod?(t+s.mod)%s.mod:0>t?0:s.max<t?s.max:t)}function s(e){var i=l(),s=i._rgba=[];return e=e.toLowerCase(),u(a,function(t,n){var o,r=n.re.exec(e),a=r&&n.parse(r),l=n.space||"rgba";if(a)return o=i[l](a),i[f[l].cache]=o[f[l].cache],s=i._rgba=o._rgba,!1}),s.length?("0,0,0,0"===s.join()&&t.extend(s,o.transparent),i):o[e]}function n(t,e,i){return i=(i+1)%1,6*i<1?t+(e-t)*i*6:2*i<1?e:3*i<2?t+(e-t)*(2/3-i)*6:t}var o,r=/^([\-+])=\s*(\d+\.?\d*)/,a=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],l=t.Color=function(e,i,s,n){return new t.Color.fn.parse(e,i,s,n)},f={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},c={byte:{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},p=l.support={},h=t("<p>")[0],u=t.each;h.style.cssText="background-color:rgba(1,1,1,.5)",p.rgba=h.style.backgroundColor.indexOf("rgba")>-1,u(f,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),l.fn=t.extend(l.prototype,{parse:function(n,r,a,c){if(n===e)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=t(n).css(r),r=e);var p=this,h=t.type(n),d=this._rgba=[];return r!==e&&(n=[n,r,a,c],h="array"),"string"===h?this.parse(s(n)||o._default):"array"===h?(u(f.rgba.props,function(t,e){d[e.idx]=i(n[e.idx],e)}),this):"object"===h?(n instanceof l?u(f,function(t,e){n[e.cache]&&(p[e.cache]=n[e.cache].slice())}):u(f,function(e,s){var o=s.cache;u(s.props,function(t,e){if(!p[o]&&s.to){if("alpha"===t||null==n[t])return;p[o]=s.to(p._rgba)}p[o][e.idx]=i(n[t],e,!0)}),p[o]&&t.inArray(null,p[o].slice(0,3))<0&&(p[o][3]=1,s.from&&(p._rgba=s.from(p[o])))}),this):void 0},is:function(t){var e=l(t),i=!0,s=this;return u(f,function(t,n){var o,r=e[n.cache];return r&&(o=s[n.cache]||n.to&&n.to(s._rgba)||[],u(n.props,function(t,e){if(null!=r[e.idx])return i=r[e.idx]===o[e.idx]})),i}),i},_space:function(){var t=[],e=this;return u(f,function(i,s){e[s.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var s=l(t),n=s._space(),o=f[n],r=0===this.alpha()?l("transparent"):this,a=r[o.cache]||o.to(r._rgba),p=a.slice();return s=s[o.cache],u(o.props,function(t,n){var o=n.idx,r=a[o],l=s[o],f=c[n.type]||{};null!==l&&(null===r?p[o]=l:(f.mod&&(l-r>f.mod/2?r+=f.mod:r-l>f.mod/2&&(r-=f.mod)),p[o]=i((l-r)*e+r,n)))}),this[n](p)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=l(e)._rgba;return l(t.map(i,function(t,e){return(1-s)*n[e]+s*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&e<3&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),s=i.pop();return e&&i.push(~~(255*s)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,f.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,s=t[0]/255,n=t[1]/255,o=t[2]/255,r=t[3],a=Math.max(s,n,o),l=Math.min(s,n,o),f=a-l,c=a+l,p=.5*c;return e=l===a?0:s===a?60*(n-o)/f+360:n===a?60*(o-s)/f+120:60*(s-n)/f+240,i=0===f?0:p<=.5?f/c:f/(2-c),[Math.round(e)%360,i,p,null==r?1:r]},f.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],s=t[2],o=t[3],r=s<=.5?s*(1+i):s+i-s*i,a=2*s-r;return[Math.round(255*n(a,r,e+1/3)),Math.round(255*n(a,r,e)),Math.round(255*n(a,r,e-1/3)),o]},u(f,function(s,n){var o=n.props,a=n.cache,f=n.to,c=n.from;l.fn[s]=function(s){if(f&&!this[a]&&(this[a]=f(this._rgba)),s===e)return this[a].slice();var n,r=t.type(s),p="array"===r||"object"===r?s:arguments,h=this[a].slice();return u(o,function(t,e){var s=p["object"===r?t:e.idx];null==s&&(s=h[e.idx]),h[e.idx]=i(s,e)}),c?(n=l(c(h)),n[a]=h,n):l(h)},u(o,function(e,i){l.fn[e]||(l.fn[e]=function(n){var o,a=t.type(n),l="alpha"===e?this._hsla?"hsla":"rgba":s,f=this[l](),c=f[i.idx];return"undefined"===a?c:("function"===a&&(n=n.call(this,c),a=t.type(n)),null==n&&i.empty?this:("string"===a&&(o=r.exec(n))&&(n=c+parseFloat(o[2])*("+"===o[1]?1:-1)),f[i.idx]=n,this[l](f)))})})}),l.hook=function(e){u(e.split(" "),function(e,i){t.cssHooks[i]={set:function(e,n){var o,r,a="";if("transparent"!==n&&("string"!==t.type(n)||(o=s(n)))){if(n=l(o||n),!p.rgba&&1!==n._rgba[3]){for(r="backgroundColor"===i?e.parentNode:e;(""===a||"transparent"===a)&&r&&r.style;)try{a=t.css(r,"backgroundColor"),r=r.parentNode}catch(t){}n=n.blend(a&&"transparent"!==a?a:"_default")}n=n.toRgbaString()}try{e.style[i]=n}catch(t){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=l(e.elem,i),e.end=l(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},l.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"),t.cssHooks.borderColor={expand:function(t){var e={};return u(["Top","Right","Bottom","Left"],function(i,s){e["border"+s+"Color"]=t}),e}},o=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}});