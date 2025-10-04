import React, { useState, useEffect, useCallback } from "react";
// import svgPaths from "../assets/svg-60ozkdald8";
// import imgScreenshot20250924At73440Pm1BackgroundRemoved1 from "../assets/astroid.svg";
// import imgEarth from "../assets/earth.svg";

import {
  AlertTriangle,
  Target,
  Zap,
  Shield,
  TrendingUp,
  Info,
  Award,
  Eye,
  RotateCcw,
} from "lucide-react";

/* ----------------- Minimal UI primitives (self contained) ----------------- */
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-black/70 backdrop-blur rounded-xl border border-white/10 p-4 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`pb-2 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h4 className={`text-lg font-semibold ${className}`}>{children}</h4>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const Button = ({
  children,
  className = "",
  variant = "default",
  ...props
}) => {
  const base = "px-3 py-2 rounded-md text-sm font-medium transition";
  const v =
    variant === "default"
      ? "bg-purple-600 hover:bg-purple-700 text-white"
      : variant === "outline"
      ? "border border-white/10 bg-transparent text-white"
      : "bg-gray-700 text-white";
  return (
    <button className={`${base} ${v} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ children, className = "" }) => (
  <span className={`px-2 py-0.5 rounded-md text-xs border ${className}`}>
    {children}
  </span>
);

const Progress = ({ value = 0, className = "" }) => (
  <div className={`w-full bg-white/10 rounded-full h-2 ${className}`}>
    <div
      style={{ width: `${value}%` }}
      className="h-2 rounded-full bg-purple-500 transition-all"
    />
  </div>
);

/* ----------------- Game data ----------------- */
const ASTEROID_TEMPLATES = [
  {
    id: 1,
    size: "small",
    speed: 5,
    distance: 1000000,
    mass: 500000,
    composition: "rocky",
    trajectory: "direct",
    name: "Apophis-Mini",
  },
  {
    id: 2,
    size: "medium",
    speed: 8,
    distance: 800000,
    mass: 2000000,
    composition: "metallic",
    trajectory: "curved",
    name: "Bennu-Class",
  },
  {
    id: 3,
    size: "large",
    speed: 12,
    distance: 600000,
    mass: 8000000,
    composition: "icy",
    trajectory: "erratic",
    name: "Dimorphos-Type",
  },
  {
    id: 4,
    size: "massive",
    speed: 15,
    distance: 400000,
    mass: 20000000,
    composition: "metallic",
    trajectory: "direct",
    name: "Chicxulub-Danger",
  },
];

const DEFLECTION_METHODS = {
  kinetic: {
    name: "Kinetic Impactor",
    icon: Target,
    description: "High-speed spacecraft collision",
    effectiveness: { rocky: 0.8, metallic: 0.6, icy: 0.9 },
    realWorld: "NASA's DART mission used this method on Dimorphos",
    power: 100,
  },
  gravity: {
    name: "Gravity Tractor",
    icon: TrendingUp,
    description: "Gravitational deflection over time",
    effectiveness: { rocky: 0.4, metallic: 0.4, icy: 0.4 },
    realWorld:
      "Best for small course corrections with years of advance warning",
    power: 50,
  },
  nuclear: {
    name: "Nuclear Device",
    icon: Zap,
    description: "Nuclear explosion for major deflection",
    effectiveness: { rocky: 0.9, metallic: 0.7, icy: 1.0 },
    realWorld: "Theoretical last resort for short warning times",
    power: 200,
  },
  laser: {
    name: "Laser Ablation",
    icon: Shield,
    description: "Vaporize surface material for thrust",
    effectiveness: { rocky: 0.6, metallic: 0.3, icy: 0.8 },
    realWorld: "Proposed for small asteroids",
    power: 75,
  },
};

