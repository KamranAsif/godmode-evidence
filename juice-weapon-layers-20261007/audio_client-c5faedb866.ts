import Game from "../../scripts/game";
import { Vector3, type AudioStreamPlayer3D } from "godot";
import { simulationPaused } from "../../scripts/simulation_clock";

// Ignored evidence fixture: real production report APIs and read-only observations.
type ReportCue = "combat-enemy-rifle" | "combat-enemy-pistol" | "combat-enemy-shotgun";
interface LayeredReports { playEnemyGunshot(cue: ReportCue, at: Vector3, ear: Vector3): void; }
export default class AudioClient extends Game {
    private observedVoices(): object[] {
        const pool=(this.audio as unknown as {worldPlayers: AudioStreamPlayer3D[]})?.worldPlayers ?? [];
        return pool.map((voice,index)=>({index,playing:voice.playing,volumeDb:voice.volume_db,
            ceilingDb:voice.max_db,pitch:voice.pitch_scale,source:voice.stream?.resource_path}));
    }
    godot_cli_action(json: string): string {
        const action = JSON.parse(json);
        if (action.name === "juice_lifecycle_observe") {
            const eye=this.camera.global_position;
            return JSON.stringify({ paused:simulationPaused(),audio:this.audio?.inspectionState(),voices:this.observedVoices(),eye:[eye.x,eye.y,eye.z],
                enemies:this.latestSnapshot.systemAdmins.map(e=>({id:e.id,weapon:e.weapon,health:e.health,position:e.position,
                    aim:{yaw:Math.atan2(eye.x-e.position[0],eye.z-e.position[2]),pitch:0},
                    distance:Math.hypot(e.position[0]-eye.x,e.position[1]-eye.y,e.position[2]-eye.z),lastAttackAtMs:e.lastAttackAtMs})) });
        }
        if (action.name === "juice_report_fixture") {
            const cue=String(action.payload.cue);
            const distance=Number(action.payload.distanceMeters);
            if (!this.audio || !["combat-enemy-rifle","combat-enemy-pistol","combat-enemy-shotgun"].includes(cue)
                || !Number.isFinite(distance) || distance<0 || distance>100) return JSON.stringify({accepted:false});
            const ear=this.camera.global_position;
            const at=Vector3.ADD(ear,new Vector3(distance,0,0));
            const beforeVoices=this.observedVoices();
            if (action.payload.variant==="after") (this.audio as unknown as LayeredReports).playEnemyGunshot(cue as ReportCue,at,ear);
            else if (action.payload.variant==="before") this.audio.playWorld(cue as ReportCue,at);
            else return JSON.stringify({accepted:false});
            return JSON.stringify({accepted:true,paused:simulationPaused(),scope:"Controlled source position, production sound API; not an enemy attack",cue,distance,
                beforeVoices,voices:this.observedVoices()});
        }
        return super.godot_cli_action(json);
    }
}
