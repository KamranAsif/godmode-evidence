import { BoxMesh, Mesh, MeshInstance3D, Node3D, SurfaceTool, Vector3 } from "godot";
import { createSystemAdminCharacter, instantiatePresentationScene, type RiggedCharacter } from "../../scripts/presentation";
import { createProductionMechanical, animateMechanicalParts } from "../../scripts/client/production_mechanical";
import { createProductionAircraft } from "../../scripts/client/production_aircraft";
import { createProductionDog, animateProductionDog } from "../../scripts/client/production_dog";
import { buildFriendlyDog, buildFriendlyRcCar } from "../../scripts/client/friendly_streak_models";
import { createFriendlyDrone, createFriendlyTurret, createFriendlySupplyHelicopter } from "../../scripts/client/production_support";
import { environmentGroundMaterial } from "../../scripts/client/environment_ground_details";
import { installEnemyReadability } from "../../scripts/client/enemy_readability";
import { prepareTriangleFracture, showTriangleFracture, hideTriangleFracture } from "../../scripts/client/triangle_fracture";
import { instantiateProductionModel } from "../../scripts/client/production_model_scene";
import { createProductionSupplyCrate } from "../../scripts/client/production_supply_crate";
import { moduleRegistry } from "../../scripts/environment_modules/module_library";
import { moduleMesh, setModuleSlotMaterial } from "../../scripts/environment_modules/module_meshes";
import { MATERIAL_SLOTS } from "../../scripts/environment_modules/module_contract";
import { installFacetedModulePalette, facetedSurfaceMaterial } from "../../scripts/client/faceted_surface";
import { legacyStreetVehicle } from "../../scripts/environment_modules/vehicle_models";