/* ----------------- Figma UI pieces (static) ----------------- */
function Logo() {
  return (
    <div
      className="absolute h-[88px] left-[41px] top-[48px] w-[241px]"
      data-name="logo"
    >
      <div
        className="absolute h-[64px] left-0 top-[10px] w-[102px]"
        data-name="logo-img"
      >
        {/* <img
          alt=""
          className="absolute inset-0 max-w-none object-cover w-full h-full pointer-events-none"
          src={imgScreenshot20250924At73440Pm1BackgroundRemoved1}
        /> */}
      </div>
      <div className="[text-shadow:#8c58f3_0px_1.95px_7.8px] absolute font-[Jaini] leading-[0] left-[40.95px] not-italic text-[31.2px] text-nowrap text-white top-[23.4px]">
        <p className="leading-[normal] whitespace-pre">Meteor Madness</p>
      </div>
    </div>
  );
}

function AboutChallenge({ children }) {
  return (
    <div className="h-[49.2px] relative shrink-0 w-[165.6px]">
      <div className="absolute bottom-[0.41%] font-[Jaini] leading-[0] left-0 not-italic right-[-0.24%] text-[37.44px] text-nowrap text-white top-0">
        <p className="leading-[normal] whitespace-pre">{children}</p>
      </div>
    </div>
  );
}

function NavigationBar() {
  return (
    <div
      className="absolute content-stretch flex gap-[64px] h-[98px] items-center left-1/2 transform -translate-x-1/2"
      style={{ top: "48px", width: "965px" }}
    >
      <AboutChallenge>Defend Earth</AboutChallenge>
      <AboutChallenge>Astroids Simulation</AboutChallenge>
      <AboutChallenge>Fun Facts</AboutChallenge>
      <AboutChallenge>About challenge</AboutChallenge>
    </div>
  );
}

/* ----------------- Game components ----------------- */
function AsteroidInfo({ asteroid }) {
  const sizeMultiplier = { small: 1, medium: 2.5, large: 5, massive: 10 };
  const threatLevel =
    asteroid.size === "massive"
      ? "EXTINCTION"
      : asteroid.size === "large"
      ? "REGIONAL"
      : asteroid.size === "medium"
      ? "LOCAL"
      : "MINOR";
  const threatColor =
    asteroid.size === "massive"
      ? "text-red-500"
      : asteroid.size === "large"
      ? "text-orange-500"
      : asteroid.size === "medium"
      ? "text-yellow-500"
      : "text-green-500";

  return (
    <Card className="bg-black/80 border-purple-500 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          <CardTitle className="text-lg">{asteroid.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-400">Size:</span>
            <span className="ml-2 font-semibold text-purple-300">
              {asteroid.size}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Speed:</span>
            <span className="ml-2 font-semibold">
              {asteroid.speed.toFixed(1)} km/s
            </span>
          </div>
          <div>
            <span className="text-gray-400">Distance:</span>
            <span className="ml-2 font-semibold">
              {(asteroid.distance / 1000).toFixed(0)}k km
            </span>
          </div>
          <div>
            <span className="text-gray-400">Mass:</span>
            <span className="ml-2 font-semibold">
              {(asteroid.mass / 1000000).toFixed(1)}M tons
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge className="text-xs">
            {" "}
            {asteroid.composition} composition{" "}
          </Badge>
          <Badge className={`text-xs ${threatColor} border-current`}>
            {" "}
            {threatLevel} THREAT{" "}
          </Badge>
        </div>

        <div className="text-xs text-gray-400">
          <span className="text-purple-300">Trajectory:</span>{" "}
          {asteroid.trajectory} approach
        </div>

        <div className="text-xs text-gray-300 bg-gray-900/50 p-2 rounded">
          <Info className="h-3 w-3 inline mr-1" />
          Diameter: ~{(sizeMultiplier[asteroid.size] * 100).toFixed(0)}m
        </div>
      </CardContent>
    </Card>
  );
}

