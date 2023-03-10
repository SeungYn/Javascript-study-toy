import * as THREE from 'three'
import { WEBGL } from './webgl'

//웹지엘 가능한지 체크
if (WEBGL.isWebGLAvailable()) {
  //장면
  const scene = new THREE.Scene()

  //카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  //렌더러
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  renderer.render(scene, camera)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
