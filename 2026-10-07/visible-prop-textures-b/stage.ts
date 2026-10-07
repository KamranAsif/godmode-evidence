import { BoxMesh, MeshInstance3D, Node3D, Vector3 } from "godot";
import { instantiateProductionModel } from "../../scripts/client/production_model_scene";
import { createProductionSupplyCrate } from "../../scripts/client/production_supply_crate";
import { moduleRegistry } from "../../scripts/environment_modules/module_library";
import { moduleMesh, setModuleSlotMaterial } from "../../scripts/environment_modules/module_meshes";
import { MATERIAL_SLOTS } from "../../scripts/environment_modules/module_contract";
import { installFacetedModulePalette, facetedSurfaceMaterial } from "../../scripts/client/faceted_surface";
import { legacyStreetVehicle } from "../../scripts/environment_modules/vehicle_models";

export default class BatchStage extends Node3D {
    private model: Node3D | null = null;
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
        if(name !== "asset")return JSON.stringify({accepted:false});
        if(this.model) {this.remove_child(this.model);this.model.queue_free();this.model=null;}
        let root: Node3D | null = null;
        if(payload.module || payload.vehicle || payload.grass || payload.surface) {
            root = new Node3D(); const mesh = new MeshInstance3D();
            if(payload.surface) {const box=new BoxMesh();box.size=new Vector3(4,2,0.3);mesh.mesh=box;mesh.position=new Vector3(0,1,0);mesh.material_override=facetedSurfaceMaterial([0.62,0.61,0.57],7,0.8,payload.surface);}
            else if(payload.grass) {const box=new BoxMesh();box.size=new Vector3(4,0.15,4);mesh.mesh=box;mesh.position=new Vector3(0,0.075,0);mesh.material_override=facetedSurfaceMaterial([0.24,0.28,0.1],7,1,"grass");}
            else {const definition=payload.vehicle?legacyStreetVehicle(payload.vehicle):moduleRegistry().get(payload.module);mesh.mesh=moduleMesh(definition,payload.variant??0);}
            root.add_child(mesh);
        } else if(payload.crate) root=createProductionSupplyCrate()?.model??null;
        else root=instantiateProductionModel(payload.path);
        if(!root)return JSON.stringify({accepted:false,error:"Missing model",payload});
        this.add_child(root);this.model=root;this.visible=true;
        const nodes = [...root.find_children("*","MeshInstance3D",true,false)] as MeshInstance3D[];
        if(root instanceof MeshInstance3D)nodes.push(root);
        const low=[Infinity,Infinity,Infinity],high=[-Infinity,-Infinity,-Infinity];
        const materials:any[]=[];
        for(const node of nodes) {
            if(!node.mesh)continue;
            const box=node.mesh.get_aabb();
            for(let bits=0;bits<8;bits++) {
                const v=node.to_global(new Vector3(box.position.x+(bits&1?box.size.x:0),box.position.y+(bits&2?box.size.y:0),box.position.z+(bits&4?box.size.z:0)));
                [v.x,v.y,v.z].forEach((value,i)=>{low[i]=Math.min(low[i],value);high[i]=Math.max(high[i],value);});
            }
            for(let s=0;s<node.mesh.get_surface_count();s++) {const m=node.get_active_material(s);materials.push({name:m?.resource_name,class:m?.get_class()});}
        }
        const size=high.map((v,i)=>v-low[i]); const center=high.map((v,i)=>(v+low[i])/2);
        return JSON.stringify({accepted:true,center,size,materials,payload});
    }
}
