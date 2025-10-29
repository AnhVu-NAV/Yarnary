"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Environment,
    useGLTF,
    Center,
    Html,
    ContactShadows,
} from "@react-three/drei";
import type { BagModelMeta } from "@/app/models/bags";
import { BAG_MODELS } from "@/app/models/bags";

// === MODEL ===
function Model({
                   file,
                   scale = 1,
                   position,
                   rotation,
               }: {
    file: string;
    scale?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
}) {
    const gltf = useGLTF(file);

    useMemo(() => {
        gltf.scene.traverse((o: any) => {
            if (o.isMesh && o.material) {
                o.material.roughness = 0.9;
            }
        });
    }, [gltf.scene]);

    return (
        <Center top>
            <primitive
                object={gltf.scene}
                scale={scale}
                position={position}
                rotation={rotation}
            />
        </Center>
    );
}

// === PRELOAD ALL GLB ===
BAG_MODELS.forEach((m) => {
    if (m.file) useGLTF.preload(m.file);
    if (m.variants) m.variants.forEach((v) => useGLTF.preload(v));
});

// === VIEWER ===
export default function BagViewer({
                                      model,
                                      variantIndex = 0,
                                  }: {
    model: BagModelMeta;
    variantIndex?: number;
}) {
    const fileToRender =
        model.variants && model.variants.length > 0
            ? model.variants[variantIndex]
            : model.file;

    if (!fileToRender)
        return (
            <div className="h-[520px] flex items-center justify-center border rounded-xl">
                <p className="text-gray-500">Không có file 3D</p>
            </div>
        );

    return (
        <div className="h-[520px] w-full rounded-xl border bg-white">
            <Canvas camera={{ position: [0, 0.2, 2.8], fov: 45 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <Suspense fallback={<Html center>Đang tải model…</Html>}>
                    <Model
                        file={fileToRender}
                        scale={model.scale}
                        position={model.position}
                        rotation={model.rotation}
                    />
                    <Environment preset="studio" />
                    <ContactShadows opacity={0.25} scale={8} blur={2.4} far={2.5} />
                </Suspense>
                <OrbitControls enableDamping makeDefault />
            </Canvas>
        </div>
    );
}