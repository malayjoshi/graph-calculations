<script lang="ts">
    import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  
    type $$Props = NodeProps;
 
 export let id: $$Props['id']; id;
 export let data: $$Props['data']; data;
 export let dragHandle: $$Props['dragHandle'] = undefined; dragHandle;
 export let type: $$Props['type']  = undefined; type;
 export let selected: $$Props['selected'] = undefined; selected;
 export let isConnectable: $$Props['isConnectable'] = undefined; isConnectable;
 export let zIndex: $$Props['zIndex'] = undefined; zIndex;
 export let width: $$Props['width'] = undefined; width;
 export let height: $$Props['height'] = undefined; height;
 export let dragging: $$Props['dragging']; dragging;
 export let targetPosition: $$Props['targetPosition'] = undefined; targetPosition;
 export let sourcePosition: $$Props['sourcePosition'] = undefined; sourcePosition;
    
   
   
  </script>
  
  <div class="px-4  py-2 shadow-md rounded-full bg-grey border-2 border-stone-400">
    {data.count}
    
    <Handle
    type="target"
    position={Position.Top}
    class="w-16 !bg-teal-500 rounded-none border-none"
  />
  <Handle
    type="source"
    position={Position.Bottom}
    class="w-16 !bg-teal-500 rounded-none border-none"
  />
  </div>