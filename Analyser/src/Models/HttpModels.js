import External from "../External";

const http = External.load("http");
export default function(state, ctx, model, helper) {
	model.add(http.request, helper.symbolicHook(
		http.request,
		(base, args) => state.isSymbolic(args[0]),
		(base, args, r) => {
			console.log("http.request", r.chunk);
		}
	));
        
}