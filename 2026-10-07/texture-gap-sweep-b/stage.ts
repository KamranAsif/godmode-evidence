import { BoxMesh, Mesh, MeshInstance3D, Node3D, SurfaceTool, Vector3, Color, ShaderMaterial } from "godot";
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
import { moduleMesh, setModuleSlotMaterial, vegetationMaterial, moduleSlotMaterial } from "../../scripts/environment_modules/module_meshes";
import { MATERIAL_SLOTS } from "../../scripts/environment_modules/module_contract";
import { installFacetedModulePalette, facetedSurfaceMaterial } from "../../scripts/client/faceted_surface";
import { legacyStreetVehicle } from "../../scripts/environment_modules/vehicle_models";

import { streetDressingMaterial } from "../../scripts/street_dressing";
import { streetColourMaterial } from "../../scripts/client/street_prop_material";
import { westernBlockMaterial } from "../../scripts/client/western_block_materials";

import { rewardMarker } from "../../scripts/client/pickup_markers";
import { CITY_HORIZON_MODULES } from "../../scripts/environment_modules/city_horizon_modules.generated";

export default class BatchStage extends Node3D {
    private model: Node3D | null = null;
    private rig: RiggedCharacter | null = null;
    private motion: string | null = null;
    _process(delta: number): void {
        if (!this.motion || !this.model) return;
        this.rig?.animationPlayer?.advance(delta);
        if(this.motion === "reward") this.model.rotate_y(delta * 0.7);
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
        floor.material_override = streetColourMaterial([0.66,0.645,0.6],"concrete");
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
        else if(payload.soil) {
            root=new Node3D(); const mesh=new MeshInstance3D();const box=new BoxMesh();box.size=new Vector3(2,0.18,1.5);mesh.mesh=box;mesh.position=new Vector3(0,0.09,0);
            mesh.material_override=payload.soil==="vegetation"?vegetationMaterial("soil"):payload.soil==="western"?westernBlockMaterial("soil"):payload.soil==="dressing"?streetDressingMaterial("soil"):moduleSlotMaterial("soil") as ShaderMaterial;root.add_child(mesh);
        }
        else if(payload.reward) {root=new Node3D();rewardMarker(root,payload.reward);}
        else if(payload.native) root=this.nativeSample(payload);
        else if(payload.module) {root=new Node3D();const mesh=new MeshInstance3D();mesh.mesh=moduleMesh(moduleRegistry().get(payload.module),payload.variant??0);root.add_child(mesh);}
        else if(payload.crate) root=createProductionSupplyCrate()?.model??null;
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
            for(let s=0;s<node.mesh.get_surface_count();s++) {const m=node.get_active_material(s);materials.push({name:m?.resource_name,class:m?.get_class(),shader:m instanceof ShaderMaterial?m.shader?.resource_path:null,grain:m instanceof ShaderMaterial?Object.fromEntries(["material_texture_enabled","material_albedo_strength","material_normal_strength","material_detail_strength","wall_texture_enabled","wall_facet_strength","facet_strength"].map(key=>[key,m.get_shader_parameter(key)])):null});}
        }
        const floor=this.get_child(0) as MeshInstance3D;
        floor.position=new Vector3(0,low[1]-this.global_position.y-0.065,0);
        const size=high.map((v,i)=>v-low[i]); const center=high.map((v,i)=>(v+low[i])/2);
        const visibleMeshes=nodes.filter(node=>node.mesh&&node.layers!==0&&node.is_visible_in_tree()).length;
        if(payload.focus&&!visibleMeshes)throw new Error("Focused native geometry is hidden");
        return JSON.stringify({accepted:true,center,size,materials,payload,visibleMeshes,nativeSample:root.has_meta("native_sample")?JSON.parse(String(root.get_meta("native_sample"))):null,fractureRoundtrip:root.has_meta("capture_fracture_roundtrip")?root.get_meta("capture_fracture_roundtrip"):false});
    }
    private nativeSample(payload:any):Node3D|null {
        const source=[...this.get_tree()!.root!.find_children(payload.native,"MeshInstance3D",true,false)].find(node=>node instanceof MeshInstance3D&&!this.is_ancestor_of(node)) as MeshInstance3D|undefined;
        if(!source?.mesh)throw Error(`Missing native mesh ${payload.native}`);
        let surface=payload.surface??0;
        if(payload.slot){const def=CITY_HORIZON_MODULES.find(d=>d.id===String(source.get_name()));if(!def)throw Error("Missing horizon definition");surface=Object.keys(def.build(0)).indexOf(payload.slot);if(surface<0)throw Error(`Missing horizon slot ${payload.slot}`);}
        const arrays=source.mesh.surface_get_arrays(surface);
        const raw=(key:number)=>{const value=arrays.get(key) as any;return value?.size?.()?value.to_byte_array().to_array_buffer():new ArrayBuffer(0);};
        const vertices=new Float32Array(raw(Mesh.ArrayType.ARRAY_VERTEX));
        const indices=new Uint32Array(raw(Mesh.ArrayType.ARRAY_INDEX));
        const colours=new Float32Array(raw(Mesh.ArrayType.ARRAY_COLOR));
        const normals=new Float32Array(raw(Mesh.ArrayType.ARRAY_NORMAL));
        const count=indices.length;
        const index=(i:number)=>count?indices[i]:i;
        const transform=source.global_transform;
        const basis=transform.basis,normalBasis=basis.inverse().transposed();
        const matrix=(b:any)=>[b.x,b.y,b.z].map(v=>[v.x,v.y,v.z]);
        const axes=matrix(basis),normalAxes=matrix(normalBasis);
        const offset=[transform.origin.x,transform.origin.y,transform.origin.z];
        const mul=(m:number[][],v:number[])=>[0,1,2].map(a=>m[0][a]*v[0]+m[1][a]*v[1]+m[2][a]*v[2]);
        const at=(i:number)=>mul(axes,[vertices[index(i)*3],vertices[index(i)*3+1],vertices[index(i)*3+2]]).map((v,a)=>v+offset[a]);
        let selected=0,largest=0;
        for(let i=0;i<(count||vertices.length/3);i+=3){const ni=index(i)*3;const n=mul(normalAxes,[normals[ni],normals[ni+1],normals[ni+2]]);if(n[1]/Math.hypot(...n)<-.2)continue;const p=[at(i),at(i+1),at(i+2)],a=p[1].map((v,j)=>v-p[0][j]),b=p[2].map((v,j)=>v-p[0][j]);const area=Math.hypot(a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]);if(area>largest){largest=area;selected=i;}}
        const selectedIndex=index(selected)*3,selectedNormal=mul(normalAxes,[normals[selectedIndex],normals[selectedIndex+1],normals[selectedIndex+2]]),normalLength=Math.hypot(...selectedNormal),viewNormal=selectedNormal.map(v=>v/normalLength);
        const first=[at(selected),at(selected+1),at(selected+2)];
        const origin=[0,1,2].map(a=>(first[0][a]+first[1][a]+first[2][a])/3);
        const radius=payload.radius??2;
        const tool=new SurfaceTool();tool.begin(Mesh.PrimitiveType.PRIMITIVE_TRIANGLES);
        let triangles=0;
        type V={p:number[],c:number[]};
        const clip=(poly:V[],axis:number,sign:number):V[]=>{
            const result:V[]=[];
            for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length];const da=radius-sign*a.p[axis],db=radius-sign*b.p[axis];if(da>=0)result.push(a);if((da>=0)!==(db>=0)){const t=da/(da-db);result.push({p:a.p.map((v,j)=>v+(b.p[j]-v)*t),c:a.c.map((v,j)=>v+(b.c[j]-v)*t)});}}
            return result;
        };
        for(let i=0;i<(count||vertices.length/3);i+=3){
            const original=[0,1,2].map(n=>at(i+n));
            if([0,1,2].some(a=>original.every(v=>v[a]<origin[a]-radius)||original.every(v=>v[a]>origin[a]+radius)))continue;
            let poly:V[]=original.map((v,n)=>{const ci=index(i+n)*4;return{p:v.map((value,a)=>value-origin[a]),c:colours.length?[colours[ci],colours[ci+1],colours[ci+2],colours[ci+3]]:[1,1,1,1]};});
            for(let axis=0;axis<3;axis++){poly=clip(poly,axis,1);poly=clip(poly,axis,-1);if(poly.length<3)break;}
            if(poly.length<3)continue;
            const ni=index(i)*3;const n=mul(normalAxes,[normals[ni],normals[ni+1],normals[ni+2]]);const length=Math.hypot(...n);if(!length)throw Error("Native crop has no source normal");
            const normal=new Vector3(n[0]/length,n[1]/length,n[2]/length);
            for(let n=1;n<poly.length-1;n++){for(const v of [poly[0],poly[n],poly[n+1]]){tool.set_normal(normal);tool.set_color(new Color(v.c[0],v.c[1],v.c[2],v.c[3]));tool.add_vertex(new Vector3(...v.p as [number,number,number]));}triangles++;}
        }
        if(!triangles)throw Error("Empty native crop");
        const root=new Node3D(),mesh=new MeshInstance3D();mesh.mesh=tool.commit();mesh.material_override=source.get_active_material(surface) as any;root.add_child(mesh);
        const names:string[]=[];let node:any=source;while(node){names.unshift(String(node.get_name()));node=node.get_parent();}
        root.set_meta("native_sample",JSON.stringify({source:"/"+names.join("/"),surface,slot:payload.slot??null,origin,radius,viewNormal,selectedTriangle:selected/3,triangles,wholeSourceTriangles:(count||vertices.length/3)/3,method:"Clip native production triangles to a metre-scale box; retain face normals, vertex colours, material and physical scale."}));
        return root;
    }

}
