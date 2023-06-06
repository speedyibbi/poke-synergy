import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import styles from './WebGLCanvas.module.css';

const Scene = () => {
	const buffRef = useRef<any>();
	const texture = useLoader(THREE.TextureLoader, '/particle.svg');

	const pointCount = 5000;
	const radius = 50;

	const positions = useMemo(() => {
		const coordinates = [];

		for (let i = 0; i < pointCount; i++) {
			const u = Math.random();
			const v = Math.random();
			const w = Math.random();

			const theta = 2 * Math.PI * u;
			const phi = Math.acos(2 * v - 1);
			const r = Math.cbrt(w) * radius;

			const x = r * Math.sin(phi) * Math.cos(theta);
			const y = r * Math.sin(phi) * Math.sin(theta);
			const z = r * Math.cos(phi);
			coordinates.push(x, y, z);
		}

		return new Float32Array(coordinates);
	}, [pointCount, radius]);

	const originalPositions = useMemo(() => {
		return new Float32Array(positions);
	}, [pointCount, radius]);

	const getOriginalPosition = (index: number, offset: number) => {
		index *= 3;
		return originalPositions[index + offset];
	};

	useFrame((state) => {
		const positionsAttribute =
			buffRef.current.geometry.getAttribute('position');
		const count = positionsAttribute.count;

		for (let i = 0; i < count; i++) {
			const x = getOriginalPosition(i, 0);
			const y = getOriginalPosition(i, 1);
			const z = getOriginalPosition(i, 2);

			const pulsate = 0.95 + 0.025 * Math.sin(state.clock.getElapsedTime());

			positionsAttribute.setXYZ(i, x * pulsate, y * pulsate, z * pulsate);
		}

		buffRef.current.rotation.y -= 0.001;
		buffRef.current.rotation.z += 0.001;

		positionsAttribute.needsUpdate = true;
	});

	return (
		<points ref={buffRef} position={[0, 0, 0]}>
			<bufferGeometry attach='geometry'>
				<bufferAttribute
					attach='attributes-position'
					count={positions.length / 3}
					itemSize={3}
					array={positions}
				/>
			</bufferGeometry>
			<pointsMaterial attach='material' color='#FFF' size={0.5} map={texture} />
		</points>
	);
};

const WebGLCanvas = React.memo(() => {
	return (
		<section className={`${styles.webGLCanvas}`}>
			<Canvas camera={{ position: [0, 0, -100] }}>
				<Scene />
			</Canvas>
		</section>
	);
});

export default WebGLCanvas;
