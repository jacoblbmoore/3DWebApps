import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export function createCoke(containerId) {
  let model;
  let spin = false;
  let resetInProgress = false;
  let resetStartTime = 0;
  let wireframe = false;
  const resetDuration = 1000; 
  const startQuaternion = new THREE.Quaternion();
  const endQuaternion = new THREE.Quaternion();
  const container = document.getElementById(containerId);

  function setWireframe(value) {
    if (!model) return;

    wireframe = value;
    model.traverse((child) => {
      if (child.isMesh) {
        child.material.wireframe = wireframe;
      }
    });
  }

  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  if (width === 0 || height === 0) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 0.02;
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', function () {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
  });

  var canvas = renderer.domElement;
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('wheel', onWheelScroll);
  
  var mouseDown = false;
  var lastMousePosition = { x: 0, y: 0 };
  
  function onMouseDown(event) {
    mouseDown = true;
    lastMousePosition.x = event.clientX;
    lastMousePosition.y = event.clientY;
    $("#view-select").val("");
  }
  
  function onMouseUp(event) {
    mouseDown = false;
  }

  
  function onMouseMove(event) {
    if (mouseDown) {
      var deltaX = event.clientX - lastMousePosition.x;
      var deltaY = event.clientY - lastMousePosition.y;
      var horizontalRotation = deltaX * 0.005;
      var verticalRotation = deltaY * 0.005;
      model.rotation.y += horizontalRotation;
      model.rotation.x += verticalRotation;
      var angle = Math.atan2(deltaY, deltaX);
      if (Math.abs(angle) > 0.25 * Math.PI && Math.abs(angle) < 0.75 * Math.PI) {
        model.rotation.z -= horizontalRotation; 
      }
      lastMousePosition.x = event.clientX;
      lastMousePosition.y = event.clientY;
    }
  } 
  
  function onWheelScroll(event) {
    event.preventDefault(); 
    const zoomSpeed = 0.001;
    const scrollDirection = event.deltaY * zoomSpeed;
    camera.position.addScaledVector(camera.getWorldDirection(new THREE.Vector3()), scrollDirection);
    camera.updateProjectionMatrix();
  }
  
  const loader = new GLTFLoader();
  loader.load('assets/models/coke_can2.glb', (gltf) => {
    model = gltf.scene;
    scene.add(model);
  
    model.position.set(0, 0, 0);
    model.rotation.set(0, 0, 0);
    model.scale.set(13, 13, 13);
    camera.position.set(0, 0, 2);
    camera.lookAt(model.position);
  
    const textureLoader = new THREE.TextureLoader();
    const fantaTexture = textureLoader.load("assets/models/textures/fanta-texture.png");
    const cokeTexture = textureLoader.load("assets/models/textures/coke-texture.png");
    const drpepperTexture = textureLoader.load("assets/models/textures/drpepper-texture.png");
    fantaTexture.flipY = false;
    cokeTexture.flipY = false;
    drpepperTexture.flipY = false;

    function findMaterialByName(object, name) {
      if (object.material && object.material.name === name) {
        return object.material;
      }

      for (let i = 0; i < object.children.length; i++) {
        const result = findMaterialByName(object.children[i], name);
        if (result) {
          return result;
        }
      }

      return null;
    }

    function changeTexture(texture) {
      if (model) {
        const canMaterial = findMaterialByName(model, "Image");
        if (canMaterial) {
          canMaterial.map = texture;
          canMaterial.needsUpdate = true;
        }
      }
    }

    $(document).on("click", "#texture-list li", function (event) {
      event.preventDefault();
      const selectedOption = $(this).attr("id");
      switch (selectedOption) {
        case "coke":
          changeTexture(cokeTexture);
          break;
        case "fanta":
          changeTexture(fantaTexture);
          break;
        case "drpepper":
          changeTexture(drpepperTexture);
          break;
        default:
          break;
      }
    });
  
    if (wireframe) {
      setWireframe(wireframe);
    }
  });

  const lightPositions = [
    [1, 1, 1],
    [-1, 1, 1],
    [1, -1, 1],
    [-1, -1, 1],
    [1, 1, -1],
    [-1, -1, -1]
  ];

  for (const position of lightPositions) {
    const light = new THREE.DirectionalLight(0xffffff, 30);
    light.position.set(...position).normalize();
    scene.add(light);
  }

