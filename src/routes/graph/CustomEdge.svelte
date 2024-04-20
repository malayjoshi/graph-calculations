<script lang="ts">
    import { type EdgeProps, getBezierPath, BaseEdge, EdgeLabelRenderer } from '@xyflow/svelte';
    import { Input } from 'flowbite-svelte';
  
    type $$Props = EdgeProps;
  
    export let sourceX: $$Props['sourceX'];
    export let sourceY: $$Props['sourceY'];
    export let sourcePosition: $$Props['sourcePosition'];
    export let targetX: $$Props['targetX'];
    export let targetY: $$Props['targetY'];
    export let targetPosition: $$Props['targetPosition'];
    export let data: $$Props['data'] = undefined;
  
    $: [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition
    });
  </script>
  
  <BaseEdge path={edgePath} />
  <EdgeLabelRenderer>

      <div 
      style:transform="translate(-50%, -50%) translate({labelX}px,{labelY}px)"
      class="edge-label nodrag nopan"
  >
      {data.label}
      </div>

    
  </EdgeLabelRenderer>
  
  <style>
    .edge-label {
      position: absolute;
      background: #7268e0;
      padding: 5px;
      border-radius: 10px;
      font-size: 8px;
      font-weight: 700;
    }
  </style>