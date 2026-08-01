import { useId } from 'react';

export default function BlueprintDrawing() {
  const clipId = useId();

  const grid = Array.from({ length: 70 }, (_, i) => i);
  const caps1 = Array.from({ length: 14 }, (_, i) => ({ x: 215 + i * 12, y: 340 }));
  const caps2 = Array.from({ length: 14 }, (_, i) => ({ x: 215 + i * 12, y: 380 }));
  const vrmCaps = Array.from({ length: 8 }, (_, i) => ({ x: 240 + i * 16, y: 300 }));
  const sataPorts = Array.from({ length: 4 }, (_, i) => i);
  const tracesH = Array.from({ length: 20 }, (_, i) => i);
  const tracesV = Array.from({ length: 16 }, (_, i) => i);
  const socketPinsX = Array.from({ length: 14 }, (_, i) => i);
  const socketPinsY = Array.from({ length: 14 }, (_, i) => i);

  return (
    <svg className="hero__drawing-svg" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <clipPath id={clipId}><path d="M0 0h1440v900H0z" /></clipPath>
      <g clipPath={`url(#${clipId})`} stroke="#23346A" strokeWidth="0.5" opacity="0.8">

        {/* Grid */}
        {grid.map(i => <line key={`gx${i}`} x1={i*21} y1={0} x2={i*21} y2={900} strokeOpacity="0.13" />)}
        {grid.map(i => <line key={`gy${i}`} x1={0} y1={i*13} x2={1440} y2={i*13} strokeOpacity="0.13" />)}

        {/* Board outline */}
        <rect x={60} y={60} width={1320} height={780} rx={4} strokeWidth="1.2" strokeOpacity="0.25" />

        {/* Mounting holes */}
        {[[80,80],[80,820],[1360,80],[1360,820]].map(([x,y],i) => (
          <g key={`mh${i}`}>
            <circle cx={x} cy={y} r={8} strokeWidth="0.5" strokeOpacity="0.2" fill="#23346A" fillOpacity="0.05" />
            <circle cx={x} cy={y} r={4} strokeWidth="0.3" strokeOpacity="0.12" />
            <line x1={x-12} y1={y} x2={x+12} y2={y} strokeWidth="0.2" strokeOpacity="0.15" />
            <line x1={x} y1={y-12} x2={x} y2={y+12} strokeWidth="0.2" strokeOpacity="0.15" />
          </g>
        ))}


        {/* ===== TOP BLOCKY PCB GEOMETRY ===== */}

        {/* Large rectangular IC block with pin grid — FPGA */}
        <rect x={80} y={200} width={160} height={120} rx={2} strokeWidth="0.8" strokeOpacity="0.35" />
        <rect x={86} y={206} width={148} height={108} rx={1} strokeWidth="0.4" strokeOpacity="0.3" />
        {Array.from({length:30}, (_,i) => (
          <rect key={`icp${i}`} x={92+(i%6)*24} y={212+Math.floor(i/6)*20} width={10} height={10} rx={1} strokeWidth="0.3" strokeOpacity="0.2" fill="#23346A" fillOpacity="0.08" />
        ))}
        <text x={160} y={336} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.2" fontFamily="monospace">FPGA_1</text>

        {/* SOIC-16 IC block */}
        <rect x={260} y={200} width={80} height={140} rx={1} strokeWidth="0.7" strokeOpacity="0.3" />
        <rect x={264} y={204} width={72} height={132} rx={0.5} strokeWidth="0.35" strokeOpacity="0.25" />
        {Array.from({length:8}, (_,i) => (
          <rect key={`sl${i}`} x={252} y={212+i*16} width={10} height={6} rx={0.5} strokeWidth="0.3" strokeOpacity="0.2" fill="#23346A" fillOpacity="0.06" />
        ))}
        {Array.from({length:8}, (_,i) => (
          <rect key={`sr${i}`} x={338} y={212+i*16} width={10} height={6} rx={0.5} strokeWidth="0.3" strokeOpacity="0.2" fill="#23346A" fillOpacity="0.06" />
        ))}
        <text x={300} y={356} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.18" fontFamily="monospace">DRV1</text>

        {/* Full-width horizontal trace bus — solid band */}
        <rect x={80} y={370} width={1340} height={16} rx={1} strokeWidth="0.4" strokeOpacity="0.2" fill="#23346A" fillOpacity="0.04" />
        {Array.from({length:12}, (_,i) => (
          <line key={`tbs${i}`} x1={80} y1={372+i*1.2} x2={1420} y2={372+i*1.2} strokeWidth="0.25" strokeOpacity="0.12" />
        ))}

        {/* Rectangular SMD cap bank — 2 neat rows */}
        {Array.from({length:20}, (_,i) => (
          <rect key={`smf${i}`} x={420+(i%10)*32} y={220+Math.floor(i/10)*24} width={18} height={10} rx={0.5} strokeWidth="0.3" strokeOpacity="0.18" fill="#23346A" fillOpacity="0.06" />
        ))}

        {/* Power delivery block — chunky rects */}
        <rect x={760} y={200} width={100} height={80} rx={1} strokeWidth="0.7" strokeOpacity="0.3" />
        <rect x={764} y={204} width={92} height={72} rx={0.5} strokeWidth="0.35" strokeOpacity="0.18" />
        {Array.from({length:12}, (_,i) => (
          <rect key={`pdb${i}`} x={772+(i%4)*20} y={212+Math.floor(i/4)*20} width={12} height={12} rx={0.5} strokeWidth="0.3" strokeOpacity="0.22" fill="#23346A" fillOpacity="0.08" />
        ))}
        <text x={810} y={296} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.18" fontFamily="monospace">VREG</text>

        {/* Zigzag traces — clean bundle */}
        {Array.from({length:8}, (_,i) => (
          <path key={`zz2${i}`} d={`M 920 ${200+i*10} L 950 ${200+i*10} L 960 ${210+i*10} L 990 ${210+i*10} L 1000 ${220+i*10} L 1030 ${220+i*10}`} strokeWidth="0.25" strokeOpacity="0.12" fill="none" />
        ))}

        {/* Edge connector block — right side */}
        <rect x={1080} y={200} width={140} height={100} rx={1} strokeWidth="0.7" strokeOpacity="0.3" />
        <rect x={1084} y={204} width={132} height={92} rx={0.5} strokeWidth="0.35" strokeOpacity="0.18" />
        {Array.from({length:16}, (_,i) => (
          <rect key={`gfb${i}`} x={1090+i*8} y={240} width={5} height={40} rx={0.5} strokeWidth="0.3" strokeOpacity="0.18" fill="#23346A" fillOpacity="0.06" />
        ))}
        <text x={1150} y={316} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.18" fontFamily="monospace">CN2</text>

        {/* Right edge — vertical fingers */}
        {Array.from({length:16}, (_,i) => (
          <rect key={`vcf${i}`} x={1380} y={200+i*12} width={24} height={8} rx={0.5} strokeWidth="0.3" strokeOpacity="0.18" fill="#23346A" fillOpacity="0.06" />
        ))}

        {/* Routing traces linking blocks */}
        {[
          [240,240,260,240], [340,240,420,240], [580,240,760,240],
          [860,240,1080,240],
        ].map(([x1,y1,x2,y2], i) => (
          <path key={`rtl${i}`} d={`M ${x1} ${y1} L ${x2} ${y2}`} strokeWidth="0.25" strokeOpacity="0.15" fill="none" />
        ))}

        {/* Vertical fan-out traces */}
        {Array.from({length:8}, (_,i) => (
          <path key={`fot${i}`} d={`M ${100+i*10} ${320} L ${100+i*10} ${370}`} strokeWidth="0.2" strokeOpacity="0.12" fill="none" />
        ))}
        {Array.from({length:6}, (_,i) => (
          <path key={`fot2${i}`} d={`M ${280+i*12} ${340} L ${280+i*12} ${370}`} strokeWidth="0.2" strokeOpacity="0.12" fill="none" />
        ))}
        {/* CPU Socket */}
        <rect x={280} y={400} width={240} height={240} rx={2} strokeWidth="1" strokeOpacity="0.3" />
        <rect x={288} y={408} width={224} height={224} rx={1} strokeWidth="0.6" strokeOpacity="0.2" />
        <rect x={296} y={416} width={208} height={208} strokeWidth="0.4" strokeOpacity="0.12" />
        {/* Socket pin grid */}
        {socketPinsX.map(ix => socketPinsY.map(iy => (
          <circle key={`pin${ix}_${iy}`} cx={300+ix*14.5} cy={420+iy*14.5} r={1.5} strokeWidth="0.2" strokeOpacity="0.1" fill="#23346A" fillOpacity="0.03" />
        )))}
        {/* Socket alignment notch */}
        <rect x={380} y={396} width={40} height={8} rx={1} strokeWidth="0.4" strokeOpacity="0.15" />
        {/* Socket orientation mark */}
        <polygon points="295,410 305,410 300,418" strokeWidth="0.3" strokeOpacity="0.12" fill="#23346A" fillOpacity="0.03" />
        {/* Socket label */}
        <text x={400} y={654} textAnchor="middle" fontSize="7" fill="#23346A" fillOpacity="0.3" fontFamily="monospace">CPU SOCKET LGA-1700</text>
        {/* Retention mechanism */}
        <line x1={280} y1={390} x2={280} y2={395} strokeWidth="0.3" strokeOpacity="0.1" />
        <line x1={520} y1={390} x2={520} y2={395} strokeWidth="0.3" strokeOpacity="0.1" />
        <line x1={280} y1={650} x2={280} y2={645} strokeWidth="0.3" strokeOpacity="0.1" />
        <line x1={520} y1={650} x2={520} y2={645} strokeWidth="0.3" strokeOpacity="0.1" />

        {/* VRM area (above CPU) */}
        <rect x={280} y={340} width={240} height={50} strokeWidth="0.4" strokeOpacity="0.15" rx={1} />
        {vrmCaps.map((c,i) => (
          <g key={`vrm${i}`}>
            <circle cx={c.x} cy={c.y} r={6} strokeWidth="0.3" strokeOpacity="0.15" fill="#23346A" fillOpacity="0.03" />
            <circle cx={c.x} cy={c.y} r={3} strokeWidth="0.2" strokeOpacity="0.15" />
            <line x1={c.x} y1={c.y-8} x2={c.x} y2={c.y-12} strokeWidth="0.2" strokeOpacity="0.15" />
          </g>
        ))}
        <text x={400} y={335} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.18" fontFamily="monospace">VRM</text>

        {/* Capacitor banks (below CPU) */}
        {caps1.map((c,i) => <circle key={`c1${i}`} cx={c.x} cy={c.y} r={4} strokeWidth="0.25" strokeOpacity="0.12" fill="#23346A" fillOpacity="0.03" />)}
        {caps2.map((c,i) => <circle key={`c2${i}`} cx={c.x} cy={c.y} r={4} strokeWidth="0.25" strokeOpacity="0.12" fill="#23346A" fillOpacity="0.03" />)}
        <text x={400} y={410} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.15" fontFamily="monospace">DECOUPLING CAPACITORS</text>

        {/* RAM DIMM slots (right of CPU) */}
        {[0,1].map(ri => (
          <g key={`dimm${ri}`}>
            <rect x={560} y={410+ri*95} width={200} height={22} rx={1} strokeWidth="0.7" strokeOpacity="0.22" />
            <rect x={560} y={414+ri*95} width={200} height={14} rx={0.5} strokeWidth="0.3" strokeOpacity="0.1" />
            {/* Contact pins */}
            {Array.from({length:30}, (_,i) => (
              <line key={`dp${ri}_${i}`} x1={566+i*6.5} y1={416+ri*95} x2={566+i*6.5} y2={426+ri*95} strokeWidth="0.2" strokeOpacity="0.11" />
            ))}
            {/* Notch */}
            <rect x={640} y={408+ri*95} width={12} height={6} rx={0.5} strokeWidth="0.3" strokeOpacity="0.1" />
            {/* Clip tabs */}
            <rect x={556} y={412+ri*95} width={6} height={18} rx={0.5} strokeWidth="0.3" strokeOpacity="0.1" />
            <rect x={758} y={412+ri*95} width={6} height={18} rx={0.5} strokeWidth="0.3" strokeOpacity="0.1" />
          </g>
        ))}
        {[0,1].map(ri => (
          <text key={`dml${ri}`} x={660} y={424+ri*95} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.12" fontFamily="monospace">DIMM_A{ri+1}</text>
        ))}
        <text x={660} y={485} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.1" fontFamily="monospace">CHANNEL A</text>

        {/* PCIe x16 slots (below CPU) */}
        {[0,1,2].map(ri => (
          <g key={`pcie${ri}`}>
            <rect x={280} y={700+ri*55} width={340} height={18} rx={1} strokeWidth="0.7" strokeOpacity="0.22" />
            <rect x={280} y={703+ri*55} width={340} height={12} rx={0.5} strokeWidth="0.3" strokeOpacity="0.1" />
            {Array.from({length:50}, (_,i) => (
              <line key={`pp${ri}_${i}`} x1={286+i*6.6} y1={705+ri*55} x2={286+i*6.6} y2={713+ri*55} strokeWidth="0.2" strokeOpacity="0.10" />
            ))}
            {/* Retention tab */}
            <rect x={614} y={702+ri*55} width={8} height={14} rx={0.5} strokeWidth="0.3" strokeOpacity="0.1" />
            <text x={450} y={714+ri*55} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.12" fontFamily="monospace">PCIEx16_{ri+1}</text>
          </g>
        ))}

        {/* PCIe x1 slot */}
        <rect x={280} y={665} width={120} height={14} rx={1} strokeWidth="0.5" strokeOpacity="0.18" />
        {Array.from({length:18}, (_,i) => (
          <line key={`px1_${i}`} x1={286+i*6.5} y1={667} x2={286+i*6.5} y2={677} strokeWidth="0.2" strokeOpacity="0.10" />
        ))}
        <text x={340} y={675} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.1" fontFamily="monospace">PCIEx1</text>

        {/* Chipset / PCH */}
        <rect x={680} y={680} width={80} height={80} rx={2} strokeWidth="0.8" strokeOpacity="0.22" />
        <rect x={686} y={686} width={68} height={68} rx={1} strokeWidth="0.4" strokeOpacity="0.12" />
        <rect x={692} y={692} width={56} height={56} strokeWidth="0.3" strokeOpacity="0.15" />
        {socketPinsX.slice(0,6).map(ix => socketPinsY.slice(0,6).map(iy => (
          <circle key={`pchpin${ix}_${iy}`} cx={696+ix*8} cy={696+iy*8} r={1} strokeWidth="0.15" strokeOpacity="0.15" />
        )))}
        <text x={720} y={774} textAnchor="middle" fontSize="6" fill="#23346A" fillOpacity="0.22" fontFamily="monospace">PCH Z790</text>

        {/* M.2 SSD slot */}
        <rect x={800} y={680} width={120} height={24} rx={1} strokeWidth="0.5" strokeOpacity="0.18" />
        <rect x={800} y={683} width={120} height={18} rx={0.5} strokeWidth="0.3" strokeOpacity="0.1" />
        {Array.from({length:15}, (_,i) => (
          <line key={`m2p${i}`} x1={808+i*7.8} y1={685} x2={808+i*7.8} y2={699} strokeWidth="0.2" strokeOpacity="0.10" />
        ))}
        <line x1={800} y1={692} x2={795} y2={692} strokeWidth="0.3" strokeOpacity="0.12" />
        <text x={860} y={700} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.12" fontFamily="monospace">M.2_1</text>
        <rect x={800} y={720} width={120} height={24} rx={1} strokeWidth="0.5" strokeOpacity="0.15" />
        <text x={860} y={738} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.1" fontFamily="monospace">M.2_2</text>

        {/* SATA ports (bottom right) */}
        <rect x={1000} y={750} width={180} height={40} strokeWidth="0.4" strokeOpacity="0.15" rx={1} />
        {sataPorts.map(i => (
          <g key={`sata${i}`}>
            <rect x={1008+i*42} y={756} width={36} height={16} rx={1} strokeWidth="0.3" strokeOpacity="0.12" />
            <line x1={1012+i*42} y1={760} x2={1040+i*42} y2={760} strokeWidth="0.15" strokeOpacity="0.11" />
            <line x1={1012+i*42} y1={768} x2={1040+i*42} y2={768} strokeWidth="0.15" strokeOpacity="0.11" />
            <text x={1026+i*42} y={771} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.12" fontFamily="monospace">SATA{i+1}</text>
          </g>
        ))}
        <rect x={1000} y={795} width={180} height={20} strokeWidth="0.3" strokeOpacity="0.1" rx={1} />
        <text x={1090} y={809} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.1" fontFamily="monospace">SATA 6Gb/s</text>

        {/* I/O Ports (top edge) */}
        <rect x={600} y={60} width={400} height={30} strokeWidth="0.6" strokeOpacity="0.2" rx={1} />
        {/* USB ports */}
        {[0,1,2,3].map(i => (
          <rect key={`usb${i}`} x={612+i*28} y={64} width={22} height={14} rx={1} strokeWidth="0.3" strokeOpacity="0.1" />
        ))}
        <text x={660} y={86} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.08" fontFamily="monospace">USB</text>
        {/* Ethernet */}
        <rect x={740} y={64} width={30} height={14} rx={1} strokeWidth="0.3" strokeOpacity="0.1" />
        <text x={755} y={86} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.08" fontFamily="monospace">RJ45</text>
        {/* Audio jacks */}
        {[0,1,2].map(i => (
          <circle key={`aud${i}`} cx={800+i*18} cy={71} r={5} strokeWidth="0.25" strokeOpacity="0.1" />
        ))}
        <text x={818} y={86} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.08" fontFamily="monospace">AUDIO</text>
        {/* HDMI / DP */}
        <rect x={870} y={64} width={18} height={14} rx={1} strokeWidth="0.3" strokeOpacity="0.1" />
        <rect x={896} y={64} width={18} height={14} rx={1} strokeWidth="0.3" strokeOpacity="0.1" />
        <text x={891} y={86} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.08" fontFamily="monospace">DP</text>
        <text x={916} y={86} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.08" fontFamily="monospace">HDMI</text>

        {/* Power connector (right edge) */}
        <rect x={1320} y={400} width={30} height={80} rx={1} strokeWidth="0.5" strokeOpacity="0.18" />
        {Array.from({length:12}, (_,i) => (
          <circle key={`atxp${i}`} cx={1335} cy={408+i*6.5} r={2} strokeWidth="0.2" strokeOpacity="0.08" fill="#23346A" fillOpacity="0.04" />
        ))}
        <text x={1345} y={445} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.1" fontFamily="monospace" transform="rotate(90 1345 445)">ATX24P</text>

        {/* CPU power connector (top) */}
        <rect x={340} y={60} width={60} height={24} rx={1} strokeWidth="0.5" strokeOpacity="0.18" />
        {Array.from({length:8}, (_,i) => (
          <circle key={`cpup${i}`} cx={348+i*7.5} cy={72} r={2} strokeWidth="0.2" strokeOpacity="0.08" fill="#23346A" fillOpacity="0.02" />
        ))}
        <text x={370} y={52} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.1" fontFamily="monospace">CPU_PWR</text>

        {/* Traces / routing */}
        {tracesH.map(i => (
          <path key={`trh${i}`} d={`M ${530+i*15} ${450} L ${560+i*15} ${450}`} strokeWidth="0.2" strokeOpacity="0.08" />
        ))}
        {tracesV.map(i => (
          <path key={`trv${i}`} d={`M ${400} ${660+i*15} L ${400} ${700+i*15}`} strokeWidth="0.2" strokeOpacity="0.08" />
        ))}

        {/* Data bus traces from CPU to RAM */}
        <path d="M 520 450 L 540 450 L 560 420" strokeWidth="0.25" strokeOpacity="0.15" />
        <path d="M 520 460 L 540 460 L 560 430" strokeWidth="0.25" strokeOpacity="0.15" />
        <path d="M 520 470 L 540 470 L 560 440" strokeWidth="0.25" strokeOpacity="0.15" />
        <path d="M 520 500 L 540 500 L 560 530" strokeWidth="0.25" strokeOpacity="0.15" />
        <path d="M 520 510 L 540 510 L 560 540" strokeWidth="0.25" strokeOpacity="0.15" />

        {/* Bus traces CPU to PCH */}
        <path d="M 400 640 L 400 670 L 680 680" strokeWidth="0.25" strokeOpacity="0.06" strokeDasharray="3 3" />
        <path d="M 410 640 L 410 670 L 690 680" strokeWidth="0.25" strokeOpacity="0.06" strokeDasharray="3 3" />
        <path d="M 420 640 L 420 670 L 700 680" strokeWidth="0.25" strokeOpacity="0.06" strokeDasharray="3 3" />

        {/* PCIe traces from CPU */}
        <path d="M 450 640 L 450 700" strokeWidth="0.2" strokeOpacity="0.11" />
        <path d="M 460 640 L 460 700" strokeWidth="0.2" strokeOpacity="0.11" />
        <path d="M 470 640 L 470 755" strokeWidth="0.2" strokeOpacity="0.11" />
        <path d="M 480 640 L 480 755" strokeWidth="0.2" strokeOpacity="0.11" />

        {/* SATA traces from PCH */}
        <path d="M 760 720 L 900 720 L 1000 770" strokeWidth="0.2" strokeOpacity="0.10" />
        <path d="M 760 730 L 900 730 L 1000 780" strokeWidth="0.2" strokeOpacity="0.10" />

        {/* USB traces */}
        <path d="M 680 760 L 600 80" strokeWidth="0.15" strokeOpacity="0.04" strokeDasharray="2 3" />

        {/* Small SMD components */}
        {Array.from({length:30}, (_,i) => (
          <rect key={`smd${i}`} x={80+(i%15)*50} y={550+Math.floor(i/15)*60} width={6} height={4} rx={0.5} strokeWidth="0.15" strokeOpacity="0.06" fill="#23346A" fillOpacity="0.02" />
        ))}

        {/* CMOS battery */}
        <circle cx={1000} cy={620} r={16} strokeWidth="0.5" strokeOpacity="0.18" />
        <circle cx={1000} cy={620} r={12} strokeWidth="0.3" strokeOpacity="0.1" />
        <line x1={1000} y1={604} x2={1000} y2={604} strokeWidth="0.5" strokeOpacity="0.15" />
        <text x={1000} y={618} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.1" fontFamily="monospace">CR2032</text>

        {/* BIOS chip */}
        <rect x={1000} y={560} width={30} height={30} rx={1} strokeWidth="0.4" strokeOpacity="0.15" />
        <rect x={1004} y={564} width={22} height={22} rx={0.5} strokeWidth="0.2" strokeOpacity="0.15" />
        <text x={1015} y={580} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.1" fontFamily="monospace">BIOS</text>

        {/* Front panel header */}
        <rect x={120} y={700} width={100} height={40} strokeWidth="0.4" strokeOpacity="0.15" rx={1} />
        {Array.from({length:18}, (_,i) => (
          <circle key={`fpp${i}`} cx={128+(i%9)*10} cy={708+Math.floor(i/9)*20} r={1.5} strokeWidth="0.15" strokeOpacity="0.11" />
        ))}
        <text x={170} y={752} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.08" fontFamily="monospace">F_PANEL</text>

        {/* Debug LED / POST code display */}
        <rect x={120} y={600} width={50} height={24} rx={1} strokeWidth="0.3" strokeOpacity="0.12" />
        <text x={145} y={615} textAnchor="middle" fontSize="6" fill="#23346A" fillOpacity="0.1" fontFamily="monospace">00</text>
        <text x={145} y={596} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.1" fontFamily="monospace">DEBUG</text>

        {/* Reset / Power button headers */}
        <rect x={120} y={640} width={30} height={16} rx={1} strokeWidth="0.3" strokeOpacity="0.1" />
        <text x={135} y={652} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.08" fontFamily="monospace">RST</text>
        <rect x={160} y={640} width={30} height={16} rx={1} strokeWidth="0.3" strokeOpacity="0.1" />
        <text x={175} y={652} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.08" fontFamily="monospace">PWR</text>

        {/* Measurement annotations */}
        <line x1={20} y1={60} x2={1420} y2={60} strokeWidth="0.3" strokeOpacity="0.12" />
        <line x1={20} y1={56} x2={20} y2={64} strokeWidth="0.3" strokeOpacity="0.12" />
        <line x1={1420} y1={56} x2={1420} y2={64} strokeWidth="0.3" strokeOpacity="0.12" />
        <text x={720} y={52} textAnchor="middle" fontSize="7" fill="#23346A" fillOpacity="0.25" fontFamily="monospace">305.00 mm (ATX)</text>

        <line x1={1420} y1={60} x2={1420} y2={840} strokeWidth="0.3" strokeOpacity="0.12" />
        <line x1={1416} y1={60} x2={1424} y2={60} strokeWidth="0.3" strokeOpacity="0.12" />
        <line x1={1416} y1={840} x2={1424} y2={840} strokeWidth="0.3" strokeOpacity="0.12" />
        <text x={1432} y={460} textAnchor="middle" fontSize="7" fill="#23346A" fillOpacity="0.18" fontFamily="monospace" transform="rotate(90 1432 460)">244.00 mm</text>

        {/* Title block */}
        <rect x={40} y={40} width={220} height={90} rx={2} strokeWidth="0.6" strokeOpacity="0.2" />
        <line x1={40} y1={70} x2={260} y2={70} strokeWidth="0.3" strokeOpacity="0.12" />
        <line x1={40} y1={90} x2={260} y2={90} strokeWidth="0.2" strokeOpacity="0.15" />
        <line x1={40} y1={108} x2={260} y2={108} strokeWidth="0.15" strokeOpacity="0.11" />
        <text x={50} y={60} fontSize="7" fill="#23346A" fillOpacity="0.5" fontFamily="monospace" fontWeight="600">JAMES TOGHER</text>
        <text x={50} y={82} fontSize="6" fill="#23346A" fillOpacity="0.32" fontFamily="monospace">MOTHERBOARD SCHEMATIC</text>
        <text x={50} y={102} fontSize="5" fill="#23346A" fillOpacity="0.15" fontFamily="monospace">REV 4.2  |  ATX FORM FACTOR</text>
        <text x={50} y={122} fontSize="5" fill="#23346A" fillOpacity="0.12" fontFamily="monospace">2026-07-22  |  SHEET 01/01</text>



        {/* ===== RIGHT SIDE DENSITY ===== */}

        {/* Dense horizontal trace bundle */}
        {Array.from({length:30}, (_,i) => (
          <line key={`rt${i}`} x1={820} y1={320+i*6} x2={1100} y2={320+i*6} strokeWidth="0.15" strokeOpacity="0.15" />
        ))}

        {/* Zigzag trace patterns */}
        {Array.from({length:8}, (_,i) => (
          <path key={`zz${i}`} d={`M ${820+i*35} ${280} L ${850+i*35} ${280} L ${860+i*35} ${300} L ${890+i*35} ${300} L ${900+i*35} ${320}`} strokeWidth="0.2" strokeOpacity="0.07" fill="none" />
        ))}

        {/* Right-side VRM / secondary power delivery */}
        <rect x={1050} y={250} width={120} height={100} rx={1} strokeWidth="0.4" strokeOpacity="0.15" />
        <rect x={1055} y={255} width={110} height={90} rx={0.5} strokeWidth="0.2" strokeOpacity="0.15" />
        {Array.from({length:12}, (_,i) => (
          <circle key={`rc${i}`} cx={1062+(i%4)*18} cy={262+Math.floor(i/4)*22} r={3} strokeWidth="0.2" strokeOpacity="0.1" fill="#23346A" fillOpacity="0.04" />
        ))}
        {Array.from({length:8}, (_,i) => (
          <rect key={`rch${i}`} x={1130+(i%2)*16} y={260+Math.floor(i/2)*20} width={8} height={12} rx={0.5} strokeWidth="0.2" strokeOpacity="0.08" fill="#23346A" fillOpacity="0.03" />
        ))}
        <text x={1110} y={362} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.12" fontFamily="monospace">SEC_PWR</text>

        {/* Dense SMD component field */}
        {Array.from({length:20}, (_,i) => (
          <rect key={`rsmd${i}`} x={1140+(i%5)*18} y={400+Math.floor(i/5)*16} width={6} height={4} rx={0.5} strokeWidth="0.15" strokeOpacity="0.07" fill="#23346A" fillOpacity="0.03" />
        ))}
        {Array.from({length:20}, (_,i) => (
          <rect key={`rsmd2${i}`} x={1140+(i%4)*22} y={520+Math.floor(i/4)*14} width={8} height={4} rx={0.5} strokeWidth="0.15" strokeOpacity="0.06" fill="#23346A" fillOpacity="0.03" />
        ))}

        {/* Dense test point grid */}
        {Array.from({length:25}, (_,i) => (
          <circle key={`tp${i}`} cx={850+(i%5)*40} cy={480+Math.floor(i/5)*30} r={2} strokeWidth="0.2" strokeOpacity="0.08" fill="#23346A" fillOpacity="0.03" />
        ))}
        {Array.from({length:5}, (_,i) => (
          <text key={`tpl${i}`} x={852+i*40} y={476+Math.floor(i/5)*30} fontSize="4" fill="#23346A" fillOpacity="0.07" fontFamily="monospace">TP{i+1}</text>
        ))}

        {/* Right side data bus traces */}
        {Array.from({length:12}, (_,i) => (
          <path key={`dbt${i}`} d={`M 1100 ${300+i*8} L 1200 ${300+i*8} L 1220 ${320+i*8}`} strokeWidth="0.15" strokeOpacity="0.06" fill="none" />
        ))}

        {/* Additional controller / IO chip */}
        <rect x={1150} y={440} width={60} height={60} rx={1} strokeWidth="0.4" strokeOpacity="0.15" />
        <rect x={1155} y={445} width={50} height={50} rx={0.5} strokeWidth="0.2" strokeOpacity="0.15" />
        {Array.from({length:12}, (_,i) => (
          <circle key={`iop${i}`} cx={1153} cy={448+i*8} r={1.5} strokeWidth="0.15" strokeOpacity="0.11" />
        ))}
        {Array.from({length:12}, (_,i) => (
          <circle key={`iop2${i}`} cx={1207} cy={448+i*8} r={1.5} strokeWidth="0.15" strokeOpacity="0.11" />
        ))}
        <text x={1180} y={514} textAnchor="middle" fontSize="5" fill="#23346A" fillOpacity="0.12" fontFamily="monospace">IO_CTRL</text>

        {/* Fan header */}
        <rect x={1050} y={550} width={40} height={20} rx={1} strokeWidth="0.3" strokeOpacity="0.12" />
        {Array.from({length:4}, (_,i) => (
          <circle key={`fan${i}`} cx={1057+i*10} cy={560} r={2} strokeWidth="0.15" strokeOpacity="0.07" fill="#23346A" fillOpacity="0.03" />
        ))}
        <text x={1070} y={580} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.08" fontFamily="monospace">FAN1</text>

        <rect x={1120} y={550} width={40} height={20} rx={1} strokeWidth="0.3" strokeOpacity="0.1" />
        {Array.from({length:4}, (_,i) => (
          <circle key={`fan2${i}`} cx={1127+i*10} cy={560} r={2} strokeWidth="0.15" strokeOpacity="0.11" />
        ))}
        <text x={1140} y={580} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.07" fontFamily="monospace">FAN2</text>

        {/* Cross-bracket trace fill */}
        {Array.from({length:10}, (_,i) => (
          <line key={`diagR${i}`} x1={800+i*50} y1={380} x2={850+i*50} y2={430} strokeWidth="0.1" strokeOpacity="0.08" />
        ))}

        {/* Right edge empty-space fill — fine pitch parallel lines */}
        {Array.from({length:40}, (_,i) => (
          <line key={`fpl${i}`} x1={1380} y1={150+i*12} x2={1410} y2={150+i*12} strokeWidth="0.12" strokeOpacity="0.08" />
        ))}

        {/* Extra right-side cap bank */}
        {Array.from({length:6}, (_,i) => (
          <g key={`ecb${i}`}>
            <circle cx={1160+i*14} cy={660} r={5} strokeWidth="0.2" strokeOpacity="0.1" fill="#23346A" fillOpacity="0.03" />
            <circle cx={1160+i*14} cy={660} r={2} strokeWidth="0.15" strokeOpacity="0.10" />
          </g>
        ))}

        {/* Jumper block */}
        <rect x={1080} y={640} width={40} height={30} rx={1} strokeWidth="0.3" strokeOpacity="0.1" />
        {Array.from({length:6}, (_,i) => (
          <circle key={`jp${i}`} cx={1086+(i%3)*14} cy={647+Math.floor(i/3)*16} r={2} strokeWidth="0.15" strokeOpacity="0.11" />
        ))}
        <text x={1100} y={682} textAnchor="middle" fontSize="4" fill="#23346A" fillOpacity="0.07" fontFamily="monospace">JMP1</text>

        {/* Dense via / hole field */}
        {Array.from({length:30}, (_,i) => (
          <circle key={`via${i}`} cx={1220+Math.floor(i/6)*25} cy={180+(i%6)*25} r={2.5} strokeWidth="0.15" strokeOpacity="0.06" fill="#23346A" fillOpacity="0.03" />
        ))}
        {Array.from({length:30}, (_,i) => (
          <circle key={`via2${i}`} cx={1220+Math.floor(i/6)*25} cy={500+(i%6)*25} r={2.5} strokeWidth="0.15" strokeOpacity="0.06" fill="#23346A" fillOpacity="0.03" />
        ))}

        {/* Cross-routing traces */}

        {Array.from({length:6}, (_,i) => (
          <path key={`crt${i}`} d={`M 1250 ${300+i*10} Q 1280 ${290+i*10} 1310 ${300+i*10}`} strokeWidth="0.15" strokeOpacity="0.05" fill="none" />
        ))}
        {Array.from({length:6}, (_,i) => (
          <path key={`crt2${i}`} d={`M 1250 ${350+i*10} Q 1280 ${360+i*10} 1310 ${350+i*10}`} strokeWidth="0.15" strokeOpacity="0.05" fill="none" />
        ))}

      </g>
    </svg>
  );
}
