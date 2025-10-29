export type Vec3 = [number, number, number];

export type BagModelMeta = {
    id: string;
    name: string;
    file: string;
    thumb?: string;
    scale?: number;
    position?: Vec3;
    rotation?: Vec3;
};

export const BAG_MODELS: BagModelMeta[] = [
    { id: "cozy-bag", name: "Cozy Sleeve Bag", file: "/models/cozy_sleeve_bag.glb", scale: 1.0, thumb: "/thumbs/cozy_sleeve_bag.jpg" },
    { id: "hwacha-bag", name: "Hwacha Bag", file: "/models/hwacha_bag.glb", scale: 1.1, thumb: "/thumbs/hwacha_bag.jpg" },
    { id: "macaron-bag", name: "Macaron Bag", file: "/models/macaron_bag.glb", scale: 0.9, thumb: "/thumbs/macaron_bag.png" },
];