AFRAME.registerComponent("shaperain", {
    init: function() {
    //console.log('shape-man');

    console.log("shapes reference", this.shapesreference)
    },
    tick: function() {
        // create shapes once
        if (this.created == false && state ==3){
            this.createshapes();

        }
        //only do shapes animation if state ==1 aka first performance
        if (state == 3){
            console.log("raaain");
            console.log(this.shapes)
            this.shapes.forEach(function(shape){
        
              let shapePos = shape.getAttribute('position')
              // console.log(shapePos);
              let xPos = shapePos['x'];
              let yPos = shapePos['y'];
              let zPos = shapePos['z'] + 0.01;
              
              if (zPos > 6){
                zPos = -1; 
                shape.setAttribute('color',getRandomColor())
              }
        
        
              console.log(xPos,yPos,zPos);
              shape.setAttribute('position',xPos.toString()+ ' '+yPos.toString() +' '+ zPos.toString())
        
        
            })
        }

      
      // this.rockyTerrain.setAttribute("position", { x: 0, y: -23, z: 0 });
    },
    createshapes: function(){
        this.shapesreference = []
        this.shapes = [];
        this.created = false;
        let countX = 10;
        let size = 0.2, spacing = 1, x;
        let sceneEl = document.querySelector('a-scene');
        for (let i=0; i<countX; i++){
            this.shapes[i] = document.createElement('a-entity'); // create the element
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
  
  