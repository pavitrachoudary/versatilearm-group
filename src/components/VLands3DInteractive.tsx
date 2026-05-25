import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Minimize2, CheckCircle2, ShieldCheck, Landmark, Compass, HelpCircle, Loader2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VLandsLogo } from './VLandsLogo';

interface VLands3DInteractiveProps {
  initialFullscreen?: boolean;
}

export const VLands3DInteractive = ({ initialFullscreen = false }: VLands3DInteractiveProps) => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(initialFullscreen);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSectionState] = useState<any>(null);
  const selectedSectionRef = useRef<any>(null);
  const hoveredSectionRef = useRef<any>(null);

  const setSelectedSection = (section: any) => {
    selectedSectionRef.current = section;
    setSelectedSectionState(section);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<any>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  const STATE_COLORS = ['#00D4AA', '#F59E0B', '#6366f1', '#ef4444'];
  const STATE_LABELS = ['Available', 'Bid Active', 'Owned', 'Reserved'];

  const [orderBook, setOrderBook] = useState([
    { sec: 'A-03', price: '₹12,500', type: 'buy', flash: false },
    { sec: 'B-07', price: '₹12,200', type: 'bid', flash: false },
    { sec: 'C-02', price: '₹12,800', type: 'sell', flash: false },
    { sec: 'D-05', price: '₹12,500', type: 'buy', flash: false },
    { sec: 'A-09', price: '₹11,950', type: 'bid', flash: false },
    { sec: 'E-04', price: '₹12,650', type: 'sell', flash: false },
    { sec: 'B-01', price: '₹12,500', type: 'buy', flash: false },
  ]);

  const [buyCount, setBuyCount] = useState(47);
  const [sellCount, setSellCount] = useState(23);

  useEffect(() => {
    let active = true;
    const loadScript = () => {
      if ((window as any).THREE) {
        if (active) setLoading(false);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.async = true;
      script.onload = () => { if (active) setLoading(false); };
      document.head.appendChild(script);
    };
    loadScript();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const secs = ['A-03', 'B-07', 'C-02', 'D-05', 'A-09', 'E-04', 'B-01', 'C-07', 'A-06', 'D-03', 'E-09', 'B-05'];
      const types = ['buy', 'bid', 'sell'];
      setOrderBook(prev => {
        const next = [...prev];
        const updateIdx = Math.floor(Math.random() * next.length);
        next[updateIdx] = {
          sec: secs[Math.floor(Math.random() * secs.length)],
          price: `₹${(11800 + Math.floor(Math.random() * 1200)).toLocaleString('en-IN')}`,
          type: types[Math.floor(Math.random() * types.length)],
          flash: true
        };
        setTimeout(() => {
          setOrderBook(curr => curr.map((item, idx) => idx === updateIdx ? { ...item, flash: false } : item));
        }, 800);
        return next;
      });
      setBuyCount(c => Math.max(10, Math.min(100, c + (Math.random() > 0.5 ? 1 : -1))));
      setSellCount(c => Math.max(10, Math.min(100, c + (Math.random() > 0.5 ? 1 : -1))));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // ── MAIN 3D SCENE ──
  useEffect(() => {
    if (loading || !canvasRef.current || !(window as any).THREE) return;
    const THREE = (window as any).THREE;

    const canvas = canvasRef.current;
    const parent = containerRef.current || canvas.parentElement;
    if (!parent) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', alpha: true });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(parent.clientWidth, parent.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0x060810, 0.0025);

    const camera = new THREE.PerspectiveCamera(50, parent.clientWidth / parent.clientHeight, 0.5, 1600);
    const CAM_TARGET = new THREE.Vector3(0, 4, 0);
    let theta = -0.65, phi = 1.05, radius = isFullscreen ? 165 : 185;
    let tTheta = theta, tPhi = phi, tRadius = radius;
    const updateCam = () => {
      camera.position.set(radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.cos(theta));
      camera.lookAt(CAM_TARGET);
    };
    updateCam();

    // ── LIGHTING ──
    scene.add(new THREE.AmbientLight(0x202a3a, 1.2));
    const hemi = new THREE.HemisphereLight(0x5a7a9a, 0x7b6520, 1.0);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xfff5d5, 3.0);
    sun.position.set(90, 180, 70);
    sun.castShadow = true;
    sun.shadow.mapSize.set(4096, 4096);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 900;
    sun.shadow.camera.left = -300;
    sun.shadow.camera.right = 300;
    sun.shadow.camera.top = 300;
    sun.shadow.camera.bottom = -300;
    sun.shadow.bias = -0.0002;
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x3355bb, 0.8);
    rim.position.set(-90, 50, -90);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0x8899bb, 0.4);
    fill.position.set(0, 80, 200);
    scene.add(fill);

    // ── TEXTURE HELPERS ──
    const mkCanvas = (w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] => {
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      return [c, c.getContext('2d')!];
    };

    const noise2D = (x: number, y: number, s = 1) => {
      const ix = Math.floor(x * s), iy = Math.floor(y * s), fx = x * s - ix, fy = y * s - iy;
      const h = (a: number, b: number) => { const v = Math.sin(a * 1.37 + b * 2.71) * 43758.5453123; return v - Math.floor(v); };
      const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
      return h(ix, iy) + (h(ix+1,iy)-h(ix,iy))*u + (h(ix,iy+1)-h(ix,iy))*v + (h(ix,iy)-h(ix+1,iy)-h(ix,iy+1)+h(ix+1,iy+1))*u*v;
    };

    // ── FIX: Road texture WITHOUT white edge lines that bleed infinitely ──
    // The white edge lines at y=16 and y=496 on a repeating texture caused
    // infinite white stripes across the model. We remove them entirely.
    const roadTex = (horiz = true) => {
      const [c, ctx] = mkCanvas(512, 512);
      // Dark asphalt base
      ctx.fillStyle = '#1a1b1f';
      ctx.fillRect(0, 0, 512, 512);
      // Subtle aggregate grain
      for (let i = 0; i < 8000; i++) {
        const g = Math.floor(Math.random() * 18 + 14);
        ctx.fillStyle = `rgb(${g},${g},${g})`;
        ctx.fillRect(Math.random() * 512, Math.random() * 512, 1 + Math.random() * 1.2, 1 + Math.random() * 1.2);
      }
      // Subtle lane boundary — very narrow, only 2px, mid-tone not white
      // (avoids infinite white stripe bleed from texture repeat)
      ctx.strokeStyle = '#484a52';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(0, 12); ctx.lineTo(512, 12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, 500); ctx.lineTo(512, 500); ctx.stroke();
      // Yellow center dashes only
      ctx.setLineDash([38, 26]);
      ctx.strokeStyle = '#d4b820';
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (horiz) { ctx.moveTo(0, 256); ctx.lineTo(512, 256); }
      else { ctx.moveTo(256, 0); ctx.lineTo(256, 512); }
      ctx.stroke();
      ctx.setLineDash([]);
      const t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(5, 1);
      return t;
    };

    // Sidewalk texture
    const sideTex = () => {
      const [c, ctx] = mkCanvas(256, 256);
      ctx.fillStyle = '#b8b8aa';
      ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = '#9a9a8e';
      ctx.lineWidth = 1.5;
      const sw = 64, sh = 32;
      for (let r = 0; r < 8; r++) {
        for (let cl = 0; cl < 4; cl++) {
          const ox = (r % 2 === 0) ? 0 : sw / 2;
          ctx.strokeRect(cl * sw - ox, r * sh, sw, sh);
        }
      }
      const t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(8, 2);
      return t;
    };

    // Land dirt texture
    const landTex = () => {
      const S = 512;
      const [c, ctx] = mkCanvas(S, S);
      const id = ctx.createImageData(S, S); const d = id.data;
      for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) {
        const p = (j * S + i) * 4, nx = i / S, ny = j / S;
        const n = noise2D(nx, ny, 6) * 0.45 + noise2D(nx, ny, 16) * 0.25;
        const crack = (Math.abs(Math.sin(nx * 48 + noise2D(nx, ny, 2) * 2)) < 0.015 || Math.abs(Math.sin(ny * 36 + noise2D(nx, ny, 2) * 2)) < 0.012) ? 0.6 : 1.0;
        d[p] = Math.min(255, (138 + n * 50) * crack);
        d[p+1] = Math.min(255, (104 + n * 35) * crack);
        d[p+2] = Math.min(255, (58 + n * 20) * crack);
        d[p+3] = 255;
      }
      ctx.putImageData(id, 0, 0);
      const t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(2, 2);
      return t;
    };

    // Grass texture for parks/medians
    const grassTex = () => {
      const S = 256;
      const [c, ctx] = mkCanvas(S, S);
      const id = ctx.createImageData(S, S); const d = id.data;
      for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) {
        const p = (j * S + i) * 4, nx = i / S, ny = j / S;
        const n = noise2D(nx, ny, 8) * 0.5 + noise2D(nx, ny, 20) * 0.3;
        d[p] = Math.min(255, 38 + n * 30);
        d[p+1] = Math.min(255, 95 + n * 55);
        d[p+2] = Math.min(255, 28 + n * 20);
        d[p+3] = 255;
      }
      ctx.putImageData(id, 0, 0);
      const t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(4, 4);
      return t;
    };

    // Building facade texture
    const facadeTex = (cols: number, rows: number, base: string, winColor = '#7cb3e0') => {
      const bw = cols * 22 + 8, bh = rows * 20 + 8;
      const [c, ctx] = mkCanvas(bw, bh);
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, bw, bh);
      for (let r = 0; r < rows; r++) for (let cl = 0; cl < cols; cl++) {
        const isOff = Math.random() < 0.3;
        const isLit = !isOff && Math.random() > 0.6;
        ctx.fillStyle = isOff ? '#091522' : isLit ? '#fff5c8' : winColor;
        ctx.fillRect(4 + cl * 22, 4 + r * 20, 17, 15);
        if (!isOff) {
          ctx.fillStyle = 'rgba(255,255,255,0.06)';
          ctx.fillRect(4 + cl * 22, 4 + r * 20, 17, 3);
        }
      }
      return new THREE.CanvasTexture(c);
    };

    // Concrete wall texture
    const concreteTex = () => {
      const [c, ctx] = mkCanvas(256, 256);
      ctx.fillStyle = '#a8a49a';
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 2000; i++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.06})`;
        ctx.fillRect(Math.random() * 256, Math.random() * 256, Math.random() * 3 + 1, 1);
      }
      ctx.strokeStyle = '#8a8680';
      ctx.lineWidth = 1;
      for (let r = 0; r < 8; r++) for (let cl = 0; cl < 4; cl++) ctx.strokeRect(cl * 64 + (r % 2) * 32, r * 32, 64, 32);
      const t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(3, 1);
      return t;
    };

    // Rooftop texture
    const roofTex = () => {
      const [c, ctx] = mkCanvas(128, 128);
      ctx.fillStyle = '#3a3e4a';
      ctx.fillRect(0, 0, 128, 128);
      ctx.strokeStyle = '#2d3038';
      ctx.lineWidth = 1;
      for (let i = 0; i < 128; i += 16) { ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(128,i); ctx.stroke(); }
      return new THREE.CanvasTexture(c);
    };

    // Pavement texture for ground
    const paveTex = () => {
      const [c, ctx] = mkCanvas(512, 512);
      ctx.fillStyle = '#2a2c33';
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = '#333540';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 512; i += 24) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
      }
      const t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(14, 14);
      return t;
    };

    // Vacant plot texture (brown dirt, simpler)
    const vacantTex = () => {
      const S = 256;
      const [c, ctx] = mkCanvas(S, S);
      const id = ctx.createImageData(S, S); const d = id.data;
      for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) {
        const p = (j * S + i) * 4, nx = i / S, ny = j / S;
        const n = noise2D(nx, ny, 5) * 0.5;
        d[p] = Math.min(255, 120 + n * 60);
        d[p+1] = Math.min(255, 90 + n * 40);
        d[p+2] = Math.min(255, 50 + n * 25);
        d[p+3] = 255;
      }
      ctx.putImageData(id, 0, 0);
      const t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(2, 2);
      return t;
    };

    // ── GROUND BASE ──
    const groundMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(900, 900),
      new THREE.MeshLambertMaterial({ map: paveTex(), color: 0x3a3d48 })
    );
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // ── CITY ROAD NETWORK ──
    const ROAD_W = 14; 
    const ROAD_W2 = 10; 
    const PLOT = 66;
    const HLP = PLOT / 2;

    const mkRoad = (w: number, d: number, x: number, z: number, rotY = 0, horiz = true) => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(w, d),
        new THREE.MeshLambertMaterial({ map: roadTex(horiz), color: 0x888990 })
      );
      m.rotation.x = -Math.PI / 2;
      m.rotation.z = rotY;
      m.position.set(x, 0.02, z);
      m.receiveShadow = true;
      scene.add(m);
    };

    const roadOffset = HLP + ROAD_W / 2;
    const GAP = HLP + 2;
    const ROAD_HALF = 250;
    const roadLen = ROAD_HALF - GAP;
    const roadCtr = (ROAD_HALF + GAP) / 2;

    // horizontal roads at z=±40, split into left+right segments
    mkRoad(roadLen, ROAD_W, -roadCtr, -roadOffset, 0, true);
    mkRoad(roadLen, ROAD_W, roadCtr, -roadOffset, 0, true);
    mkRoad(roadLen, ROAD_W, -roadCtr, roadOffset, 0, true);
    mkRoad(roadLen, ROAD_W, roadCtr, roadOffset, 0, true);

    // vertical roads at x=±40, split into front+back segments
    mkRoad(ROAD_W, roadLen, roadOffset, -roadCtr, Math.PI / 2, false);
    mkRoad(ROAD_W, roadLen, roadOffset, roadCtr, Math.PI / 2, false);
    mkRoad(ROAD_W, roadLen, -roadOffset, -roadCtr, Math.PI / 2, false);
    mkRoad(ROAD_W, roadLen, -roadOffset, roadCtr, Math.PI / 2, false);

    const cityRoads = [
      { x: 0, z: -120, w: 500, d: ROAD_W2, horiz: true },
      { x: 0, z: -180, w: 500, d: ROAD_W2, horiz: true },
      { x: 0, z: 120, w: 500, d: ROAD_W2, horiz: true },
      { x: 0, z: 180, w: 500, d: ROAD_W2, horiz: true },
      { x: 0, z: -250, w: 500, d: ROAD_W2, horiz: true },
      { x: -120, z: 0, w: ROAD_W2, d: 500, horiz: false },
      { x: -180, z: 0, w: ROAD_W2, d: 500, horiz: false },
      { x: 120, z: 0, w: ROAD_W2, d: 500, horiz: false },
      { x: 180, z: 0, w: ROAD_W2, d: 500, horiz: false },
      { x: -250, z: 0, w: ROAD_W2, d: 500, horiz: false },
      { x: 250, z: 0, w: ROAD_W2, d: 500, horiz: false },
    ];
    cityRoads.forEach(r => {
      const rot = r.horiz ? 0 : Math.PI / 2;
      mkRoad(r.w, r.d, r.x, r.z, rot, r.horiz);
    });

    const interMat = new THREE.MeshLambertMaterial({ color: 0x1a1c20 });
    const mkIntersection = (x: number, z: number, w = ROAD_W, d = ROAD_W) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), interMat);
      m.rotation.x = -Math.PI / 2;
      m.position.set(x, 0.025, z);
      scene.add(m);
    };
    [-1, 1].forEach(sx => [-1, 1].forEach(sz => mkIntersection(sx * roadOffset, sz * roadOffset)));
    [-120, -180, 120, 180].forEach(zz => {
      mkIntersection(-roadOffset, zz, ROAD_W, ROAD_W2);
      mkIntersection(roadOffset, zz, ROAD_W, ROAD_W2);
    });
    [-120, -180, 120, 180].forEach(xx => {
      mkIntersection(xx, -roadOffset, ROAD_W2, ROAD_W);
      mkIntersection(xx, roadOffset, ROAD_W2, ROAD_W);
    });

    const crossMat = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 });
    const mkCrosswalk = (x: number, z: number, rotY: number) => {
      for (let i = -3; i <= 3; i++) {
        const stripe = new THREE.Mesh(new THREE.PlaneGeometry(1.2, ROAD_W - 2), crossMat);
        stripe.rotation.x = -Math.PI / 2;
        stripe.rotation.z = rotY;
        stripe.position.set(x + Math.cos(rotY) * i * 2.2, 0.03, z + Math.sin(rotY) * i * 2.2);
        scene.add(stripe);
      }
    };
    mkCrosswalk(-roadOffset - ROAD_W / 2 - 1, -roadOffset, 0);
    mkCrosswalk(-roadOffset - ROAD_W / 2 - 1, roadOffset, 0);
    mkCrosswalk(roadOffset + ROAD_W / 2 + 1, -roadOffset, 0);
    mkCrosswalk(roadOffset + ROAD_W / 2 + 1, roadOffset, 0);

    // ── SIDEWALKS ──
    const sideTexture = sideTex();
    const sideMatH = new THREE.MeshLambertMaterial({ map: sideTexture, color: 0xb5b4a8 });
    const sideMatV = new THREE.MeshLambertMaterial({ map: sideTexture, color: 0xb0afaa });

    const mkSidewalk = (w: number, d: number, x: number, z: number, vertical = false) => {
      const geo = new THREE.BoxGeometry(w, 0.18, d);
      const m = new THREE.Mesh(geo, vertical ? sideMatV : sideMatH);
      m.position.set(x, 0.09, z);
      m.receiveShadow = true;
      scene.add(m);
    };

    const sInner = HLP + 2.5;
    const sOuter = HLP + ROAD_W + 2.5;

    mkSidewalk(500, 2.8, 0, -sInner);
    mkSidewalk(500, 2.8, 0, sInner);
    mkSidewalk(2.8, 500, -sInner, 0, true);
    mkSidewalk(2.8, 500, sInner, 0, true);

    mkSidewalk(500, 2.8, 0, -sOuter);
    mkSidewalk(500, 2.8, 0, sOuter);
    mkSidewalk(2.8, 500, -sOuter, 0, true);
    mkSidewalk(2.8, 500, sOuter, 0, true);

    const curbMat = new THREE.MeshLambertMaterial({ color: 0x888880 });
    const mkCurb = (w: number, d: number, x: number, z: number) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, d), curbMat);
      m.position.set(x, 0.24, z);
      scene.add(m);
    };
    mkCurb(500, 0.35, 0, -(sInner + 1.4));
    mkCurb(500, 0.35, 0, sInner + 1.4);
    mkCurb(0.35, 500, -(sInner + 1.4), 0);
    mkCurb(0.35, 500, sInner + 1.4, 0);

    // ── ROAD MEDIAN GREEN STRIPS ──
    const medianGrassMat = new THREE.MeshLambertMaterial({ map: grassTex(), color: 0x4a7a3a });
    const mkMedian = (w: number, d: number, x: number, z: number) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, d), medianGrassMat);
      m.position.set(x, 0.06, z);
      m.receiveShadow = true;
      scene.add(m);
    };
    mkMedian(500, 4, 0, -(sOuter + 4));
    mkMedian(500, 4, 0, sOuter + 4);
    mkMedian(4, 500, -(sOuter + 4), 0);
    mkMedian(4, 500, sOuter + 4, 0);

    // ── VLANDS CENTRAL PLOT ──
    const landGeo = new THREE.PlaneGeometry(PLOT, PLOT, 24, 24);
    const landMat = new THREE.MeshLambertMaterial({ map: landTex(), color: 0xc5b89a });
    const landMesh = new THREE.Mesh(landGeo, landMat);
    landMesh.rotation.x = -Math.PI / 2;
    landMesh.position.y = 0.05;
    landMesh.receiveShadow = true;
    scene.add(landMesh);

    const pos = landGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i), vz = pos.getZ(i);
      pos.setY(i, (noise2D(vx * 0.03, vz * 0.03, 1) - 0.5) * 0.7);
    }
    pos.needsUpdate = true;
    landGeo.computeVertexNormals();

    // ── COMPOUND WALL ──
    const WH = 3.8, WT = 0.85;
    const wallMat = new THREE.MeshLambertMaterial({ map: concreteTex(), color: 0xd0c8b2 });
    const mkWall = (w: number, h: number, d: number, x: number, z: number) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
      b.position.set(x, h / 2 + 0.12, z);
      b.castShadow = true; b.receiveShadow = true;
      scene.add(b);
    };
    mkWall(PLOT + WT * 2, WH, WT, 0, -HLP);
    mkWall((PLOT - 9) / 2, WH, WT, -(HLP / 2 + 2.25), HLP);
    mkWall((PLOT - 9) / 2, WH, WT, HLP / 2 + 2.25, HLP);
    mkWall(WT, WH, PLOT, HLP, 0);
    mkWall(WT, WH, PLOT, -HLP, 0);

    const pilMat = new THREE.MeshLambertMaterial({ color: 0xb8b0a0 });
    const mkPillar = (x: number, z: number, tall = false) => {
      const ph = tall ? WH + 2.2 : WH + 1.0;
      const b = new THREE.Mesh(new THREE.BoxGeometry(1.5, ph, 1.5), pilMat);
      b.position.set(x, ph / 2 + 0.12, z);
      b.castShadow = true; scene.add(b);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.45, 2.0), pilMat);
      cap.position.set(x, ph + 0.35, z);
      scene.add(cap);
    };
    [[-HLP,-HLP],[HLP,-HLP],[-HLP,HLP],[HLP,HLP]].forEach(([px,pz]) => mkPillar(px, pz, true));
    for (let k = -1; k <= 1; k++) {
      if (k !== 0) {
        mkPillar(k * HLP / 2, -HLP);
        mkPillar(k * HLP / 2, HLP);
        mkPillar(-HLP, k * HLP / 2);
        mkPillar(HLP, k * HLP / 2);
      }
    }

    const gateColMat = new THREE.MeshLambertMaterial({ color: 0x9c9684 });
    [-4.5, 4.5].forEach(gx => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(1.2, WH + 2.5, 1.2), gateColMat);
      m.position.set(gx, (WH + 2.5) / 2 + 0.1, HLP);
      m.castShadow = true; scene.add(m);
      const top = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.5, 1.4), gateColMat);
      top.position.set(gx, WH + 2.5 + 0.35, HLP);
      scene.add(top);
    });

    // ── 100 INTERACTIVE GRID SECTIONS (10x10) ──
    const GC = 10, GR = 10;
    const CW = PLOT / GC, CD = PLOT / GR;
    const FY = 0.38;

    const fracMeshes: any[] = [];
    const stateColorsArr = STATE_COLORS.map(c => new THREE.Color(c));
    const stateEmissive = [
      new THREE.Color(0x002c20), new THREE.Color(0x321a00),
      new THREE.Color(0x13134c), new THREE.Color(0x2d0000),
    ];
    const stateOpacities = [0.28, 0.44, 0.50, 0.35];

    const getSeedState = (r: number, c: number) => {
      const h = (r * 17 + c * 7 + r * c) % 100;
      if (h < 26) return 2; if (h < 39) return 1; if (h < 47) return 3; return 0;
    };

    const mkSpriteLabel = (text: string, colorHex: string) => {
      const [cnv, ctx] = mkCanvas(80, 40);
      ctx.font = 'bold 20px monospace';
      ctx.fillStyle = colorHex;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(text, 40, 20);
      const mat = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cnv), transparent: true, depthWrite: false });
      const spr = new THREE.Sprite(mat);
      spr.scale.set(CW * 0.72, CD * 0.55, 1);
      return spr;
    };

    for (let r = 0; r < GR; r++) for (let c = 0; c < GC; c++) {
      const state = getSeedState(r, c);
      const geo = new THREE.PlaneGeometry(CW - 0.22, CD - 0.22);
      const mat = new THREE.MeshLambertMaterial({
        color: stateColorsArr[state], emissive: stateEmissive[state],
        emissiveIntensity: state === 1 ? 0.9 : 0.25, transparent: true,
        opacity: stateOpacities[state], depthWrite: false
      });
      const x = -PLOT / 2 + CW * (c + 0.5), z = -PLOT / 2 + CD * (r + 0.5);
      const m = new THREE.Mesh(geo, mat);
      m.rotation.x = -Math.PI / 2; m.position.set(x, FY, z);
      const colLetter = String.fromCharCode(65 + c);
      m.userData = {
        row: r, col: c, state, id: `${colLetter}${r + 1}`,
        label: `Section ${colLetter}${r + 1}`,
        price: `₹${(11900 + Math.floor(Math.sin(r * 9 + c * 14) * 600 + 600)).toLocaleString('en-IN')}/Sq.yd`,
        size: `${6 + ((r * 2 + c * 6) % 7)} Sq.yd`,
        status: STATE_LABELS[state],
        hint: state === 0 ? 'Open to place buy order' : state === 1 ? '3 active bids — join now' : 'Mutation complete · Under management',
      };
      scene.add(m); fracMeshes.push(m);
      const spr = mkSpriteLabel(`${colLetter}${r + 1}`, STATE_COLORS[state]);
      spr.position.set(x, FY + 0.55, z);
      scene.add(spr);
      m.userData.sprite = spr;
    }

    // ── FIX: GRID LINES — ONLY DRAW WITHIN THE PLOT, NO INFINITE EXTENSION ──
    // Previously grid lines used PlaneGeometry spanning full PLOT width/height
    // which when combined with a repeating road texture created infinite white
    // stripes across sections A5-J5 and A6-J6. 
    // Fix: Draw grid lines strictly within bounds using BoxGeometry segments
    // that start and stop exactly at the plot boundary.
    const gridM = new THREE.MeshBasicMaterial({ color: 0x00D4AA });
    const mkGridLine = (x1: number, z1: number, x2: number, z2: number) => {
      // Clamp both endpoints strictly within plot bounds
      const px1 = Math.max(-HLP, Math.min(HLP, x1));
      const pz1 = Math.max(-HLP, Math.min(HLP, z1));
      const px2 = Math.max(-HLP, Math.min(HLP, x2));
      const pz2 = Math.max(-HLP, Math.min(HLP, z2));
      const dx = px2 - px1, dz = pz2 - pz1;
      const len = Math.sqrt(dx * dx + dz * dz);
      if (len < 0.01) return;
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, len), gridM);
      l.position.set((px1 + px2) / 2, FY + 0.04, (pz1 + pz2) / 2);
      l.rotation.y = Math.atan2(dx, dz);
      scene.add(l);
    };

    // Draw all 11 vertical and 11 horizontal grid lines — all strictly clamped to PLOT
    for (let c = 0; c <= GC; c++) {
      const xc = -PLOT / 2 + CW * c;
      mkGridLine(xc, -PLOT / 2, xc, PLOT / 2);
    }
    // ── FIX: For rows 4 and 5 (A5,6 to J5,6) — these horizontal lines are
    // the ones that "pass through" the model because row 4 and 5 z-positions
    // align with the section grid at z ≈ -3.3 and z ≈ 3.3 which coincide with
    // where the road texture white stripes used to appear.
    // Now that road texture white lines are removed AND grid lines are strictly
    // clamped to plot boundary, this issue is fully resolved.
    for (let r = 0; r <= GR; r++) {
      const zr = -PLOT / 2 + CD * r;
      mkGridLine(-PLOT / 2, zr, PLOT / 2, zr);
    }

    const scanGeo = new THREE.PlaneGeometry(PLOT, PLOT);
    const scanMat = new THREE.MeshBasicMaterial({ color: 0x00D4AA, transparent: true, opacity: 0.04, depthWrite: false, side: THREE.DoubleSide });
    const scanPlane = new THREE.Mesh(scanGeo, scanMat);
    scanPlane.rotation.x = -Math.PI / 2; scanPlane.position.y = 1;
    scene.add(scanPlane);

    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00D4AA, transparent: true, opacity: 0.14, wireframe: false });
    const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(PLOT * 0.66, 0.1, 6, 80), ringMat);
    ringMesh.rotation.x = Math.PI / 2; ringMesh.position.y = 0.45;
    scene.add(ringMesh);

    // ── 2 VACANT PLOTS ──
    const VP1_X = -(HLP + ROAD_W + 5 + HLP); 
    const VP1_Z = 0;
    const VP_SIZE = 55;

    const vp1Ground = new THREE.Mesh(
      new THREE.PlaneGeometry(VP_SIZE, VP_SIZE),
      new THREE.MeshLambertMaterial({ map: vacantTex(), color: 0xbba888 })
    );
    vp1Ground.rotation.x = -Math.PI / 2;
    vp1Ground.position.set(VP1_X, 0.06, VP1_Z);
    vp1Ground.receiveShadow = true;
    scene.add(vp1Ground);

    const vpWallMat = new THREE.MeshLambertMaterial({ color: 0xb8b0a0 });
    const vpWH = 1.8;
    const mkVpWall = (w: number, d: number, x: number, z: number) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, vpWH, d), vpWallMat);
      b.position.set(x, vpWH / 2 + 0.1, z);
      b.castShadow = true; scene.add(b);
    };
    const vp1HLP = VP_SIZE / 2;
    mkVpWall(VP_SIZE + 0.7, 0.7, VP1_X, VP1_Z - vp1HLP);
    mkVpWall(VP_SIZE + 0.7, 0.7, VP1_X, VP1_Z + vp1HLP);
    mkVpWall(0.7, VP_SIZE, VP1_X - vp1HLP, VP1_Z);
    mkVpWall(0.7, VP_SIZE, VP1_X + vp1HLP, VP1_Z);

    const mkSignboard = (x: number, z: number, textLine1: string, textLine2: string, rotY = 0) => {
      const [signC, signCtx] = mkCanvas(256, 128);
      signCtx.fillStyle = '#fffaf0';
      signCtx.fillRect(0, 0, 256, 128);
      signCtx.strokeStyle = '#cc9900';
      signCtx.lineWidth = 6;
      signCtx.strokeRect(3, 3, 250, 122);
      signCtx.fillStyle = '#cc4400';
      signCtx.font = 'bold 28px sans-serif';
      signCtx.textAlign = 'center';
      signCtx.fillText(textLine1, 128, 50);
      signCtx.fillStyle = '#333333';
      signCtx.font = '20px sans-serif';
      signCtx.fillText(textLine2, 128, 90);
      const signTex = new THREE.CanvasTexture(signC);
      const board = new THREE.Mesh(
        new THREE.BoxGeometry(8, 4, 0.3),
        [
          new THREE.MeshLambertMaterial({ color: 0x8b6914 }),
          new THREE.MeshLambertMaterial({ color: 0x8b6914 }),
          new THREE.MeshLambertMaterial({ color: 0x8b6914 }),
          new THREE.MeshLambertMaterial({ color: 0x8b6914 }),
          new THREE.MeshLambertMaterial({ map: signTex }),
          new THREE.MeshLambertMaterial({ color: 0x6a4f10 }),
        ]
      );
      board.position.set(x, 5.5, z);
      board.rotation.y = rotY;
      board.castShadow = true;
      scene.add(board);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 5.5, 8), new THREE.MeshLambertMaterial({ color: 0x8b6914 }));
      post.position.set(x, 2.75, z);
      post.rotation.y = rotY;
      scene.add(post);
    };
    mkSignboard(VP1_X, VP1_Z - vp1HLP + 2, 'PLOT FOR SALE', '1200 Sq.yd · Survey #42', 0);

    const VP2_X = -(HLP + ROAD_W + 5 + HLP);
    const VP2_Z = -(HLP + ROAD_W + 5 + 28);
    const VP2_SIZE = 55;

    const vp2Ground = new THREE.Mesh(
      new THREE.PlaneGeometry(VP2_SIZE, VP2_SIZE),
      new THREE.MeshLambertMaterial({ map: vacantTex(), color: 0xb0a080 })
    );
    vp2Ground.rotation.x = -Math.PI / 2;
    vp2Ground.position.set(VP2_X, 0.06, VP2_Z);
    vp2Ground.receiveShadow = true;
    scene.add(vp2Ground);

    const vp2HLP = VP2_SIZE / 2;
    mkVpWall(VP2_SIZE + 0.7, 0.7, VP2_X, VP2_Z - vp2HLP);
    mkVpWall(VP2_SIZE + 0.7, 0.7, VP2_X, VP2_Z + vp2HLP);
    mkVpWall(0.7, VP2_SIZE, VP2_X - vp2HLP, VP2_Z);
    mkVpWall(0.7, VP2_SIZE, VP2_X + vp2HLP, VP2_Z);
    mkSignboard(VP2_X, VP2_Z + vp2HLP - 2, 'PLOT FOR SALE', '900 Sq.yd · Survey #38', Math.PI);

    // ── BUILDING LAYOUT ──
    interface BuildingDef {
      x: number; z: number; w: number; d: number; h: number;
      cols: number; rows: number; base: string; win: string; side: string;
    }

    const BLDGS: BuildingDef[] = [
      // --- NORTH DISTRICT (z around -137 to -140): must clear W-perimeter road (x: -33 to -47) ---
      // Bldg 0: right edge = -66+14 = -52, clears road right edge at -47 by 5 units
      //   Fix: Z modified to -143 to clear z[-125, -115] city road zone
      { x: -66, z: -143, w: 28, d: 24, h: 78, cols: 7, rows: 23, base: '#2d3b4e', win: '#97cdee', side: '#39485b' },

      // Bldg 1: center (0,-138) — no collision, keep as-is
      //   Fix: Z modified to -145 to clear z[-125, -115] city road zone
      { x: 0, z: -145, w: 34, d: 26, h: 108, cols: 9, rows: 32, base: '#23303d', win: '#bcdfff', side: '#2d3b4a' },

      // Bldg 2: left edge = 65-13 = 52, clears E-perimeter road at 47 by 5 units
      //   Fix: Z modified to -142 to clear z[-125, -115] city road zone
      { x: 65, z: -142, w: 26, d: 22, h: 70, cols: 7, rows: 21, base: '#3a4a58', win: '#82a5cc', side: '#455564' },

      // Bldg 3: right edge = -71+19 = -52, clears road left edge at -47 by 5 units
      //   Fix: Z modified to -146 to clear z[-125, -115] city road zone
      { x: -71, z: -146, w: 38, d: 30, h: 90, cols: 10, rows: 27, base: '#2b3846', win: '#96b8cf', side: '#344352' },

      // --- EAST DISTRICT: must clear E-perimeter road (x:33→47) and city road x=120 (x:115→125) ---
      // Bldg 4: right edge=110 (clears 115), back edge=-52 (clears z=-47 N-perimeter road)
      { x: 95, z: -65, w: 30, d: 26, h: 58, cols: 8, rows: 17, base: '#5b4c3d', win: '#dec288', side: '#6b5c4d' },

      // Bldg 5: back edge = 15+13 = 28 (clears road front edge at 33) and right edge = 108 (clears city road x=120)
      { x: 96, z: 15, w: 24, d: 26, h: 46, cols: 6, rows: 13, base: '#6c5c48', win: '#cdb377', side: '#786955' },

      // --- WEST DISTRICT: must clear W-perimeter road (x:-47→-33) ---
      // Bldg 6: right edge=-52 (clears -47 road edge), back edge = -53 (clears -47 road edge)
      { x: -66, z: -65, w: 28, d: 24, h: 62, cols: 7, rows: 18, base: '#414d41', win: '#96ce96', side: '#4a5b4a' },

      // Bldg 7: right=-52 (clears -47 road edge), front=53 (clears 47 road edge)
      { x: -64, z: 65, w: 24, d: 24, h: 42, cols: 6, rows: 12, base: '#4c5c4c', win: '#8cc58c', side: '#566656' },

      // --- NORTHEAST CORNER: must clear city roads z=-120 and x=120 ---
      // Bldg 8: left=134 (clears x=125 road), front=-110 (clears z=-115 road)
      { x: 150, z: -96, w: 32, d: 28, h: 66, cols: 8, rows: 20, base: '#2e3d4a', win: '#aad4f5', side: '#384a58' },

      // --- SOUTH DISTRICT: must clear W-perimeter (x:-47→-33) and city road z=120 ---
      // Bldg 9: right=-52 (clears -47 road), front=130 (clears z=125 road)
      { x: -66, z: 141, w: 28, d: 22, h: 52, cols: 7, rows: 15, base: '#4a3e35', win: '#d4b87a', side: '#5a4e45' },

      // Bldg 10: left=53 (clears 47 road), front=130 (clears z=125 road)
      { x: 66, z: 141, w: 26, d: 22, h: 48, cols: 6, rows: 14, base: '#3d4a38', win: '#90c890', side: '#4a5844' },

      // Bldg 11: left=133 (clears x=125 road), front=130 (clears z=125 road)
      { x: 148, z: 142, w: 30, d: 24, h: 44, cols: 7, rows: 13, base: '#3d4840', win: '#94c294', side: '#4a5550' },

      // Bldg 12: back=-90 (clears z=-115 road)
      { x: -145, z: -100, w: 24, d: 20, h: 44, cols: 6, rows: 13, base: '#354545', win: '#7ab8b8', side: '#405555' },

      // Bldg 13: front=-28 (clears z=-33 N-perimeter road)
      { x: -155, z: -18, w: 22, d: 20, h: 38, cols: 5, rows: 11, base: '#3a4a3a', win: '#8acc8a', side: '#455545' },
    ];

    const ROAD_ZONES = [
      // Perimeter roads
      { xMin: -47, xMax: -33, zMin: -300, zMax: 300 }, // W-perimeter
      { xMin:  33, xMax:  47, zMin: -300, zMax: 300 }, // E-perimeter
      { xMin: -300, xMax: 300, zMin: -47, zMax: -33 }, // N-perimeter
      { xMin: -300, xMax: 300, zMin:  33, zMax:  47 }, // S-perimeter
      // City grid roads (x-axis)
      { xMin: 115, xMax: 125, zMin: -300, zMax: 300 },
      { xMin: -125, xMax: -115, zMin: -300, zMax: 300 },
      { xMin: 175, xMax: 185, zMin: -300, zMax: 300 },
      { xMin: -185, xMax: -175, zMin: -300, zMax: 300 },
      // City grid roads (z-axis)
      { xMin: -300, xMax: 300, zMin: -125, zMax: -115 },
      { xMin: -300, xMax: 300, zMin: 115, zMax: 125 },
      { xMin: -300, xMax: 300, zMin: 175, zMax: 185 },
      { xMin: -300, xMax: 300, zMin: -255, zMax: -245 },
    ];

    const CLEARANCE = 4; // minimum gap between building edge and road edge

    const validateBuilding = (b: BuildingDef) => {
      const bLeft = b.x - b.w / 2 - CLEARANCE;
      const bRight = b.x + b.w / 2 + CLEARANCE;
      const bFront = b.z - b.d / 2 - CLEARANCE;
      const bBack = b.z + b.d / 2 + CLEARANCE;
      for (const r of ROAD_ZONES) {
        if (bLeft < r.xMax && bRight > r.xMin && bFront < r.zMax && bBack > r.zMin) {
          throw new Error(
            `Building at (${b.x},${b.z}) w=${b.w} d=${b.d} collides with road zone ` +
            `x[${r.xMin}→${r.xMax}] z[${r.zMin}→${r.zMax}]`
          );
        }
      }
    };

    // Validate all list elements:
    BLDGS.forEach(validateBuilding);

    BLDGS.forEach(b => {
      const g = new THREE.Group();

      const pod = new THREE.Mesh(
        new THREE.BoxGeometry(b.w + 5, 3.5, b.d + 5),
        new THREE.MeshLambertMaterial({ color: 0x3d3d42 })
      );
      pod.position.y = 1.75; pod.castShadow = true; pod.receiveShadow = true;
      g.add(pod);

      const lobby = new THREE.Mesh(
        new THREE.BoxGeometry(b.w + 2, 5, b.d + 2),
        new THREE.MeshLambertMaterial({ color: 0x303540 })
      );
      lobby.position.y = 3.5 + 2.5; lobby.castShadow = true;
      g.add(lobby);

      const ft = facadeTex(b.cols, b.rows, b.base, b.win);
      const st = facadeTex(Math.floor(b.d / 4), b.rows, b.side, b.win);
      const mats = [
        new THREE.MeshLambertMaterial({ map: st, color: 0xbac8de }),
        new THREE.MeshLambertMaterial({ map: st, color: 0xabc0df }),
        new THREE.MeshLambertMaterial({ color: 0x1a212e }),
        new THREE.MeshLambertMaterial({ map: roofTex() }),
        new THREE.MeshLambertMaterial({ map: ft, color: 0xccd8e0 }),
        new THREE.MeshLambertMaterial({ map: ft, color: 0xbab8d0 }),
      ];
      const body = new THREE.Mesh(new THREE.BoxGeometry(b.w, b.h, b.d), mats);
      body.position.y = b.h / 2 + 3.5 + 5; body.castShadow = true; body.receiveShadow = true;
      g.add(body);

      if (b.h > 55) {
        const setback = new THREE.Mesh(
          new THREE.BoxGeometry(b.w * 0.7, b.h * 0.3, b.d * 0.7),
          new THREE.MeshLambertMaterial({ map: ft, color: 0xc8d8e8 })
        );
        setback.position.y = b.h + 3.5 + 5 + b.h * 0.15; setback.castShadow = true;
        g.add(setback);
      }

      const acM = new THREE.MeshLambertMaterial({ color: 0x485363 });
      [[-b.w * 0.18, 0], [b.w * 0.18, 0], [0, b.d * 0.2]].forEach(([ox, oz]) => {
        const ac = new THREE.Mesh(new THREE.BoxGeometry(b.w * 0.2, 2.2, b.d * 0.14), acM);
        ac.position.set(ox, b.h + 3.5 + 5 + 1.1, oz as number); ac.castShadow = true;
        g.add(ac);
      });

      if (b.h > 60 && Math.random() > 0.4) {
        const tank = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.8, 4, 10), new THREE.MeshLambertMaterial({ color: 0x5a6070 }));
        tank.position.set(-b.w * 0.2, b.h + 3.5 + 5 + 4, b.d * 0.15); tank.castShadow = true;
        g.add(tank);
        const legs = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 3.5, 6), new THREE.MeshLambertMaterial({ color: 0x3d4550 }));
        legs.position.set(-b.w * 0.2, b.h + 3.5 + 5 + 1.75, b.d * 0.15);
        g.add(legs);
      }

      if (b.h > 65) {
        const sp = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.4, 14, 8), new THREE.MeshLambertMaterial({ color: 0x6e7e93 }));
        sp.position.set(0, b.h + 3.5 + 5 + 7, 0); g.add(sp);
        const blink = new THREE.Mesh(new THREE.SphereGeometry(0.4, 6, 6), new THREE.MeshBasicMaterial({ color: 0xff1100 }));
        blink.position.set(0, b.h + 3.5 + 5 + 14.3, 0); g.add(blink);
        const pt = new THREE.PointLight(0xff1100, 0.5, 22);
        pt.position.set(0, b.h + 3.5 + 5 + 14.3, 0); g.add(pt);
      }

      g.position.set(b.x, 0, b.z);
      scene.add(g);
    });

    // ── SMALL CITY STRUCTURES ──
    const mkBusStop = (x: number, z: number, rotY = 0) => {
      const g = new THREE.Group();
      const frame = new THREE.Mesh(new THREE.BoxGeometry(5, 3, 0.15), new THREE.MeshLambertMaterial({ color: 0x3a4060, transparent: true, opacity: 0.7 }));
      frame.position.y = 2.5; g.add(frame);
      const roof = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.2, 1.8), new THREE.MeshLambertMaterial({ color: 0x2a3050 }));
      roof.position.y = 4.1; roof.position.z = -0.8; g.add(roof);
      const post1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 4.2, 8), new THREE.MeshLambertMaterial({ color: 0x606880 }));
      post1.position.set(-2.4, 2.1, -0.8); g.add(post1);
      const post2 = post1.clone(); post2.position.set(2.4, 2.1, -0.8); g.add(post2);
      g.position.set(x, 0, z); g.rotation.y = rotY;
      scene.add(g);
    };
    mkBusStop(-sOuter - 6, -20, 0);
    mkBusStop(-sOuter - 6, 20, 0);
    mkBusStop(sOuter + 6, -20, Math.PI);
    mkBusStop(25, -sOuter - 6, Math.PI / 2);
    mkBusStop(-25, sOuter + 6, -Math.PI / 2);

    const parkingLotMat = new THREE.MeshLambertMaterial({ color: 0x202225 });
    const parkingGeo = new THREE.PlaneGeometry(45, 35);
    const parkLot = new THREE.Mesh(parkingGeo, parkingLotMat);
    parkLot.rotation.x = -Math.PI / 2; parkLot.position.set(sOuter + 28, 0.03, -30);
    scene.add(parkLot);
    const lineMat = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
    for (let i = -4; i <= 4; i++) {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 6), lineMat);
      line.rotation.x = -Math.PI / 2; line.position.set(sOuter + 28 + i * 4.5, 0.04, -30);
      scene.add(line);
    }

    const mkShop = (x: number, z: number, color: number, rotY = 0) => {
      const g = new THREE.Group();
      const base = new THREE.Mesh(new THREE.BoxGeometry(8, 4, 6), new THREE.MeshLambertMaterial({ color: 0x384050 }));
      base.position.y = 2; base.castShadow = true; g.add(base);
      const awning = new THREE.Mesh(new THREE.BoxGeometry(9, 0.25, 3.5), new THREE.MeshLambertMaterial({ color }));
      awning.position.set(0, 4.2, -3.5); g.add(awning);
      const sign = new THREE.Mesh(new THREE.BoxGeometry(5, 1.2, 0.15), new THREE.MeshLambertMaterial({ color: 0xfff8e0 }));
      sign.position.set(0, 3.3, -3.08); g.add(sign);
      g.position.set(x, 0, z); g.rotation.y = rotY;
      scene.add(g);
    };
    mkShop(-30, sOuter + 10, 0xcc4422, Math.PI);
    mkShop(-15, sOuter + 10, 0x2255aa, Math.PI);
    mkShop(0, sOuter + 10, 0x226644, Math.PI);
    mkShop(15, sOuter + 10, 0x884422, Math.PI);

    // ── STREET LIGHTS ──
    const mkStreetlight = (x: number, z: number, armDX: number, armDZ: number) => {
      const poleM = new THREE.MeshLambertMaterial({ color: 0x2c3040 });
      const armLen = 2.8;

      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 10.5, 8), poleM);
      pole.position.set(x, 5.25, z);
      pole.castShadow = true;
      scene.add(pole);

      const armX = x + armDX * (armLen / 2);
      const armZ = z + armDZ * (armLen / 2);

      const armRotY = Math.atan2(armDX, armDZ);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(armLen, 0.16, 0.16), poleM);
      arm.position.set(armX, 10.6, armZ);
      arm.rotation.y = armRotY;
      scene.add(arm);

      const tiltRod = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.6, 6), poleM);
      const tipX = x + armDX * armLen;
      const tipZ = z + armDZ * armLen;
      tiltRod.position.set(tipX, 10.0, tipZ);
      tiltRod.rotation.z = 0.25;
      scene.add(tiltRod);

      const lampHouse = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 0.8), new THREE.MeshLambertMaterial({ color: 0x1a2030 }));
      lampHouse.position.set(tipX, 9.85, tipZ);
      scene.add(lampHouse);

      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfff8b0 }));
      bulb.position.set(tipX, 9.72, tipZ);
      scene.add(bulb);

      const lit = new THREE.PointLight(0xfff5aa, 0.75, 35);
      lit.position.set(tipX, 9.2, tipZ);
      scene.add(lit);
    };

    const lightPositions = [-75, -50, -25, 0, 25, 50, 75];
    const lightYOuter = sOuter + 1.2;

    lightPositions.forEach(cp => {
      mkStreetlight(cp, -lightYOuter, 0, 1);
      mkStreetlight(cp, lightYOuter, 0, -1);
      mkStreetlight(lightYOuter, cp, -1, 0);
      mkStreetlight(-lightYOuter, cp, 1, 0);
    });

    // ── TREES ──
    interface OccupiedZone { x: number; z: number; hw: number; hd: number; }
    const occupiedZones: OccupiedZone[] = [
      { x: 0, z: 0, hw: HLP + 3, hd: HLP + 3 },
      { x: VP1_X, z: VP1_Z, hw: vp1HLP + 4, hd: vp1HLP + 4 },
      { x: VP2_X, z: VP2_Z, hw: vp2HLP + 4, hd: vp2HLP + 4 },
    ];

    BLDGS.forEach(b => {
      occupiedZones.push({ x: b.x, z: b.z, hw: b.w / 2 + 4, hd: b.d / 2 + 4 });
    });

    occupiedZones.push({ x: 0, z: -roadOffset, hw: 260, hd: ROAD_W / 2 + 1 });
    occupiedZones.push({ x: 0, z: roadOffset, hw: 260, hd: ROAD_W / 2 + 1 });
    occupiedZones.push({ x: -roadOffset, z: 0, hw: ROAD_W / 2 + 1, hd: 260 });
    occupiedZones.push({ x: roadOffset, z: 0, hw: ROAD_W / 2 + 1, hd: 260 });
    [-120, -180, 120, 180].forEach(zz => occupiedZones.push({ x: 0, z: zz, hw: 260, hd: ROAD_W2 / 2 + 1 }));
    [-120, -180, 120, 180, -250, 250].forEach(xx => occupiedZones.push({ x: xx, z: 0, hw: ROAD_W2 / 2 + 1, hd: 260 }));

    const isOccupied = (tx: number, tz: number, margin = 5): boolean => {
      return occupiedZones.some(z =>
        Math.abs(tx - z.x) < z.hw + margin && Math.abs(tz - z.z) < z.hd + margin
      );
    };

    const mkTree = (tx: number, tz: number, scale = 1.0, variety = 0) => {
      if (isOccupied(tx, tz, 3)) return; 

      const g = new THREE.Group();
      const trunkH = 4.5 + Math.random() * 2;
      const trunkR = 0.25 + Math.random() * 0.12;

      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(trunkR * 0.6, trunkR, trunkH, 7),
        new THREE.MeshLambertMaterial({ color: variety === 2 ? 0x5c3a1e : 0x4a2c10 })
      );
      trunk.position.y = trunkH / 2; trunk.castShadow = true;
      g.add(trunk);

      if (variety === 0) {
        const foliageR = (2.5 + Math.random() * 1.5) * scale;
        const foliageMat = new THREE.MeshLambertMaterial({ color: new THREE.Color().setHSL(0.3 + Math.random() * 0.06, 0.72, 0.22 + Math.random() * 0.08) });
        const foliage = new THREE.Mesh(new THREE.SphereGeometry(foliageR, 8, 7), foliageMat);
        foliage.position.y = trunkH + foliageR * 0.7; foliage.castShadow = true;
        g.add(foliage);
        const sub = new THREE.Mesh(new THREE.SphereGeometry(foliageR * 0.65, 7, 6), foliageMat);
        sub.position.set(foliageR * 0.4, trunkH + foliageR * 0.95, 0); sub.castShadow = true;
        g.add(sub);
      } else if (variety === 1) {
        const coneMat = new THREE.MeshLambertMaterial({ color: 0x1a4a20 });
        [0, 1, 2].forEach(tier => {
          const cone = new THREE.Mesh(
            new THREE.ConeGeometry((2.2 - tier * 0.5) * scale, 3.5 - tier * 0.3, 8),
            coneMat
          );
          cone.position.y = trunkH + tier * 2.5; cone.castShadow = true;
          g.add(cone);
        });
      } else {
        const palmMat = new THREE.MeshLambertMaterial({ color: 0x2d7030 });
        for (let f = 0; f < 8; f++) {
          const angle = (f / 8) * Math.PI * 2;
          const frond = new THREE.Mesh(new THREE.SphereGeometry(1.8 * scale, 5, 4), palmMat);
          frond.position.set(Math.cos(angle) * 2.5, trunkH + 0.5, Math.sin(angle) * 2.5);
          frond.scale.set(0.4, 0.2, 1.8); frond.rotation.y = angle; frond.castShadow = true;
          g.add(frond);
        }
      }

      g.position.set(tx, 0, tz);
      g.rotation.y = Math.random() * Math.PI * 2;
      scene.add(g);
    };

    for (let i = -8; i <= 8; i++) {
      const px = i * 18;
      mkTree(px, -(sOuter + 4), 0.9, 0);
      mkTree(px, sOuter + 4, 0.9, 0);
      mkTree(-(sOuter + 4), px, 0.9, 1);
      mkTree(sOuter + 4, px, 0.9, 1);
    }

    const cityTreeSpots = [
      [-40, -98], [-20, -95], [20, -95], [40, -100], [70, -98], [-70, -96], [-85, -98],
      [110, -55], [108, -15], [112, 15], [110, 50], [115, 80],
      [-40, 100], [-15, 105], [15, 105], [40, 100], [-70, 108], [70, 108],
      [-108, -55], [-112, -15], [-108, 15], [-112, 50], [-115, 80],
      [-85, -30], [-90, 10], [-85, 50],
      [160, -60], [165, -140], [-140, -80], [-165, 20], [150, 80],
      [-135, -100], [-155, -80], [-160, -40],
    ];
    cityTreeSpots.forEach(([tx, tz], i) => mkTree(tx, tz, 0.85 + Math.random() * 0.3, i % 3));

    const parkCenterX = 80, parkCenterZ = -65;
    const parkGrass = new THREE.Mesh(new THREE.PlaneGeometry(30, 25), new THREE.MeshLambertMaterial({ map: grassTex(), color: 0x3a6a2a }));
    parkGrass.rotation.x = -Math.PI / 2; parkGrass.position.set(parkCenterX, 0.04, parkCenterZ);
    scene.add(parkGrass);

    const mkBench = (bx: number, bz: number) => {
      const seat = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 0.8), new THREE.MeshLambertMaterial({ color: 0x8b5a2b }));
      seat.position.set(bx, 0.85, bz); scene.add(seat);
      const back = new THREE.Mesh(new THREE.BoxGeometry(3, 0.8, 0.12), new THREE.MeshLambertMaterial({ color: 0x8b5a2b }));
      back.position.set(bx, 1.4, bz + 0.44); scene.add(back);
      [-1.2, 1.2].forEach(lx => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.85, 0.8), new THREE.MeshLambertMaterial({ color: 0x606060 }));
        leg.position.set(bx + lx, 0.42, bz); scene.add(leg);
      });
    };
    mkBench(parkCenterX - 6, parkCenterZ);
    mkBench(parkCenterX + 6, parkCenterZ + 4);

    for (let ti = 0; ti < 6; ti++) {
      const angle = (ti / 6) * Math.PI * 2;
      const pr = 10 + Math.random() * 3;
      mkTree(parkCenterX + Math.cos(angle) * pr, parkCenterZ + Math.sin(angle) * pr, 1.1, ti % 2);
    }
    mkTree(parkCenterX, parkCenterZ, 1.3, 0);

    // ── TRAFFIC LIGHTS ──
    const mkTrafficLight = (x: number, z: number, rotY = 0) => {
      const g = new THREE.Group();
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 7, 8), new THREE.MeshLambertMaterial({ color: 0x2a2a30 }));
      pole.position.y = 3.5; g.add(pole);
      const housing = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.2, 0.6), new THREE.MeshLambertMaterial({ color: 0x1a1a22 }));
      housing.position.y = 7; g.add(housing);
      [[0xff2200, 7.7], [0xffaa00, 7.0], [0x00cc44, 6.3]].forEach(([col, hy]) => {
        const lens = new THREE.Mesh(new THREE.CircleGeometry(0.22, 10), new THREE.MeshBasicMaterial({ color: col as number }));
        lens.position.set(0, hy as number, 0.32); g.add(lens);
      });
      g.position.set(x, 0, z); g.rotation.y = rotY;
      scene.add(g);
    };
    const tLoff = roadOffset + ROAD_W / 2 + 0.5;
    mkTrafficLight(-tLoff, -tLoff + 3);
    mkTrafficLight(tLoff, -tLoff + 3, Math.PI);
    mkTrafficLight(-tLoff, tLoff - 3);
    mkTrafficLight(tLoff, tLoff - 3, Math.PI);

    // ── FIRE HYDRANTS ──
    const mkHydrant = (x: number, z: number) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.9, 8), new THREE.MeshLambertMaterial({ color: 0xdd2222 }));
      m.position.set(x, 0.45, z); scene.add(m);
      const top = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.2, 8), new THREE.MeshLambertMaterial({ color: 0xcc1111 }));
      top.position.set(x, 0.95, z); scene.add(top);
    };
    [[-sInner - 1, -28], [-sInner - 1, 28], [sInner + 1, -28], [sInner + 1, 28]].forEach(([hx, hz]) => mkHydrant(hx, hz));

    // ── UTILITY POLES ──
    const mkUtilityPole = (x: number, z: number) => {
      const pm = new THREE.MeshLambertMaterial({ color: 0x5a4535 });
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 12, 8), pm);
      pole.position.set(x, 6, z); scene.add(pole);
      const xarm = new THREE.Mesh(new THREE.BoxGeometry(5, 0.2, 0.2), pm);
      xarm.position.set(x, 11.5, z); scene.add(xarm);
    };
    [[-sOuter - 10, -55], [-sOuter - 10, 0], [-sOuter - 10, 55]].forEach(([ux, uz]) => mkUtilityPole(ux, uz));

    // ── MAILBOXES / VENDINGS ──
    const mkMailbox = (x: number, z: number, col = 0x1155aa) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.5), new THREE.MeshLambertMaterial({ color: col }));
      m.position.set(x, 0.6, z); m.castShadow = true; scene.add(m);
    };
    mkMailbox(-sInner - 1.5, -sInner - 2.5, 0xcc1111);
    mkMailbox(sInner + 1.5, sInner + 2.5, 0x1155aa);

    // ── FOUNTAIN ──
    const fCenterX = -35, fCenterZ = sOuter + 12;
    const fBase = new THREE.Mesh(new THREE.CylinderGeometry(5, 5.5, 0.8, 16), new THREE.MeshLambertMaterial({ color: 0x888880 }));
    fBase.position.set(fCenterX, 0.4, fCenterZ); scene.add(fBase);
    const fWater = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, 0.3, 16), new THREE.MeshLambertMaterial({ color: 0x3399cc, transparent: true, opacity: 0.75 }));
    fWater.position.set(fCenterX, 0.95, fCenterZ); scene.add(fWater);
    const fCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.6, 1.5, 8), new THREE.MeshLambertMaterial({ color: 0x999990 }));
    fCenter.position.set(fCenterX, 1.55, fCenterZ); scene.add(fCenter);

    // ── TRAFFIC SIMULATION ──
    const trafficPaths = [
      // Close in Perimeter Lanes
      { startX: 38.5, startZ: -250, endX: 38.5, endZ: 250, rotY: 0 },
      { startX: 41.5, startZ: 250, endX: 41.5, endZ: -250, rotY: Math.PI },
      { startX: -41.5, startZ: -250, endX: -41.5, endZ: 250, rotY: 0 },
      { startX: -38.5, startZ: 250, endX: -38.5, endZ: -250, rotY: Math.PI },
      { startX: -250, startZ: 38.5, endX: 250, endZ: 38.5, rotY: Math.PI / 2 },
      { startX: 250, startZ: 41.5, endX: -250, endZ: 41.5, rotY: -Math.PI / 2 },
      { startX: -250, startZ: -41.5, endX: 250, endZ: -41.5, rotY: Math.PI / 2 },
      { startX: 250, startZ: -38.5, endX: -250, endZ: -38.5, rotY: -Math.PI / 2 },

      // Inner Grid Lanes
      { startX: 118.5, startZ: -250, endX: 118.5, endZ: 250, rotY: 0 },
      { startX: 121.5, startZ: 250, endX: 121.5, endZ: -250, rotY: Math.PI },
      { startX: -121.5, startZ: -250, endX: -121.5, endZ: 250, rotY: 0 },
      { startX: -118.5, startZ: 250, endX: -118.5, endZ: -250, rotY: Math.PI },
      { startX: -250, startZ: 118.5, endX: 250, endZ: 118.5, rotY: Math.PI / 2 },
      { startX: 250, startZ: 121.5, endX: -250, endZ: 121.5, rotY: -Math.PI / 2 },
      { startX: -250, startZ: -121.5, endX: 250, endZ: -121.5, rotY: Math.PI / 2 },
      { startX: 250, startZ: -118.5, endX: -250, endZ: -118.5, rotY: -Math.PI / 2 },
    ];

    const CAR_COLORS = [0x00ffcc, 0xffaa00, 0x00ff66, 0xeeff00, 0xff00aa, 0xffffff, 0x88aacc, 0xff3344];
    const trafficCars: any[] = [];
    trafficPaths.forEach((p, idx) => {
      const g = new THREE.Group();
      const color = CAR_COLORS[idx % CAR_COLORS.length];

      // Chassis
      const chassisMat = new THREE.MeshLambertMaterial({ color });
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 2.6), chassisMat);
      chassis.position.y = 0.35;
      chassis.castShadow = true;
      g.add(chassis);

      // Cabin / windows
      const cab = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.45, 1.4),
        new THREE.MeshLambertMaterial({ color: 0x0c111e })
      );
      cab.position.set(0, 0.75, -0.15);
      g.add(cab);

      // Headlights
      const headL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.1), new THREE.MeshBasicMaterial({ color: 0xfff7c4 }));
      headL.position.set(-0.4, 0.35, 1.31);
      const headR = headL.clone();
      headR.position.set(0.4, 0.35, 1.31);
      g.add(headL);
      g.add(headR);

      // Taillights
      const tailL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 0.1), new THREE.MeshBasicMaterial({ color: 0xff1100 }));
      tailL.position.set(-0.4, 0.35, -1.31);
      const tailR = tailL.clone();
      tailR.position.set(0.4, 0.35, -1.31);
      g.add(tailL);
      g.add(tailR);

      g.rotation.y = p.rotY;

      // Random starting positions
      const progress = Math.random();
      const x = p.startX + (p.endX - p.startX) * progress;
      const z = p.startZ + (p.endZ - p.startZ) * progress;
      g.position.set(x, 0.08, z);

      scene.add(g);
      trafficCars.push({
        group: g,
        path: p,
        progress,
        speed: 0.03 + Math.random() * 0.02 // progress fraction per second
      });
    });

    // ── INTERACTIVE MOUSE EVENTS ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const hideIntroTitle = () => {
      const el = document.getElementById('vlands-intro-title');
      if (el) {
        el.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        el.style.opacity = '0'; el.style.transform = 'translate(-50%, -35%)';
        setTimeout(() => { el.style.display = 'none'; }, 1000);
      }
    };

    const handleCheckingSelection = (clientX: number, clientY: number, clickAction = false) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(fracMeshes);
      if (hits.length) {
        const targetU = hits[0].object.userData;
        canvas.style.cursor = 'pointer';
        if (clickAction) setSelectedSection(targetU);
        else hoveredSectionRef.current = targetU;
      } else {
        canvas.style.cursor = 'grab';
        if (clickAction) setSelectedSection(null);
        else hoveredSectionRef.current = null;
      }
    };

    canvas.addEventListener('mousemove', (e: MouseEvent) => handleCheckingSelection(e.clientX, e.clientY, false));
    canvas.addEventListener('click', (e: MouseEvent) => { hideIntroTitle(); handleCheckingSelection(e.clientX, e.clientY, true); });

    // ── ORBITAL CAMERA ──
    let grab = false, autoRotate = true;
    let returnToAutoTimeout: any = null;
    let lastMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      hideIntroTitle(); grab = true; autoRotate = false;
      lastMousePos = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
      if (returnToAutoTimeout) clearTimeout(returnToAutoTimeout);
    };
    const onGlobalMouseMove = (e: MouseEvent) => {
      if (!grab) return;
      tTheta -= (e.clientX - lastMousePos.x) * 0.007;
      tPhi = Math.max(0.18, Math.min(1.45, tPhi - (e.clientY - lastMousePos.y) * 0.006));
      lastMousePos = { x: e.clientX, y: e.clientY };
    };
    const onGlobalMouseUp = () => {
      if (grab) { grab = false; canvas.style.cursor = 'grab'; returnToAutoTimeout = setTimeout(() => { autoRotate = true; }, 5000); }
    };
    const onWheel = (e: WheelEvent) => { hideIntroTitle(); e.preventDefault(); tRadius = Math.max(50, Math.min(280, tRadius + e.deltaY * 0.18)); };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onGlobalMouseMove);
    window.addEventListener('mouseup', onGlobalMouseUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    let touchStartDist = 0, touchStartRad = radius, touchHasMoved = false;
    let touchStartPos = { x: 0, y: 0 };

    const onTouchStart = (e: TouchEvent) => {
      hideIntroTitle(); grab = true; autoRotate = false; touchHasMoved = false;
      if (returnToAutoTimeout) clearTimeout(returnToAutoTimeout);
      if (e.touches.length === 1) {
        lastMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX, dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.sqrt(dx * dx + dy * dy); touchStartRad = tRadius; e.preventDefault();
      }
    };
    const onTouchGlobalMove = (e: TouchEvent) => {
      if (!grab) return;
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX, dy = e.touches[0].clientY - e.touches[1].clientY;
        tRadius = Math.max(50, Math.min(280, touchStartRad * (touchStartDist / Math.sqrt(dx*dx+dy*dy))));
        touchHasMoved = true; e.preventDefault();
      } else if (e.touches.length === 1) {
        const t = e.touches[0];
        tTheta -= (t.clientX - lastMousePos.x) * 0.007;
        tPhi = Math.max(0.18, Math.min(1.45, tPhi - (t.clientY - lastMousePos.y) * 0.006));
        lastMousePos = { x: t.clientX, y: t.clientY };
        if (Math.sqrt((t.clientX-touchStartPos.x)**2+(t.clientY-touchStartPos.y)**2) > 8) touchHasMoved = true;
        e.preventDefault();
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (grab) { grab = false; canvas.style.cursor = 'grab'; returnToAutoTimeout = setTimeout(() => { autoRotate = true; }, 5000); }
      if (e.changedTouches.length === 1 && !touchHasMoved) {
        hideIntroTitle();
        handleCheckingSelection(e.changedTouches[0].clientX, e.changedTouches[0].clientY, true);
      }
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchGlobalMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    const resizeObserver = new ResizeObserver(() => {
      const w = parent.clientWidth, h = parent.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    });
    resizeObserver.observe(parent);

    // ── ANIMATION LOOP ──
    const clock = new THREE.Clock();
    let lastTime = 0;
    const renderLoop = () => {
      const elapsed = clock.getElapsedTime();
      const dt = elapsed - lastTime;
      lastTime = elapsed;
      animationFrameIdRef.current = requestAnimationFrame(renderLoop);

      if (autoRotate) tTheta += 0.0011;
      theta += (tTheta - theta) * 0.055;
      phi += (tPhi - phi) * 0.055;
      radius += (tRadius - radius) * 0.055;
      updateCam();

      fracMeshes.forEach((mesh, index) => {
        const mState = mesh.userData.state;
        const isSelected = !!selectedSectionRef.current && mesh.userData.id === selectedSectionRef.current.id;
        const isHovered = !!hoveredSectionRef.current && mesh.userData.id === hoveredSectionRef.current.id;

        // Smooth physical floating/lifting height effect
        let targetY = FY;
        if (isSelected) {
          targetY = FY + 0.55;
        } else if (isHovered) {
          targetY = FY + 0.25;
        }
        mesh.position.y += (targetY - mesh.position.y) * 0.15;
        if (mesh.userData.sprite) {
          mesh.userData.sprite.position.y = mesh.position.y + 0.55;
        }

        if (mState === 1) {
          const pulse = 0.5 + 0.5 * Math.sin(elapsed * 2.8 + index * 0.4);
          mesh.material.emissiveIntensity = isSelected ? 2.5 : isHovered ? 1.8 : 0.65 + pulse * 0.8;
          mesh.material.opacity = isSelected ? 0.8 : isHovered ? 0.65 : 0.38 + pulse * 0.18;
        } else if (mState === 0) {
          const breathe = 0.5 + 0.5 * Math.sin(elapsed * 1.2 + index * 0.25);
          mesh.material.emissiveIntensity = isSelected ? 2.5 : isHovered ? 1.8 : 0.15 + breathe * 0.25;
          mesh.material.opacity = isSelected ? 0.8 : isHovered ? 0.65 : 0.24 + breathe * 0.12;
        } else {
          mesh.material.emissiveIntensity = isSelected ? 2.5 : isHovered ? 1.8 : 0.25;
          mesh.material.opacity = isSelected ? 0.8 : isHovered ? 0.65 : stateOpacities[mState];
        }
      });

      // Update traffic simulation flow
      trafficCars.forEach(car => {
        car.progress += dt * car.speed;
        if (car.progress > 1.0) car.progress -= 1.0;

        const p = car.path;
        const x = p.startX + (p.endX - p.startX) * car.progress;
        const z = p.startZ + (p.endZ - p.startZ) * car.progress;
        car.group.position.set(x, 0.08, z);
      });

      scanPlane.position.y = ((elapsed * 0.35) % 12) - 1;
      scanMat.opacity = 0.025 + 0.02 * Math.sin(elapsed * 2);
      ringMesh.rotation.z = elapsed * 0.08;
      ringMat.opacity = 0.08 + 0.06 * Math.sin(elapsed * 0.6);
      gridM.color.setRGB(0, (0.75 + 0.25 * Math.sin(elapsed * 1.8)) * 0.83, (0.75 + 0.25 * Math.sin(elapsed * 1.8)) * 0.66);

      if (fWater) {
        fWater.material.opacity = 0.65 + 0.1 * Math.sin(elapsed * 2.5);
      }

      renderer.render(scene, camera);
    };
    renderLoop();

    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      resizeObserver.disconnect();
      scene.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [loading, isFullscreen]);

  const toggleFullscreen = () => {
    if (isFullscreen) navigate('/portfolio/vlands');
    else navigate('/portfolio/vlands/3d');
  };

  return (
    <div
      ref={containerRef}
      className={`vlands-canvas-container relative rounded-3xl bg-[#06080e] overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 ease-out ${
        isFullscreen
          ? 'fixed inset-0 z-50 w-screen h-screen rounded-none'
          : 'w-full aspect-square md:aspect-[4/3] lg:aspect-[6/5]'
      }`}
    >
      {isFullscreen && (
        <div className="absolute top-0 left-0 right-0 h-7 bg-emerald-400/5 border-b border-emerald-400/25 flex items-center overflow-hidden z-40 select-none">
          <div className="bg-emerald-400 text-[#031d16] font-mono font-black text-[9px] uppercase tracking-widest px-3 py-1 mr-3 shrink-0 flex items-center h-full">
            ⬤ Live Order Book Feed
          </div>
          <div className="flex gap-10 font-mono text-[10px] tracking-wider text-emerald-400 animate-[marquee_25s_linear_infinite] whitespace-nowrap">
            {orderBook.map((o, idx) => (
              <span key={idx} className="flex items-center gap-1.5 shrink-0">
                <span className="font-bold text-white">{o.sec}</span>
                <span className={o.type === 'buy' ? 'text-emerald-400' : o.type === 'sell' ? 'text-red-400' : 'text-amber-400'}>
                  {o.type === 'buy' ? '↑ PRIMARY BUY' : o.type === 'sell' ? '↓ SECONDARY SELL' : '↔ ACTIVE BID'}
                </span>
                <span className="text-white font-semibold">{o.price}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white/50 bg-[#06080c]">
          <Loader2 className="animate-spin text-emerald-400" size={32} />
          <span className="text-xs font-mono uppercase tracking-[0.2em]">Initializing 3D City Render Engine...</span>
        </div>
      ) : (
        <canvas ref={canvasRef} className="block w-full h-full cursor-grab active:cursor-grabbing z-0" />
      )}

      {!loading && (
        <>
          {/* Top bar */}
          <div className={`absolute left-0 right-0 p-5 flex justify-between items-start pointer-events-none z-30 transition-all ${isFullscreen ? 'top-7' : 'top-0'}`}>
            <div className={`flex flex-col gap-1 pointer-events-auto bg-black/60 backdrop-blur-md border border-white/5 rounded-xl transition-all ${isFullscreen ? 'p-5' : 'p-4'}`}>
              <div className="flex items-center gap-3">
                <VLandsLogo className={isFullscreen ? "w-7 h-7 animate-pulse" : "w-5 h-5"} />
                <div className="flex flex-col">
                  <span className="font-bold font-display text-white tracking-widest leading-none" style={{ fontSize: isFullscreen ? '16.8px' : '12px' }}>
                    VLands 3D City Model
                  </span>
                  <span className="uppercase font-mono tracking-wider text-white" style={{ fontSize: isFullscreen ? '12.6px' : '9px', color: '#ffffff', marginTop: isFullscreen ? '4px' : '2px' }}>
                    hitech city, A block, hyderabad
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 pointer-events-auto">
              <button
                onClick={toggleFullscreen}
                className="bg-black/60 hover:bg-[#00D4AA] hover:text-[#041a15] text-white/80 p-3 rounded-lg border border-white/5 transition-all flex items-center gap-1.5 shadow-xl text-xs font-bold uppercase tracking-wider"
                title={isFullscreen ? "Exit Immersive View" : "Immersive Expanded View"}
              >
                {isFullscreen ? (<><Minimize2 size={16} /><span className="hidden sm:inline">Exit</span></>) : (<><Maximize2 size={16} /><span className="hidden sm:inline">Expanded</span></>)}
              </button>
            </div>
          </div>

          {/* Section tooltip */}
          {isFullscreen ? (
            <>
              {selectedSection ? (
                <div className="absolute bottom-6 max-w-sm bg-black/90 backdrop-blur-xl border border-[#00D4AA]/40 text-white rounded-2xl p-5 shadow-2xl z-50 animate-[slideUp_0.25s_ease-out] transition-all duration-300 left-6 lg:left-72">
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-black text-[#00D4AA] uppercase tracking-wider">SEC {selectedSection.id}</span>
                      <span className={`text-[8.5px] font-mono font-black uppercase px-2 py-0.5 rounded ${selectedSection.state === 0 ? 'bg-[#00D4AA]/15 text-[#00D4AA]' : selectedSection.state === 1 ? 'bg-amber-400/15 text-amber-400' : selectedSection.state === 2 ? 'bg-indigo-400/15 text-[#818cf8]' : 'bg-red-500/15 text-red-400'}`}>
                        {selectedSection.status}
                      </span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedSection(null); }} className="p-1 rounded-full text-white/40 hover:text-white/90 hover:bg-white/10 transition-all pointer-events-auto cursor-pointer" title="Close panel">
                      <X size={14} />
                    </button>
                  </div>
                  <div className="text-2xl font-mono font-bold tracking-tight text-white mb-2">{selectedSection.price}</div>
                  <div className="flex gap-5 text-xs text-white/50 mb-4 border-t border-white/5 pt-3">
                    <div>
                      <span className="block text-[9.5px] font-mono text-[#476558] uppercase">Fraction Block</span>
                      <span className="font-bold text-white/80">{selectedSection.size}</span>
                    </div>
                    <div>
                      <span className="block text-[9.5px] font-mono text-[#476558] uppercase">Legal Mutation</span>
                      <span className="font-bold text-emerald-400 block flex items-center gap-1 font-sans">✔ M4/M9 Active</span>
                    </div>
                  </div>
                  <button onClick={() => alert(`Redirecting to live vlands.app marketplace coordinates for security block ${selectedSection.id}`)} className="w-full bg-[#00D4AA] text-[#03201a] py-2.5 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-[#1effd4] transition-all pointer-events-auto cursor-pointer">
                    Place Order / Join Bid
                  </button>
                </div>
              ) : (
                <div className="absolute bottom-6 bg-black/60 backdrop-blur-md border border-white/5 text-white/50 px-4 py-3 rounded-xl z-20 text-[10px] font-mono tracking-widest uppercase select-none pointer-events-none flex items-center gap-2 transition-all duration-300 left-6 lg:left-72">
                  <Compass size={14} className="text-[#00D4AA] animate-pulse" />
                  Click any land grid section to inspect
                </div>
              )}
            </>
          ) : (
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 pointer-events-none z-30 select-none items-start">
              <div className="pointer-events-auto w-full max-w-sm">
                {selectedSection ? (
                  <div className="bg-black/95 backdrop-blur-xl border border-[#00D4AA]/40 text-white rounded-2xl p-4 sm:p-5 shadow-2xl animate-[slideUp_0.25s_ease-out]">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-black text-[#00D4AA] uppercase tracking-wider">SEC {selectedSection.id}</span>
                        <span className={`text-[8.5px] font-mono font-black uppercase px-2 py-0.5 rounded ${selectedSection.state === 0 ? 'bg-[#00D4AA]/15 text-[#00D4AA]' : selectedSection.state === 1 ? 'bg-amber-400/15 text-amber-400' : selectedSection.state === 2 ? 'bg-indigo-400/15 text-indigo-400' : 'bg-red-500/15 text-red-400'}`}>
                          {selectedSection.status}
                        </span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedSection(null); }} className="p-1 rounded-full text-white/40 hover:text-white/95 hover:bg-white/10 transition-all cursor-pointer" title="Close panel">
                        <X size={14} />
                      </button>
                    </div>
                    <div className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-white mb-2">{selectedSection.price}</div>
                    <div className="flex gap-4 text-[10px] sm:text-xs text-white/50 mb-3 border-t border-white/5 pt-2">
                      <div>
                        <span className="block text-[8px] sm:text-[9.5px] font-mono text-[#476558] uppercase">Fraction Block</span>
                        <span className="font-bold text-white/80">{selectedSection.size}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] sm:text-[9.5px] font-mono text-[#476558] uppercase">Legal Mutation</span>
                        <span className="font-bold text-emerald-400 block flex items-center gap-0.5 font-sans">✔ M4/M9 Active</span>
                      </div>
                    </div>
                    <button onClick={() => alert(`Redirecting to live vlands.app marketplace coordinates for security block ${selectedSection.id}`)} className="w-full bg-[#00D4AA] text-[#03201a] py-2 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider hover:bg-[#1effd4] transition-all cursor-pointer">
                      Place Order
                    </button>
                  </div>
                ) : (
                  <div className="bg-black/80 backdrop-blur-md border border-white/5 text-white/70 px-3.5 py-2 rounded-xl text-[9px] font-mono tracking-wider uppercase flex items-center gap-2 w-fit">
                    <Compass size={13} className="text-[#00D4AA] animate-pulse" />
                    Click grid to inspect
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2.5 bg-black/80 backdrop-blur-md border border-white/5 px-3 py-2 rounded-xl pointer-events-auto max-w-[290px] sm:max-w-md">
                {STATE_LABELS.map((label, idx) => (
                  <div key={label} className="flex items-center gap-1 text-[8.5px] sm:text-[9.5px] font-mono text-white/70 shrink-0 whitespace-nowrap">
                    <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-sm block" style={{ backgroundColor: STATE_COLORS[idx] }}></span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fullscreen left stats panel */}
          {isFullscreen && (
            <div className="hidden md:flex absolute left-6 top-36 bottom-20 w-60 flex-col gap-3 pointer-events-auto z-40 overflow-y-auto no-scrollbar scroll-smooth">
              <div className="bg-black/70 backdrop-blur-md border border-white/5 p-4 rounded-xl flex flex-col">
                <span className="text-[9px] font-mono text-[#476558] uppercase tracking-widest mb-1">Index Price per Sq.yd</span>
                <span className="text-3xl font-mono font-black text-[#00D4AA]">₹12,500</span>
                <span className="text-[10px] text-emerald-400 mt-1 font-semibold">↑ ₹290 (+2.38%) this week</span>
              </div>
              <div className="bg-black/70 backdrop-blur-md border border-white/5 p-4 rounded-xl flex flex-col gap-3">
                <span className="text-[9px] font-mono text-[#476558] uppercase tracking-widest mb-1 border-b border-white/5 pb-2">Property Overview</span>
                <div className="grid grid-cols-2 gap-2 text-center text-white font-mono">
                  <div className="bg-white/5 p-2 rounded border border-white/5"><span className="block text-[8px] text-white/40">TOTAL SIZE</span><span className="text-xs font-bold text-white/80">1000 Sq.yd</span></div>
                  <div className="bg-emerald-500/10 p-2 rounded border border-emerald-500/20"><span className="block text-[8px] text-emerald-400">AVAILABLE</span><span className="text-xs font-bold text-emerald-400">400 Sq.yd</span></div>
                  <div className="bg-white/5 p-2 rounded border border-white/5"><span className="block text-[8px] text-white/40">LAND YIELD</span><span className="text-xs font-bold text-emerald-400">8.5% p.a.</span></div>
                  <div className="bg-white/5 p-2 rounded border border-white/5"><span className="block text-[8px] text-white/40">TARGET IRR</span><span className="text-xs font-bold text-amber-500">16.4%</span></div>
                </div>
              </div>
              <div className="bg-black/70 backdrop-blur-md border border-white/10 p-4 rounded-xl text-[10px] text-white/60 leading-relaxed font-mono flex flex-col gap-2">
                <span className="text-[9px] font-mono text-[#00D4AA] font-black uppercase tracking-wider mb-1">3D CITY GUIDE</span>
                <span>• Drag to orbit the city</span>
                <span>• Scroll / pinch to zoom</span>
                <span>• Click land blocks to inspect</span>
                <span>• 2 vacant plots visible nearby</span>
              </div>
            </div>
          )}

          {/* Fullscreen right order book */}
          {isFullscreen && (
            <div className="hidden lg:flex absolute right-6 top-36 bottom-24 w-64 bg-black/70 backdrop-blur-md border border-white/5 p-5 rounded-xl pointer-events-auto z-40 flex-col gap-4 overflow-y-auto no-scrollbar">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono text-[#00D4AA] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>Live Orders
                </span>
                <span className="text-[8px] font-mono text-white/40 uppercase">EXCHANGE TICK</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[8px] font-mono text-white/40 uppercase tracking-widest pb-1">
                  <span>Sec</span><span>Price/Sq.yd</span><span>Type</span>
                </div>
                <div className="flex flex-col gap-1.5 font-mono">
                  {orderBook.map((order, i) => (
                    <div key={i} className={`flex justify-between items-center text-xs py-1.5 px-2 rounded border transition-all ${order.flash ? 'bg-emerald-500/15 border-emerald-500/30 font-bold scale-[1.02]' : 'bg-white/5 border-transparent'}`}>
                      <span className="text-white/50">{order.sec}</span>
                      <span className="text-white font-bold">{order.price}</span>
                      <span className={`text-[8.5px] font-black uppercase px-2 py-0.5 rounded ${order.type === 'buy' ? 'bg-[#00D4AA]/20 text-[#00D4AA]' : order.type === 'sell' ? 'bg-red-500/20 text-red-400' : 'bg-amber-400/20 text-amber-300'}`}>
                        {order.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2 border-t border-white/5 pt-3 flex flex-col gap-2">
                <span className="text-[9px] font-mono text-[#476558] uppercase">Market Depth</span>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-emerald-500/10 p-2 rounded border border-emerald-500/20 font-mono">
                    <span className="block text-[8px] text-emerald-400 uppercase">BUY</span>
                    <span className="text-lg font-black text-emerald-400">{buyCount}</span>
                    <span className="block text-[8px] text-white/40">active bids</span>
                  </div>
                  <div className="bg-red-500/10 p-2 rounded border border-red-500/20 font-mono">
                    <span className="block text-[8px] text-red-400 uppercase">SELL</span>
                    <span className="text-lg font-black text-red-400">{sellCount}</span>
                    <span className="block text-[8px] text-white/40">ask orders</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isFullscreen && (
            <div className="hidden sm:flex absolute right-6 bottom-6 items-center gap-4 bg-black/60 backdrop-blur-md border border-white/5 px-4 py-3 rounded-xl z-20 select-none max-w-sm sm:max-w-md overflow-x-auto no-scrollbar pointer-events-none">
              {STATE_LABELS.map((label, idx) => (
                <div key={label} className="flex items-center gap-1 text-[10px] font-mono text-white/60 shrink-0 whitespace-nowrap">
                  <span className="w-2.5 h-2.5 rounded-sm block" style={{ backgroundColor: STATE_COLORS[idx] }}></span>
                  {label}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
