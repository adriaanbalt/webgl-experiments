'use strict';

import THREE from 'three';

export default class SpinningCube extends THREE.Mesh {
	
	constructor ( geo, mat ) {
		super( geo, mat );
		this.position.x = (Math.random() - .5 ) * 25;
		this.position.y = (Math.random() - .5 ) * 25;
		this.position.z = (Math.random() - .5 ) * 25;
	
		this.rot = 1;
	}

	update ( time ) {
		this.rotation.x += this.rot * Math.PI / 180;
		this.rotation.y += this.rot * Math.PI / 180;
	}

};