const headLight = new THREE.PointLight(0xffffff, 1);

camera.add(headLight);
headLight.position.set(0, 0, 0);

  function animate() {
    requestAnimationFrame(animate);
  
    if (resetInProgress && model) {
      const elapsedTime = Date.now() - resetStartTime;
      if (elapsedTime >= resetDuration) {
        resetInProgress = false;
        model.quaternion.copy(endQuaternion);
      } else {
        const t = elapsedTime / resetDuration;
        model.quaternion.slerpQuaternions(startQuaternion, endQuaternion, t);
      }
    } else if (model) {
      switch (spin) {
        case 'x':
          model.rotation.x += 0.01;
          break;
        case 'y':
          model.rotation.y += 0.01;
          break;
        case 'both':
          model.rotation.x += 0.01;
          model.rotation.y += 0.01;
          break;
        default:
          break;
      }
    }
  
    renderer.render(scene, camera);
  }
  
  animate();
return {
  model,
  camera,

  get spin() {
    return spin;
  },
  set spin(value) {
    spin = value;
  },
  spinX() {
    spin = 'x';
  },
  spinY() {
    spin = 'y';
  },
  spinBoth() {
    spin = 'both';
  },
  stopSpin() {
    spin = false;
  },
    frontView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(0, 0, 0));
      }
    },
    sideView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(0, -2, 0));
      }
    },
    backView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(0, 2, 0));
      }
    },
    bottomView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
      }
    },
    topView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
      }
    },    
    
    get wireframe() {
      return wireframe;
    },
    set wireframe(value) {
      setWireframe(value);
    },

  };
}


export function createCoffee(containerId) {
  let model;
  let spin = false;
  let resetInProgress = false;
  let resetStartTime = 0;
  let wireframe = false;
  const resetDuration = 1000; 
  const startQuaternion = new THREE.Quaternion();
  const endQuaternion = new THREE.Quaternion();
  const container = document.getElementById(containerId);

  function setWireframe(value) {
    if (!model) return;

    wireframe = value;
    model.traverse((child) => {
      if (child.isMesh) {
        child.material.wireframe = wireframe;
      }
    });
  }


  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;


  if (width === 0 || height === 0) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  scene.background = new THREE.Color(0xe2 / 255, 0xdf / 255, 0xeb / 255);
  renderer.setSize(width, height);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 0.02;
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', function () {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
  });


  var canvas = renderer.domElement;
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('wheel', onWheelScroll);
  
  var mouseDown = false;
  var lastMousePosition = { x: 0, y: 0 };
  
  function onMouseDown(event) {
    mouseDown = true;
    lastMousePosition.x = event.clientX;
    lastMousePosition.y = event.clientY;
    $("#view-select").val("");
  }
  
  function onMouseUp(event) {
    mouseDown = false;
  }
  
  function onMouseMove(event) {
    if (mouseDown) {
      var deltaX = event.clientX - lastMousePosition.x;
      var deltaY = event.clientY - lastMousePosition.y;
  
      var horizontalRotation = deltaX * 0.005;
      var verticalRotation = deltaY * 0.005;
  
      model.rotation.y += horizontalRotation;
      model.rotation.x += verticalRotation;
  
 
      var angle = Math.atan2(deltaY, deltaX);
  
     
      if (Math.abs(angle) > 0.25 * Math.PI && Math.abs(angle) < 0.75 * Math.PI) {
        model.rotation.z -= horizontalRotation; 
      }
  
      lastMousePosition.x = event.clientX;
      lastMousePosition.y = event.clientY;
    }
  } 

  function onWheelScroll(event) {
    event.preventDefault(); 
  
    const zoomSpeed = 0.001;
    const scrollDirection = event.deltaY * zoomSpeed;
  

    camera.position.addScaledVector(camera.getWorldDirection(new THREE.Vector3()), scrollDirection);
  

    camera.updateProjectionMatrix();
  }
  
  const loader = new GLTFLoader();

    loader.load('assets/models/costa_cup_low_res.glb', (gltf) => {
    model = gltf.scene;
    scene.add(model);

    model.position.set(0, 0, 0);
    model.rotation.set(0, 0, 0);
    model.scale.set(13, 13, 13);
    camera.position.set(0, 0, 3);
    camera.lookAt(model.position);


    if (wireframe) {
      setWireframe(wireframe);
    }
  });

  const lightPositions = [
    [1, 1, 1],
    [-1, 1, 1],
    [1, -1, 1],
  ];

  for (const position of lightPositions) {
    const light = new THREE.DirectionalLight(0xffffff, 30);
    light.position.set(...position).normalize();
    scene.add(light);
  }

  function animate() {
    requestAnimationFrame(animate);
  
    if (resetInProgress && model) {
      const elapsedTime = Date.now() - resetStartTime;
      if (elapsedTime >= resetDuration) {
        resetInProgress = false;
        model.quaternion.copy(endQuaternion);
      } else {
        const t = elapsedTime / resetDuration;
        model.quaternion.slerpQuaternions(startQuaternion, endQuaternion, t);
      }
    } else if (model) {
      switch (spin) {
        case 'x':
          model.rotation.x += 0.01;
          break;
        case 'y':
          model.rotation.y += 0.01;
          break;
        case 'both':
          model.rotation.x += 0.01;
          model.rotation.y += 0.01;
          break;
        default:
          break;
      }
    }
  
    renderer.render(scene, camera);
  }
  
  animate();
