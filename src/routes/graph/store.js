import { writable } from "svelte/store";

export let selectedEdge = writable({id:'',weight:''});