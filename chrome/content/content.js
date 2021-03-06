var wappalyzer = {};

wappalyzer =
{
	prevUrl: '',

	init: function()
	{
		wappalyzer.log('init');

		addEventListener('DOMContentLoaded', wappalyzer.onPageLoad, false);
	},

	log: function(message)
	{
		var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);

		consoleService.logStringMessage("Wappalyzer content.js: " + message);
	},

	onPageLoad: function(e)
	{
		wappalyzer.log('onPageLoad');

		sendAsyncMessage('wappalyzer:onPageLoad', {
			href:    content.document.location.href,
			html:    content.document.documentElement.innerHTML,
			headers: []
			});
	},

	onUrlChange: function(request)
	{
		wappalyzer.log('onUrlChange');
	},

	urlChange:
	{
		QueryInterface: function(iid)
		{
			if ( iid.equals(Components.interfaces.nsIWebProgressListener)   ||
			     iid.equals(Components.interfaces.nsISupportsWeakReference) ||
			     iid.equals(Components.interfaces.nsISupports) )
			{
				return this;
			}

			throw Components.results.NS_NOINTERFACE;
		},

		onLocationChange: function(progress, request, url)
		{
			if ( !url )
			{
				wappalyzer.prevUrl = '';

				return;
			}

			if ( url.spec != wappalyzer.prevUrl )
			{
				wappalyzer.prevUrl = url.spec;

				wappalyzer.onUrlChange(request);
			}
		},

		onStateChange:    function(a, b, c, d)       {},
		onProgressChange: function(a, b, c, d, e, f) {},
		onStatusChange:   function(a, b, c, d)       {},
		onSecurityChange: function(a, b, c)          {}
	}
};

wappalyzer.init();
