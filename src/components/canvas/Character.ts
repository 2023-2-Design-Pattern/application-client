import CharacterImage from "../../assets/kirby.png";

interface Position {
  x: number;
  y: number;
}

enum Direction {
  DOWN = 0,
  UP = 1,
  LEFT = 2,
  RIGHT = 3,
}

const SIZE = 28;

class Character {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private position: Position = { x: 0, y: 0 };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx!.fillStyle = "blue";
    this.ctx!.fillRect(0, 0, canvas.width, canvas.height);
    this.runAnimationFrame();
  }

  private runAnimationFrame() {
    this.draw();
    requestAnimationFrame(this.runAnimationFrame.bind(this));
  }

  private draw() {
    const { x, y } = this.position;

    const image = new Image();
    image.src = CharacterImage;

    if (!this.ctx || !image) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(image, x, y, SIZE, SIZE);
  }

  hadleArrowKeyDown() {
    const distance = SIZE;
    const ArrowKeys = [
      {
        code: "38",
        string: "ArrowUp",
        direction: Direction.UP,
        movement: { x: 0, y: -distance },
        isMoveable: () => this.position.y > 0,
      },
      {
        code: "40",
        string: "ArrowDown",
        direction: Direction.DOWN,
        movement: { x: 0, y: distance },
        isMoveable: () => this.position.y < this.canvas.height - SIZE,
      },
      {
        code: "39",
        string: "ArrowRight",
        direction: Direction.RIGHT,
        movement: { x: distance, y: 0 },
        isMoveable: () => this.position.x < this.canvas.width - SIZE,
      },
      {
        code: "37",
        string: "ArrowLeft",
        direction: Direction.LEFT,
        movement: { x: -distance, y: 0 },
        isMoveable: () => this.position.x > 0,
      },
    ];

    const handler = (e: KeyboardEvent) => {
      for (let i = 0; i < ArrowKeys.length; i++) {
        const { code, string, movement, isMoveable } = ArrowKeys[i];
        if ([code.toString(), string].includes(e.key) && isMoveable()) {
          this.position.x += movement.x;
          this.position.y += movement.y;
        }
      }
    };

    return (e: KeyboardEvent) => handler(e);
  }
}

export default Character;