"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls, Environment, useGLTF, Center, Html, ContactShadows
} from "@react-three/drei";
import type { BagModelMeta } from "@/app/models/bags";

function Model({ model }: { model: BagModelMeta }) {
    const gltf = useGLTF(model.file);
    const scale = model.scale ?? 1;

    useMemo(() => {
        gltf.scene.traverse((o: any) => {
            if (o.isMesh && o.material) {
                o.material.roughness = 0.9;
            }
        });
    }, [gltf.scene]);

    return (
        <Center top>
            <primitive object={gltf.scene} scale={scale} position={model.position} rotation={model.rotation} />
        </Center>
    );
}

import { BAG_MODELS } from "@/app/models/bags";
BAG_MODELS.forEach(m => useGLTF.preload(m.file));

export default function BagViewer({ model }: { model: BagModelMeta }) {
    return (
        <div className="h-[520px] w-full rounded-xl border bg-white">
            <Canvas camera={{ position: [0, 0.2, 2.8], fov: 45 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <Suspense fallback={<Html center>Đang tải model…</Html>}>
                    <Model model={model} />
                    <Environment preset="studio" />
                    <ContactShadows opacity={0.25} scale={8} blur={2.4} far={2.5} />
                </Suspense>
                <OrbitControls enableDamping makeDefault />
            </Canvas>
        </div>
    );
}