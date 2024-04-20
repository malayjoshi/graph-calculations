<script lang="ts">
    import { writable } from 'svelte/store';
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    useSvelteFlow,
    type Node,

    type ColorMode,

    MarkerType,

    type EdgeTypes,

    type Edge,

    useEdges
    , updateEdge

  } from '@xyflow/svelte';
  
    import CustomNode from './CustomNode.svelte';
    import '@xyflow/svelte/dist/style.css';
    import CustomEdge from './CustomEdge.svelte';
    import { selectedEdge } from './store';
    import HighlightedNode from './HighlightedNode.svelte';
    
    
    const edges = writable([
   
  ]);

    selectedEdge.subscribe(value => {
      
        $edges.forEach((edge) => {
            if ((edge as { id: string }).id == value.id) {
            (edge as Edge).data = {label: value.weight};
          }
        });
        $edges = $edges;
      
    });

    const nodeTypes = {
    custom: CustomNode,
    highlighted: HighlightedNode
  };

  let count = 1;

  const nodes = writable([
    {
    id: '1',
    type: 'custom',
    data: { count: count++ },
    position: { x: 0, y: 50 }
  }
  ]);
  
  const defaultEdgeProps = {
  type: 'custom',
  animated: true,
  deletable: true,
  selectable: true,
  data: {label:'1'},
  markerStart:'' ,
  markerEnd:'arrow',
};

  

  const { screenToFlowPosition } = useSvelteFlow();
  const onDragOver = (event: DragEvent) => {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (!event.dataTransfer) {
      return null;
    }

    const type = event.dataTransfer.getData('application/svelteflow');

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    });
    

    const newNode = {
      id: `${count}`,
      type: 'custom',
      position,
     data: {count: count++  },
      origin: [0.5, 0.0],
      deletable: true
    } satisfies Node;

    $nodes.push(newNode);
    $nodes = $nodes;
  };

  const edgeTypes: EdgeTypes = {
    custom: CustomEdge,
    
  };
  
  function updateEdgeH(event:CustomEvent){
    selectedEdge.set({id:event.detail.edge.id, weight:event.detail.edge.data.label});
  }



</script>
  
  <main class="flex-1" >
    <SvelteFlow {nodes} {edges}  {nodeTypes} {edgeTypes} 
    defaultEdgeOptions={defaultEdgeProps} on:edgeclick={updateEdgeH}
    fitView on:dragover={onDragOver} on:drop={onDrop}>
      <Background bgColor="white" patternColor="white" />
      <markerType/>
      
      <MiniMap />
    <Controls />
    </SvelteFlow>
  </main>
 
  