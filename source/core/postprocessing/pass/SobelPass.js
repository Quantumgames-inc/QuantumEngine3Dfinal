import {ShaderPass} from "../ShaderPass.js";
import {SobelOperatorShader} from "three/examples/jsm/shaders/SobelOperatorShader";
import {LuminosityShader} from "three/examples/jsm/shaders/LuminosityShader";

/**
 * Sobel pass is used to create a edge highlight effect with a sobel operator.
 *  
 * @class SobelPass
 * @module Postprocessing
 */
function SobelPass(center, angle, scale)
{
	ShaderPass.call(this, SobelOperatorShader);

	this.type = "Sobel";
};

SobelPass.prototype = Object.create(ShaderPass.prototype);

SobelPass.prototype.setSize = function(width, height)
{
	this.uniforms.resolution.value.set(width, height);
};

export {SobelPass};