
(function(w, d){
	function tinyxhr(e,t,n,r,i){var s,o;o=new XMLHttpRequest;s=setTimeout(function(){o.abort();t(new Error("tinyxhr: aborted by a timeout"),"",o)},1e4);o.onreadystatechange=function(){if(o.readyState!=4)return;clearTimeout(s);t(o.status!=200?new Error("tinyxhr: server response status is "+o.status):false,o.responseText,o)};o.open(n?n.toUpperCase():"GET",e,true);o.withCredentials=true;if(!r)o.send();else{o.setRequestHeader("Content-type",i?i:"application/x-www-form-urlencoded");o.send(r)}}
	var _map={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'},_nonAlphaNum=["'",'`','!','@','$','%','(',')','=','+','{','}','[',']'],_escapedChars=Object.keys(_map).concat(_nonAlphaNum).join('\\'),_pat=new RegExp('['+_escapedChars+']','g');
	function esc(h){return h.replace(_pat,function(c){return _map[c]||'&#'+c.charCodeAt(0)+';';});};

	var host = 'platform.appcelerator.com',
		baseUrl = 'https://' + host + '/',
		stylesheetUrl = 'https://d3ilu1xuwhtfe2.cloudfront.net/8a9d2f0/css/unified-nav.css',
		appc = { data: {}, loggedIn: false, callbacks: { header: [], footer: [] } },
		h = d.getElementsByTagName('head')[0],
		b,
		banner,
		header,
		footer,
		makeElement = function(tag, props) {
			var el = d.createElement(tag);
			Object.keys(props).forEach(function(k) {
				el[k] = props[k];
			});
			return el;
		},
		prependElement = function(parent, el) {
			parent.insertBefore(el, parent.firstChild);
		},
		hasClass = function(el, cn) {
			return !!~el.className.split(' ').indexOf(cn);
		},
		addClass = function(el, cn) {
			if (!hasClass(el, cn)) {
				var classNames = el.className.split(' ');
				classNames.push(cn);
				el.className = classNames.join(' ');
			}
		},
		removeClass = function(el, cn) {
			el.className = el.className.replace(cn, '').replace('  ', ' ').trim();
		},
		toggleClass = function(el, cn) {
			if (!hasClass(el, cn)) {
				addClass(el, cn);
			} else {
				removeClass(el, cn);
			}
		},
		formatDateTime = function(timestamp) {
			if (!timestamp) {
				return '';
			}
			var lt = new Date(timestamp),
				ds = lt.toDateString().split(' ');
			return ds[1] + ' ' + +ds[2] + ' @ ' + lt.toLocaleTimeString().replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
		},
		fireDeferred = function(callbacks) {
			callbacks.forEach(function(cb) { cb(); });
		},

		initHeader = function() {
			var headerNav,
				linksPanel,
				linksToggle,
				profileControl,
				profileDropdown,
				profileToggle,
				notificationsPanel,
				notificationsToggle,
				notificationsOpenClass = 'has-appc-unified-feed',
				bodyOverflowClass = 'has-appc-unified-scroll',
				activeClass = 'active',
				props = {
					id: 'appc-unified-header',
					innerHTML: ''
				},
				// Redirect param to include in session links if current location is not on baseUrl.
				redir = !~location.href.indexOf(host) ? '?redirect=' + encodeURIComponent(location.href) : '',

				setElementsTop = function() {
					var top = header.offsetTop + header.offsetHeight,
						secondaryNav = d.querySelector('#nav-secondary > nav'),
						tertiaryNav = d.querySelector('#nav-tertiary > nav');
					b.style.paddingTop = top + 'px';
					secondaryNav && (secondaryNav.style.paddingTop = top + 'px');
					tertiaryNav && (tertiaryNav.style.paddingTop = top + 'px');
				},

				toggleActiveControl = function(toggle, panel, setActiveToggle, setOverflow) {
					if (!hasClass(panel, activeClass)) {
						setTimeout(function() {
							toggleClass(panel, activeClass);
							setActiveToggle && toggleClass(toggle, activeClass);
							setElementsTop();
							if (setOverflow && b.clientWidth < w.innerWidth) {
								toggleClass(b, notificationsOpenClass);
								addClass(b, bodyOverflowClass);
							}
						}, 0);
					}
				},
				resetActiveControls = function() {
					removeClass(linksToggle, activeClass);
					removeClass(linksPanel, activeClass);
					notificationsPanel && removeClass(notificationsPanel, activeClass);
					profileDropdown && removeClass(profileDropdown, activeClass);
					setElementsTop();
					removeClass(b, notificationsOpenClass);
					removeClass(b, bodyOverflowClass);
				};

			// Dismiss active panels on any click.
			b.addEventListener('click', resetActiveControls);

			

			props.innerHTML += '<div id="appc-unified-header-links"><div>';
			
				props.innerHTML += '<div class="app-unified-header-link-group">'
					+ '<span>Appcelerator Platform</span>';
				
					props.innerHTML += '<a href="https://platform.appcelerator.com/"><i class="icon-chart-line-1"></i>Dashboard</a>';
				
					props.innerHTML += '<a href="https://web.appcelerator.com/product/arrow"><i class="icon-arrow_mark"></i>Arrow</a>';
				
					props.innerHTML += '<a href="https://software.appcelerator.com"><i class="icon-appc_marketplace-oline"></i>Marketplace</a>';
				
					props.innerHTML += '<a href="https://web.appcelerator.com/product/studio"><i class="icon-appc_studio_icon"></i>Studio</a>';
				
					props.innerHTML += '<a href="https://web.appcelerator.com/product/cli"><i class="icon-cli"></i>CLI</a>';
				
					props.innerHTML += '<a href="https://web.appcelerator.com/product/titanium"><i class="icon-ti"></i>Titanium</a>';
				
				props.innerHTML += '</div>';
			
				props.innerHTML += '<div class="app-unified-header-link-group">'
					+ '<span>Learn</span>';
				
					props.innerHTML += '<a href="https://university.appcelerator.com"><i class="icon-graduation-cap"></i>Appcelerator University</a>';
				
					props.innerHTML += '<a href="https://docs.appcelerator.com/"><i class="icon-doc-text"></i>Documentation</a>';
				
					props.innerHTML += '<a href="https://community.appcelerator.com"><i class="icon-chat"></i>Community Q & A</a>';
				
					props.innerHTML += '<a href="http://support2.appcelerator.com/"><i class="icon-lifebuoy"></i>Support</a>';
				
				props.innerHTML += '</div>';
			
				props.innerHTML += '<div class="app-unified-header-link-group">'
					+ '<span>More</span>';
				
					props.innerHTML += '<a href="https://www.appcelerator.com/"><i class="icon-appc_logo-white-2"></i>Appcelerator.com</a>';
				
					props.innerHTML += '<a href="https://www.appcelerator.com/blog/"><i class="icon-rss"></i>Appcelerator Blog</a>';
				
					props.innerHTML += '<a href="https://labs.appcelerator.com/"><i class="icon-labs-flask2"></i>Appcelerator Labs</a>';
				
				props.innerHTML += '</div>';
			
			props.innerHTML += '</div></div>';

			props.innerHTML += '<div id="appc-unified-header-nav">'
				+ '<div class="pull-left">'
				+ '<span id="appc-unified-header-toggle"><i class="icon-appc_logo-white-2"></i><i class="icon-menu"></i></span>'
				+ '<span id="appc-unified-header-sitename"></span>'
				+ '</div><div class="pull-right">';

			
				props.innerHTML += '<a id="appc-unified-get-started" href="https://appcelerator.com/signup">Get started for FREE!</a>'
					+ '<a id="appc-sign-in" href="' + baseUrl + redir + '">Sign In</a>';
			

			props.innerHTML += '</div></div>';

			header = makeElement('nav', props);
			prependElement(b, header);

			b.className += ' has-appc-unified-header';

			headerNav = d.getElementById('appc-unified-header-nav');
			linksPanel = d.getElementById('appc-unified-header-links');
			linksToggle = d.getElementById('appc-unified-header-toggle');
			linksToggle.addEventListener('click', function(e) {
				e.preventDefault();
				toggleActiveControl(this, linksPanel, true);
			});

			
			// Fire any deferred callbacks.
			fireDeferred(appc.callbacks.header);
		},
		API = {
			get: function(url, cb) {
				tinyxhr(baseUrl + 'api/v1/' + url, function(err, data, xhr) {
					API.handleXhrResponse(err, data, xhr, cb);
				});
			},
			post: function(url, data, cb) {
				tinyxhr(baseUrl + 'api/v1/' + url, function(err, data, xhr) {
					API.handleXhrResponse(err, data, xhr, cb);
				}, 'post', JSON.stringify(data), 'application/javascript');
			},
			delete: function(url, data, cb) {
				tinyxhr(baseUrl + 'api/v1/' + url, function(err, data, xhr) {
					API.handleXhrResponse(err, data, xhr, cb);
				}, 'delete', JSON.stringify(data), 'application/javascript');
			},
			handleXhrResponse: function(err, data, xhr, success) {
				if (err) {
					return API.handleError(err);
				}
				try {
					var data = JSON.parse(data);
					if (!data.success) {
						return API.handleError(data);
					}
					return success(data.result);
				} catch (err) {
					return API.handleError(err);
				}
			},
			handleError: function(err) {
				// TODO: need to do something to handle request errors
				console.error(err);
			}
		},

		

		

		

		opt = { f: false, d: false };

	w.Appc = {
		loggedIn: function() { return appc.loggedIn; },
		afterHeaderRender: function(cb) {
			if (typeof cb !== 'function') return;
			if (!header) return appc.callbacks.header.push(cb);
			cb();
		},
		afterFooterRender: function(cb) {
			if (typeof cb !== 'function') return;
			if (!footer && false) return appc.callbacks.footer.push(cb);
			cb();
		}
	};

	h.appendChild(makeElement('link', { rel: 'stylesheet', type: 'text/css', href: '//fonts.googleapis.com/css?family=Open+Sans:400,700' }));
	h.appendChild(makeElement('link', { rel: 'stylesheet', type: 'text/css', href: stylesheetUrl }));

	d.addEventListener('DOMContentLoaded', function(e) {
		b = d.getElementsByTagName('body')[0];
		initHeader();
		
		
		
			h.appendChild(makeElement('script', { type: 'text/javascript', async: true, defer: true, src: 'https://webevent.appcelerator.com/analytics.js?intercom=true' }));
		
	});
})(window, document);

