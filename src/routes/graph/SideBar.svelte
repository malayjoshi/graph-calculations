<script lang="ts">
  import { page } from '$app/stores';
      import type { ResponseModel } from './ResponseModel';
    import { useEdges, useNodes, useSvelteFlow, getIncomers, getOutgoers } from '@xyflow/svelte';
  import { Button, Helper, Input, Label, Select, Sidebar, SidebarDropdownItem, SidebarDropdownWrapper, SidebarGroup, SidebarItem, SidebarWrapper, Toggle } from 'flowbite-svelte';
    import { writable } from 'svelte/store';
  let spanClass = 'flex-1 ms-3 whitespace-nowrap';
  $: activeUrl = $page.url.pathname;
  import { useStore} from '@xyflow/svelte';
  import {selectedEdge} from './store';
    import type { GraphModel } from './GraphModel';
    import { createClient, type NormalizeOAS } from 'fets'
import type openapi from '../../openapi'
  
  const { reset } = useStore();
  const {getNode} = useSvelteFlow();
  const edges = useEdges();
  const nodes = useNodes(); 
  let edgId:string;
  let valid4:boolean;
  edges.subscribe((value) => {
    validateGraph();
  });

  nodes.subscribe((value) => {
    validateGraph();
  });
  const onDragStart = (event: DragEvent, nodeType: string) => {
    if (!event.dataTransfer) {
      return null;
    }

    event.dataTransfer.setData('application/svelteflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onResetClick = (event: MouseEvent, resetType: string) => {
    

    reset();
  };

  
  let algos = [{value:'dijsktra',name:'Dijkstra'}, ];
  let selectedAlgo = 'dj';
  let source:string='';
  let target:string='';
  let valid1:boolean;
  let valid2:boolean;


    function validateSource(): ((e: Event) => void) | void {
        //check if source is present using getNode hook
        console.log(getNode(source));
        if( getNode(source)!=undefined){
          valid1 = true;
        }else  valid1 = false;
    }


    function validateTarget(): ((e: Event) => void) | void {
        //check if source is present using getNode hook
        console.log(getNode(target));
        if( getNode(target)!=undefined){
          valid2= true;
        }else valid2 = false;
    }

    let weight:string;
    let valid3:boolean;
    function validateWeight(): ((e: Event) => void) | void {
      if(weight!=''){
        if(!isNaN(Number(weight))){
          if(Number(weight)<0){
            valid3 = false;
          }else {
            console.log('weight is',weight);
            selectedEdge.update((value) => {
              value.weight = weight;
              return value;
            });
            

            valid3 = true;
          }
      }        
    }
  }
    selectedEdge.subscribe((value) => {
      edgId = value.id;
      weight =  value.weight;
    });

    
    function validateGraph(){
      for(let i=0;i<$nodes.length;i++){
            if(getIncomers($nodes[i],$nodes,$edges).length!=0 || getOutgoers($nodes[i],$nodes,$edges).length!=0){
                valid4 = true;
            }else {
              valid4 = false;
              break;
            }
        }
    }
    
  async  function calculate(e: MouseEvent): Promise<void> {

        validateGraph();
        if(valid4){
          let nodeIds = $nodes.map((node) => node.id);
          let edgeL = $edges.map((edge) => {
            return {
              source: edge.source,
              target: edge.target,
              value: edge.data?.label as string,
            };
          });
          const graph:GraphModel = {
            calculationType: selectedAlgo,
            source: source,
            target: target,
            nodes: nodeIds,
            edges: edgeL
          };
          
	//post request to the server
        const client = createClient<NormalizeOAS<typeof openapi>>({})
      
      const response = await client['https://dijsktra-sb.onrender.com/api/v1/flows/calculate'].post({
                          json: graph
                      });
        
      const data:ResponseModel = await response.json()
          
          //update node colors
          
          let cnode = Number(target);
          do{
            let node = getNode(cnode+"");
            if (node) {
              node.type = 'highlighted';
              node.type = node.type;
            }

            if (data.path) {
              cnode = Number(data.path[cnode]);
            }
            if(cnode==Number(source)){
              
              node = getNode(cnode+"");
            if (node) {
              node.type = 'highlighted';
              node.type = node.type;
            }
              break;
            }
          }while(true);
            
          $nodes = $nodes;

        }
    }
</script>

<Sidebar {activeUrl} style="height: 100vh;">
  <SidebarWrapper>
    <SidebarGroup>
      <SidebarItem label="Add Node">
        <svelte:fragment slot="icon">
          <img  class="input-node node"
      on:dragstart={(event) => onDragStart(event, 'input')}
      draggable={true} width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/add--v1.png" alt="add node"/>
      
        </svelte:fragment>
      
      </SidebarItem>

      <SidebarItem label="Reset" on:click={(event)=>{onResetClick(event,'reset')}}>
        
        <svelte:fragment slot="icon">
         
            <img width="30" height="30" 
            src="https://img.icons8.com/ios-glyphs/30/FFFFFF/recurring-appointment.png" alt="recurring-appointment"/>
      
          
          
        </svelte:fragment>
      
      </SidebarItem>
      
    </SidebarGroup>
    <SidebarGroup border>
      <Label>
        Select Algorithm
        
      </Label>
      <Select class="mt-2" items={algos} bind:value={selectedAlgo}  />
      <Label>
        Source ID
        </Label>
        <Input  placeholder="Source Node ID" {valid1} bind:value={source} required on:change={validateSource}/>
        {#if !valid1 && source!=''}
          <Helper class='mt-2' color='red' {valid1}><span class="font-medium">Enter ID present in one of the nodes!</span></Helper>
        {/if}
        
        <Label>
          Target ID
          </Label>
          <Input placeholder="Target Node ID"  bind:value={target} {valid2} on:change={validateTarget} required/>
          {#if !valid2 && target!=''}
            <Helper class='mt-2' color='red' {valid2}><span class="font-medium">Enter ID present in one of the nodes!</span></Helper>
          {/if}
          <Label>
            Selected Edge Weight/Capacity
            </Label>
            <Input placeholder="Edge Weight/Capacity"  bind:value={weight} {valid3} on:change={validateWeight} required/>
            {#if !valid3 && weight!=''}
              <Helper class='mt-2' color='red' {valid2}><span class="font-medium">Enter Weight > 0 !</span></Helper>
            {/if}
        <Button on:click={calculate}  disabled={!(valid1 && valid2 && valid4) }>Calculate</Button>
        {#if !valid4}
          <Helper class='mt-2' color='red' {valid4}><span class="font-medium">One or more nodes are disconnected!</span></Helper>
        {/if}
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar>