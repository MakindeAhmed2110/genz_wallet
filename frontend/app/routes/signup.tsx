import { useState, useEffect, useRef } from "react";
import type { Route } from "./+types/signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up - Smart Naira Wallet" },
    { name: "description", content: "Join Smart Naira Wallet - Africa's First Web3 NeoBank for Gen Z" },
  ];
}

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    // Load GSAP from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      // Initialize canvas animation after GSAP loads
      initCanvasAnimation();
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initCanvasAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation configuration
    const config = {
      src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png',
      rows: 15,
      cols: 7
    };

    // Utility functions
    const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
    const randomIndex = (array: any[]) => randomRange(0, array.length) | 0;
    const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = (array: any[], item: any) => removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array: any[]) => removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array: any[]) => array[randomIndex(array) | 0];

    // Animation state
    const stage = {
      width: canvas.width,
      height: canvas.height,
    };

    const allPeeps: any[] = [];
    const availablePeeps: any[] = [];
    const crowd: any[] = [];

    // Peep class
    class Peep {
      image: HTMLImageElement;
      rect: number[] = [];
      x: number = 0;
      y: number = 0;
      anchorY: number = 0;
      scaleX: number = 1;
      walk: any = null;
      width: number = 0;
      height: number = 0;
      drawArgs: any[] = [];

      constructor({ image, rect }: { image: HTMLImageElement; rect: number[] }) {
        this.image = image;
        this.setRect(rect);
        this.x = 0;
        this.y = 0;
        this.anchorY = 0;
        this.scaleX = 1;
        this.walk = null;
      }

      setRect(rect: number[]) {
        this.rect = rect;
        this.width = rect[2];
        this.height = rect[3];
        this.drawArgs = [this.image, ...rect, 0, 0, this.width, this.height];
      }

      render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, 1);
        ctx.drawImage(this.image, this.rect[0], this.rect[1], this.rect[2], this.rect[3], 0, 0, this.width, this.height);
        ctx.restore();
      }
    }

    // Animation functions
    const resetPeep = ({ stage, peep }: { stage: any; peep: any }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = 100 - 250 * (window as any).gsap.parseEase('power2.in')(Math.random());
      const startY = stage.height - peep.height + offsetY;
      let startX;
      let endX;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return { startX, startY, endX };
    };

    const normalWalk = ({ peep, props }: { peep: any; props: any }) => {
      const { startX, startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = (window as any).gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(peep, {
        duration: xDuration,
        x: endX,
        ease: 'none'
      }, 0);
      tl.to(peep, {
        duration: yDuration,
        repeat: xDuration / yDuration,
        yoyo: true,
        y: startY - 10
      }, 0);

      return tl;
    };

    const walks = [normalWalk];

    const createPeeps = () => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(new Peep({
          image: img,
          rect: [
            (i % rows) * rectWidth,
            (i / rows | 0) * rectHeight,
            rectWidth,
            rectHeight,
          ]
        }));
      }
    };

    const resize = () => {
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * window.devicePixelRatio;
      canvas.height = stage.height * window.devicePixelRatio;

      crowd.forEach((peep) => {
        peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk.progress(Math.random());
      }
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({ peep, stage })
      }).eventCallback('onComplete', () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const removePeepFromCrowd = (peep: any) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      canvas.width = canvas.width;
      ctx.save();
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    };

    // Initialize animation
    const img = document.createElement('img');
    img.onload = () => {
      createPeeps();
      resize();
      (window as any).gsap.ticker.add(render);
    };
    img.src = config.src;
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Form Section */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Create a genz wallet
            </h1>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Form Fields Row */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Name Field */}
                <div className="flex-1">
                  <label htmlFor="name" className="block text-black font-semibold text-sm mb-2">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name ...."
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black text-base placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div className="flex-1">
                  <label htmlFor="phone" className="block text-black font-semibold text-sm mb-2">
                    Phone Number*
                  </label>
                  <div className="flex">
                    <div className="px-4 py-3 bg-gray-100 border border-gray-300 border-r-0 rounded-l-lg text-black text-base font-medium">
                      +234
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-r-lg text-black text-base placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

                             {/* Submit Button */}
               <div className="text-center">
                 <button
                   type="submit"
                   className="px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-bold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                 >
                   Create an account
                 </button>
               </div>
            </form>
          </div>
        </div>
      </div>

      {/* Canvas Section */}
      <canvas 
        ref={canvasRef}
        id="canvas"
        className="absolute bottom-0 left-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
    </div>
  );
} 