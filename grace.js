import pygame
pygame.init()
size = (500, 500)
screen = pygame.display.set_mode(size)
pygame.display.set_caption("CHRISTINE")
white = (220, 248, 248)
black = (0, 155, 0)
screen.fill(white)
bluek = (255, 255, 255)
done = False
x = 0
# (place to draw, colour to fill, [x, y, width, height])
# (place to draw, colour to fill, [x, y, width, height])

#time
clock = pygame.time.Clock()
clock.tick(60)
y = 100
xchange = 0.15
ychange = 0.25
while not done:
   pygame.draw.ellipse(screen, black, [x, y, 150, 150])
   pygame.draw.ellipse(screen, bluek, [x + 102, 30 + y, 10, 10])
   pygame.draw.ellipse(screen, bluek, [x + 35, 30 + y, 10, 10])
   pygame.draw.ellipse(screen, bluek, [x + 58, 90 + y, 30, 30])
   x += xchange
   y += ychange
   if x > 350 or x < 0:
       xchange = xchange * -1
       print(x)
   if y > 350 or y < 0:
       ychange = ychange * -1
       print(x)
   pygame.display.flip() #to display graphics
   screen.fill(white)

for event in pygame.event.get():
   if event.type == pygame.QUIT:
       print ("User asked to Quit")
   elif event.type == pygame.KEYDOWN:
       print ("User pressed a key")
   elif event.type == pygame.KEYUP:
       print ("User released a key")
   elif event.type == pygame.MOUSEBUTTONDOWN:
       print ("User pressed a mouse button")

while not done: #so it won't exit out
  for event in pygame.event.get(): #user did smth
     if event.type == pygame.QUIT: #if user clicks close
        done = True #flag to exit loop
