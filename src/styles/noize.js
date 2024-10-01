const { minifier } = require('../helpers').default


let rawSource = `
.noise-container, #noise-back, #noise {
  width: var(--button-width);
  height: var(--button-height);
}
.noise-container {
  position: absolute;
  top: 0;
  left: 0;
}

#noise-back, #noise {
  position: absolute;
  top: 0;
  left: 0;
  clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%);
}

.noise-container:hover > #noise-back {
  animation: clip-animation 0.3s infinite;
}
.noise-container:hover > #noise {
  animation: clip-animation 0.4s infinite;
}

#noise {
  background-color: #f50;

}

#noise-back {
  background-color: #09b;
}

@keyframes clip-animation {
    0% { clip-path: polygon(0% 0%, 5% 0%, 5% 4%, 0% 4%); }
    2% { clip-path: polygon(0% 8%, 10% 8%, 10% 10%, 0% 10%); }
    5% { clip-path: polygon(0% 0%, 15% 0%, 15% 5%, 0% 5%); }
    7% { clip-path: polygon(0% 12%, 40% 12%, 40% 15%, 0% 15%); }
   10% { clip-path: polygon(0% 25%, 20% 25%, 20% 30%, 0% 30%); }
   15% { clip-path: polygon(0% 88%, 20% 88%, 20% 90%, 0% 90%); }
   20% { clip-path: polygon(0% 97%, 50% 97%, 50% 100%, 0% 100%); }
   27% { clip-path: polygon(0% 90%, 30% 90%, 30% 92%, 0% 92%); }
   30% { clip-path: polygon(0% 50%, 40% 50%, 40% 54%, 0% 54%); }
   34% { clip-path: polygon(0% 43%, 40% 43%, 40% 45%, 0% 45%); }
   40% { clip-path: polygon(0% 30%, 20% 30%, 20% 32%, 0% 32%); }
   47% { clip-path: polygon(0% 0%, 50% 0%, 50% 3%, 0% 3%); }
   50% { clip-path: polygon(0% 15%, 30% 15%, 30% 20%, 0% 20%); }
   55% { clip-path: polygon(0% 17%, 40% 17%, 40% 20%, 0% 20%); }
   60% { clip-path: polygon(0% 70%, 40% 70%, 40% 73%, 0% 73%); }
   64% { clip-path: polygon(0% 18%, 30% 18%, 30% 20%, 0% 20%); }
   70% { clip-path: polygon(0% 80%, 20% 80%, 20% 85%, 0% 85%); }
   72% { clip-path: polygon(0% 74%, 20% 74%, 20% 77%, 0% 77%); }
   78% { clip-path: polygon(0% 30%, 40% 30%, 40% 33%, 0% 33%); }
   80% { clip-path: polygon(0% 40%, 40% 40%, 40% 44%, 0% 44%); }
   90% { clip-path: polygon(0% 10%, 30% 10%, 30% 12%, 0% 12%); }
  100% { clip-path: polygon(0% 84%, 35% 84%, 35% 88%, 0% 88%); }
}
`

export const noize = minifier(rawSource)
