"use client";

import dynamic from "next/dynamic";

// three.js stays out of the first load; the scene mounts on the client only
const Space = dynamic(() => import("./SpaceCanvas"), { ssr: false });

export default Space;
