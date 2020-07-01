var xhh;
(function (xhh) {
    class AStar {
        static _init(graph) {
            for (let x = 0; x < graph.length; x++) {
                //for(var x in graph) {
                const node = graph[x];
                node.f = 0;
                node.g = 0;
                node.h = 0;
                node.cost = 1.0;
                node.visited = false;
                node.closed = false;
                node.parent = null;
            }
        }
        static _cleanUp(graph) {
            for (let x = 0; x < graph.length; x++) {
                const node = graph[x];
                delete node.f;
                delete node.g;
                delete node.h;
                delete node.cost;
                delete node.visited;
                delete node.closed;
                delete node.parent;
            }
        }
        static _heap() {
            return new xhh.BinaryHeap(function (node) {
                return node.f;
            });
        }
        static search(graph, start, end) {
            this._init(graph);
            //heuristic = heuristic || astar.manhattan;
            const openHeap = this._heap();

            openHeap.push(start);
            while (openHeap.size() > 0) {
                // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
                const currentNode = openHeap.pop();
                // End case -- result has been found, return the traced path.
                if (currentNode === end) {
                    let curr = currentNode;
                    const ret = [];
                    while (curr.parent) {
                        ret.unshift(curr);
                        curr = curr.parent;
                    }
                    this._cleanUp(ret);
                    return ret;
                }
                currentNode.closed = true;
                const neighbours = this._neighbours(graph, currentNode);
                for (let i = 0, il = neighbours.length; i < il; i++) {
                    const neighbour = neighbours[i];
                    if (neighbour.closed) {
                        // Not a valid node to process, skip to next neighbour.
                        continue;
                    }
                    // The g score is the shortest distance from start to current node.
                    // We need to check if the path we have arrived at this neighbour is the shortest one we have seen yet.  
                    let g = this._heuristic(neighbour.centroid, currentNode.centroid);
                    const gScore = currentNode.g + neighbour.cost + g;
                    const beenVisited = neighbour.visited;
                    if (!beenVisited || gScore < neighbour.g) {
                        // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                        neighbour.visited = true;
                        neighbour.parent = currentNode;
                        if (!neighbour.centroid || !end.centroid)
                            return []
                        neighbour.h = neighbour.h || this._heuristic(neighbour.centroid, end.centroid);
                        neighbour.g = gScore;
                        neighbour.f = neighbour.g + neighbour.h;
                        if (!beenVisited) {
                            // Pushing to heap will put it in proper place based on the 'f' value.
                            openHeap.push(neighbour);
                        }
                        else {
                            // Already seen the node, but since it has been rescored we need to reorder it in the heap
                            openHeap.rescoreElement(neighbour);
                        }
                    }
                }
            }
            // No result was found - empty array signifies failure to find path.
            return [];
        }
        static _heuristic(pos0, pos1) {
            return xhh.Utils.distanceToSquared(pos0, pos1);
        }
        static _neighbours(graph, node) {
            const ret = [];
            for (let e = 0; e < node.neighbours.length; e++) {
                ret.push(graph[node.neighbours[e]]);
            }
            return ret;
        }
    }
    xhh.AStar = AStar;
})(xhh || (xhh = {}));
var xhh;
(function (xhh) {
    class BinaryHeap {
        constructor(scoreFunction) {
            this.content = [];
            this.scoreFunction = scoreFunction;
        }
        push(element) {
            // Add the new element to the end of the array.
            this.content.push(element);
            // Allow it to sink down.
            this.sinkDown(this.content.length - 1);
        }
        pop() {
            // Store the first element so we can return it later.
            const result = this.content[0];
            // Get the element at the end of the array.
            const end = this.content.pop();
            // If there are any elements left, put the end element at the
            // start, and let it bubble up.
            if (this.content.length > 0) {
                this.content[0] = end;
                this.bubbleUp(0);
            }
            return result;
        }
        remove(node) {
            const i = this.content.indexOf(node);
            // When it is found, the process seen in 'pop' is repeated
            // to fill up the hole.
            const end = this.content.pop();
            if (i !== this.content.length - 1) {
                this.content[i] = end;
                if (this.scoreFunction(end) < this.scoreFunction(node)) {
                    this.sinkDown(i);
                }
                else {
                    this.bubbleUp(i);
                }
            }
        }
        size() {
            return this.content.length;
        }
        rescoreElement(node) {
            this.sinkDown(this.content.indexOf(node));
        }
        sinkDown(n) {
            // Fetch the element that has to be sunk.
            const element = this.content[n];
            // When at 0, an element can not sink any further.
            while (n > 0) {
                // Compute the parent element's index, and fetch it.
                const parentN = ((n + 1) >> 1) - 1;
                const parent = this.content[parentN];
                if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                    // Swap the elements if the parent is greater.
                    this.content[parentN] = element;
                    this.content[n] = parent;
                    // Update 'n' to continue at the new position.
                    n = parentN;
                }
                else {
                    // Found a parent that is less, no need to sink any further.
                    break;
                }
            }
        }
        bubbleUp(n) {
            // Look up the target element and its score.
            const length = this.content.length, element = this.content[n], elemScore = this.scoreFunction(element);
            while (true) {
                // Compute the indices of the child elements.
                const child2N = (n + 1) << 1, child1N = child2N - 1;
                // This is used to store the new position of the element,
                // if any.
                let swap = null;
                let child1Score;
                // If the first child exists (is inside the array)...
                if (child1N < length) {
                    // Look it up and compute its score.
                    const child1 = this.content[child1N];
                    child1Score = this.scoreFunction(child1);
                    // If the score is less than our element's, we need to swap.
                    if (child1Score < elemScore) {
                        swap = child1N;
                    }
                }
                // Do the same checks for the other child.
                if (child2N < length) {
                    const child2 = this.content[child2N], child2Score = this.scoreFunction(child2);
                    if (child2Score < (swap === null ? elemScore : child1Score)) {
                        swap = child2N;
                    }
                }
                // If the element needs to be moved, swap it, and continue.
                if (swap !== null) {
                    this.content[n] = this.content[swap];
                    this.content[swap] = element;
                    n = swap;
                }
                // Otherwise, we are done.
                else {
                    break;
                }
            }
        }
    }
    xhh.BinaryHeap = BinaryHeap;
})(xhh || (xhh = {}));
var xhh;
(function (xhh) {
    class Channel {
        constructor() {
            this.portals = [];
        }
        push(p1, p2 = undefined) {
            if (p2 === undefined)
                p2 = p1;
            this.portals.push({
                left: p1,
                right: p2
            });
        }
        stringPull() {
            const portals = this.portals;
            const pts = [];
            // Init scan state
            let portalApex, portalLeft, portalRight;
            let apexIndex = 0, leftIndex = 0, rightIndex = 0;
            portalApex = portals[0].left;
            portalLeft = portals[0].left;
            portalRight = portals[0].right;
            // Add start point.
            pts.push(portalApex);
            for (let i = 1; i < portals.length; i++) {
                const left = portals[i].left;
                const right = portals[i].right;
                // Update right vertex.
                if (xhh.Utils.triarea2(portalApex, portalRight, right) <= 0.0) {
                    if (xhh.Utils.vequal(portalApex, portalRight) || xhh.Utils.triarea2(portalApex, portalLeft, right) > 0.0) {
                        // Tighten the funnel.
                        portalRight = right;
                        rightIndex = i;
                    }
                    else {
                        // Right over left, insert left to path and restart scan from portal left point.
                        pts.push(portalLeft);
                        // Make current left the new apex.
                        portalApex = portalLeft;
                        apexIndex = leftIndex;
                        // Reset portal
                        portalLeft = portalApex;
                        portalRight = portalApex;
                        leftIndex = apexIndex;
                        rightIndex = apexIndex;
                        // Restart scan
                        i = apexIndex;
                        continue;
                    }
                }
                // Update left vertex.
                if (xhh.Utils.triarea2(portalApex, portalLeft, left) >= 0.0) {
                    if (xhh.Utils.vequal(portalApex, portalLeft) || xhh.Utils.triarea2(portalApex, portalRight, left) < 0.0) {
                        // Tighten the funnel.
                        portalLeft = left;
                        leftIndex = i;
                    }
                    else {
                        // Left over right, insert right to path and restart scan from portal right point.
                        pts.push(portalRight);
                        // Make current right the new apex.
                        portalApex = portalRight;
                        apexIndex = rightIndex;
                        // Reset portal
                        portalLeft = portalApex;
                        portalRight = portalApex;
                        leftIndex = apexIndex;
                        rightIndex = apexIndex;
                        // Restart scan
                        i = apexIndex;
                        continue;
                    }
                }
            }
            if ((pts.length === 0) || (!xhh.Utils.vequal(pts[pts.length - 1], portals[portals.length - 1].left))) {
                // Append last point to path.
                pts.push(portals[portals.length - 1].left);
            }
            this.path = pts;
            return pts;
        }
    }
    xhh.Channel = Channel;
})(xhh || (xhh = {}));
var xhh;
(function (xhh) {
    class Face {
        constructor(a, b, c) {
            this.c = 0;
            this.b = 0;
            this.a = 0;
            this.c = c;
            this.b = b;
            this.a = a;
        }
    }
    xhh.Face = Face;
})(xhh || (xhh = {}));
var xhh;
(function (xhh) {
    class Geometry {
        constructor() {
            this.faces = [];
            this.vertices = [];
        }
        mergeVertices() {
            var verticesMap = {};
            var unique = new Array, changes = [];
            var v, key;
            var precisionPoints = 4;
            var precision = Math.pow(10, precisionPoints);
            var i, il, face;
            var indices, j, jl;
            for (i = 0, il = this.vertices.length; i < il; i++) {
                v = this.vertices[i];
                key = Math.round(v.x * precision) + '_' + Math.round(v.y * precision) + '_' + Math.round(v.z * precision);
                if (verticesMap[key] == null) {
                    verticesMap[key] = i;
                    unique.push(v);
                    changes[i] = unique.length - 1;
                }
                else {
                    changes[i] = changes[verticesMap[key]];
                }
            }
            ;
            var faceIndicesToRemove = [];
            for (i = 0, il = this.faces.length; i < il; i++) {
                face = this.faces[i];
                face.a = changes[face.a];
                face.b = changes[face.b];
                face.c = changes[face.c];
                indices = [face.a, face.b, face.c];
                var dupIndex = -1;
                for (var n = 0; n < 3; n++) {
                    if (indices[n] == indices[(n + 1) % 3]) {
                        dupIndex = n;
                        faceIndicesToRemove.push(i);
                        break;
                    }
                }
            }
            for (i = faceIndicesToRemove.length - 1; i >= 0; i--) {
                var idx = faceIndicesToRemove[i];
                this.faces.splice(idx, 1);
            }
            ;
            var diff = this.vertices.length - unique.length;
            this.vertices = unique;
            return diff;
        }
    }
    xhh.Geometry = Geometry;
})(xhh || (xhh = {}));
var xhh;
(function (xhh) {
    class Pathfinding {
        /**
         *
         * @param vector3Type  (Laya->Laya.Vector3 , cocos->Vec3) 如果没有默认使用自带的Vector3
         */
        constructor(vector3Type) {
            this.zones = {};
            this._vector3Type = vector3Type;
        }
        /**
         * 创建Geometry
         * @param json 加载的json数据
         */
        createGeometry(json) {
            let p2 = json.vertices;
            let ii = json.faces;
            let faces = [];
            for (let i = 0; i < ii.length / 5; i++) {
                faces.push(new xhh.Face(ii[i * 5 + 1], ii[i * 5 + 2], ii[i * 5 + 3]));
            }
            let p = [];
            for (let i = 0; i < p2.length; i += 3) {
                p.push(this.newVector(p2[i], p2[i + 1], p2[i + 2]));
            }
            let g = new xhh.Geometry();
            g.faces = faces;
            g.vertices = p;
            return g;
        }
        newVector(x = 0, y = 0, z = 0) {
            if (this._vector3Type == null) {
                return new xhh.Vector3(x, y, z);
            }
            return new this._vector3Type(x, y, z);
        }
        /**
         * 生成Zone
         * @param geometry
         */
        buildZone(geometry) {
            let navMesh = this._buildNavigationMesh(geometry);
            let zone = this._navMeshConvertZone(navMesh);
            return zone;
        }
        _buildNavigationMesh(geometry) {
            geometry.mergeVertices();
            return this._buildPolygonsFromGeometry(geometry);
        }
        _buildPolygonsFromGeometry(geometry) {
            const polygons = [];
            const vertices = geometry.vertices;
            const vertexPolygonMap = new Array(vertices.length); // array of polygon objects by vertex index
            for (let i = 0; i < vertices.length; i++) {
                vertexPolygonMap[i] = [];
            }
            // Convert the faces into a custom format that supports more than 3 vertices
            geometry.faces.forEach((face) => {
                const poly = { vertexIds: [face.a, face.b, face.c], neighbours: null };
                polygons.push(poly);
                vertexPolygonMap[face.a].push(poly);
                vertexPolygonMap[face.b].push(poly);
                vertexPolygonMap[face.c].push(poly);
            });
            polygons.forEach((polygon) => {
                polygon.neighbours = this._buildPolygonNeighbours(polygon, vertexPolygonMap);
            });
            return {
                polygons: polygons,
                vertices: vertices
            };
        }
        _buildPolygonNeighbours(polygon, vertexPolygonMap) {
            const neighbours = [];
            const groupA = vertexPolygonMap[polygon.vertexIds[0]];
            const groupB = vertexPolygonMap[polygon.vertexIds[1]];
            const groupC = vertexPolygonMap[polygon.vertexIds[2]];
            groupA.forEach((candidate) => {
                if (candidate === polygon)
                    return;
                if (groupB.includes(candidate) || groupC.includes(candidate)) {
                    neighbours.push(candidate);
                }
            });
            groupB.forEach((candidate) => {
                if (candidate === polygon)
                    return;
                if (groupC.includes(candidate)) {
                    neighbours.push(candidate);
                }
            });
            return neighbours;
        }
        _navMeshConvertZone(navMesh) {
            const zone = {};
            navMesh.vertices.forEach((v) => {
                v.x = xhh.Utils.roundNumber(v.x, 2);
                v.y = xhh.Utils.roundNumber(v.y, 2);
                v.z = xhh.Utils.roundNumber(v.z, 2);
            });
            zone.vertices = navMesh.vertices;
            const groups = this._buildPolygonGroups(navMesh);
            // TODO: This block represents a large portion of navigation mesh construction time
            // and could probably be optimized. For example, construct portals while
            // determining the neighbor graph.
            zone.groups = new Array(groups.length);
            let findPolygonIndex = function (group, p) {
                for (var i = 0; i < group.length; i++) {
                    if (p === group[i])
                        return i;
                }
            };
            groups.forEach((group, groupIndex) => {
                const newGroup = new Array(group.length);
                group.forEach((poly, polyIndex) => {
                    const neighbourIndices = [];
                    poly.neighbours.forEach((n) => neighbourIndices.push(findPolygonIndex(group, n)));
                    // Build a portal list to each neighbour
                    const portals = [];
                    poly.neighbours.forEach((n) => portals.push(this._getSharedVerticesInOrder(poly, n)));
                    const centroid = this.newVector();
                    xhh.Vector3.add(centroid, zone.vertices[poly.vertexIds[0]], centroid);
                    xhh.Vector3.add(centroid, zone.vertices[poly.vertexIds[1]], centroid);
                    xhh.Vector3.add(centroid, zone.vertices[poly.vertexIds[2]], centroid);
                    xhh.Vector3.scale(centroid, 1 / 3);
                    centroid.x = xhh.Utils.roundNumber(centroid.x, 2);
                    centroid.y = xhh.Utils.roundNumber(centroid.y, 2);
                    centroid.z = xhh.Utils.roundNumber(centroid.z, 2);
                    newGroup[polyIndex] = {
                        id: polyIndex,
                        neighbours: neighbourIndices,
                        vertexIds: poly.vertexIds,
                        centroid: centroid,
                        portals: portals
                    };
                });
                zone.groups[groupIndex] = newGroup;
            });
            return zone;
        }
        _buildPolygonGroups(navigationMesh) {
            const polygons = navigationMesh.polygons;
            const polygonGroups = [];
            const spreadGroupId = function (polygon) {
                polygon.neighbours.forEach((neighbour) => {
                    if (neighbour.group === undefined) {
                        neighbour.group = polygon.group;
                        spreadGroupId(neighbour);
                    }
                });
            };
            polygons.forEach((polygon) => {
                if (polygon.group !== undefined) {
                    // this polygon is already part of a group
                    polygonGroups[polygon.group].push(polygon);
                }
                else {
                    // we need to make a new group and spread its ID to neighbors
                    polygon.group = polygonGroups.length;
                    spreadGroupId(polygon);
                    polygonGroups.push([polygon]);
                }
            });
            return polygonGroups;
        }
        _getSharedVerticesInOrder(a, b) {
            const aList = a.vertexIds;
            const a0 = aList[0], a1 = aList[1], a2 = aList[2];
            const bList = b.vertexIds;
            const shared0 = bList.includes(a0);
            const shared1 = bList.includes(a1);
            const shared2 = bList.includes(a2);
            // it seems that we shouldn't have an a and b with <2 shared vertices here unless there's a bug
            // in the neighbor identification code, or perhaps a malformed input geometry; 3 shared vertices
            // is a kind of embarrassing but possible geometry we should handle
            if (shared0 && shared1 && shared2) {
                return Array.from(aList);
            }
            else if (shared0 && shared1) {
                return [a0, a1];
            }
            else if (shared1 && shared2) {
                return [a1, a2];
            }
            else if (shared0 && shared2) {
                return [a2, a0]; // this ordering will affect the string pull algorithm later, not clear if significant
            }
            else {
                console.warn("Error processing navigation mesh neighbors; neighbors with <2 shared vertices found.");
                return [];
            }
        }
        /**
         * 根据id保存Zone
         * @param zoneID id
         * @param zone zone
         */
        setZoneData(zoneID, zone) {
            this.zones[zoneID] = zone;
        }
        /**
         * 获取获取起始点GroupID
         * @param zoneID
         * @param position 起始点
         */
        getGroupID(zoneID, position) {
            if (!this.zones[zoneID])
                return null;
            let closestNodeGroup = null;
            let distance = Math.pow(50, 2);
            const zone = this.zones[zoneID];
            for (let i = 0; i < zone.groups.length; i++) {
                const group = zone.groups[i];
                for (const node of group) {
                    const measuredDistance = xhh.Utils.distanceToSquared(node.centroid, position);
                    if (measuredDistance < distance) {
                        closestNodeGroup = i;
                        distance = measuredDistance;
                    }
                }
            }
            return closestNodeGroup;
        }
        getRandomNode(zoneID, groupID, nearPosition, nearRange) {
            if (!this.zones[zoneID])
                return this.newVector();
            nearPosition = nearPosition || null;
            nearRange = nearRange || 0;
            const candidates = [];
            const polygons = this.zones[zoneID].groups[groupID];
            polygons.forEach((p) => {
                if (nearPosition && nearRange) {
                    if (xhh.Utils.distanceToSquared(nearPosition, p.centroid) < nearRange * nearRange) {
                        candidates.push(p.centroid);
                    }
                }
                else {
                    candidates.push(p.centroid);
                }
            });
            return xhh.Utils.sample(candidates) || this.newVector();
        }
        /**
         * 寻找路劲
         * @param startPosition 起始点
         * @param targetPosition 结束点
         * @param zoneID
         * @param groupID
         */
        findPath(startPosition, targetPosition, zoneID, groupID) {
            const nodes = this.zones[zoneID].groups[groupID];
            const vertices = this.zones[zoneID].vertices;
            const closestNode = this._getNode(startPosition, zoneID, groupID);
            const farthestNode = this._getNode(targetPosition, zoneID, groupID, true);
            // If we can't find any node, just go straight to the target
            if (!closestNode || !farthestNode) {
                return null;
            }
            const paths = xhh.AStar.search(nodes, closestNode, farthestNode);
            const getPortalFromTo = function (a, b) {
                for (var i = 0; i < a.neighbours.length; i++) {
                    if (a.neighbours[i] === b.id) {
                        return a.portals[i];
                    }
                }
            };
            // We have the corridor, now pull the rope.
            const channel = new xhh.Channel();
            channel.push(startPosition);
            for (let i = 0; i < paths.length; i++) {
                const polygon = paths[i];
                const nextPolygon = paths[i + 1];
                if (nextPolygon) {
                    const portals = getPortalFromTo(polygon, nextPolygon);
                    channel.push(vertices[portals[0]], vertices[portals[1]]);
                }
            }
            channel.push(targetPosition);
            channel.stringPull();
            // Return the path, omitting first position (which is already known).
            const path = channel.path.map((c) => new xhh.Vector3(c.x, c.y, c.z));
            path.shift();
            return path;
        }
        _getNode(position, zoneID, groupID, checkPolygon = false) {

            const nodes = this.zones[zoneID].groups[groupID];
            const vertices = this.zones[zoneID].vertices;
            let rNode = null;
            let rDistance = Math.pow(50, 2);
            nodes.forEach((node) => {
                const distance = xhh.Utils.distanceToSquared(node.centroid, position);
                if (distance < rDistance && (!checkPolygon || xhh.Utils.isVectorInPolygon(position, node, vertices))) {
                    rNode = node;
                    rDistance = distance;
                }
            });
            return rNode;
        }
    }
    xhh.Pathfinding = Pathfinding;
})(xhh || (xhh = {}));
var xhh;
(function (xhh) {
    class Utils {
        static roundNumber(value, decimals) {
            const factor = Math.pow(10, decimals);
            return Math.round(value * factor) / factor;
        }
        static distanceToSquared(a, b) {
            var dx = a.x - b.x;
            var dy = a.y - b.y;
            var dz = a.z - b.z;
            return dx * dx + dy * dy + dz * dz;
        }
        static sample(list) {
            return list[Math.floor(Math.random() * list.length)];
        }
        static isPointInPoly(poly, pt) {
            for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
                ((poly[i].z <= pt.z && pt.z < poly[j].z) || (poly[j].z <= pt.z && pt.z < poly[i].z)) && (pt.x < (poly[j].x - poly[i].x) * (pt.z - poly[i].z) / (poly[j].z - poly[i].z) + poly[i].x) && (c = !c);
            return c;
        }
        static isVectorInPolygon(vector, polygon, vertices) {
            // reference point will be the centroid of the polygon
            // We need to rotate the vector as well as all the points which the polygon uses
            var lowestPoint = 100000;
            var highestPoint = -100000;
            var polygonVertices = [];
            polygon.vertexIds.forEach((vId) => {
                lowestPoint = Math.min(vertices[vId].y, lowestPoint);
                highestPoint = Math.max(vertices[vId].y, highestPoint);
                polygonVertices.push(vertices[vId]);
            });
            if (vector.y < highestPoint + 0.5 && vector.y > lowestPoint - 0.5 &&
                this.isPointInPoly(polygonVertices, vector)) {
                return true;
            }
            return false;
        }
        static triarea2(a, b, c) {
            var ax = b.x - a.x;
            var az = b.z - a.z;
            var bx = c.x - a.x;
            var bz = c.z - a.z;
            return bx * az - ax * bz;
        }
        static vequal(a, b) {
            return this.distanceToSquared(a, b) < 0.00001;
        }
    }
    xhh.Utils = Utils;
})(xhh || (xhh = {}));
var xhh;
(function (xhh) {
    class Vector3 {
        constructor(x = 0, y = 0, z = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        static add(inV, addV, outV) {
            outV.x = inV.x + addV.x;
            outV.y = inV.y + addV.y;
            outV.z = inV.z + addV.z;
        }
        static scale(v, scale) {
            v.x *= scale;
            v.y *= scale;
            v.z *= scale;
        }
    }
    xhh.Vector3 = Vector3;
})(xhh || (xhh = {}));
