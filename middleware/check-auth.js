export default function(context) {
  console.log("middleware check Auth");
  context.store.dispatch("initAuth", context.req);
}