function SuccessPrediction({ gameState, effectiveness }) {
  const asteroid = gameState.currentAsteroid;
  const powerFactor = gameState.power / 100;
  const angleFactor = Math.max(0, 1 - Math.abs(gameState.angle - 22.5) / 22.5);
  const sizePenalty = { small: 1, medium: 0.8, large: 0.6, massive: 0.4 }[
    asteroid.size
  ];
  const speedPenalty = Math.max(0.3, 1 - (asteroid.speed - 5) / 20);
  const distanceBonus = Math.min(1.5, asteroid.distance / 500000);

  const successChance =
    effectiveness *
    powerFactor *
    angleFactor *
    sizePenalty *
    speedPenalty *
    distanceBonus;
  const percentage = Math.min(99, Math.max(1, successChance * 100));

  const rating =
    percentage >= 80
      ? "EXCELLENT"
      : percentage >= 60
      ? "GOOD"
      : percentage >= 40
      ? "FAIR"
      : percentage >= 20
      ? "POOR"
      : "CRITICAL";
  const color =
    percentage >= 80
      ? "text-green-400"
      : percentage >= 60
      ? "text-blue-400"
      : percentage >= 40
      ? "text-yellow-400"
      : percentage >= 20
      ? "text-orange-400"
      : "text-red-400";

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm">Success Probability:</span>
        <span className={`text-sm font-bold ${color}`}>
          {percentage.toFixed(1)}%
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className={`text-xs font-semibold ${color}`}>{rating}</div>

      <div className="text-xs text-gray-400 space-y-1">
        <div>• Power efficiency: {(powerFactor * 100).toFixed(0)}%</div>
        <div>• Angle optimization: {(angleFactor * 100).toFixed(0)}%</div>
        <div>• Size challenge: {(sizePenalty * 100).toFixed(0)}%</div>
        <div>• Speed factor: {(speedPenalty * 100).toFixed(0)}%</div>
      </div>
    </div>
  );
}

