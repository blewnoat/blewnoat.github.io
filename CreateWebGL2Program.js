/*
Takes a WebGL context and a shader source, and compiles a program for it.
The source is received as one string, or two.
The compiled and linked program is returned.
*/

function CreateProgram(gl, source_a, source_b) {
    let source = source_a;
    if(source_b) source += source_b;
    let v = '#version 300 es';
    let parts = source.split(v);
    let vertexShader = CompileShader(v+parts[1],gl.VERTEX_SHADER);
    let fragmentShader = CompileShader(v+parts[2],gl.FRAGMENT_SHADER);
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
        throw(gl.getProgramInfoLog(program));
    }
    return program;
}

function CompileShader(gl, source, type) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        throw('shader: ' + gl.getShaderInfoLog(shader));
    }
    return shader;
}

export default CreateProgram;
