export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","gallery/2020.03.30_waves.png","gallery/2020.04.23_crossings.png","gallery/2020.04.28_blackhole.png","gallery/2020.05.03_variations.png","gallery/2020.05.05_wiggles.png","gallery/2020.05.10_superpositions.png","gallery/2020.08.23_perturbations.png","gallery/2020.09.06_rupture.png","gallery/2020.09.09_fabric.jpeg","gallery/2020.10.02_turbulance.jpg","gallery/2020.10.27_tourbillons.jpg","gallery/2022.07.07_doors.png","generative-apps/dunes.html","teaching/enpc/MRW.html","teaching/enpc/MRW.zip","teaching/enpc/TD8.html","teaching/enpc/TD8.zip","teaching/macrol2paris1/SujetA.pdf","teaching/macrol2paris1/SujetA_Correc.pdf","teaching/macrol2paris1/SujetB.pdf","teaching/macrol2paris1/SujetB_Correc.pdf","teaching/macrol2paris1/SujetC.pdf","teaching/macrol2paris1/SujetC_Correc.pdf","teaching/macrol2paris1/SujetD.pdf","teaching/macrol2paris1/SujetD_Correc.pdf"]),
	mimeTypes: {".png":"image/png",".jpeg":"image/jpeg",".jpg":"image/jpeg",".html":"text/html",".zip":"application/zip",".pdf":"application/pdf"},
	_: {
		client: {"start":"_app/immutable/entry/start.6e57fcf4.js","app":"_app/immutable/entry/app.0871491a.js","imports":["_app/immutable/entry/start.6e57fcf4.js","_app/immutable/chunks/index.abcf0ec6.js","_app/immutable/chunks/singletons.f947dd8c.js","_app/immutable/chunks/index.506b5c70.js","_app/immutable/entry/app.0871491a.js","_app/immutable/chunks/index.abcf0ec6.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			{
				id: "/api/posts",
				pattern: /^\/api\/posts\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/posts/_server.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
