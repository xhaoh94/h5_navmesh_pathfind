declare namespace xhh {
    class AStar {
        private static _init;
        private static _cleanUp;
        private static _heap;
        static search(graph: any, start: any, end: any): any[];
        private static _heuristic;
        private static _neighbours;
    }
}
declare namespace xhh {
    class BinaryHeap {
        private content;
        private scoreFunction;
        constructor(scoreFunction: any);
        push(element: any): void;
        pop(): any;
        remove(node: any): void;
        size(): any;
        rescoreElement(node: any): void;
        sinkDown(n: any): void;
        bubbleUp(n: any): void;
    }
}
declare namespace xhh {
    class Channel {
        private portals;
        path: any;
        constructor();
        push(p1: any, p2?: any): void;
        stringPull(): any[];
    }
}
declare namespace xhh {
    class Face {
        private a;
        private b;
        private c;
        constructor(a: any, b: any, c: any);
    }
}
declare namespace xhh {
    class Geometry {
        faces: any[];
        vertices: any[];
        constructor();
        mergeVertices(): number;
    }
}
declare namespace xhh {
    class Pathfinding {
        /**
         *
         * @param vector3Type  (Laya->Laya.Vector3 , cocos->Vec3) 如果没有默认使用自带的Vector3
         */
        constructor(vector3Type: any);
        private zones;
        private _vector3Type;
        /**
         * 创建Geometry
         * @param json 加载的json数据
         */
        createGeometry(json: any): Geometry;
        private newVector;
        /**
         * 生成Zone
         * @param geometry
         */
        buildZone(geometry: Geometry): any;
        private _buildNavigationMesh;
        private _buildPolygonsFromGeometry;
        private _buildPolygonNeighbours;
        private _navMeshConvertZone;
        private _buildPolygonGroups;
        private _getSharedVerticesInOrder;
        /**
         * 根据id保存Zone
         * @param zoneID id
         * @param zone zone
         */
        setZoneData(zoneID: any, zone: any): void;
        /**
         * 获取获取起始点GroupID
         * @param zoneID
         * @param position 起始点
         */
        getGroupID(zoneID: any, position: any): any;
        getRandomNode(zoneID: any, groupID: any, nearPosition: any, nearRange: any): any;
        /**
         * 寻找路劲
         * @param startPosition 起始点
         * @param targetPosition 结束点
         * @param zoneID
         * @param groupID
         */
        findPath(startPosition: any, targetPosition: any, zoneID: any, groupID: any): any;
        private _getNode;
    }
}
declare namespace xhh {
    class Utils {
        static roundNumber(value: number, decimals: number): number;
        static distanceToSquared(a: any, b: any): number;
        static sample(list: any[]): any;
        private static isPointInPoly;
        static isVectorInPolygon(vector: any, polygon: any, vertices: any): boolean;
        static triarea2(a: any, b: any, c: any): number;
        static vequal(a: any, b: any): boolean;
    }
}
declare namespace xhh {
    interface IVector3 {
        x: number;
        y: number;
        z: number;
    }
    class Vector3 {
        constructor(x?: number, y?: number, z?: number);
        x: number;
        y: number;
        z: number;
        static add(inV: IVector3, addV: any, outV: IVector3): void;
        static scale(v: IVector3, scale: number): void;
    }
}
