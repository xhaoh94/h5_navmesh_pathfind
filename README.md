# h5_navmesh_pathfind

h5 基于unity NavMesh导航寻路 

通过unity生成的导航数据，导出给H5使用，已经提供了导出工具(需要安装python)

clone下来后
bin/libs目录下的 nav_pathfinding.js 就是我们的主角。这个是我基于three_pathfinding库修改的。
原本那个库是基于three.js，而且有点问题，寻路的时候不会生成路径。而且生成相邻多边形的算法太暴力了，我都自己修改掉了。应该没太大问题。
另外这个我直接剔除了three有关的东西。H5的引擎都可以使用，只需要传入对应Vector3类型就行

这个例子是以Laya为例子
1、把bin/res/navmesh/ 下的MyEditor.cs 放到Unity 工程 。通过Tools/ExportNavMeshData可以导出导航网格obj到bin/res/navmesh/obj/目录下(需要自己选择导出路径) 
2、安装python 已经安装的忽略 （已经提供了安装包 python-3.8.2-amd64.exe）
3、执行bin/res/navmesh/obj2json.bat 会将obj转换成json 到bin/res/navmesh/json/目录下

使用方式：(以laya为例子)
1、	先加载我们生成的json
	let navUrl = "res/Navmesh/json/SampleScene.json";
	Laya.loader.load(navUrl, new Laya.Handler(this, this.OnLoadUrl), null, "json");
	
2、	拿到加载数据后就可以创建 Pathfinding
	OnLoadUrl() {
        let navUrl = "res/Navmesh/json/SampleScene.json";
        var json = Laya.loader.getRes(navUrl);       
        this.navPathfind = new xhh.Pathfinding(Laya.Vector3); //传入Laya.Vector3 没传的话，默认使用库里的Vector3
        let g = this.navPathfind.createGeometry(json);//生成 Geometry        
        let zone = this.navPathfind.buildZone(g) //生成 Zone
        this.navPathfind.setZoneData("level", zone); //setZoneData 两个参数，第一个是key 对应这个场景的Zone        
    }

3、	寻路
	 let gid = this.navPathfind.getGroupID("level", startPos);//先拿groupID
     let paths = this.navPathfind.findPath(startPos, endPos, "level", gid) //获取路径
	 