export default class BatchStage extends Node3D {
    private model: Node3D | null = null;
    private rig: RiggedCharacter | null = null;
    private motion: string | null = null;
    _process(delta: number): void {
        if (!this.motion || !this.model) return;
        this.rig?.animationPlayer?.advance(delta);
        const frame = this.model.find_child("Frame", true, false) as Node3D | null;
        if (frame && this.motion === "dog") animateProductionDog(frame, 2, delta, "none");
        else if (frame && ["drone", "kamikaze", "rccar", "sentry", "helicopter"].includes(this.motion))
            animateMechanicalParts(frame, this.motion as "drone" | "kamikaze" | "rccar" | "sentry" | "helicopter", delta, 2);
    }
    _ready(): void {
        this.position = new Vector3(-402, 180, -380);
        this.visible = false;
        installFacetedModulePalette(MATERIAL_SLOTS, setModuleSlotMaterial);
        const floor = new MeshInstance3D();
        const mesh = new BoxMesh(); mesh.size = new Vector3(60, 0.12, 60); floor.mesh = mesh;
        floor.position = new Vector3(0,-0.06,0); floor.cast_shadow = 0;
        floor.material_override = facetedSurfaceMaterial([0.66,0.645,0.6],7,0.94,"concrete");
        this.add_child(floor);
    }
    godot_cli_action(request: string): string {
        const {name,payload} = JSON.parse(request);
        if(name === "hide") {this.visible=false;return JSON.stringify({accepted:true});}
        if(name === "animate") {this.motion = payload.kind; if(this.rig) this.rig.setAnimation("Walk"); return JSON.stringify({accepted:true});}
        if(name !== "asset")return JSON.stringify({accepted:false});
        if(this.model) {this.remove_child(this.model);this.model.queue_free();this.model=null;}
        this.rig=null;this.motion=null;
        let root: Node3D | null = null;
        if(payload.soldier) {
            this.rig=createSystemAdminCharacter("soldier",payload.soldier);root=this.rig?.root??null;this.rig?.setAnimation("Idle");this.rig?.animationPlayer?.advance(0);
            if(root) {
                installEnemyReadability(root);
                if(payload.soldier==="rifle") {
                    const parts=prepareTriangleFracture(root);if(!parts.length)throw new Error("Missing prepared rifle fracture parts");
                    const resting=parts.map(part=>part.node.get_active_material(0));showTriangleFracture(parts);
                    if(parts.some(part=>part.node.mesh!==part.expanded))throw new Error("Hit mesh swap failed");
                    hideTriangleFracture(parts);
                    if(parts.some((part,i)=>part.node.mesh!==part.original||part.node.get_active_material(0)!==resting[i]))throw new Error("Resting layered material restore failed");
                    root.set_meta("capture_fracture_roundtrip",true);
                }
            }
        }
        else if(payload.mechanical) root=createProductionMechanical(payload.mechanical);
        else if(payload.aircraft) root=createProductionAircraft(payload.aircraft);
        else if(payload.dog) root=payload.dog==="friendly"?buildFriendlyDog():createProductionDog();
        else if(payload.rcxd) root=buildFriendlyRcCar();
        else if(payload.support) root=payload.support==="drone"?createFriendlyDrone().root:payload.support==="sentry"?createFriendlyTurret():createFriendlySupplyHelicopter().root;
        else if(payload.presentation) root=instantiatePresentationScene(payload.presentation);
        else if(payload.ground) {
            const source=this.get_tree()!.root!.find_child(`EnvironmentGround_${payload.ground}`,true,false) as MeshInstance3D|null;
            if(!source?.mesh)return JSON.stringify({accepted:false,error:"Missing native ground detail"});
            const faces=source.mesh.get_faces(); const first=faces.get(0); const origin=source.to_global(first); const tool=new SurfaceTool();tool.begin(Mesh.PrimitiveType.PRIMITIVE_TRIANGLES);
            let triangles=0;const selected:Vector3[][]=[];
            for(let i=0;i<faces.size();i+=3) {
                const vertices=[0,1,2].map(n=>source.to_global(faces.get(i+n)));
                if(vertices.some(v=>Math.hypot(v.x-origin.x,v.z-origin.z)>1))continue;
                selected.push(vertices);triangles++;
            }
            const minY=Math.min(...selected.flat().map(v=>v.y));
            for(const vertices of selected) {
                tool.set_normal(Vector3.SUBTRACT(vertices[2],vertices[0]).cross(Vector3.SUBTRACT(vertices[1],vertices[0])).normalized());
                for(const v of vertices)tool.add_vertex(new Vector3(v.x-origin.x,v.y-minY+0.006,v.z-origin.z));
            }
            root=new Node3D();const mesh=new MeshInstance3D();mesh.mesh=tool.commit();mesh.material_override=environmentGroundMaterial(payload.ground);root.add_child(mesh);
            root.set_meta("native_ground_sample",JSON.stringify({source:String(source.get_path()),origin:[origin.x,origin.y,origin.z],triangles,wholeSourceTriangles:faces.size()/3}));
        }
        else if(payload.module || payload.vehicle || payload.grass || payload.surface) {
            root = new Node3D(); const mesh = new MeshInstance3D();
            if(payload.surface) {const box=new BoxMesh();box.size=new Vector3(4,2,0.3);mesh.mesh=box;mesh.position=new Vector3(0,1,0);mesh.material_override=facetedSurfaceMaterial([0.62,0.61,0.57],7,0.8,payload.surface);}
            else if(payload.grass) {const box=new BoxMesh();box.size=new Vector3(4,0.15,4);mesh.mesh=box;mesh.position=new Vector3(0,0.075,0);mesh.material_override=facetedSurfaceMaterial([0.24,0.28,0.1],7,1,"grass");}
            else {const definition=payload.vehicle?legacyStreetVehicle(payload.vehicle):moduleRegistry().get(payload.module);mesh.mesh=moduleMesh(definition,payload.variant??0);}
            root.add_child(mesh);
        } else if(payload.crate) root=createProductionSupplyCrate()?.model??null;
        else root=instantiateProductionModel(payload.path);
        if(!root)return JSON.stringify({accepted:false,error:"Missing model",payload});
        this.add_child(root);this.model=root;this.visible=true;
        if(payload.focus) {
            root.visible=true;
            const focus=root.find_child(payload.focus,true,false);
            if(!focus)return JSON.stringify({accepted:false,error:"Missing focus",payload});
            let ancestor=focus;
            while(ancestor&&ancestor!==root){if(ancestor instanceof Node3D)ancestor.visible=true;ancestor=ancestor.get_parent()!;}
            // Hidden mesh ancestors also hide their magazine children; mask their geometry instead.
            for(const node of root.find_children("*","MeshInstance3D",true,false))if(node instanceof MeshInstance3D){node.visible=true;node.layers=node===focus||focus.is_ancestor_of(node)?1:0;}
        }
        const nodes = [...root.find_children("*","MeshInstance3D",true,false)] as MeshInstance3D[];
        if(root instanceof MeshInstance3D)nodes.push(root);
        const low=[Infinity,Infinity,Infinity],high=[-Infinity,-Infinity,-Infinity];
        const materials:any[]=[];
        for(const node of nodes) {
            if(!node.mesh || !node.visible || node.layers===0)continue;
            const box=node.mesh.get_aabb();
            for(let bits=0;bits<8;bits++) {
                const v=node.to_global(new Vector3(box.position.x+(bits&1?box.size.x:0),box.position.y+(bits&2?box.size.y:0),box.position.z+(bits&4?box.size.z:0)));
                [v.x,v.y,v.z].forEach((value,i)=>{low[i]=Math.min(low[i],value);high[i]=Math.max(high[i],value);});
            }
            for(let s=0;s<node.mesh.get_surface_count();s++) {const m=node.get_active_material(s);materials.push({name:m?.resource_name,class:m?.get_class()});}
        }
        const floor=this.get_child(0) as MeshInstance3D;
        floor.position=new Vector3(0,low[1]-this.global_position.y-0.065,0);
        const size=high.map((v,i)=>v-low[i]); const center=high.map((v,i)=>(v+low[i])/2);
        const visibleMeshes=nodes.filter(node=>node.mesh&&node.layers!==0&&node.is_visible_in_tree()).length;
        if(payload.focus&&!visibleMeshes)throw new Error("Focused native geometry is hidden");
        return JSON.stringify({accepted:true,center,size,materials,payload,visibleMeshes,nativeGroundSample:root.has_meta("native_ground_sample")?root.get_meta("native_ground_sample"):null,fractureRoundtrip:root.has_meta("capture_fracture_roundtrip")?root.get_meta("capture_fracture_roundtrip"):false});
    }
}
