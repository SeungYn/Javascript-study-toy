import * as THREE from 'three'
import { WEBGL } from './webgl'

//웹지엘 가능한지 체크
if (WEBGL.isWebGLAvailable()) {
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
