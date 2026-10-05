# Playtest 0.31 rendered smoke: issue evidence

Build: `37ca73cf951ab0b7b95f0a4f0284298938afc8d0`. Windows, GodotJS 4.6.1 custom 14d19694e, AMD Radeon RX 9070 XT, D3D12 Forward+.

## Pale triangle capture

`screenshots/03-export-world.png` is the original 2560 x 1442 capture, saved at 2026-10-05 05:48:46.160 EDT (09:48:46.160 UTC), approximately 45 seconds after this process launched. Pale dense triangle outlines cover the foreground pavement/park paths, left-hand building facades, the tall distant tower, right-hand trees and nearby parked vehicles. The central brick facade and the first-person gun still show textured materials. A red/pink damage overlay and blood at the edges are also visible.

Duration was NOT measured. This is a single anomalous gameplay capture, not a frame sequence. The prior image at 05:48:27.869 is still the loading screen; the next at 05:49:12.092 shows the death screen under the console. The next normal gameplay capture was from a second run and a different view at 05:52:25.385. A fresh-process timed launch rendered a normal street view at 05:55:10.043. These observations do not establish how long the triangle state lasted or that the same affected surfaces recovered.

First-launch shader compilation is a possible explanation, NOT a diagnosed cause. Both the initial process and the later warm timed launch emitted the same 21 missing-vertex-shader and 21 null-pipeline error messages. There is no per-material identifier, shader-completion timestamp or continuous recording to correlate these errors with the visual symptom. This evidence cannot justify dismissing the symptom as harmless warm-up.

## Exact errors and counts

Counts are message occurrences, not necessarily separate underlying bugs. The initial process's counts were recorded during the smoke before its managed log path was reused for the timed process. Only its last 6000 characters were separately preserved (`logs/first-smoke-tail.txt`); do not count that truncated excerpt as the complete initial log. The complete timed process log is preserved as `logs/timed-smoke-engine.log`. `logs/timed-pre-stop.log` is its earlier snapshot before stopping the process.

| Exact message | Initial interactive process | Timed process before stop |
| --- | ---: | ---: |
| `ERROR: Pre-raster shader (vertex shader) is not provided for pipeline creation.` | 21 | 21 |
| `ERROR: Condition "pipeline.is_null()" is true.` | 21 | 21 |
| `ERROR: Condition "!is_inside_tree()" is true. Returning: Transform3D()` | 2 | 0 |
| `ERROR: [jsb][Error] failed to translate returned value` | 1 | 0 |
| `ERROR: Can't get method on CallableCustom "".` | 1 | 0 |
| `ERROR: Error calling from signal 'pressed' to callable: 'Node3D(game.ts)::': Method not found.` | 1 | 0 |

The missing-shader messages report:

```text
   at: RenderingDevice::render_pipeline_create (servers\rendering\rendering_device.cpp:4134)
```

The null-pipeline messages report:

```text
   at: RendererSceneRenderImplementation::SceneShaderForwardClustered::ShaderData::_create_pipeline (servers\rendering\renderer_rd\forward_clustered\scene_shader_forward_clustered.cpp:502)
```

The transform/callback block is at lines 53-62 of `logs/first-smoke-tail.txt`:

```text
ERROR: Condition "!is_inside_tree()" is true. Returning: Transform3D()
   at: Node3D::get_global_transform (scene\3d\node_3d.cpp:642)
ERROR: Condition "!is_inside_tree()" is true. Returning: Transform3D()
   at: Node3D::get_global_transform (scene\3d\node_3d.cpp:642)
ERROR: [jsb][Error] failed to translate returned value
   at: jsb::Environment::_call (modules\GodotJS\bridge\jsb_environment.cpp:1754)
ERROR: Can't get method on CallableCustom "".
   at: CallableCustom::get_method (core\variant\callable.cpp:454)
ERROR: Error calling from signal 'pressed' to callable: 'Node3D(game.ts)::': Method not found.
   at: Object::emit_signalp (core\object\object.cpp:1406)
```

These appeared in the interactive smoke containing death/menu transitions, a Lag Switch shop purchase and a console-triggered loot-box offer/pick. There is no timestamp or named callable to establish which exact interaction caused them. The purchase persisted and the loot pick visibly applied. The three callback messages may describe a single callback failure; they are not evidence of three distinct failures. No script parse/load error was reported, but the interaction smoke was not error-free.

The timed process added shutdown errors after the pre-stop snapshot, found when reviewing the preserved post-stop log:

- 21 x `ERROR: Invalid Task ID` (lines 88, 90, ..., 128), each followed by `at: WorkerThreadPool::wait_for_task_completion (core\object\worker_thread_pool.cpp:406)`.
- 1 x `ERROR: 1 RID allocations of type 'class NavRegion3D' were leaked at exit.` (line 130).
- 1 x `ERROR: 1 RID allocations of type 'class NavMap3D' were leaked at exit.` (line 131).

No gameplay fixes were made in this release lane.
