CANVAS_WIDTH = 1920
CANVAS_HEIGHT = 1080
DVD_HEIGHT = 44
DVD_WIDTH = 100

x = -28
y = 0
vx = 1
vy = 1

def handleCollisions(x, y, vx, vy):
  if (x == 0 or CANVAS_WIDTH <= x + DVD_WIDTH) and (y == 0 or CANVAS_HEIGHT <= y + DVD_HEIGHT):
    print(f"CORNER HIT: ({x}, {y}, {vx}, {vy})")
    return 0, 0, True

  if x == 0 or CANVAS_WIDTH <= x + DVD_WIDTH:
    print(f"WALL HIT: ({x}, {y}, {vx}, {vy}, MOD-: {(x - y) % 28}, MOD+: {(x + y) % 28}")
    vx *= -1

  if y == 0 or CANVAS_HEIGHT <= y + DVD_HEIGHT:
    print(f"WALL HIT: ({x}, {y}, {vx}, {vy}, MOD: {(x - y) % 28}, MOD+: {(x + y) % 28}")
    vy *= -1

  return vx, vy, False


for _ in range(100000):
  x = max(0, min(CANVAS_WIDTH, x + vx))
  y = max(0, min(CANVAS_HEIGHT, y + vy))
  mod_minus, mod_plus = (x - y) % 28, (x + y) % 28
  if mod_minus != 0 and mod_plus != 0:
    print(f"AH-HA! ({x}, {y}, {mod_minus}, {mod_plus})")
  vx, vy, corner = handleCollisions(x, y, vx, vy)
  if corner:
    break
