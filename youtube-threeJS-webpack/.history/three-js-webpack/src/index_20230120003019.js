import * as THREE from 'three'
import { WEBGL } from './webgl'

//웹지엘 가능한지 체크
if (WEBGL.isWebGLAvailable()) {
  //장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x004fff)
  //카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  camera.position.z = 4

  const canvas = document.querySelector('#root')

  //렌더러
  const renderer = new THREE.WebGLRenderer({ canvas })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: 0x004fff,
  })

  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  function render(time) {
    time *= 0.001

    // cube.rotation.x = time
    // cube.rotation.y = time

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
