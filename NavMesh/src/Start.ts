export default class Start extends Laya.Script {
    scene: Laya.Scene3D;
    player: Laya.Sprite3D;
    _ray: Laya.Ray;
    camera: Laya.Camera;
    posX
    posY
    private point: Laya.Vector2 = new Laya.Vector2();
    private out: Laya.HitResult = new Laya.HitResult();
    private navPathfind: xhh.Pathfinding;

    onAwake() {
        console.log(Laya.stage)
        Laya.Scene3D.load("res/scene/LayaScene_SampleScene/Conventional/SampleScene.ls", Laya.Handler.create(this, this.OnSceneLoad));
    }
    /**
     * 当场景加载完成后的回调
     * @param {*加载的场景} scene 
     */
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
        console.log(json)
        this.navPathfind = new xhh.Pathfinding(Laya.Vector3);
        let g = this.navPathfind.createGeometry(json);
        // this.ontest(g)
        let zone = this.navPathfind.buildZone(g)
        this.navPathfind.setZoneData("level", zone);
        this.OnNavMeshLaod();
    }

    ontest(g: xhh.Geometry) {
        let p = g.vertices;

        for (let i = 0; i < p.length; i++) {
            let t = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.2, 0.2, 0.2))            
            t.transform.position = new Laya.Vector3(p[i].x, p[i].y, p[i].z)
            this.scene.addChild(t);
        }
    }
    /**
     * Navmesh加载完成后的回调方法
     */
    OnNavMeshLaod() {
        this.player = this.scene.getChildByName("Player") as Laya.Sprite3D;
        this.camera = this.scene.getChildByName("Main Camera") as Laya.Camera

        this.addMouseEvent();
        //射线初始化（必须初始化）
        this._ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
    }
    private addMouseEvent(): void {
        //鼠标事件监听
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown_test);
    }
    private onMouseDown_test() {
        this.posX = this.point.x = Laya.MouseManager.instance.mouseX;
        this.posY = this.point.y = Laya.MouseManager.instance.mouseY;
        //产生射线
        this.camera.viewportPointToRay(this.point, this._ray);
        //拿到射线碰撞的物体
        this.scene.physicsSimulation.rayCast(this._ray, this.out);
        //如果碰撞到物体
        if (this.out.succeeded) {
            console.log("ray point -->", this.out.point);

            let gid = this.navPathfind.getGroupID("level", this.player.transform.position);
            this.paths = this.navPathfind.findPath(this.player.transform.position, this.out.point, "level", gid)
            if (!this.paths || this.paths.length == 0) {
                return;
            }
            let p = [];
            for (let i = 0; i < this.paths.length; i++) {
                p.push(new Laya.Vector3(this.paths[i].x, this.paths[i].y, this.paths[i].z))
            }
            p = [this.player.transform.position].concat(p);
            for (let i = 0; i < this.pathboxArr.length; i++) {
                this.scene.removeChild(this.pathboxArr[i])
                this.pathboxArr[i].destroy();
            }

            for (let i = 0; i < p.length; i++) {
                let temp = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.2, 0.2, 0.2));
                temp.transform.position = new Laya.Vector3(p[i].x, p[i].y, p[i].z)
                this.scene.addChild(temp)
                this.pathboxArr.push(temp);
            }
            this.index = -1;
            this.findNextPos();

        }
    }

    pathboxArr: Laya.MeshSprite3D[] = [];

    private paths: any[];
    private index: number = -1;
    startPos: Laya.Vector3 = new Laya.Vector3;
    endPos: Laya.Vector3 = new Laya.Vector3;
    tempPos: Laya.Vector3 = new Laya.Vector3;
    curtime: number = 0;
    runtime: number = 0;
    onUpdate() {
        if (!this.paths) return;
        if (this.index == -1) return;
        if (!this.player) return;
        let dt = Laya.timer.delta;
        this.curtime += dt;
        let t = this.curtime / this.runtime;
        if (t > 1) {
            if (!this.findNextPos()) {
                this.paths = null;
                this.index = -1;
            }
        } else {
            Laya.Vector3.lerp(this.startPos, this.endPos, t, this.tempPos);
            this.player.transform.position = this.tempPos;
        }
    }
    private findNextPos() {
        this.index++;
        if (this.index == this.paths.length) return false;
        let t = this.paths[this.index];
        this.startPos = this.player.transform.position.clone();
        this.endPos = new Laya.Vector3(t.x, t.y, t.z);
        let dis = Laya.Vector3.distance(this.startPos, this.endPos);
        this.curtime = 0;
        this.runtime = (dis / 5) * 1000;
        return true;
    }
}