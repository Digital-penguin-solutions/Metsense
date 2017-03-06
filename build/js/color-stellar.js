!function(t,e,i,n){function o(e,i){this.element=e,this.options=t.extend({},r,i),this._defaults=r,this._name=s,this.init()}var s="stellar",r={scrollProperty:"scroll",positionProperty:"position",horizontalScrolling:!0,verticalScrolling:!0,horizontalOffset:0,verticalOffset:0,responsive:!1,parallaxBackgrounds:!0,parallaxElements:!0,hideDistantElements:!0,hideElement:function(t){t.hide()},showElement:function(t){t.show()}},a={scroll:{getLeft:function(t){return t.scrollLeft()},setLeft:function(t,e){t.scrollLeft(e)},getTop:function(t){return t.scrollTop()},setTop:function(t,e){t.scrollTop(e)}},position:{getLeft:function(t){return parseInt(t.css("left"),10)*-1},getTop:function(t){return parseInt(t.css("top"),10)*-1}},margin:{getLeft:function(t){return parseInt(t.css("margin-left"),10)*-1},getTop:function(t){return parseInt(t.css("margin-top"),10)*-1}},transform:{getLeft:function(t){var e=getComputedStyle(t[0])[c];return"none"!==e?parseInt(e.match(/(-?[0-9]+)/g)[4],10)*-1:0},getTop:function(t){var e=getComputedStyle(t[0])[c];return"none"!==e?parseInt(e.match(/(-?[0-9]+)/g)[5],10)*-1:0}}},l={position:{setLeft:function(t,e){t.css("left",e)},setTop:function(t,e){t.css("top",e)}},transform:{setPosition:function(t,e,i,n,o){t[0].style[c]="translate3d("+(e-i)+"px, "+(n-o)+"px, 0)"}}},f=function(){var e,i=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,n=t("script")[0].style,o="";for(e in n)if(i.test(e)){o=e.match(i)[0];break}return"WebkitOpacity"in n&&(o="Webkit"),"KhtmlOpacity"in n&&(o="Khtml"),function(t){return o+(o.length>0?t.charAt(0).toUpperCase()+t.slice(1):t)}}(),c=f("transform"),p=t("<div />",{style:"background:#fff"}).css("background-position-x")!==n,h=p?function(t,e,i){t.css({"background-position-x":e,"background-position-y":i})}:function(t,e,i){t.css("background-position",e+" "+i)},u=p?function(t){return[t.css("background-position-x"),t.css("background-position-y")]}:function(t){return t.css("background-position").split(" ")},d=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(t){setTimeout(t,1e3/60)};o.prototype={init:function(){this.options.name=s+"_"+Math.floor(1e9*Math.random()),this._defineElements(),this._defineGetters(),this._defineSetters(),this._handleWindowLoadAndResize(),this._detectViewport(),this.refresh({firstLoad:!0}),"scroll"===this.options.scrollProperty?this._handleScrollEvent():this._startAnimationLoop()},_defineElements:function(){this.element===i.body&&(this.element=e),this.$scrollElement=t(this.element),this.$element=this.element===e?t("body"):this.$scrollElement,this.$viewportElement=this.options.viewportElement!==n?t(this.options.viewportElement):this.$scrollElement[0]===e||"scroll"===this.options.scrollProperty?this.$scrollElement:this.$scrollElement.parent()},_defineGetters:function(){var t=this,e=a[t.options.scrollProperty];this._getScrollLeft=function(){return e.getLeft(t.$scrollElement)},this._getScrollTop=function(){return e.getTop(t.$scrollElement)}},_defineSetters:function(){var e=this,i=a[e.options.scrollProperty],n=l[e.options.positionProperty],o=i.setLeft,s=i.setTop;this._setScrollLeft="function"==typeof o?function(t){o(e.$scrollElement,t)}:t.noop,this._setScrollTop="function"==typeof s?function(t){s(e.$scrollElement,t)}:t.noop,this._setPosition=n.setPosition||function(t,i,o,s,r){e.options.horizontalScrolling&&n.setLeft(t,i,o),e.options.verticalScrolling&&n.setTop(t,s,r)}},_handleWindowLoadAndResize:function(){var i=this,n=t(e);i.options.responsive&&n.bind("load."+this.name,function(){i.refresh()}),n.bind("resize."+this.name,function(){i._detectViewport(),i.options.responsive&&i.refresh()})},refresh:function(i){var n=this,o=n._getScrollLeft(),s=n._getScrollTop();i&&i.firstLoad||this._reset(),this._setScrollLeft(0),this._setScrollTop(0),this._setOffsets(),this._findParticles(),this._findBackgrounds(),i&&i.firstLoad&&/WebKit/.test(navigator.userAgent)&&t(e).load(function(){var t=n._getScrollLeft(),e=n._getScrollTop();n._setScrollLeft(t+1),n._setScrollTop(e+1),n._setScrollLeft(t),n._setScrollTop(e)}),this._setScrollLeft(o),this._setScrollTop(s)},_detectViewport:function(){var t=this.$viewportElement.offset(),e=null!==t&&t!==n;this.viewportWidth=this.$viewportElement.width(),this.viewportHeight=this.$viewportElement.height(),this.viewportOffsetTop=e?t.top:0,this.viewportOffsetLeft=e?t.left:0},_findParticles:function(){var e=this;if(this._getScrollLeft(),this._getScrollTop(),this.particles!==n)for(var i=this.particles.length-1;i>=0;i--)this.particles[i].$element.data("stellar-elementIsActive",n);this.particles=[],this.options.parallaxElements&&this.$element.find("[data-stellar-ratio]").each(function(i){var o,s,r,a,l,f,c,p,h,u=t(this),d=0,g=0,m=0,v=0;if(u.data("stellar-elementIsActive")){if(u.data("stellar-elementIsActive")!==this)return}else u.data("stellar-elementIsActive",this);e.options.showElement(u),u.data("stellar-startingLeft")?(u.css("left",u.data("stellar-startingLeft")),u.css("top",u.data("stellar-startingTop"))):(u.data("stellar-startingLeft",u.css("left")),u.data("stellar-startingTop",u.css("top"))),r=u.position().left,a=u.position().top,l="auto"===u.css("margin-left")?0:parseInt(u.css("margin-left"),10),f="auto"===u.css("margin-top")?0:parseInt(u.css("margin-top"),10),p=u.offset().left-l,h=u.offset().top-f,u.parents().each(function(){var e=t(this);return e.data("stellar-offset-parent")===!0?(d=m,g=v,c=e,!1):(m+=e.position().left,void(v+=e.position().top))}),o=u.data("stellar-horizontal-offset")!==n?u.data("stellar-horizontal-offset"):c!==n&&c.data("stellar-horizontal-offset")!==n?c.data("stellar-horizontal-offset"):e.horizontalOffset,s=u.data("stellar-vertical-offset")!==n?u.data("stellar-vertical-offset"):c!==n&&c.data("stellar-vertical-offset")!==n?c.data("stellar-vertical-offset"):e.verticalOffset,e.particles.push({$element:u,$offsetParent:c,isFixed:"fixed"===u.css("position"),horizontalOffset:o,verticalOffset:s,startingPositionLeft:r,startingPositionTop:a,startingOffsetLeft:p,startingOffsetTop:h,parentOffsetLeft:d,parentOffsetTop:g,stellarRatio:u.data("stellar-ratio")!==n?u.data("stellar-ratio"):1,width:u.outerWidth(!0),height:u.outerHeight(!0),isHidden:!1})})},_findBackgrounds:function(){var e,i=this,o=this._getScrollLeft(),s=this._getScrollTop();this.backgrounds=[],this.options.parallaxBackgrounds&&(e=this.$element.find("[data-stellar-background-ratio]"),this.$element.data("stellar-background-ratio")&&(e=e.add(this.$element)),e.each(function(){var e,r,a,l,f,c,p,d=t(this),g=u(d),m=0,v=0,b=0,_=0;if(d.data("stellar-backgroundIsActive")){if(d.data("stellar-backgroundIsActive")!==this)return}else d.data("stellar-backgroundIsActive",this);d.data("stellar-backgroundStartingLeft")?h(d,d.data("stellar-backgroundStartingLeft"),d.data("stellar-backgroundStartingTop")):(d.data("stellar-backgroundStartingLeft",g[0]),d.data("stellar-backgroundStartingTop",g[1])),a="auto"===d.css("margin-left")?0:parseInt(d.css("margin-left"),10),l="auto"===d.css("margin-top")?0:parseInt(d.css("margin-top"),10),f=d.offset().left-a-o,c=d.offset().top-l-s,d.parents().each(function(){var e=t(this);return e.data("stellar-offset-parent")===!0?(m=b,v=_,p=e,!1):(b+=e.position().left,void(_+=e.position().top))}),e=d.data("stellar-horizontal-offset")!==n?d.data("stellar-horizontal-offset"):p!==n&&p.data("stellar-horizontal-offset")!==n?p.data("stellar-horizontal-offset"):i.horizontalOffset,r=d.data("stellar-vertical-offset")!==n?d.data("stellar-vertical-offset"):p!==n&&p.data("stellar-vertical-offset")!==n?p.data("stellar-vertical-offset"):i.verticalOffset,i.backgrounds.push({$element:d,$offsetParent:p,isFixed:"fixed"===d.css("background-attachment"),horizontalOffset:e,verticalOffset:r,startingValueLeft:g[0],startingValueTop:g[1],startingBackgroundPositionLeft:isNaN(parseInt(g[0],10))?0:parseInt(g[0],10),startingBackgroundPositionTop:isNaN(parseInt(g[1],10))?0:parseInt(g[1],10),startingPositionLeft:d.position().left,startingPositionTop:d.position().top,startingOffsetLeft:f,startingOffsetTop:c,parentOffsetLeft:m,parentOffsetTop:v,stellarRatio:d.data("stellar-background-ratio")===n?1:d.data("stellar-background-ratio")})}))},_reset:function(){var t,e,i,n,o;for(o=this.particles.length-1;o>=0;o--)t=this.particles[o],e=t.$element.data("stellar-startingLeft"),i=t.$element.data("stellar-startingTop"),this._setPosition(t.$element,e,e,i,i),this.options.showElement(t.$element),t.$element.data("stellar-startingLeft",null).data("stellar-elementIsActive",null).data("stellar-backgroundIsActive",null);for(o=this.backgrounds.length-1;o>=0;o--)n=this.backgrounds[o],n.$element.data("stellar-backgroundStartingLeft",null).data("stellar-backgroundStartingTop",null),h(n.$element,n.startingValueLeft,n.startingValueTop)},destroy:function(){this._reset(),this.$scrollElement.unbind("resize."+this.name).unbind("scroll."+this.name),this._animationLoop=t.noop,t(e).unbind("load."+this.name).unbind("resize."+this.name)},_setOffsets:function(){var i=this,n=t(e);n.unbind("resize.horizontal-"+this.name).unbind("resize.vertical-"+this.name),"function"==typeof this.options.horizontalOffset?(this.horizontalOffset=this.options.horizontalOffset(),n.bind("resize.horizontal-"+this.name,function(){i.horizontalOffset=i.options.horizontalOffset()})):this.horizontalOffset=this.options.horizontalOffset,"function"==typeof this.options.verticalOffset?(this.verticalOffset=this.options.verticalOffset(),n.bind("resize.vertical-"+this.name,function(){i.verticalOffset=i.options.verticalOffset()})):this.verticalOffset=this.options.verticalOffset},_repositionElements:function(){var t,e,i,n,o,s,r,a,l,f,c=this._getScrollLeft(),p=this._getScrollTop(),u=!0,d=!0;if(this.currentScrollLeft!==c||this.currentScrollTop!==p||this.currentWidth!==this.viewportWidth||this.currentHeight!==this.viewportHeight){for(this.currentScrollLeft=c,this.currentScrollTop=p,this.currentWidth=this.viewportWidth,this.currentHeight=this.viewportHeight,f=this.particles.length-1;f>=0;f--)t=this.particles[f],e=t.isFixed?1:0,this.options.horizontalScrolling?(s=(c+t.horizontalOffset+this.viewportOffsetLeft+t.startingPositionLeft-t.startingOffsetLeft+t.parentOffsetLeft)*-(t.stellarRatio+e-1)+t.startingPositionLeft,a=s-t.startingPositionLeft+t.startingOffsetLeft):(s=t.startingPositionLeft,a=t.startingOffsetLeft),this.options.verticalScrolling?(r=(p+t.verticalOffset+this.viewportOffsetTop+t.startingPositionTop-t.startingOffsetTop+t.parentOffsetTop)*-(t.stellarRatio+e-1)+t.startingPositionTop,l=r-t.startingPositionTop+t.startingOffsetTop):(r=t.startingPositionTop,l=t.startingOffsetTop),this.options.hideDistantElements&&(d=!this.options.horizontalScrolling||a+t.width>(t.isFixed?0:c)&&a<(t.isFixed?0:c)+this.viewportWidth+this.viewportOffsetLeft,u=!this.options.verticalScrolling||l+t.height>(t.isFixed?0:p)&&l<(t.isFixed?0:p)+this.viewportHeight+this.viewportOffsetTop),d&&u?(t.isHidden&&(this.options.showElement(t.$element),t.isHidden=!1),this._setPosition(t.$element,s,t.startingPositionLeft,r,t.startingPositionTop)):t.isHidden||(this.options.hideElement(t.$element),t.isHidden=!0);for(f=this.backgrounds.length-1;f>=0;f--)i=this.backgrounds[f],e=i.isFixed?0:1,n=this.options.horizontalScrolling?(c+i.horizontalOffset-this.viewportOffsetLeft-i.startingOffsetLeft+i.parentOffsetLeft-i.startingBackgroundPositionLeft)*(e-i.stellarRatio)+"px":i.startingValueLeft,o=this.options.verticalScrolling?(p+i.verticalOffset-this.viewportOffsetTop-i.startingOffsetTop+i.parentOffsetTop-i.startingBackgroundPositionTop)*(e-i.stellarRatio)+"px":i.startingValueTop,h(i.$element,n,o)}},_handleScrollEvent:function(){var t=this,e=!1,i=function(){t._repositionElements(),e=!1},n=function(){e||(d(i),e=!0)};this.$scrollElement.bind("scroll."+this.name,n),n()},_startAnimationLoop:function(){var t=this;this._animationLoop=function(){d(t._animationLoop),t._repositionElements()},this._animationLoop()}},t.fn[s]=function(e){var i=arguments;return e===n||"object"==typeof e?this.each(function(){t.data(this,"plugin_"+s)||t.data(this,"plugin_"+s,new o(this,e))}):"string"==typeof e&&"_"!==e[0]&&"init"!==e?this.each(function(){var n=t.data(this,"plugin_"+s);n instanceof o&&"function"==typeof n[e]&&n[e].apply(n,Array.prototype.slice.call(i,1)),"destroy"===e&&t.data(this,"plugin_"+s,null)}):void 0},t[s]=function(i){var n=t(e);return n.stellar.apply(n,Array.prototype.slice.call(arguments,0))},t[s].scrollProperty=a,t[s].positionProperty=l,e.Stellar=o}(jQuery,this,document),function(t,e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(t.jQuery)}(this,function(t,e){function i(t,e,i){var n=p[e.type]||{};return null==t?i||!e.def?null:e.def:(t=n.floor?~~t:parseFloat(t),isNaN(t)?e.def:n.mod?(t+n.mod)%n.mod:0>t?0:n.max<t?n.max:t)}function n(e){var i=f(),n=i._rgba=[];return e=e.toLowerCase(),d(l,function(t,o){var s,r=o.re.exec(e),a=r&&o.parse(r),l=o.space||"rgba";if(a)return s=i[l](a),i[c[l].cache]=s[c[l].cache],n=i._rgba=s._rgba,!1}),n.length?("0,0,0,0"===n.join()&&t.extend(n,s.transparent),i):s[e]}function o(t,e,i){return i=(i+1)%1,6*i<1?t+(e-t)*i*6:2*i<1?e:3*i<2?t+(e-t)*(2/3-i)*6:t}var s,r="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",a=/^([\-+])=\s*(\d+\.?\d*)/,l=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],f=t.Color=function(e,i,n,o){return new t.Color.fn.parse(e,i,n,o)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},p={byte:{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},h=f.support={},u=t("<p>")[0],d=t.each;u.style.cssText="background-color:rgba(1,1,1,.5)",h.rgba=u.style.backgroundColor.indexOf("rgba")>-1,d(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),f.fn=t.extend(f.prototype,{parse:function(o,r,a,l){if(o===e)return this._rgba=[null,null,null,null],this;(o.jquery||o.nodeType)&&(o=t(o).css(r),r=e);var p=this,h=t.type(o),u=this._rgba=[];return r!==e&&(o=[o,r,a,l],h="array"),"string"===h?this.parse(n(o)||s._default):"array"===h?(d(c.rgba.props,function(t,e){u[e.idx]=i(o[e.idx],e)}),this):"object"===h?(o instanceof f?d(c,function(t,e){o[e.cache]&&(p[e.cache]=o[e.cache].slice())}):d(c,function(e,n){var s=n.cache;d(n.props,function(t,e){if(!p[s]&&n.to){if("alpha"===t||null==o[t])return;p[s]=n.to(p._rgba)}p[s][e.idx]=i(o[t],e,!0)}),p[s]&&t.inArray(null,p[s].slice(0,3))<0&&(p[s][3]=1,n.from&&(p._rgba=n.from(p[s])))}),this):void 0},is:function(t){var e=f(t),i=!0,n=this;return d(c,function(t,o){var s,r=e[o.cache];return r&&(s=n[o.cache]||o.to&&o.to(n._rgba)||[],d(o.props,function(t,e){if(null!=r[e.idx])return i=r[e.idx]===s[e.idx]})),i}),i},_space:function(){var t=[],e=this;return d(c,function(i,n){e[n.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var n=f(t),o=n._space(),s=c[o],r=0===this.alpha()?f("transparent"):this,a=r[s.cache]||s.to(r._rgba),l=a.slice();return n=n[s.cache],d(s.props,function(t,o){var s=o.idx,r=a[s],f=n[s],c=p[o.type]||{};null!==f&&(null===r?l[s]=f:(c.mod&&(f-r>c.mod/2?r+=c.mod:r-f>c.mod/2&&(r-=c.mod)),l[s]=i((f-r)*e+r,o)))}),this[o](l)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),n=i.pop(),o=f(e)._rgba;return f(t.map(i,function(t,e){return(1-n)*o[e]+n*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&e<3&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),n=i.pop();return e&&i.push(~~(255*n)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),f.fn.parse.prototype=f.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,n=t[0]/255,o=t[1]/255,s=t[2]/255,r=t[3],a=Math.max(n,o,s),l=Math.min(n,o,s),f=a-l,c=a+l,p=.5*c;return e=l===a?0:n===a?60*(o-s)/f+360:o===a?60*(s-n)/f+120:60*(n-o)/f+240,i=0===f?0:p<=.5?f/c:f/(2-c),[Math.round(e)%360,i,p,null==r?1:r]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],n=t[2],s=t[3],r=n<=.5?n*(1+i):n+i-n*i,a=2*n-r;return[Math.round(255*o(a,r,e+1/3)),Math.round(255*o(a,r,e)),Math.round(255*o(a,r,e-1/3)),s]},d(c,function(n,o){var s=o.props,r=o.cache,l=o.to,c=o.from;f.fn[n]=function(n){if(l&&!this[r]&&(this[r]=l(this._rgba)),n===e)return this[r].slice();var o,a=t.type(n),p="array"===a||"object"===a?n:arguments,h=this[r].slice();return d(s,function(t,e){var n=p["object"===a?t:e.idx];null==n&&(n=h[e.idx]),h[e.idx]=i(n,e)}),c?(o=f(c(h)),o[r]=h,o):f(h)},d(s,function(e,i){f.fn[e]||(f.fn[e]=function(o){var s,r=t.type(o),l="alpha"===e?this._hsla?"hsla":"rgba":n,f=this[l](),c=f[i.idx];return"undefined"===r?c:("function"===r&&(o=o.call(this,c),r=t.type(o)),null==o&&i.empty?this:("string"===r&&(s=a.exec(o),s&&(o=c+parseFloat(s[2])*("+"===s[1]?1:-1))),f[i.idx]=o,this[l](f)))})})}),f.hook=function(e){var i=e.split(" ");d(i,function(e,i){t.cssHooks[i]={set:function(e,o){var s,r,a="";if("transparent"!==o&&("string"!==t.type(o)||(s=n(o)))){if(o=f(s||o),!h.rgba&&1!==o._rgba[3]){for(r="backgroundColor"===i?e.parentNode:e;(""===a||"transparent"===a)&&r&&r.style;)try{a=t.css(r,"backgroundColor"),r=r.parentNode}catch(t){}o=o.blend(a&&"transparent"!==a?a:"_default")}o=o.toRgbaString()}try{e.style[i]=o}catch(t){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=f(e.elem,i),e.end=f(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},f.hook(r),t.cssHooks.borderColor={expand:function(t){var e={};return d(["Top","Right","Bottom","Left"],function(i,n){e["border"+n+"Color"]=t}),e}},s=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}});