return {
  model,
  camera,

  get spin() {
    return spin;
  },
  set spin(value) {
    spin = value;
  },
  spinX() {
    spin = 'x';
  },
  spinY() {
    spin = 'y';
  },
  spinBoth() {
    spin = 'both';
  },
  stopSpin() {
    spin = false;
  },
    frontView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(0, 0, 0));
      }
    },
    sideView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(0, -2, 0));
      }
    },
    backView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(0, 2, 0));
      }
    },
    bottomView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
      }
    },
    topView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
      }
    },   
    get wireframe() {
      return wireframe;
    },
    set wireframe(value) {
      setWireframe(value);
    },

  };
}

export function createSprite(containerId) {
  let model;
  let spin = false;
  let resetInProgress = false;
  let resetStartTime = 0;
  let wireframe = false;
  const resetDuration = 1000; 
  const startQuaternion = new THREE.Quaternion();
  const endQuaternion = new THREE.Quaternion();
  const container = document.getElementById(containerId);

  function setWireframe(value) {
    if (!model) return;

    wireframe = value;
    model.traverse((child) => {
      if (child.isMesh) {
        child.material.wireframe = wireframe;
      }
    });
  }


  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;


  if (width === 0 || height === 0) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  scene.background = new THREE.Color(0xe2 / 255, 0xdf / 255, 0xeb / 255);
  renderer.setSize(width, height);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 0.02;
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', function () {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
  });


  var canvas = renderer.domElement;
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('wheel', onWheelScroll);
  
  var mouseDown = false;
  var lastMousePosition = { x: 0, y: 0 };
  
  function onMouseDown(event) {
    mouseDown = true;
    lastMousePosition.x = event.clientX;
    lastMousePosition.y = event.clientY;
    $("#view-select").val("");
  }
  
  function onMouseUp(event) {
    mouseDown = false;
  }
  
  function onMouseMove(event) {
    if (mouseDown) {
      var deltaX = event.clientX - lastMousePosition.x;
      var deltaY = event.clientY - lastMousePosition.y;
  
      var horizontalRotation = deltaX * 0.005;
      var verticalRotation = deltaY * 0.005;
  
      model.rotation.y += horizontalRotation;
      model.rotation.x += verticalRotation;
  
    
      var angle = Math.atan2(deltaY, deltaX);
  
    
      if (Math.abs(angle) > 0.25 * Math.PI && Math.abs(angle) < 0.75 * Math.PI) {
        model.rotation.z -= horizontalRotation; 
      }
  
      lastMousePosition.x = event.clientX;
      lastMousePosition.y = event.clientY;
    }
  }  

  function onWheelScroll(event) {
    event.preventDefault(); 
  
    const zoomSpeed = 0.001;
    const scrollDirection = event.deltaY * zoomSpeed;
  

    camera.position.addScaledVector(camera.getWorldDirection(new THREE.Vector3()), scrollDirection);
  

    camera.updateProjectionMatrix();
  }
  
  const loader = new GLTFLoader();

    loader.load('assets/models/sprite_bottle.glb', (gltf) => {
    model = gltf.scene;
    scene.add(model);

    model.position.set(0, 0, 0);
    model.rotation.set(0, 0, 0);
    model.scale.set(13, 13, 13);
    camera.position.set(0, 0, 3);
    camera.lookAt(model.position);


    const textureLoader = new THREE.TextureLoader();
    const spriteTexture = textureLoader.load("assets/models/textures/sprite-texture.png");
    const spriteZeroTexture = textureLoader.load("assets/models/textures/spritezero-texture.png");
 
    spriteTexture.flipY = false;
    spriteZeroTexture.flipY = false;

    function findMaterialByName(object, name) {
      if (object.material && object.material.name === name) {
        return object.material;
      }

      for (let i = 0; i < object.children.length; i++) {
        const result = findMaterialByName(object.children[i], name);
        if (result) {
          return result;
        }
      }

      return null;
    }

    function changeTexture(texture) {
      if (model) {
        const canMaterial = findMaterialByName(model, "Image");
        if (canMaterial) {
          canMaterial.map = texture;
          canMaterial.needsUpdate = true;
        }
      }
    }

    $(document).on("click", "#texture-list li", function (event) {
      event.preventDefault();
      const selectedOption = $(this).attr("id");
      switch (selectedOption) {
        case "sprite":
          changeTexture(spriteTexture);
          break;
        case "spritezero":
          changeTexture(spriteZeroTexture);
          break;
        default:
          break;
      }
    });

    if (wireframe) {
      setWireframe(wireframe);
    }
  });

  const lightPositions = [
    [1, 1, 1],
    [-1, 1, 1],
    [1, -1, 1],
    [-1, -1, 1],
    [1, 1, -1],
    [-1, -1, -1]
  ];

  for (const position of lightPositions) {
    const light = new THREE.DirectionalLight(0xffffff, 30);
    light.position.set(...position).normalize();
    scene.add(light);
  }

  function animate() {
    requestAnimationFrame(animate);
  
    if (resetInProgress && model) {
      const elapsedTime = Date.now() - resetStartTime;
      if (elapsedTime >= resetDuration) {
        resetInProgress = false;
        model.quaternion.copy(endQuaternion);
      } else {
        const t = elapsedTime / resetDuration;
        model.quaternion.slerpQuaternions(startQuaternion, endQuaternion, t);
      }
    } else if (model) {
      switch (spin) {
        case 'x':
          model.rotation.x += 0.01;
          break;
        case 'y':
          model.rotation.y += 0.01;
          break;
        case 'both':
          model.rotation.x += 0.01;
          model.rotation.y += 0.01;
          break;
        default:
          break;
      }
    }
  
    renderer.render(scene, camera);
  }
  
  animate();
return {
  model,
  camera,

  get spin() {
    return spin;
  },
  set spin(value) {
    spin = value;
  },
  spinX() {
    spin = 'x';
  },
  spinY() {
    spin = 'y';
  },
  spinBoth() {
    spin = 'both';
  },
  stopSpin() {
    spin = false;
  },
    frontView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(0, 0, 0));
      }
    },
    sideView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(0, -2, 0));
      }
    },
    backView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(0, 2, 0));
      }
    },
    bottomView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
      }
    },
    topView() {
      if (model) {
        resetInProgress = true;
        resetStartTime = Date.now();
        startQuaternion.copy(model.quaternion);
        endQuaternion.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
      }
    },   
    get wireframe() {
      return wireframe;
    },
    set wireframe(value) {
      setWireframe(value);
    },

  };
}





