---
template: BlogPost
path: /hello-world
date: 2021-03-26T18:00:00.332Z
title: 'Hello, World'
metaDescription: >-
  Come può intitolarsi il primo post di un blog su argomenti legati al mondo
  della programmazione e del machine learning? Beh, ci siamo capiti.
thumbnail: /assets/hello-world.jpg
---

*Foto di <a href="https://unsplash.com/@ikukevk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kevin Ku</a> - <a href="https://unsplash.com/s/photos/machine-learning?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>.*

# Hello, World

Mi sono più volte chiesto come scrivere il primo di quelli che, spero, saranno una lunga serie di post. La risposta mi è sopraggiunta una notte d'inverno, mentre viaggiavo.

```py
import random
from time import sleep

reasoning = [
	'Ritrovo il bosone di Higgs...',
	'Definisco le condizioni per la radiazione di Hawkings...',
	'Aggiorno il valore del raggio di Schwarzschild...',
	'Interrogo Chuck Norris...',
	'Calcolo il valore di 0 diviso 0...',
	'Risolvo l\'ipotesi di Riemann...',
	'Costruisco una sfera di Dyson...',
	'Mi confronto con Chewbacca...',
	'Riscopro la Forza...',
	'Chiedo a Tony Stark...',
	'Lerooooooooooy Jenkins!',
]

def quick_hello_solver():
	a = 5
	while a > 0: a = a - 1; print(random.choice(reasoning)); sleep(2)
	print('Il modo migliore è 42.')

if __name__ == '__main__':
	quick_hello_resolver()
```

Problema risolto, dunque? Beh...sì.

Sotto con i post, allora.
