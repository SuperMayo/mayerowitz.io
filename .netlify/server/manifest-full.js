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
		client: {"start":"_app/immutable/entry/start.71462f67.js","app":"_app/immutable/entry/app.4c106d1f.js","imports":["_app/immutable/entry/start.71462f67.js","_app/immutable/chunks/index.12c69e40.js","_app/immutable/chunks/singletons.2fddb022.js","_app/immutable/chunks/index.accfc049.js","_app/immutable/entry/app.4c106d1f.js","_app/immutable/chunks/preload-helper.cf010ec4.js","_app/immutable/chunks/index.12c69e40.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/gallery",
				pattern: /^\/api\/gallery\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/gallery/_server.ts.js'))
			},
			{
				id: "/api/posts",
				pattern: /^\/api\/posts\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/posts/_server.ts.js'))
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/blog/learning-shaders",
				pattern: /^\/blog\/learning-shaders\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/blog/nobel-prizes",
				pattern: /^\/blog\/nobel-prizes\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/gallery",
				pattern: /^\/gallery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/research",
				pattern: /^\/research\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/teaching",
				pattern: /^\/teaching\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
