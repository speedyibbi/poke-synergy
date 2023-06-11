import React, { useContext, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { CanvasContext } from '@/store/CanvasContext';
import styles from './WebGLCanvas.module.css';

type Props = {
	scale: number;
};

const Scene: React.FC<Props> = (props) => {
	const buffRef = useRef<any>();
	const texture = useLoader(THREE.TextureLoader, '/particle.svg');

	const radius = 50;
	const pointCount = 5000;
	const rotationSpeed = 0.001;

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

	const particle = Math.floor(Math.random() * ((pointCount - 1) * 3 + 1));

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

		buffRef.current.rotation.y -= rotationSpeed;
		buffRef.current.rotation.z += rotationSpeed;

		positionsAttribute.needsUpdate = true;
	});

	return (
		<points ref={buffRef} position={[0, 0, 0]} scale={props.scale}>
			<bufferGeometry attach='geometry'>
				<bufferAttribute
					attach='attributes-position'
					count={positions.length / 3}
					itemSize={3}
					array={positions}
				/>
			</bufferGeometry>
			<pointsMaterial
				attach='material'
				color='#FFF'
				size={0.25}
				map={texture}
				alphaTest={0.5}
				opacity={1}
			/>
		</points>
	);
};

const WebGLCanvas = React.memo(() => {
	// const { canvasState } = useContext(CanvasContext);

	// let scale = useMemo(() => {
	// 	if (canvasState === 0) return 1;
	// 	if (canvasState === 1) return 3;
	// }, [canvasState]);

	return (
		<section className={`${styles.webGLCanvas}`}>
			<Canvas camera={{ position: [0, 0, -100] }}>
				{/* <Scene scale={scale ? scale : 1} /> */}
				<Scene scale={3} />
			</Canvas>
		</section>
	);
});

export default WebGLCanvas;
