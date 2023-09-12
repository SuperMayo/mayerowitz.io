import { Vector2 } from 'three'

const uniforms = {
    time: { value: 1 },
    resolution: { value: new Vector2() },
    u_mouse: { value: new Vector2() },
    u_step: { value: 0.0 },
    slider: { value: 0.0 },
}

export default uniforms;