function DeflectionControls({
  gameState,
  onMethodChange,
  onPowerChange,
  onAngleChange,
}) {
  const currentMethod = DEFLECTION_METHODS[gameState.deflectionMethod];
  const asteroid = gameState.currentAsteroid;
  const effectiveness = currentMethod.effectiveness[asteroid.composition];

  return (
    <Card className="bg-black/80 border-purple-500 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Deflection System</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-purple-300">
            Deflection Method
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(DEFLECTION_METHODS).map(([key, method]) => {
              const Icon = method.icon;
              const active = gameState.deflectionMethod === key;
              return (
                <button
                  key={key}
                  onClick={() => onMethodChange(key)}
                  className={`p-3 flex flex-col items-center gap-1 text-xs rounded-md border ${
                    active
                      ? "bg-purple-600"
                      : "border-purple-500 bg-transparent"
                  } `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{method.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-900/50 p-3 rounded text-xs space-y-2">
          <div className="font-semibold text-purple-300">
            {currentMethod.description}
          </div>
          <div className="text-gray-300">
            <span className="text-yellow-400">
              Effectiveness vs {asteroid.composition}:
            </span>{" "}
            {(effectiveness * 100).toFixed(0)}%
          </div>
          <div className="text-gray-400 italic">{currentMethod.realWorld}</div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-purple-300">
              Power Output
            </label>
            <span className="text-sm">{gameState.power}%</span>
          </div>
          <input
            type="range"
            min="10"
            max={currentMethod.power}
            value={gameState.power}
            onChange={(e) => onPowerChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg"
          />
          <Progress value={gameState.power} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-purple-300">
              Deflection Angle
            </label>
            <span className="text-sm">{gameState.angle.toFixed(1)}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="45"
            step="0.5"
            value={gameState.angle}
            onChange={(e) => onAngleChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg"
          />
        </div>

        <div className="bg-gray-900/50 p-3 rounded">
          <div className="text-sm font-semibold text-purple-300 mb-2">
            Mission Analysis
          </div>
          <SuccessPrediction
            gameState={gameState}
            effectiveness={effectiveness}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function GameStats({ gameState }) {
  return (
    <Card className="bg-black/80 border-purple-500 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-lg">Mission Stats</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-300">
              {gameState.level}
            </div>
            <div className="text-xs text-gray-400">Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {gameState.score}
            </div>
            <div className="text-xs text-gray-400">Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {gameState.asteroidsSaved}
            </div>
            <div className="text-xs text-gray-400">Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {gameState.lives}
            </div>
            <div className="text-xs text-gray-400">Lives</div>
          </div>
        </div>

        {gameState.achievements.length > 0 && (
          <div className="border-t border-gray-700 pt-3 mt-3">
            <div className="text-sm font-semibold text-purple-300 mb-2">
              Recent Achievement
            </div>
            <Badge className="bg-yellow-600 text-yellow-100 text-xs">
              {gameState.achievements[gameState.achievements.length - 1]}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ----------------- Enhanced 3D Simulation (fallback 2D visual) ----------------- */
function Enhanced3DSimulation({ gameState, onComplete, onStateUpdate }) {
  const [progress, setProgress] = useState(0);
  const [deflectionEffect, setDeflectionEffect] = useState(0);

  const asteroid = gameState.currentAsteroid;
  const method = DEFLECTION_METHODS[gameState.deflectionMethod];
  const effectiveness = method.effectiveness[asteroid.composition];

  useEffect(() => {
    if (!gameState.isSimulating) return;

    const duration = 5000;
    const startTime = Date.now();
    let animationId = null;
    let lastUpdateTime = 0;

    const powerFactor = gameState.power / 100;
    const angleFactor = Math.max(
      0,
      1 - Math.abs(gameState.angle - 22.5) / 22.5
    );
    const sizePenalty = { small: 1, medium: 0.8, large: 0.6, massive: 0.4 }[
      asteroid.size
    ];
    const speedPenalty = Math.max(0.3, 1 - (asteroid.speed - 5) / 20);
    const distanceBonus = Math.min(1.5, asteroid.distance / 500000);
    const totalEffectiveness =
      effectiveness *
      powerFactor *
      angleFactor *
      sizePenalty *
      speedPenalty *
      distanceBonus;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(elapsed / duration, 1);
      setProgress(currentProgress * 100);

      const deflection = totalEffectiveness * currentProgress * gameState.angle;
      setDeflectionEffect(deflection);

      const baseX = 50 - currentProgress * 40;
      const baseY = 20 - currentProgress * 15;
      const baseZ = -30 + currentProgress * 25;

      const deflectedX = baseX + deflection * 0.8;
      const deflectedY = baseY - deflection * 0.4;
      const deflectedZ = baseZ + deflection * 0.6;

      if (elapsed - lastUpdateTime > 50) {
        onStateUpdate({
          asteroidPosition: { x: deflectedX, y: deflectedY, z: deflectedZ },
          showDeflectionBeam: deflection > 0.1,
        });
        lastUpdateTime = elapsed;
      }

      if (currentProgress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        const distanceFromEarth = Math.sqrt(
          deflectedX * deflectedX +
            deflectedY * deflectedY +
            deflectedZ * deflectedZ
        );
        const successChance = totalEffectiveness * 100;
        const success = successChance >= 50 && distanceFromEarth > 8;
        setTimeout(() => onComplete(success), 700);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.isSimulating]); // values precomputed inside to avoid unnecessary restarts

  return (
    <div className="absolute inset-0 pointer-events-none">
      {gameState.use3DView ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[60%] h-[60%] rounded-2xl bg-gradient-to-b from-purple-900/40 to-black/40 flex items-center justify-center text-white/70">
            3D View (placeholder)
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-blue-900/20 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-lg mb-2">2D Simulation Mode</div>
            <div className="text-sm text-gray-300">
              Switch to 3D view for full experience
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/90 border border-purple-500 rounded-lg p-4 min-w-[320px] pointer-events-auto">
        <div className="text-white text-center mb-3">
          <div className="text-lg font-semibold text-purple-300">
            Mission in Progress
          </div>
          <div className="text-sm text-gray-400">Method: {method.name}</div>
        </div>
        <Progress value={progress} className="h-3 mb-3" />
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-300">
          <div>
            <div className="font-semibold text-purple-300">Deflection</div>
            <div>
              {deflectionEffect > 0
                ? `${deflectionEffect.toFixed(2)}°`
                : "Building up..."}
            </div>
          </div>
          <div>
            <div className="font-semibold text-purple-300">Effectiveness</div>
            <div>{(effectiveness * 100).toFixed(0)}%</div>
          </div>
        </div>

        {progress > 50 && (
          <div className="mt-3 text-center">
            <div
              className={`text-sm font-semibold ${
                deflectionEffect > 15
                  ? "text-green-400"
                  : deflectionEffect > 8
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {deflectionEffect > 15
                ? "EXCELLENT DEFLECTION!"
                : deflectionEffect > 8
                ? "MODERATE DEFLECTION"
                : "MINIMAL EFFECT"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ----------------- Main page ----------------- */
export default function DefendEarth() {
  const [gameState, setGameState] = useState({
    level: 1,
    score: 0,
    lives: 3,
    asteroidsSaved: 0,
    currentAsteroid: ASTEROID_TEMPLATES[0],
    deflectionMethod: "kinetic",
    power: 50,
    angle: 15,
    isSimulating: false,
    showTutorial: true,
    achievements: [],
    asteroidPosition: { x: 50, y: 20, z: -30 },
    use3DView: true,
    showDeflectionBeam: false,
  });

  const [showResult, setShowResult] = useState(null);

  const generateNewAsteroid = useCallback((level) => {
    const template =
      ASTEROID_TEMPLATES[Math.min(level - 1, ASTEROID_TEMPLATES.length - 1)];
    const variance = 0.2;
    return {
      ...template,
      id: Date.now(),
      speed: template.speed * (1 + (Math.random() - 0.5) * variance),
      distance: template.distance * (1 + (Math.random() - 0.5) * variance),
      mass: template.mass * (1 + (Math.random() - 0.5) * variance),
      composition: ["rocky", "metallic", "icy"][Math.floor(Math.random() * 3)],
      trajectory: ["direct", "curved", "erratic"][
        Math.floor(Math.random() * 3)
      ],
      name: template.name,
    };
  }, []);

  const startSimulation = () => {
    setGameState((prev) => ({
      ...prev,
      isSimulating: true,
      showTutorial: false,
    }));
  };

  const onSimulationComplete = (success) => {
    setGameState((prev) => {
      const points = success ? prev.level * 100 + prev.power : 0;
      const newAchievements = [...prev.achievements];

      if (success) {
        if (prev.asteroidsSaved === 0) newAchievements.push("First Save!");
        if (prev.power >= 90) newAchievements.push("Full Power!");
        if (prev.angle <= 5) newAchievements.push("Precision Shot!");
      }

      return {
        ...prev,
        isSimulating: false,
        score: prev.score + points,
        lives: success ? prev.lives : prev.lives - 1,
        asteroidsSaved: success ? prev.asteroidsSaved + 1 : prev.asteroidsSaved,
        level: success ? prev.level + 1 : prev.level,
        achievements: newAchievements,
        currentAsteroid: success
          ? generateNewAsteroid(prev.level + 1)
          : prev.currentAsteroid,
      };
    });

    const messages = {
      success: [
        "Asteroid successfully deflected! Earth is safe!",
        "Mission accomplished! The asteroid missed Earth!",
        "Excellent work! Another catastrophe averted!",
        "Perfect deflection! Humanity lives another day!",
      ],
      failure: [
        "Impact detected! The asteroid hit Earth!",
        "Mission failed! Better luck next time!",
        "The deflection wasn't enough. Try adjusting your approach!",
        "Earth was hit! Learn from this and try again!",
      ],
    };

    const list = success ? messages.success : messages.failure;
    const message = list[Math.floor(Math.random() * list.length)];
    setShowResult({ success, message });
  };

  const resetGame = () => {
    setGameState({
      level: 1,
      score: 0,
      lives: 3,
      asteroidsSaved: 0,
      currentAsteroid: ASTEROID_TEMPLATES[0],
      deflectionMethod: "kinetic",
      power: 50,
      angle: 15,
      isSimulating: false,
      showTutorial: true,
      achievements: [],
      asteroidPosition: { x: 50, y: 20, z: -30 },
      use3DView: true,
      showDeflectionBeam: false,
    });
    setShowResult(null);
  };

  const nextLevel = () => {
    setShowResult(null);
  };

  // game over screen
  if (gameState.lives <= 0) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Card className="bg-black/80 border-red-500 text-white max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-red-400">
              GAME OVER
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-lg">
              Final Score:{" "}
              <span className="text-purple-300 font-bold">
                {gameState.score}
              </span>
            </div>
            <div className="text-sm text-gray-300">
              Asteroids Saved: {gameState.asteroidsSaved}
            </div>
            <div className="text-sm text-gray-300">
              Highest Level: {gameState.level}
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                onClick={resetGame}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Play Again
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex-1"
              >
                Main Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-black relative min-h-screen overflow-hidden text-white">
      <Logo />
      <NavigationBar />

      {/* Earth image */}
      <div className="absolute left-[46%] top-[20%] w-[360px] h-[360px] -translate-x-1/2 -translate-y-1/2">
        {/* <img
          alt="earth"
          src={imgEarth}
          className="w-full h-full object-cover rounded-full drop-shadow-2xl"
        /> */}
      </div>

      {/* Asteroid path SVG */}
      <div className="absolute right-[10%] top-[18%] w-[420px] h-[520px]">
        {/* <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 706 872">
          <path d={svgPaths.pec5d300} stroke="#F7F7F7" strokeWidth="6" strokeLinecap="round" />
        </svg>  */}
      </div>

      {/* small asteroid image */}
      <div className="absolute right-[12%] top-[22%] w-[90px] h-[90px]">
        {/* <img
          alt="asteroid"
          src={imgScreenshot20250924At73440Pm1BackgroundRemoved1}
          className="w-full h-full object-cover"
        /> */}
      </div>

      {/* Left controls column */}
      <div className="absolute left-6 top-36 bottom-6 w-80 overflow-auto z-20 space-y-4">
        <AsteroidInfo asteroid={gameState.currentAsteroid} />
        <DeflectionControls
          gameState={gameState}
          onMethodChange={(method) =>
            setGameState((p) => ({ ...p, deflectionMethod: method }))
          }
          onPowerChange={(power) => setGameState((p) => ({ ...p, power }))}
          onAngleChange={(angle) => setGameState((p) => ({ ...p, angle }))}
        />

        <Card className="bg-black/80 border-purple-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-purple-300">
                Simulation Mode
              </label>
              <Badge className="text-xs">
                {gameState.use3DView ? "3D" : "2D"}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setGameState((p) => ({ ...p, use3DView: true }))}
                variant={gameState.use3DView ? "default" : "secondary"}
                className="flex-1"
                disabled={gameState.isSimulating}
              >
                <Eye className="h-4 w-4 mr-1 inline" /> 3D View
              </Button>
              <Button
                onClick={() =>
                  setGameState((p) => ({ ...p, use3DView: false }))
                }
                variant={!gameState.use3DView ? "default" : "secondary"}
                className="flex-1"
                disabled={gameState.isSimulating}
              >
                <RotateCcw className="h-4 w-4 mr-1 inline" /> 2D View
              </Button>
            </div>
            {gameState.use3DView && (
              <div className="mt-3 text-xs text-gray-400">
                • Drag to rotate camera • Scroll to zoom
              </div>
            )}
          </CardContent>
        </Card>

        <Button
          onClick={startSimulation}
          disabled={gameState.isSimulating}
          className="w-full h-14 text-xl font-bold bg-red-600 hover:bg-red-700"
        >
          {gameState.isSimulating ? "DEFLECTING..." : "LAUNCH MISSION"}
        </Button>
      </div>

      {/* Right stats column */}
      <div className="absolute right-6 top-36 w-64 z-20">
        <GameStats gameState={gameState} />
      </div>

      {/* Simulation area */}
      <div className="absolute inset-0">
        <Enhanced3DSimulation
          gameState={gameState}
          onComplete={onSimulationComplete}
          onStateUpdate={(updates) =>
            setGameState((p) => ({ ...p, ...updates }))
          }
        />
      </div>

      {/* Tutorial overlay */}
      {gameState.showTutorial && (
        <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center">
          <Card className="max-w-2xl mx-4">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Mission Briefing: Planetary Defense
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Welcome to Earth's planetary defense system. An asteroid is
                approaching and you must deflect it!
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-purple-300">Your Tools:</h3>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>
                    • Kinetic Impactor — ram a spacecraft into the asteroid
                  </li>
                  <li>
                    • Gravity Tractor — use gravitational pull to slowly change
                    course
                  </li>
                  <li>
                    • Nuclear Device — last resort for maximum deflection power
                  </li>
                  <li>
                    • Laser Ablation — vaporize surface material to create
                    thrust
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-purple-300">
                  Strategy Tips:
                </h3>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>
                    • Different compositions respond differently to methods
                  </li>
                  <li>• Larger asteroids need more power and optimal angles</li>
                  <li>• Earlier detection gives better chances</li>
                </ul>
              </div>

              <Button
                onClick={() =>
                  setGameState((p) => ({ ...p, showTutorial: false }))
                }
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Begin Mission
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Result modal */}
      {showResult && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <Card
            className={`${
              showResult.success ? "border-green-500" : "border-red-500"
            } bg-black/90 text-white max-w-md mx-4`}
          >
            <CardHeader>
              <CardTitle
                className={`text-center text-2xl ${
                  showResult.success ? "text-green-400" : "text-red-400"
                }`}
              >
                {showResult.success ? "MISSION SUCCESS!" : "MISSION FAILED!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-lg">{showResult.message}</p>

              {showResult.success && (
                <div className="text-sm text-gray-300">
                  <div>
                    Points Earned:{" "}
                    <span className="text-purple-300 font-bold">
                      +{gameState.level * 100 + gameState.power}
                    </span>
                  </div>
                  <div>
                    Next Level:{" "}
                    <span className="text-blue-300 font-bold">
                      {gameState.level}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-4">
                <Button
                  onClick={
                    showResult.success ? nextLevel : () => setShowResult(null)
                  }
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  {showResult.success ? "Next Level" : "Try Again"}
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="flex-1"
                >
                  Main Menu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Start button (Figma styled) */}
      <div className="absolute left-[75px] top-[80%] w-[306px] h-[67.5px] flex items-center justify-center z-10">
        <div
          className="bg-[#5e2ac4] w-full h-full rounded-xl flex items-center justify-center gap-3 cursor-pointer shadow-lg"
          onClick={startSimulation}
        >
          {/* <svg width="20" height="22" viewBox="0 0 21 22" fill="none"><path d={svgPaths.p314085c0} fill="white" /></svg>  */}
          <div className="text-white text-xl font-[Jaini]">
            Start Simulation
          </div>
        </div>
      </div>
    </div>
  );
}
