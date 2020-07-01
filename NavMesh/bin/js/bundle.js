(function () {
    'use strict';

    class Start extends Laya.Script {
        constructor() {
            super(...arguments);
            this.point = new Laya.Vector2();
            this.out = new Laya.HitResult();
            this.pathboxArr = [];
            this.index = -1;
            this.startPos = new Laya.Vector3;
            this.endPos = new Laya.Vector3;
            this.tempPos = new Laya.Vector3;
            this.curtime = 0;
            this.runtime = 0;
        }
        onAwake() {
            console.log(Laya.stage);
            Laya.Scene3D.load("res/scene/LayaScene_SampleScene/Conventional/SampleScene.ls", Laya.Handler.create(this, this.OnSceneLoad));
        }
        OnSceneLoad(scene) {
            Laya.stage.addChild(scene);
            this.scene = scene;
            scene.zOrder = -1;
            let navUrl = "res/navmesh/json/SampleScene.json";
            Laya.loader.load(navUrl, new Laya.Handler(this, this.OnLoadUrl), null, "json");
        }
        OnLoadUrl() {
            let navUrl = "res/navmesh/json/SampleScene.json";
            var json = Laya.loader.getRes(navUrl);
            console.log(json);
            this.navPathfind = new xhh.Pathfinding(Laya.Vector3);
            let g = this.navPathfind.createGeometry(json);
            let zone = this.navPathfind.buildZone(g);
            this.navPathfind.setZoneData("level", zone);
            this.OnNavMeshLaod();
        }
        ontest(g) {
            let p = g.vertices;
            for (let i = 0; i < p.length; i++) {
                let t = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.2, 0.2, 0.2));
                t.transform.position = new Laya.Vector3(p[i].x, p[i].y, p[i].z);
                this.scene.addChild(t);
            }
        }
        OnNavMeshLaod() {
            this.player = this.scene.getChildByName("Player");
            this.camera = this.scene.getChildByName("Main Camera");
            this.addMouseEvent();
            this._ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
        }
        addMouseEvent() {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown_test);
        }
        onMouseDown_test() {
            this.posX = this.point.x = Laya.MouseManager.instance.mouseX;
            this.posY = this.point.y = Laya.MouseManager.instance.mouseY;
            this.camera.viewportPointToRay(this.point, this._ray);
            this.scene.physicsSimulation.rayCast(this._ray, this.out);
            if (this.out.succeeded) {
                console.log("ray point -->", this.out.point);
                let gid = this.navPathfind.getGroupID("level", this.player.transform.position);
                this.paths = this.navPathfind.findPath(this.player.transform.position, this.out.point, "level", gid);
                if (!this.paths || this.paths.length == 0) {
                    return;
                }
                let p = [];
                for (let i = 0; i < this.paths.length; i++) {
                    p.push(new Laya.Vector3(this.paths[i].x, this.paths[i].y, this.paths[i].z));
                }
                p = [this.player.transform.position].concat(p);
                for (let i = 0; i < this.pathboxArr.length; i++) {
                    this.scene.removeChild(this.pathboxArr[i]);
                    this.pathboxArr[i].destroy();
                }
                for (let i = 0; i < p.length; i++) {
                    let temp = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.2, 0.2, 0.2));
                    temp.transform.position = new Laya.Vector3(p[i].x, p[i].y, p[i].z);
                    this.scene.addChild(temp);
                    this.pathboxArr.push(temp);
                }
                this.index = -1;
                this.findNextPos();
            }
        }
        onUpdate() {
            if (!this.paths)
                return;
            if (this.index == -1)
                return;
            if (!this.player)
                return;
            let dt = Laya.timer.delta;
            this.curtime += dt;
            let t = this.curtime / this.runtime;
            if (t > 1) {
                if (!this.findNextPos()) {
                    this.paths = null;
                    this.index = -1;
                }
            }
            else {
                Laya.Vector3.lerp(this.startPos, this.endPos, t, this.tempPos);
                this.player.transform.position = this.tempPos;
            }
        }
        findNextPos() {
            this.index++;
            if (this.index == this.paths.length)
                return false;
            let t = this.paths[this.index];
            this.startPos = this.player.transform.position.clone();
            this.endPos = new Laya.Vector3(t.x, t.y, t.z);
            let dis = Laya.Vector3.distance(this.startPos, this.endPos);
            this.curtime = 0;
            this.runtime = (dis / 5) * 1000;
            return true;
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Start.ts", Start);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "Start.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
