<script>
import { writable } from 'svelte/store';
  import '@xyflow/svelte/dist/style.css';
    import Graph from "./Graph.svelte";
    import SideBar from './SideBar.svelte';
    import { SvelteFlowProvider } from '@xyflow/svelte';

    

</script>

<main >
    <div class="flex">
    <SvelteFlowProvider>
        <SideBar />
        <Graph  />
    </SvelteFlowProvider >    
    
    </div>
</main>

<style>
    
</style>