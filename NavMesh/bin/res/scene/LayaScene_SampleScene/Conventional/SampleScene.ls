{
	"version":"LAYASCENE3D:02",
	"data":{
		"type":"Scene3D",
		"props":{
			"name":"SampleScene",
			"ambientColor":[
				0.212,
				0.227,
				0.259
			],
			"reflectionDecodingFormat":1,
			"reflection":"Assets/Scenes/SampleSceneGIReflection.ltcb",
			"reflectionIntensity":1,
			"ambientMode":1,
			"ambientSphericalHarmonics":[
				0.1678831,
				-0.01659194,
				-0.0113798,
				0.006569802,
				0.004985188,
				-0.008635044,
				0.009734795,
				-0.01030055,
				0.02333597,
				0.2107356,
				0.02701614,
				-0.01888616,
				0.01090358,
				0.008416928,
				-0.0145789,
				0.01416338,
				-0.01572325,
				0.033512,
				0.2899401,
				0.1099656,
				-0.03480915,
				0.02009366,
				0.01630442,
				-0.0282439,
				0.01814257,
				-0.02374605,
				0.0408002
			],
			"ambientSphericalHarmonicsIntensity":1,
			"lightmaps":[],
			"enableFog":false,
			"fogStart":0,
			"fogRange":300,
			"fogColor":[
				0.5,
				0.5,
				0.5
			]
		},
		"child":[
			{
				"type":"Camera",
				"instanceID":0,
				"props":{
					"name":"Main Camera",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						6.272654,
						17.15131,
						-1.202109
					],
					"rotation":[
						-0.3471391,
						0.6126239,
						0.3416288,
						0.6224759
					],
					"scale":[
						1,
						1,
						1
					],
					"clearFlag":1,
					"orthographic":false,
					"orthographicVerticalSize":10,
					"fieldOfView":60,
					"enableHDR":true,
					"nearPlane":0.3,
					"farPlane":1000,
					"viewport":[
						0,
						0,
						1,
						1
					],
					"clearColor":[
						0.1921569,
						0.3019608,
						0.4745098,
						0
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"DirectionLight",
				"instanceID":1,
				"props":{
					"name":"Directional Light",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						3,
						0
					],
					"rotation":[
						0.1093816,
						0.8754261,
						0.4082179,
						-0.2345697
					],
					"scale":[
						1,
						1,
						1
					],
					"intensity":0.6,
					"lightmapBakedType":1,
					"color":[
						1,
						0.9568627,
						0.8392157
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":2,
				"props":{
					"name":"Plane",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Plane.lm",
					"enableRender":true,
					"receiveShadows":true,
					"castShadow":true,
					"materials":[
						{
							"type":"Laya.BlinnPhongMaterial",
							"path":"Assets/m2.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"MeshColliderShape",
								"mesh":"Library/unity default resources-Plane.lm"
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":3,
				"props":{
					"name":"Cube",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0.5,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"receiveShadows":true,
					"castShadow":true,
					"materials":[
						{
							"path":"Assets/m1.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									0,
									0
								],
								"size":[
									1,
									1,
									1
								]
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":4,
				"props":{
					"name":"Cube (1)",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						-3,
						0.5,
						0.83
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"receiveShadows":true,
					"castShadow":true,
					"materials":[
						{
							"path":"Assets/m1.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									0,
									0
								],
								"size":[
									1,
									1,
									1
								]
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":5,
				"props":{
					"name":"Cube (2)",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						3,
						0.5,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"receiveShadows":true,
					"castShadow":true,
					"materials":[
						{
							"path":"Assets/m1.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									0,
									0
								],
								"size":[
									1,
									1,
									1
								]
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":6,
				"props":{
					"name":"Cube (3)",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0.5,
						3
					],
					"rotation":[
						0,
						0.7071068,
						0,
						-0.7071068
					],
					"scale":[
						1,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"receiveShadows":true,
					"castShadow":true,
					"materials":[
						{
							"path":"Assets/m1.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									0,
									0
								],
								"size":[
									1,
									1,
									1
								]
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":7,
				"props":{
					"name":"Cube (4)",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0.5,
						-3
					],
					"rotation":[
						0,
						0.7071068,
						0,
						-0.7071068
					],
					"scale":[
						1,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"receiveShadows":true,
					"castShadow":true,
					"materials":[
						{
							"path":"Assets/m1.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									0,
									0
								],
								"size":[
									1,
									1,
									1
								]
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":8,
				"props":{
					"name":"Player",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						2.52,
						0.5,
						2.01921
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						0.5,
						0.5,
						0.5
					],
					"meshPath":"Library/unity default resources-Capsule.lm",
					"enableRender":true,
					"receiveShadows":true,
					"castShadow":true,
					"materials":[
						{
							"type":"Laya.BlinnPhongMaterial",
							"path":"Resources/unity_builtin_extra.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"CapsuleColliderShape",
								"center":[
									0,
									0,
									0
								],
								"radius":0.5,
								"height":2,
								"orientation":1
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"Sprite3D",
				"instanceID":9,
				"props":{
					"name":"point1",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						-4.21,
						0,
						-3.79
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"Sprite3D",
				"instanceID":10,
				"props":{
					"name":"point2",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0.63,
						0,
						4.25
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":11,
				"props":{
					"name":"Plane (1)",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						-11.28,
						1.69,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Plane.lm",
					"enableRender":true,
					"receiveShadows":true,
					"castShadow":true,
					"materials":[
						{
							"type":"Laya.BlinnPhongMaterial",
							"path":"Assets/m2.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"MeshColliderShape",
								"mesh":"Library/unity default resources-Plane.lm"
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":12,
				"props":{
					"name":"Cube (5)",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						-12.97,
						2.19,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"receiveShadows":true,
					"castShadow":true,
					"materials":[
						{
							"path":"Assets/m1.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									0,
									0
								],
								"size":[
									1,
									1,
									1
								]
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":13,
				"props":{
					"name":"Cube (6)",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						-8.93,
						2.19,
						1.21
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"receiveShadows":true,
					"castShadow":true,
					"materials":[
						{
							"path":"Assets/m1.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									0,
									0
								],
								"size":[
									1,
									1,
									1
								]
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":14,
				"props":{
					"name":"Plane (2)",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						-5.26,
						0.98,
						-1.120022
					],
					"rotation":[
						0,
						0,
						0.2972152,
						-0.9548106
					],
					"scale":[
						0.3029138,
						1,
						0.2273447
					],
					"meshPath":"Library/unity default resources-Plane.lm",
					"enableRender":true,
					"receiveShadows":true,
					"castShadow":true,
					"materials":[
						{
							"type":"Laya.BlinnPhongMaterial",
							"path":"Resources/unity_builtin_extra.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"MeshColliderShape",
								"mesh":"Library/unity default resources-Plane.lm"
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			}
		]
	}
}