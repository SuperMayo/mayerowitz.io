<svg width="300" height="300">
    <circle cx="150" cy="150" r="100" stroke="black" fill="red" >
        <animate
        attributeName="r"
        values="50;100;50"
        dur="10s"
        repeatCount="indefinite" />
    </circle>
    <defs>
        <marker id="arrow" viewBox="0 -5 10 10" refX="5" refY="0" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M0,-5L10,0L0,5" />
        </marker>
      </defs>
    <line x1="100" y1="150" x2="130" y2="150" stroke="teal" stroke-width="4" marker-end="url(#arrow)" />
</svg>