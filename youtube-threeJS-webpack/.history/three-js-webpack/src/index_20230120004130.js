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

  camera.position.z = 2

  const canvas = document.querySelector('#root')

  //렌더러
  const renderer = new THREE.WebGLRenderer({ canvas })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  const geometry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material01 = new THREE.MeshStandardMaterial({
    color: 0x004fff,
  })

  const obj01 = new THREE.Mesh(geometry01, material01)
  scene.add(obj01)
  obj01.position.x = -1

  const geometry02 = new THREE.ConeGeometry(0.4, 0.6, 6)
  const material02 = new THREE.MeshStandardMaterial({
    color: 0x004fff,
  })

  const obj02 = new THREE.Mesh(geometry02, material02)
  scene.add(obj02)

  const geometry03 = new THREE.IcosahedronGeometry(0.5, 0)
  const material03 = new THREE.MeshStandardMaterial({
    color: 0x004fff,
  })

  const obj03 = new THREE.Mesh(geometry03, material03)
  scene.add(obj03)
  obj03.position.x = +1

  function render(time) {
    time *= 0.0005

    obj01.rotation.x = time
    obj01.rotation.y = time

    obj02.rotation.x = time
    obj02.rotation.y = time

    obj03.rotation.x = time
    obj03.rotation.y = time

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
