console.log("First scene aka francis 1")
AFRAME.registerComponent("foo", {
    init: function() {
      this.box = document.querySelector("a-box");
      document.getElementById("firstPerformance").setAttribute("visible", "true");
      document
        .getElementById("secondPerformance")
        .setAttribute("visible", "false");
    },
    tick: function() {
      this.box.setAttribute("material", "color", "red");
      // this.rockyTerrain.setAttribute("position", { x: 0, y: -23, z: 0 });
    }
});


var counter = 0;

AFRAME.registerComponent("shaperain", {
  init: function() {
  //console.log('shape-man');
  this.shapesreference = []
  let countX = 20;
  let shapeTypes = 5;
  this.shapes = [];
  let size = 0.2, spacing = 1, x;
  let sceneEl = document.querySelector('a-scene');
  for (let i=0; i<countX; i++){
    // create the element
    this.shapes[i] = document.createElement('a-entity');
    if (i%shapeTypes === 0){
        // create components, id, geometry, position
      this.shapes[i].setAttribute('id', 'box_'+i.toString());
      this.shapes[i].setAttribute('geometry', {
        primitive: 'box',
        height: size,
        width: size,
        depth: size
      });
      x = (size + spacing) * countX * (-0.5) + i * (size + spacing) ;
      y = Math.random() * 0.9 + 1.5;
      this.shapes[i].setAttribute('position', x.toString()+ ' '+y.toString()+' 0' );
    } else if (i%shapeTypes === 1) {
      this.shapes[i].setAttribute('id', 'Sphere_'+i.toString());
      this.shapes[i].setAttribute('geometry', {
        primitive: 'sphere',
        radius: size, 
      });
      x = (size + spacing) * countX * (-0.5) + i * (size + spacing) ;
      y = Math.random() * 0.9 + 1.5;
      this.shapes[i].setAttribute('position', x.toString()+ ' '+y.toString()+' 0' );
    } else if (i%shapeTypes === 2) {
      this.shapes[i].setAttribute('id', 'Cylinder_'+i.toString());
      this.shapes[i].setAttribute('geometry', {
        primitive: 'cylinder',
        height: size,
        radius: size
      });
      x = (size + spacing) * countX * (-0.5) + i * (size + spacing) ;
      y = Math.random() * 0.9 + 1.5;
      this.shapes[i].setAttribute('position', x.toString()+ ' '+y.toString()+' 0' );
    } else if (i%shapeTypes === 3) {
      this.shapes[i].setAttribute('id', 'Tetrahedron_'+i.toString());
      this.shapes[i].setAttribute('geometry', {
        primitive: 'tetrahedron',
        radius: size,
      });
      x = (size + spacing) * countX * (-0.5) + i * (size + spacing) ;
      y = Math.random() * 0.9 + 1.5;
      this.shapes[i].setAttribute('position', x.toString()+ ' '+y.toString()+' 0' );
    } else if (i%shapeTypes === 4) {
      this.shapes[i].setAttribute('id', 'Dodecahedron_'+i.toString());
      this.shapes[i].setAttribute('geometry', {
        primitive: 'dodecahedron',
        radius: size,
      });
      x = (size + spacing) * countX * (-0.5) + i * (size + spacing) ;
      y = Math.random() * 0.9 + 1.5;
      this.shapes[i].setAttribute('position', x.toString()+ ' '+y.toString()+' 0' );
    
    
    // you can add event listeners here for interaction, such as mouse events.
    sceneEl.appendChild(this.shapes[i]);// Append the element to the scene, so it becomes part of the DOM.
  }
  // If you want to access THREEjs properties, you need to access them after they have loaded into the scene.
  // Get the shapes as THREEjs object
  // shapePosArr = [];
  this.shapes.forEach(function(c){
    c.addEventListener('loaded', function(ev){
      let shape3D = c.getObject3D('mesh');
      //console.log(shape3D);
      this.shapesreference.push(shape3D);
    });
  });
  },
  tick: function() {
    console.log("raaain");
    console.log(this.shapes)
    this.shapes.forEach(function(shape){
      if (counter > 30){
        window.location.href = '/lobby';
      }

      let shapePos = shape.getAttribute('position')
      // console.log(shapePos);
      let xPos = shapePos['x'];
      let yPos = shapePos['y'];
      let zPos = shapePos['z'] + 0.01;
      
      if (zPos > 9){
        counter+=1;
        zPos = -1; 
        shape.setAttribute('color',getRandomColor())
      }


      console.log(xPos,yPos,zPos);
      shape.setAttribute('position',xPos.toString()+ ' '+yPos.toString() +' '+ zPos.toString())


    })
    
    // this.rockyTerrain.setAttribute("position", { x: 0, y: -23, z: 0 });
  }
});
//https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}




/*Socket IO side */
var socket = io.connect();




























// AFRAME.registerComponent("shaperain", {
//   init: function() {
//     var el = this.el;
//     let sceneEl = document.querySelector('a-scene');
    
//     this.box = document.createElement('a-entity');
//     this.box.setAttribute('box', {xPos:1, yPos:1,zPos:1,size:5,color:'#000000'});

    

//     // el.setObject3D('mesh',box);
  
//   },
//   tick: function() {
//     // console.log(this.box);
      
//       // shape.setAttribute('position', x.toString()+ ' '+y.toString()+' 0' );



    
    
//     // this.rockyTerrain.setAttribute("position", { x: 0, y: -23, z: 0 });
//   }
// });


// // https://stackoverflow.com/questions/42854921/how-to-pass-a-reference-to-aframe-component

// /*
// Box Component 
// */

// AFRAME.registerComponent('box', {
//   schema: {
//     xPos: {type: 'number', default: 1},
//     yPos: {type: 'number', default: 1},
//     zPos: {type: 'number', default: 1},
//     size:{type:'number', default:5},
//     id:{type:'number', default:0},
//     color: {type: 'color', default: '#AAA'}
//   },

//   /**
//    * Initial creation and setting of the mesh.
//    */
//   init: function () {
//     var data = this.data;
//     var el = this.el;
//     let sceneEl = document.querySelector('a-scene');

//     this.box = document.createElement('a-entity'); 
//       // create components, id, geometry, position
//     this.box.setAttribute('id', 'box_'+data.id.toString());
//     this.box.setAttribute('geometry', {
//       primitive: 'box',
//       height: data.size,
//       width: data.size,
//       depth: data.size
//     });
//     this.box.setAttribute('position', this.xPos.toString()+ ' '+this.yPos.toString()+' '+this.zPos.toString() );

//     // Set mesh on entity.
//     sceneEl.appendChild(this.box);
//   },
//   tick: function (){
//     console.log(this.box)

//   }

// });



/*
Triangle Component 
*/

// AFRAME.registerComponent('box', {
//   schema: {
//     xPos: {type: 'number', default: 1},
//     yPos: {type: 'number', default: 1},
//     zPos: {type: 'number', default: 1},
//     width: {type: 'number', default: 1},
//     height: {type: 'number', default: 1},
//     depth: {type: 'number', default: 1},
//     color: {type: 'color', default: '#AAA'}
//   },

//   /**
//    * Initial creation and setting of the mesh.
//    */
//   init: function () {
//     var data = this.data;
//     var el = this.el;

//     // Create geometry.
//     this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);

//     // Create material.
//     this.material = new THREE.MeshStandardMaterial({color: data.color});

//     // Create mesh.
//     this.mesh = new THREE.Mesh(this.geometry, this.material);

//     // Set mesh on entity.
//     el.setObject3D('mesh', this.mesh);
//   }
// });

/*
Sphere Component 
*/

// AFRAME.registerComponent('box', {
//   schema: {

//     xPos: {type: 'number', default: 1},
//     yPos: {type: 'number', default: 1},
//     zPos: {type: 'number', default: 1},
//     width: {type: 'number', default: 1},
//     height: {type: 'number', default: 1},
//     depth: {type: 'number', default: 1},
//     color: {type: 'color', default: '#AAA'}
//   },

//   /**
//    * Initial creation and setting of the mesh.
//    */
//   init: function () {
//     var data = this.data;
//     var el = this.el;

//     // Create geometry.
//     this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);

//     // Create material.
//     this.material = new THREE.MeshStandardMaterial({color: data.color});

//     // Create mesh.
//     this.mesh = new THREE.Mesh(this.geometry, this.material);

//     // Set mesh on entity.
//     el.setObject3D('mesh', this.mesh);
//   }
// });


// var geometry = new THREE.CylinderGeometry(0, radius, height, 4, 1)
// var material = new THREE.MeshNormalMaterial();
// var pyramid = new THREE.Mesh(geometry, material);









// AFRAME.registerComponent("shaperain", {
//   init: function() {
//   //console.log('shape-man');
//   let countX = 10;
//   let shapes = [];
//   let size = 0.125, spacing = 0.05, x;
//   let sceneEl = document.querySelector('a-scene');
//   for (let i=0; i<countX; i++){
//     shapes[i] = document.createElement('a-entity'); // create the element
//       // create components, id, geometry, position
//     shapes[i].setAttribute('id', 'box_'+i.toString());
//     shapes[i].setAttribute('geometry', {
//       primitive: 'box',
//       height: size,
//       width: size,
//       depth: size
//     });
//     x = (size + spacing) * countX * (-0.5) + i * (size + spacing) ;
//     y = Math.random() * 0.25;
//     shapes[i].setAttribute('position', x.toString()+ ' '+y.toString()+' 0' );
    
//     // you can add event listeners here for interaction, such as mouse events.
//     sceneEl.appendChild(shapes[i]);// Append the element to the scene, so it becomes part of the DOM.
//   }
//   // If you want to access THREEjs properties, you need to access them after they have loaded into the scene.
//   // Get the shapes as THREEjs object
//   // shapePosArr = [];
//   shapes.forEach(function(c){
//     c.addEventListener('loaded', function(ev){
//       let shape3D = c.getObject3D('mesh');
//       //console.log(shape3D);
//       shapesreference.push(shape3D);
//     });
//   });
//   },
//   tick: function() {
//     console.log("raaain");
//     console.log(shapesreference)
//     shapesreference.forEach(function(shape){
//       console.log(shape)
//       let x = shape.position.x
//       let y = shape.position.y +1;
//       // shape.setAttribute('position', x.toString()+ ' '+y.toString()+' 0' );



//     })
    
//     // this.rockyTerrain.setAttribute("position", { x: 0, y: -23, z: 0 });
//   }
// });



















// AFRAME.registerComponent("shaperain", {
//   init: function() {
//     var el = this.el;
//     let sceneEl = document.querySelector('a-scene');
    
//     this.box = document.createElement('a-entity');
//     this.box.setAttribute('box', {xPos:1, yPos:1,zPos:1,size:5,color:'#000000'});

    

//     // el.setObject3D('mesh',box);
  
//   },
//   tick: function() {
//     // console.log(this.box);
      
//       // shape.setAttribute('position', x.toString()+ ' '+y.toString()+' 0' );



    
    
//     // this.rockyTerrain.setAttribute("position", { x: 0, y: -23, z: 0 });
//   }
// });


// // https://stackoverflow.com/questions/42854921/how-to-pass-a-reference-to-aframe-component

// /*
// Box Component 
// */

// AFRAME.registerComponent('box', {
//   schema: {
//     xPos: {type: 'number', default: 1},
//     yPos: {type: 'number', default: 1},
//     zPos: {type: 'number', default: 1},
//     size:{type:'number', default:5},
//     id:{type:'number', default:0},
//     color: {type: 'color', default: '#AAA'}
//   },

//   /**
//    * Initial creation and setting of the mesh.
//    */
//   init: function () {
//     var data = this.data;
//     var el = this.el;
//     let sceneEl = document.querySelector('a-scene');

//     this.box = document.createElement('a-entity'); 
//       // create components, id, geometry, position
//     this.box.setAttribute('id', 'box_'+data.id.toString());
//     this.box.setAttribute('geometry', {
//       primitive: 'box',
//       height: data.size,
//       width: data.size,
//       depth: data.size
//     });
//     this.box.setAttribute('position', this.xPos.toString()+ ' '+this.yPos.toString()+' '+this.zPos.toString() );

//     // Set mesh on entity.
//     sceneEl.appendChild(this.box);
//   },
//   tick: function (){
//     console.log(this.box)

//   }

// });



/*
Triangle Component 
*/

// AFRAME.registerComponent('box', {
//   schema: {
//     xPos: {type: 'number', default: 1},
//     yPos: {type: 'number', default: 1},
//     zPos: {type: 'number', default: 1},
//     width: {type: 'number', default: 1},
//     height: {type: 'number', default: 1},
//     depth: {type: 'number', default: 1},
//     color: {type: 'color', default: '#AAA'}
//   },

//   /**
//    * Initial creation and setting of the mesh.
//    */
//   init: function () {
//     var data = this.data;
//     var el = this.el;

//     // Create geometry.
//     this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);

//     // Create material.
//     this.material = new THREE.MeshStandardMaterial({color: data.color});

//     // Create mesh.
//     this.mesh = new THREE.Mesh(this.geometry, this.material);

//     // Set mesh on entity.
//     el.setObject3D('mesh', this.mesh);
//   }
// });

/*
Sphere Component 
*/

// AFRAME.registerComponent('box', {
//   schema: {

//     xPos: {type: 'number', default: 1},
//     yPos: {type: 'number', default: 1},
//     zPos: {type: 'number', default: 1},
//     width: {type: 'number', default: 1},
//     height: {type: 'number', default: 1},
//     depth: {type: 'number', default: 1},
//     color: {type: 'color', default: '#AAA'}
//   },

//   /**
//    * Initial creation and setting of the mesh.
//    */
//   init: function () {
//     var data = this.data;
//     var el = this.el;

//     // Create geometry.
//     this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);

//     // Create material.
//     this.material = new THREE.MeshStandardMaterial({color: data.color});

//     // Create mesh.
//     this.mesh = new THREE.Mesh(this.geometry, this.material);

//     // Set mesh on entity.
//     el.setObject3D('mesh', this.mesh);
//   }
// });


// var geometry = new THREE.CylinderGeometry(0, radius, height, 4, 1)
// var material = new THREE.MeshNormalMaterial();
// var pyramid = new THREE.Mesh(geometry, material);









// AFRAME.registerComponent("shaperain", {
//   init: function() {
//   //console.log('shape-man');
//   let countX = 10;
//   let shapes = [];
//   let size = 0.125, spacing = 0.05, x;
//   let sceneEl = document.querySelector('a-scene');
//   for (let i=0; i<countX; i++){
//     shapes[i] = document.createElement('a-entity'); // create the element
//       // create components, id, geometry, position
//     shapes[i].setAttribute('id', 'box_'+i.toString());
//     shapes[i].setAttribute('geometry', {
//       primitive: 'box',
//       height: size,
//       width: size,
//       depth: size
//     });
//     x = (size + spacing) * countX * (-0.5) + i * (size + spacing) ;
//     y = Math.random() * 0.25;
//     shapes[i].setAttribute('position', x.toString()+ ' '+y.toString()+' 0' );
    
//     // you can add event listeners here for interaction, such as mouse events.
//     sceneEl.appendChild(shapes[i]);// Append the element to the scene, so it becomes part of the DOM.
//   }
//   // If you want to access THREEjs properties, you need to access them after they have loaded into the scene.
//   // Get the shapes as THREEjs object
//   // shapePosArr = [];
//   shapes.forEach(function(c){
//     c.addEventListener('loaded', function(ev){
//       let shape3D = c.getObject3D('mesh');
//       //console.log(shape3D);
//       shapesreference.push(shape3D);
//     });
//   });
//   },
//   tick: function() {
//     console.log("raaain");
//     console.log(shapesreference)
//     shapesreference.forEach(function(shape){
//       console.log(shape)
//       let x = shape.position.x
//       let y = shape.position.y +1;
//       // shape.setAttribute('position', x.toString()+ ' '+y.toString()+' 0' );



//     })
    
//     // this.rockyTerrain.setAttribute("position", { x: 0, y: -23, z: 0 });
//   }
// });

