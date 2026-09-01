import { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useNavigate, useRouteError } from "react-router-dom";
import {
  FaHouse,
  FaArrowLeft,
  FaRotateRight,
  FaCompass,
  FaEarthAmericas,
  FaCircleInfo,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
  FaMagnifyingGlass,
  FaBug,
  FaCopy,
  FaCheck,
  FaGamepad,
  FaTerminal,
  FaVolumeHigh,
  FaVolumeXmark,
  FaWandMagicSparkles,
  FaRocket,
  FaPlay,
  FaPause,
  FaXmark,
  FaFire,
  FaGear
} from "react-icons/fa6";
import "./Error.css";

// Web Audio API Synthesizer Helper (Zero external assets needed)
const playSFX = (type, isMuted) => {
  if (isMuted || typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "hover") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "glitch") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.setValueAtTime(800, now + 0.03);
      osc.frequency.setValueAtTime(300, now + 0.07);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "orb") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === "explode") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "win") {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    }
  } catch (err) {
    // AudioContext blocked or unsupported
  }
};

export const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  // Page States
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // Card 3D Tilt State
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  // Terminal State
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState([
    { text: "ANTIGRAVITY OS [Version 4.0.4 - Cosmic Edition]", type: "system" },
    { text: "Status: Navigation fault detected. Type 'help' for available CLI commands.", type: "system" }
  ]);

  // Mini Arcade Game State
  const [showGame, setShowGame] = useState(false);
  const [gameState, setGameState] = useState("idle"); // 'idle', 'playing', 'gameover', 'won'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("cosmic_high_score") || "0", 10);
  });
  const [shield, setShield] = useState(100);

  // Glitch Code Display State
  const [displayCode, setDisplayCode] = useState(() => (error?.status ? String(error.status) : "404"));

  // Refs
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const gameCanvasRef = useRef(null);
  const searchInputRef = useRef(null);
  const terminalBottomRef = useRef(null);

  const status = error?.status || 404;
  const statusText = error?.statusText || (status === 404 ? "Page Out of Bounds" : "Unexpected System Anomaly");
  const message =
    error?.data ||
    error?.message ||
    "The cosmic coordinates you requested do not exist in this spatial reality or have drifted away into space.";

  const quickLinks = [
    {
      title: "Home Page",
      path: "/",
      icon: FaHouse,
      desc: "Return safely to primary dashboard & main hero section",
      color: "#6366f1"
    },
    {
      title: "Explore Countries",
      path: "/country",
      icon: FaEarthAmericas,
      desc: "Search, filter & analyze world country demographic data",
      color: "#38bdf8"
    },
    {
      title: "About Us",
      path: "/about",
      icon: FaCircleInfo,
      desc: "Discover project features, origin stories & trivia facts",
      color: "#a855f7"
    },
    {
      title: "Contact Support",
      path: "/contect",
      icon: FaEnvelope,
      desc: "Send our engineering squad a direct message or report bug",
      color: "#f43f5e"
    }
  ];

  const filteredLinks = searchQuery.trim()
    ? quickLinks.filter(
        (link) =>
          link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : quickLinks;

  // Sound play wrapper
  const triggerAudio = useCallback(
    (type) => {
      playSFX(type, isMuted);
    },
    [isMuted]
  );

  // ----------------------------------------------------
  // 1. Interactive Canvas Background (Starfield / Matrix)
  // ----------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: width / 2, y: height / 2, radius: 160 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Starfield Particles
    const particleCount = 140;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2.2 + 0.8,
      color: ["#818cf8", "#38bdf8", "#c084fc", "#34d399", "#ffffff"][Math.floor(Math.random() * 5)],
      baseAlpha: Math.random() * 0.6 + 0.2
    }));

    // Matrix Rain Columns
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const rainDrops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
    const matrixChars = "01010101404ERRANTIGRAVITYΩΔΨλ<>/$%#*+";

    const render = () => {
      if (matrixMode) {
        // Matrix Rain Render
        ctx.fillStyle = "rgba(9, 10, 15, 0.12)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#34d399";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < rainDrops.length; i++) {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          const x = i * fontSize;
          const y = rainDrops[i] * fontSize;

          // Glowing lead character
          if (Math.random() > 0.8) {
            ctx.fillStyle = "#ffffff";
          } else {
            ctx.fillStyle = "#34d399";
          }

          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.975) {
            rainDrops[i] = 0;
          }
          rainDrops[i]++;
        }
      } else {
        // Cosmos Starfield Render
        ctx.clearRect(0, 0, width, height);

        // Draw connecting particle lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              const alpha = (1 - dist / 100) * 0.18;
              ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        // Draw & Update Particles
        particles.forEach((p) => {
          // Physics movement
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Mouse gravity interaction
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let currentSize = p.size;
          let currentAlpha = p.baseAlpha;

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 1.8;
            p.y -= (dy / dist) * force * 1.8;
            currentSize = p.size * (1 + force * 1.5);
            currentAlpha = Math.min(1, p.baseAlpha + force * 0.5);
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentAlpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [matrixMode]);

  // ----------------------------------------------------
  // 2. 3D Tilt & Cursor Spotlight Tracking
  // ----------------------------------------------------
  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7; // Deg range -7 to +7
    const rotateY = ((x - centerX) / centerX) * 7;

    const mxPercent = Math.round((x / rect.width) * 100);
    const myPercent = Math.round((y / rect.height) * 100);

    setCardTilt({ rx: rotateX, ry: rotateY, mx: mxPercent, my: myPercent });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
  };

  // ----------------------------------------------------
  // 3. Cyberpunk Chromatic Glitch Scrambler
  // ----------------------------------------------------
  const triggerGlitchEffect = () => {
    if (isGlitching) return;
    setIsGlitching(true);
    triggerAudio("glitch");

    const glitchChars = "404ERR8089410x44#%!/?*";
    let iterations = 0;

    const interval = setInterval(() => {
      if (iterations >= 9) {
        clearInterval(interval);
        setDisplayCode(String(status));
        setIsGlitching(false);
      } else {
        const randomCode = Array.from({ length: 3 }, () =>
          glitchChars.charAt(Math.floor(Math.random() * glitchChars.length))
        ).join("");
        setDisplayCode(randomCode);
        iterations++;
      }
    }, 45);
  };

  // ----------------------------------------------------
  // 4. Keyboard Shortcuts
  // ----------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Focus search on '/'
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
        triggerAudio("click");
      }
      // Close open modals on 'Esc'
      else if (e.key === "Escape") {
        if (showGame) setShowGame(false);
        if (showTerminal) setShowTerminal(false);
        if (searchQuery) setSearchQuery("");
        triggerAudio("click");
      }
      // Launch Game shortcut 'G' if not typing in inputs
      else if ((e.key === "g" || e.key === "G") && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
        setShowGame((prev) => !prev);
        triggerAudio("click");
      }
      // Home shortcut 'H'
      else if ((e.key === "h" || e.key === "H") && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
        navigate("/");
        triggerAudio("click");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showGame, showTerminal, searchQuery, navigate, triggerAudio]);

  // ----------------------------------------------------
  // 5. Terminal CLI Command Execution
  // ----------------------------------------------------
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    triggerAudio("click");
    const newLogs = [...terminalLogs, { text: `user@antigravity:~$ ${terminalInput}`, type: "input" }];

    const parts = cmd.split(" ");
    const command = parts[0];
    const arg = parts.slice(1).join(" ");

    if (command === "help") {
      newLogs.push({
        text: "Available commands:\n  help      - Show command manual\n  home      - Teleport to main page (/)\n  country   - Teleport to Country Explorer (/country)\n  search <q>- Search destinations\n  matrix    - Toggle Matrix green code rain\n  game      - Launch Cosmic Escape Arcade Game\n  fix       - Trigger quantum glitch repair\n  ping      - Run network diagnostic test\n  clear     - Clear CLI logs\n  exit      - Close CLI prompt",
        type: "output"
      });
    } else if (command === "home") {
      newLogs.push({ text: "Navigating to home directory...", type: "output" });
      setTimeout(() => navigate("/"), 600);
    } else if (command === "country" || command === "countries") {
      newLogs.push({ text: "Navigating to country explorer...", type: "output" });
      setTimeout(() => navigate("/country"), 600);
    } else if (command === "search") {
      if (arg) {
        setSearchQuery(arg);
        newLogs.push({ text: `Search filter updated to: "${arg}"`, type: "output" });
      } else {
        newLogs.push({ text: "Usage: search <query>", type: "error" });
      }
    } else if (command === "matrix") {
      setMatrixMode((prev) => !prev);
      newLogs.push({ text: `Matrix code rain ${!matrixMode ? "ACTIVATED" : "DEACTIVATED"}`, type: "output" });
    } else if (command === "game") {
      setShowGame(true);
      newLogs.push({ text: "Launching Cosmic Escape mini-game...", type: "output" });
    } else if (command === "fix") {
      triggerGlitchEffect();
      newLogs.push({ text: "Quantum state re-aligned. Code parity restored.", type: "output" });
    } else if (command === "ping") {
      newLogs.push({ text: "PING 127.0.0.1 (127.0.0.1): 56 data bytes", type: "output" });
      newLogs.push({ text: "64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.412 ms", type: "output" });
      newLogs.push({ text: "64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.389 ms", type: "output" });
      newLogs.push({ text: "--- 127.0.0.1 ping statistics --- 0% packet loss", type: "output" });
    } else if (command === "clear") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    } else if (command === "exit") {
      setShowTerminal(false);
      setTerminalInput("");
      return;
    } else {
      newLogs.push({ text: `Command not found: '${command}'. Type 'help' for instructions.`, type: "error" });
    }

    setTerminalLogs(newLogs);
    setTerminalInput("");
  };

  useEffect(() => {
    if (showTerminal) {
      terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs, showTerminal]);

  // ----------------------------------------------------
  // 6. Mini Arcade Game Loop Engine
  // ----------------------------------------------------
  useEffect(() => {
    if (!showGame || gameState !== "playing") return;
    const canvas = gameCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    let shipX = canvas.width / 2 - 15;
    const shipY = canvas.height - 40;
    const shipWidth = 30;
    const shipHeight = 26;

    let currentScore = 0;
    let currentShield = 100;

    // Obstacles & Collectibles
    let asteroids = [];
    let orbs = [];
    let frameCount = 0;

    const handleCanvasMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      shipX = Math.max(0, Math.min(canvas.width - shipWidth, mouseX - shipWidth / 2));
    };
    canvas.addEventListener("mousemove", handleCanvasMouseMove);

    const gameLoop = () => {
      frameCount++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space grid background inside game
      ctx.strokeStyle = "rgba(99, 102, 241, 0.12)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = (frameCount * 2) % 30; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Spawn Asteroids
      if (frameCount % Math.max(15, 45 - Math.floor(currentScore / 20)) === 0) {
        asteroids.push({
          x: Math.random() * (canvas.width - 20),
          y: -20,
          size: Math.random() * 12 + 12,
          speed: Math.random() * 2 + 2 + currentScore * 0.02
        });
      }

      // Spawn Energy Orbs
      if (frameCount % 60 === 0) {
        orbs.push({
          x: Math.random() * (canvas.width - 15),
          y: -15,
          size: 8,
          speed: Math.random() * 1.5 + 2
        });
      }

      // Draw & Move Ship
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.moveTo(shipX + shipWidth / 2, shipY);
      ctx.lineTo(shipX + shipWidth, shipY + shipHeight);
      ctx.lineTo(shipX + shipWidth / 2, shipY + shipHeight - 6);
      ctx.lineTo(shipX, shipY + shipHeight);
      ctx.closePath();
      ctx.fill();

      // Ship thruster glow
      ctx.fillStyle = "#f43f5e";
      ctx.beginPath();
      ctx.arc(shipX + shipWidth / 2, shipY + shipHeight + (frameCount % 4), 4, 0, Math.PI * 2);
      ctx.fill();

      // Update & Draw Asteroids
      for (let i = asteroids.length - 1; i >= 0; i--) {
        const a = asteroids[i];
        a.y += a.speed;

        ctx.fillStyle = "#fb7185";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
        ctx.fill();

        // Collision check with Ship
        const dist = Math.hypot(a.x - (shipX + shipWidth / 2), a.y - (shipY + shipHeight / 2));
        if (dist < a.size + shipWidth / 2) {
          triggerAudio("explode");
          currentShield -= 25;
          setShield(currentShield);
          asteroids.splice(i, 1);

          if (currentShield <= 0) {
            setGameState("gameover");
            cancelAnimationFrame(animId);
            return;
          }
        } else if (a.y > canvas.height + 20) {
          asteroids.splice(i, 1);
        }
      }

      // Update & Draw Orbs
      for (let i = orbs.length - 1; i >= 0; i--) {
        const o = orbs[i];
        o.y += o.speed;

        ctx.fillStyle = "#fbbf24";
        ctx.shadowColor = "#fbbf24";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Collect orb check
        const dist = Math.hypot(o.x - (shipX + shipWidth / 2), o.y - (shipY + shipHeight / 2));
        if (dist < o.size + shipWidth / 2) {
          triggerAudio("orb");
          currentScore += 15;
          setScore(currentScore);
          orbs.splice(i, 1);

          if (currentScore > highScore) {
            setHighScore(currentScore);
            localStorage.setItem("cosmic_high_score", currentScore.toString());
          }
        } else if (o.y > canvas.height + 20) {
          orbs.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleCanvasMouseMove);
    };
  }, [showGame, gameState, highScore, triggerAudio]);

  const startGame = () => {
    triggerAudio("click");
    setScore(0);
    setShield(100);
    setGameState("playing");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    triggerAudio("click");
    if (!searchQuery.trim()) return;

    const matched = quickLinks.find(
      (link) =>
        link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.path.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matched) {
      navigate(matched.path);
    } else {
      navigate(`/country`);
    }
  };

  const handleCopyError = () => {
    triggerAudio("click");
    const errorDetails = `Status: ${status}\nStatus Text: ${statusText}\nMessage: ${message}\nURL: ${window.location.href}\nTimestamp: ${new Date().toISOString()}`;
    navigator.clipboard.writeText(errorDetails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <main className="error-page-wrapper">
      {/* 1. Interactive HTML5 Canvas Background */}
      <canvas ref={canvasRef} className="error-canvas-bg" />

      {/* Ambient Radial Gradient Accents */}
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>

      {/* Floating Space Graphic Elements */}
      <div className="floating-space-item item-astronaut" title="Lost Astronaut Floating">
        <FaRocket />
      </div>
      <div className="floating-space-item item-satellite" title="Deep Space Probe">
        <FaWandMagicSparkles />
      </div>

      {/* Top Utility Bar (Audio & Terminal Toggles) */}
      <div className="top-utility-bar">
        <button
          className={`utility-btn ${isMuted ? "muted" : ""}`}
          onClick={() => {
            setIsMuted(!isMuted);
            triggerAudio("click");
          }}
          title={isMuted ? "Unmute SFX Audio" : "Mute SFX Audio"}
        >
          {isMuted ? <FaVolumeXmark /> : <FaVolumeHigh />}
          <span>{isMuted ? "SFX OFF" : "SFX ON"}</span>
        </button>

        <button
          className={`utility-btn ${matrixMode ? "active" : ""}`}
          onClick={() => {
            setMatrixMode(!matrixMode);
            triggerAudio("click");
          }}
          title="Toggle Matrix Code Rain"
        >
          <FaGear />
          <span>{matrixMode ? "COSMOS MODE" : "MATRIX MODE"}</span>
        </button>

        <button
          className={`utility-btn ${showTerminal ? "active" : ""}`}
          onClick={() => {
            setShowTerminal(!showTerminal);
            triggerAudio("click");
          }}
          title="Open Interactive CLI Terminal"
        >
          <FaTerminal />
          <span>CLI DIAGNOSTICS</span>
        </button>

        <button
          className={`utility-btn btn-game-trigger ${showGame ? "active" : ""}`}
          onClick={() => {
            setShowGame(true);
            triggerAudio("click");
          }}
          title="Play Space Arcade Mini-Game"
        >
          <FaGamepad />
          <span>MINI GAME</span>
        </button>
      </div>

      {/* 2. Main Error Glassmorphism Card with 3D Tilt & Cursor Spotlight */}
      <div
        ref={cardRef}
        className={`error-card ${isGlitching ? "glitch-shake" : ""}`}
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
          "--mouse-x": `${cardTilt.mx}%`,
          "--mouse-y": `${cardTilt.my}%`
        }}
      >
        {/* Dynamic Card Spotlight Glow */}
        <div className="card-spotlight-glow" />

        {/* Header Illustration & Glitch Code */}
        <div className="error-header">
          <div className="status-badge" onClick={triggerGlitchEffect} title="Click to repair glitch state">
            <span className="badge-dot"></span>
            <span>{status === 404 ? "HTTP 404 - LOST IN DEEP SPACE" : `HTTP ${status} - SYSTEM ERROR`}</span>
            <FaWandMagicSparkles className="sparkle-icon" />
          </div>

          <div className="error-code-container" onClick={triggerGlitchEffect}>
            <span className={`error-code-bg ${isGlitching ? "chromatic-glitch" : ""}`}>{displayCode}</span>
            <div className="compass-icon-wrapper" title="Lost Navigation Orientation">
              <FaCompass className="compass-icon" />
            </div>
          </div>

          <h1 className="error-title">{status === 404 ? "Oops! Spatial Out of Bounds" : "Unexpected Quantum Anomaly"}</h1>
          <p className="error-subtitle">{statusText}</p>
          <p className="error-description">{message}</p>
        </div>

        {/* Action Buttons with Hover Audio */}
        <div className="error-actions">
          <NavLink
            to="/"
            className="btn btn-primary"
            onClick={() => triggerAudio("click")}
            onMouseEnter={() => triggerAudio("hover")}
          >
            <FaHouse className="btn-icon" />
            <span>Return to Safety</span>
          </NavLink>

          <button
            onClick={() => {
              triggerAudio("click");
              navigate(-1);
            }}
            onMouseEnter={() => triggerAudio("hover")}
            className="btn btn-secondary"
          >
            <FaArrowLeft className="btn-icon" />
            <span>Go Back</span>
          </button>

          <button
            onClick={() => {
              triggerAudio("click");
              window.location.reload();
            }}
            onMouseEnter={() => triggerAudio("hover")}
            className="btn btn-ghost"
            title="Refresh current page"
          >
            <FaRotateRight className="btn-icon" />
            <span>Refresh</span>
          </button>

          <button
            onClick={triggerGlitchEffect}
            onMouseEnter={() => triggerAudio("hover")}
            className="btn btn-glitch-fix"
            title="Re-align spatial glitch parameters"
          >
            <FaWandMagicSparkles className="btn-icon" />
            <span>Fix Glitch</span>
          </button>
        </div>

        {/* Quick Search Bar with '/' Shortcut */}
        <form onSubmit={handleSearchSubmit} className="error-search-form">
          <div className="search-input-wrapper">
            <FaMagnifyingGlass className="search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search destination or press '/' to type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="error-search-input"
            />
            {searchQuery ? (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => {
                  setSearchQuery("");
                  triggerAudio("click");
                }}
              >
                <FaXmark />
              </button>
            ) : (
              <kbd className="search-kbd-shortcut">/</kbd>
            )}
          </div>
        </form>

        {/* Shortcuts Grid */}
        <div className="quick-shortcuts">
          <h2 className="shortcuts-heading">Popular Space Destinations</h2>
          <div className="shortcuts-grid">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className="shortcut-card"
                    onClick={() => triggerAudio("click")}
                    onMouseEnter={() => triggerAudio("hover")}
                  >
                    <div className="shortcut-icon-box" style={{ color: link.color, background: `${link.color}15` }}>
                      <IconComponent />
                    </div>
                    <div className="shortcut-info">
                      <h3>{link.title}</h3>
                      <p>{link.desc}</p>
                    </div>
                  </NavLink>
                );
              })
            ) : (
              <div className="no-shortcuts">
                <p>No destination matching "{searchQuery}". Try searching "Home", "Country", or "About".</p>
              </div>
            )}
          </div>
        </div>

        {/* Interactive CLI Diagnostic Prompt */}
        {showTerminal && (
          <div className="terminal-container">
            <div className="terminal-header">
              <div className="terminal-title">
                <FaTerminal />
                <span>Diagnostics CLI - Interactive Console</span>
              </div>
              <button
                className="terminal-close-btn"
                onClick={() => {
                  setShowTerminal(false);
                  triggerAudio("click");
                }}
              >
                <FaXmark />
              </button>
            </div>
            <div className="terminal-body">
              {terminalLogs.map((log, index) => (
                <div key={index} className={`terminal-line line-${log.type}`}>
                  <pre>{log.text}</pre>
                </div>
              ))}
              <div ref={terminalBottomRef} />
            </div>
            <form onSubmit={handleTerminalSubmit} className="terminal-form">
              <span className="terminal-prompt-symbol">&gt;</span>
              <input
                type="text"
                className="terminal-input"
                placeholder="Type 'help', 'ping', 'matrix', 'game', 'home'..."
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
              />
            </form>
          </div>
        )}

        {/* Technical Diagnostics Accordion */}
        <div className="error-diagnostics">
          <button
            type="button"
            className="diagnostics-toggle"
            onClick={() => {
              setShowDetails(!showDetails);
              triggerAudio("click");
            }}
          >
            <span className="toggle-left">
              <FaBug className="bug-icon" />
              <span>Technical Diagnostics Log</span>
            </span>
            {showDetails ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {showDetails && (
            <div className="diagnostics-content">
              <div className="diagnostics-header">
                <span>System Error Summary</span>
                <button onClick={handleCopyError} className="copy-btn">
                  {copied ? <FaCheck className="copy-icon green" /> : <FaCopy className="copy-icon" />}
                  <span>{copied ? "Copied to Clipboard!" : "Copy Diagnostics"}</span>
                </button>
              </div>
              <pre className="diagnostics-code">
                {JSON.stringify(
                  {
                    status: status,
                    statusText: statusText,
                    message: message,
                    timestamp: new Date().toISOString(),
                    path: window.location.pathname,
                    userAgent: navigator.userAgent
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* 3. Embedded "Cosmic Escape" Retro Mini Arcade Game Modal */}
      {showGame && (
        <div className="game-modal-overlay">
          <div className="game-modal-card">
            <div className="game-modal-header">
              <div className="game-title">
                <FaRocket className="game-header-icon" />
                <span>Cosmic Escape Arcade - Dodge Space Debris</span>
              </div>
              <button
                className="game-close-btn"
                onClick={() => {
                  setShowGame(false);
                  triggerAudio("click");
                }}
              >
                <FaXmark />
              </button>
            </div>

            <div className="game-hud">
              <div className="hud-stat">
                <span className="hud-label">Score:</span>
                <span className="hud-value gold">{score}</span>
              </div>
              <div className="hud-stat">
                <span className="hud-label">High Score:</span>
                <span className="hud-value">{highScore}</span>
              </div>
              <div className="hud-stat">
                <span className="hud-label">Ship Shield:</span>
                <div className="shield-bar">
                  <div
                    className={`shield-fill ${shield < 30 ? "critical" : ""}`}
                    style={{ width: `${Math.max(0, shield)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="game-viewport">
              <canvas ref={gameCanvasRef} width={460} height={300} className="game-canvas" />

              {gameState === "idle" && (
                <div className="game-overlay-screen">
                  <h3>Cosmic Escape</h3>
                  <p>Move mouse or touch screen left/right to pilot the ship. Dodge pink asteroids and collect gold energy stars!</p>
                  <button className="btn btn-primary" onClick={startGame}>
                    <FaPlay /> Start Mission
                  </button>
                </div>
              )}

              {gameState === "gameover" && (
                <div className="game-overlay-screen">
                  <h3 className="text-danger">Ship Shield Destroyed!</h3>
                  <p>Final Mission Score: <strong>{score}</strong></p>
                  <div className="game-overlay-actions">
                    <button className="btn btn-primary" onClick={startGame}>
                      <FaRotateRight /> Try Again
                    </button>
                    <NavLink to="/" className="btn btn-secondary" onClick={() => triggerAudio("click")}>
                      <FaHouse /> Warp Home
                    </NavLink>
                  </div>
                </div>
              )}
            </div>

            <div className="game-instructions">
              <span>Controls: Move Mouse / Touch horizontally inside viewport to steer ship.</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Error;
